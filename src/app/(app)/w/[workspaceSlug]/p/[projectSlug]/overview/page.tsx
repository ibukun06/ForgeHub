import { ProjectCockpitScreen } from "@/components/app-shell/screens";

export default async function ProjectOverviewPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  return <ProjectCockpitScreen workspaceSlug={workspaceSlug} projectSlug={projectSlug} />;
}
