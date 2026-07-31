import { notFound } from "next/navigation";
import { ProjectCockpitScreen } from "@/components/app-shell/screens";
import { getProjectCockpitData } from "@/lib/app-shell-data";

export default async function ProjectOverviewPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  const data = await getProjectCockpitData(projectSlug);

  if (!data) {
    notFound();
  }

  return <ProjectCockpitScreen workspaceSlug={workspaceSlug} projectSlug={projectSlug} data={data} />;
}
