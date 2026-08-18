import { relativeTime } from "@/lib/format";
import { CircleEllipsis } from "lucide-react";

export type DecisionItem = {
  id: string;
  decision: string;
  rationale: string;
  alternatives: string | null;
  created_at: string;
  logged_by: string; // or the name if joined
};

export function DecisionsList({ decisions }: { decisions: DecisionItem[] }) {
  if (decisions.length === 0) {
    return (
      <div className="surface-panel-muted border border-dashed border-border p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface">
          <CircleEllipsis className="h-6 w-6 text-text-muted" aria-hidden />
        </div>
        <p className="mt-4 font-heading text-lg font-semibold text-text-primary">No decisions logged yet.</p>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          Record major engineering choices, why you made them, and what you discarded. This becomes the project's institutional memory.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {decisions.map((decision) => (
        <article key={decision.id} className="surface-panel rounded-xl p-6 transition-colors hover:border-primary/30">
          <header className="mb-4 flex items-start justify-between gap-4">
            <h3 className="font-heading text-xl font-semibold text-text-primary">{decision.decision}</h3>
            <span className="shrink-0 text-xs text-text-muted">{relativeTime(decision.created_at)}</span>
          </header>
          
          <div className="space-y-4 text-sm leading-relaxed text-text-primary">
            <div>
              <strong className="block text-xs uppercase tracking-widest text-text-muted mb-1">Rationale</strong>
              <p className="whitespace-pre-wrap">{decision.rationale}</p>
            </div>
            
            {decision.alternatives && (
              <div>
                <strong className="block text-xs uppercase tracking-widest text-text-muted mb-1">Discarded Alternatives</strong>
                <p className="whitespace-pre-wrap text-text-muted">{decision.alternatives}</p>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
