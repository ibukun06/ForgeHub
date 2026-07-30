import { MOCK_PROJECTS, type ExploreProject } from "@/components/explore/data";
import { CATEGORIES } from "@/components/landing/data";

export type MemberRole = "team_lead" | "contributor" | "advisor";

export type TeamMember = {
  username: string;
  name: string;
  role: MemberRole;
  contribution: string;
};

export type Milestone = {
  title: string;
  date: string; // ISO
  completed: boolean;
};

export type ActivityEntry = {
  type: "milestone" | "documentation" | "contributor" | "release";
  description: string;
  date: string; // ISO
};

export type MediaItem = {
  type: "image" | "cad" | "diagram" | "video";
  caption: string;
};

// Matches the real `document_type` enum in 0001_init.sql, minus `custom`
// (a catch-all, not a fixed concept worth previewing).
export type DocSectionType = "problem_statement" | "requirements" | "architecture" | "testing_plan" | "decisions_log";
// Matches the real `section_status` enum.
export type SectionStatus = "not_started" | "ai_draft" | "team_reviewed";

export type DocPreview = {
  type: DocSectionType;
  status: SectionStatus;
  excerpt: string;
};

export const DOC_TYPE_LABELS: Record<DocSectionType, string> = {
  problem_statement: "Problem Statement",
  requirements: "Requirements",
  architecture: "Architecture & Design",
  testing_plan: "Testing Plan",
  decisions_log: "Decisions Log",
};

const DOC_TYPES: DocSectionType[] = ["problem_statement", "requirements", "architecture", "testing_plan", "decisions_log"];

export type ProjectDetail = {
  overview: {
    problem: string;
    purpose: string;
    objectives: string[];
    impact: string;
  };
  estimatedCompletion?: string; // ISO
  team: TeamMember[];
  milestones: Milestone[];
  activity: ActivityEntry[];
  media: MediaItem[];
  documentation: DocPreview[];
};

export type PublicProject = ExploreProject & ProjectDetail;

/**
 * Hand-authored detail for three flagship projects — real craft, not
 * generic filler. Everything else falls back to synthesizeProjectDetail()
 * below, so every slug in MOCK_PROJECTS resolves to a working page.
 */
