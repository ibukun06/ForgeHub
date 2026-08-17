import Link from "next/link";
import { ArrowUpRight, Check, FileText, Sparkles, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const SIGNALS = [
  { icon: FileText, label: "Guided docs" },
  { icon: Users, label: "Clear roles" },
  { icon: Sparkles, label: "AI drafts" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-28">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-secondary">The documentation workspace for technical teams</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-[0.96] tracking-[-0.055em] text-text-primary sm:text-6xl lg:text-7xl">Keep the work. Keep the <span className="text-secondary">why.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-muted">ForgeHub helps engineering students, researchers, and makers document the problem, decisions, evidence, and progress of a project while they build it.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/signup" className={buttonVariants({ variant: "primary", className: "px-6 py-3 text-base" })}>Start a project <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden /></Link><Link href="/explore" className={buttonVariants({ variant: "secondary", className: "px-6 py-3 text-base" })}>See project stories</Link></div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-text-muted">{SIGNALS.map(({ icon: Icon, label }) => <span key={label} className="flex items-center gap-2"><Icon className="h-4 w-4 text-secondary" aria-hidden />{label}</span>)}</div>
        </div>
        <BuildRecord />
      </div>
    </section>
  );
}

function BuildRecord() {
  return <div className="relative mx-auto w-full max-w-xl rounded-xl border border-border bg-surface p-4 shadow-2xl shadow-black/10 sm:p-6"><div className="flex items-center justify-between border-b border-border pb-4 text-xs text-text-muted"><span className="font-mono uppercase tracking-[0.12em]">Project record / 014</span><span className="rounded-full border border-success-border bg-success-bg px-2 py-1 text-success">Private</span></div><div className="grid gap-6 pt-6 sm:grid-cols-[150px_1fr]"><aside className="border-b border-border pb-5 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-5"><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">Workspace</p><nav className="mt-4 grid gap-1 text-sm text-text-muted" aria-label="Project preview navigation"><span className="rounded-md bg-primary/10 px-3 py-2 font-medium text-primary">Overview</span><span className="px-3 py-2">Documentation</span><span className="px-3 py-2">Decisions</span><span className="px-3 py-2">Team</span></nav></aside><div><p className="font-mono text-xs uppercase tracking-[0.12em] text-secondary">Active build</p><h2 className="mt-2 text-2xl font-bold text-text-primary">Autonomous field rover</h2><div className="mt-5 flex items-center justify-between text-xs text-text-muted"><span>Documentation completeness</span><strong className="text-text-primary">68%</strong></div><div className="mt-2 h-2 rounded-full bg-input-bg" role="progressbar" aria-label="Documentation completeness" aria-valuenow={68} aria-valuemin={0} aria-valuemax={100}><div className="h-2 w-[68%] rounded-full bg-secondary" /></div><div className="mt-6 grid gap-3"><PreviewRow title="Problem statement" status="Team reviewed" /><PreviewRow title="Testing plan" status="In progress" pending /><PreviewRow title="Decision log" status="3 entries" /></div></div></div></div>;
}

function PreviewRow({ title, status, pending = false }: { title: string; status: string; pending?: boolean }) { return <div className="flex items-center justify-between border-t border-border pt-3 text-sm"><span className="text-text-primary">{title}</span><span className={pending ? "text-warning" : "flex items-center gap-1 text-success"}>{!pending && <Check className="h-3.5 w-3.5" aria-hidden />}{status}</span></div>; }
