# FORGEHUB — CURRENT PROGRESS ROADMAP

## 1. Executive Summary

ForgeHub currently exists as a **functional prototype and foundational platform**. The core architectural decisions (Next.js 16 App Router, Supabase Auth/DB, Tailwind CSS v4) have been successfully established. The application shell is implemented, featuring a distinct "Obsidian Glass" premium aesthetic, and the database schema is surprisingly mature, laying the groundwork for complex relationships (workspaces, projects, members, files, sections, decisions).

However, **product maturity trails technical maturity**. While the routing structure suggests a vast application (inbox, knowledge, board, insights, review), several of these key routes render beautifully designed but fundamentally mocked or functionally shallow components. The platform is currently a highly convincing single-player or lightly collaborative tool, but the heavily promised real-time and agentic AI features are either missing or in rudimentary states.

**Biggest Accomplishments:**
- A robust, RLS-secured Supabase database schema covering almost all planned entities.
- A highly polished, premium custom UI shell and component library.
- Fully functional authentication, workspace routing, and project abstraction.

**Biggest Weaknesses:**
- **Zero Real-Time Implementation:** Despite being a "collaborative workspace," there are no WebSocket channels, cursor sharing, or CRDT integrations (e.g., Yjs) implemented.
- **Mocked Documentation:** The core `doc-editor` is a hardcoded UI prototype.
- **Shallow AI:** The Gemini integration is currently limited to a basic text summarization script rather than an embedded agentic copilot.

---

## 2. Development Timeline

Based on Git history and migration files, the actual chronological development sequence was:

**Stage 0: Concept & Product Definition**
(No repository code, foundational vision)
↓
**Stage 1: Stable Platform Foundation & Database**
Initial Supabase migrations (Users, Projects, Invites, Documents, Sections, Decisions, Comments).
↓
**Stage 2: Authentication & Onboarding**
Implementation of `/(auth)` routes: login, signup, onboarding, invite, reset-password.
↓
**Stage 3: Workspace & Shell Routing**
Establishment of `/w/[workspaceSlug]/p/[projectSlug]` routing. Addition of workspaces to DB.
↓
**Stage 4: App Shell & Premium UI Design**
Implementation of the "Obsidian Glass" aesthetic, theme provider, and core layout.
↓
**Stage 5: Core Workspace Depth (Current)**
Partial implementation of Plan Views, Kanban Boards (`@dnd-kit`), and Decisions Log. Mocking of Knowledge/Doc editing.

---

## 3. Current Architecture

- **Framework:** Next.js 16.2.12 (App Router) using Turbopack.
- **Frontend UI:** React 19, Tailwind CSS v4, Framer Motion, Lucide Icons, `@dnd-kit` for drag-and-drop.
- **Backend/API:** Next.js Server Actions and API Routes (`/api/projects/*`).
- **Database:** Supabase PostgreSQL with Row Level Security (RLS).
- **Authentication:** Supabase SSR (Server-Side Rendering) Auth.
- **Storage:** Supabase Storage (schema for `project_files` exists).
- **AI:** Basic Google Gemini API implementation via `@google/genai`.
- **Realtime:** **Not implemented.**
- **State Management:** React local state + Optimistic UI (`useOptimistic`), leaning heavily on Server Components for data fetching.

---

## 4. Feature Inventory

