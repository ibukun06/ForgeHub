---
name: forgehub-responsive
description: ForgeHub responsive-design skill for mobile, tablet, desktop, touch interaction, layout adaptation, and viewport QA.
---

# ForgeHub Responsive Engineering

Responsive design means adapting the experience, not merely shrinking CSS.

## Required viewport matrix
At minimum test:
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

## At smaller widths
Consider deliberate transformations for:
- navigation
- sidebars
- grids
- tables
- forms
- action groups
- modals
- content hierarchy

## Mobile quality
Avoid:
- horizontal scrolling unless intentional,
- tiny controls,
- clipped modals,
- desktop-only interactions,
- inaccessible sidebars,
- cramped forms,
- buttons that are hard to tap.

## Browser procedure
1. Open the actual page.
2. Resize/change viewport.
3. Inspect layout.
4. Interact with primary actions.
5. Test scrolling and sticky/fixed elements.
6. Check keyboard/touch-relevant behaviour.
7. Fix.
8. Repeat.

Never declare a page responsive because a media query exists.
