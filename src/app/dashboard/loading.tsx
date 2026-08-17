import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <Skeleton
          key={i}
          className="h-40 rounded-lg border border-border bg-surface"
        />
      ))}
    </div>
  );
}
