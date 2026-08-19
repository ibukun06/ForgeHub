import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export async function CTA() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <section className="py-24 text-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
          Your next build deserves a real record.
        </h2>
        <p className="mt-4 text-text-muted">Forge it into reality — start with a single idea.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard" className={buttonVariants({ variant: "primary", className: "px-6 py-3 text-base" })}>
                Open ForgeHub
              </Link>
              <Link href="/dashboard" className={buttonVariants({ variant: "secondary", className: "px-6 py-3 text-base" })}>
                My Projects
              </Link>
            </>
          ) : (
            <>
              <Link href="/signup" className={buttonVariants({ variant: "primary", className: "px-6 py-3 text-base" })}>
                Forge Your First Project
              </Link>
              <Link href="/explore" className={buttonVariants({ variant: "secondary", className: "px-6 py-3 text-base" })}>
                Explore Community Projects
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
