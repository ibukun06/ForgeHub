import { getProjectStatus } from "@/components/explore/filters";

export function StatusBadge({ progress }: { progress: number }) {
  const status = getProjectStatus(progress);
  return (
    <span className="rounded-full border border-primary bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {status.label}
    </span>
  );
}
