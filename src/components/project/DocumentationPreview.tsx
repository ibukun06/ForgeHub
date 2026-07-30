import { FileText } from "lucide-react";
import { DOC_TYPE_LABELS, type DocPreview, type SectionStatus } from "./data";

const STATUS_LABELS: Record<SectionStatus, string> = {
  not_started: "Not started",
  ai_draft: "AI draft",
  team_reviewed: "Team reviewed",
};

const STATUS_STYLES: Record<SectionStatus, string> = {
  not_started: "text-text-muted border-border",
  ai_draft: "text-warning border-warning/30 bg-warning-bg",
  team_reviewed: "text-success border-success/30 bg-success-bg",
};

export function DocumentationPreview({ documentation }: { documentation: DocPreview[] }) {
  return (
    <section id="documentation" className="border-b border-border py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-text-primary">Documentation</h2>
        <p className="mt-2 text-sm text-text-muted">
          A preview of what&apos;s been documented. The full guided workspace is only visible to the team.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {documentation.map((doc) => (
            <div key={doc.type} className="rounded-lg border border-border bg-surface p-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-heading text-sm font-semibold text-text-primary">
                  <FileText className="h-4 w-4 text-secondary" aria-hidden /> {DOC_TYPE_LABELS[doc.type]}
                </span>
                <span className={`rounded-full border px-2 py-0.5 text-[11px] ${STATUS_STYLES[doc.status]}`}>
                  {STATUS_LABELS[doc.status]}
                </span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-text-muted">{doc.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