const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "autonomous-trash-sorting-robot": {
    overview: {
      problem:
        "Campus recycling programs fail for a simple reason: sorting is tedious, and humans are inconsistent at it. A four-bin recycling station on Amara's campus was measured at 34% contamination — recyclables mixed with trash, trash mixed with recyclables — largely because students sort in a hurry, if they sort at all.",
      purpose:
        "Build a robotic arm that sorts waste automatically at the point of disposal, using a camera and a lightweight vision model trained on the waste stream this campus actually produces — food wrappers, plastic bottles, paper, aluminum cans — rather than a generic classifier.",
      objectives: [
        "Reach 90%+ sort accuracy on the campus's five most common waste categories",
        "Sort at a rate that keeps up with peak cafeteria traffic (roughly 40 items/minute)",
        "Run on hardware a facilities team can actually maintain, not a research rig",
      ],
      impact:
        "A working prototype has been running unattended in the main cafeteria for three weeks, cutting measured contamination from 34% to 11%. The next milestone is a second unit outside the library to test performance on a different waste mix.",
    },
    estimatedCompletion: "2026-09-01",
    team: [
      { username: "amara-o", name: "Amara O.", role: "team_lead", contribution: "Vision model, project lead" },
      { username: "chidi-e", name: "Chidi E.", role: "contributor", contribution: "Power electronics and gripper actuation" },
      { username: "funke-a", name: "Funke A.", role: "contributor", contribution: "Mechanical design and CAD" },
      { username: "dr-obi", name: "Dr. Obi", role: "advisor", contribution: "Faculty advisor, mechatronics department" },
    ],
    milestones: [
      { title: "Vision model reaches 80% lab accuracy", date: "2026-02-14", completed: true },
      { title: "First cafeteria deployment", date: "2026-04-02", completed: true },
      { title: "90% accuracy on live waste stream", date: "2026-05-20", completed: true },
      { title: "Second unit deployed at library", date: "2026-07-15", completed: false },
    ],
    activity: [
      { type: "milestone", description: "Hit 90% sort accuracy on live cafeteria waste, up from 80% in lab testing", date: "2026-05-20" },
      { type: "documentation", description: "Testing Plan updated with the full three-week contamination study", date: "2026-05-25" },
      { type: "contributor", description: "Chidi joined as the team's power electronics contributor", date: "2026-04-10" },
      { type: "release", description: "Gripper mechanism redesigned to handle wet packaging without dropping items", date: "2026-03-18" },
    ],
    media: [
      { type: "image", caption: "Sorting arm installed above the cafeteria conveyor" },
      { type: "cad", caption: "Gripper assembly, v3" },
      { type: "diagram", caption: "Vision pipeline: camera → classifier → arm controller" },
      { type: "video", caption: "30 seconds of live sorting at peak lunch traffic" },
    ],
    documentation: [
      { type: "problem_statement", status: "team_reviewed", excerpt: "Campus recycling contamination was measured at 34% across four bins over a two-week baseline period..." },
      { type: "requirements", status: "team_reviewed", excerpt: "The system must sort at ≥40 items/minute, handle wet and crushed packaging, and run on a Jetson-class board..." },
      { type: "architecture", status: "ai_draft", excerpt: "A three-stage pipeline: an overhead camera feeds a lightweight classifier, which drives a 4-DOF arm..." },
      { type: "testing_plan", status: "team_reviewed", excerpt: "Accuracy is measured weekly by manually auditing a random 100-item sample from the sorted output..." },
      { type: "decisions_log", status: "team_reviewed", excerpt: "Chose a pneumatic gripper over a suction cup after suction repeatedly failed on wet packaging..." },
    ],
  },

  "low-cost-prosthetic-hand": {
    overview: {
      problem:
        "A functional prosthetic hand costs $10,000–$50,000 in most markets — out of reach for the majority of people who need one. Priya's team set out to answer a narrower question: how much hand can $150 in parts actually buy?",
      purpose:
        "Design a 3D-printed, servo-driven prosthetic hand that a local prosthetics clinic can fit and adjust without specialized equipment, using parts available from ordinary hobbyist suppliers.",
      objectives: [
        "Keep total parts cost under $150",
        "Support grip, pinch, and point gestures reliably",
        "Make every part either 3D-printable or off-the-shelf — no custom machining",
      ],
      impact:
        "Two clinic patients have been fitted with working prototypes. The current focus is durability — the first hand needed a joint redesign after six weeks of daily use.",
    },
    estimatedCompletion: "2026-10-15",
    team: [
      { username: "priya-n", name: "Priya N.", role: "team_lead", contribution: "Mechanical design, project lead" },
      { username: "arjun-k", name: "Arjun K.", role: "contributor", contribution: "Servo control firmware" },
      { username: "dr-mehta", name: "Dr. Mehta", role: "advisor", contribution: "Clinical advisor, prosthetics fitting" },
    ],
    milestones: [
      { title: "First working grip prototype", date: "2025-11-10", completed: true },
      { title: "First clinic fitting", date: "2026-02-01", completed: true },
      { title: "Joint redesign after durability testing", date: "2026-04-15", completed: true },
      { title: "Second clinic fitting round", date: "2026-06-01", completed: false },
    ],
    activity: [
      { type: "milestone", description: "Completed joint redesign after six-week durability failure", date: "2026-04-15" },
      { type: "documentation", description: "Design notes updated with the new joint tolerances", date: "2026-04-20" },
      { type: "release", description: "Print files updated to PETG after PLA proved too brittle for daily use", date: "2026-03-02" },
    ],
    media: [
      { type: "cad", caption: "Finger joint assembly, redesigned v2" },
      { type: "image", caption: "First clinic fitting" },
      { type: "diagram", caption: "Servo-to-tendon cable routing" },
    ],
    documentation: [
      { type: "problem_statement", status: "team_reviewed", excerpt: "Commercial prosthetic hands are priced out of reach for most patients who need one..." },
      { type: "requirements", status: "team_reviewed", excerpt: "Total parts cost under $150; must be fittable without specialized clinic equipment..." },
      { type: "architecture", status: "team_reviewed", excerpt: "Five servo motors drive tendon cables routed through 3D-printed finger joints..." },
      { type: "testing_plan", status: "ai_draft", excerpt: "Durability tested via 500-cycle grip/release trials before any clinic fitting..." },
      { type: "decisions_log", status: "team_reviewed", excerpt: "Switched print material from PLA to PETG after the first joint failure at six weeks..." },
    ],
  },

  "campus-solar-micro-grid": {
    overview: {
      problem:
        "Three campus buildings lose power for hours during the region's frequent grid outages, with no real visibility into how much solar capacity would actually be needed to bridge the gap.",
      purpose:
        "Build and instrument a real, working micro-grid — not a simulation — feeding three buildings from a rooftop solar array, with live monitoring to answer the sizing question with data instead of estimates.",
      objectives: [
        "Cover baseline load for three buildings during a grid outage",
        "Log real production and consumption data for at least one full academic term",
        "Publish a sizing model other campuses can reuse",
      ],
      impact:
        "The array has covered every outage since installation, and a full term of consumption data is now informing a proposal to expand to two more buildings.",
    },
    estimatedCompletion: "2026-08-30",
    team: [
      { username: "daniel-k", name: "Daniel K.", role: "team_lead", contribution: "Power systems design, project lead" },
      { username: "esther-w", name: "Esther W.", role: "contributor", contribution: "Data logging and monitoring dashboard" },
      { username: "prof-mwangi", name: "Prof. Mwangi", role: "advisor", contribution: "Faculty advisor, energy systems" },
    ],
    milestones: [
      { title: "Array installed and grid-connected", date: "2025-09-20", completed: true },
      { title: "First outage successfully covered", date: "2025-11-03", completed: true },
      { title: "One full term of data logged", date: "2026-03-27", completed: true },
      { title: "Expansion proposal submitted", date: "2026-06-01", completed: false },
    ],
    activity: [
      { type: "milestone", description: "Completed a full academic term of production/consumption logging", date: "2026-03-27" },
      { type: "release", description: "Published the sizing model as an open dataset", date: "2026-04-05" },
      { type: "contributor", description: "Two new contributors joined for the expansion proposal", date: "2026-05-01" },
    ],
    media: [
      { type: "image", caption: "Rooftop array, south-facing installation" },
      { type: "diagram", caption: "Power routing across the three buildings" },
      { type: "image", caption: "Monitoring dashboard during a grid outage" },
    ],
    documentation: [
      { type: "problem_statement", status: "team_reviewed", excerpt: "Grid outages regularly leave three campus buildings without power for hours..." },
      { type: "requirements", status: "team_reviewed", excerpt: "Array must cover baseline load — lighting, networking, essential lab equipment..." },
      { type: "architecture", status: "team_reviewed", excerpt: "A 12kW rooftop array feeds a battery bank sized for four hours of baseline load..." },
      { type: "testing_plan", status: "team_reviewed", excerpt: "Validated against three real grid outages rather than simulated load testing..." },
      { type: "decisions_log", status: "team_reviewed", excerpt: "Chose lithium iron phosphate over lead-acid despite the higher upfront cost..." },
    ],
  },
};

