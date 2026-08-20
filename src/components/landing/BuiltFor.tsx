const PERSONAS = ["Engineering Students", "Project Leads", "Researchers & Academics", "Hardware Makers"];

export function BuiltFor() {
  return (
    <section className="border-b border-border py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-wider text-text-muted">
          Built for the people actually building things
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {PERSONAS.map((persona) => (
            <span key={persona} className="font-heading text-sm font-semibold text-text-primary sm:text-base">
              {persona}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
