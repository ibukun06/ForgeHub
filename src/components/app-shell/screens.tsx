import Link from "next/link";
import {
  ArrowRight,
  BellDot,
  Bot,
  CalendarClock,
  CheckCircle2,
  CircleEllipsis,
  Clock3,
  FileStack,
  Flag,
  FolderKanban,
  KanbanSquare,
  Layers3,
  LibraryBig,
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

const HOME_FOCUS = [
  { title: "Finalize Phase 2A wireframes", meta: "Due today · Design systems", tone: "urgent" },
  { title: "Review AI navigation guardrails", meta: "Pending approval · UX architecture", tone: "warning" },
  { title: "Refine project cockpit priorities", meta: "Blocked by stakeholder note", tone: "default" },
];

const ACTIVE_PROJECTS = [
  { name: "ForgeHub Redesign", stage: "Foundation", summary: "Phase 1–2A architecture, shell, and core screens", href: "/w/forgehub/p/forgehub-redesign/overview" },
  { name: "Student Research Workspace", stage: "Pilot", summary: "Academic-first operating model for thesis and advisor workflows", href: "/w/forgehub/p/student-research-workspace/overview" },
  { name: "Enterprise Governance Layer", stage: "Discovery", summary: "Permissions, reporting, and template policy systems", href: "/w/forgehub/p/enterprise-governance-layer/overview" },
];

const KNOWLEDGE_DOCS = [
  { title: "Project OS north star", kind: "Strategy doc", summary: "Defines the product thesis, positioning, and design philosophy." },
  { title: "Decision log — navigation model", kind: "Decision record", summary: "Captures the 4-layer navigation model and route structure." },
  { title: "Research synthesis — productivity tools", kind: "Research collection", summary: "Competitive insights from Linear, Notion, Slack, Figma, ClickUp, and Jira." },
];

export function HomeScreen({ scope }: { scope?: string }) {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <section id="ai-brief" className="rounded-[32px] border border-border bg-surface p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              AI daily brief
            </div>
            <h1 className="mt-4 font-heading text-3xl text-text-primary sm:text-4xl">Operate the day with one calm view.</h1>
            <p className="mt-3 max-w-2xl text-base text-text-muted">
              {scope ?? "Your personal command center"} brings together urgent work, live project signals, and AI guidance so you can act without hunting across multiple tools.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Actionable items" value="12" hint="6 due today · 2 awaiting review" />
            <MetricCard label="Projects in motion" value="3" hint="1 high-risk milestone to inspect" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr_0.9fr]">
        <SectionCard id="today-focus" title="Today focus" description="What matters most right now">
          <div className="space-y-3">
            {HOME_FOCUS.map((item) => (
              <FocusItem key={item.title} {...item} />
            ))}
          </div>
        </SectionCard>

        <SectionCard id="active-projects" title="Active projects" description="Resume the highest-value workstreams">
          <div className="space-y-3">
            {ACTIVE_PROJECTS.map((project) => (
              <Link key={project.name} href={project.href} className="block rounded-2xl border border-border bg-bg p-4 transition-colors hover:border-primary hover:bg-surface">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-text-primary">{project.name}</p>
                    <p className="mt-1 text-sm text-text-muted">{project.summary}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-text-muted" aria-hidden />
                </div>
                <p className="mt-3 inline-flex rounded-full border border-border px-2.5 py-1 text-xs text-text-muted">{project.stage}</p>
              </Link>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Quick capture" description="Create without breaking flow" id="quick-capture">
          <div className="space-y-3">
            {[
              ["New task", "Add work with priority, due date, and assignee defaults"],
              ["New doc", "Start a brief, decision log, or research note in context"],
              ["AI summary", "Turn recent changes into a standup or status update"],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-border bg-bg p-4">
                <p className="font-medium text-text-primary">{title}</p>
                <p className="mt-1 text-sm text-text-muted">{description}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export function InboxScreen() {
  const inboxItems = [
    { title: "Review the navigation blueprint", source: "ForgeHub Redesign · Approval", detail: "A structural IA review is waiting on your signoff.", state: "Action required" },
    { title: "New comment on AI guardrails", source: "Decision log · Mention", detail: "A collaborator flagged proactive AI behavior for review.", state: "Mention" },
    { title: "Milestone risk changed", source: "Project Cockpit · Update", detail: "One roadmap phase slipped from on-track to watchlist.", state: "Project update" },
    { title: "Research synthesis ready", source: "Knowledge Hub · Digest", detail: "The latest competitive insights were summarized with citations.", state: "AI digest" },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <PageIntro title="Inbox" description="Attention management for approvals, mentions, project changes, and AI digests." />
      <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)_320px]">
        <SectionCard id="action-required" title="Action required" description="Triaged by urgency, not chronology">
          <div className="space-y-3">
            {inboxItems.map((item, index) => (
              <div key={item.title} className={`rounded-2xl border p-4 ${index === 0 ? "border-primary bg-primary/8" : "border-border bg-bg"}`}>
                <p className="text-xs uppercase tracking-[0.14em] text-text-muted">{item.state}</p>
                <p className="mt-2 font-medium text-text-primary">{item.title}</p>
                <p className="mt-1 text-sm text-text-muted">{item.source}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Selected item" description="Open in context without leaving triage">
          <div className="rounded-3xl border border-border bg-bg p-5">
            <div className="flex items-center gap-2 text-sm text-primary">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              Approval request
            </div>
            <h2 className="mt-3 font-heading text-2xl text-text-primary">Review the navigation blueprint</h2>
            <p className="mt-3 text-text-muted">
              The IA and route structure are ready for a product decision. Approving this unlocks shell implementation, context rails, and project spine screens.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <SmallTile title="Source" value="ForgeHub Redesign / Decision log" icon={FileStack} />
              <SmallTile title="Recommended action" value="Approve with note on mobile scope" icon={BellDot} />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className={buttonVariants("primary")}>Approve direction</button>
              <button className={buttonVariants("secondary")}>Ask AI to summarize thread</button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="AI triage" description="Keep signals high and noise low">
          <div className="space-y-3">
            {[
              "Cluster 3 related updates into one review batch",
              "Mute non-actionable milestone nudges until tomorrow",
              "Convert the latest comment thread into a durable decision record",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-bg p-4 text-sm text-text-muted">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export function ProjectsScreen({ scope }: { scope?: string }) {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <PageIntro title={scope ? `${scope} projects` : "Projects"} description="Portfolio-level visibility with a direct path into project cockpits, templates, and risk review." />
      <section id="portfolio" className="grid gap-4 lg:grid-cols-3">
        {ACTIVE_PROJECTS.map((project) => (
          <Link key={project.name} href={project.href} className="rounded-[28px] border border-border bg-surface p-5 shadow-sm transition-colors hover:border-primary">
            <div className="flex items-center justify-between gap-4">
              <FolderKanban className="h-5 w-5 text-primary" aria-hidden />
              <span className="rounded-full border border-border px-2.5 py-1 text-xs text-text-muted">{project.stage}</span>
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
      <PageIntro title={scope ? `${scope} work` : "Work"} description="One execution graph with list, board, timeline, calendar, and workload lenses." />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["List", "Fast editing, grouping, and bulk actions"],
          ["Board", "Status movement and flow management"],
          ["Timeline", "Dependencies, sequencing, and milestone planning"],
        ].map(([title, detail]) => (
          <div key={title} className="rounded-3xl border border-border bg-surface p-5">
            <p className="text-sm font-medium text-text-primary">{title}</p>
            <p className="mt-2 text-sm text-text-muted">{detail}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <SectionCard id="my-work" title="Current work view" description="Inline editing, prioritization, and rapid triage">
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.title} className="grid gap-3 rounded-2xl border border-border bg-bg p-4 md:grid-cols-[minmax(0,1fr)_120px_120px_100px] md:items-center">
                <div>
                  <p className="font-medium text-text-primary">{task.title}</p>
                  <p className="mt-1 text-sm text-text-muted">Cross-view continuity keeps filters and scope stable when switching modes.</p>
                </div>
                <span className="rounded-full border border-border px-2.5 py-1 text-center text-xs text-text-muted">{task.status}</span>
                <span className="text-sm text-text-muted">{task.owner}</span>
                <span className="text-sm text-text-muted">{task.due}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="workload" title="AI execution assist" description="Priority, capacity, and risk support without silent mutations">
          <div className="space-y-3">
            {[
              "Suggest assignees based on load and recent work",
              "Detect tasks likely to slip based on due-date clustering",
              "Preview a backlog reprioritization before applying changes",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-bg p-4 text-sm text-text-muted">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export function KnowledgeScreen({ scope }: { scope?: string }) {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <PageIntro title={scope ? `${scope} knowledge` : "Knowledge"} description="Docs, decisions, research, files, and meeting notes — durable project memory rather than scattered fragments." />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr_0.8fr]">
        <SectionCard id="docs" title="Library" description="Browse by document type, collection, or project">
          <div className="space-y-3">
            {[
              ["Docs", "Product specs, plans, briefs"],
              ["Decisions", "Rationale, status, alternatives"],
              ["Research", "Evidence, citations, synthesis"],
              ["Meetings", "Recaps, transcript summaries, actions"],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-2xl border border-border bg-bg p-4">
                <p className="font-medium text-text-primary">{title}</p>
                <p className="mt-1 text-sm text-text-muted">{detail}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="decisions" title="Knowledge artifacts" description="Content-first surfaces with links back to work and conversation">
          <div className="space-y-3">
            {KNOWLEDGE_DOCS.map((doc) => (
              <div key={doc.title} className="rounded-2xl border border-border bg-bg p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-text-primary">{doc.title}</p>
                  <span className="rounded-full border border-border px-2.5 py-1 text-xs text-text-muted">{doc.kind}</span>
                </div>
                <p className="mt-2 text-sm text-text-muted">{doc.summary}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="AI knowledge assist" description="Citations and synthesis before generation">
          <div className="space-y-3">
            {[
              "Summarize the latest research collection with evidence links",
              "Extract action items from the last three meeting notes",
              "Answer product questions with document citations",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-bg p-4 text-sm text-text-muted">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export function ProjectCockpitScreen({ workspaceSlug, projectSlug }: { workspaceSlug: string; projectSlug: string }) {
  const projectName = prettyLabel(projectSlug);
  const workspaceName = prettyLabel(workspaceSlug);

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <section className="rounded-[32px] border border-border bg-surface p-6 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
              <FolderKanban className="h-3.5 w-3.5" aria-hidden />
              {workspaceName} workspace
            </div>
            <h1 className="mt-4 font-heading text-3xl text-text-primary sm:text-4xl">{projectName}</h1>
            <p className="mt-3 text-base text-text-muted">
              The project cockpit is the default operational view — health, blockers, work in motion, knowledge, and AI support in one coordinated command bridge.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Health" value="On watch" hint="1 blocker · 2 decisions pending" />
            <MetricCard label="Milestone" value="Phase 2A" hint="UI shell and core screens" />
            <MetricCard label="Team load" value="Balanced" hint="No contributor over capacity" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr_0.9fr]">
        <SectionCard title="Current milestone" description="What the project is trying to land now">
          <div className="rounded-3xl border border-border bg-bg p-5">
            <div className="flex items-center gap-2 text-sm text-primary">
              <Target className="h-4 w-4" aria-hidden />
              Phase 2A · core surface implementation
            </div>
            <p className="mt-3 text-text-muted">
              Translate the IA, navigation blueprint, and core surface architecture into a real Next.js shell that feels like a project operating system rather than a set of disconnected pages.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <SmallTile title="Work in motion" value="App shell, command surface, context rails" icon={KanbanSquare} />
              <SmallTile title="Key dependency" value="Approve visual language before Phase 2B wireframes" icon={Waypoints} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Top blockers" description="What could slow the project down">
          <div className="space-y-3">
            {[
              "Interaction model needs exact split-view rules before full desktop expansion",
              "Knowledge architecture needs decision-record metadata locked before scaling",
              "AI assist patterns need clear approval thresholds for consequential actions",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-bg p-4 text-sm text-text-muted">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="AI project brief" description="Ambient intelligence with visible evidence">
          <div className="space-y-3">
            {[
              "Project health is stable, but navigation decisions should be finalized before wireframes branch into high fidelity.",
              "The strongest differentiator remains the project cockpit plus unified command/search/AI surface.",
              "Next recommended step: lock detailed wireframes for Home, Inbox, Cockpit, Work, and Knowledge.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-bg p-4 text-sm text-text-muted">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Recent decisions" description="Durable context instead of chat-only memory">
          <div className="space-y-3">
            {[
              ["Project cockpit becomes the default project landing surface", "Accepted"],
              ["Command, search, and AI merge into one command surface", "Accepted"],
              ["Work and knowledge remain lenses on the same system, not separate products", "Accepted"],
            ].map(([title, status]) => (
              <div key={title} className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-bg p-4">
                <div>
                  <p className="font-medium text-text-primary">{title}</p>
                  <p className="mt-1 text-sm text-text-muted">Captured with rationale, alternatives, and linked implementation notes.</p>
                </div>
                <span className="rounded-full border border-border px-2.5 py-1 text-xs text-text-muted">{status}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Key artifacts" description="The documents and threads driving execution">
          <div className="space-y-3">
            {KNOWLEDGE_DOCS.map((doc) => (
              <div key={doc.title} className="rounded-2xl border border-border bg-bg p-4">
                <p className="font-medium text-text-primary">{doc.title}</p>
                <p className="mt-1 text-sm text-text-muted">{doc.summary}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export function ProjectPlanScreen({ projectSlug }: { projectSlug: string }) {
  return (
    <ProjectSectionFrame
      title="Plan"
      description={`Roadmap structure for ${prettyLabel(projectSlug)} across phases, milestones, and dependencies.`}
      cards={[
        { title: "Roadmap phases", detail: "Foundation → Core screens → Wireframes → High fidelity → Implementation hardening", icon: Flag },
        { title: "Dependency map", detail: "Interaction rules and shell decisions should stay ahead of UI polish work.", icon: Waypoints },
        { title: "Milestone framing", detail: "Each phase should end with an artifact engineering can build from directly.", icon: Target },
      ]}
    />
  );
}

export function ProjectConversationScreen({ projectSlug }: { projectSlug: string }) {
  return (
    <ProjectSectionFrame
      title="Conversation"
      description={`Work-native discussions for ${prettyLabel(projectSlug)} with task, doc, and decision conversion built in.`}
      cards={[
        { title: "Project channels", detail: "Fast async collaboration with links back to tasks, docs, and milestones.", icon: MessageSquareMore },
        { title: "Decision capture", detail: "Promote important threads into durable records instead of letting them disappear.", icon: CircleEllipsis },
        { title: "AI thread summaries", detail: "Summarize long discussions without hiding the original comments.", icon: Bot },
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
      description={`Health, workload, and delivery confidence for ${prettyLabel(projectSlug)} — useful signals rather than vanity charts.`}
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
          "Structured, intentional navigation over feature sprawl",
          "AI assistance that explains itself and stays reversible",
          "Cross-object workflows where work, knowledge, and conversation stay connected",
        ].map((item) => (
          <div key={item} className="rounded-3xl border border-border bg-surface p-5 text-sm text-text-muted shadow-sm">
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
  cards: Array<{ title: string; detail: string; icon: typeof Flag }>;
}) {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <PageIntro title={title} description={description} />
      <div className="grid gap-4 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rounded-[28px] border border-border bg-surface p-5 shadow-sm">
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

function PageIntro({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">ForgeHub core surface</p>
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

function SectionCard({
  title,
  description,
  children,
  id,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="rounded-[28px] border border-border bg-surface p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="font-heading text-2xl text-text-primary">{title}</h2>
        <p className="mt-1 text-sm text-text-muted">{description}</p>
      </div>
      {children}
    </section>
  );
}

function FocusItem({ title, meta, tone }: { title: string; meta: string; tone: string }) {
  const toneClass = tone === "urgent" ? "border-error/30 bg-error/10" : tone === "warning" ? "border-warning/30 bg-warning/10" : "border-border bg-bg";
  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
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

function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-3xl border border-border bg-bg px-4 py-3">
      <p className="text-xs uppercase tracking-[0.16em] text-text-muted">{label}</p>
      <p className="mt-2 font-heading text-2xl text-text-primary">{value}</p>
      <p className="mt-1 text-sm text-text-muted">{hint}</p>
    </div>
  );
}

function SmallTile({ title, value, icon: Icon }: { title: string; value: string; icon: typeof Flag }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center gap-2 text-sm text-primary">
        <Icon className="h-4 w-4" aria-hidden />
        {title}
      </div>
      <p className="mt-2 text-sm text-text-muted">{value}</p>
    </div>
  );
}
