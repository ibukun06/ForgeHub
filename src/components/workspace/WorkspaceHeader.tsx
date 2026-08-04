"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export function WorkspaceHeader({
  projectId,
  project,
  onMenu,
}: {
  projectId: string;
  project: { name: string; project_type: string; visibility: string; updated_at: string };
  onMenu: () => void;
}) {
  const updated = new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(
    new Date(project.updated_at)
  );

  return (
    <header className="border-b border-border pb-4">
      <div className="mt-3 flex items-center justify-between text-xs text-text-muted">
        <span suppressHydrationWarning>Last updated {updated}</span>
        <span className="font-mono uppercase tracking-[0.1em]">Project studio / active</span>
        <button type="button" onClick={onMenu} aria-label="Open menu" className="lg:hidden">
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </header>
  );
}
