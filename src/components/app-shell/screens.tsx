import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowRight,
  BellDot,
  Bot,
  CalendarClock,
  CheckCircle2,
  CircleEllipsis,
  FileStack,
  Flag,
  FolderKanban,
  KanbanSquare,
  ListTodo,
  MessageSquareMore,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Waypoints,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { prettyLabel } from "./shell-config";

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

export function HomeScreen({ scope }: { scope?: string }) {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <ScreenHero
        id="ai-brief"
        eyebrow="Home"
        title="Operate the day with one calm, command-first view."
        description={`${scope ?? "Your personal command center"} brings together priorities, approvals, active projects, and AI intelligence so you can start meaningful work without hunting across surfaces.`}
        metrics={[
          { label: "Actionable items", value: "12", hint: "6 due today · 2 awaiting approval" },
          { label: "Projects in motion", value: "3", hint: "1 milestone needs an immediate decision" },
          { label: "AI prompts", value: "4", hint: "Suggested summaries, risk checks, and standups" },
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_1fr_0.92fr]">
        <div className="space-y-6">
          <PanelCard id="today-focus" title="Today focus" description="The exact work to protect time for first.">
            <div className="space-y-3">
              {HOME_FOCUS.map((item) => (
                <FocusItem key={item.title} {...item} />
              ))}
            </div>
          </PanelCard>

          <PanelCard id="approvals" title="Approvals & reviews" description="Decisions waiting on your signal.">
            <div className="space-y-3">
              {HOME_APPROVALS.map((item) => (
                <DetailCard key={item.title} title={item.title} eyebrow={item.owner} description={item.summary} />
              ))}
            </div>
          </PanelCard>
        </div>

        <div className="space-y-6">
          <PanelCard id="active-projects" title="Active projects" description="Resume the most important workstreams in one hop.">
            <div className="space-y-3">
              {ACTIVE_PROJECTS.map((project) => (
                <Link key={project.name} href={project.href} className="surface-panel-muted block p-4 transition-colors hover:border-primary/60 hover:bg-surface">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-text-primary">{project.name}</p>
                      <p className="mt-1 text-sm text-text-muted">{project.summary}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-text-muted" aria-hidden />
                  </div>
                  <p className="signal-pill signal-pill-neutral mt-3 text-xs text-text-muted">{project.stage}</p>
                </Link>
              ))}
            </div>
          </PanelCard>

          <PanelCard id="watchlist" title="Watchlist changes" description="Cross-project updates that might affect what you do next.">
            <div className="space-y-3">
              <DetailCard
                eyebrow="Milestone drift"
                title="Phase 3 visual-system signoff slipped by one review cycle"
                description="The impact is contained, but it compresses the timeline for high-fidelity implementation."
              />
              <DetailCard
                eyebrow="Dependency risk"
                title="AI approval thresholds still need one explicit policy decision"
                description="Resolve before the assistant is allowed to propose bulk work mutations."
              />
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
              <ActionTile title="New task" description="Add work with assignee, date, and priority defaults from the current scope." />
              <ActionTile title="New doc" description="Start a brief, decision record, or research note linked to this workspace or project." />
              <ActionTile title="AI summary" description="Turn recent changes into a clean brief, standup, or stakeholder update." />
            </div>
          </PanelCard>

          <PanelCard title="Upcoming schedule" description="Time-based context for the next working window.">
            <MiniTimeline
              items={[
                "2:30 PM · Review workspace route architecture",
                "4:00 PM · Align cockpit module density",
                "Tomorrow · Start detailed work view wireframes",
              ]}
            />
          </PanelCard>
        </div>
      </div>
    </div>
  );
}

