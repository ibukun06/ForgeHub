export function WhatIsForgeHub() {
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">What ForgeHub is</h2>
          <p className="mt-4 leading-relaxed text-text-muted">
            ForgeHub is a digital workspace for turning an idea into a finished, documented
            project. The same way GitHub tracks how code evolves, ForgeHub tracks how a build
            evolves — the research, the failed prototypes, the design decisions, the fixes. The
            journey is the product.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">Who it&apos;s for</h2>
          <ul className="mt-4 space-y-3 text-text-muted">
            <li className="flex gap-2">
              <span className="shrink-0 text-secondary">→</span>
              Engineering students turning a year of work into a real thesis, not a scramble
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-secondary">→</span>
              Project leads who need their team documenting as they go, not at the deadline
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-secondary">→</span>
              Makers and researchers who want proof they can actually build something
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
