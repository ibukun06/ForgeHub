import { notFound } from "next/navigation";
import { PlanView } from "@/components/workspace/PlanView";
import { getPlanScreenData } from "@/lib/app-shell-data";

export default async function ProjectPlanPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  const data = await getPlanScreenData(projectSlug);

  if (!data) {
    notFound();
  }

  return <PlanView workspaceSlug={workspaceSlug} projectSlug={projectSlug} data={data} />;
}
