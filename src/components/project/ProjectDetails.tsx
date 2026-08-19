import { CATEGORIES } from "@/components/landing/data";
import { getProjectStatus, getTeamSizeBucket } from "@/components/explore/filters";
import type { PublicProject } from "./data";

const TEAM_SIZE_LABELS: Record<string, string> = {
  solo: "Solo",
  small: "2–4 people",
  large: "5+ people",
};

export function ProjectDetails({ project }: { project: PublicProject }) {
  const category = CATEGORIES.find((c) => c.slug === project.category);
  const status = getProjectStatus(project.progress);

  const rows: { label: string; value: string }[] = [
    { label: "Category", value: category?.label ?? project.category },
    { label: "Project stage", value: status.label },
    {
      label: "Started",
      value: new Date(project.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    },
    {
      label: "Estimated completion",
      value: project.estimatedCompletion
        ? new Date(project.estimatedCompletion).toLocaleDateString("en-US", { year: "numeric", month: "long" })
        : "Not set",
    },
    { label: "Team size", value: `${project.teamSize} (${TEAM_SIZE_LABELS[getTeamSizeBucket(project.teamSize)]})` },
    { label: "License", value: "Not yet available" },
    { label: "Repository", value: "Not yet available" },
  ];

  return (
    <section className="border-b border-border py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-text-primary">Project details</h2>
        <dl className="mt-6 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between border-b border-border py-3">
              <dt className="text-sm text-text-muted">{row.label}</dt>
              <dd className="text-sm font-medium text-text-primary">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
