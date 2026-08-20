import { MOCK_BUILDERS } from "./data";
import { BuilderCard } from "./BuilderCard";

export function BuilderGrid() {
  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">Featured builders</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_BUILDERS.map((builder) => (
            <BuilderCard key={builder.username} builder={builder} />
          ))}
        </div>
      </div>
    </section>
  );
}