export function InboxScreen() {
  const inboxItems = [
    { title: "Approve the command-surface interaction model", source: "ForgeHub Redesign · Approval", state: "Action required" },
    { title: "New comment on AI guardrails", source: "Decision log · Mention", state: "Mention" },
    { title: "Milestone risk changed", source: "Project cockpit · Update", state: "Project update" },
    { title: "Research synthesis ready", source: "Knowledge hub · Digest", state: "AI digest" },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <PageIntro
        title="Inbox"
        description="A master-detail attention system where approvals, mentions, and project changes are grouped by actionability rather than dumped in time order."
      />

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_320px]">
        <PanelCard id="action-required" title="Action required" description="Triage queue with urgency first, chronology second.">
          <div className="space-y-3">
            {inboxItems.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-[22px] border p-4 ${index === 0 ? "border-primary/40 bg-primary/8" : "border-border bg-bg"}`}
              >
                <p className="eyebrow">{item.state}</p>
                <p className="mt-2 font-medium text-text-primary">{item.title}</p>
                <p className="mt-1 text-sm text-text-muted">{item.source}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3" id="approvals">
            <ActionTile title="Approvals" description="2 approval requests need explicit signoff before work can proceed." />
            <ActionTile title="Project updates" description="3 updates are grouped into one review batch to reduce noise." />
            <ActionTile title="Snoozed" description="1 thread is muted until tomorrow morning and still searchable." />
          </div>
        </PanelCard>

        <PanelCard id="project-updates" title="Selected item" description="Inspect source context without losing your place in the queue.">
          <div className="surface-panel-muted p-5">
            <div className="flex items-center gap-2 text-sm text-primary">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              Approval request
            </div>
            <h2 className="mt-3 font-heading text-2xl text-text-primary">Approve the command-surface interaction model</h2>
            <p className="mt-3 text-text-muted">
              The command surface now unifies find, do, ask, and create into one overlay. This approval locks the navigation grammar before deeper task, search, and AI data integration.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <SignalTile title="Source" value="ForgeHub Redesign / Decision log" icon={FileStack} />
              <SignalTile title="Recommended action" value="Approve with a note on mobile focus recovery" icon={BellDot} />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className={buttonVariants("primary")}>Approve direction</button>
              <button className={buttonVariants("secondary")}>Ask AI to summarize thread</button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3" id="snoozed">
            <ActionTile title="Mark read" description="Preserve source context while clearing the item from the active queue." />
            <ActionTile title="Snooze" description="Move follow-up to a future window without losing history or searchability." />
            <ActionTile title="Convert to task" description="Turn the thread into a durable execution item with one action." />
          </div>
        </PanelCard>

        <PanelCard title="AI triage" description="Helpful where it reduces noise, never where it hides truth.">
          <AssistList
            items={[
              "Cluster related updates into one review batch instead of showing three separate messages.",
              "Explain why the selected approval matters for later wireframe and visual-system work.",
              "Draft a concise reply that confirms direction and captures the guardrails still open.",
            ]}
          />
        </PanelCard>
      </div>
    </div>
  );
}

export function ProjectsScreen({ scope }: { scope?: string }) {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <ScreenHero
        eyebrow="Projects"
        title={scope ? `${scope} projects` : "Portfolio visibility with direct paths into execution."}
        description="Projects are the center of gravity for planning, work, knowledge, and collaboration. This surface keeps the portfolio legible without turning it into dashboard noise."
        metrics={[
          { label: "Active", value: "3", hint: "1 flagship build · 2 exploratory tracks" },
          { label: "On watch", value: "1", hint: "Needs a milestone decision" },
          { label: "Templates", value: "7", hint: "Reusable operating models ready" },
        ]}
      />

      <section id="portfolio" className="grid gap-4 lg:grid-cols-3">
        {ACTIVE_PROJECTS.map((project) => (
          <Link key={project.name} href={project.href} className="surface-panel block p-5 transition-colors hover:border-primary/60 hover:bg-surface">
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
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <PanelCard id="active-projects" title="Portfolio lanes" description="Group work by stage, owner, and operating risk.">
          <div className="grid gap-3 md:grid-cols-3">
            <ActionTile title="Foundation" description="Architecture and shell work nearing stability." />
            <ActionTile title="Pilot" description="Research and academic workflows being validated." />
            <ActionTile title="Discovery" description="Enterprise governance surface still gathering constraints." />
          </div>
        </PanelCard>

        <PanelCard id="project-kits" title="Project kits" description="Opinionated starting structures, not generic templates.">
          <div className="grid gap-3">
            <ActionTile title="Startup sprint OS" description="Fast-moving team template for product, engineering, and review cycles." />
            <ActionTile title="Research studio" description="Notes, evidence, advisor review, and milestone defense built in." />
            <ActionTile title="Enterprise rollout" description="Governance, stakeholder reporting, and cross-team approval layers." />
          </div>
        </PanelCard>
      </div>
    </div>
  );
}

export function WorkScreen({ scope }: { scope?: string }) {
  const tasks = [
    { title: "Ship shell architecture", status: "In progress", owner: "Ibukunoluwa", due: "Today" },
    { title: "Map workspace routes", status: "Review", owner: "AI architect", due: "Tomorrow" },
    { title: "Draft workload balancing logic", status: "Backlog", owner: "Ops design", due: "Next week" },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <ScreenHero
        eyebrow="Work"
        title={scope ? `${scope} work` : "One execution graph, many lenses."}
        description="List, board, timeline, calendar, and workload are different views of the same execution system. Filters, scope, and intent persist across every lens."
        metrics={[
          { label: "Due today", value: "6", hint: "2 blocked · 1 awaiting review" },
          { label: "Saved views", value: "4", hint: "By priority, by stream, by assignee" },
          { label: "AI suggestions", value: "3", hint: "Assignee, due-date, and backlog cues" },
        ]}
      />

      <PanelCard id="saved-views" title="View system" description="Switch lenses without switching products.">
        <div className="flex flex-wrap gap-3">
          {["List", "Board", "Timeline", "Calendar", "Workload", "Table"].map((view, index) => (
            <span key={view} className={`signal-pill ${index === 0 ? "signal-pill-brand" : "signal-pill-neutral"}`}>
              {view}
            </span>
          ))}
        </div>
      </PanelCard>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <PanelCard id="my-work" title="Current work view" description="Detailed wireframe for dense list execution with bulk action readiness.">
          <div className="grid gap-3">
            {tasks.map((task) => (
              <div key={task.title} className="surface-panel-muted grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_120px_120px_100px] md:items-center">
                <div>
                  <p className="font-medium text-text-primary">{task.title}</p>
                  <p className="mt-1 text-sm text-text-muted">Inline editing, due-date control, dependency visibility, and keyboard navigation all live in the same row model.</p>
                </div>
                <span className="signal-pill signal-pill-neutral justify-center text-xs text-text-muted">{task.status}</span>
                <span className="text-sm text-text-muted">{task.owner}</span>
                <span className="text-sm text-text-muted">{task.due}</span>
              </div>
            ))}
          </div>
        </PanelCard>

        <div className="space-y-6">
          <PanelCard id="timeline" title="Timeline & dependencies" description="Calendar-aware sequencing without becoming a separate app.">
            <MiniTimeline
              items={[
                "Milestone 1 · App shell foundation",
                "Milestone 2 · Detailed wireframe rollout",
                "Milestone 3 · High-fidelity design-system hardening",
              ]}
            />
          </PanelCard>

          <PanelCard id="workload" title="AI execution assist" description="Preview-first automation and planning support.">
            <AssistList
              items={[
                "Suggest the best assignee based on current load and previous work history.",
                "Detect tasks likely to slip based on clustered due dates and blocked dependencies.",
                "Preview a backlog reprioritization before changing any work in bulk.",
              ]}
            />
          </PanelCard>
        </div>
      </div>
    </div>
  );
}

export function KnowledgeScreen({ scope }: { scope?: string }) {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <ScreenHero
        eyebrow="Knowledge"
        title={scope ? `${scope} knowledge` : "Project memory that survives beyond chat and tasks."}
        description="Docs, decisions, research, files, and meeting notes live in one connected system so the why behind the work is always recoverable."
        metrics={[
          { label: "Key docs", value: "9", hint: "Briefs, roadmaps, and architectural rationale" },
          { label: "Decision records", value: "5", hint: "Each tied to alternatives and outcomes" },
          { label: "Research sets", value: "3", hint: "Competitive, user, and implementation evidence" },
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr_0.8fr]">
        <PanelCard id="docs" title="Library" description="Browse by document type, collection, or project scope.">
          <div className="grid gap-3">
            <ActionTile title="Docs" description="Specs, plans, one-pagers, and briefs with direct links to execution." />
            <ActionTile title="Decisions" description="Rationale, status, alternatives, and linked artifacts." />
            <ActionTile id="research" title="Research" description="Evidence, citations, summaries, and knowledge extraction." />
            <ActionTile id="collections" title="Collections" description="Curated spaces for references, files, and topic clusters." />
          </div>
        </PanelCard>

        <PanelCard id="decisions" title="Knowledge artifacts" description="High-fidelity content panels with strong hierarchy and linked context.">
          <div className="space-y-3">
            {KNOWLEDGE_DOCS.map((doc) => (
              <div key={doc.title} className="surface-panel-muted p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-text-primary">{doc.title}</p>
                  <span className="signal-pill signal-pill-neutral text-xs text-text-muted">{doc.kind}</span>
                </div>
                <p className="mt-2 text-sm text-text-muted">{doc.summary}</p>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard title="AI knowledge assist" description="Citations and synthesis before generation.">
          <AssistList
            items={[
              "Summarize the latest research collection with explicit evidence links.",
              "Extract action items from the last three meeting notes and route them into Work.",
              "Answer a project question using only cited artifacts from this knowledge scope.",
            ]}
          />
        </PanelCard>
      </div>
    </div>
  );
}

export function ProjectCockpitScreen({ workspaceSlug, projectSlug }: { workspaceSlug: string; projectSlug: string }) {
  const projectName = prettyLabel(projectSlug);
  const workspaceName = prettyLabel(workspaceSlug);

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <ScreenHero
        eyebrow={`${workspaceName} workspace`}
        title={projectName}
        description="The project cockpit is the operating center of gravity: health, milestone status, blockers, active work, key docs, decisions, and AI synthesis aligned in one command bridge."
        metrics={[
          { label: "Health", value: "On watch", hint: "1 blocker · 2 decisions pending" },
          { label: "Milestone", value: "Phase 3", hint: "Wireframes and premium UI refinement" },
          { label: "Team load", value: "Balanced", hint: "No contributor over safe capacity" },
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr_0.8fr]">
        <PanelCard title="Current milestone" description="The immediate outcome the project is organizing around.">
          <div className="surface-panel-muted p-5">
            <div className="flex items-center gap-2 text-sm text-primary">
              <Target className="h-4 w-4" aria-hidden />
              Phase 3 · detailed wireframes and visual-system pass
            </div>
            <p className="mt-3 text-text-muted">
              Convert the structural architecture into high-confidence screen blueprints and premium UI foundations so future data integration lands on a stable interaction model.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <SignalTile title="Work in motion" value="Shell polish, dense wireframes, refined surfaces" icon={KanbanSquare} />
              <SignalTile title="Key dependency" value="Approve the premium visual tokens before scaling every view" icon={Waypoints} />
            </div>
          </div>
        </PanelCard>

        <PanelCard title="Top blockers" description="What could slow or fragment the next phase.">
          <AssistList
            items={[
              "Interaction density needs careful testing so enterprise richness does not become clutter.",
              "Knowledge architecture still needs final decision-record metadata before deep database integration.",
              "AI assist patterns need explicit approval policy before any consequential automation is shipped.",
            ]}
          />
        </PanelCard>

        <PanelCard title="AI project brief" description="Ambient intelligence with visible, inspectable evidence.">
          <AssistList
            items={[
              "The project is strongest when the cockpit stays the default landing surface for every project type.",
              "The unified command surface remains ForgeHub’s clearest differentiator versus fragmented productivity stacks.",
              "Next best move after this pass: bind the core surfaces to live data and search state.",
            ]}
          />
        </PanelCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <PanelCard title="Recent decisions" description="Durable context instead of losing rationale in chat history.">
          <div className="space-y-3">
            {[
              ["Project cockpit becomes the default project landing surface", "Accepted"],
              ["Command, search, and AI merge into one command surface", "Accepted"],
              ["Work and knowledge remain lenses on the same system, not separate products", "Accepted"],
            ].map(([title, status]) => (
              <div key={title} className="surface-panel-muted flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-medium text-text-primary">{title}</p>
                  <p className="mt-1 text-sm text-text-muted">Captured with rationale, alternatives, and implementation implications.</p>
                </div>
                <span className="signal-pill signal-pill-neutral text-xs text-text-muted">{status}</span>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard title="Key artifacts" description="The docs and knowledge objects currently shaping execution.">
          <div className="space-y-3">
            {KNOWLEDGE_DOCS.map((doc) => (
              <div key={doc.title} className="surface-panel-muted p-4">
                <p className="font-medium text-text-primary">{doc.title}</p>
                <p className="mt-1 text-sm text-text-muted">{doc.summary}</p>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>
    </div>
  );
}

export function ProjectPlanScreen({ projectSlug }: { projectSlug: string }) {
  return (
    <ProjectSectionFrame
      title="Plan"
      description={`Roadmap structure for ${prettyLabel(projectSlug)} across phases, milestones, dependencies, and sequencing logic.`}
      cards={[
        { title: "Roadmap phases", detail: "Foundation → Core screens → Detailed wireframes → High fidelity → Data integration hardening", icon: Flag },
        { title: "Dependency map", detail: "Interaction rules and shell decisions continue to stay ahead of implementation specifics.", icon: Waypoints },
        { title: "Milestone framing", detail: "Every phase should end in an artifact the engineering team can implement directly.", icon: Target },
      ]}
    />
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
  return (
    <ProjectSectionFrame
      title="Review"
      description={`Approvals, QA checkpoints, and signoff workflows for ${prettyLabel(projectSlug)}.`}
      cards={[
        { title: "Approval queues", detail: "Review artifacts without leaving project context or losing return state.", icon: ShieldCheck },
        { title: "Checklist validation", detail: "Track what must be true before a milestone can be considered done.", icon: CheckCircle2 },
        { title: "Feedback loops", detail: "Route comments into decisions, tasks, or follow-up threads with one action.", icon: MessageSquareMore },
      ]}
    />
  );
}

export function ProjectInsightsScreen({ projectSlug }: { projectSlug: string }) {
  return (
    <ProjectSectionFrame
      title="Insights"
      description={`Health, workload, and delivery confidence for ${prettyLabel(projectSlug)} — useful signals rather than vanity metrics.`}
      cards={[
        { title: "Risk heatmap", detail: "Highlight schedule, scope, and decision risk with a plain-language summary.", icon: Scale },
        { title: "Workload signals", detail: "See who is over capacity and where rebalancing can help delivery.", icon: Users },
        { title: "Delivery confidence", detail: "Connect milestone readiness to blockers, dependencies, and recent change velocity.", icon: CalendarClock },
      ]}
    />
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
        <Link href="/w/forgehub/p/forgehub-redesign/overview" className={buttonVariants("secondary")}>
          Open flagship project
        </Link>
        <Link href="/knowledge#decisions" className={buttonVariants("primary")}>
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
      ? "border-error/30 bg-error/10"
      : tone === "warning"
        ? "border-warning/30 bg-warning/10"
        : "border-border bg-bg";

  return (
    <div className={`rounded-[22px] border p-4 ${toneClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-text-primary">{title}</p>
          <p className="mt-1 text-sm text-text-muted">{meta}</p>
        </div>
        <ListTodo className="h-4 w-4 shrink-0 text-text-muted" aria-hidden />
      </div>
    </div>
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
    <div className={`rounded-3xl border px-4 py-3 ${inverted ? "border-white/12 bg-white/6" : "border-border bg-bg"}`}>
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
}: {
  title: string;
  description: string;
  id?: string;
}) {
  return (
    <div id={id} className="surface-panel-muted p-4">
      <p className="font-medium text-text-primary">{title}</p>
      <p className="mt-1 text-sm text-text-muted">{description}</p>
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
        <div key={item} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
            {index < items.length - 1 ? <div className="mt-2 h-full w-px bg-border" /> : null}
          </div>
          <div className="surface-panel-muted flex-1 p-4 text-sm text-text-muted">{item}</div>
        </div>
      ))}
    </div>
  );
}
