import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

/**
 * Single source of truth for turning a project name into a URL-safe slug.
 * Only ever called at creation time (POST /api/projects) — every read
 * path trusts the stored `projects.slug` column and never re-derives a
 * slug from a name again. Renaming a project later must not change its
 * URL out from under anyone who bookmarked, shared, or was notified
 * about it.
 */
export function slugify(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return base || "project";
}

/**
 * Appends -2, -3, ... until the slug is free. A query-per-attempt loop is
 * simpler and safer than trying to guarantee uniqueness in one round
 * trip, and collisions are rare enough (two people naming a project
 * "Autonomous Rover" in the same window) that the extra round trips never
 * show up in practice.
 */
export async function generateUniqueProjectSlug(
  supabase: SupabaseClient<Database>,
  name: string
): Promise<string> {
  const base = slugify(name);
  let candidate = base;
  let suffix = 2;

  while (true) {
    const { data } = await supabase.from("projects").select("id").eq("slug", candidate).maybeSingle();
    if (!data) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}
