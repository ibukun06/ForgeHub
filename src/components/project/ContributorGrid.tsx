import { ContributorCard } from "./ContributorCard";
import type { TeamMember } from "./data";

export function ContributorGrid({ contributors }: { contributors: TeamMember[] }) {
  return (
    <section className="border-b border-border py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-text-primary">Contributors</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {contributors.map((c) => (
            <ContributorCard key={c.username} contributor={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
