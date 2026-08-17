import { redirect } from "next/navigation";
import { relativeTime } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import type {
  MemberRole,
  NotificationType,
  ProjectType,
  ProjectVisibility,
  SectionStatus,
} from "@/lib/supabase/types";

const DEFAULT_WORKSPACE_SLUG = "forgehub";

type ProjectRecord = {
  id: string;
  name: string;
  description: string | null;
  project_type: ProjectType;
  visibility: ProjectVisibility;
  slug: string;
  created_at: string;
  updated_at: string;
};

type MembershipRow = {
  role: MemberRole;
  projects: ProjectRecord | ProjectRecord[] | null;
};

type DocumentRecord = {
  id: string;
  project_id: string;
  document_type: string;
  title: string | null;
  created_at: string;
};

type SectionRecord = {
  id: string;
  document_id: string;
  prompt: string | null;
  status: SectionStatus;
  updated_at: string;
};

type DecisionRecord = {
  id: string;
  project_id: string;
  decision: string;
  rationale: string;
  created_at: string;
};

type NotificationRecord = {
  id: string;
  project_id: string | null;
  type: NotificationType;
  read_at: string | null;
  created_at: string;
};

export type MetricData = {
  label: string;
  value: string;
  hint: string;
};

export type FocusTone = "urgent" | "warning" | "default";

export type HomeScreenData = {
  metrics: MetricData[];
  focusItems: Array<{ title: string; meta: string; tone: FocusTone }>;
  approvals: Array<{ title: string; owner: string; summary: string }>;
  projects: Array<{ name: string; stage: string; summary: string; href: string }>;
  watchlist: Array<{ eyebrow: string; title: string; description: string }>;
  schedule: string[];
};

export type InboxScreenData = {
  items: Array<{ title: string; source: string; state: string }>;
  selected: {
    title: string;
    summary: string;
    source: string;
    action: string;
  };
  triage: string[];
};

export type ProjectsScreenData = {
  metrics: MetricData[];
  projects: Array<{ name: string; stage: string; summary: string; href: string }>;
  lanes: Array<{ title: string; description: string }>;
  kits: Array<{ title: string; description: string }>;
};

export type WorkScreenData = {
  metrics: MetricData[];
  tasks: Array<{ title: string; status: string; owner: string; due: string; summary: string }>;
  timelineItems: string[];
  aiItems: string[];
};

export type KnowledgeScreenData = {
  metrics: MetricData[];
  docs: Array<{ title: string; kind: string; summary: string }>;
  libraryItems: Array<{ title: string; description: string }>;
  aiItems: string[];
};

export type ProjectCockpitData = {
  project: {
    id: string;
    name: string;
    description: string | null;
    projectType: ProjectType;
<<<<<<< ours
=======
    visibility: ProjectVisibility;
    slug: string;
>>>>>>> theirs
  };
  metrics: MetricData[];
  milestoneLabel: string;
  milestoneSummary: string;
  workInMotion: string;
  keyDependency: string;
  blockers: string[];
  aiBrief: string[];
  decisions: Array<{ title: string; status: string }>;
  artifacts: Array<{ title: string; kind: string; summary: string }>;
};

type ViewerGraph = {
  projects: ProjectRecord[];
  documents: DocumentRecord[];
  sections: SectionRecord[];
  decisions: DecisionRecord[];
  notifications: NotificationRecord[];
  memberRoles: Map<string, MemberRole>;
};

type ProjectGraph = {
  project: ProjectRecord;
  role: MemberRole;
  documents: DocumentRecord[];
  sections: SectionRecord[];
  decisions: DecisionRecord[];
  notifications: NotificationRecord[];
  memberCount: number;
};

function buildProjectHref(slug: string, workspaceSlug = DEFAULT_WORKSPACE_SLUG) {
  return `/w/${workspaceSlug}/p/${slug}/overview`;
}

