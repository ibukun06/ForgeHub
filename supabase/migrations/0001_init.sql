-- ForgeHub V1 — Initial schema
-- Source: ForgeHub-Synthesis-01-PRD.md, 03-Technical-Architecture.md, 04-Security.md
--
-- Design notes carried from the synthesis:
--  * RLS here is defense-in-depth. Real authorization also lives in the
--    Next.js API routes/server actions that front this database.
--  * project_members is what makes role-based access (team_lead /
--    contributor / advisor) real — the earlier draft referenced a table
--    like this without ever defining it.
--  * ai_generation_logs carries a `type` column so section-drafting and
--    Mentor-chat requests share one fair-use rate-limit pool.

-- ============================================================
-- Extensions
-- ============================================================

-- Supabase enables this by default on new projects, but declared
-- explicitly so this migration doesn't depend on that assumption —
-- gen_random_bytes() (used for invite tokens, below) requires it.
create extension if not exists pgcrypto with schema extensions;

-- ============================================================
-- Enums
-- ============================================================

create type project_type as enum ('hardware', 'software', 'research', 'multidisciplinary', 'other');
create type project_visibility as enum ('private', 'published');
create type member_role as enum ('team_lead', 'contributor', 'advisor');
create type invite_role as enum ('contributor', 'advisor');
create type document_type as enum ('problem_statement', 'requirements', 'architecture', 'testing_plan', 'decisions_log', 'custom');
create type section_status as enum ('not_started', 'ai_draft', 'team_reviewed');
create type revision_source as enum ('human', 'ai_draft');
create type notification_type as enum ('comment_received', 'section_assigned', 'section_stale');
create type ai_request_type as enum ('section_draft', 'mentor_chat');

-- ============================================================
-- users — profile data, keyed to auth.users
-- ============================================================

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  name text,
  institution text,
  bio text,
  skills text[] not null default '{}',
  email_verified_at timestamptz,
  created_at timestamptz not null default now()
);

-- bio/skills weren't in Document 6's original users table, but the App
-- Flow onboarding screen (folded into Part 1 of the synthesis) explicitly
-- collects both. Adding them here rather than silently dropping the
-- fields or silently shipping an onboarding form that doesn't save what
-- it collects — caught during implementation, not part of the original
-- reconciliation pass.

comment on table public.users is 'Profile data. email/name are PII — never joined into publish_snapshots or logs beyond what a feature explicitly needs.';

-- Auto-create a profile row whenever someone signs up via Supabase Auth.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, email_verified_at)
  values (new.id, new.email, new.email_confirmed_at);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- projects
-- ============================================================

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  project_type project_type not null,
  created_by uuid not null references public.users(id),
  visibility project_visibility not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_name_unique_per_owner unique (created_by, name)
);

create index projects_created_by_idx on public.projects(created_by);

-- Creating a project makes you its team_lead.
create function public.handle_new_project()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.project_members (project_id, user_id, role)
  values (new.id, new.created_by, 'team_lead');
  return new;
end;
$$;

-- (trigger created after project_members exists, below)

-- ============================================================
-- project_members — where role-based access is actually enforced from
-- ============================================================

create table public.project_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role member_role not null,
  joined_at timestamptz not null default now(),
  constraint project_members_unique unique (project_id, user_id)
);

create index project_members_project_idx on public.project_members(project_id);
create index project_members_user_idx on public.project_members(user_id);

create trigger on_project_created
  after insert on public.projects
  for each row execute function public.handle_new_project();

-- Guard: a project must always keep at least one team_lead
-- (Doc 4 Feature 3 validation rule, enforced transactionally per Doc 6).
create function public.prevent_last_team_lead_removal()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  remaining_leads int;
begin
  if (tg_op = 'DELETE' and old.role = 'team_lead')
     or (tg_op = 'UPDATE' and old.role = 'team_lead' and new.role <> 'team_lead') then
    select count(*) into remaining_leads
    from public.project_members
    where project_id = old.project_id
      and role = 'team_lead'
      and id <> old.id;

    if remaining_leads = 0 then
      raise exception 'Cannot remove the last Team Lead — assign a new one first.';
    end if;
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create trigger guard_last_team_lead
  before update or delete on public.project_members
  for each row execute function public.prevent_last_team_lead_removal();

-- ============================================================
-- invites
-- ============================================================

create table public.invites (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  email text not null,
  role invite_role not null,
  token text unique not null default encode(gen_random_bytes(32), 'hex'),
  expires_at timestamptz not null default (now() + interval '14 days'),
  accepted_at timestamptz,
  created_by uuid not null references public.users(id),
  created_at timestamptz not null default now()
);

create unique index invites_token_idx on public.invites(token);
create index invites_project_email_idx on public.invites(project_id, email);

