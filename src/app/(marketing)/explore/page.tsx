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

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<ExploreSearchParams>;
}) {
  const params = await searchParams;
  const projects = filterAndSortProjects(params);

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
