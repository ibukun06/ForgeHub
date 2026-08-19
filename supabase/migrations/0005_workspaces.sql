-- ForgeHub V2 — Formal Workspaces Schema
-- Source: PRODUCT VISION (Workspaces)

create type workspace_type as enum ('personal', 'team', 'organization', 'education');
create type workspace_role as enum ('owner', 'admin', 'member', 'guest');

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  workspace_type workspace_type not null default 'personal',
  created_by uuid not null references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role workspace_role not null default 'member',
  joined_at timestamptz not null default now(),
  constraint workspace_members_unique unique (workspace_id, user_id)
);

create index workspace_members_workspace_idx on public.workspace_members(workspace_id);
create index workspace_members_user_idx on public.workspace_members(user_id);

-- Alter projects to belong to a workspace
alter table public.projects add column workspace_id uuid references public.workspaces(id) on delete cascade;

-- Backfill: Create a personal workspace for each existing user
do $$
declare
  u record;
  w_id uuid;
  base_slug text;
  candidate text;
  suffix int;
begin
  for u in select id, email, name from public.users loop
    -- Generate slug
    base_slug := trim(both '-' from regexp_replace(lower(coalesce(u.name, split_part(u.email, '@', 1))), '[^a-z0-9]+', '-', 'g'));
    if base_slug = '' then
      base_slug := 'workspace';
    end if;

    candidate := base_slug;
    suffix := 2;
    while exists (select 1 from public.workspaces where slug = candidate) loop
      candidate := base_slug || '-' || suffix;
      suffix := suffix + 1;
    end loop;

    -- Insert workspace
    insert into public.workspaces (name, slug, workspace_type, created_by)
    values (coalesce(u.name, split_part(u.email, '@', 1)) || '''s Workspace', candidate, 'personal', u.id)
    returning id into w_id;

    -- Insert membership
    insert into public.workspace_members (workspace_id, user_id, role)
    values (w_id, u.id, 'owner');

    -- Link user's projects to their new personal workspace
    update public.projects set workspace_id = w_id where created_by = u.id;
  end loop;
end $$;

-- Make workspace_id required
alter table public.projects alter column workspace_id set not null;

-- Trigger: When a new user signs up, automatically create their personal workspace
create function public.handle_new_user_workspace()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  w_id uuid;
  base_slug text;
  candidate text;
  suffix int;
begin
  base_slug := trim(both '-' from regexp_replace(lower(split_part(new.email, '@', 1)), '[^a-z0-9]+', '-', 'g'));
  if base_slug = '' then
    base_slug := 'workspace';
  end if;

  candidate := base_slug;
  suffix := 2;
  while exists (select 1 from public.workspaces where slug = candidate) loop
    candidate := base_slug || '-' || suffix;
    suffix := suffix + 1;
  end loop;

  insert into public.workspaces (name, slug, workspace_type, created_by)
  values (split_part(new.email, '@', 1) || '''s Workspace', candidate, 'personal', new.id)
  returning id into w_id;

  insert into public.workspace_members (workspace_id, user_id, role)
  values (w_id, new.id, 'owner');

  return new;
end;
$$;

create trigger on_auth_user_created_workspace
  after insert on public.users
  for each row execute function public.handle_new_user_workspace();

-- RLS
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;

create function public.is_workspace_member(p_workspace_id uuid)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = p_workspace_id and user_id = auth.uid()
  );
$$;

create policy "workspaces_select" on public.workspaces
  for select using (public.is_workspace_member(id));
create policy "workspaces_insert" on public.workspaces
  for insert with check (created_by = auth.uid());
create policy "workspaces_update" on public.workspaces
  for update using (
    exists (select 1 from public.workspace_members where workspace_id = id and user_id = auth.uid() and role in ('owner', 'admin'))
  );
create policy "workspaces_delete" on public.workspaces
  for delete using (
    exists (select 1 from public.workspace_members where workspace_id = id and user_id = auth.uid() and role = 'owner')
  );

create policy "workspace_members_select" on public.workspace_members
  for select using (public.is_workspace_member(workspace_id));
