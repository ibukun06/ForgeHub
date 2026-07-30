import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getRelatedProjects, getAllProjectSlugs } from "@/components/project/data";
import { getProjectUrl } from "@/lib/urls";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectOverview } from "@/components/project/ProjectOverview";
import { ProjectDetails } from "@/components/project/ProjectDetails";
import { ProgressSection } from "@/components/project/ProgressSection";
import { MediaGallery } from "@/components/project/MediaGallery";
import { DocumentationPreview } from "@/components/project/DocumentationPreview";
import { ContributorGrid } from "@/components/project/ContributorGrid";
import { ActivityTimeline } from "@/components/project/ActivityTimeline";
import { RelatedProjects } from "@/components/project/RelatedProjects";
import { ProjectCTA } from "@/components/project/ProjectCTA";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: getProjectUrl(project.slug) },
    openGraph: {
      title: project.name,
      description: project.description,
      url: getProjectUrl(project.slug),
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const related = await getRelatedProjects(project);

  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview overview={project.overview} />
      <ProjectDetails project={project} />
      <ProgressSection progress={project.progress} milestones={project.milestones} />
      <MediaGallery media={project.media} />
      <DocumentationPreview documentation={project.documentation} />
      <ContributorGrid contributors={project.team} />
      <ActivityTimeline activity={project.activity} />
      <RelatedProjects projects={related} />
      <ProjectCTA />
    </>
  );
}
