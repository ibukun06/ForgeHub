# ForgeHub Product Map

## Product Purpose
ForgeHub is a guided, AI-assisted documentation workspace tailored for student and early-career technical teams. It provides a structured environment to build, manage, and publish project documentation, bridging the gap between raw codebase repositories and polished portfolios or team knowledge bases.

## Target Users
- **Student Teams:** Collaborating on academic or extracurricular technical projects.
- **Early-Career Professionals:** Building portfolio projects and seeking structured documentation tools.
- **Project Owners / Contributors:** Managing project work, tasks, and documentation.
- **Advisors / Mentors (Planned):** Providing feedback, guidance, and project oversight.
- **Visitors:** Exploring public projects, reading documentation, and discovering teams.

## Core Features
- **Project Scaffold & Workspace:** A dedicated workspace (`/w/[workspaceSlug]/p/[projectSlug]`) for each project containing tabs for Overview, Work, and Knowledge.
- **Knowledge Editor:** A section-by-section documentation editor with autosave functionality.
- **Authentication Loop:** Full authentication including signup, email verification, onboarding, login, logout, and password reset.
- **Discovery (Explore):** Browsing and discovering public projects built by other teams.

## User Roles (Current & Planned)
- **Unauthenticated Visitor:** Can view the landing page, explore public projects, and read public documentation.
- **Authenticated User:** Can create projects, edit profiles, and access their own workspace.
- **Project Owner:** Full control over the project, sections, visibility, and publishing.
- **Project Contributor:** (Planned) Can collaborate on the workspace.
- **Advisor/Mentor:** (Planned) Can leave comments and interact with the team.

## Major User Journeys
1. **Visitor to User:** Landing Page → Explore → View Public Project → Sign Up → Onboarding → Dashboard.
2. **Project Creation:** Dashboard → Create Project → Add Information → Save → Access Workspace.
3. **Documentation:** Workspace → Knowledge Tab → Create Section → Edit (Autosave) → Review.
4. **Publishing:** Workspace → Publish (Placeholder) → Public Project.

## Application Routes
- **Marketing/Public:** `/`, `/explore`, `/projects/[slug]`
- **Authentication:** `/login`, `/signup`, `/onboarding`, `/reset-password`, `/auth/callback`
- **Dashboard:** `/dashboard`
- **Workspace:** `/w/[workspaceSlug]/p/[projectSlug]/*` (Overview, Work, Knowledge, Plan, Conversation, Review, Insights)
- **App Shell Navigation:** `/admin`, `/conversations`, `/home`, `/inbox`, `/projects`, `/reports`, `/templates`, `/work`

## Important Entities (Database Schema)
- **Projects:** Core entity with unique slugs.
- **Sections:** Documentation sections linked to projects.
- **Users/Profiles:** Linked to Supabase Auth.
- *(Planned schemas built but lacking UI: `project_members`, `invites`, `decisions`, `comments`, `publish_snapshots`, `ai_generation_logs`)*

## Current Strengths
- Solid technical foundation with Next.js App Router and Supabase RLS.
- Functional section-by-section autosaving editor (Knowledge tab).
- Complete and secure authentication flow.
- Good conceptual structure for the workspace layout.

