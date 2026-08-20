import { Skeleton } from "@/components/ui/skeleton";

export default function AppLoading() {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <section className="surface-hero p-6 lg:p-7">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl space-y-3">
            <Skeleton className="h-3 w-24 rounded-full bg-white/15" />
            <Skeleton className="h-10 w-3/4 rounded-2xl bg-white/12" />
            <Skeleton className="h-4 w-full max-w-2xl rounded-full bg-white/10" />
            <Skeleton className="h-4 w-4/5 rounded-full bg-white/10" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[420px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-3xl border border-white/12 bg-white/6 px-4 py-3">
                <Skeleton className="h-3 w-20 rounded-full bg-white/12" />
                <Skeleton className="mt-3 h-8 w-16 rounded-2xl bg-white/12" />
                <Skeleton className="mt-2 h-3 w-full rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_1fr_0.92fr]">
        {Array.from({ length: 3 }).map((_, columnIndex) => (
          <div key={columnIndex} className="space-y-6">
            {Array.from({ length: columnIndex === 2 ? 3 : 2 }).map((__, panelIndex) => (
              <div key={panelIndex} className="surface-panel p-5">
                <div className="mb-4 space-y-2">
                  <Skeleton className="h-6 w-36 rounded-2xl bg-border/70" />
                  <Skeleton className="h-4 w-2/3 rounded-full bg-border/55" />
                </div>
                <div className="grid gap-3">
                  {Array.from({ length: 3 }).map((___, itemIndex) => (
                    <div key={itemIndex} className="surface-panel-muted p-4">
                      <Skeleton className="h-4 w-2/3 rounded-full bg-border/60" />
                      <Skeleton className="mt-3 h-3 w-full rounded-full bg-border/40" />
                      <Skeleton className="mt-2 h-3 w-4/5 rounded-full bg-border/35" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
