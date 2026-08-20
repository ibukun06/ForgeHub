"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, Clock, Flag, LayoutList, Target, Waypoints } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonVariants } from "@/components/ui/button";
import type { PlanScreenData } from "@/lib/app-shell-data";
import { prettyLabel } from "@/components/app-shell/shell-config";

export function PlanView({ 
  workspaceSlug, 
  projectSlug, 
  data 
}: { 
  workspaceSlug: string; 
  projectSlug: string; 
  data: PlanScreenData;
}) {
  const { milestones } = data;

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow text-secondary">{prettyLabel(projectSlug)} · Plan</p>
          <h1 className="mt-3 font-heading text-3xl text-text-primary sm:text-4xl">Roadmap & Milestones</h1>
          <p className="mt-4 text-base text-text-muted">
            The execution plan structured around deliverables. Documents act as milestones, and sections represent the work required to complete them.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="surface-panel p-5">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/8 text-primary">
            <Flag className="h-5 w-5" aria-hidden />
          </div>
          <h2 className="mt-4 font-heading text-2xl text-text-primary">Milestone completion</h2>
          <p className="mt-2 text-sm text-text-muted">{milestones.filter(m => m.status === "Completed").length} of {milestones.length} milestones complete.</p>
        </div>
        <div className="surface-panel p-5">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/8 text-primary">
            <Waypoints className="h-5 w-5" aria-hidden />
          </div>
          <h2 className="mt-4 font-heading text-2xl text-text-primary">Dependencies</h2>
          <p className="mt-2 text-sm text-text-muted">Sequential dependencies are implied by document order.</p>
        </div>
        <div className="surface-panel p-5">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/8 text-primary">
            <Target className="h-5 w-5" aria-hidden />
          </div>
          <h2 className="mt-4 font-heading text-2xl text-text-primary">Active focus</h2>
          <p className="mt-2 text-sm text-text-muted">Deliver the next incomplete milestone to unlock subsequent phases.</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-heading text-2xl text-text-primary mb-6">Roadmap</h2>
        
        {milestones.length === 0 ? (
          <EmptyState 
            icon={LayoutList} 
            title="No milestones yet" 
            description="Create your first document to establish the first milestone on your roadmap."
          >
            <Link href={`/w/${workspaceSlug}/p/${projectSlug}/knowledge`} className={buttonVariants({ variant: "primary" })}>
              Go to Knowledge hub
            </Link>
          </EmptyState>
        ) : (
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-bg bg-surface-muted text-secondary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {milestone.status === "Completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : milestone.status === "In progress" ? (
                    <Clock className="w-5 h-5 text-primary" />
                  ) : (
                    <Circle className="w-5 h-5 text-text-muted" />
                  )}
                </div>

                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] surface-panel p-5 transition-all hover:border-primary/50 hover:shadow-md">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className={`signal-pill text-xs ${milestone.status === "Completed" ? "signal-pill-brand" : "signal-pill-neutral"}`}>
                      {milestone.status}
                    </span>
                    <span className="text-xs text-text-muted font-mono">Phase {index + 1}</span>
                  </div>
                  <h3 className="font-heading text-xl font-medium text-text-primary">{milestone.title}</h3>
                  
                  <div className="mt-4 space-y-2">
                    {milestone.sections.length === 0 ? (
                      <p className="text-sm text-text-muted italic">No tasks defined for this milestone.</p>
                    ) : (
                      milestone.sections.map((section) => (
                        <div key={section.id} className="flex items-start gap-2 text-sm">
                          {section.status === "Reviewed" ? (
                            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-text-muted mt-0.5 shrink-0" />
                          )}
                          <span className={section.status === "Reviewed" ? "text-text-muted line-through" : "text-text-primary"}>
                            {section.prompt}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-border flex justify-end">
                    <Link href={`/w/${workspaceSlug}/p/${projectSlug}/knowledge?doc=${milestone.id}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                      Open milestone <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
