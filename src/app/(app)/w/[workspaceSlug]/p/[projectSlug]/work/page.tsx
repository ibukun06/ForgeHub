import { notFound } from "next/navigation";
import { WorkScreen } from "@/components/app-shell/screens";
import { getProjectCockpitData, getWorkScreenData } from "@/lib/app-shell-data";

export default async function ProjectWorkPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  const cockpit = await getProjectCockpitData(projectSlug);

  if (!cockpit) {
    notFound();
  }

  const data = await getWorkScreenData(projectSlug);
  return <WorkScreen scope={cockpit.milestoneLabel} data={data} />;
}
