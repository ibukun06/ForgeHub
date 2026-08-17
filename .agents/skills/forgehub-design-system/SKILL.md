---
name: forgehub-design-system
description: ForgeHub design-system governance skill. Use when creating or modifying shared visual tokens, components, layouts, typography, spacing, surfaces, states, or interaction patterns.
---

# ForgeHub Design System Governance

## Source of truth
Use `docs/DESIGN_SYSTEM.md` and the existing implementation as the design-system sources of truth.

Do not create a second competing design system.

## Standardize
- typography
- spacing
- colours
- surfaces
- borders
- radii
- elevation
- buttons
- inputs
- cards
- navigation
- tabs
- dialogs
- toasts
- badges
- states

## Rules
If two components perform the same conceptual job, prefer one reusable component with variants.

If a page needs a one-off style, first determine whether the need belongs in the shared system.

## Visual consistency
Check:
- baseline alignment
- spacing rhythm
- typography hierarchy
- icon sizing
- button heights
- input heights
- radius consistency
- border treatment
- focus states
- dark/light behaviour if supported

## Don't over-design
A design system should reduce visual noise, not add decoration.

## Verification
When changing shared primitives, inspect multiple pages that consume them before declaring success.