/** Reasonable, grounded fallback content for any project without hand-authored detail. */
function synthesizeProjectDetail(base: ExploreProject): ProjectDetail {
  const category = CATEGORIES.find((c) => c.slug === base.category);
  const categoryLabel = category?.label ?? base.category;
  const firstName = base.creator.split(" ")[0];

  return {
    overview: {
      problem: base.description,
      purpose: `${base.creator} and the team at ${base.institution} are building this as a ${categoryLabel.toLowerCase()} project, currently ${base.progress}% of the way to a working result.`,
      objectives: [
        `Reach a working prototype in ${categoryLabel}`,
        "Document the build process as it happens, not after the fact",
        "Publish results the wider ForgeHub community can learn from",
      ],
      impact: `Still in progress — check back as ${firstName}'s team publishes more of the build.`,
    },
    team: Array.from({ length: Math.max(base.contributors, 1) }, (_, i) =>
      i === 0
        ? { username: `${base.slug}-lead`, name: base.creator, role: "team_lead" as const, contribution: "Project lead" }
        : {
            username: `${base.slug}-contributor-${i}`,
            name: `Contributor ${i}`,
            role: "contributor" as const,
            contribution: "Team member",
          }
    ),
    milestones: [
      { title: "Project started", date: base.createdAt, completed: true },
      { title: "Core build in progress", date: base.createdAt, completed: base.progress > 30 },
      { title: "First working prototype", date: base.createdAt, completed: base.progress >= 70 },
    ],
    activity: [{ type: "documentation", description: "Project documentation last updated", date: base.createdAt }],
    media: [{ type: "image", caption: `${base.name} — cover` }],
    documentation: DOC_TYPES.map((type) => ({
      type,
      status: "not_started" as SectionStatus,
      excerpt: "Not published yet — check back as the team documents this section.",
    })),
  };
}

export async function getProjectBySlug(slug: string): Promise<PublicProject | null> {
  const base = MOCK_PROJECTS.find((p) => p.slug === slug);
  if (!base) return null;
  const detail = PROJECT_DETAILS[slug] ?? synthesizeProjectDetail(base);
  return { ...base, ...detail };
}

export async function getRelatedProjects(project: ExploreProject, limit = 3): Promise<ExploreProject[]> {
  const sameCategory = MOCK_PROJECTS.filter((p) => p.slug !== project.slug && p.category === project.category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const sharedTag = MOCK_PROJECTS.filter(
    (p) => p.slug !== project.slug && !sameCategory.includes(p) && p.tags.some((t) => project.tags.includes(t))
  );

  return [...sameCategory, ...sharedTag].slice(0, limit);
}

export function getAllProjectSlugs(): string[] {
  return MOCK_PROJECTS.map((p) => p.slug);
}
