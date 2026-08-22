# ForgeHub Social & Collaboration Graph

*This document outlines the strategic vision for the social layer, messaging, search, and the interconnected relationship model of ForgeHub.*

## 1. The Core ForgeHub Pillars

ForgeHub operates on three interconnected pillars:

```text
                         FORGEHUB
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
      SOCIAL           COLLABORATION        CREATION
        │                   │                   │
   Profiles              Workspaces          Editors
   Following             Teams               Projects
   Connections            Roles               Files
   DMs                   Permissions          Documents
   Activity              Reviews              CAD/3D
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                       DISCOVERY
                            │
                 Projects / People / Teams
```

## 2. The Inbox

The Inbox is not just a notification center; it is the **communication hub of ForgeHub**.

```text
Inbox
│
├── Messages (DMs)
├── Notifications
├── Requests (Connections, Join, Invitations)
├── Mentions (@username)
├── Reviews
└── Activity
```

## 3. Social Connectivity

There is a strict distinction between social interactions to prevent spam and encourage engineering collaboration:

- **Follow (One-way):** "I want to see this person's public activity." No approval required. Feeds into the Activity timeline.
- **Connect (Two-way):** "I know/want to collaborate with this person." Requires a request and acceptance. Unlocks unrestricted Direct Messaging.
- **Collaborate (Project/Workspace):** "I am actually working with this person."

### Anti-Spam DMs
Before a connection is accepted, users are limited to a single **Connection Request** message. The message sits in a `PENDING` state until accepted (unlocking chat) or declined.

## 4. Engineering Identity (Profiles)

