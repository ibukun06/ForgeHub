# ForgeHub — Production Redesign + Restructuring

The product audit is complete.

Now implement the redesign based on the evidence in:
- docs/PRODUCT.md
- docs/ARCHITECTURE.md
- docs/UX_AUDIT.md
- docs/DESIGN_SYSTEM.md
- docs/QA_PLAN.md
- docs/REDESIGN_ROADMAP.md

## Core instruction

Do not "make every page prettier."

Build a coherent ForgeHub product system.

The result should feel like a professionally designed technical workspace.

## Before coding

1. Read the audit documents.
2. Inspect the current browser UI again.
3. Confirm the local app runs.
4. Check Git status.
5. Create a checkpoint before major changes.
6. Identify the smallest safe implementation sequence.

## Design quality bar

ForgeHub should be:
- clean
- technically sophisticated
- focused
- credible
- visually coherent
- responsive
- accessible
- fast
- calm rather than flashy

Avoid:
- generic AI dashboard styling
- excessive gradients
- excessive glass
- excessive floating cards
- random border radii
- random shadows
- unnecessary animations
- decorative noise

## Foundation first

Before page-by-page redesign, standardize:
- tokens
- typography
- spacing
- surfaces
- borders
- radius
- shadows
- buttons
- inputs
- cards
- navigation
- dialogs
- toasts
- loading
- empty states
- errors

Do not create duplicate component systems.

## App shell

The app shell is foundational.

Ensure:
- sidebar/navigation is efficient,
- active state is obvious,
- current workspace/project is clear,
- mobile navigation is deliberate,
- the shell does not consume unnecessary screen space,
- navigation remains extensible for future features.

## Workspace

Treat `/w/[workspaceSlug]/p/[projectSlug]/*` as the canonical workspace architecture.

Do not restore the retired `/project/[id]/*` system.

Unfinished tabs must not be falsely presented as fully functional.

If a placeholder remains, make its status and next action intentional.

## Existing functionality

Preserve and test:
- auth
- onboarding
- project creation
- slug routing
- Overview
- Work
- Knowledge
- documentation editor
- autosave
- Supabase authorization/RLS

Do not break backend contracts to achieve visual changes.

## Responsive implementation

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

Do not merely shrink desktop.

Adapt:
- navigation
- grids
- forms
- cards
- actions
- tables
- modals
- content hierarchy

## Interaction states

Every important interaction must account for:
- idle
- hover
- focus
- active
- disabled
- loading
- success
- error
- empty

## Browser verification loop

After each major area:
1. run the app,
2. open the affected route,
3. interact with it,
4. screenshot where useful,
5. test responsive sizes,
6. inspect console/runtime errors,
7. fix issues,
8. re-test.

## Implementation order

Use this sequence unless the audit proves a better order:

1. design-system foundation
2. global layout/app shell
3. navigation/sidebar/mobile navigation
4. auth/onboarding
5. home/dashboard
6. project creation
7. workspace
8. Overview
9. Work
10. Knowledge/editor
11. Explore/discovery
12. profiles
13. secondary flows
14. loading/error/empty states
15. accessibility
16. performance
17. final visual polish

## Git discipline

Checkpoint each major phase.

Do not produce one giant redesign commit.

## Completion standard

Do not say "done" because:
- the build passes,
- lint passes,
- or the page looks better.

It is complete only when:
- critical user journeys work,
- browser verification passes,
- responsive layouts work,
- backend behaviour remains correct,
- important states are covered,
- accessibility is reasonable,
- the UI is coherent across the product,
- no obvious regressions remain.
