# Installing the ForgeHub Skills

The kit already contains ForgeHub-specific workspace skills under:

`.agents/skills/`

Antigravity officially supports workspace skills there.

## Recommended first run

Open ForgeHub in Antigravity and ask:

"List the available ForgeHub skills and explain which ones you would invoke for the initial product audit. Do not modify anything."

## Recommended activation

Do not manually force every skill into every task.

Let the agent select relevant skills based on their descriptions.

For a redesign:
- forgehub-ui
- forgehub-ux
- forgehub-design-system
- forgehub-responsive
- forgehub-browser-qa
- forgehub-product-review
- forgehub-nextjs16

For backend work:
- forgehub-supabase
- forgehub-security
- forgehub-nextjs16
- forgehub-browser-qa

For performance:
- forgehub-performance
- forgehub-nextjs16
- forgehub-browser-qa

For Git/release:
- forgehub-git-workflow

## External skills

Do not paste external repositories into ForgeHub blindly.

Instead:
1. inspect the skill,
2. check its instructions and scripts,
3. check whether it overlaps with ForgeHub rules,
4. copy only the useful skill folder,
5. test it on a small task,
6. remove it if it creates conflicting behaviour.

## Important distinction

`AGENTS.md` = global ForgeHub engineering constitution.

`.agents/rules/` = persistent workspace rules.

`.agents/skills/` = specialized procedures.

`docs/` = product and architecture knowledge.

Prompts = task-specific missions.

Keep these responsibilities separate.
