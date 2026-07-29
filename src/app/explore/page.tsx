import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ExploreHero } from "@/components/explore/ExploreHero";
import { ExploreSearch } from "@/components/explore/ExploreSearch";
import { FilterBar } from "@/components/explore/FilterBar";
import { ProjectGrid } from "@/components/explore/ProjectGrid";
import { CategoryGrid } from "@/components/explore/CategoryGrid";
import { TechnologyTags } from "@/components/explore/TechnologyTags";
import { BuilderGrid } from "@/components/explore/BuilderGrid";
import { ExploreCTA } from "@/components/explore/ExploreCTA";
import { filterAndSortProjects, type ExploreSearchParams } from "@/components/explore/filters";

export const metadata = {
  title: "Explore — ForgeHub",
  description: "Discover engineering projects being built and documented on ForgeHub.",
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
      <Navbar />
      <main>
        <ExploreHero>
          <ExploreSearch query={params.q} hiddenParams={params} />
        </ExploreHero>
        <FilterBar params={params} />
        <ProjectGrid projects={projects} />
        <CategoryGrid />
        <TechnologyTags />
        <BuilderGrid />
        <ExploreCTA />
      </main>
      <Footer />
    </>
  );
}
