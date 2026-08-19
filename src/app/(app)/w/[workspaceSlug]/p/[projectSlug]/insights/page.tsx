import { notFound } from "next/navigation";
import { InsightsView } from "@/components/workspace/InsightsView";
import { getInsightsScreenData } from "@/lib/app-shell-data";

export default async function ProjectInsightsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  const data = await getInsightsScreenData(projectSlug);

  if (!data) {
    notFound();
  }

  return <InsightsView workspaceSlug={workspaceSlug} projectSlug={projectSlug} data={data} />;
}
