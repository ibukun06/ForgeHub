# FORGEHUB — SUPPOSED ROADMAP

*This document outlines what ForgeHub SHOULD accomplish and the ideal product-development path to achieve the vision of an AI-assisted engineering workspace and professional identity platform.*

---

## PHASE 0 — PRODUCT & SYSTEM FOUNDATION
**Objective:** Define the irrevocable rules of the platform's data and visual identity.

- **Identity Model:** Users exist independently but can belong to multiple Organizations/Workspaces.
- **Workspace Model:** The highest level of tenancy. Contains Projects and Teams.
- **Project Model:** The core container for engineering work. Contains Documents, Decisions, Milestones, and Artifacts.
- **Engineering Artifact Model:** A generic abstraction allowing the system to treat CAD files, code blocks, PDFs, and text sections as first-class citizens.
- **Design System:** "Obsidian Glass" — a mechanical, dark-mode-first aesthetic optimized for density and readability, avoiding generic SaaS bubbly UI.

## PHASE 1 — STABLE PLATFORM FOUNDATION
**Objective:** Establish rock-solid engineering constraints and infrastructure.

- **Architecture:** Next.js App Router with strict Server Component boundaries for reads and Server Actions for mutations.
- **Database Contracts:** Supabase PostgreSQL with comprehensive Row Level Security (RLS) guaranteeing tenant isolation.
- **Thematic Shell:** A globally accessible command palette, keyboard-first navigation shortcuts, and context-aware sidebars.
- **Security & Observability:** Strict environment variable typing, error boundaries, and telemetry for API latency.

## PHASE 2 — PERSONAL COMMAND CENTER
**Objective:** Give the solo engineer or team lead a singular place to understand their universe.

- **Global Dashboard:** Aggregated view of active tasks, unread reviews, and recent artifacts across all projects.
- **Universal Inbox:** A swipeable, keyboard-navigable notification hub that doesn't just alert, but allows inline action (e.g., approving a PR or signing off a design).
- **Command Palette:** `Cmd+K` interface to jump to any project, search any document, or log a decision instantly.
- **Professional Identity Setup:** The beginning of the user's living resume, linking their GitHub and identifying their primary skills.

## PHASE 3 — CORE ENGINEERING WORKSPACE
**Objective:** Replace Notion and Google Docs with an engineering-native documentation experience.

- **Structured Knowledge Base:** A block-based editor (Tiptap/Lexical) that understands engineering blocks (Code, Math, API endpoints, Diagrams).
- **Decisions Log (ADR Tracker):** A formal system for proposing, discussing, and locking architectural decisions, intrinsically linked to the documents that reference them.
- **Requirements & Specifications:** Traceable requirements that can be assigned statuses and verified against milestones.
- **Plan & Milestone Timeline:** A visual Gantt/Timeline view automatically generated from the status of documents and tasks, rather than manually drawn.

## PHASE 4 — ENGINEERING GRAPH / NODE SYSTEM
**Objective:** *Major Differentiator.* Move away from purely hierarchical folders to a relational model.

- **Visual Dependency Graph:** A canvas view (using `React Flow` or similar) showing how requirements map to design decisions, which map to specific CAD files or code modules.
- **Traceability:** If a requirement changes, the graph highlights all downstream artifacts, decisions, and tasks that are impacted.
- **Navigational Canvas:** The ability to navigate a complex project visually rather than through a sidebar tree.

## PHASE 5 — COLLABORATIVE ENGINEERING
**Objective:** Multi-player mode that rivals Figma and Google Docs.

- **Real-Time Sync:** WebSockets / CRDTs (Yjs) powering live cursors, presence indicators, and live typing in documents.
- **Inline Annotations:** The ability to highlight a specific sentence in a spec, or a specific area of an image/CAD preview, and start a comment thread.
- **Granular RBAC:** Strictly enforced roles:
  - *Student / Engineer:* Can draft and edit.
  - *Lead:* Can approve and merge.
  - *Advisor / Mentor:* Can comment and review, cannot mutate code/text.
  - *Sponsor / Viewer:* Read-only access to specific milestones.
- **Review Workflows:** Formal "Request for Review" states for documents and milestones, creating an audit trail of approvals.

## PHASE 6 — ENGINEERING FILE PLATFORM
**Objective:** Handle the heavy, obscure file types that engineering actually requires.

- **Native Previews:** In-browser rendering of CAD (STL, OBJ, STEP via WebGL/Three.js), PDF, and datasets (CSV, JSON).
- **Version History:** Immutable file versioning integrated with the milestone timeline.
- **Metadata Tagging:** Extracting metadata from engineering files and making them searchable in the Command Palette.

## PHASE 7 — AI ENGINEERING COPILOT
**Objective:** *Agentic UX.* Not just a chat window, but an AI that acts on the workspace.

- **Project Context:** The AI holds the entire project graph (Phase 4) in context.
- **Automated ADRs:** "Draft a decision based on the conversation in this comment thread."
- **Milestone Summaries:** Automatically generating weekly progress reports for Advisors based on closed tasks and merged PRs.
- **Critique & Review:** The AI acts as an automated "Mentor" role, flagging contradictory requirements or missing test plans in a specification document.

## PHASE 8 — PUBLIC PROJECTS & DOCUMENTATION
**Objective:** Turn private work into public proof.

- **Vanity URLs:** `forgehub.com/team-alpha/rover`
- **Published Documentation:** One-click publish of the Knowledge Base into a beautiful, Mintlify/ReadMe style public docs site.
- **Interactive Timelines:** A public view of the project's evolution, showing how the team iterated through failures to reach the final prototype.

## PHASE 9 — ENGINEER IDENTITY & PORTFOLIO
**Objective:** Replace the static resume with a verified graph of actual work.

- **The Living Portfolio:** A public profile aggregating verified contributions across public ForgeHub projects.
- **Skill Extraction:** Automatically inferring skills (e.g., "Systems Architecture", "React", "CAD Design") based on the tasks completed and decisions logged by the user.
- **Social Cards:** Auto-generated OpenGraph images, LinkedIn share cards, and GitHub README widgets proving the engineer's capability.

## PHASE 10 — ORGANIZATIONS & PROFESSIONAL NETWORK
**Objective:** Scale from teams to institutions.

- **University/Company Hubs:** Custom domains and grouped projects for an entire engineering cohort or startup incubator.
- **Cohort Analytics:** Giving professors or engineering managers a dashboard to see which teams are blocked, who is accelerating, and where intervention is needed.

## PHASE 11 — MARKETPLACE / ECOSYSTEM (SPECULATIVE)
**Objective:** Create a two-sided network of resources.

- **Templates:** Standardized project structures (e.g., "Hardware Startup MVP", "Software Capstone").
- **Expert Network:** The ability for a team to "Request a Review" from a verified industry expert on the platform.
