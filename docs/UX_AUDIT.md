# ForgeHub UX Audit

*Note: Due to the unavailability of a local runtime environment (Node.js/npm missing), this UX audit is primarily based on structural codebase analysis and known product specifications.*

### P1 — High: Dead-End Navigation in Workspace
- **Location:** Workspace App Shell (`app/(app)/w/[workspaceSlug]/p/[projectSlug]/*`)
- **Problem:** Users navigating to "Plan", "Conversation", "Review", or "Insights" tabs are presented with static placeholder cards and no interactive functionality.
- **Why it matters:** Setting expectations for core features that do not exist yet creates a frustrating experience and damages perceived product maturity.
- **Evidence:** Source code shows these pages render static components without data hooks.
- **Recommended Solution:** Hide these tabs temporarily from the navigation until the corresponding backend and frontend data layers are implemented, or explicitly mark them as "Coming Soon" with an email waitlist form.
- **Affected Users:** All Authenticated Users / Project Owners.

### P1 — High: Missing Team Management Flows
- **Location:** Project Settings / Dashboard
- **Problem:** There is no UI for inviting team members, accepting invites, or managing roles.
- **Why it matters:** ForgeHub is billed as a "workspace for student and early-career technical teams." Without a way to invite a team, it operates as a single-player tool.
- **Evidence:** Database schema exists for `project_members` and `invites`, but no frontend components or API routes handle these actions.
- **Recommended Solution:** Prioritize building the Team Management UI based on the existing database schema.
- **Affected Users:** Project Owners, Contributors.

### P2 — Medium: Ambiguous Project "Publishing" State
- **Location:** Workspace / Project Dashboard
- **Problem:** The concept of "Publishing" a project exists in the database schema (`publish_snapshots`), but the UI does not clearly communicate whether a project is public, private, or draft.
- **Why it matters:** Users may inadvertently expose incomplete work, or conversely, fail to share finished work because the publishing state is opaque.
- **Evidence:** No clear UI components for managing project visibility or publishing snapshots.
- **Recommended Solution:** Implement a distinct "Publish" action in the workspace header with clear visibility toggles (Private/Public).
- **Affected Users:** Project Owners.

### P2 — Medium: Mixed Mutation Patterns (Server Actions vs. API Routes)
- **Location:** App-wide data mutations
- **Problem:** Some mutations (like auth) use Server Actions, while others (like saving sections) use Next.js API Routes (`/api/projects/[id]/sections`).
- **Why it matters:** Inconsistent data-saving paradigms can lead to inconsistent UX (e.g., some forms might show inline loading states, while others might rely on page reloads or lack optimistic UI updates).
- **Evidence:** `src/lib/actions` vs `src/app/api`.
- **Recommended Solution:** Standardize the approach for forms and data saving to ensure a unified loading and error-handling UX.
- **Affected Users:** All Users.

### P3 — Low: Missing "Empty States" for Workspace
- **Location:** Workspace (Overview, Work, Knowledge)
- **Problem:** While basic functionality exists, it's unclear if robust empty states exist to guide a user on their very first project creation.
- **Why it matters:** A blank documentation editor without guidance can cause blank-page anxiety for new users.
- **Recommended Solution:** Add onboarding tooltips or template suggestions when a project has zero sections.
- **Affected Users:** New Users.