function titleCase(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function notificationLabel(type: NotificationType) {
  switch (type) {
    case "comment_received":
      return "Comment received";
    case "section_assigned":
      return "Section assigned";
    case "section_stale":
      return "Stale section";
    default:
      return titleCase(type);
  }
}

function notificationTone(type: NotificationType): FocusTone {
  if (type === "section_stale") return "urgent";
  if (type === "section_assigned") return "warning";
  return "default";
}

function sectionStatusLabel(status: SectionStatus) {
  switch (status) {
    case "ai_draft":
      return "AI draft";
    case "team_reviewed":
      return "Reviewed";
    default:
      return "Not started";
  }
}

function summarizeProject(project: ProjectRecord, documents: DocumentRecord[], sections: SectionRecord[], decisions: DecisionRecord[]) {
  const projectDocs = documents.filter((document) => document.project_id === project.id);
  const projectDocIds = new Set(projectDocs.map((document) => document.id));
  const projectSections = sections.filter((section) => projectDocIds.has(section.document_id));
  const reviewedCount = projectSections.filter((section) => section.status === "team_reviewed").length;
  const openCount = projectSections.filter((section) => section.status !== "team_reviewed").length;
  const decisionCount = decisions.filter((decision) => decision.project_id === project.id).length;

  if (project.description) {
    return project.description;
  }

  return `${projectDocs.length} docs · ${reviewedCount}/${projectSections.length || 1} reviewed · ${decisionCount} decisions logged · ${openCount} sections still active.`;
}

async function getViewerGraph(): Promise<ViewerGraph> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: membershipRows } = await supabase
    .from("project_members")
    .select("role, projects(id, name, description, project_type, visibility, slug, created_at, updated_at)")
    .eq("user_id", user.id);

  const memberships = (membershipRows ?? []) as MembershipRow[];
  const memberRoles = new Map<string, MemberRole>();
  const dedupedProjects = new Map<string, ProjectRecord>();

  for (const membership of memberships) {
    const projectValue = Array.isArray(membership.projects) ? membership.projects[0] : membership.projects;
    if (!projectValue) continue;
    dedupedProjects.set(projectValue.id, projectValue);
    memberRoles.set(projectValue.id, membership.role);
  }

  const projects = [...dedupedProjects.values()].sort(
    (left, right) => new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime()
  );

  if (projects.length === 0) {
    return { projects: [], documents: [], sections: [], decisions: [], notifications: [], memberRoles };
  }

  const projectIds = projects.map((project) => project.id);
  const [{ data: documents }, { data: decisions }, { data: notifications }] = await Promise.all([
    supabase
      .from("documents")
      .select("id, project_id, document_type, title, created_at")
      .in("project_id", projectIds)
      .order("created_at", { ascending: false }),
    supabase
      .from("decisions")
      .select("id, project_id, decision, rationale, created_at")
      .in("project_id", projectIds)
      .order("created_at", { ascending: false }),
    supabase
      .from("notifications")
      .select("id, project_id, type, read_at, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(12),
  ]);

  const documentList = (documents ?? []) as DocumentRecord[];
  const documentIds = documentList.map((document) => document.id);
  const { data: sections } = documentIds.length
    ? await supabase
        .from("sections")
        .select("id, document_id, prompt, status, updated_at")
        .in("document_id", documentIds)
        .order("updated_at", { ascending: false })
    : { data: [] as SectionRecord[] };

  return {
    projects,
    documents: documentList,
    sections: ((sections ?? []) as SectionRecord[]).sort(
      (left, right) => new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime()
    ),
    decisions: (decisions ?? []) as DecisionRecord[],
    notifications: (notifications ?? []) as NotificationRecord[],
    memberRoles,
  };
}

/**
 * Looks a project up by its real, stored slug — one indexed query,
 * instead of the old approach of fetching a user's entire project graph
 * (every project, every document, every decision) just to find one
 * project. It also actually enforces `projects_select`'s real rule
 * (published OR member) rather than silently only ever finding projects
 * the current user is already a member of, which is what the old
 * scan-of-getViewerGraph() approach did whether it meant to or not.
 */