-- Accepting an invite has to bypass RLS on project_members (a brand-new
-- member can't insert their own membership row under the normal policy),
-- so it's done through a single security-definer function rather than a
-- raw client-side insert.
create function public.accept_invite(p_token text)
returns public.project_members
language plpgsql
security definer set search_path = public
as $$
declare
  v_invite public.invites;
  v_member public.project_members;
begin
  select * into v_invite from public.invites
    where token = p_token and accepted_at is null and expires_at > now();

  if v_invite is null then
    raise exception 'Invite is invalid, expired, or already used.';
  end if;

  insert into public.project_members (project_id, user_id, role)
  values (v_invite.project_id, auth.uid(), v_invite.role)
  on conflict (project_id, user_id) do nothing
  returning * into v_member;

  update public.invites set accepted_at = now() where id = v_invite.id;

  return v_member;
end;
$$;

-- ============================================================
-- documents
-- ============================================================

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  document_type document_type not null,
  title text,
  created_at timestamptz not null default now()
);

create index documents_project_idx on public.documents(project_id);

-- ============================================================
-- sections
-- ============================================================

create table public.sections (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  prompt text,
  content text,
  status section_status not null default 'not_started',
  "order" integer not null default 0,
  last_edited_by uuid references public.users(id),
  updated_at timestamptz not null default now()
);

create index sections_document_idx on public.sections(document_id);

comment on column public.sections.status is
  'team_reviewed may only be set via the explicit accept action in the API layer — never through a generic content-update call (Doc 4 validation rule).';

-- ============================================================
-- section_revisions — lightweight history, not CAD-style versioning
-- ============================================================

create table public.section_revisions (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.sections(id) on delete cascade,
  content_snapshot text,
  edited_by uuid references public.users(id),
  source revision_source not null,
  created_at timestamptz not null default now()
);

create index section_revisions_section_idx on public.section_revisions(section_id, created_at);

-- ============================================================
-- decisions — the Decisions Log
-- ============================================================

create table public.decisions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  section_id uuid references public.sections(id) on delete set null,
  decision text not null,
  alternatives text,
  rationale text not null,
  logged_by uuid not null references public.users(id),
  created_at timestamptz not null default now()
);

create index decisions_project_idx on public.decisions(project_id);
create index decisions_section_idx on public.decisions(section_id);

-- ============================================================
-- comments — Advisor review
-- ============================================================

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.sections(id) on delete cascade,
  author_id uuid not null references public.users(id),
  content text not null,
  resolved boolean not null default false,
  resolved_by uuid references public.users(id),
  created_at timestamptz not null default now()
);

create index comments_section_idx on public.comments(section_id);

-- ============================================================
-- publish_snapshots — the public portfolio page, opt-in per section
-- ============================================================

create table public.publish_snapshots (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  public_slug text unique not null,
  included_section_ids uuid[] not null default '{}',
  content_snapshot jsonb not null,
  published_by uuid not null references public.users(id),
  published_at timestamptz not null default now()
);

create unique index publish_snapshots_slug_idx on public.publish_snapshots(public_slug);

comment on table public.publish_snapshots is
  'content_snapshot must only ever be built from included_section_ids — never a join across the full project. This is what makes opt-in-per-section true at the data layer, not just the UI.';

-- ============================================================
-- notifications
-- ============================================================

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  type notification_type not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index notifications_unread_idx on public.notifications(user_id, read_at);

-- ============================================================
-- ai_generation_logs — cost/rate-limit tracking + audit trail
-- Extended in Part 3 with `type` so both AI surfaces share one fair-use pool.
-- Deliberately does NOT store prompt/response content long-term.
-- ============================================================

create table public.ai_generation_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  section_id uuid references public.sections(id) on delete set null,
  type ai_request_type not null,
  requested_at timestamptz not null default now(),
  succeeded boolean
);

create index ai_generation_logs_rate_limit_idx on public.ai_generation_logs(user_id, requested_at);

-- Rate-limit check, superseding the earlier draft's Redis proposal
-- (Part 4): a Postgres query against a table we already have, rather
-- than a second piece of infrastructure, at MVP request volume.
create function public.check_ai_rate_limit(p_user_id uuid, p_limit int default 20, p_window interval default interval '1 hour')
returns boolean
language sql
stable
as $$
  select count(*) < p_limit
  from public.ai_generation_logs
  where user_id = p_user_id
    and requested_at > now() - p_window;
$$;

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.users enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.invites enable row level security;
alter table public.documents enable row level security;
alter table public.sections enable row level security;
alter table public.section_revisions enable row level security;
alter table public.decisions enable row level security;
alter table public.comments enable row level security;
alter table public.publish_snapshots enable row level security;
alter table public.notifications enable row level security;
alter table public.ai_generation_logs enable row level security;

-- Helper: is auth.uid() a member of a given project, at any role?
create function public.is_project_member(p_project_id uuid)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.project_members
    where project_id = p_project_id and user_id = auth.uid()
  );
$$;

