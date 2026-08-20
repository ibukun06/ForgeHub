---
name: forgehub-nextjs16
description: ForgeHub Next.js 16 engineering guardrail. Use for routing, Server Components, Client Components, Server Actions, caching, metadata, errors, loading states, and framework-specific changes.
---

# ForgeHub Next.js 16

ForgeHub uses Next.js 16.2.x.

## Mandatory rule
Before framework-specific changes, consult the installed Next.js documentation under:
`node_modules/next/dist/docs/`

Do not rely on older Next.js patterns from training data.

## Architecture
Prefer clear Server/Client boundaries.

Do not add `"use client"` without a reason.

Avoid moving server-only logic into client components.

## Routing
The canonical project workspace uses:
`/w/[workspaceSlug]/p/[projectSlug]/*`

Do not revive the retired `/project/[id]/*` route structure unless explicitly justified.

## Data
Understand the current data-loading/caching model before changing it.

## States
Use appropriate loading/error boundaries and preserve useful user feedback.

## Completion
Run the actual app and verify the affected route in the browser.
