import type { PublicProject } from "./data";

export function ProjectOverview({ overview }: { overview: PublicProject["overview"] }) {
  return (
    <section className="border-b border-border py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-text-primary">The problem</h2>
        <p className="mt-3 leading-relaxed text-text-muted">{overview.problem}</p>

        <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">Why this project exists</h2>
        <p className="mt-3 leading-relaxed text-text-muted">{overview.purpose}</p>

        <h3 className="mt-8 font-heading text-lg font-semibold text-text-primary">Objectives</h3>
        <ul className="mt-3 space-y-2">
          {overview.objectives.map((obj) => (
            <li key={obj} className="flex gap-2 text-text-muted">
              <span className="shrink-0 text-secondary">→</span> {obj}
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-heading text-2xl font-bold text-text-primary">Impact so far</h2>
        <p className="mt-3 leading-relaxed text-text-muted">{overview.impact}</p>
      </div>
    </section>
  );
}
