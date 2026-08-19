import { getProjectStatus } from "@/components/explore/filters";
import { MilestoneTimeline } from "./MilestoneTimeline";
import type { Milestone } from "./data";

export function ProgressSection({ progress, milestones }: { progress: number; milestones: Milestone[] }) {
  const status = getProjectStatus(progress);

  return (
    <section className="border-b border-border py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-text-primary">Progress &amp; milestones</h2>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-text-primary">{status.label}</span>
            <span className="font-mono text-text-muted">{progress}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-input-bg">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <MilestoneTimeline milestones={milestones} />
      </div>
    </section>
  );
}
