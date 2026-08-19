import Link from "next/link";
import { Users } from "lucide-react";
import { CATEGORIES } from "@/components/landing/data";
import { getProjectStatus } from "./filters";
import { getProjectUrl } from "@/lib/urls";
import type { ExploreProject } from "./data";

export function ProjectCard({ project }: { project: ExploreProject }) {
  const category = CATEGORIES.find((c) => c.slug === project.category);
  const status = getProjectStatus(project.progress);

  return (
    <Link
      href={getProjectUrl(project.slug)}
      className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-primary"
    >
      <div className="flex h-32 items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        {category && <category.icon className="h-8 w-8 text-primary" aria-hidden />}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-border px-2 py-0.5 text-xs text-text-muted">{category?.label}</span>
          {project.featured && (
            <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-medium text-secondary">Featured</span>
          )}
        </div>

        <h3 className="mt-3 font-heading text-base font-semibold text-text-primary">{project.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-text-muted">{project.description}</p>
        <p className="mt-2 text-xs text-text-muted">
          {project.creator} · {project.institution}
        </p>

        <div className="mt-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-input-bg">
            <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
          </div>
          <span className="mt-1 block font-mono text-xs text-text-muted">{status.label}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-input-bg px-2 py-0.5 font-mono text-[11px] text-text-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" aria-hidden /> {project.contributors} contributors
          </span>
        </div>
      </div>
    </Link>
  );
}
