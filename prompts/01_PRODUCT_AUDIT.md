# ForgeHub — Product Intelligence + Browser Audit

You are the Lead Product Engineer, UX Architect, UI Designer, Software Architect and QA Engineer for ForgeHub.

IMPORTANT: THIS IS AN AUDIT ONLY.

Do not redesign or modify application code during this task.

## Mission

Understand ForgeHub completely as:
1. a real running product,
2. a frontend codebase,
3. a backend/data system,
4. a responsive interface,
5. a set of user journeys.

Do not rely on repository code alone.

## Phase 1 — Repository reconnaissance

Inspect the entire repository relevant to the application.

Read:
- package.json
- AGENTS.md
- INSTRUCTIONS.md
- app routes
- layouts
- components
- lib/data utilities
- API routes
- Supabase migrations
- auth implementation
- globals.css/design tokens
- forms and validation
- existing documentation

Because this repository uses Next.js 16, consult the installed Next.js documentation under `node_modules/next/dist/docs/` before making framework-specific conclusions.

Produce an architecture map.

## Phase 2 — Run the application

Determine the correct local environment.

Do not print secrets.

Start ForgeHub and identify the actual local URL.

## Phase 3 — Browser exploration

Use Antigravity's Browser Agent.

Interact with the real application.

Explore every reachable route.

At minimum:
- marketing/landing
- signup
- login
- verification/onboarding
- home
- project creation
- project workspace
- Overview
- Work
- Knowledge
- project navigation
- profiles/explore if currently reachable
- all other routes discovered from the repository

Do not stop because a page looks incomplete.

Determine whether it is:
- intentionally placeholder,
- partially implemented,
- broken,
- inaccessible,
- or simply not linked.

## Phase 4 — Real user simulation

Perform realistic workflows.

Do not just open URLs.

Click through:
- signup/login
- onboarding
- project creation
- opening a project
- navigating workspace sections
- editing documentation
- saving/autosaving
- refreshing
- returning to the project
- logging out

Document what actually happens.

## Phase 5 — Visual audit

Use screenshots where helpful.

Inspect:
- hierarchy
- spacing
- typography
- navigation
- cards
- forms
- buttons
- surfaces
- borders
- shadows
- icons
- empty states
- loading states
- error states
- responsiveness

Identify what makes the current interface feel less polished.

Do not use vague statements like "make it more modern."

Describe the actual problem and the intended improvement.

## Phase 6 — Responsive audit

Test:
360x800
375x812
390x844
412x915
768x1024
820x1180
1024x768
1280x800
1366x768
1440x900
1920x1080

Look for:
- horizontal overflow
- broken layouts
- sidebar problems
- navigation problems
- clipped modals
- unusable forms
- awkward wrapping
- excessive whitespace
- tiny touch targets
- desktop-only assumptions

## Phase 7 — Backend/data understanding

Trace:
UI
-> server component/client state
-> server action/API
-> Supabase
-> response
-> UI

Map:
- auth
- project lookup
- slug routing
- workspace data
- documentation sections
- permissions
- RLS

Do not change schema.

## Phase 8 — UX audit

Rank issues:
P0 critical
P1 high
P2 medium
P3 low

For every issue provide:
- location
- evidence
- user impact
- technical cause if known
- recommended solution
- acceptance criteria

## Phase 9 — Produce documents

Update:
- docs/PRODUCT.md
- docs/ARCHITECTURE.md
- docs/UX_AUDIT.md
- docs/DESIGN_SYSTEM.md
- docs/QA_PLAN.md

Also create:
`docs/REDESIGN_ROADMAP.md`

The roadmap must separate:
1. must-fix bugs
2. architecture cleanup
3. design-system work
4. app-shell work
5. authentication
6. project creation
7. workspace
8. discovery/profiles
9. future product features
10. final polish

## Final response

Give me:
- what ForgeHub actually is today,
- what is working,
- what is broken,
- what is visually weak,
- what is UX weak,
- what is technically weak,
- what is architecturally weak,
- what should be redesigned,
- what should not be touched,
- the exact recommended implementation order.

DO NOT implement the redesign in this task.