async function getProjectGraphBySlug(projectSlug: string): Promise<ProjectGraph | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: project } = await supabase
    .from("projects")
    .select("id, name, description, project_type, visibility, slug, created_at, updated_at")
    .eq("slug", projectSlug)
    .maybeSingle();

  if (!project) {
    return null;
  }

  const { data: membershipRow } = await supabase
    .from("project_members")
    .select("role")
    .eq("project_id", project.id)
    .eq("user_id", user.id)
    .maybeSingle();

  // Not a member and not published: RLS would already block the rows
  // below, but returning null explicitly here gives a real 404 instead
  // of a confusing "found the project, empty everything else" page.
  if (!membershipRow && project.visibility !== "published") {
    return null;
  }

  const [{ data: documents }, { data: decisions }, { data: notifications }, { count: memberCount }] = await Promise.all([
    supabase
      .from("documents")
      .select("id, project_id, document_type, title, created_at")
      .eq("project_id", project.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("decisions")
      .select("id, project_id, decision, rationale, created_at")
      .eq("project_id", project.id)
      .order("created_at", { ascending: false }),
    membershipRow
      ? supabase
          .from("notifications")
          .select("id, project_id, type, read_at, created_at")
          .eq("user_id", user.id)
          .eq("project_id", project.id)
          .order("created_at", { ascending: false })
          .limit(12)
      : Promise.resolve({ data: [] as NotificationRecord[] }),
    supabase.from("project_members").select("id", { count: "exact", head: true }).eq("project_id", project.id),
  ]);

  const documentList = (documents ?? []) as DocumentRecord[];
  const documentIds = documentList.map((document) => document.id);
  const { data: sections } = documentIds.length
    ? await supabase
        .from("sections")
        .select("id, document_id, prompt, status, updated_at")
        .in("document_id", documentIds)
        .order("updated_at", { ascending: false })
    : { data: [] as SectionRecord[] };

  return {
    project,
    // "advisor" here is a display-only stand-in for a logged-in,
    // non-member viewer of someone else's published project — not a real
    // project_members row. No caller currently branches on this value;
    // if one starts to, it needs an actual "viewer" concept, not this.
    role: membershipRow?.role ?? "advisor",
    documents: documentList,
    sections: (sections ?? []) as SectionRecord[],
    decisions: (decisions ?? []) as DecisionRecord[],
    notifications: (notifications ?? []) as NotificationRecord[],
    memberCount: memberCount ?? 0,
  };
}

export async function getHomeScreenData(): Promise<HomeScreenData> {
  const graph = await getViewerGraph();
  const documentById = new Map(graph.documents.map((document) => [document.id, document]));
  const projectById = new Map(graph.projects.map((project) => [project.id, project]));
  const unreadNotifications = graph.notifications.filter((notification) => !notification.read_at);
  const openSections = graph.sections.filter((section) => section.status !== "team_reviewed");

  return {
    metrics: [
      {
        label: "Actionable items",
        value: String(openSections.length + unreadNotifications.length),
        hint: `${unreadNotifications.length} notifications · ${openSections.length} active documentation sections`,
      },
      {
        label: "Projects in motion",
        value: String(graph.projects.length),
        hint: graph.projects.length ? `${graph.projects.filter((project) => project.visibility === "published").length} published-ready signals` : "No active projects yet",
      },
      {
        label: "AI prompts",
        value: String(Math.max(1, Math.min(6, unreadNotifications.length + 1))),
        hint: "Grounded suggestions generated from active project changes",
      },
    ],
    focusItems: openSections.slice(0, 3).map((section) => {
      const document = documentById.get(section.document_id);
      const project = document ? projectById.get(document.project_id) : null;
      return {
        title: section.prompt || document?.title || "Documentation section needs review",
        meta: `${project?.name ?? "ForgeHub"} · ${sectionStatusLabel(section.status)} · ${relativeTime(section.updated_at)}`,
        tone: notificationTone(section.status === "not_started" ? "section_assigned" : section.status === "ai_draft" ? "comment_received" : "section_stale"),
      };
    }),
    approvals: unreadNotifications.slice(0, 3).map((notification) => {
      const project = notification.project_id ? projectById.get(notification.project_id) : null;
      return {
        title: `${notificationLabel(notification.type)} needs attention`,
        owner: project?.name ?? "Workspace signal",
        summary: `Triggered ${relativeTime(notification.created_at)}. Review the source artifact and decide the next action.`,
      };
    }),
    projects: graph.projects.slice(0, 3).map((project) => ({
      name: project.name,
      stage: titleCase(project.project_type),
      summary: summarizeProject(project, graph.documents, graph.sections, graph.decisions),
      href: buildProjectHref(project.slug),
    })),
    watchlist: graph.notifications
      .filter((notification) => notification.type === "section_stale")
      .slice(0, 2)
      .map((notification) => {
        const project = notification.project_id ? projectById.get(notification.project_id) : null;
        return {
          eyebrow: notificationLabel(notification.type),
          title: `${project?.name ?? "A project"} has documentation drift risk`,
          description: `The signal appeared ${relativeTime(notification.created_at)} and should be inspected before the next review cycle.`,
        };
      }),
    schedule: [
      ...graph.projects.slice(0, 2).map((project) => `${relativeTime(project.updated_at)} · ${project.name} was updated`),
      ...graph.decisions.slice(0, 1).map((decision) => `${relativeTime(decision.created_at)} · Decision logged: ${decision.decision}`),
    ],
  };
}

