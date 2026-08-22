import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Bot,
  BriefcaseBusiness,
  CircleEllipsis,
  FolderKanban,
  KanbanSquare,
  LibraryBig,
  ListTodo,
  MessageSquareMore,
  Plus,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Waypoints,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { EditProjectDialog } from "@/components/project/EditProjectDialog";
import { ShareProjectDialog } from "@/components/project/ShareProjectDialog";
import type {
  HomeScreenData,
  InboxScreenData,
  KnowledgeScreenData,
  ProjectCockpitData,
  ProjectsScreenData,
  WorkScreenData,
} from "@/lib/app-shell-data";
import { prettyLabel } from "./shell-config";
import { KanbanBoard } from "@/components/workspace/kanban-board";
import { InboxQueue } from "@/components/workspace/inbox-queue";
import { InboxSelectedPanel } from "@/components/workspace/inbox-selected-panel";

type FocusTone = "urgent" | "warning" | "default";

type FocusCard = {
  title: string;
  meta: string;
  tone: FocusTone;
};

type ProjectCard = {
  name: string;
  stage: string;
  summary: string;
  href: string;
};

type KnowledgeArtifact = {
  title: string;
  kind: string;
  summary: string;
};

type ApprovalCard = {
  title: string;
  owner: string;
  summary: string;
};

type DetailCardData = {
  eyebrow: string;
  title: string;
  description: string;
};

type ProjectSectionCard = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

const HOME_FOCUS: FocusCard[] = [
  { title: "Finalize Phase 2B screen blueprints", meta: "Due today · Structure every core surface with exact module hierarchy", tone: "urgent" },
  { title: "Review AI navigation guardrails", meta: "Pending approval · Confirm proactive AI thresholds before scaling flows", tone: "warning" },
  { title: "Refine project cockpit command modules", meta: "Design ops · Align milestone, blocker, and decision modules", tone: "default" },
];

const ACTIVE_PROJECTS: ProjectCard[] = [
  {
    name: "ForgeHub Redesign",
    stage: "Foundation",
    summary: "Phase 1–3 architecture, wireframes, and premium visual-system implementation.",
    href: "/w/forgehub/p/forgehub-redesign/overview",
  },
  {
    name: "Student Research Workspace",
    stage: "Pilot",
    summary: "Academic-first operating model for thesis planning, advisor review, and knowledge capture.",
    href: "/w/forgehub/p/student-research-workspace/overview",
  },
  {
    name: "Enterprise Governance Layer",
    stage: "Discovery",
    summary: "Permissions, templates, reporting, and policy controls for complex organizations.",
    href: "/w/forgehub/p/enterprise-governance-layer/overview",
  },
];

const KNOWLEDGE_DOCS: KnowledgeArtifact[] = [
  { title: "Project OS north star", kind: "Strategy doc", summary: "Defines the product thesis, positioning, and design philosophy." },
  { title: "Decision log — navigation model", kind: "Decision record", summary: "Captures the 4-layer navigation model and route structure." },
  { title: "Research synthesis — productivity tools", kind: "Research collection", summary: "Competitive insights from Linear, Notion, Slack, Figma, ClickUp, and Jira." },
];

const HOME_APPROVALS: ApprovalCard[] = [
  {
    title: "Approve the project cockpit as the default project landing page",
    owner: "Product architecture",
    summary: "Unlocks the shift from a task-list-first model to a command-bridge model.",
  },
  {
    title: "Confirm workspace route strategy",
    owner: "Engineering foundation",
    summary: "Ensures App Router structure aligns with the new IA before deeper data integration.",
  },
];

const DEFAULT_HOME_WATCHLIST: DetailCardData[] = [
  {
    eyebrow: "Milestone drift",
    title: "Phase 3 visual-system signoff slipped by one review cycle",
    description: "The impact is contained, but it compresses the timeline for high-fidelity implementation.",
  },
  {
    eyebrow: "Dependency risk",
    title: "AI approval thresholds still need one explicit policy decision",
    description: "Resolve before the assistant is allowed to propose bulk work mutations.",
  },
];

const DEFAULT_HOME_SCHEDULE = [
  "2:30 PM · Review workspace route architecture",
  "4:00 PM · Align cockpit module density",
  "Tomorrow · Start detailed work view wireframes",
];

const DEFAULT_PROJECTS_METRICS = [
  { label: "Active", value: "3", hint: "1 flagship build · 2 exploratory tracks" },
  { label: "On watch", value: "1", hint: "Needs a milestone decision" },
  { label: "Templates", value: "7", hint: "Reusable operating models ready" },
];

const DEFAULT_PROJECT_LANES = [
  { title: "Foundation", description: "Architecture and shell work nearing stability." },
  { title: "Pilot", description: "Research and academic workflows being validated." },
  { title: "Discovery", description: "Enterprise governance surface still gathering constraints." },
];

const DEFAULT_PROJECT_KITS = [
  { title: "Startup sprint OS", description: "Fast-moving team template for product, engineering, and review cycles." },
  { title: "Research studio", description: "Notes, evidence, advisor review, and milestone defense built in." },
  { title: "Enterprise rollout", description: "Governance, stakeholder reporting, and cross-team approval layers." },
];

const DEFAULT_WORK_TASKS = [
  {
    id: "task-1",
    title: "Ship shell architecture",
    status: "In progress",
    owner: "Ibukunoluwa",
    due: "Today",
    summary: "Inline editing, due-date control, dependency visibility, and keyboard navigation all live in the same row model.",
  },
  {
    id: "task-2",
    title: "Map workspace routes",
    status: "Review",
    owner: "AI architect",
    due: "Tomorrow",
    summary: "Preserve scope and context as users move between projects, work, and knowledge.",
  },
  {
    id: "task-3",
    title: "Draft workload balancing logic",
    status: "Backlog",
    owner: "Ops design",
    due: "Next week",
    summary: "Ensure rebalancing guidance stays visible without becoming noisy or paternalistic.",
  },
];

