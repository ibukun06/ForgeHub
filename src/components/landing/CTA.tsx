import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 text-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
          Your next build deserves a real record.
        </h2>
        <p className="mt-4 text-text-muted">Forge it into reality — start with a single idea.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/signup" className={buttonVariants("primary", "px-6 py-3 text-base")}>
            Forge Your First Project
          </Link>
          <a href="#featured-projects" className={buttonVariants("secondary", "px-6 py-3 text-base")}>
            Explore Community Projects
          </a>
        </div>
      </div>
    </section>
  );
}
