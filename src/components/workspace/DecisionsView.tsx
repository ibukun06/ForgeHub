"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DecisionsList, type DecisionItem } from "./DecisionsList";
import { LogDecisionDialog } from "./LogDecisionDialog";

export function DecisionsView({ projectId, decisions }: { projectId: string; decisions: DecisionItem[] }) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="mx-auto max-w-4xl pt-4">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-secondary">Decision Log</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-text-primary">Project Decisions</h2>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            The durable memory of what the team chose, why, and what was left behind.
          </p>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className={buttonVariants({ variant: "primary" })}
        >
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Log Decision
        </button>
      </div>

      <DecisionsList decisions={decisions} />

      <LogDecisionDialog
        projectId={projectId}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={() => {
          setIsDialogOpen(false);
          router.refresh();
        }}
      />
    </div>
  );
}