const DEFAULT_KNOWLEDGE_METRICS = [
  { label: "Key docs", value: "9", hint: "Briefs, roadmaps, and architectural rationale" },
  { label: "Decision records", value: "5", hint: "Each tied to alternatives and outcomes" },
  { label: "Research sets", value: "3", hint: "Competitive, user, and implementation evidence" },
];

const DEFAULT_LIBRARY_ITEMS = [
  { title: "Docs", description: "Specs, plans, one-pagers, and briefs with direct links to execution." },
  { title: "Decisions", description: "Rationale, status, alternatives, and linked artifacts." },
  { title: "Research", description: "Evidence, citations, summaries, and knowledge extraction." },
  { title: "Collections", description: "Curated spaces for references, files, and topic clusters." },
];

const DEFAULT_KNOWLEDGE_AI = [
  "Summarize the latest research collection with explicit evidence links.",
  "Extract action items from the last three meeting notes and route them into Work.",
  "Answer a project question using only cited artifacts from this knowledge scope.",
];

const DEFAULT_INBOX_ITEMS = [
  { id: "inbox-1", type: "Messages", title: "Can you review the gearbox?", source: "Sarah · Project: Autonomous Robot", state: "10:42 AM", avatar: "S" },
  { id: "inbox-2", type: "Requests", title: "David wants to join Autonomous Robot", source: "Join Request · Skills: C++, Arduino, STM32", state: "Action required", avatar: "D" },
  { id: "inbox-3", type: "Mentions", title: "Sarah mentioned you in gearbox.step", source: "File Comment", state: "Mention", avatar: "S" },
  { id: "inbox-4", type: "Notifications", title: "Milestone risk changed", source: "Project cockpit · Update", state: "System", avatar: "F" },
  { id: "inbox-5", type: "Notifications", title: "Research synthesis ready", source: "Knowledge hub · Digest", state: "AI digest", avatar: "F" },
];

const DEFAULT_INBOX_SELECTED = {
  title: "Approve the command-surface interaction model",
  summary:
    "The command surface now unifies find, do, ask, and create into one overlay. This approval locks the navigation grammar before deeper task, search, and AI data integration.",
  source: "ForgeHub Redesign / Decision log",
  action: "Approve with a note on mobile focus recovery",
};

const DEFAULT_INBOX_TRIAGE = [
  "Cluster related updates into one review batch instead of showing three separate messages.",
  "Explain why the selected approval matters for later wireframe and visual-system work.",
  "Draft a concise reply that confirms direction and captures the guardrails still open.",
];

const DEFAULT_COCKPIT_METRICS = [
  { label: "Health", value: "On watch", hint: "1 blocker · 2 decisions pending" },
  { label: "Milestone", value: "Phase 3", hint: "Wireframes and premium UI refinement" },
  { label: "Team load", value: "Balanced", hint: "No contributor over safe capacity" },
];

const DEFAULT_COCKPIT_BLOCKERS = [
  "Interaction density needs careful testing so enterprise richness does not become clutter.",
  "Knowledge architecture still needs final decision-record metadata before deep database integration.",
  "AI assist patterns need explicit approval policy before any consequential automation is shipped.",
];

const DEFAULT_COCKPIT_BRIEF = [
  "The project is strongest when the cockpit stays the default landing surface for every project type.",
  "The unified command surface remains ForgeHub’s clearest differentiator versus fragmented productivity stacks.",
  "Next best move after this pass: bind the core surfaces to live data and search state.",
];

const DEFAULT_COCKPIT_DECISIONS = [
  { title: "Project cockpit becomes the default project landing surface", status: "Accepted" },
  { title: "Command, search, and AI merge into one command surface", status: "Accepted" },
  { title: "Work and knowledge remain lenses on the same system, not separate products", status: "Accepted" },
];

