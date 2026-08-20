import { Flag, FileText, UserPlus, Rocket } from "lucide-react";
import { relativeTime } from "@/lib/format";
import type { ActivityEntry } from "./data";

const ACTIVITY_ICONS = { milestone: Flag, documentation: FileText, contributor: UserPlus, release: Rocket };

/**
 * No schema backing yet — there's no public project-activity table,
 * only per-user private `notifications`. Same gap as the milestones
 * above; both are strong candidates to unify into one real
 * "project events" table later rather than staying two separate,
 * permanently-mock concepts.
 */
export function ActivityTimeline({ activity }: { activity: ActivityEntry[] }) {
  return (
    <section className="border-b border-border py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-text-primary">Recent activity</h2>
        <ul className="mt-6 space-y-4">
          {activity.map((entry, i) => {
            const Icon = ACTIVITY_ICONS[entry.type];
            return (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-input-bg">
                  <Icon className="h-4 w-4 text-primary" aria-hidden />
                </span>
                <div>
                  <p className="text-sm text-text-primary">{entry.description}</p>
                  <p className="text-xs text-text-muted">{relativeTime(entry.date)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
