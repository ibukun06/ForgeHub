---
name: forgehub-ui
description: ForgeHub-specific UI engineering skill for building coherent, accessible, production-quality interfaces. Use for visual redesigns, component work, page layouts, navigation, forms, cards, workspace surfaces, and UI polish.
---

# ForgeHub UI Engineering

## Purpose
Build ForgeHub as a coherent technical product, not a collection of visually unrelated pages.

## Before coding
1. Read `docs/DESIGN_SYSTEM.md`.
2. Inspect the current component and its consumers.
3. For visual tasks, open the running route in the browser.
4. Identify the user's primary task and primary action.
5. Reuse existing primitives before creating new ones.

## Design quality
Prioritize:
- hierarchy
- clarity
- consistency
- information density
- whitespace
- accessibility
- responsive behaviour
- purposeful interaction

Avoid:
- generic AI/SaaS dashboard aesthetics
- decorative gradients without purpose
- excessive glassmorphism
- excessive rounded containers
- random shadows/radii
- giant empty areas
- animation used only for decoration

## Component discipline
Before adding a component:
- search for an existing equivalent,
- determine whether the existing component can be extended,
- keep variants explicit,
- avoid page-specific duplicates.

## State completeness
For important interactive components, consider:
default, hover, focus-visible, active, disabled, loading, success, error, empty.

## Browser verification
After implementation:
- open the actual route,
- interact with it,
- verify the primary flow,
- inspect console/runtime errors,
- check relevant mobile and desktop sizes.

## Completion
Do not call UI work complete because it looks better in code. Verify the actual rendered application.
