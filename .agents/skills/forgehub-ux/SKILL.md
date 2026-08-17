---
name: forgehub-ux
description: ForgeHub UX research and interaction-design skill. Use when redesigning flows, navigation, forms, onboarding, project workflows, empty states, errors, or information architecture.
---

# ForgeHub UX

Treat every interface as a user journey.

## Questions
Before changing a flow:
- Who is the user?
- What are they trying to accomplish?
- What information do they need?
- What is the primary action?
- What can be removed or deferred?
- What feedback does the user receive?
- How does the user recover from failure?

## Flow design
Prefer:
Discover -> Understand -> Act -> Feedback -> Next action.

Reduce unnecessary clicks without hiding important context.

## Forms
Provide:
- clear labels,
- useful grouping,
- validation close to the field,
- submission feedback,
- disabled/loading behaviour,
- recovery after errors.

## Empty states
Explain:
1. what is empty,
2. why it is empty,
3. what the user can do next.

## Errors
Translate technical failures into actionable user language. Never expose raw database/API errors unless intentionally safe and useful.

## Navigation
The user should know:
- where they are,
- what the current project/context is,
- what can be done here,
- how to move elsewhere.

## Validation
Use the browser to test the flow, not just the source code.
