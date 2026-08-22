-- ForgeHub Phase 6: Engineering File Platform
-- Storage bucket for engineering artifacts (CAD, PDF, Code, Archives)

insert into storage.buckets (id, name, public, file_size_limit)
values ('engineering_artifacts', 'engineering_artifacts', false, 104857600) -- 100MB
on conflict (id) do nothing;

-- Same RLS concept as project-files, but applied to engineering_artifacts
create policy "engineering_artifacts_read" on storage.objects
  for select using (
    bucket_id = 'engineering_artifacts'
    and (
      public.is_project_member((storage.foldername(name))[1]::uuid)
      or exists (
        select 1 from public.projects p
        where p.id = (storage.foldername(name))[1]::uuid
          and p.visibility = 'published'
      )
    )
  );

create policy "engineering_artifacts_write" on storage.objects
  for insert with check (
    bucket_id = 'engineering_artifacts'
    and public.member_role_on((storage.foldername(name))[1]::uuid) in ('team_lead', 'contributor')
  );

create policy "engineering_artifacts_delete" on storage.objects
  for delete using (
    bucket_id = 'engineering_artifacts'
    and public.member_role_on((storage.foldername(name))[1]::uuid) in ('team_lead', 'contributor')
  );
