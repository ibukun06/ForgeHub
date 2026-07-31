"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, Flag, FolderOpen, LayoutDashboard, ListChecks, MessageSquare, Settings, Users, X } from "lucide-react";

const ITEMS = [
  { slug: "overview", label: "Overview", icon: LayoutDashboard, enabled: true },
  { slug: "docs", label: "Documentation", icon: BookOpen, enabled: true },
  { slug: "tasks", label: "Tasks", icon: ListChecks, enabled: false },
  { slug: "milestones", label: "Milestones", icon: Flag, enabled: false },
  { slug: "files", label: "Files", icon: FolderOpen, enabled: false },
  { slug: "team", label: "Team", icon: Users, enabled: false },
  { slug: "activity", label: "Activity", icon: MessageSquare, enabled: false },
  { slug: "analytics", label: "Analytics", icon: BarChart3, enabled: false },
  { slug: "settings", label: "Settings", icon: Settings, enabled: false },
];

export function WorkspaceSidebar({ projectId, open, onClose }: { projectId: string; open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const activeSlug = pathname.split("/").filter(Boolean).at(-1) ?? "overview";
  return <>
    {open && <button className="fixed inset-0 z-40 bg-black/40 lg:hidden" aria-label="Close workspace navigation" onClick={onClose} />}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-bg px-4 py-5 transition-transform duration-200 lg:static lg:z-auto lg:w-60 lg:translate-x-0 lg:rounded-lg lg:border ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="mb-7 flex items-center justify-between px-2"><span className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">Project studio</span><button className="rounded-md p-2 text-text-muted hover:bg-surface hover:text-text-primary lg:hidden" aria-label="Close navigation" onClick={onClose}><X className="h-4 w-4" /></button></div>
      <nav aria-label="Workspace modules" className="grid gap-1">
        {ITEMS.map(({ slug, label, icon: Icon, enabled }) => enabled ? <Link key={slug} href={`/project/${projectId}/${slug}`} onClick={onClose} aria-current={activeSlug === slug ? "page" : undefined} className={`flex min-h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors ${activeSlug === slug ? "bg-primary/10 font-medium text-primary" : "text-text-muted hover:bg-surface hover:text-text-primary"}`}><Icon className="h-4 w-4" aria-hidden />{label}</Link> : <span key={slug} className="group flex min-h-11 cursor-not-allowed items-center justify-between rounded-md px-3 text-sm text-text-muted/70"><span className="flex items-center gap-3"><Icon className="h-4 w-4" aria-hidden />{label}</span><span className="hidden rounded-full border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide group-hover:inline">Soon</span></span>)}
      </nav>
      <div className="mt-auto border-t border-border px-2 pt-4 text-xs leading-relaxed text-text-muted">The studio grows from the record. Documentation, collaboration, and AI will plug into this space.</div>
    </aside>
  </>;
}
