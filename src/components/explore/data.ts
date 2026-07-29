export type ExploreProject = {
  slug: string;
  name: string;
  description: string;
  category: string; // matches a slug in components/landing/data.ts CATEGORIES
  tags: string[];
  creator: string;
  institution: string;
  teamSize: number;
  contributors: number;
  progress: number; // 0-100, placeholder — see note below
  likes: number;
  views: number;
  featured: boolean;
  createdAt: string; // ISO date
};

/**
 * Placeholder dataset for the pre-launch Explore page.
 *
 * The first five entries mirror the sample projects shown on the landing
 * page (same name/category/tags) so the two pages don't contradict each
 * other. Swap this whole module for a Supabase query against `projects`
 * (visibility = 'published') once Publishing exists — filterAndSortProjects()
 * in filters.ts is written so that's a data-source change, not a rewrite.
 *
 * `progress` is stored directly here for convenience since there's no
 * real `sections` data to compute it from. In production this should be
 * computed server-side from sections.status (% team_reviewed), not stored
 * as a raw column — storing it directly here is a mock-data shortcut, not
 * a recommended schema change.
 */
export const MOCK_PROJECTS: ExploreProject[] = [
  {
    slug: "autonomous-trash-sorting-robot",
    name: "Autonomous Trash-Sorting Robot",
    description: "A vision-guided robotic arm that sorts recyclables from general waste on a moving belt.",
    category: "robotics",
    tags: ["Arduino", "Computer Vision", "CAD"],
    creator: "Amara O.",
    institution: "Lagos State University",
    teamSize: 4,
    contributors: 4,
    progress: 72,
    likes: 24,
    views: 340,
    featured: true,
    createdAt: "2026-05-02",
  },
  {
    slug: "low-cost-prosthetic-hand",
    name: "Low-Cost Prosthetic Hand",
    description: "A 3D-printed, servo-driven prosthetic hand designed for under $150 in parts.",
    category: "biomedical",
    tags: ["3D Printing", "Servo Control", "CAD"],
    creator: "Priya N.",
    institution: "IIT Bombay",
    teamSize: 3,
    contributors: 3,
    progress: 58,
    likes: 31,
    views: 512,
    featured: true,
    createdAt: "2026-04-18",
  },
  {
    slug: "campus-solar-micro-grid",
    name: "Campus Solar Micro-Grid",
    description: "A small-scale solar micro-grid feeding three campus buildings, with live power monitoring.",
    category: "renewable",
    tags: ["Solar", "Power Electronics", "Data Logging"],
    creator: "Daniel K.",
    institution: "University of Nairobi",
    teamSize: 5,
    contributors: 5,
    progress: 91,
    likes: 18,
    views: 289,
    featured: false,
    createdAt: "2026-03-27",
  },
  {
    slug: "portable-water-quality-sensor",
    name: "Portable Water Quality Sensor",
    description: "A handheld sensor rig for testing turbidity, pH, and conductivity in rural water sources.",
    category: "research",
    tags: ["Embedded Systems", "Sensors", "IoT"],
    creator: "Grace M.",
    institution: "Independent research pair",
    teamSize: 2,
    contributors: 2,
    progress: 45,
    likes: 9,
    views: 143,
    featured: false,
    createdAt: "2026-06-10",
  },
  {
    slug: "ai-circuit-fault-detector",
    name: "AI Circuit Fault Detector",
    description: "A model trained on thermal imaging to flag failing components on a PCB before they fail.",
    category: "ai-data",
    tags: ["Python", "ML", "PCB Design"],
    creator: "Tomás R.",
    institution: "Technical University of Munich",
    teamSize: 3,
    contributors: 3,
    progress: 63,
    likes: 15,
    views: 201,
    featured: false,
    createdAt: "2026-05-21",
  },
  {
    slug: "open-source-lab-inventory-tracker",
    name: "Open-Source Lab Inventory Tracker",
    description: "A barcode-based inventory system so shared lab equipment stops disappearing between semesters.",
    category: "software",
    tags: ["React", "Next.js", "Postgres"],
    creator: "Wei L.",
    institution: "National University of Singapore",
    teamSize: 2,
    contributors: 2,
    progress: 80,
    likes: 12,
    views: 176,
    featured: false,
    createdAt: "2026-06-01",
  },
  {
    slug: "lightweight-uav-wing-structure",
    name: "Lightweight UAV Wing Structure",
    description: "A carbon-fiber wing rib design cutting airframe weight by 18% over the previous prototype.",
    category: "aerospace",
    tags: ["SolidWorks", "Composites", "Aerodynamics"],
    creator: "Sofia B.",
    institution: "Politecnico di Torino",
    teamSize: 4,
    contributors: 4,
    progress: 55,
    likes: 21,
    views: 264,
    featured: true,
    createdAt: "2026-04-30",
  },
  {
    slug: "seismic-resilient-footbridge-model",
    name: "Seismic-Resilient Footbridge Model",
    description: "A scaled footbridge model testing base-isolation dampers under simulated seismic load.",
    category: "civil",
    tags: ["MATLAB", "Structural Analysis", "Scale Modeling"],
    creator: "Kenji T.",
    institution: "University of Tokyo",
    teamSize: 3,
    contributors: 3,
    progress: 38,
    likes: 7,
    views: 98,
    featured: false,
    createdAt: "2026-06-15",
  },
  {
    slug: "regenerative-braking-go-kart",
    name: "Regenerative Braking Go-Kart",
    description: "A student-built electric go-kart recovering braking energy back into the battery pack.",
    category: "mechanical",
    tags: ["Motor Control", "CAD", "Battery Management"],
    creator: "Liam F.",
    institution: "University of Michigan",
    teamSize: 6,
    contributors: 6,
    progress: 67,
    likes: 28,
    views: 355,
    featured: true,
    createdAt: "2026-05-11",
  },
  {
    slug: "campus-smart-irrigation-controller",
    name: "Campus Smart Irrigation Controller",
    description: "A soil-moisture-driven irrigation controller cutting campus landscaping water use by a third.",
    category: "electrical",
    tags: ["Arduino", "IoT", "Sensors"],
    creator: "Nadia H.",
    institution: "Cairo University",
    teamSize: 2,
    contributors: 2,
    progress: 49,
    likes: 11,
    views: 132,
    featured: false,
    createdAt: "2026-06-05",
  },
];

