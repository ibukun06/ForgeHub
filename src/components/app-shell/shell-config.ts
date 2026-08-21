import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bell,
  BookMarked,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  FolderKanban,
  KanbanSquare,
  LayoutDashboard,
  LibraryBig,
  Map,
  MessagesSquare,
  Users,
  Files,
} from "lucide-react";

export type ShellAreaKey = "dashboard" | "inbox" | "explore" | "settings" | "projects";

export type ProjectSectionKey =
  | "overview"
  | "roadmap"
  | "board"
  | "docs"
  | "chat"
  | "review"
  | "insights"
  | "team"
  | "files";

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
  { key: "dashboard", label: "Home", href: "/dashboard", icon: LayoutDashboard, shortLabel: "Home" },
  { key: "explore", label: "Explore", href: "/explore", icon: Compass, shortLabel: "Explore" },
  { key: "inbox", label: "Inbox", href: "/inbox", icon: Bell, shortLabel: "Inbox" },
];

export const PROJECT_SPINE: ProjectSpineItem[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "roadmap", label: "Plan", icon: Map },
  { key: "board", label: "Board", icon: KanbanSquare },
  { key: "docs", label: "Docs", icon: BookMarked },
  { key: "chat", label: "Chat", icon: MessagesSquare },
  { key: "review", label: "Review", icon: CheckCircle2 },
  { key: "insights", label: "Insights", icon: Activity },
  { key: "team", label: "Team", icon: Users },
  { key: "files", label: "Files", icon: Files },
];

export const FAVORITE_LINKS: FavoriteLink[] = [
  { label: "ForgeHub Redesign", href: "/w/forgehub/p/forgehub-redesign/overview", icon: Compass },
  { label: "Execution board", href: "/work#board", icon: KanbanSquare },
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
    case "inbox":
      return [
        { label: "Action required", href: "/inbox#action-required", hint: "Approvals, blockers, mentions" },
        { label: "Approvals", href: "/inbox#approvals", hint: "Decisions waiting on you" },
        { label: "Project updates", href: "/inbox#project-updates", hint: "Signal over noise" },
        { label: "Snoozed", href: "/inbox#snoozed", hint: "Deferred follow-ups" },
      ];
    case "dashboard":
      return [
        { label: "My Projects", href: "/dashboard#projects", hint: "Projects you are active in" },
        { label: "Action Center", href: "/dashboard#action-center", hint: "Requires your attention" },
        { label: "Recent Activity", href: "/dashboard#activity", hint: "What happened recently" },
      ];
    case "explore":
      return [
        { label: "Trending", href: "/explore#trending", hint: "Popular engineering projects" },
        { label: "Recommended", href: "/explore#recommended", hint: "Projects for you" },
      ];
    default:
      return [];
  }
}

function topLevelUtilities(area: ShellAreaKey): UtilitySection[] {
  switch (area) {
    case "inbox":
      return [
        { title: "AI triage", items: ["Cluster related notifications", "Summarize long threads", "Explain why this item is urgent"] },
        { title: "Inbox actions", items: ["Mute source", "Snooze until tomorrow", "Convert update to task"] },
      ];
    case "dashboard":
      return [
        { title: "AI suggestions", items: ["Draft status update", "Review pending PRs"] },
        { title: "Quick actions", items: ["New project", "Create workspace"] },
      ];
    case "explore":
      return [
        { title: "Filters", items: ["Most starred this week", "Recently updated"] },
      ];
    default:
      return [];
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
        { label: prettyLabel(workspaceSlug), href: `/w/${workspaceSlug}/inbox` },
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
    const section = (segments[2] as ShellAreaKey | undefined) ?? "inbox";
    const activeArea: ShellAreaKey = PRIMARY_NAV.some((item) => item.key === section)
      ? section
      : "inbox";

    return {
      activeArea,
      pageTitle: prettyLabel(workspaceSlug),
      scopeLabel: `${PRIMARY_NAV.find((item) => item.key === activeArea)?.label ?? "Inbox"} · workspace scope`,
      workspaceSlug,
      breadcrumbs: [
        { label: prettyLabel(workspaceSlug), href: `/w/${workspaceSlug}/inbox` },
        { label: PRIMARY_NAV.find((item) => item.key === activeArea)?.label ?? "" },
      ],
      contextItems: PRIMARY_NAV.map((item) => ({
        label: item.label,
        href: `/w/${workspaceSlug}/${item.key}`,
        hint: item.key === activeArea ? "Current workspace lens" : "Navigate within this workspace",
      })),
      utilitySections: topLevelUtilities(activeArea),
    };
  }

  const activeArea = (segments[0] as ShellAreaKey | undefined) ?? "inbox";
  const normalizedArea: ShellAreaKey = PRIMARY_NAV.some((item) => item.key === activeArea)
    ? activeArea
    : "inbox";
  const label = PRIMARY_NAV.find((item) => item.key === normalizedArea)?.label ?? "Inbox";

  return {
    activeArea: normalizedArea,
    pageTitle: label,
    scopeLabel: `${label} · global view`,
    breadcrumbs: [{ label }],
    contextItems: topLevelContext(normalizedArea),
    utilitySections: topLevelUtilities(normalizedArea),
  };
}
