# ForgeHub Agent Engineering Constitution

## Next.js version rule

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Product understanding

ForgeHub is a guided, AI-assisted documentation workspace for student and early-career technical teams.

Treat ForgeHub as a product, not a collection of pages.

For UI/UX work, inspect BOTH:
1. The repository.
2. The running WebApp through the browser.

Never infer the final visual state from source code alone.

## Current architecture

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Supabase Auth / database / RLS
- Server Components for reads where appropriate
- Server Actions/API routes for writes where established
- Main project workspace:
  `/w/[workspaceSlug]/p/[projectSlug]/*`

Do not recreate the retired `/project/[id]/*` workspace architecture unless there is a documented reason.

## Current product direction

The workspace is the core product surface.

Existing functional areas include:
- Overview
- Work
- Knowledge

Known future/unfinished areas include:
- Plan
- Conversation
- Review
- Insights
- Team management
- Decisions Log
- Advisor comments
- Publish
- AI drafting
- Mentor chat
- Notifications

Before implementing a supposedly unfinished feature, inspect the current repository and database because this document can become stale.

## Non-negotiable engineering rules

1. Do not redesign pages in isolation when a shared design-system solution is appropriate.
2. Do not assume existing UI is correct merely because it compiles.
3. Do not assume a route works merely because a file exists.
4. For UI tasks, use the browser and visually inspect the actual result.
5. Test mobile, tablet and desktop behaviour.
6. Preserve existing working functionality unless intentionally improving it.
7. Trace UI -> API/server action -> database -> response -> UI before changing data contracts.
8. Do not silently change Supabase schemas or RLS policies.
9. Do not expose secrets or print `.env` values.
10. Prefer reusable components over duplicated page-specific components.
11. Avoid unnecessary dependencies.
12. Do not introduce generic AI/SaaS visual patterns without a product reason.
13. Prefer restrained, purposeful animation.
14. Preserve accessibility.
15. Loading, empty, success and error states are part of the feature, not optional polish.
16. Do not declare work complete because the build passes.
17. Run lint/build and browser verification for affected functionality.
18. Create Git checkpoints before major architectural or visual phases.
19. When uncertain, inspect before guessing.
20. Do not make unrelated refactors during a focused task.

## Browser-first rule for visual work

For every significant UI/UX task:

1. Start the application.
2. Open the affected route in the browser.
3. Inspect the current UI.
4. Interact with the flow.
5. Capture screenshots when useful.
6. Implement.
7. Re-open the route.
8. Test the same flow again.
9. Test relevant responsive sizes.
10. Fix regressions before moving on.

## Responsive quality bar

At minimum consider:
- 360x800
- 375x812
- 390x844
- 412x915
- 768x1024
- 820x1180
- 1024x768
- 1280x800
- 1366x768
- 1440x900
- 1920x1080

Mobile is a first-class experience, not a shrunken desktop.

## Git discipline

Prefer small, reviewable checkpoints such as:
- `chore: establish ForgeHub design system`
- `refactor: rebuild responsive app shell`
- `feat: redesign project creation`
- `fix: resolve mobile workspace navigation`
- `test: add ForgeHub critical flow coverage`

Do not create one enormous unreviewable redesign commit.
