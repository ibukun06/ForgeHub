import { WorkScreen } from "@/components/app-shell/screens";
import { prettyLabel } from "@/components/app-shell/shell-config";

export default async function ProjectWorkPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  return <WorkScreen scope={prettyLabel(projectSlug)} />;
}
