import { ProjectReviewScreen } from "@/components/app-shell/screens";

export default async function ProjectReviewPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  return <ProjectReviewScreen projectSlug={projectSlug} />;
}
