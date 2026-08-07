# ForgeHub

A guided, AI-assisted documentation workspace for student and early-career
technical teams — built from the four-part rebuild synthesis
(`ForgeHub-Synthesis-01` through `04`).

**Status:** foundation + full auth loop. Document 9's Tier 1 validation
(real user interviews) is still the open item gating further build —
see the synthesis docs for context.

## What's built in this pass

- Project scaffold: Next.js (App Router) + TypeScript + Tailwind v4
- Design system tokens wired up in `globals.css` (Part 2 of the synthesis)
- Full database schema + RLS policies (`supabase/migrations/`) — the
  reconciled 11-table model from Part 3/4, plus a real, unique `projects.slug`
  column (`0003_project_slugs.sql`) generated once at creation time
- Complete auth loop: signup → email verification → onboarding → home,
  plus login, logout, and password reset
- The app-shell (`/w/[workspaceSlug]/p/[projectSlug]/*`) is the one and
  only project workspace now. An earlier, parallel `/project/[id]/*`
  implementation existed alongside it for a while — it's been retired;
  its only genuinely working part (the section-by-section documentation
  editor, autosave and all) was ported into the app-shell's Knowledge
  tab rather than rebuilt.
- Within the workspace: Overview (cockpit, real data), Work (task list,
  real data), Knowledge (the real documentation editor — create a
  section, edit it, autosave via `/api/projects/[id]/sections`) are all
  functional. Plan, Conversation, Review, and Insights are still static
  placeholder cards — real UI, no data behind them yet.

## What's not built yet

Team management (invite, accept, roles) and the Decisions Log have
**complete schema and RLS already** (`project_members`, `invites` +
`accept_invite()`, `decisions`) — no frontend anywhere. Same story for
Advisor comments (`comments`) and Publish (`publish_snapshots`):
schema-correct, zero UI. The AI drafting + Mentor chat surfaces and
notifications are further out — `ai_generation_logs` exists, nothing
calls the Claude API yet. All of this follows the same patterns
established here (Server Components for reads, Server Actions/API
routes for writes, RLS as defense-in-depth behind API-layer checks).

## Setup

1. Create a Supabase project.
2. Run the migrations in `supabase/migrations/` against it, in order
   (via the Supabase SQL editor, or `supabase db push` with the CLI
   linked to your project).
3. Copy `.env.local.example` to `.env.local` and fill in your project's
   URL and anon key (Project Settings → API).
4. `npm install`
5. `npm run dev`

## A note on types

`src/lib/supabase/types.ts` is hand-written to match the migration, since
no live Supabase project was available to generate against in this
environment. Once you've linked a real project, regenerate it with:

```
npx supabase gen types typescript --project-id <ref> > src/lib/supabase/types.ts
```

and diff it against the hand-written version to make sure nothing drifted.
