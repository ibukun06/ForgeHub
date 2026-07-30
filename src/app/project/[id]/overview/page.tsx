import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock3, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function ProjectOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: documents }, { count: memberCount }, { count: decisionCount }] = await Promise.all([
    supabase.from("documents").select("id, title, document_type, sections(id, status)").eq("project_id", id),
    supabase.from("project_members").select("id", { count: "exact", head: true }).eq("project_id", id),
    supabase.from("decisions").select("id", { count: "exact", head: true }).eq("project_id", id),
  ]);

  const sectionRows = (documents ?? []).flatMap((document) => Array.isArray(document.sections) ? document.sections : []);
  const reviewed = sectionRows.filter((section) => section.status === "team_reviewed").length;
  const completeness = sectionRows.length ? Math.round((reviewed / sectionRows.length) * 100) : 0;

  return <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
    <section>
      <div className="flex items-end justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-[0.12em] text-secondary">Project overview</p><h2 className="mt-2 text-2xl font-semibold text-text-primary">Make the next useful thing visible.</h2></div><Link href={`/project/${id}/docs`} className="hidden items-center gap-2 text-sm font-medium text-secondary hover:underline sm:inline-flex">Open documentation <ArrowRight className="h-4 w-4" aria-hidden /></Link></div>
      <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3"><Metric icon={BookOpen} label="Documents" value={documents?.length ?? 0} /><Metric icon={CheckCircle2} label="Completeness" value={`${completeness}%`} /><Metric icon={Users} label="Team members" value={memberCount ?? 0} /></div>
      <div className="mt-8 border-t border-border pt-6"><div className="flex items-center justify-between"><h3 className="font-heading text-lg font-semibold text-text-primary">Documentation set</h3><Link href={`/project/${id}/docs`} className="text-sm text-secondary hover:underline">View all</Link></div>{documents?.length ? <div className="mt-4 grid gap-3">{documents.map((document) => { const sections = Array.isArray(document.sections) ? document.sections : []; const complete = sections.filter((section) => section.status === "team_reviewed").length; return <Link key={document.id} href={`/project/${id}/docs?document=${document.id}`} className="flex items-center justify-between gap-4 border-b border-border py-4 transition-colors hover:bg-surface/50"><div><p className="font-medium text-text-primary">{document.title ?? document.document_type}</p><p className="mt-1 text-sm text-text-muted">{sections.length ? `${complete} of ${sections.length} sections reviewed` : "Ready for its first section"}</p></div><ArrowRight className="h-4 w-4 shrink-0 text-text-muted" aria-hidden /></Link>})}</div> : <div className="mt-4 rounded-lg border border-dashed border-border p-6"><p className="font-medium text-text-primary">Your document set is ready.</p><p className="mt-2 max-w-lg text-sm leading-relaxed text-text-muted">Start with the Problem Statement. Capture who has the problem, what exists already, and what needs to change.</p><Link href={`/project/${id}/docs`} className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white">Open the editor</Link></div>}</div>
    </section>
    <aside className="grid content-start gap-6"><div className="border-t border-border pt-5"><p className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">Next useful action</p><Link href={`/project/${id}/docs`} className="mt-3 block rounded-lg border border-secondary/40 bg-secondary/5 p-4 transition-colors hover:bg-secondary/10"><p className="font-medium text-text-primary">Write the problem statement</p><p className="mt-1 text-sm text-text-muted">Give the team a shared starting point.</p><ArrowRight className="mt-4 h-4 w-4 text-secondary" aria-hidden /></Link></div><div className="border-t border-border pt-5"><p className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">Project signals</p><div className="mt-3 grid gap-3 text-sm"><div className="flex items-center justify-between"><span className="flex items-center gap-2 text-text-muted"><Clock3 className="h-4 w-4" aria-hidden />Decisions logged</span><strong className="text-text-primary">{decisionCount ?? 0}</strong></div><div className="flex items-center justify-between"><span className="flex items-center gap-2 text-text-muted"><Users className="h-4 w-4" aria-hidden />Access</span><strong className="text-text-primary">Private</strong></div></div></div></aside>
  </div>;
}

function Metric({ icon: Icon, label, value }: { icon: typeof BookOpen; label: string; value: string | number }) { return <div className="bg-surface p-5"><Icon className="h-5 w-5 text-secondary" aria-hidden /><p className="mt-5 text-2xl font-semibold text-text-primary">{value}</p><p className="text-sm text-text-muted">{label}</p></div>; }
