---
name: forgehub-security
description: ForgeHub application security review skill for Next.js, Supabase Auth, RLS, authorization, input handling, secrets, and data exposure.
---

# ForgeHub Security Review

Perform safe, non-destructive security checks.

## Review
- authentication
- authorization
- RLS
- server/client boundaries
- API access
- input validation
- sensitive data exposure
- secrets
- file/data access
- direct URL access

## Critical rule
Never trust a hidden UI control as authorization.

Verify authorization on the server and through RLS where applicable.

## Secrets
Never print:
- API keys
- service role keys
- tokens
- passwords
- `.env` values

## Findings
Classify:
- critical
- high
- medium
- low

Include:
- evidence,
- impact,
- safe remediation.

Do not perform destructive exploitation.
