---
name: forgehub-browser-qa
description: ForgeHub browser-based QA skill for validating real user flows, UI states, regressions, console errors, and responsive behaviour using Antigravity Browser Agent.
---

# ForgeHub Browser QA

The browser is the source of truth for rendered behaviour.

## Smoke-test philosophy
Do not only visit URLs. Perform actions.

For affected functionality:
- navigate,
- click,
- type,
- submit,
- reload,
- return,
- verify persistence,
- verify feedback.

## Core ForgeHub flows
Where available:
- signup/login
- onboarding
- home
- create project
- open project
- workspace navigation
- Overview
- Work
- Knowledge
- edit documentation
- autosave
- reload and verify persistence
- logout

## Attack the happy path
Try:
- empty input,
- invalid input,
- long input,
- rapid repeated actions,
- refresh,
- back/forward,
- direct URL access,
- unauthorized access where safely testable,
- failed request states.

## Visual QA
Look for:
- overflow,
- clipping,
- alignment,
- wrapping,
- inconsistent spacing,
- broken sticky elements,
- modal overflow,
- weak states,
- console errors.

## Evidence
For important visual findings, capture a screenshot and reference the route/viewport.

## Completion
A passing build is not browser QA.
