"use client";

import { useRouter } from "next/navigation";
import type { ExploreSearchParams } from "./filters";

const SORT_OPTIONS = [
  { value: "recent", label: "Most recent" },
  { value: "popular", label: "Most popular" },
  { value: "viewed", label: "Most viewed" },
  { value: "featured", label: "Featured" },
];

export function SortSelect({ value, params }: { value: string; params: ExploreSearchParams }) {
  const router = useRouter();

  function handleChange(sort: string) {
    const search = new URLSearchParams();
    Object.entries({ ...params, sort }).forEach(([key, val]) => {
      if (val) search.set(key, val);
    });
    router.push(`/explore?${search.toString()}`);
  }

  return (
    <select
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      aria-label="Sort projects"
      className="rounded-lg border border-border bg-input-bg px-3 py-1.5 text-xs text-text-primary focus:border-primary focus:outline-none"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
