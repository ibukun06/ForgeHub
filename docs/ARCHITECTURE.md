# ForgeHub Architecture Audit

## Current Architecture Overview
ForgeHub is built on a modern React stack utilizing the Next.js 16 App Router. It follows a Server/Client Component hybrid model for rendering optimization, backed by Supabase for PostgreSQL database, authentication, and Row-Level Security (RLS). The application relies heavily on Tailwind CSS v4 for styling.

## Frontend Structure
- **Framework:** Next.js 16 (App Router) with React 19.
- **Routing:** Grouped routing for `(auth)`, `(marketing)`, and `(app)` shell. The main workspace resides at `/w/[workspaceSlug]/p/[projectSlug]/*`.
- **Component System:** 
  - Domain-specific components are organized in `src/components/*` (e.g., `explore`, `landing`, `project`, `projects`, `workspace`).
  - Core UI atoms reside in `src/components/ui/` (e.g., `alert`, `button`, `dialog`, `input`).
- **State Management:** Primarily relying on React Server Components for data fetching and passing props down to Client Components. Form state is managed via `react-hook-form` and validated using `zod`.
- **Styling:** Tailwind CSS v4 configured via `@tailwindcss/postcss`. Design tokens are defined in `src/app/globals.css`.

## Backend Structure
- **API routes:** Next.js Route Handlers (`src/app/api/*`) are used for specific backend operations like autosaving sections (`/api/projects/[id]/sections`).
- **Server Actions:** Used for form submissions and mutations (e.g., `src/lib/actions/auth.ts`, `src/lib/actions/onboarding.ts`).
- **Authentication:** Handled by `@supabase/ssr`. Middleware (`src/lib/supabase/middleware.ts`) protects authenticated routes and manages sessions.

## Database Structure
- **Provider:** Supabase (PostgreSQL).
- **Core Entities:** `projects`, `sections`, `profiles`.
- **Dormant Entities:** `project_members`, `invites`, `decisions`, `comments`, `publish_snapshots`, `ai_generation_logs` (schema and RLS exist, but no frontend implementation).
- **Security:** Heavy reliance on Row-Level Security (RLS) policies within Supabase to ensure data isolation between workspaces/projects.

## Technical Debt & Architectural Risks
1. **Hand-Written Types:** `src/lib/supabase/types.ts` is currently hand-written. It risks falling out of sync with actual database migrations unless explicitly regenerated using the Supabase CLI (`npx supabase gen types typescript`).
2. **Orphaned Database Entities:** A significant portion of the database schema (invites, team management, AI logs) lacks any corresponding frontend or API logic. This creates a disconnect between the data layer's capabilities and the product's actual features.
3. **Placeholder UI Components:** The app-shell contains routes (`plan`, `conversation`, `review`, `insights`) that are currently entirely static and lack underlying data models or state management.
4. **Environment Dependency:** The setup heavily relies on local environment configurations that may not map gracefully if standard tools (like Node.js or `npm`) are not globally available.

## Recommended Architectural Direction
1. **Sync Database Types:** Connect to a live Supabase instance and generate `types.ts` automatically to prevent drift.
2. **Flesh out App-Shell Data Layer:** Implement the backend services and React Server Components for the currently static workspace tabs (Plan, Conversation, Review, Insights).
3. **Implement Team Management UI:** Since the RLS and schema for `project_members` and `invites` are already established, the frontend should be prioritized to realize the "team" aspect of ForgeHub.
4. **Consolidate Data Fetching:** Standardize whether mutations should prefer Next.js Server Actions or API Route Handlers. The current architecture uses a mix of both (e.g., `lib/actions/` vs `app/api/projects/`).
# ForgeHub Architecture & Interaction Specification

*This contract defines the core domain model, entities, state machines, and relationships that power ForgeHub. All downstream features—including the Dashboard, Inbox, and Workspace Shell—are strictly consumers of these defined models.*

## 1. Entities

The system relies on the following atomic and composite entities:

- **User / Profile:** The core identity. Profiles contain an engineering portfolio, skills, and historical contributions.
- **Connection / Follow:** Social graph mechanics for one-way following and two-way collaborative connections.
- **Conversation / Message:** Connection-gated direct messaging.
- **Notification:** Actionable or contextual alerts (Inbox feed).
- **Workspace:** The top-level hierarchical container representing a team, company, or autonomous organization.
- **Workspace Member:** The junction mapping a User to a Workspace, including their Workspace-level Role.
- **Project:** A collaborative endeavor bounded within a specific Workspace.
- **Project Member:** The junction mapping a User to a Project, which can inherit or override Workspace Roles.
- **File / Folder / File Version:** The hierarchical and version-controlled engineering assets (CAD, code, docs).
- **Comment / Review:** Context-aware annotations attached to artifacts (geometry pins, document highlights) and formal approval cycles.
- **Invitation / Join Request:** Access gateways governing membership.
- **Activity:** Audit log events that populate social feeds and project histories.
- **Role / Permission / Capability:** The hierarchical access engine determining what a user can view or do (levels L0-L7).

## 2. Relationships (Ownership & Access)

### Ownership Hierarchy
- **Workspaces** own **Projects** and Workspace-level **Files**.
- **Projects** own Project-level **Files**, **Folders**, **Discussions**, and **Reviews**.
- **Files** own **Versions** and **Comments**.

### Social Graph
- **Users** follow **Users**, **Projects**, or **Workspaces**.
- **Users** request connections to **Users**.

### Permission & Inheritance
Effective access is computed precisely at runtime:
> `Effective Access = Permission (Global) + Role (Workspace/Project) + Resource (File) + Capability (L0-L7)`

- **Inheritance:** A user receives implicit project permissions derived from their Workspace Role, unless a Project Member record explicitly overrides it.
- **Public Projects:** Grant default `L1 (Preview)` or `L2 (Read)` capabilities to non-members depending on workspace settings.
- **Transfers:** If a workspace owner is transferred, ownership of all children (projects, files) cascades. If a user departs a workspace, their content (comments, activity) is retained but their membership and active permissions are revoked.

## 3. State Machines

The following strict state transitions govern system behavior:

### Connection Request
`Pending` → `Accepted` | `Declined` | `Blocked`
*Note: Direct messaging is unrestricted only after a connection reaches `Accepted`.*

### Project Join Request
`Requested` → `Accepted` | `Rejected` | `Withdrawn`
*Applies to projects configured as 'Accepting Applications' or 'Open to Collaborators'.*

### Workspace Invitation
`Pending` → `Accepted` | `Declined` | `Expired`

### File Upload & Processing
`Uploaded` → `Processing` (Extracting metadata, creating L1 derivatives) → `Ready` | `Failed`

### Review Cycle
`Draft` → `Requested` → `In Review` → `Approved` | `Changes Requested`
*Formalized gates preventing unauthorized merges or state changes to engineering files.*

## 4. Architectural Boundaries

To prevent ForgeHub from becoming a monolithic sidebar, functionality is strictly compartmentalized based on context:

- **Global View (Dashboard, Inbox, Explore, Network):** Cross-workspace aggregation.
- **Workspace Shell (`/w/[workspaceSlug]`):** The environment for Workspace Overview, Projects list, Members, and Settings.
- **Project Context (`/w/[workspaceSlug]/p/[projectSlug]`):** The environment for Project Files, Discussions, Reviews, and Activity.
- **File Context:** The Unified File Viewer (L0-L7), versions, and artifact-specific comments.

*This hierarchy is non-negotiable. Building UI components must always respect the scope of the entity they are representing.*
