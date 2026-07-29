import { MOCK_PROJECTS, type ExploreProject } from "./data";

export type ExploreSearchParams = {
  q?: string;
  category?: string;
  technology?: string;
  teamSize?: string; // "solo" | "small" | "large"
  status?: string; // "just-started" | "in-progress" | "near-complete" | "completed"
  sort?: string; // "recent" | "popular" | "viewed" | "featured"
};

/**
 * Derived from progress rather than a stored field — the reconciled
 * schema (0001_init.sql) doesn't have a `status` column on projects.
 * In production this reads from computed progress (see data.ts note),
 * not a value pulled straight off the row.
 */
export function getProjectStatus(progress: number) {
  if (progress >= 100) return { slug: "completed", label: "Completed" };
  if (progress >= 71) return { slug: "near-complete", label: "Near complete" };
  if (progress >= 34) return { slug: "in-progress", label: "In progress" };
  return { slug: "just-started", label: "Just started" };
}

export function getTeamSizeBucket(teamSize: number): "solo" | "small" | "large" {
  if (teamSize <= 1) return "solo";
  if (teamSize <= 4) return "small";
  return "large";
}

export function filterAndSortProjects(params: ExploreSearchParams): ExploreProject[] {
  let results = [...MOCK_PROJECTS];

  if (params.q) {
    const q = params.q.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.creator.toLowerCase().includes(q) ||
        p.institution.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  if (params.category) {
    results = results.filter((p) => p.category === params.category);
  }

  if (params.technology) {
    results = results.filter((p) => p.tags.some((t) => t.toLowerCase() === params.technology!.toLowerCase()));
  }

  if (params.teamSize) {
    results = results.filter((p) => getTeamSizeBucket(p.teamSize) === params.teamSize);
  }

  if (params.status) {
    results = results.filter((p) => getProjectStatus(p.progress).slug === params.status);
  }

  switch (params.sort) {
    case "popular":
      results.sort((a, b) => b.likes - a.likes);
      break;
    case "viewed":
      results.sort((a, b) => b.views - a.views);
      break;
    case "featured":
      results.sort((a, b) => Number(b.featured) - Number(a.featured));
      break;
    case "recent":
    default:
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return results;
}

/** Builds a /explore URL that toggles one filter on/off while preserving the rest. */
export function toggleFilterHref(current: ExploreSearchParams, key: keyof ExploreSearchParams, value: string): string {
  const next: ExploreSearchParams = { ...current };
  if (next[key] === value) {
    delete next[key];
  } else {
    next[key] = value;
  }
  const search = new URLSearchParams();
  Object.entries(next).forEach(([k, v]) => {
    if (v) search.set(k, v);
  });
  const queryString = search.toString();
  return `/explore${queryString ? `?${queryString}` : ""}`;
}
