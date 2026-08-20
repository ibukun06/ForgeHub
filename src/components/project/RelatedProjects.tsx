import Link from "next/link";
import { ProjectCard } from "@/components/explore/ProjectCard";
import type { ExploreProject } from "@/components/explore/data";

export function RelatedProjects({ projects }: { projects: ExploreProject[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="border-b border-border py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-heading text-2xl font-bold text-text-primary">Related projects</h2>
          <Link href="/explore" className="text-sm text-primary hover:text-primary-hover">
            See all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
