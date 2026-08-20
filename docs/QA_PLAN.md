# ForgeHub QA Plan

## Critical Flows to Test After Major Changes

This plan outlines the core user journeys and functional areas that must be manually or automatically tested whenever significant structural or visual changes occur.

### 1. Authentication & Onboarding
- [ ] **Sign Up:** User can create an account, receives an email (or mock), and completes the verification flow.
- [ ] **Onboarding:** User is forced through onboarding before accessing the dashboard. Form validates correctly.
- [ ] **Login / Logout:** Session persists across reloads and destroys correctly upon logout.
- [ ] **Password Reset:** The recovery flow generates a correct reset link and updates the credential successfully.

### 2. Navigation & App Shell
- [ ] **Route Protection:** Unauthenticated users attempting to access `/dashboard` or `/w/*` are redirected to `/login`.
- [ ] **Sidebar Navigation:** All links in the workspace sidebar resolve correctly and highlight the active route.
- [ ] **Context Switching:** Ensure URL parameters (`[workspaceSlug]`, `[projectSlug]`) do not break when navigating between tabs (Overview → Knowledge → Work).

### 3. Project Creation & Editing
- [ ] **Creation:** Dashboard "New Project" form validates input and redirects to the newly created project's workspace.
- [ ] **Slug Generation:** Ensure unique `project.slug` generation doesn't crash on duplicate names.
- [ ] **Editing Details:** Modifying project metadata saves correctly and updates the UI immediately.

### 4. Knowledge Editor (Documentation)
- [ ] **Section Creation:** Adding a new section updates the UI without a hard refresh.
- [ ] **Autosave:** Typing in the editor triggers a debounce save to `/api/projects/[id]/sections`. Ensure network tab shows 200 OK.
- [ ] **Content Persistence:** Hard refreshing the page after typing retains the newest data.

### 5. Discovery & Search (Explore Page)
- [ ] **Data Fetching:** The `/explore` page correctly loads public projects from the database.
- [ ] **Filtering:** Any category or technology tags accurately filter the displayed grid.
- [ ] **Routing:** Clicking a project card routes to the public project view, not the editing workspace.

### 6. API & Validation Failures
- [ ] **Network Errors:** Simulate network offline during a save operation; ensure the UI gracefully warns the user (e.g., "Save failed").
- [ ] **Form Validation:** Submit empty or invalid data to all forms (Auth, Project Creation) and verify `zod` validation errors appear adjacent to the fields.

### 7. Responsive Behavior Check
- [ ] **Mobile (360x800):** Sidebar collapses into a hamburger menu or bottom nav. Editor remains usable. No horizontal scrolling.
- [ ] **Tablet (768x1024):** Grid layouts adjust from 1 column to 2 columns where appropriate.
- [ ] **Desktop (1440+):** Content does not stretch infinitely; max-widths are respected.

### 8. Security / RLS Verifications
- [ ] **Data Isolation:** User A cannot access or modify User B's private project via URL manipulation.
- [ ] **API Protection:** Direct POST/PUT requests to API routes without a valid session cookie return 401 Unauthorized.
