-- ForgeHub V1 — Storage bucket + policies
-- Source: ForgeHub-Synthesis-01-PRD.md §4.10, 04-Security.md §2
--
-- Files are stored at: {project_id}/{file_name}
-- Corrects the earlier draft's bucket policy, which checked project
-- ownership only and would have locked collaborators out of a private
-- project's own files.

insert into storage.buckets (id, name, public, file_size_limit)
values ('project-files', 'project-files', false, 52428800) -- 50MB, per Doc 4 Feature 4
on conflict (id) do nothing;

create policy "project_files_read" on storage.objects
  for select using (
    bucket_id = 'project-files'
    and (
      public.is_project_member((storage.foldername(name))[1]::uuid)
      or exists (
        select 1 from public.projects p
        where p.id = (storage.foldername(name))[1]::uuid
          and p.visibility = 'published'
      )
    )
  );

create policy "project_files_write" on storage.objects
  for insert with check (
    bucket_id = 'project-files'
    and public.member_role_on((storage.foldername(name))[1]::uuid) in ('team_lead', 'contributor')
  );

create policy "project_files_delete" on storage.objects
  for delete using (
    bucket_id = 'project-files'
    and public.member_role_on((storage.foldername(name))[1]::uuid) in ('team_lead', 'contributor')
  );
