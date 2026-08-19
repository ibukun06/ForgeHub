import { ProjectInsightsScreen } from "@/components/app-shell/screens";

export default async function ProjectInsightsPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  return <ProjectInsightsScreen projectSlug={projectSlug} />;
}
