"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-error/10 text-error">
        <AlertTriangle className="h-8 w-8" aria-hidden />
      </div>
      <h1 className="mt-6 font-heading text-3xl text-text-primary">Something went wrong</h1>
      <p className="mt-2 max-w-md text-text-muted">
        We encountered an error loading this page. Our team has been notified.
      </p>
      <div className="mt-8 flex gap-4">
        <button onClick={() => reset()} className={buttonVariants({ variant: "primary" })}>
          Try again
        </button>
        <a href="/" className={buttonVariants({ variant: "outline" })}>
          Return home
        </a>
      </div>
    </div>
  );
}
