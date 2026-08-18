"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="surface-panel max-w-2xl p-8 text-center">
        <p className="eyebrow">ForgeHub recovery state</p>
        <h1 className="mt-3 font-heading text-3xl text-text-primary">This surface hit an unexpected problem.</h1>
        <p className="mt-4 text-base text-text-muted">
          The shell is still intact, but this part of ForgeHub could not finish loading. You can retry immediately or move back to a stable surface.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className={buttonVariants({ variant: "primary" })}>Try again</button>
          <Link href="/home" className={buttonVariants({ variant: "secondary" })}>Go to Home</Link>
        </div>
        {error.digest ? <p className="mt-4 text-xs text-text-muted">Diagnostic: {error.digest}</p> : null}
      </div>
    </div>
  );
}