export type Builder = {
  username: string;
  name: string;
  title: string;
  institution: string;
  skills: string[];
  followers: number;
  projectCount: number;
};

/**
 * Same placeholder status as MOCK_PROJECTS above — "followers" in
 * particular has no backing feature yet (no follow/unfollow relationship
 * exists in the schema). Kept as a display-only number until that's a
 * real product decision, not implied as an already-working feature.
 */
export const MOCK_BUILDERS: Builder[] = [
  {
    username: "amara-o",
    name: "Amara O.",
    title: "Mechatronics Engineering student",
    institution: "Lagos State University",
    skills: ["CAD", "Computer Vision", "Arduino"],
    followers: 142,
    projectCount: 3,
  },
  {
    username: "priya-n",
    name: "Priya N.",
    title: "Biomedical design engineer",
    institution: "IIT Bombay",
    skills: ["3D Printing", "Prosthetics", "CAD"],
    followers: 98,
    projectCount: 2,
  },
  {
    username: "sofia-b",
    name: "Sofia B.",
    title: "Aerospace structures researcher",
    institution: "Politecnico di Torino",
    skills: ["Composites", "SolidWorks", "Aerodynamics"],
    followers: 76,
    projectCount: 4,
  },
  {
    username: "liam-f",
    name: "Liam F.",
    title: "Electric vehicle systems lead",
    institution: "University of Michigan",
    skills: ["Motor Control", "Battery Systems", "CAD"],
    followers: 210,
    projectCount: 5,
  },
];

export const TRENDING_TECHNOLOGIES = ["React", "Next.js", "Python", "Arduino", "ROS", "MATLAB", "TensorFlow", "SolidWorks"];
