import type { Metadata } from "next";
import { ExploreHero } from "@/components/explore/ExploreHero";
import { ExploreSearch } from "@/components/explore/ExploreSearch";
import { FilterBar } from "@/components/explore/FilterBar";
import { ProjectGrid } from "@/components/explore/ProjectGrid";
import { CategoryGrid } from "@/components/explore/CategoryGrid";
import { TechnologyTags } from "@/components/explore/TechnologyTags";
import { BuilderGrid } from "@/components/explore/BuilderGrid";
import { ExploreCTA } from "@/components/explore/ExploreCTA";
import { filterAndSortProjects, type ExploreSearchParams } from "@/components/explore/filters";

const DESCRIPTION = "Discover engineering projects being built and documented on ForgeHub.";

// Title is just "Explore" — the (marketing) layout's template turns this
// into "Explore | ForgeHub" automatically. canonical + openGraph here are
// a concrete example of the per-page override pattern for future public
// pages to copy.
export const metadata: Metadata = {
  title: "Explore",
  description: DESCRIPTION,
  alternates: { canonical: "/explore" },
  openGraph: {
    title: "Explore — ForgeHub",
    description: DESCRIPTION,
    url: "/explore",
  },
};

import { createClient } from "@/lib/supabase/server";
import { MOCK_PROJECTS, type ExploreProject } from "@/components/explore/data";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<ExploreSearchParams>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const { data: realProjectsData } = await supabase
    .from("projects")
    .select(`
      id,
      slug,
      name,
      description,
      project_type,
      created_at,
      users:created_by ( name, institution ),
      project_members ( count )
    `)
    .eq("visibility", "published");

  type RealProjectData = {
    slug: string;
    name: string;
    description: string | null;
    project_type: string;
    created_at: string;
    users?: { name: string; institution: string } | null;
    project_members?: { count: number }[] | null;
  };

  const realProjects: ExploreProject[] = ((realProjectsData || []) as RealProjectData[]).map((rp) => ({
    slug: rp.slug,
    name: rp.name,
    description: rp.description || "",
    category: rp.project_type, // "software", "hardware" etc.
    tags: [rp.project_type], // fallback tag
    creator: rp.users?.name || "Unknown",
    institution: rp.users?.institution || "Independent",
    teamSize: rp.project_members?.[0]?.count || 1,
    contributors: rp.project_members?.[0]?.count || 1,
    progress: 50, // placeholder since we don't calculate it from sections yet
    likes: 0,
    views: 0,
    featured: false,
    createdAt: rp.created_at,
  }));

  const allProjects = [...realProjects, ...MOCK_PROJECTS];
  const projects = filterAndSortProjects(params, allProjects);

  return (
    <>
      <ExploreHero>
        <ExploreSearch query={params.q} hiddenParams={params} />
      </ExploreHero>
      <FilterBar params={params} />
      <ProjectGrid projects={projects} />
      <CategoryGrid />
      <TechnologyTags />
      <BuilderGrid />
      <ExploreCTA />
    </>
  );
}
