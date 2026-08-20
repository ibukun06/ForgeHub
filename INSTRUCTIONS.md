# Milestone 0 — Workspace Consolidation + Real Slugs

## 1. Overwrite these files (already exist in your repo)

- `README.md`
- `src/app/(app)/w/[workspaceSlug]/p/[projectSlug]/knowledge/page.tsx`
- `src/app/api/projects/route.ts`
- `src/components/projects/ProjectCreationForm.tsx`
- `src/lib/app-shell-data.ts`
- `src/lib/supabase/types.ts`

## 2. Add these new files

- `src/lib/slug.ts`
- `supabase/migrations/0003_project_slugs.sql`

## 3. Delete these files

- `forgehub-deployment-fixes.patch` (already fully applied — checked
  every change in it against current `package.json`/`src` before
  deleting; it was dead weight)
- `src/app/dashboard/layout.tsx` (its header/logout/theme-toggle UI
  never rendered — `dashboard/page.tsx` immediately `redirect()`s to
  `/home` before it would ever be seen)
- `src/app/project/[id]/layout.tsx`
- `src/app/project/[id]/overview/page.tsx`
- `src/app/project/[id]/docs/page.tsx`
- `src/components/workspace/WorkspaceShell.tsx`
- `src/components/workspace/WorkspaceHeader.tsx`
- `src/components/workspace/WorkspaceOverview.tsx`
- `src/components/workspace/WorkspaceSidebar.tsx`
- `src/components/workspace/data.ts`

(`src/components/workspace/DocumentationEditor.tsx` stays — untouched,
now imported by the Knowledge page above instead of the deleted legacy
route.)

## 4. Run the migration

Apply `0003_project_slugs.sql` against your Supabase project (same way
as `0001`/`0002` — SQL editor, or `supabase db push`). It's safe to run
even with existing project rows: it backfills a slug for every row that
doesn't have one yet, using the same collision-safe generator the app
uses for new projects, before adding the `not null` + unique constraint.

Then regenerate `src/lib/supabase/types.ts` against the real project
per the note already in that file, and diff it against the
hand-written version I'm shipping here — I added `slug` by hand since
there's no live project to generate against in this environment.

## What this milestone actually did

Resolved the fork we discussed: two competing implementations of "the
project workspace" existed in `main` at once —
`/project/[id]/*` (older, real doc-editing, no app chrome) and
`/(app)/w/[workspaceSlug]/p/[projectSlug]/*` (newer, inside the real
app shell, but half its tabs were static placeholder cards). Per what
we agreed:

- **Kept the app-shell** as the one workspace, because it's the one
  that's actually inside `(app)/layout.tsx` — the alternative was a
  product that permanently forks into two navigation systems.
- **Fixed the reason it was fragile**: `projectSlug` was never a real
  column. Every page load re-derived it from the project name on the
  fly and scanned the user's *entire* project graph for a match — no
  server-side lookup was possible, two same-named projects would
  collide silently, and it was doing far more work than it needed to.
  `projects.slug` is now a real, unique, generated-once-at-creation
  column (`src/lib/slug.ts`), and `getProjectGraphBySlug` in
  `app-shell-data.ts` is a single indexed query instead of a scan.
- That rewrite also closes a real gap the old version had: it now
  actually enforces "published OR member" (matching the `projects_select`
  RLS policy) instead of only ever being able to find projects the
  current user already belongs to.
- **Ported the one thing worth keeping** from the legacy route — the
  working section editor, autosave and all — into the app-shell's
  Knowledge tab, reusing `DocumentationEditor.tsx` and its existing API
  routes unchanged. Functional parity, not a rebuild.
- Deleted the legacy route and its now-orphaned shell components, the
  dead `/dashboard` layout, and the already-applied patch file sitting
  at repo root.

## What this deliberately did NOT touch (next milestone's job, not this one)

- Knowledge's visual design still looks like the plain legacy editor,
  not the app-shell's `surface-panel` language — functional correctness
  came first.
- The old KnowledgeScreen's read-only Decisions + research-library
  summary isn't in the new Knowledge page — genuinely different content
  from "edit a section," worth adding back deliberately, not folded in
  silently.
- Team, Decisions Log UI, Advisor comments, Publish: still zero
  frontend, same as before this milestone. Schema's ready for all four
  — that's the actual next milestone.
