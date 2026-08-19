import { CATEGORIES } from "@/components/landing/data";
import { toggleFilterHref, type ExploreSearchParams } from "./filters";
import { SortSelect } from "./SortSelect";
import { FilterPill } from "./FilterPill";
import type { ReactNode } from "react";

const TEAM_SIZES = [
  { value: "solo", label: "Solo" },
  { value: "small", label: "2–4 people" },
  { value: "large", label: "5+ people" },
];

const STATUSES = [
  { value: "just-started", label: "Just started" },
  { value: "in-progress", label: "In progress" },
  { value: "near-complete", label: "Near complete" },
  { value: "completed", label: "Completed" },
];

export function FilterBar({ params }: { params: ExploreSearchParams }) {
  return (
    <div className="border-b border-border bg-surface/50 py-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-4 sm:px-6 lg:px-8">
        <FilterGroup label="Category">
          {/* Full list lives in the Categories section below; these are just quick picks */}
          {CATEGORIES.slice(0, 6).map((c) => (
            <FilterPill key={c.slug} href={toggleFilterHref(params, "category", c.slug)} active={params.category === c.slug}>
              {c.label}
            </FilterPill>
          ))}
        </FilterGroup>

        <FilterGroup label="Team size">
          {TEAM_SIZES.map((t) => (
            <FilterPill key={t.value} href={toggleFilterHref(params, "teamSize", t.value)} active={params.teamSize === t.value}>
              {t.label}
            </FilterPill>
          ))}
        </FilterGroup>

        <FilterGroup label="Status">
          {STATUSES.map((s) => (
            <FilterPill key={s.value} href={toggleFilterHref(params, "status", s.value)} active={params.status === s.value}>
              {s.label}
            </FilterPill>
          ))}
        </FilterGroup>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs font-medium text-text-muted">Sort</span>
          <SortSelect value={params.sort ?? "recent"} params={params} />
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-text-muted">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
