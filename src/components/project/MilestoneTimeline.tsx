import { CheckCircle2, Circle } from "lucide-react";
import type { Milestone } from "./data";

export function MilestoneTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="relative border-l border-border pl-6 space-y-6 mt-6">
      {milestones.map((m) => (
        <div key={m.title} className="relative">
          <span className="absolute -left-[33px] top-0.5">
            {m.completed ? (
              <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />
            ) : (
              <Circle className="h-5 w-5 text-border" aria-hidden />
            )}
          </span>
          <p className={`text-sm font-medium ${m.completed ? "text-text-primary" : "text-text-muted"}`}>
            {m.title}
          </p>
          <p className="text-xs text-text-muted" suppressHydrationWarning>
            {new Date(m.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </p>
        </div>
      ))}
    </div>
  );
}
