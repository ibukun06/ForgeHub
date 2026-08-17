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