A ForgeHub profile acts as an engineering identity (similar to a developer's GitHub + LinkedIn).
- **Featured Projects** (e.g. Maize Sheller, Wind Tunnel)
- **Skills** (e.g. CAD, SOLIDWORKS, Python, MATLAB)
- **Contributions** (History of project activity)

## 5. Project Participation

Projects are social entities, not just folders. Participation modes include:
- **Private:** Invite-only.
- **Public:** Anyone can view.
- **Open to Collaborators:** Anyone can request to join.
- **Accepting Applications:** Request to join by submitting skills and intent (ideal for student/research projects).

## 6. Actionable Notifications

Notifications must require action or provide exact context.
- **Project:** Join requests, review requests, file uploads.
- **Social:** New followers, connection requests, mentions.
- **Collaboration:** Assigned tasks, contextual comments.

## 7. Contextual Comments

Comments are attached to precise artifacts, not just a general thread:
- **CAD geometry:** Component/surface-level pins.
- **Video/Audio:** Timestamped comments.
- **Document/Code:** Selection or line-level comments.

## 8. Global Search

Search bridges the gap between LinkedIn-style people discovery and GitHub-style project discovery. It searches globally across:
`People | Projects | Workspaces | Files | Discussions`

## 9. The ForgeHub Relationship Architecture

```text
USER
 │
 ├── follows → USER
 ├── connects → USER
 ├── messages → USER
 │
 ├── follows → PROJECT
 ├── contributes → PROJECT
 ├── requests → PROJECT
 │
 ├── follows → WORKSPACE
 ├── member_of → WORKSPACE
 └── invited_to → WORKSPACE
```

## 10. The Unified Platform Positioning

ForgeHub does not copy other tools; it unifies fragmented engineering workflows into a single ecosystem:

| Fragmented Tool | ForgeHub Equivalent |
|-----------------|---------------------|
| GitHub | Projects, files, versioning |
| LinkedIn | Profiles, network, discovery |
| Notion | Knowledge, docs, organization |
| Google Docs / Figma | Collaborative editing & review |
| Slack / Discord | Communication & Inbox |
| CAD viewers | 2D/3D engineering review |

### The Core Loop
`DISCOVER → FOLLOW/CONNECT → VIEW PROJECT → DISCUSS → REQUEST TO JOIN → COLLABORATE → CREATE/EDIT → REVIEW → VERSION → PUBLISH → DISCOVER (Loop Repeats)`
# ForgeHub File Capability Model

*This document outlines the strategic vision for file handling and collaboration in ForgeHub.*

## 1. The File Capability Model

ForgeHub defines 8 levels of file interaction:

| Level | Capability | Meaning |
|-------|------------|---------|
| L0 | Store | Upload/download only |
| L1 | Preview | Browser preview |
| L2 | Read | Extract/search text/data |
| L3 | Annotate | Comments, markup, pins |
| L4 | Edit | Modify file content |
| L5 | Co-edit | Multiple people edit simultaneously |
| L6 | Version | Track changes/versions/diffs |
| L7 | Transform | Convert/export/derive another format |

This granularity allows precise, role-based interaction. For example, a user might be allowed to view and annotate a STEP model but not modify geometry; an external reviewer might view + comment but download nothing.

## 2. File Categories

```text
ForgeHub Files
│
├── Engineering / CAD
├── 3D / Visualization
├── Drawings / 2D CAD
├── Documents
├── Spreadsheets
├── Presentations
├── Markdown / Technical Writing
├── Code
├── Data
├── Images
├── Video
├── Audio
├── Archives
├── Scientific / Research
├── GIS / Mapping
└── Other / Binary
```

## 3. Engineering / CAD — THE CORE

Tier A (Must support): `.step` / `.stp`, `.iges` / `.igs`, `.stl`, `.obj`, `.glb`, `.gltf`, `.3mf`, `.dwg`, `.dxf`
Browser editing for these does not initially mean parametric CAD editing. It means: **View → inspect → measure → section → annotate → comment → review.**

## 4. Native CAD Formats

ForgeHub accepts and preserves native formats (e.g., `.f3d`, `.sldprt`, `.CATPart`, `.prt`, `.x_t`, `.ifc`) even if not directly editable in the browser. 
Workflow: **Upload → process → preview → inspect → annotate → comment → version → download.**

## 5. 3D Files

Recommended Support:
- Primary: `.glb`, `.gltf`, `.obj`, `.stl`, `.3mf`, `.ply`, `.fbx`, `.dae`, `.3ds`, `.step`, `.iges`
- Advanced: `.usd`, `.usda`, `.usdc`, `.usdz`, `.abc`, `.jt`

## 6. What "3D Editing" Should Mean

- **Phase 1 (3D Viewer):** Orbit, pan, zoom, wireframe, section planes, measurements, hide/show parts, screenshot, markup.
- **Phase 2 (Collaborative review):** Multi-user pointing, pins, highlights, drawing, comments, resolution.
- **Phase 3 (Actual editing):** Move, rotate, scale, material changes, simple geometry.
- **Phase 4 (Parametric CAD):** Future state; requires deep engineering infrastructure.

## 7. Engineering Drawings

Support: `.dwg`, `.dxf`, `.dgn`, `.pdf`, `.svg`
Features: Zoom, pan, layers, measurements, dimensions, markup, version history.

## 8. Documents & Markdown

Markdown (`.md`) is a first-class citizen with split views, math, Mermaid, tables, and collaborative editing.
Office formats (`.docx`, `.odt`) and PDFs are also highly supported for reading, highlighting, and versioning.

## 9. Spreadsheets & Presentations

Support: `.xlsx`, `.csv`, `.pptx`, `.odp`, etc.
Spreadsheets could eventually evolve into **Engineering Calculation Sheets** with unit-aware cells, python integration, etc.

## 10. Code

Code is treated as first-class text.
- Support: `.html`, `.js`, `.py`, `.c`, `.cpp`, `.rs`, `.go`, `.sql`, config files, engineering scripts (`.m`, `.slx`).
- Features: Syntax highlighting, formatting, diffs, live collaborative editing.

## 11. Jupyter / Research

`.ipynb` support with cell rendering, outputs, comments, and eventually sandboxed execution.

## 12. Media (Images, Video, Audio)

- **Images:** Common formats + RAW. Preview, zoom, annotations.
- **Video:** `.mp4`, `.mov`, etc. Timestamped comments (e.g. "02:17 — The weld appears to be cracking here").
- **Audio:** `.mp3`, `.wav`. Waveform, timestamped comments (useful for machine sounds, acoustic testing).

## 13. Data & Archives

- **Data:** `.csv`, `.json`, `.yaml`, `.sqlite`. Table viewers and tree viewers.
- **Archives:** `.zip`, `.tar`. Preview contents without full extraction. Import archive as a project.

## 14. Advanced Engineering / GIS

Future support for `.mat`, `.h5`, `.vtk` (Scientific) and `.shp`, `.geojson`, `.las` (GIS/Mapping).

## 15. The Permission System

Capability-based permissions (not just read/write):
`VIEW, DOWNLOAD, COMMENT, ANNOTATE, EDIT, UPLOAD_NEW_VERSION, DELETE, RENAME, MOVE, SHARE, EXPORT, REVIEW, APPROVE, MANAGE_PERMISSIONS`

Hierarchical resolution: **Workspace → Project → Folder → File → Explicit User**

## 16. File-Type Aware Collaboration

Collaboration models adapt to the file type:
- **Markdown:** True multiplayer editing
- **Code:** Collaborative editor + review
- **3D CAD:** Collaborative review (pins, measurements, shared view state)
- **Video:** Timestamped collaboration

## 17. Universal Versioning

Every file tracks: Version history, Who, When, What changed, Comments.

## 18. Unified ForgeHub File Viewer

A consistent workspace shell wrapping different file engines. Users see the 3D Viewer or Markdown Editor in the center, flanked by uniform Comments, Versions, and Activity panes.

## 19. Architecture: File Capability Matrix

File types map to engines:
- `STEP`: `viewer=cad-viewer`, `annotator=cad-annotation`, `versioner=universal`
- `MD`: `viewer=markdown-renderer`, `editor=realtime-editor`, `versioner=universal`

## 20. Staged Rollout Strategy

- **Tier 1 (Core):** Basic CAD (STEP, STL), Docs (PDF, DOCX, MD), Data, Code, Images, Web-friendly Video/Audio, Archives.
- **Tier 2 (Expansion):** Native engineering formats (F3D, SLDPRT, RVT, CATPart).
- **Tier 3 (Research):** IPYNB, MAT, HDF5, GIS files.

## 21. Core Product Promise

Do not promise "ForgeHub can edit every file."
Instead, advertise: **Upload and work with your engineering files in one place.**
The UI tells users exactly what they can do (e.g. `✓ View ✓ Inspect ✓ Annotate ○ Parametric editing (Coming later)`).

**The Ultimate Vision:** A universal engineering workspace where almost any artifact can be stored, understood, reviewed, discussed, and versioned, without requiring every stakeholder to possess the native authoring application.
