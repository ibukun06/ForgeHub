import type { ExploreProject } from "./data";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: ExploreProject[] }) {
  if (projects.length === 0) {
    return (
      <div id="results" className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-text-muted">No projects match those filters yet.</p>
        <a href="/explore" className="mt-2 inline-block text-sm text-primary hover:text-primary-hover">
          Clear all filters
        </a>
      </div>
    );
  }

  return (
    <div id="results" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="mb-6 text-sm text-text-muted">
        {projects.length} project{projects.length === 1 ? "" : "s"}
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
