/**
 * Single source of truth for building public-facing URLs. Every
 * component links through these instead of interpolating the pattern
 * itself — so evolving /projects/[slug] into /@username/project-slug
 * later is a change in one place, not a find-and-replace across every
 * card and share button that links to a project.
 */
export function getProjectUrl(slug: string): string {
  return `/projects/${slug}`;
}

export function getProfileUrl(id: string): string {
  return `/profile/${id}`;
}
