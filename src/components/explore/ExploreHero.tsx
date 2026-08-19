import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { TRENDING_TECHNOLOGIES } from "./data";

export function ExploreHero({ children }: { children?: React.ReactNode }) {
  return (
    <section className="border-b border-border bg-gradient-to-b from-primary/10 to-transparent py-16 text-center">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Discover what builders are creating.
        </h1>
        <p className="mt-3 text-text-muted">
          Real engineering projects, documented as they happen — browse by category, technology,
          or see what&apos;s trending right now.
        </p>

        <div className="mt-8">{children}</div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-text-muted">Trending:</span>
          {TRENDING_TECHNOLOGIES.slice(0, 6).map((tech) => (
            <Link
              key={tech}
              href={`/explore?technology=${encodeURIComponent(tech)}`}
              className="rounded-full border border-border px-3 py-1 font-mono text-xs text-text-muted transition-colors hover:border-primary hover:text-text-primary"
            >
              {tech}
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/signup" className={buttonVariants({ variant: "primary" })}>
            Start Building
          </Link>
        </div>
      </div>
    </section>
  );
}
