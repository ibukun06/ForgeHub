"use client";

import React, { useState, useTransition } from "react";
import { ShieldCheck, FileStack, BellDot, Loader2, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { generateInboxSummary } from "@/lib/ai/gemini";

type SelectedPanelProps = {
  selected: {
    title: string;
    summary: string;
    source: string;
    action: string;
  };
};

export function InboxSelectedPanel({ selected }: SelectedPanelProps) {
  const [isPending, startTransition] = useTransition();
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  const handleSummarize = () => {
    startTransition(async () => {
      const summary = await generateInboxSummary(selected.title, selected.source);
      setAiSummary(summary);
    });
  };

  return (
    <div className="surface-panel-muted p-5 relative overflow-hidden">
      <div className="flex items-center gap-2 text-sm text-primary">
        <ShieldCheck className="h-4 w-4" aria-hidden />
        {selected.source}
      </div>
      <h2 className="mt-3 font-heading text-2xl text-text-primary">{selected.title}</h2>
      
      {aiSummary ? (
        <div className="mt-4 rounded-lg bg-primary/10 p-4 border border-primary/20">
          <div className="flex items-center gap-2 text-primary font-medium mb-2">
            <Sparkles className="h-4 w-4" />
            AI Summary
          </div>
          <p className="text-text-primary text-sm">{aiSummary}</p>
        </div>
      ) : (
        <p className="mt-3 text-text-muted">{selected.summary}</p>
      )}

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <SignalTile title="Source" value={selected.source} icon={FileStack} />
        <SignalTile title="Recommended action" value={selected.action} icon={BellDot} />
      </div>
      
      <div className="mt-5 flex flex-wrap gap-3">
        <button className={buttonVariants({ variant: "primary" })}>Take action</button>
        <button 
          onClick={handleSummarize}
          disabled={isPending || aiSummary !== null} 
          className={buttonVariants({ variant: "secondary" })}
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2 inline" /> : null}
          {aiSummary ? "Thread Summarized" : "Ask AI to summarize thread"}
        </button>
      </div>
    </div>
  );
}

function SignalTile({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-bg p-3 shadow-sm">
      <span className="flex items-center gap-2 text-xs font-medium text-text-muted">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </span>
      <span className="text-sm font-medium text-text-primary line-clamp-1">{value}</span>
    </div>
  );
}
