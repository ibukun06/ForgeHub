export default function DashboardLoading() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-40 animate-pulse rounded-lg border border-border bg-surface"
        />
      ))}
    </div>
  );
}
