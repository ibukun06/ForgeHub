import Link from "next/link";
import { ArrowUpRight, Check, Activity, Network, ArchiveX, Cpu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { BrandLogo } from "@/components/ui/brand-logo";

const SIGNALS = [
  { icon: Network, label: "Living Project Maps" },
  { icon: ArchiveX, label: "First-Class Failure Logs" },
  { icon: Cpu, label: "AI Intelligence Layer" },
  { icon: Activity, label: "Version Evolution" },
];

export async function Hero() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <section className="relative overflow-hidden border-b border-border bg-bg">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8 lg:py-28">
        <div>
          <div className="mb-8">
            <BrandLogo size={40} />
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">The Operating System for Technical Creation</p>
          <h1 className="mt-4 max-w-2xl font-heading text-5xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
            A living map of an <span className="text-text-muted">idea</span> becoming <span className="text-primary">real.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-muted">
            ForgeHub is a new digital environment where technical ideas become research, designs, experiments, failures, and ultimately, proof of work. Don't just claim your skills—prove how you solve problems.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {user ? (
              <>
                <Link href="/dashboard" className={buttonVariants({ variant: "primary", className: "px-8 py-6 text-base rounded-none border border-primary shadow-[4px_4px_0px_0px_var(--color-primary)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_var(--color-primary)] transition-all" })}>Open ForgeHub <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden /></Link>
                <Link href="/dashboard" className={buttonVariants({ variant: "secondary", className: "px-8 py-6 text-base rounded-none border border-border" })}>Continue Building</Link>
              </>
            ) : (
              <>
                <Link href="/signup" className={buttonVariants({ variant: "primary", className: "px-8 py-6 text-base rounded-none border border-primary shadow-[4px_4px_0px_0px_var(--color-primary)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_var(--color-primary)] transition-all" })}>Start a project <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden /></Link>
                <Link href="/explore" className={buttonVariants({ variant: "secondary", className: "px-8 py-6 text-base rounded-none border border-border" })}>Explore technical work</Link>
              </>
            )}
          </div>
          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-4 text-xs font-mono text-text-muted uppercase tracking-wider">
            {SIGNALS.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </div>
        <ProjectMapPreview />
      </div>
    </section>
  );
}

function ProjectMapPreview() {
  return (
    <div className="relative mx-auto w-full max-w-2xl rounded-none border border-border bg-surface-muted p-4 shadow-2xl sm:p-8 font-mono">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="relative flex items-center justify-between border-b border-border pb-4 text-xs text-text-muted mb-8">
        <span className="uppercase tracking-[0.2em] text-primary">Project Map / Active State</span>
        <span className="border border-primary/30 bg-primary/10 px-2 py-1 text-primary">PROTOTYPE TESTING</span>
      </div>

      <div className="relative grid grid-cols-3 gap-4 text-center text-xs">
        {/* Connection Lines (Abstracted with borders) */}
        <div className="absolute top-[20px] left-[16%] right-[16%] h-[2px] bg-border z-0"></div>
        <div className="absolute top-[20px] left-[50%] w-[2px] h-[140px] bg-border z-0"></div>
        
        {/* Nodes */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-none border border-border bg-surface flex items-center justify-center">
            <Check className="h-4 w-4 text-text-muted" />
          </div>
          <span className="uppercase tracking-widest text-text-muted">Problem</span>
        </div>
        
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-none border border-primary bg-primary/10 flex items-center justify-center shadow-[0_0_15px_rgba(var(--color-primary),0.2)]">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <span className="uppercase tracking-widest text-primary">Prototype</span>
        </div>
        
        <div className="relative z-10 flex flex-col items-center gap-2 opacity-40">
          <div className="w-10 h-10 rounded-none border border-border bg-surface flex items-center justify-center">
            <span className="block w-2 h-2 rounded-full bg-border"></span>
          </div>
          <span className="uppercase tracking-widest text-text-muted">Result</span>
        </div>

        {/* Lower Branch (Failure/Iteration) */}
        <div className="col-start-2 relative z-10 flex flex-col items-center gap-2 mt-12">
          <div className="w-10 h-10 rounded-none border border-error border-dashed bg-error/5 flex items-center justify-center">
            <ArchiveX className="h-4 w-4 text-error" />
          </div>
          <span className="uppercase tracking-widest text-error">Vibration Fail</span>
        </div>
      </div>
      
      <div className="mt-12 border-t border-border pt-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-2">Latest AI Insight</p>
        <p className="text-sm text-text-primary border-l-2 border-primary pl-4">
          Frame resonance occurred at operating speed. Recommendation: Increase frame stiffness or review material specs before next version.
        </p>
      </div>
    </div>
  );
}
