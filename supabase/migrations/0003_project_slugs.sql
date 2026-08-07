-- ForgeHub V1 — Real project slugs
-- Source: workspace-consolidation milestone (resolves the /project/[id] vs
-- /w/[workspaceSlug]/p/[projectSlug] fork by keeping the app-shell route
-- and fixing what it was missing — a real slug column).
--
-- Before this migration, `projectSlug` in the app-shell routes was never
-- stored anywhere: every page load re-slugified every project the current
-- user could see (slugifyProjectName(name)) and scanned for a match. That
-- meant no server-side lookup by slug was possible, two projects with the
-- same name would collide silently, and every single project-scoped page
-- load fetched the user's ENTIRE project graph just to find one project.
-- This migration makes the slug a real, unique, generated-once column so
-- lookups become a single indexed query.

alter table public.projects add column slug text;

-- Backfill any existing rows (idempotent — safe to run on an empty table
-- or one with real data). Handles same-name collisions the same way new
-- inserts will: append -2, -3, ... until unique.
do $$
declare
  proj record;
  base_slug text;
  candidate text;
  suffix int;
begin
  for proj in select id, name from public.projects where slug is null order by created_at loop
    base_slug := trim(both '-' from regexp_replace(lower(proj.name), '[^a-z0-9]+', '-', 'g'));
    if base_slug = '' then
      base_slug := 'project';
    end if;

    candidate := base_slug;
    suffix := 2;
    while exists (select 1 from public.projects where slug = candidate) loop
      candidate := base_slug || '-' || suffix;
      suffix := suffix + 1;
    end loop;

    update public.projects set slug = candidate where id = proj.id;
  end loop;
end $$;

alter table public.projects alter column slug set not null;
create unique index projects_slug_idx on public.projects(slug);

comment on column public.projects.slug is
  'Generated once at creation time (see generateUniqueProjectSlug in src/lib/slug.ts) and never re-derived from name afterward — renaming a project must not break its existing URLs or the Follow/notification/publish records that reference it by id.';
