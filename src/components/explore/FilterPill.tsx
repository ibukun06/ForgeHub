import Link from "next/link";
import type { ReactNode } from "react";

export function FilterPill({ href, active, children }: { href: string; active?: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        active
          ? "border-primary bg-primary text-white"
          : "border-border text-text-muted hover:border-primary hover:text-text-primary"
      }`}
    >
      {children}
    </Link>
  );
}
