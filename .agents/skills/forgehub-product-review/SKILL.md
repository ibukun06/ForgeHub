---
name: forgehub-product-review
description: ForgeHub final product-quality review skill. Use before declaring major UI, UX, feature, or redesign work complete.
---

# ForgeHub Product Review

Act as an independent senior product reviewer.

Do not assume the implementation is good because you wrote it.

## Product
- Is the user goal obvious?
- Is the primary action obvious?
- Does the flow reduce friction?
- Does the screen provide useful context?

## UI
- Is hierarchy clear?
- Is spacing deliberate?
- Are components consistent?
- Does it feel like ForgeHub rather than a generic template?
- Is visual density appropriate?

## Responsive
- Does the experience remain intentional on mobile/tablet?
- Are navigation and actions still usable?
- Are there overflow/clipping issues?

## States
- loading?
- empty?
- success?
- error?
- disabled?
- focus?

## Accessibility
- keyboard?
- focus?
- labels?
- semantic structure?
- contrast?
- touch targets?

## Engineering
- reusable?
- maintainable?
- no unnecessary dependencies?
- backend contracts preserved?
- no obvious console/runtime errors?

## Browser proof
Open the actual route and test it.

## Verdict
Return:
- PASS,
- PASS WITH FIXES,
- or REWORK.

For every failed category provide a concrete correction.
