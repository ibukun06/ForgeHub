-- ForgeHub V2 — Settings System (Personal, Workspace, Project)
-- Extends the schema with flexible JSONB preference storage to avoid column bloat

-- 1. user_preferences (Personal Settings)
create table public.user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  appearance jsonb not null default '{"theme": "system", "density": "comfortable", "sidebar": "expanded"}'::jsonb,
  notifications jsonb not null default '{"projects": {"invites": true, "updates": true, "files": true, "comments": true, "reviews": true, "mentions": true, "activity": true}, "collaboration": {"invites": true, "role_changes": true, "permission_changes": true, "collaboration_requests": true}, "social": {"followers": true, "likes": true, "comments": true, "mentions": true}, "system": {"security": true, "account": true, "storage": true, "announcements": true}, "channels": {"in_app": true, "email": true}, "frequency": "immediately"}'::jsonb,
  privacy jsonb not null default '{"profile_visibility": "public", "discoverability": true, "activity_visibility": {"projects": true, "contributions": true, "activity": true, "collaborators": true}, "default_project_visibility": "private"}'::jsonb,
  files jsonb not null default '{"default_view": "grid", "default_sort": "updated_desc", "units": "metric", "preserve_originals": true, "image_compression": true, "upload_confirmation": true, "preview_generation": true}'::jsonb,
  collaboration jsonb not null default '{"invitations_allowed_from": "anyone", "requests_require_approval": true}'::jsonb,
  accessibility jsonb not null default '{"high_contrast": false, "reduced_motion": false, "reduced_transparency": false}'::jsonb,
  integrations jsonb not null default '{}'::jsonb,
  account jsonb not null default '{"default_start_page": "home"}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS for user_preferences
alter table public.user_preferences enable row level security;

create policy "Users can view own preferences" on public.user_preferences
  for select using (auth.uid() = user_id);

create policy "Users can update own preferences" on public.user_preferences
  for update using (auth.uid() = user_id);

create policy "Users can insert own preferences" on public.user_preferences
  for insert with check (auth.uid() = user_id);

-- Hook user_preferences into the existing on_auth_user_created trigger

create or replace function public.handle_new_user_preferences()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_preferences (user_id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created_preferences
  after insert on auth.users
  for each row execute function public.handle_new_user_preferences();

-- Backfill user_preferences for existing users
insert into public.user_preferences (user_id)
select id from auth.users
on conflict (user_id) do nothing;


-- 2. workspace_settings (Workspace Administration)
create table public.workspace_settings (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  general jsonb not null default '{"default_member_role": "member", "default_project_visibility": "private"}'::jsonb,
  security jsonb not null default '{"require_2fa": false, "domain_restrictions": []}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.workspace_settings enable row level security;

-- Workspace settings viewable by all workspace members
create policy "Workspace settings viewable by members" on public.workspace_settings
  for select using (
    exists (
      select 1 from public.workspace_members
      where workspace_id = public.workspace_settings.workspace_id
      and user_id = auth.uid()
    )
  );

-- Workspace settings updateable only by owner or admin
create policy "Workspace settings updateable by admins" on public.workspace_settings
  for update using (
    exists (
      select 1 from public.workspace_members
      where workspace_id = public.workspace_settings.workspace_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
    )
  );

create policy "Workspace settings insertable by admins" on public.workspace_settings
  for insert with check (
    exists (
      select 1 from public.workspace_members
      where workspace_id = public.workspace_settings.workspace_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
    )
  );

-- Function to initialize workspace settings automatically
create or replace function public.handle_new_workspace_settings()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.workspace_settings (workspace_id) values (new.id);
  return new;
end;
$$;

create trigger on_workspace_created_settings
  after insert on public.workspaces
  for each row execute function public.handle_new_workspace_settings();

-- Backfill workspace_settings for existing workspaces
insert into public.workspace_settings (workspace_id)
select id from public.workspaces
on conflict (workspace_id) do nothing;


-- 3. project_settings (Project Administration)
create table public.project_settings (
  project_id uuid primary key references public.projects(id) on delete cascade,
  features jsonb not null default '{"enable_reviews": true, "enable_versions": true}'::jsonb,
  files jsonb not null default '{"default_structure": "standard", "license": "none"}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.project_settings enable row level security;

-- Project settings viewable by anyone who can view the project
create policy "Project settings viewable by those who can view project" on public.project_settings
  for select using (
    exists (
      select 1 from public.projects
      where id = public.project_settings.project_id
      -- Using a naive check here for now. Actual project visibility policy applies elsewhere.
    )
  );

-- Project settings updateable by team_lead
create policy "Project settings updateable by team_lead" on public.project_settings
  for update using (
    exists (
      select 1 from public.project_members
      where project_id = public.project_settings.project_id
      and user_id = auth.uid()
      and role = 'team_lead'
    )
  );

create policy "Project settings insertable by team_lead" on public.project_settings
  for insert with check (
    exists (
      select 1 from public.project_members
      where project_id = public.project_settings.project_id
      and user_id = auth.uid()
      and role = 'team_lead'
    )
  );

-- Function to initialize project settings automatically
create or replace function public.handle_new_project_settings()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.project_settings (project_id) values (new.id);
  return new;
end;
$$;

create trigger on_project_created_settings
  after insert on public.projects
  for each row execute function public.handle_new_project_settings();

-- Backfill project_settings for existing projects
insert into public.project_settings (project_id)
select id from public.projects
on conflict (project_id) do nothing;

-- Extend public.users for full profile support
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS discipline text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS expertise text[];
