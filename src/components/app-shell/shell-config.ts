import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bell,
  BookMarked,
  BookOpen,
  BriefcaseBusiness,
  ChartColumnBig,
  Compass,
  FolderKanban,
  Home,
  KanbanSquare,
  LayoutDashboard,
  LibraryBig,
  Map,
  MessageCircleMore,
  MessagesSquare,
  Settings2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export type ShellAreaKey =
  | "home"
  | "inbox"
  | "projects"
  | "work"
  | "knowledge"
  | "conversations"
  | "reports"
  | "templates"
  | "admin";

export type ProjectSectionKey =
  | "overview"
  | "plan"
  | "work"
  | "knowledge"
  | "conversation"
  | "review"
  | "insights";

export type ContextItem = {
  label: string;
  href: string;
  hint?: string;
};

export type UtilitySection = {
  title: string;
  items: string[];
};

export type NavItem = {
  key: ShellAreaKey;
  label: string;
  href: string;
  icon: LucideIcon;
  shortLabel?: string;
};

export type ProjectSpineItem = {
  key: ProjectSectionKey;
  label: string;
  icon: LucideIcon;
};

export type FavoriteLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type ShellState = {
  activeArea: ShellAreaKey;
  pageTitle: string;
  scopeLabel: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  contextItems: ContextItem[];
  utilitySections: UtilitySection[];
  workspaceSlug?: string;
  projectSlug?: string;
  projectSection?: string;
};

export const PRIMARY_NAV: NavItem[] = [
  { key: "home", label: "Home", href: "/home", icon: Home, shortLabel: "Home" },
  { key: "inbox", label: "Inbox", href: "/inbox", icon: Bell, shortLabel: "Inbox" },
  { key: "projects", label: "Projects", href: "/projects", icon: FolderKanban, shortLabel: "Projects" },
  { key: "work", label: "Work", href: "/work", icon: BriefcaseBusiness, shortLabel: "Work" },
  { key: "knowledge", label: "Knowledge", href: "/knowledge", icon: LibraryBig, shortLabel: "Knowledge" },
  { key: "conversations", label: "Conversations", href: "/conversations", icon: MessagesSquare, shortLabel: "Chats" },
  { key: "reports", label: "Reports", href: "/reports", icon: ChartColumnBig, shortLabel: "Reports" },
  { key: "templates", label: "Templates", href: "/templates", icon: Sparkles, shortLabel: "Templates" },
  { key: "admin", label: "Admin", href: "/admin", icon: Settings2, shortLabel: "Admin" },
];

export const PROJECT_SPINE: ProjectSpineItem[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "plan", label: "Plan", icon: Map },
  { key: "work", label: "Work", icon: KanbanSquare },
  { key: "knowledge", label: "Knowledge", icon: BookMarked },
  { key: "conversation", label: "Conversation", icon: MessageCircleMore },
  { key: "review", label: "Review", icon: ShieldCheck },
  { key: "insights", label: "Insights", icon: Activity },
];

export const FAVORITE_LINKS: FavoriteLink[] = [
  { label: "ForgeHub Redesign", href: "/w/forgehub/p/forgehub-redesign/overview", icon: Compass },
  { label: "Execution board", href: "/work#board", icon: KanbanSquare },
  { label: "Decision log", href: "/knowledge#decisions", icon: BookOpen },
];

export const COMMAND_MODE_TABS = ["Find", "Do", "Ask", "Create"] as const;

