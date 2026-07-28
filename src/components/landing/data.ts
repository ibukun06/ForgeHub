import type { LucideIcon } from "lucide-react";
import { Cog, Zap, Code2, Bot, BrainCircuit, Sun, Rocket, Building2, HeartPulse, FlaskConical } from "lucide-react";

export type Category = {
  slug: string;
  label: string;
  icon: LucideIcon;
};

// Scoped to the PRD's actual audience (engineering students, researchers,
// makers) rather than generic SaaS categories like Business/Education/Design.
export const CATEGORIES: Category[] = [
  { slug: "mechanical", label: "Mechanical", icon: Cog },
  { slug: "electrical", label: "Electrical & Electronics", icon: Zap },
  { slug: "software", label: "Software", icon: Code2 },
  { slug: "robotics", label: "Robotics & Mechatronics", icon: Bot },
  { slug: "ai-data", label: "AI & Data", icon: BrainCircuit },
  { slug: "renewable", label: "Renewable Energy", icon: Sun },
  { slug: "aerospace", label: "Aerospace", icon: Rocket },
  { slug: "civil", label: "Civil & Structural", icon: Building2 },
  { slug: "biomedical", label: "Biomedical", icon: HeartPulse },
  { slug: "research", label: "Research", icon: FlaskConical },
];

export type SampleProject = {
  name: string;
  category: string; // Category slug
  teamSize: number;
  progress: number;
  tags: string[];
  author: string;
  stars: number;
};

/**
 * Placeholder content for the pre-launch landing page. Swap for a real
 * query against `projects` (visibility = 'published') once the
 * Explore/Publishing milestone exists — the section that renders this
 * (FeaturedProjects.tsx) is written so that's a data-source swap, not a
 * rewrite. The page itself says these are illustrative, not real yet.
 */
export const SAMPLE_PROJECTS: SampleProject[] = [
  {
    name: "Autonomous Trash-Sorting Robot",
    category: "robotics",
    teamSize: 4,
    progress: 72,
    tags: ["Arduino", "Computer Vision", "CAD"],
    author: "Mechanical eng. team, final year",
    stars: 24,
  },
  {
    name: "Low-Cost Prosthetic Hand",
    category: "biomedical",
    teamSize: 3,
    progress: 58,
    tags: ["3D Printing", "Servo Control", "CAD"],
    author: "Biomedical design group",
    stars: 31,
  },
  {
    name: "Campus Solar Micro-Grid",
    category: "renewable",
    teamSize: 5,
    progress: 91,
    tags: ["Solar", "Power Electronics", "Data Logging"],
    author: "Renewable energy capstone",
    stars: 18,
  },
  {
    name: "Portable Water Quality Sensor",
    category: "research",
    teamSize: 2,
    progress: 45,
    tags: ["Embedded Systems", "Sensors", "IoT"],
    author: "Research pair",
    stars: 9,
  },
  {
    name: "AI Circuit Fault Detector",
    category: "ai-data",
    teamSize: 3,
    progress: 63,
    tags: ["Python", "ML", "PCB Design"],
    author: "Electrical eng. team",
    stars: 15,
  },
];
