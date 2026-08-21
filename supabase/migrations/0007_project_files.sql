create table public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  file_path text not null,
  file_type text,
  size_bytes bigint default 0,
  created_by uuid not null references public.users(id),
  created_at timestamptz not null default now()
);

-- RLS
alter table public.project_files enable row level security;

-- Policies for project_files
-- 1. Workspace members can view files for their projects.
-- 2. Anyone can view files if the project visibility is 'published'.
create policy "project_files_select_policy" on public.project_files
  for select using (
    exists (
      select 1 from public.projects p
      left join public.workspace_members wm on wm.workspace_id = p.workspace_id
      where p.id = project_files.project_id
      and (
        p.visibility = 'published' or wm.user_id = auth.uid()
      )
    )
  );

-- Only workspace members can insert/upload files
create policy "project_files_insert_policy" on public.project_files
  for insert with check (
    exists (
      select 1 from public.projects p
      join public.workspace_members wm on wm.workspace_id = p.workspace_id
      where p.id = project_files.project_id
      and wm.user_id = auth.uid()
    )
  );

-- Only file creator or workspace admin can delete
create policy "project_files_delete_policy" on public.project_files
  for delete using (
    created_by = auth.uid() or
    exists (
      select 1 from public.projects p
      join public.workspace_members wm on wm.workspace_id = p.workspace_id
      where p.id = project_files.project_id
      and wm.user_id = auth.uid()
      and wm.role = 'admin'
    )
  );
