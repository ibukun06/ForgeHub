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
