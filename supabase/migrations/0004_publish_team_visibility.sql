-- ForgeHub V1 — Public team visibility for published projects
-- Source: publish milestone.
--
-- project_members_select only ever allowed project members to read
-- project_members — documents_select and sections_select both already
-- have an "or published" branch (checked against the real migration
-- before writing this, not assumed); project_members never got the
-- matching one. Given the PRD's own stated use case for a public
-- project page — "a link to send recruiters that proves they can
-- actually build hardware" — that only means anything if the builder's
-- name is actually visible, so this reads as an oversight, not an
-- intentional privacy choice. The Decisions Log, by contrast, stays
-- member-only on purpose per Document 4/Security's explicit statement
-- ("never included in a publish snapshot by default") — that one is
-- correct as-is and is NOT touched here.
--
-- Deliberately NOT fixed by broadening project_members_select or
-- users_select directly: users_select is gated to authenticated
-- sessions only, and email is documented PII (04-Security.md). Widening
-- either policy for anonymous readers would leak email alongside name.
-- Instead: one narrow, single-purpose function — same pattern already
-- used for is_project_member/member_role_on — that returns only name +
-- role, and only for members of a project that is actually published.

create function public.published_project_team(p_project_id uuid)
returns table (user_id uuid, name text, role member_role)
language sql
security definer set search_path = public
stable
as $$
  select u.id, u.name, pm.role
  from public.project_members pm
  join public.users u on u.id = pm.user_id
  join public.projects p on p.id = pm.project_id
  where pm.project_id = p_project_id
    and p.visibility = 'published';
$$;

comment on function public.published_project_team is
  'Public-safe team roster for a published project only — name and role,
   never email or any other user column. The narrow alternative to
   broadening project_members_select/users_select for anonymous readers.';
