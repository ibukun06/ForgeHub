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
