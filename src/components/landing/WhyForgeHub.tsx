const WITHOUT = [
  "Scattered across WhatsApp, Drive, and a notebook",
  "Files nobody else can open",
  "No record of why a decision was made",
  "An empty portfolio when it's time to apply",
];

const WITH = [
  "One workspace, one source of truth",
  "Guided documentation for every phase",
  "A decisions log nobody has to reconstruct",
  "A shareable case study, ready when you are",
];

export function WhyForgeHub() {
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
            The problem isn&apos;t your work ethic. It&apos;s where your work lives.
          </h2>
          <p className="mt-4 leading-relaxed text-text-muted">
            Great engineering work goes uncredited all the time — not because it wasn&apos;t
            good, but because it was never in one place. ForgeHub is that place: one thread from
            problem statement to final prototype.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-text-muted">
              Without ForgeHub
            </h3>
            <ul className="mt-4 space-y-3">
              {WITHOUT.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-text-muted">
                  <span className="shrink-0 text-error">✕</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-primary bg-surface p-6">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-primary">
              With ForgeHub
            </h3>
            <ul className="mt-4 space-y-3">
              {WITH.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-text-primary">
                  <span className="shrink-0 text-success">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
