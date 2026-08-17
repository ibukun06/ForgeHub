# ForgeHub — Antigravity / Gemini AI Engineering Kit

This kit is customized for the current public ForgeHub repository.

Repository:
https://github.com/ibukun06/ForgeHub

Current repository facts used when preparing this kit:
- Next.js App Router + TypeScript + Tailwind v4
- Supabase backend/database with RLS
- Node >= 22
- Authentication loop is implemented
- Main project workspace uses `/w/[workspaceSlug]/p/[projectSlug]/*`
- Overview, Work and Knowledge have functional data-backed behaviour
- Plan, Conversation, Review and Insights are currently placeholder surfaces
- Team, Decisions, Advisor comments and Publish have schema/RLS foundations but no frontend yet
- AI drafting/Mentor chat and notifications are future work
- Existing `AGENTS.md` only contains the Next.js-version warning, so the enhanced AGENTS file in this kit preserves that rule and adds ForgeHub-specific engineering rules.

IMPORTANT:
Do not blindly overwrite the repository with every file in this kit.

Recommended adoption order:
1. Replace/merge `AGENTS.md`.
2. Add `.agents/rules/forgehub.md`.
3. Add `docs/` files.
4. Use `prompts/01_PRODUCT_AUDIT.md` as the first Antigravity task.
5. Review the generated audit.
6. Only then use `prompts/02_REDESIGN_IMPLEMENTATION.md`.
7. Use `prompts/03_FINAL_QA.md` after implementation.

The prompts deliberately force the agent to inspect the real running application through the browser before making visual/UX decisions.

The uploaded reference video was also reviewed. It is generic AI-coding workflow advice rather than a ForgeHub product walkthrough, so it is not treated as evidence about ForgeHub's current UI.


## Added ForgeHub-native skills

This kit now includes 11 workspace skills under `.agents/skills/`:
- forgehub-ui
- forgehub-ux
- forgehub-design-system
- forgehub-responsive
- forgehub-browser-qa
- forgehub-supabase
- forgehub-product-review
- forgehub-nextjs16
- forgehub-security
- forgehub-performance
- forgehub-git-workflow

See `EXTERNAL_SKILLS.md` for curated third-party skill repositories and `INSTALL_SKILLS.md` for the recommended installation strategy.
