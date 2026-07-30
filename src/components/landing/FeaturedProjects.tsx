import { SAMPLE_PROJECTS } from "./data";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjects() {
  return <section id="featured-projects" className="border-b border-border py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div className="max-w-2xl"><p className="font-mono text-xs uppercase tracking-[0.14em] text-secondary">Project field notes</p><h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">A better record of the messy middle.</h2><p className="mt-3 max-w-xl text-text-muted">These illustrative stories show the shape of a ForgeHub project. Published work will replace them as teams share their own records.</p></div><span className="font-mono text-xs text-text-muted">Illustrative projects / pre-launch</span></div><div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{SAMPLE_PROJECTS.slice(0, 3).map((project) => <ProjectCard key={project.name} project={project} />)}</div></div></section>;
}
