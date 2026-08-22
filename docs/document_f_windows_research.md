# FORGEHUB — WINDOWS 26H1 UX RESEARCH

*Verified research on recent operating system UX evolution (specifically Windows 11 continuous updates leading into 2026/26H1) and how OS-level paradigms inform complex web applications.*

---

## 1. The Convergence of OS and Web

By 2026, the line between a native desktop application and a web-based SaaS has entirely dissolved. Users expect web applications (especially complex workspaces like ForgeHub) to behave with the performance, context-awareness, and window-management capabilities of a native OS.

## 2. Key UX Principles from Modern Windows (26H1 Era)

### A. Contextual and Condensed Menus
- **The OS Paradigm:** Windows 11 aggressively condensed the traditional, sprawling context menu into a compact, icon-first primary tier, hiding complex actions behind "Show more options" (`Shift+F10`).
- **Application to ForgeHub:** ForgeHub's document editor and project boards should employ strict contextual menus (right-click or `...` triggers) that prioritize the 3-4 most common actions (Edit, Share, Log Decision) and bury destructive or rare actions.

### B. Snap Layouts and Spatial Multitasking
- **The OS Paradigm:** Hovering over the maximize button reveals Snap Layouts, allowing users to instantly tile windows. Power users rely heavily on spatial memory.
- **Application to ForgeHub:** ForgeHub should support internal windowing or split-pane views. Engineers frequently need to look at a Specification Document (left pane) while viewing a CAD file or writing an ADR (right pane). Relying solely on browser tabs breaks context.

### C. System-Level AI Integration (Copilot Evolution)
- **The OS Paradigm:** Windows Copilot moved from a dedicated sidebar to an ambient intelligence layer that understands the current active window (e.g., "Summarize this PDF I'm looking at").
- **Application to ForgeHub:** ForgeHub's AI must be context-aware. If a user opens the AI command palette while on the Kanban board, the AI should assume the context is "Tasks". If they open it on a Document, the context is "Knowledge".

### D. Mica and Background Blur (Materiality)
- **The OS Paradigm:** Windows uses "Mica" to let the desktop background subtly tint application windows, creating a sense of hierarchy and depth without the heavy performance cost of true acrylic blur.
- **Application to ForgeHub:** ForgeHub's "Obsidian Glass" UI already mimics this effectively. The application shell (sidebar, top nav) should feel distinctly separate from the "Canvas" (the document or board) via subtle material transparency, anchoring the user's spatial awareness.

### E. Notification Centers vs. Focus Sessions
- **The OS Paradigm:** OS notification centers have become highly aggressive, leading to the rise of strict "Focus Sessions" (Do Not Disturb tied to timers).
- **Application to ForgeHub:** Do not rely on constant toast notifications for collaboration. Batch updates into the Universal Inbox and allow users to enter "Deep Work" mode where non-critical alerts are silenced.