export async function getInboxScreenData(): Promise<InboxScreenData> {
  const graph = await getViewerGraph();
  const projectById = new Map(graph.projects.map((project) => [project.id, project]));
  const items = graph.notifications.slice(0, 6).map((notification) => ({
    title: notificationLabel(notification.type),
    source: `${projectById.get(notification.project_id ?? "")?.name ?? "Workspace"} · ${relativeTime(notification.created_at)}`,
    state: notification.read_at ? "Read" : "Action required",
  }));

  const selected = graph.notifications[0];
  const selectedProject = selected?.project_id ? projectById.get(selected.project_id) : null;

  return {
    items,
    selected: {
      title: selected ? notificationLabel(selected.type) : "No active notification",
      summary: selected
        ? `${selectedProject?.name ?? "This workspace"} generated a ${notificationLabel(selected.type).toLowerCase()} ${relativeTime(selected.created_at)}. Use Inbox actions to respond without losing context.`
        : "Your notification queue is clear right now.",
      source: selectedProject?.name ?? "Workspace",
      action: selected?.type === "section_stale" ? "Open the stale documentation section and plan a refresh." : "Inspect the source artifact and decide the next action.",
    },
    triage: [
      `Unread signals: ${graph.notifications.filter((notification) => !notification.read_at).length}`,
      `Active project-linked notifications: ${graph.notifications.filter((notification) => notification.project_id).length}`,
      `Most recent update arrived ${graph.notifications[0] ? relativeTime(graph.notifications[0].created_at) : "just now"}`,
    ],
  };
}

export async function getProjectsScreenData(): Promise<ProjectsScreenData> {
  const graph = await getViewerGraph();
  const publishedCount = graph.projects.filter((project) => project.visibility === "published").length;
  const staleCount = graph.notifications.filter((notification) => notification.type === "section_stale").length;

  return {
    metrics: [
      { label: "Active", value: String(graph.projects.length), hint: `${publishedCount} published · ${graph.projects.length - publishedCount} private` },
      { label: "On watch", value: String(staleCount), hint: "Stale-section signals across active projects" },
      { label: "Templates", value: "7", hint: "Still design-system driven until template storage ships" },
    ],
    projects: graph.projects.map((project) => ({
      name: project.name,
      stage: titleCase(project.project_type),
      summary: summarizeProject(project, graph.documents, graph.sections, graph.decisions),
      href: buildProjectHref(project.slug),
    })),
    lanes: [
      {
        title: "Recently updated",
        description: graph.projects[0] ? `${graph.projects[0].name} changed ${relativeTime(graph.projects[0].updated_at)}.` : "No projects yet.",
      },
      {
        title: "Published-ready",
        description: `${publishedCount} project${publishedCount === 1 ? "" : "s"} already marked for external visibility.`,
      },
      {
        title: "Needs attention",
        description: `${staleCount} stale-section notification${staleCount === 1 ? "" : "s"} currently affect portfolio confidence.`,
      },
    ],
    kits: [
      { title: "Startup sprint OS", description: "Fast-moving team template for product, engineering, and review cycles." },
      { title: "Research studio", description: "Notes, evidence, advisor review, and milestone defense built in." },
      { title: "Enterprise rollout", description: "Governance, stakeholder reporting, and cross-team approval layers." },
    ],
  };
}

