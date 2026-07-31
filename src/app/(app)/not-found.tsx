import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function AppNotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="surface-panel max-w-2xl p-8 text-center">
        <p className="eyebrow">ForgeHub route state</p>
        <h1 className="mt-3 font-heading text-3xl text-text-primary">That workspace or project view could not be found.</h1>
        <p className="mt-4 text-base text-text-muted">
          The route may no longer exist, you may not have access to it, or the current scope could not be resolved from the available project data.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/home" className={buttonVariants("primary")}>Open Home</Link>
          <Link href="/projects" className={buttonVariants("secondary")}>Browse Projects</Link>
        </div>
      </div>
    </div>
  );
}
