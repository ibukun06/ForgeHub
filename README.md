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
  final reconciled 11-table model from Part 3/4, including the
  `project_members`-based role system, storage bucket policies, and the
  Postgres-based AI rate-limit function
- Complete auth loop: signup → email verification → onboarding → dashboard,
  plus login, logout, and password reset
- Dashboard reading real data (empty state + populated project grid)

## What's not built yet

Everything past the dashboard: project workspace (Overview/Docs/Team/
Files/Timeline/Decisions/Advisor view), the AI drafting + Mentor chat
surfaces, publish/portfolio flow, and notifications. These follow the
same patterns established here (Server Components for reads, Server
Actions for writes, RLS as defense-in-depth behind API-layer checks).

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
