import { notFound } from "next/navigation";
import { ReviewView } from "@/components/workspace/ReviewView";
import { getReviewScreenData } from "@/lib/app-shell-data";

export default async function ProjectReviewPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  const data = await getReviewScreenData(projectSlug);

  if (!data) {
    notFound();
  }

  return <ReviewView workspaceSlug={workspaceSlug} projectSlug={projectSlug} data={data} />;
}
