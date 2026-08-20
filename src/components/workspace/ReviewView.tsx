"use client";

import Link from "next/link";
import { Check, ShieldCheck, Sparkles, X } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonVariants } from "@/components/ui/button";
import type { ReviewScreenData } from "@/lib/app-shell-data";
import { prettyLabel } from "@/components/app-shell/shell-config";

export function ReviewView({ 
  workspaceSlug, 
  projectSlug, 
  data 
}: { 
  workspaceSlug: string; 
  projectSlug: string; 
  data: ReviewScreenData;
}) {
  const { pendingReviews } = data;

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow text-secondary">{prettyLabel(projectSlug)} · Review</p>
          <h1 className="mt-3 font-heading text-3xl text-text-primary sm:text-4xl">Approval Queue</h1>
          <p className="mt-4 text-base text-text-muted">
            Sections drafted by Forge AI require human review before they are merged into the official project record.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="surface-panel p-5 lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-5 w-5 text-secondary" />
            <h2 className="font-heading text-xl text-text-primary">AI Drafts pending review</h2>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-heading text-text-primary">{pendingReviews.length}</p>
              <p className="text-sm text-text-muted mt-1">Awaiting approval</p>
            </div>
            <div className="h-12 w-full max-w-[200px] flex items-end gap-1">
              {[4, 2, 6, 8, 3, pendingReviews.length].map((val, i) => (
                <div key={i} className="bg-secondary/20 rounded-t-sm w-full transition-all" style={{ height: `${Math.max(10, val * 10)}%` }} />
              ))}
            </div>
          </div>
        </div>

        <div className="surface-panel p-5 bg-gradient-to-br from-surface to-primary/5 border-primary/20">
          <ShieldCheck className="h-6 w-6 text-primary mb-3" />
          <h2 className="font-heading text-lg text-text-primary">Governance rules</h2>
          <ul className="mt-3 space-y-2 text-sm text-text-muted">
            <li className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Humans own the final record.</li>
            <li className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> AI drafts must be approved.</li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
          <h2 className="font-heading text-xl text-text-primary">Queue</h2>
          <div className="flex gap-2">
            <span className="text-xs font-mono text-text-muted bg-surface-muted px-2 py-1 rounded">
              {pendingReviews.length} ITEMS
            </span>
          </div>
        </div>
        
        {pendingReviews.length === 0 ? (
          <EmptyState 
            icon={ShieldCheck} 
            title="Queue empty" 
            description="There are no AI drafts waiting for human approval."
          />
        ) : (
          <div className="space-y-4">
            {pendingReviews.map((review) => (
              <div key={review.id} className="surface-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-secondary/40 transition-colors">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="signal-pill signal-pill-warning text-xs">
                      {review.status}
                    </span>
                    <span className="text-xs text-text-muted font-mono">{review.documentTitle}</span>
                  </div>
                  <h3 className="text-lg font-medium text-text-primary">{review.prompt}</h3>
                  <p className="text-sm text-text-muted mt-1">Generated {review.updated_at}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button type="button" className={`${buttonVariants({ variant: "outline", size: "sm" })} text-error hover:bg-error/10 hover:text-error hover:border-error/30`}>
                    <X className="w-4 h-4" /> Reject
                  </button>
                  <Link href={`/w/${workspaceSlug}/p/${projectSlug}/knowledge?doc=${review.id}`} className={buttonVariants({ variant: "primary", size: "sm" })}>
                    Review draft
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
