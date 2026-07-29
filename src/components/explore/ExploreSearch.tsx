import { Search as SearchIcon } from "lucide-react";
import type { ExploreSearchParams } from "./filters";

export function ExploreSearch({ query, hiddenParams }: { query?: string; hiddenParams: ExploreSearchParams }) {
  // Preserve any active filters when a new search is submitted, so
  // searching doesn't silently clear category/status/etc.
  const preserved = { ...hiddenParams };
  delete preserved.q;

  return (
    <form
      action="/explore"
      method="GET"
      className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-lg border border-border bg-surface p-2 shadow-sm"
    >
      <SearchIcon className="ml-2 h-5 w-5 shrink-0 text-text-muted" aria-hidden />
      <input
        type="text"
        name="q"
        defaultValue={query}
        placeholder="Search projects, technologies, creators, universities…"
        aria-label="Search ForgeHub projects"
        className="w-full bg-transparent py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
      />
      {Object.entries(preserved).map(([key, value]) =>
        value ? <input key={key} type="hidden" name={key} value={value} /> : null
      )}
      <button
        type="submit"
        className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
      >
        Search
      </button>
    </form>
  );
}
