import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function ExploreCTA() {
  return (
    <section className="py-20 text-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">Ready to build something incredible?</h2>
        <p className="mt-4 text-text-muted">Your project could be the next one featured here.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/signup" className={buttonVariants({ variant: "primary", className: "px-6 py-3 text-base" })}>
            Start Your First Project
          </Link>
          <Link href="/signup" className={buttonVariants({ variant: "secondary", className: "px-6 py-3 text-base" })}>
            Create an Account
          </Link>
        </div>
      </div>
    </section>
  );
}