create function public.member_role_on(p_project_id uuid)
returns member_role
language sql
security definer set search_path = public
stable
as $$
  select role from public.project_members
  where project_id = p_project_id and user_id = auth.uid();
$$;

-- users: readable by anyone authenticated (name shown in team rosters,
-- comments, etc.); writable only by the user themselves.
create policy "users_select_authenticated" on public.users
  for select using (auth.role() = 'authenticated');
create policy "users_update_self" on public.users
  for update using (id = auth.uid());

-- projects
create policy "projects_select" on public.projects
  for select using (visibility = 'published' or public.is_project_member(id));
create policy "projects_insert" on public.projects
  for insert with check (created_by = auth.uid());
create policy "projects_update" on public.projects
  for update using (public.member_role_on(id) = 'team_lead');
create policy "projects_delete" on public.projects
  for delete using (public.member_role_on(id) = 'team_lead');

-- project_members: visible to fellow members only, not the public.
create policy "project_members_select" on public.project_members
  for select using (public.is_project_member(project_id));
create policy "project_members_update" on public.project_members
  for update using (public.member_role_on(project_id) = 'team_lead');
create policy "project_members_delete" on public.project_members
  for delete using (public.member_role_on(project_id) = 'team_lead');
-- Note: inserts happen only via accept_invite() (security definer) or the
-- handle_new_project trigger — no direct insert policy is granted.

-- invites: management restricted to the team_lead; not publicly readable
-- (token lookup for acceptance goes through accept_invite(), not a select).
create policy "invites_select" on public.invites
  for select using (public.member_role_on(project_id) = 'team_lead');
create policy "invites_insert" on public.invites
  for insert with check (public.member_role_on(project_id) = 'team_lead');
create policy "invites_delete" on public.invites
  for delete using (public.member_role_on(project_id) = 'team_lead');

-- documents / sections: readable if published or a member; writable by
-- team_lead/contributor only — advisors are comment-only (Doc 4 Feature 6).
create policy "documents_select" on public.documents
  for select using (
    public.is_project_member(project_id)
    or exists (select 1 from public.projects p where p.id = project_id and p.visibility = 'published')
  );
create policy "documents_write" on public.documents
  for all using (public.member_role_on(project_id) in ('team_lead', 'contributor'))
  with check (public.member_role_on(project_id) in ('team_lead', 'contributor'));

create policy "sections_select" on public.sections
  for select using (
    exists (
      select 1 from public.documents d
      where d.id = document_id
        and (
          public.is_project_member(d.project_id)
          or exists (select 1 from public.projects p where p.id = d.project_id and p.visibility = 'published')
        )
    )
  );
create policy "sections_write" on public.sections
  for all using (
    exists (
      select 1 from public.documents d
      where d.id = document_id
        and public.member_role_on(d.project_id) in ('team_lead', 'contributor')
    )
  );

create policy "section_revisions_select" on public.section_revisions
  for select using (
    exists (
      select 1 from public.sections s join public.documents d on d.id = s.document_id
      where s.id = section_id and public.is_project_member(d.project_id)
    )
  );
create policy "section_revisions_insert" on public.section_revisions
  for insert with check (
    exists (
      select 1 from public.sections s join public.documents d on d.id = s.document_id
      where s.id = section_id and public.member_role_on(d.project_id) in ('team_lead', 'contributor')
    )
  );

-- decisions
create policy "decisions_select" on public.decisions
  for select using (public.is_project_member(project_id));
create policy "decisions_write" on public.decisions
  for all using (public.member_role_on(project_id) in ('team_lead', 'contributor'));

-- comments: any project member (including advisors) can read and post;
-- resolving is left to the API layer to restrict to contributors/team_lead.
create policy "comments_select" on public.comments
  for select using (
    exists (
      select 1 from public.sections s join public.documents d on d.id = s.document_id
      where s.id = section_id and public.is_project_member(d.project_id)
    )
  );
create policy "comments_insert" on public.comments
  for insert with check (
    exists (
      select 1 from public.sections s join public.documents d on d.id = s.document_id
      where s.id = section_id and public.is_project_member(d.project_id)
    )
  );

-- publish_snapshots: public read (this is what the public viewer route
-- queries, unauthenticated); writes restricted to team_lead/contributor.
create policy "publish_snapshots_select_public" on public.publish_snapshots
  for select using (true);
create policy "publish_snapshots_write" on public.publish_snapshots
  for all using (public.member_role_on(project_id) in ('team_lead', 'contributor'));

-- notifications: strictly the recipient.
create policy "notifications_select" on public.notifications
  for select using (user_id = auth.uid());
create policy "notifications_update" on public.notifications
  for update using (user_id = auth.uid());

-- ai_generation_logs: users see and log only their own requests.
create policy "ai_generation_logs_select" on public.ai_generation_logs
  for select using (user_id = auth.uid());
create policy "ai_generation_logs_insert" on public.ai_generation_logs
  for insert with check (user_id = auth.uid());
