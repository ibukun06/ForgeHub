# FORGEHUB — RECOMMENDED MASTER ROADMAP

*This recommended roadmap diverges from the original planned phases by prioritizing the actual gaps discovered in the repository audit. It aggressively front-loads the Collaborative Core (which was promised but missing) and delays nice-to-have features like Public Portfolios until the core workspace functions.*

---

## PRIORITIZATION LEGEND
**P0 — Critical:** The platform is a prototype without this.
**P1 — Core:** Necessary for the primary user workflow.
**P2 — Strategic:** Creates market differentiation.
**P3 — Expansion:** Nice to have, adds breadth.
**P4 — Experimental:** Do not build yet.

---

## PHASE 1: THE COLLABORATIVE CORE (P0)
*Objective: Upgrade ForgeHub from a single-player UI prototype to a real multiplayer engineering tool.*

- **1.1 Real-Time Sync Foundation (P0)**
  - *Dependency:* Supabase Realtime / Yjs.
  - *Feature:* Implement live presence (who is online) and CRDT-based sync for the `doc-editor.tsx`.
- **1.2 Real Rich-Text Editor (P0)**
  - *Dependency:* Tiptap or Lexical.
  - *Feature:* Replace the hardcoded `doc-editor.tsx` with a functional block-editor capable of saving to the `documents` and `sections` tables.
- **1.3 Schema Synchronization (P1)**
  - *Dependency:* Database migrations.
  - *Feature:* Fix the mismatch between the UI Kanban columns and the database `SectionStatus` type to ensure tasks actually save correctly.

## PHASE 2: ENGINEERING PRIMITIVES (P1)
*Objective: Build the features that make ForgeHub different from Notion.*

- **2.1 Connected Decisions Log (P1)**
  - *Feature:* The Decisions Log (already partially built) must be linkable directly inside the new Document Editor (e.g., typing `/decision` inserts a live block).
- **2.2 The Universal Inbox (P1)**
  - *Feature:* Wire up the `swipeable-inbox-item.tsx` to actual Supabase `notifications` and allow users to approve Decisions directly from the inbox.
- **2.3 Engineering File Handling (P2)**
  - *Feature:* Implement basic storage and previewing for PDFs and generic assets, paving the way for CAD later.

## PHASE 3: THE DEPENDENCY GRAPH (P2)
*Objective: Establish ForgeHub's strategic differentiator.*

- **3.1 Visual Project Map (P2)**
  - *Feature:* Build a React Flow canvas that visually maps how Documents, Tasks (Sections), and Decisions relate to each other.
- **3.2 Automated Milestones (P2)**
  - *Feature:* Upgrade the current `PlanView` to calculate milestone health automatically based on the status of underlying sections in the graph.

## PHASE 4: AGENTIC COPILOT (P2)
*Objective: Move AI from a text-summarizer to a workspace participant.*

- **4.1 Context-Aware Command Palette (P2)**
  - *Feature:* Implement a global `Cmd+K` menu powered by the Gemini API that can search across all project documents and decisions.
- **4.2 Automated Reviewer (P3)**
  - *Feature:* An AI action that can be triggered on a Document to verify if it meets the requirements outlined in linked Decisions.

## PHASE 5: THE LIVING PORTFOLIO (P3)
*Objective: Create the external hook for user growth.*

- **5.1 Verified Profiles (P3)**
  - *Feature:* Generate public URLs for users that aggregate their completed Tasks and Decisions across public projects.
- **5.2 Public Documentation Export (P3)**
  - *Feature:* Allow a Project to flip a "Public" switch, rendering its documents in a GitBook-style reading layout (reusing the existing `explore` components).

---

## 🛑 DO NOT BUILD YET (P4 - Experimental)
*The audit strongly recommends avoiding these until Phase 3 is complete and validated by real users.*

- **In-Browser CAD Rendering (P4):** Highly complex, massive performance overhead. Stick to file attachments first.
- **Customizable Team Roles (P4):** Stick to the basic Student/Lead/Advisor triad. Do not build an enterprise granular RBAC system yet.
- **Marketplace / Templates (P4):** You need a product that works flawlessly for one team before you try to sell templates to thousands.