| Feature | Status | Evidence | Completion | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Authentication** | ✅ COMPLETE | `src/app/(auth)` routes, Supabase SSR | 100% | Fully connected and functional. |
| **Landing Page** | ✅ COMPLETE | `src/app/(marketing)`, `landing` components | 95% | Polished UI, fully built. |
| **Workspaces** | ✅ COMPLETE | `0005_workspaces.sql`, `/w/[slug]` routing | 90% | Fully integrated into routing and DB schema. |
| **Projects** | ✅ COMPLETE | `0001_init.sql`, `/w/[slug]/p/[slug]` | 90% | Core abstraction works, settings exist. |
| **Decisions Log** | ✅ COMPLETE | `DecisionsView.tsx`, `/api/projects/[id]/decisions` | 85% | DB connected, UI functional. |
| **Tasks / Kanban** | 🟡 PARTIAL | `kanban-board.tsx`, `updateSectionStatus` action | 60% | Drag & Drop works, but schema mismatch (missing `in_progress` status in DB). |
| **Roadmap / Plan** | 🟡 PARTIAL | `PlanView.tsx`, reading from sections | 60% | Relies on sections/documents, UI works but depends on mocked docs. |
| **AI Integration** | 🟡 PARTIAL | `gemini.ts`, `ai_generation_logs` table | 20% | Just basic scripts for summarizing, offline fallbacks active. |
| **Explore / Portfolio** | 🔵 UI-ONLY | `src/components/explore` | 40% | Components built (BuilderCard, ProjectGrid) but largely disconnected from public profiles. |
| **Documentation** | 🔵 UI-ONLY | `doc-editor.tsx` | 15% | Exists as a beautiful hardcoded prototype. No editor state (ProseMirror/Lexical) or saving. |
| **Collaboration (Sync)** | ⚪ MISSING | No `channel` or `subscribe` in source | 0% | Planned but completely untouched. |
| **Collaboration (RBAC)** | 🟣 BACKEND-ONLY | `project_members`, `workspace_members` DB tables | 30% | Tables exist, but granular frontend role enforcement is missing. |

---

## 5. Routes Audit

- **`/(marketing)/*` (Public):** Highly polished, responsive landing and explore pages.
- **`/(auth)/*` (Public/Protected):** Standard Auth flows, robust implementation.
- **`/w/[workspaceSlug]/p/[projectSlug]/...` (Protected):**
  - `/board`: Functional Kanban board (drag & drop), minor schema issues.
  - `/docs`: Renders a mocked, hardcoded `doc-editor.tsx`.
  - `/insights`: UI shell exists.
  - `/roadmap`: Renders timeline based on sections.
  - `/team`: Settings and invites.
  - `/settings`: General, danger zone, features.

---

## 6. Database Audit

The Supabase schema is surprisingly mature compared to the UI:
- **Tables:** `users`, `projects`, `project_members`, `invites`, `documents`, `sections`, `section_revisions`, `decisions`, `comments`, `publish_snapshots`, `notifications`, `ai_generation_logs`, `workspaces`, `workspace_members`, `project_files`, `user_preferences`, `workspace_settings`, `project_settings`.
- **Relationships:** Well-defined foreign keys linking workspaces -> projects -> documents -> sections.
- **Inconsistencies:** The frontend Kanban board attempts to use an "in_progress" status, but the database `SectionStatus` type appears strictly mapped to `not_started`, `ai_draft`, `team_reviewed`, causing optimistic UI updates to fail or mismatch on the server.

---

## 7. UI/UX Audit

- **Visual Consistency:** Exceptionally high. Uses a dark, mechanical "Obsidian Glass" aesthetic.
- **Navigation:** Contextual rails and sidebars are well-structured.
- **Motion:** Framer Motion is heavily utilized for smooth transitions.
- **Empty States:** Custom empty state components exist (`empty-state.tsx`) and are used properly.
- **Mocked Interactivity:** Many elements (like the task capsules in `doc-editor`) look interactive but are purely visual prototypes.

---

## 8. Technical Debt

### High
- **Schema Mismatch:** The UI task states do not align with the database `SectionStatus` enum, breaking the Kanban workflow.
- **Fake UI Abstractions:** `doc-editor` needs to be entirely rewritten to use a real rich-text framework (e.g., Tiptap/Lexical).

### Medium
- **Missing Realtime:** The UI expects real-time updates (collaboration), but data is fetched via standard Server Components without subscriptions.

### Low
- **AI Fallbacks:** `gemini.ts` gracefully degrades when no API key is present, but the prompts are hardcoded and brittle.

---

## 9. What We Have Actually Accomplished

- [x] Next.js 16 App Router foundation established.
- [x] Complete Supabase schema and Auth integration.
- [x] Workspace & Project routing hierarchy.
- [x] Premium dark-mode design system.
- [x] Functional Decisions Log.
- [x] Foundational Drag-and-Drop Task Board.

---

## 10. Current Position

> **"If ForgeHub were a company/product today, what stage would the product actually be in?"**

ForgeHub is currently a **Late-Stage Alpha / Seed-Stage Prototype**. It has a beautiful facade and a solid database schema, making it an excellent demo for investors or internal testing. However, because the core value propositions—real-time collaboration and actual document editing—are either mocked or missing, it cannot yet support a real engineering team's daily workflow.
