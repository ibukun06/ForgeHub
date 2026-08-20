# ForgeHub — Final Browser QA + Production Readiness

The redesign is implemented.

Do not make assumptions.

Act as an independent QA engineer who did not write the changes.

## 1. Build checks

Run:
- lint
- production build

Record failures.

## 2. Browser smoke test

Open the real local WebApp.

Test:
- landing
- signup
- login
- onboarding
- home
- project creation
- project workspace
- Overview
- Work
- Knowledge
- documentation editing/autosave
- logout

Also test every newly implemented feature.

## 3. Responsive test

Test:
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

Look for:
- overflow
- clipped content
- broken sticky elements
- navigation failures
- modal failures
- unreadable text
- inaccessible controls
- poor spacing
- bad wrapping

## 4. UX attack

Try to break flows using:
- empty input
- invalid input
- long input
- rapid clicks
- refresh during a flow
- back/forward
- direct URL access
- unauthorized route access
- failed network/API request where safely testable

## 5. Visual QA

Look for:
- inconsistent spacing
- typography drift
- inconsistent components
- misaligned icons
- inconsistent radius
- inconsistent shadows
- unnecessary visual noise
- poor hierarchy
- awkward empty states
- weak error states

## 6. Accessibility QA

Check:
- keyboard navigation
- focus visibility
- labels
- dialogs
- buttons
- links
- form errors
- touch targets
- contrast

## 7. Backend regression

Verify:
- auth still works
- project data persists
- slug routing works
- documentation persists
- permissions remain correct
- no client-only authorization assumptions were introduced

## 8. Console/runtime

Inspect browser console/runtime errors.

Fix meaningful errors.

Do not hide errors by disabling logging.

## 9. Final report

Produce:

### Critical failures
### High-priority failures
### Medium issues
### Polish issues
### Passed flows
### Responsive findings
### Accessibility findings
### Performance findings
### Recommended final fixes

Do not declare production-ready until all P0/P1 issues are resolved or explicitly documented.