export async function getWorkScreenData(projectSlug?: string): Promise<WorkScreenData> {
  const projectGraph = projectSlug ? await getProjectGraphBySlug(projectSlug) : null;
  const graph = projectGraph
    ? {
        projects: [projectGraph.project],
        documents: projectGraph.documents,
        sections: projectGraph.sections,
        decisions: projectGraph.decisions,
        notifications: projectGraph.notifications,
      }
    : await getViewerGraph();

  const documentById = new Map(graph.documents.map((document) => [document.id, document]));
  const projectById = new Map(graph.projects.map((project) => [project.id, project]));
  const tasks = graph.sections.slice(0, 6).map((section) => {
    const document = documentById.get(section.document_id);
    const project = document ? projectById.get(document.project_id) : null;
    return {
      title: section.prompt || document?.title || "Documentation task",
      status: sectionStatusLabel(section.status),
      owner: project?.name ?? "Project team",
      due: relativeTime(section.updated_at),
      summary: `${document?.title ?? "Document"} still needs movement before the next review cycle.`,
    };
  });

  const reviewedCount = graph.sections.filter((section) => section.status === "team_reviewed").length;

  return {
    metrics: [
      { label: "Active work", value: String(tasks.length), hint: `${reviewedCount} reviewed · ${graph.sections.length - reviewedCount} still moving` },
      { label: "Saved views", value: "4", hint: "List, board, timeline, and workload shell lenses" },
      { label: "AI suggestions", value: String(Math.max(1, Math.min(4, tasks.length))), hint: "Assignee, priority, and schedule support" },
    ],
    tasks,
    timelineItems: graph.decisions.slice(0, 3).map((decision) => `${relativeTime(decision.created_at)} · ${decision.decision}`),
    aiItems: [
      `Prioritize the ${tasks.length} most active work items without mutating them automatically.`,
      `Highlight sections likely to slip based on stale updates or AI-draft status.`,
      `Suggest a review batch from the current execution scope.`,
    ],
  };
}

export async function getKnowledgeScreenData(projectSlug?: string): Promise<KnowledgeScreenData> {
  const projectGraph = projectSlug ? await getProjectGraphBySlug(projectSlug) : null;
  const graph = projectGraph
    ? {
        projects: [projectGraph.project],
        documents: projectGraph.documents,
        sections: projectGraph.sections,
        decisions: projectGraph.decisions,
      }
    : await getViewerGraph();

  return {
    metrics: [
      { label: "Key docs", value: String(graph.documents.length), hint: `${graph.projects.length} project scope${graph.projects.length === 1 ? "" : "s"}` },
      { label: "Decision records", value: String(graph.decisions.length), hint: "Durable rationale and alternatives" },
      {
        label: "Research sets",
        value: String(graph.projects.filter((project) => project.project_type === "research").length),
        hint: "Projects tagged as research or evidence-heavy",
      },
    ],
    docs: [
      ...graph.documents.slice(0, 3).map((document) => ({
        title: document.title ?? titleCase(document.document_type),
        kind: titleCase(document.document_type),
        summary: `Created ${relativeTime(document.created_at)} and linked to active project execution.`,
      })),
      ...graph.decisions.slice(0, Math.max(0, 3 - graph.documents.slice(0, 3).length)).map((decision) => ({
        title: decision.decision,
        kind: "Decision record",
        summary: decision.rationale,
      })),
    ],
    libraryItems: [
      { title: "Docs", description: `${graph.documents.length} structured documents in active scope.` },
      { title: "Decisions", description: `${graph.decisions.length} rationale entries with reusable context.` },
      { title: "Research", description: `${graph.projects.filter((project) => project.project_type === "research").length} research-oriented project context${graph.projects.filter((project) => project.project_type === "research").length === 1 ? "" : "s"}.` },
      { title: "Collections", description: "Topic and artifact clustering will deepen as real collection storage lands." },
    ],
    aiItems: [
      "Summarize the most recent knowledge changes with explicit source links.",
      "Extract action items from project knowledge and route them into execution views.",
      "Answer product questions using only cited documents and decisions.",
    ],
  };
}