export function HomeScreen({ scope, data }: { scope?: string; data?: HomeScreenData }) {
  const metrics = data?.metrics ?? [
    { label: "Actionable items", value: "12", hint: "6 due today · 2 awaiting approval" },
    { label: "Projects in motion", value: "3", hint: "1 milestone needs an immediate decision" },
    { label: "AI prompts", value: "4", hint: "Suggested summaries, risk checks, and standups" },
  ];
  const focusItems = data ? data.focusItems : HOME_FOCUS;
  const approvals = data ? data.approvals : HOME_APPROVALS;
  const projects = data ? data.projects : ACTIVE_PROJECTS;
  const watchlist = data ? data.watchlist : DEFAULT_HOME_WATCHLIST;
  const schedule = data ? data.schedule : DEFAULT_HOME_SCHEDULE;

  if (projects.length === 0 && focusItems.length === 0 && approvals.length === 0) {
    return (
      <GlobalEmptyState
        title="Welcome to ForgeHub"
        description="Your command center is currently clear. Start by creating a project to begin capturing decisions, tracking milestones, and accelerating delivery."
        actionLabel="Create your first project"
        actionHref="/projects/new"
      />
    );
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <ScreenHero
        id="ai-brief"
        eyebrow="Home"
        title="Operate the day with one calm, command-first view."
        description={`${scope ?? "Your personal command center"} brings together priorities, approvals, active projects, and AI intelligence so you can start meaningful work without hunting across surfaces.`}
        metrics={metrics}
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_1fr_0.92fr]">
        <div className="space-y-6">
          <PanelCard id="today-focus" title="Today focus" description="The exact work to protect time for first.">
            <div className="space-y-3">
              {focusItems.length ? focusItems.map((item) => <FocusItem key={item.title} {...item} />) : <EmptyInlineState title="No urgent work in this scope" description="Capture a task or review project updates to seed your focus list." />}
            </div>
          </PanelCard>

          <PanelCard id="approvals" title="Approvals & reviews" description="Decisions waiting on your signal.">
            <div className="space-y-3">
              {approvals.length ? approvals.map((item) => <DetailCard key={item.title} title={item.title} eyebrow={item.owner} description={item.summary} />) : <EmptyInlineState title="No approvals right now" description="When teammates request decisions or reviews, they will appear here." />}
            </div>
          </PanelCard>
        </div>

        <div className="space-y-6">
          <PanelCard id="active-projects" title="Active projects" description="Resume the most important workstreams in one hop.">
            <div className="space-y-3">
              {projects.length ? projects.map((project) => (
                <Link key={project.name} href={project.href} className="surface-panel-muted block p-4 transition-all duration-200 hover:border-primary/60 hover:bg-surface hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-text-primary">{project.name}</p>
                      <p className="mt-1 text-sm text-text-muted">{project.summary}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-text-muted" aria-hidden />
                  </div>
                  <p className="signal-pill signal-pill-neutral mt-3 text-xs text-text-muted">{project.stage}</p>
                </Link>
              )) : <EmptyInlineState title="No active projects yet" description="Create a project to populate your command center and project cockpit." actionLabel="Create project" actionHref="/projects/new" />}
            </div>
          </PanelCard>

          <PanelCard id="watchlist" title="Watchlist changes" description="Cross-project updates that might affect what you do next.">
            <div className="space-y-3">
              {watchlist.length ? watchlist.map((item) => <DetailCard key={item.title} eyebrow={item.eyebrow} title={item.title} description={item.description} />) : <EmptyInlineState title="No watchlist signals" description="Pin projects or generate a review batch to start tracking critical changes." />}
            </div>
          </PanelCard>
        </div>

        <div className="space-y-6">
          <PanelCard title="AI brief" description="Ambient assistance that explains why it is speaking up.">
            <AssistList
              items={[
                "Summarize everything that changed since yesterday across your active projects.",
                "Draft a standup update using only items due in the next 72 hours.",
                "Identify which project is most likely to slip based on blockers and review latency.",
              ]}
            />
          </PanelCard>

          <PanelCard id="quick-capture" title="Quick capture" description="Create new work and knowledge without breaking context.">
            <div className="grid gap-3">
              <ActionTile title="New project" description="Create a structured project with guided documentation from the start." href="/projects/new" />
              <ActionTile title="New doc" description="Start a brief, decision record, or research note linked to this workspace or project." href={projects.length ? `${projects[0].href.replace('/overview', '/knowledge')}` : "/projects/new"} />
              <ActionTile title="AI summary" description="Turn recent changes into a clean brief, standup, or stakeholder update." />
            </div>
          </PanelCard>

          <PanelCard title="Upcoming schedule" description="Time-based context for the next working window.">
            {schedule.length ? <MiniTimeline items={schedule} /> : <EmptyInlineState title="No upcoming schedule context" description="As projects and work gain more time data, the next working window will appear here." />}
          </PanelCard>
        </div>
      </div>
    </div>
  );
}

