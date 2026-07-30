import { Check, X } from "lucide-react";

const WITHOUT = ["Scattered across WhatsApp, Drive, and a notebook","Files nobody else can open when context matters","No record of why a decision was made","An empty portfolio when it is time to apply"];
const WITH = ["One workspace, one source of truth","Guided documentation for every phase","A decisions log nobody has to reconstruct","A shareable case study when you are ready"];

export function WhyForgeHub() {
  return <section id="why-forgehub" className="border-b border-border py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-2xl"><p className="font-mono text-xs uppercase tracking-[0.14em] text-secondary">Why ForgeHub</p><h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">The problem is not your work ethic. It is where the work lives.</h2><p className="mt-4 leading-relaxed text-text-muted">Great technical work gets lost when the reasoning is scattered. ForgeHub gives the project one thread from problem statement to outcome.</p></div><div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2"><Comparison title="Without ForgeHub" items={WITHOUT} negative /><Comparison title="With ForgeHub" items={WITH} /></div></div></section>;
}

function Comparison({ title, items, negative = false }: { title: string; items: string[]; negative?: boolean }) { const Icon = negative ? X : Check; return <div className="bg-surface p-6 sm:p-8"><h3 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-text-muted">{title}</h3><ul className="mt-5 space-y-4">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-primary"><Icon className={negative ? "mt-0.5 h-4 w-4 shrink-0 text-error" : "mt-0.5 h-4 w-4 shrink-0 text-success"} aria-hidden /><span>{item}</span></li>)}</ul></div>; }
