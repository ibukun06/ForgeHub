import { notFound } from "next/navigation";
import { WorkScreen } from "@/components/app-shell/screens";
import { getProjectCockpitData, getWorkScreenData } from "@/lib/app-shell-data";

export default async function ProjectWorkPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  const cockpit = await getProjectCockpitData(projectSlug, workspaceSlug);

  if (!cockpit) {
    notFound();
  }

  const data = await getWorkScreenData(workspaceSlug, projectSlug);
  return <WorkScreen scope={cockpit.milestoneLabel} data={data} />;
}
