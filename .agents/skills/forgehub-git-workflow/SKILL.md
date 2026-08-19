---
name: forgehub-git-workflow
description: ForgeHub Git workflow skill for safe incremental changes, checkpoints, diffs, commits, and reviewable redesign work.
---

# ForgeHub Git Workflow

## Before major work
Check:
- git status
- current branch
- existing changes

Do not overwrite unrelated user work.

## Checkpoints
Create small commits before/after major phases.

Suggested messages:
- chore: establish ForgeHub design system
- refactor: rebuild responsive app shell
- feat: redesign project creation
- feat: improve workspace navigation
- fix: resolve mobile workspace overflow
- test: add ForgeHub critical flow coverage

## Review
Before committing:
- inspect diff,
- remove accidental changes,
- verify no secrets,
- run relevant checks.

## Principle
Small, reversible, reviewable changes beat one giant redesign commit.