export function InboxScreen({ data, activeTab = "Messages" }: { data?: InboxScreenData; activeTab?: string }) {
  const items = (data && data.items && data.items.length > 0) ? data.items : DEFAULT_INBOX_ITEMS;
  const filteredItems = items.filter(item => (item as { type?: string }).type === activeTab || !(item as { type?: string }).type);
  const selected = data?.selected ?? DEFAULT_INBOX_SELECTED;
  const triage = data ? data.triage : DEFAULT_INBOX_TRIAGE;

  if (items.length === 0) {
    return (
      <GlobalEmptyState
        icon={Bell}
        title="Inbox Zero"
        description="Your attention queue is completely clear. Approvals, mentions, and project updates will appear here when they need your input."
        actionLabel="Explore active projects"
        actionHref="/projects"
      />
    );
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-6 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-text-primary">Inbox</h1>
        <p className="text-lg text-text-muted">What requires your attention or response.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 rounded-lg bg-surface-muted p-1 sm:w-fit">
        {["Messages", "Requests", "Notifications", "Mentions"].map((tab) => (
          <Link
            key={tab}
            href={`/inbox?tab=${tab}`}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-surface text-text-primary shadow-sm"
                : "text-text-muted hover:bg-surface/50 hover:text-text-primary"
            }`}
          >
            {tab}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_320px]">
        <PanelCard id="action-required" title={`${activeTab} queue`} description="Triage queue with urgency first, chronology second.">
          <InboxQueue initialItems={filteredItems} />
        </PanelCard>

        <PanelCard id="project-updates" title="Selected item" description="Inspect source context without losing your place in the queue.">
          <InboxSelectedPanel selected={selected} />

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <ActionTile title="Mark read" description="Preserve source context while clearing the item from the active queue." />
            <ActionTile title="Snooze" description="Move follow-up to a future window without losing history." />
            <ActionTile title="Convert to task" description="Turn the thread into a durable execution item." />
          </div>
        </PanelCard>

        <PanelCard title="AI triage" description="Helpful where it reduces noise, never where it hides truth.">
          <AssistList items={triage.length ? triage : ["No triage suggestions right now. Inbox signals are already well scoped."]} />
        </PanelCard>
      </div>
    </div>
  );
}

export function ProjectsScreen({ scope, data }: { scope?: string; data?: ProjectsScreenData }) {
  const metrics = data?.metrics ?? DEFAULT_PROJECTS_METRICS;
  const projects = data ? data.projects : ACTIVE_PROJECTS;
  const lanes = data ? data.lanes : DEFAULT_PROJECT_LANES;
  const kits = data ? data.kits : DEFAULT_PROJECT_KITS;

  if (projects.length === 0) {
    return (
      <GlobalEmptyState
        icon={FolderKanban}
        title="Portfolio Empty"
        description="There are no active projects in your workspace. Start a new project to establish a command center for your next initiative."
        actionLabel="Create your first project"
        actionHref="/projects/new"
      />
    );
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <ScreenHero
        eyebrow="Projects"
        title={scope ? `${scope} projects` : "Portfolio visibility with direct paths into execution."}
        description="Projects are the center of gravity for planning, work, knowledge, and collaboration. This surface keeps the portfolio legible without turning it into dashboard noise."
        metrics={metrics}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-text-muted">{projects.length ? `${projects.length} active project${projects.length === 1 ? '' : 's'}` : 'No projects yet'}</p>
        <Link href="/projects/new" className={buttonVariants({ variant: "primary" })}>
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          New project
        </Link>
      </div>

      <section id="portfolio" className="grid gap-4 lg:grid-cols-3">
        {projects.length ? projects.map((project) => (
          <Link key={project.name} href={project.href} className="surface-panel block p-5 transition-all duration-200 hover:border-primary/60 hover:bg-surface hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
            <div className="flex items-center justify-between gap-4">
              <FolderKanban className="h-5 w-5 text-primary" aria-hidden />
              <span className="signal-pill signal-pill-neutral text-xs text-text-muted">{project.stage}</span>
            </div>
            <h2 className="mt-4 font-heading text-2xl text-text-primary">{project.name}</h2>
            <p className="mt-2 text-sm text-text-muted">{project.summary}</p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Open project cockpit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </p>
          </Link>
        )) : <div className="surface-panel col-span-full p-6"><EmptyInlineState title="No projects yet" description="Create a project to start using the portfolio and cockpit model." actionLabel="Create your first project" actionHref="/projects/new" /></div>}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <PanelCard id="active-projects" title="Portfolio lanes" description="Group work by stage, owner, and operating risk.">
          <div className="grid gap-3 md:grid-cols-3">
            {lanes.length ? lanes.map((lane) => <ActionTile key={lane.title} title={lane.title} description={lane.description} />) : <EmptyInlineState title="No portfolio lanes yet" description="As real portfolio signals accumulate, project grouping summaries will appear here." />}
          </div>
        </PanelCard>

        <PanelCard id="project-kits" title="Project kits" description="Opinionated starting structures, not generic templates.">
          <div className="grid gap-3">
            {kits.length ? kits.map((kit) => <ActionTile key={kit.title} title={kit.title} description={kit.description} href={`/projects/new?template=${kit.title.toLowerCase().replace(/\s+/g, '-')}`} />) : <EmptyInlineState title="No project kits yet" description="Template storage will surface real kits here once it is wired into the platform." />}
          </div>
        </PanelCard>
      </div>
    </div>
  );
}

export function WorkScreen({ scope, data }: { scope?: string; data?: WorkScreenData }) {
  const metrics = data?.metrics ?? [
    { label: "Due today", value: "6", hint: "2 blocked · 1 awaiting review" },
    { label: "Saved views", value: "4", hint: "By priority, by stream, by assignee" },
    { label: "AI suggestions", value: "3", hint: "Assignee, due-date, and backlog cues" },
  ];
  const tasks = data ? data.tasks : DEFAULT_WORK_TASKS;

  if (tasks.length === 0 && !scope) {
    return (
      <GlobalEmptyState
        icon={BriefcaseBusiness}
        title="Execution Queue Clear"
        description="You have no active work assignments. As projects generate tasks and reviews, your centralized execution board will populate here."
        actionLabel="Browse portfolio"
        actionHref="/projects"
      />
    );
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <ScreenHero
        eyebrow="Work"
        title={scope ? `${scope} work` : "One execution graph, many lenses."}
        description="List, board, timeline, calendar, and workload are different views of the same execution system. Filters, scope, and intent persist across every lens."
        metrics={metrics}
      />

      <PanelCard id="saved-views" title="View system" description="Switch lenses without switching products.">
        <div className="flex flex-wrap gap-3">
          {["Board", "List", "Timeline", "Calendar", "Workload", "Table"].map((view, index) => (
            <button type="button" key={view} className={`signal-pill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors ${index === 0 ? "signal-pill-brand" : "signal-pill-neutral hover:bg-surface hover:text-text-primary"}`}>
              {view}
            </button>
          ))}
        </div>
      </PanelCard>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-heading text-text-primary">Project Board</h2>
        <div className="flex gap-2">
          <button className="signal-pill signal-pill-neutral hover:bg-surface-elevated">Filter</button>
          <button className="signal-pill signal-pill-neutral hover:bg-surface-elevated">Sort</button>
        </div>
      </div>

      <KanbanBoard initialTasks={tasks} />
    </div>
  );
}

export function KnowledgeScreen({ scope, data }: { scope?: string; data?: KnowledgeScreenData }) {
  const metrics = data?.metrics ?? DEFAULT_KNOWLEDGE_METRICS;
  const docs = data ? data.docs : KNOWLEDGE_DOCS;
  const libraryItems = data ? data.libraryItems : DEFAULT_LIBRARY_ITEMS;
  const aiItems = data ? data.aiItems : DEFAULT_KNOWLEDGE_AI;

  if (docs.length === 0 && !scope) {
    return (
      <GlobalEmptyState
        icon={LibraryBig}
        title="Knowledge Base Empty"
        description="Your workspace has no durable knowledge yet. Project briefs, decision records, and research notes will aggregate here automatically."
        actionLabel="Start a new project"
        actionHref="/projects/new"
      />
    );
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <ScreenHero
        eyebrow="Knowledge"
        title={scope ? `${scope} knowledge` : "Project memory that survives beyond chat and tasks."}
        description="Docs, decisions, research, files, and meeting notes live in one connected system so the why behind the work is always recoverable."
        metrics={metrics}
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr_0.8fr]">
        <PanelCard id="docs" title="Library" description="Browse by document type, collection, or project scope.">
          <div className="grid gap-3">
            {libraryItems.length ? libraryItems.map((item) => <ActionTile key={item.title} title={item.title} description={item.description} />) : <EmptyInlineState title="No library structure yet" description="Knowledge collections will appear here as the workspace grows." />}
          </div>
        </PanelCard>

        <PanelCard id="decisions" title="Knowledge artifacts" description="High-fidelity content panels with strong hierarchy and linked context.">
          <div className="space-y-3">
            {docs.length ? docs.map((doc) => (
              <div key={doc.title} className="surface-panel-muted p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-text-primary">{doc.title}</p>
                  <span className="signal-pill signal-pill-neutral text-xs text-text-muted">{doc.kind}</span>
                </div>
                <p className="mt-2 text-sm text-text-muted">{doc.summary}</p>
              </div>
            )) : <EmptyInlineState title="No knowledge artifacts yet" description="Create a doc or log a decision to start building durable project memory." />}
          </div>
        </PanelCard>

        <PanelCard title="AI knowledge assist" description="Citations and synthesis before generation.">
          <AssistList items={aiItems.length ? aiItems : ["No knowledge suggestions available yet."]} />
        </PanelCard>
      </div>
    </div>
  );
}

export function ProjectCockpitScreen({
  workspaceSlug,
  projectSlug,
  data,
}: {
  workspaceSlug: string;
  projectSlug: string;
  data?: ProjectCockpitData;
}) {
  const projectName = prettyLabel(projectSlug);
  const workspaceName = prettyLabel(workspaceSlug);
  const metrics = data?.metrics ?? DEFAULT_COCKPIT_METRICS;
  const blockers = data ? data.blockers : DEFAULT_COCKPIT_BLOCKERS;
  const aiBrief = data ? data.aiBrief : DEFAULT_COCKPIT_BRIEF;
  const decisions = data ? data.decisions : DEFAULT_COCKPIT_DECISIONS;
  const artifacts = data ? data.artifacts : KNOWLEDGE_DOCS;

  if (artifacts.length === 0 && decisions.length === 0 && blockers.length === 0) {
    return (
      <div className="space-y-6 pb-20 lg:pb-6">
        <ScreenHero
          eyebrow={`${workspaceName} workspace`}
          title={projectName}
          description="The project cockpit is the operating center of gravity: health, milestone status, blockers, active work, key docs, decisions, and AI synthesis aligned in one command bridge."
          metrics={metrics}
        />
        {data?.project && (
          <div className="flex flex-wrap justify-end gap-3">
            <ShareProjectDialog projectId={data.project.id} slug={data.project.slug} initialVisibility={data.project.visibility} />
            <EditProjectDialog
              projectId={data.project.id}
              initialName={data.project.name}
              initialDescription={data.project.description}
              initialType={data.project.projectType}
            />
          </div>
        )}
        <GlobalEmptyState
          icon={Target}
          title="Project Empty"
          description="This project has no documentation, decisions, or tracked milestones yet. Kick off your first phase by drafting a project brief or inviting team members."
          actionLabel="Open Knowledge Base"
          actionHref={`/w/${workspaceSlug}/p/${projectSlug}/docs`}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <ScreenHero
        eyebrow={`${workspaceName} workspace`}
        title={projectName}
        description="The project cockpit is the operating center of gravity: health, milestone status, blockers, active work, key docs, decisions, and AI synthesis aligned in one command bridge."
        metrics={metrics}
      />

      {data?.project && (
        <div className="flex flex-wrap justify-end gap-3">
          <ShareProjectDialog projectId={data.project.id} slug={data.project.slug} initialVisibility={data.project.visibility} />
          <EditProjectDialog
            projectId={data.project.id}
            initialName={data.project.name}
            initialDescription={data.project.description}
            initialType={data.project.projectType}
          />
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr_0.8fr]">
        <PanelCard title="Current milestone" description="The immediate outcome the project is organizing around.">
          <div className="surface-panel-muted p-5">
            <div className="flex items-center gap-2 text-sm text-primary">
              <Target className="h-4 w-4" aria-hidden />
              {data?.milestoneLabel ?? "Phase 3 · detailed wireframes and visual-system pass"}
            </div>
            <p className="mt-3 text-text-muted">{data?.milestoneSummary ?? "Convert the structural architecture into high-confidence screen blueprints and premium UI foundations so future data integration lands on a stable interaction model."}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <SignalTile title="Work in motion" value={data?.workInMotion ?? "Shell polish, dense wireframes, refined surfaces"} icon={KanbanSquare} />
              <SignalTile title="Key dependency" value={data?.keyDependency ?? "Approve the premium visual tokens before scaling every view"} icon={Waypoints} />
            </div>
          </div>
        </PanelCard>

        <PanelCard title="Top blockers" description="What could slow or fragment the next phase.">
          {blockers.length ? <AssistList items={blockers} /> : <EmptyInlineState title="No active blockers" description="The cockpit will surface delivery, review, or knowledge risks here as soon as they appear." />}
        </PanelCard>

        <PanelCard title="AI project brief" description="Ambient intelligence with visible, inspectable evidence.">
          <AssistList items={aiBrief.length ? aiBrief : ["No AI brief available for this project yet."]} />
        </PanelCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <PanelCard title="Recent decisions" description="Durable context instead of losing rationale in chat history.">
          <div className="space-y-3">
            {decisions.length ? decisions.map((decision) => (
              <div key={decision.title} className="surface-panel-muted flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-medium text-text-primary">{decision.title}</p>
                  <p className="mt-1 text-sm text-text-muted">Captured with rationale, alternatives, and implementation implications.</p>
                </div>
                <span className="signal-pill signal-pill-neutral text-xs text-text-muted">{decision.status}</span>
              </div>
            )) : <EmptyInlineState title="No decisions recorded yet" description="Use the knowledge system to capture rationale and keep the project memory durable." />}
          </div>
        </PanelCard>

        <PanelCard title="Key artifacts" description="The docs and knowledge objects currently shaping execution.">
          <div className="space-y-3">
            {artifacts.length ? artifacts.map((doc) => (
              <div key={doc.title} className="surface-panel-muted p-4">
                <p className="font-medium text-text-primary">{doc.title}</p>
                <p className="mt-1 text-sm text-text-muted">{doc.summary}</p>
              </div>
            )) : <EmptyInlineState title="No key artifacts yet" description="As the project gains docs and decisions, the cockpit will highlight them here." />}
          </div>
        </PanelCard>
      </div>
    </div>
  );
}

export function ProjectPlanScreen({ projectSlug }: { projectSlug: string }) {
  const phases = [
    { name: "Phase 1: Foundation", status: "Completed", progress: 100, date: "Aug 1 - Aug 15" },
    { name: "Phase 2: Core Architecture", status: "In Progress", progress: 65, date: "Aug 16 - Sep 5" },
    { name: "Phase 3: High Fidelity UI", status: "Not Started", progress: 0, date: "Sep 6 - Sep 20" },
    { name: "Phase 4: Data Integration", status: "Not Started", progress: 0, date: "Sep 21 - Oct 10" }
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <PageIntro
        title="Project Plan"
        description={`Strategic roadmap and timeline for ${prettyLabel(projectSlug)}.`}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-heading text-xl text-text-primary">Milestones</h2>
          {phases.map((phase) => (
            <div key={phase.name} className="surface-panel p-5 transition-all hover:border-primary/50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-text-primary">{phase.name}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${phase.status === "Completed" ? "bg-success/10 text-success" :
                  phase.status === "In Progress" ? "bg-primary/10 text-primary" :
                    "bg-surface-elevated text-text-muted"
                  }`}>
                  {phase.status}
                </span>
              </div>
              <p className="text-sm text-text-muted mb-4">{phase.date}</p>
              <div className="w-full bg-surface-elevated rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${phase.progress === 100 ? 'bg-success' : 'bg-primary'}`}
                  style={{ width: `${phase.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-xl text-text-primary">Dependencies</h2>
          <div className="surface-panel p-5 space-y-4">
            <div className="border-b border-border pb-3">
              <p className="text-sm font-medium text-text-primary">Design System Token Freeze</p>
              <p className="text-xs text-text-muted mt-1">Blocks Phase 3 UI work</p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="text-sm font-medium text-text-primary">Supabase Auth Migration</p>
              <p className="text-xs text-text-muted mt-1">Blocks Phase 4 Integration</p>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">API Rate Limiting Policy</p>
              <p className="text-xs text-text-muted mt-1">Review pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectConversationScreen({ projectSlug }: { projectSlug: string }) {
  return (
    <ProjectSectionFrame
      title="Conversation"
      description={`Work-native discussions for ${prettyLabel(projectSlug)} with promotion paths into tasks, docs, and decision records.`}
      cards={[
        { title: "Project channels", detail: "Fast async collaboration with links back to tasks, docs, and milestones.", icon: MessageSquareMore },
        { title: "Decision capture", detail: "Promote important threads into durable records instead of letting them disappear.", icon: CircleEllipsis },
        { title: "AI thread summaries", detail: "Summarize long discussions without hiding the original comments or context.", icon: Bot },
      ]}
    />
  );
}

export function ProjectReviewScreen({ projectSlug }: { projectSlug: string }) {
  const reviews = [
    { id: "REV-402", title: "Authentication Flow Wireframes", author: "Ibukunoluwa", type: "Design", status: "Pending", urgency: "high" },
    { id: "REV-401", title: "Database Schema V2", author: "AI Architect", type: "Architecture", status: "Changes Requested", urgency: "medium" },
    { id: "REV-399", title: "User Onboarding Copy", author: "Content Team", type: "Copy", status: "Approved", urgency: "low" }
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <PageIntro
        title="Review Queue"
        description={`Pending approvals, pull requests, and document reviews for ${prettyLabel(projectSlug)}.`}
      />

      <div className="surface-panel overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-surface-muted text-xs font-semibold text-text-muted uppercase tracking-wider">
          <div className="col-span-5">Artifact</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Author</div>
          <div className="col-span-3 text-right">Status</div>
        </div>

        <div className="divide-y divide-border">
          {reviews.map((rev) => (
            <div key={rev.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-surface-elevated transition-colors cursor-pointer">
              <div className="col-span-5 flex flex-col">
                <span className="font-medium text-text-primary">{rev.title}</span>
                <span className="text-xs text-text-muted">{rev.id}</span>
              </div>
              <div className="col-span-2 text-sm text-text-muted">{rev.type}</div>
              <div className="col-span-2 text-sm text-text-muted">{rev.author}</div>
              <div className="col-span-3 flex justify-end">
                <span className={`text-xs px-2 py-1 rounded-md font-medium ${rev.status === "Approved" ? "bg-success/10 text-success" :
                  rev.status === "Pending" ? "bg-warning/10 text-warning" :
                    "bg-error/10 text-error"
                  }`}>
                  {rev.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectInsightsScreen({ projectSlug }: { projectSlug: string }) {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <PageIntro
        title="Insights & Telemetry"
        description={`Delivery velocity, health metrics, and workload capacity for ${prettyLabel(projectSlug)}.`}
      />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="surface-panel p-5">
          <h3 className="text-sm font-medium text-text-muted mb-2">Velocity (Tasks/Week)</h3>
          <div className="text-3xl font-heading text-text-primary">24.5</div>
          <p className="text-xs text-success mt-2 flex items-center gap-1">↑ 12% vs last week</p>
        </div>
        <div className="surface-panel p-5">
          <h3 className="text-sm font-medium text-text-muted mb-2">Blocker Resolution Time</h3>
          <div className="text-3xl font-heading text-text-primary">1.2d</div>
          <p className="text-xs text-success mt-2 flex items-center gap-1">↓ 4 hours vs last week</p>
        </div>
        <div className="surface-panel p-5">
          <h3 className="text-sm font-medium text-text-muted mb-2">Team Capacity</h3>
          <div className="text-3xl font-heading text-text-primary">85%</div>
          <p className="text-xs text-warning mt-2 flex items-center gap-1">Approaching limits</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="surface-panel p-5 h-64 flex flex-col justify-between">
          <h3 className="font-medium text-text-primary">Task Completion Trend</h3>
          <div className="flex items-end justify-between h-40 gap-2 mt-4">
            {/* Simple CSS bar chart placeholder */}
            {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
              <div key={i} className="w-full bg-primary/20 rounded-t-sm relative group">
                <div className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all" style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-text-muted mt-2">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="surface-panel p-5">
          <h3 className="font-medium text-text-primary mb-4">Risk Heatmap</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-primary">Scope Creep</span>
                <span className="text-warning font-medium">Medium</span>
              </div>
              <div className="w-full bg-surface-elevated h-1.5 rounded-full"><div className="bg-warning w-1/2 h-1.5 rounded-full" /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-primary">Technical Debt</span>
                <span className="text-error font-medium">High</span>
              </div>
              <div className="w-full bg-surface-elevated h-1.5 rounded-full"><div className="bg-error w-4/5 h-1.5 rounded-full" /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-primary">Resource Availability</span>
                <span className="text-success font-medium">Low</span>
              </div>
              <div className="w-full bg-surface-elevated h-1.5 rounded-full"><div className="bg-success w-1/4 h-1.5 rounded-full" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PlaceholderScreen({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <PageIntro title={title} description={description} />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          "Structured, intentional navigation over feature sprawl.",
          "AI assistance that explains itself and stays reversible.",
          "Cross-object workflows where work, knowledge, and conversation stay connected.",
        ].map((item) => (
          <div key={item} className="surface-panel p-5 text-sm text-text-muted">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectSectionFrame({
  title,
  description,
  cards,
}: {
  title: string;
  description: string;
  cards: ProjectSectionCard[];
}) {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <PageIntro title={title} description={description} />
      <div className="grid gap-4 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="surface-panel p-5">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="mt-4 font-heading text-2xl text-text-primary">{card.title}</h2>
              <p className="mt-2 text-sm text-text-muted">{card.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScreenHero({
  eyebrow,
  title,
  description,
  metrics,
  id,
}: {
  eyebrow: string;
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string; hint: string }>;
  id?: string;
}) {
  return (
    <section id={id} className="surface-hero p-6 lg:p-7">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow text-white/70">{eyebrow}</p>
          <h1 className="mt-3 font-heading text-3xl text-white sm:text-4xl lg:text-[2.75rem]">{title}</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-200/90">{description}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[420px]">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} label={metric.label} value={metric.value} hint={metric.hint} inverted />
          ))}
        </div>
      </div>
    </section>
  );
}

function PageIntro({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="eyebrow">ForgeHub core surface</p>
        <h1 className="mt-3 font-heading text-3xl text-text-primary sm:text-4xl">{title}</h1>
        <p className="mt-3 text-base text-text-muted">{description}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/w/forgehub/p/forgehub-redesign/overview" className={buttonVariants({ variant: "secondary" })}>
          Open flagship project
        </Link>
        <Link href="/knowledge#decisions" className={buttonVariants({ variant: "primary" })}>
          Review decisions
        </Link>
      </div>
    </div>
  );
}

function PanelCard({
  title,
  description,
  children,
  id,
}: {
  title: string;
  description: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="surface-panel p-5">
      <div className="mb-4">
        <h2 className="font-heading text-2xl text-text-primary">{title}</h2>
        <p className="mt-1 text-sm text-text-muted">{description}</p>
      </div>
      {children}
    </section>
  );
}

function FocusItem({ title, meta, tone }: FocusCard) {
  const toneClass =
    tone === "urgent"
      ? "border-error/30 bg-error/10 hover:border-error/50 hover:bg-error/20"
      : tone === "warning"
        ? "border-warning/30 bg-warning/10 hover:border-warning/50 hover:bg-warning/20"
        : "surface-panel-muted hover:border-primary/50 hover:bg-surface";

  return (
    <button type="button" className={`group w-full rounded-xl border p-4 text-left transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${toneClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`font-medium text-text-primary transition-colors ${tone === "default" ? "group-hover:text-primary" : tone === "urgent" ? "group-hover:text-error" : "group-hover:text-warning"}`}>{title}</p>
          <p className="mt-1 text-sm text-text-muted">{meta}</p>
        </div>
        <ListTodo className={`h-4 w-4 shrink-0 text-text-muted transition-colors ${tone === "default" ? "group-hover:text-primary" : tone === "urgent" ? "group-hover:text-error" : "group-hover:text-warning"}`} aria-hidden />
      </div>
    </button>
  );
}

function MetricCard({
  label,
  value,
  hint,
  inverted = false,
}: {
  label: string;
  value: string;
  hint: string;
  inverted?: boolean;
}) {
  return (
    <div className={`rounded-2xl border px-4 py-3 ${inverted ? "border-white/12 bg-white/6" : "border-border bg-bg"}`}>
      <p className={`text-xs uppercase tracking-[0.16em] ${inverted ? "text-slate-300/80" : "text-text-muted"}`}>{label}</p>
      <p className={`mt-2 font-heading text-2xl ${inverted ? "text-white" : "text-text-primary"}`}>{value}</p>
      <p className={`mt-1 text-sm ${inverted ? "text-slate-200/85" : "text-text-muted"}`}>{hint}</p>
    </div>
  );
}

function DetailCard({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="surface-panel-muted p-4">
      <p className="eyebrow">{eyebrow}</p>
      <p className="mt-2 font-medium text-text-primary">{title}</p>
      <p className="mt-1 text-sm text-text-muted">{description}</p>
    </div>
  );
}

function ActionTile({
  title,
  description,
  id,
  href,
}: {
  title: string;
  description: string;
  id?: string;
  href?: string;
}) {
  const content = (
    <>
      <p className="font-medium text-text-primary">{title}</p>
      <p className="mt-1 text-sm text-text-muted">{description}</p>
    </>
  );

  if (href) {
    return (
      <Link id={id} href={href} className="surface-panel-muted block p-4 transition-all duration-200 hover:border-primary/60 hover:bg-surface hover:shadow-md">
        {content}
      </Link>
    );
  }

  return (
    <div id={id} className="surface-panel-muted p-4">
      {content}
    </div>
  );
}

function SignalTile({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <div className="surface-panel p-4">
      <div className="flex items-center gap-2 text-sm text-primary">
        <Icon className="h-4 w-4" aria-hidden />
        {title}
      </div>
      <p className="mt-2 text-sm text-text-muted">{value}</p>
    </div>
  );
}

function AssistList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="surface-panel-muted p-4 text-sm text-text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}

function MiniTimeline({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item} className="group flex gap-3">
          <div className="flex flex-col items-center">
            <div className="relative mt-1 flex h-3 w-3 items-center justify-center">
              <div className="absolute h-full w-full rounded-full bg-primary/20 ring-1 ring-primary/30" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            </div>
            {index < items.length - 1 ? <div className="mt-2 h-full w-px bg-primary/20" /> : null}
          </div>
          <div className="surface-panel-muted flex-1 p-4 text-sm text-text-muted transition-all duration-200 group-hover:border-primary/50 group-hover:bg-surface group-hover:text-text-primary group-hover:shadow-md">{item}</div>
        </div>
      ))}
    </div>
  );
}

