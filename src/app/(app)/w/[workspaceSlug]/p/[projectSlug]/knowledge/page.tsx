import { notFound } from "next/navigation";
import { KnowledgeScreen } from "@/components/app-shell/screens";
import { getKnowledgeScreenData, getProjectCockpitData } from "@/lib/app-shell-data";

export default async function ProjectKnowledgePage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  const cockpit = await getProjectCockpitData(projectSlug);

  if (!cockpit) {
    notFound();
  }

  const data = await getKnowledgeScreenData(projectSlug);
  return <KnowledgeScreen scope={cockpit.milestoneLabel} data={data} />;
}
