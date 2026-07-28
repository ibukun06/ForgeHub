import { Bot, FileText, Users, GitCommit, ScrollText, Folder, Globe } from "lucide-react";

const FEATURES = [
  {
    icon: Bot,
    title: "AI Mentor",
    description:
      "Ask questions about your specific project — not generic advice — and get suggestions grounded in what you've actually built so far.",
  },
  {
    icon: FileText,
    title: "Guided Documentation",
    description:
      "A phase-based editor — Problem, Requirements, Research, Design, Calculations, Testing. No blank page.",
  },
  {
    icon: Users,
    title: "Real Team Roles",
    description:
      "Invite contributors and advisors with actual permissions — not just a shared folder everyone can wreck.",
  },
  {
    icon: GitCommit,
    title: "Milestone Timeline",
    description:
      "A chronological record of what happened and when, becoming your project's story without extra effort.",
  },
  {
    icon: ScrollText,
    title: "Decisions Log",
    description: "Capture the calls you made and why, so nobody re-litigates a decision three weeks later.",
  },
  {
    icon: Folder,
    title: "Files & CAD",
    description: "Sketches, datasheets, and CAD files attached to the project — not buried in a chat thread.",
  },
  {
    icon: Globe,
    title: "Public Showcase",
    description: "Publish select sections as a shareable case study — a link you can actually send a recruiter.",
  },
];

export function FeatureGrid() {
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-text-primary sm:text-3xl">
          Everything the build needs, nothing it doesn&apos;t
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-lg border border-border bg-surface p-6">
              <feature.icon className="h-6 w-6 text-secondary" aria-hidden />
              <h3 className="mt-4 font-heading text-lg font-semibold text-text-primary">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