export async function getProjectCockpitData(projectSlug: string): Promise<ProjectCockpitData | null> {
  const graph = await getProjectGraphBySlug(projectSlug);
  if (!graph) return null;

  const reviewedCount = graph.sections.filter((section) => section.status === "team_reviewed").length;
  const completion = graph.sections.length ? Math.round((reviewedCount / graph.sections.length) * 100) : 0;
  const blockerSections = graph.sections.filter((section) => section.status !== "team_reviewed").slice(0, 3);
  const latestDecision = graph.decisions[0];

  return {
    project: {
      id: graph.project.id,
      name: graph.project.name,
      description: graph.project.description,
      projectType: graph.project.project_type,
<<<<<<< ours
=======
      visibility: graph.project.visibility,
      slug: graph.project.slug,
>>>>>>> theirs
    },
    metrics: [
      {
        label: "Health",
        value: blockerSections.length > 0 ? "On watch" : "On track",
        hint: `${blockerSections.length} active section${blockerSections.length === 1 ? "" : "s"} · ${graph.decisions.length} decision${graph.decisions.length === 1 ? "" : "s"}`,
      },
      {
        label: "Milestone",
        value: `${completion}%`,
        hint: `${reviewedCount}/${graph.sections.length || 1} sections reviewed`,
      },
      {
        label: "Team load",
        value: String(graph.memberCount || 1),
        hint: `${graph.memberCount || 1} project member${graph.memberCount === 1 ? "" : "s"} active`,
      },
    ],
    milestoneLabel: graph.documents[0]?.title ?? "Core documentation milestone",
    milestoneSummary: `The project currently has ${graph.documents.length} document${graph.documents.length === 1 ? "" : "s"}, ${graph.sections.length} structured section${graph.sections.length === 1 ? "" : "s"}, and ${graph.decisions.length} logged decision${graph.decisions.length === 1 ? "" : "s"}.`,
    workInMotion: blockerSections[0]?.prompt || graph.documents[0]?.title || "Review the active documentation set.",
    keyDependency: latestDecision ? `Latest decision: ${latestDecision.decision}` : "Define the next milestone decision before scaling implementation.",
    blockers: blockerSections.map((section) => `${section.prompt || "A documentation section"} is still ${sectionStatusLabel(section.status).toLowerCase()} (${relativeTime(section.updated_at)}).`),
    aiBrief: [
      `Project updated ${relativeTime(graph.project.updated_at)} and currently sits in a ${blockerSections.length > 0 ? "watch" : "stable"} state.`,
      `Most active focus: ${blockerSections[0]?.prompt || graph.documents[0]?.title || "review open documentation work"}.`,
      `Next likely leadership action: ${latestDecision ? `review the implications of “${latestDecision.decision}.”` : "create a new decision record to resolve an open constraint."}`,
    ],
    decisions: graph.decisions.slice(0, 3).map((decision) => ({
      title: decision.decision,
      status: relativeTime(decision.created_at),
    })),
    artifacts: graph.documents.slice(0, 3).map((document) => ({
      title: document.title ?? titleCase(document.document_type),
      kind: titleCase(document.document_type),
      summary: `Updated in the current project cycle and ready for linked work, review, or AI summarization.`,
    })),
  };
}
