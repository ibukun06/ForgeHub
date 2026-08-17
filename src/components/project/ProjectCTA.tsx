import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function ProjectCTA() {
  return (
    <section className="py-16 text-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
          Building something like this?
        </h2>
        <p className="mt-3 text-text-muted">Document it from day one, not the night before it&apos;s due.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/signup" className={buttonVariants({ variant: "primary", className: "px-6 py-3 text-base" })}>
            Create Your Own Project
          </Link>
          <Link href="/explore" className={buttonVariants({ variant: "secondary", className: "px-6 py-3 text-base" })}>
            Explore More Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
