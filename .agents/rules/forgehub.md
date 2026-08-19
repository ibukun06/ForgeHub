# ForgeHub Workspace Rules

## Before changing code
- Inspect the current implementation.
- Inspect the live/local WebApp for UI/UX tasks.
- Read the relevant Next.js 16 documentation under `node_modules/next/dist/docs/`.
- Identify dependencies and data contracts.

## Product rules
- ForgeHub is a technical documentation/workspace product for student and early-career technical teams.
- The product should feel engineered, trustworthy, modern, focused and intentional.
- Avoid generic dashboard/template aesthetics.
- Prioritize hierarchy, clarity, consistency and useful density.

## UI rules
- Use the shared design system.
- Prefer reusable primitives.
- Keep spacing, typography, borders, radius, shadows and interaction states consistent.
- Do not use decoration that competes with content.
- Every interactive element needs clear hover/focus/active/disabled behaviour where applicable.

## UX rules
Every important async interaction should have:
Idle -> Loading -> Success/Error.

Every empty state should explain:
- what is empty,
- why it is empty,
- what the user can do next.

Every error should be:
- understandable,
- actionable,
- safe to display.

## Responsive rules
Do not simply shrink desktop layouts.
Change information architecture and interaction patterns where required for mobile.

## Backend rules
- Preserve Supabase RLS and authorization semantics.
- Do not trust client-side authorization.
- Do not change database contracts without tracing all consumers.
- Prefer server-side authorization checks plus RLS defense-in-depth.

## QA rules
A feature is not complete until:
- it compiles,
- lint/build are clean or known issues are documented,
- the real browser flow works,
- affected mobile/tablet/desktop layouts work,
- important loading/error/empty states work,
- existing related flows still work.

## Stop conditions
Stop and ask for direction if:
- a requirement conflicts with existing product behaviour,
- a destructive migration is required,
- secrets/credentials are missing,
- a major architectural rewrite is required but not justified,
- the intended UX cannot be inferred safely from product context.
