import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const PHASES = ["Idea", "Design", "Build", "Publish"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <div>
          <p className="text-sm font-medium text-secondary">For engineering students, researchers &amp; makers</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Your project is scattered across five apps.
            <br className="hidden sm:block" /> Forge it into one story.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-muted">
            ForgeHub is the workspace for engineering students, researchers, and makers — plan,
            document, and build in one place, with an AI mentor that actually knows your project,
            and a portfolio page that proves you built it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className={buttonVariants("primary", "px-6 py-3 text-base")}>
              Start Forging
            </Link>
            <a href="#featured-projects" className={buttonVariants("secondary", "px-6 py-3 text-base")}>
              Explore Projects
            </a>
          </div>
        </div>

        <BuildThread />
      </div>
    </section>
  );
}

function BuildThread() {
  const positions = [40, 147, 253, 360];

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
      <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
        <line x1="40" y1="150" x2="360" y2="150" stroke="var(--color-border)" strokeWidth="2" />
        {positions.map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy="150"
            r={i === 3 ? 10 : 7}
            fill={i === 3 ? "var(--color-secondary)" : "var(--color-primary)"}
            className="thread-node"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </svg>
      <div className="mt-2 grid grid-cols-4 text-center">
        {PHASES.map((phase) => (
          <span key={phase} className="font-mono text-xs text-text-muted">
            {phase}
          </span>
        ))}
      </div>
      <style>{`
        .thread-node {
          animation: forge-pulse 2.4s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes forge-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
