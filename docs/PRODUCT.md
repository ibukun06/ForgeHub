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
