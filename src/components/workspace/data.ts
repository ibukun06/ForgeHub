import type { LucideIcon } from "lucide-react";
import { BookOpen, FileText, Flag, History, Users } from "lucide-react";

export type WorkspaceActivity = { id: string; icon: LucideIcon; title: string; detail: string; time: string };
export type WorkspaceDocument = { id: string; title: string; status: "reviewed" | "in_progress" | "not_started"; owner: string; updated: string };
export type WorkspaceMilestone = { id: string; title: string; date: string; status: "active" | "upcoming"; detail: string };
export type WorkspaceMember = { id: string; initials: string; name: string; role: string; tone: string };

export type WorkspaceOverviewData = {
  project: { objective: string; phase: string; category: string; tags: string[] };
  stats: { completeness: number; activeMilestone: string; completedTasks: string; recentUpdates: string };
  activity: WorkspaceActivity[];
  documents: WorkspaceDocument[];
  milestones: WorkspaceMilestone[];
  team: WorkspaceMember[];
};

export const WORKSPACE_OVERVIEW: WorkspaceOverviewData = {
  project: {
    objective: "Map rough terrain safely with a low-cost rover that keeps working when GPS drops out.",
    phase: "Testing",
    category: "Robotics & Mechatronics",
    tags: ["ROS 2", "Computer vision", "Embedded systems"],
  },
  stats: { completeness: 68, activeMilestone: "Field navigation tests", completedTasks: "12 / 18", recentUpdates: "4 this week" },
  activity: [
    { id: "a1", icon: History, title: "Testing plan updated", detail: "Amara added the terrain test conditions", time: "2h ago" },
    { id: "a2", icon: FileText, title: "Decision logged", detail: "Switched localization approach to visual odometry", time: "Yesterday" },
    { id: "a3", icon: Users, title: "Team review completed", detail: "Problem Statement was marked reviewed", time: "2 days ago" },
  ],
  documents: [
    { id: "d1", title: "Problem Statement", status: "reviewed", owner: "Amara M.", updated: "Jul 29" },
    { id: "d2", title: "Requirements", status: "reviewed", owner: "Tobi K.", updated: "Jul 28" },
    { id: "d3", title: "Architecture / Design", status: "in_progress", owner: "Amara M.", updated: "Jul 30" },
    { id: "d4", title: "Testing Plan", status: "in_progress", owner: "David O.", updated: "Jul 31" },
  ],
  milestones: [
    { id: "m1", title: "Field navigation tests", date: "Aug 08", status: "active", detail: "Validate recovery when GPS is unavailable" },
    { id: "m2", title: "Prototype review", date: "Aug 15", status: "upcoming", detail: "Review evidence with the project advisor" },
  ],
  team: [
    { id: "u1", initials: "AM", name: "Amara Mensah", role: "Team lead", tone: "bg-[#8a5a3c]" },
    { id: "u2", initials: "TK", name: "Tobi K.", role: "Contributor", tone: "bg-[#536d8c]" },
    { id: "u3", initials: "DO", name: "David O.", role: "Contributor", tone: "bg-[#566d56]" },
    { id: "u4", initials: "NS", name: "Nadia S.", role: "Advisor", tone: "bg-[#715b83]" },
  ],
};
