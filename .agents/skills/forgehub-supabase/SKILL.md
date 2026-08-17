---
name: forgehub-supabase
description: ForgeHub Supabase engineering skill for Auth, PostgreSQL, RLS, data access, authorization, migrations, and secure server/client boundaries.
---

# ForgeHub Supabase

ForgeHub uses Supabase for authentication and database functionality with RLS.

## Before changing backend behaviour
Trace:
UI -> server/client boundary -> server action/API -> Supabase -> RLS/database -> response -> UI.

Identify all consumers before changing a contract.

## Security
Never rely on client-side checks as the only authorization mechanism.

Preserve:
- server-side authorization,
- Supabase RLS,
- ownership/member checks,
- least-privilege access.

Never print or expose secrets.

## Database
Before migrations:
1. inspect existing migrations,
2. inspect current schema,
3. inspect RLS policies,
4. identify dependencies,
5. determine whether the migration is backward compatible.

Do not delete or rename columns/tables casually.

## Auth
Test:
- unauthenticated access,
- authenticated access,
- logout,
- session handling,
- protected routes,
- unauthorized resource access.

## Data quality
Validate data at appropriate boundaries.
Do not trust arbitrary client payloads.

## Completion
A backend change is complete only when the browser flow and authorization behaviour have been tested.