export function prettyLabel(slug?: string): string {
  if (!slug) return "Overview";
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function topLevelContext(area: ShellAreaKey): ContextItem[] {
  switch (area) {
    case "home":
      return [
        { label: "Today focus", href: "/home#today-focus", hint: "Priority work and approvals" },
        { label: "Active projects", href: "/home#active-projects", hint: "Resume critical work" },
        { label: "AI daily brief", href: "/home#ai-brief", hint: "Context and recommendations" },
        { label: "Quick capture", href: "/home#quick-capture", hint: "Task, doc, decision, note" },
      ];
    case "inbox":
      return [
        { label: "Action required", href: "/inbox#action-required", hint: "Approvals, blockers, mentions" },
        { label: "Approvals", href: "/inbox#approvals", hint: "Decisions waiting on you" },
        { label: "Project updates", href: "/inbox#project-updates", hint: "Signal over noise" },
        { label: "Snoozed", href: "/inbox#snoozed", hint: "Deferred follow-ups" },
      ];
    case "projects":
      return [
        { label: "Active projects", href: "/projects#active-projects", hint: "Current delivery focus" },
        { label: "Portfolio view", href: "/projects#portfolio", hint: "By stage, team, and risk" },
        { label: "Templates", href: "/projects#project-kits", hint: "Reusable project operating models" },
        { label: "ForgeHub redesign", href: "/w/forgehub/p/forgehub-redesign/overview", hint: "Flagship project cockpit" },
      ];
    case "work":
      return [
        { label: "My work", href: "/work#my-work", hint: "Assigned, due, and blocked" },
        { label: "Saved views", href: "/work#saved-views", hint: "Reusable execution lenses" },
        { label: "Timeline", href: "/work#timeline", hint: "Dependencies and sequencing" },
        { label: "Workload", href: "/work#workload", hint: "Capacity and balancing" },
      ];
    case "knowledge":
      return [
        { label: "Docs", href: "/knowledge#docs", hint: "Specs, briefs, plans" },
        { label: "Decisions", href: "/knowledge#decisions", hint: "Durable project memory" },
        { label: "Research", href: "/knowledge#research", hint: "Evidence and synthesis" },
        { label: "Collections", href: "/knowledge#collections", hint: "Organized knowledge clusters" },
      ];
    case "conversations":
      return [
        { label: "Project channels", href: "/conversations", hint: "Work-centered collaboration" },
        { label: "Directs", href: "/conversations", hint: "Fast private coordination" },
        { label: "Announcements", href: "/conversations", hint: "Low-noise broadcast layer" },
      ];
    case "reports":
      return [
        { label: "Executive overview", href: "/reports", hint: "Topline portfolio signals" },
        { label: "Project health", href: "/reports", hint: "Risk, confidence, trend" },
        { label: "Delivery forecast", href: "/reports", hint: "Readiness and drift" },
      ];
    case "templates":
      return [
        { label: "Workspace kits", href: "/templates", hint: "Prebuilt operating systems" },
        { label: "Project templates", href: "/templates", hint: "Repeatable delivery structures" },
        { label: "Knowledge patterns", href: "/templates", hint: "Docs, decisions, research" },
      ];
    case "admin":
      return [
        { label: "Permissions", href: "/admin", hint: "People, teams, roles" },
        { label: "Governance", href: "/admin", hint: "Visibility, policy, compliance" },
        { label: "Automation", href: "/admin", hint: "Cross-workspace flows" },
      ];
  }
}

function topLevelUtilities(area: ShellAreaKey): UtilitySection[] {
  switch (area) {
    case "home":
      return [
        { title: "AI brief", items: ["Summarize what changed since yesterday", "Draft standup from current priorities", "Flag any work at risk this week"] },
        { title: "Quick actions", items: ["Create task", "Start note", "Open latest project", "Review pending approvals"] },
      ];
    case "inbox":
      return [
        { title: "AI triage", items: ["Cluster related notifications", "Summarize long threads", "Explain why this item is urgent"] },
        { title: "Inbox actions", items: ["Mute source", "Snooze until tomorrow", "Convert update to task"] },
      ];
    case "projects":
      return [
        { title: "Portfolio cues", items: ["3 projects need milestone definition", "1 project has rising delivery risk", "2 projects are ready for review"] },
        { title: "AI planning", items: ["Generate kickoff structure", "Suggest roadmap phases", "Recommend project template"] },
      ];
    case "work":
      return [
        { title: "AI execution", items: ["Prioritize backlog", "Suggest assignees by load", "Detect overdue clusters"] },
        { title: "Bulk actions", items: ["Move selected work", "Update due dates", "Save current view"] },
      ];
    case "knowledge":
      return [
        { title: "AI knowledge", items: ["Summarize long doc", "Extract action items", "Answer with citations"] },
        { title: "Knowledge actions", items: ["Create decision log", "Import research", "Link task to doc"] },
      ];
    default:
      return [
        { title: "ForgeHub OS", items: ["Open command surface", "Create new artifact", "Switch workspace"] },
        { title: "Current scope", items: ["Review linked work", "Inspect recent activity", "Ask AI for a summary"] },
      ];
  }
}

export function getShellState(pathname: string): ShellState {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] === "w" && segments[2] === "p") {
    const workspaceSlug = segments[1];
    const projectSlug = segments[3];
    const rawSection = segments[4] ?? "overview";
    const projectSection = PROJECT_SPINE.some((item) => item.key === rawSection)
      ? (rawSection as ProjectSectionKey)
      : "overview";

    const contextItems = PROJECT_SPINE.map((item) => ({
      label: item.label,
      href: `/w/${workspaceSlug}/p/${projectSlug}/${item.key}`,
      hint: item.key === projectSection ? "Current project section" : "Jump within this project",
    }));

    return {
      activeArea: "projects",
      pageTitle: prettyLabel(projectSlug),
      scopeLabel: `${prettyLabel(projectSection)} · project cockpit`,
      workspaceSlug,
      projectSlug,
      projectSection,
      breadcrumbs: [
        { label: prettyLabel(workspaceSlug), href: `/w/${workspaceSlug}/home` },
        { label: prettyLabel(projectSlug), href: `/w/${workspaceSlug}/p/${projectSlug}/overview` },
        { label: prettyLabel(projectSection) },
      ],
      contextItems,
      utilitySections: [
        {
          title: "Project intelligence",
          items: [
            "Summarize project health with evidence",
            "Identify blockers and decision gaps",
            "Draft the next stakeholder update",
          ],
        },
        {
          title: "Jump targets",
          items: [
            "Open current milestone",
            "Inspect latest decision record",
            "Review active discussion threads",
          ],
        },
      ],
    };
  }

  if (segments[0] === "w") {
    const workspaceSlug = segments[1];
    const section = (segments[2] as ShellAreaKey | undefined) ?? "home";
    const activeArea: ShellAreaKey = PRIMARY_NAV.some((item) => item.key === section)
      ? section
      : "home";

    return {
      activeArea,
      pageTitle: prettyLabel(workspaceSlug),
      scopeLabel: `${PRIMARY_NAV.find((item) => item.key === activeArea)?.label ?? "Home"} · workspace scope`,
      workspaceSlug,
      breadcrumbs: [
        { label: prettyLabel(workspaceSlug), href: `/w/${workspaceSlug}/home` },
        { label: PRIMARY_NAV.find((item) => item.key === activeArea)?.label },
      ],
      contextItems: PRIMARY_NAV.filter((item) => item.key !== "inbox").map((item) => ({
        label: item.label,
        href: `/w/${workspaceSlug}/${item.key}`,
        hint: item.key === activeArea ? "Current workspace lens" : "Navigate within this workspace",
      })),
      utilitySections: topLevelUtilities(activeArea),
    };
  }

  const activeArea = (segments[0] as ShellAreaKey | undefined) ?? "home";
  const normalizedArea: ShellAreaKey = PRIMARY_NAV.some((item) => item.key === activeArea)
    ? activeArea
    : "home";
  const label = PRIMARY_NAV.find((item) => item.key === normalizedArea)?.label ?? "Home";

  return {
    activeArea: normalizedArea,
    pageTitle: label,
    scopeLabel: normalizedArea === "home" ? "Personal command center" : `${label} · global view`,
    breadcrumbs: normalizedArea === "home" ? [{ label: "Home" }] : [{ label }],
    contextItems: topLevelContext(normalizedArea),
    utilitySections: topLevelUtilities(normalizedArea),
  };
}