export function GlobalEmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon?: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface-muted border border-border shadow-inner">
        {Icon ? <Icon className="h-10 w-10 text-primary opacity-80" /> : <Sparkles className="h-10 w-10 text-primary opacity-80" />}
        <div className="absolute inset-0 rounded-full ring-1 ring-primary/20 ring-offset-2 ring-offset-bg blur-sm"></div>
      </div>
      <h2 className="font-heading text-2xl text-text-primary mb-2">{title}</h2>
      <p className="text-text-muted max-w-md mx-auto mb-8">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className={buttonVariants({ variant: "primary", size: "lg" })}>
          <Plus className="mr-2 h-4 w-4" />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

function EmptyInlineState({ title, description, actionLabel, actionHref }: { title: string; description: string; actionLabel?: string; actionHref?: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-surface-muted/50 px-4 py-5 text-center">
      <p className="text-sm font-medium text-text-muted">{title}</p>
      <p className="mt-1 text-xs text-text-muted/70">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className={`mt-3 inline-flex ${buttonVariants({ variant: "primary", size: "sm" })}`}>
          <Plus className="mr-1.5 h-3.5 w-3.5" aria-hidden />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function DashboardScreen({ user }: { user: import('@supabase/supabase-js').User | null; data?: HomeScreenData }) {
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "Builder";
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Context Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
          Good morning, {displayName}.
        </h1>
        <p className="text-lg text-text-muted">
          Here’s what’s happening across your workspaces.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link href="/projects/new" className={buttonVariants({ variant: "primary" })}>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Link>
        <Link href="/workspaces/new" className={buttonVariants({ variant: "outline" })}>
          Create Workspace
        </Link>
        <Link href="/explore" className={buttonVariants({ variant: "ghost" })}>
          Explore
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {/* Action Center (Mentions, Approvals) */}
          <section className="space-y-4" id="action-center">
            <h2 className="text-xl font-semibold tracking-tight text-text-primary">Action Center</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {HOME_APPROVALS.map((item, idx) => (
                <div key={idx} className="group relative flex flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-warning" />
                      <span className="text-xs font-medium uppercase tracking-wider text-warning">
                        Approval Required
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                        <Link href="#" className="focus:outline-none">
                          <span className="absolute inset-0" aria-hidden="true" />
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-text-muted">{item.summary}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* My Projects */}
          <section className="space-y-4" id="projects">
            <h2 className="text-xl font-semibold tracking-tight text-text-primary">My Projects</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ACTIVE_PROJECTS.map((project, idx) => (
                <div key={idx} className="group relative rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary">
                  <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                    <Link href={project.href} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {project.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">{project.stage}</p>
                  <p className="mt-3 line-clamp-2 text-sm text-text-muted">{project.summary}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar / Recent Activity */}
        <div className="space-y-10">
          <section className="space-y-4" id="activity">
            <h2 className="text-lg font-semibold tracking-tight text-text-primary">Recent Activity</h2>
            <div className="space-y-4 rounded-xl border border-border bg-surface p-5">
              {HOME_FOCUS.map((focus, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${focus.tone === "urgent" ? "bg-error" : focus.tone === "warning" ? "bg-warning" : "bg-primary"}`} />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{focus.title}</p>
                    <p className="text-xs text-text-muted mt-1">{focus.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function WorkspaceScreen({ workspace, projects }: { workspace: { name: string; slug: string; workspace_members?: unknown[]; [key: string]: unknown }, projects: { id: string; name: string; slug: string; project_type?: string | null; description?: string | null; [key: string]: unknown }[], user?: { user_metadata?: { full_name?: string; name?: string }; email?: string } | null }) {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Context Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface border border-border">
            <span className="text-lg font-semibold text-text-primary uppercase">{workspace.name.substring(0, 2)}</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
            {workspace.name}
          </h1>
        </div>
        <p className="text-lg text-text-muted">
          Overview of projects and activity in this workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {/* Projects */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-text-primary">Active Projects</h2>
              <Link href={`/projects/new?workspace=${workspace.slug}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                <Plus className="mr-2 h-3.5 w-3.5" /> New Project
              </Link>
            </div>
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <div key={project.id} className="group relative rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary">
                    <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                      <Link href={`/w/${workspace.slug}/p/${project.slug}/overview`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {project.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-xs text-text-muted">{project.project_type || "Standard"}</p>
                    <p className="mt-3 line-clamp-2 text-sm text-text-muted">{project.description || "No description provided."}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border p-8 text-center">
                <FolderKanban className="mx-auto h-8 w-8 text-text-muted" />
                <h3 className="mt-4 text-sm font-medium text-text-primary">No projects yet</h3>
                <p className="mt-1 text-sm text-text-muted">Get started by creating a new project in this workspace.</p>
                <div className="mt-6">
                  <Link href={`/projects/new?workspace=${workspace.slug}`} className={buttonVariants({ variant: "primary" })}>
                    <Plus className="mr-2 h-4 w-4" /> Create Project
                  </Link>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar / Team & Activity */}
        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight text-text-primary">Workspace Stats</h2>
            <div className="space-y-4 rounded-xl border border-border bg-surface p-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Users className="h-4 w-4" /> Team members
                </div>
                <span className="font-medium text-text-primary">
                  {workspace.workspace_members?.length || 1}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <FolderKanban className="h-4 w-4" /> Total projects
                </div>
                <span className="font-medium text-text-primary">
                  {projects.length}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
