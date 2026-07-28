import { SAMPLE_PROJECTS } from "./data";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjects() {
  return (
    <section id="featured-projects" className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">Featured projects</h2>
        <p className="mt-2 max-w-xl text-text-muted">
          A preview of what a documented build looks like on ForgeHub. Real projects will replace
          these once the first builders publish theirs.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_PROJECTS.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