## Current Weaknesses
- Several core workspace tabs (Plan, Conversation, Review, Insights) are currently static placeholder cards with no data or interactive functionality.
- Key collaboration features (Team management, Decisions Log, Mentorship) have backend schemas but zero frontend UI.
- Local development environment instructions may be incomplete (e.g., assuming `npm` and `node` are globally available, which they aren't in this specific Windows environment).
# ForgeHub Comprehensive Product Audit

## 1. Current Product Architecture
ForgeHub is structured as a guided, AI-assisted documentation workspace for engineering and technical teams.
- **Core Entities:** Users, Projects, Sections, Documents, Decisions, Comments.
- **Product Loops:** Unauthenticated discovery -> Authentication -> Workspace creation -> Section-by-section documentation -> Publishing.
- **State of Product:** The core foundation exists (Next.js, Supabase Auth, RLS, Autosave). However, a significant portion of the planned product surface (Plan, Conversation, Review, Insights, Team Management, AI Drafting, Mentor Chat) exists only as schema designs or static placeholder cards with no functional implementation.

## 2. Current UI Architecture
- **Framework:** React 19 / Next.js 16 App Router.
- **Styling:** Tailwind CSS v4 driven heavily by custom CSS variables injected into `globals.css`.
- **System:** Uses primitive atoms (`src/components/ui/`) and domain-specific groupings (`src/components/workspace/`). 
- **Missing Elements:** True reusable compound components (like Cards, Modals with proper z-indexing, empty states).

## 3. Current Backend / Data Architecture
- **Provider:** Supabase (PostgreSQL).
- **Security:** Handled extensively via Row-Level Security (RLS) policies.
- **API Strategy:** A hybrid approach using Next.js Route Handlers (e.g. `/api/projects/[id]/sections` for autosave) and Server Actions (e.g. `/lib/actions/auth.ts` for auth). 
- **Drift Risk:** Database types in `src/lib/supabase/types.ts` are hand-written, which poses a severe risk of falling out of sync with migrations.

## 4. Current User Journeys
- **Visitor -> User:** Landing -> Explore -> Signup -> Onboarding -> Dashboard. (Functional)
- **Creator Loop:** Dashboard -> Create Project -> Workspace (Overview/Work/Knowledge). (Functional)
- **Documentation Loop:** Knowledge tab -> Create Section -> Edit (debounced autosave) -> Review. (Functional)
- **Collaboration Loop:** *Non-existent*. Invites and members schema exist, but no frontend allows inviting team members.

## 5. Current Design-System Assessment
The design system leans toward a modern, dark-mode SaaS aesthetic (`--color-bg`, `--gradient-page`). It relies on standard Tailwind but heavily uses CSS variables.
- **Strengths:** High contrast, clear hierarchy, distinct brand primary/secondary colors. 
- **Weaknesses:** Unstandardized spacing variables, missing generic reusable components like `<Card>`, `<EmptyState>`.

## 6. Responsive Assessment
- **Desktop (1440+):** Clean layout, balanced text-wrapping, good use of hero sections.
- **Mobile (360x800):** Hamburger menu works, layouts collapse to single columns well. 
- **Findings:** The workspace sidebar navigation needs careful testing to ensure it doesn't break context switching parameters (`[workspaceSlug]`, `[projectSlug]`) when tucked into a mobile bottom nav or hamburger menu.

## 7. Accessibility Assessment
- **Current State:** Needs systematic review. Basic contrast ratios seem acceptable in the dark theme.
- **Gaps:** Aria-labels on dynamic content, focus rings (`outline: 3px solid var(--color-secondary)` is defined but needs verifying on all interactive elements), and keyboard navigation through the section editor.

## 8. UX Problems
- **P0:** (Discovered via Playwright) The main workspace route (`/w/...`) throws an immediate "That workspace or project view could not be found" error when no projects exist, providing no actionable "Create Project" fallback or onboarding within the workspace itself.
- **P1:** Empty states are either missing or unhelpful. If a project has no documents, the user is not guided on what to do next.
- **P1:** Lack of visual feedback during async operations (e.g., waiting for project creation or section generation).
- **P2:** Autosave network failures are not gracefully communicated to the user in the UI.

## 9. UI Problems
- **P0:** (Discovered via Playwright) **CRITICAL LAYOUT BUG:** The entire application shell (tested on `/home`, `/explore`, and `/w/...`) is catastrophically misaligned on wide viewports (1440px+). The main container is missing a `w-full` or `mx-auto` centering utility, causing the entire UI to pin to the left half of the screen, leaving a massive empty black void on the right side.
- **P1:** Static placeholder routes (Plan, Conversation, Review, Insights) disrupt the user experience by promising features that don't exist.
- **P2:** Form validation errors need consistent placement adjacent to inputs.
- **P3:** Inconsistent padding across cards and surface panels.

## 10. Technical Problems
- **P0:** Subagent local browser testing environment relies on Playwright drivers that fail to install from Microsoft CDNs on Windows x64.
- **P1:** `src/lib/supabase/types.ts` is hand-written. 
- **P1:** Mixed data mutation patterns (Server Actions vs. API Routes) without clear architectural guidelines.

## 11. Performance Problems
- **P2:** The app relies on Server Components, which is good, but without aggressive caching strategies, workspace navigations could feel sluggish under database load.

## 12. Security / Authorization Concerns
- **P0 / P1:** The `accept_invite` function uses a `security definer` bypass to insert users into `project_members`. This is powerful and correct by design, but requires rigorous testing to ensure token brute-forcing is impossible.
- **P1:** Client-side routing must not be trusted for authorization; every workspace fetch must validate against `is_project_member`.

## 13. Redesign Priorities
1. **Team Management UI:** Build the interface to invite users and manage roles to unlock the core value proposition of a "team workspace."
2. **Empty & Loading States:** Design and implement unified empty/loading state components for all lists and dashboards.
3. **App-Shell Cleanup:** Hide or implement the static placeholder tabs (Plan, Conversation, Review, Insights).

## 14. Recommended Implementation Order
1. **Tooling & Safety:** Connect Supabase CLI and auto-generate `types.ts` to prevent schema drift.
2. **Standardization:** Refactor existing UI atoms into standardized, reusable components (Card, EmptyState, Loader).
3. **Core Missing Features:** Implement Team Management (Invites, Roles).
4. **Flesh out Workspace:** Implement the missing tabs (Insights, Review) one by one.
5. **Polish:** Address error boundaries, autosave failure states, and accessibility.
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
