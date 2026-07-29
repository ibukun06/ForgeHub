import Link from "next/link";
import { TRENDING_TECHNOLOGIES } from "./data";

export function TechnologyTags() {
  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">Trending technologies</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {TRENDING_TECHNOLOGIES.map((tech) => (
            <Link
              key={tech}
              href={`/explore?technology=${encodeURIComponent(tech)}`}
              className="rounded-full border border-border bg-surface px-4 py-2 font-mono text-sm text-text-primary transition-colors hover:border-primary"
            >
              {tech}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
