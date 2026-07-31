import { KnowledgeScreen } from "@/components/app-shell/screens";
import { prettyLabel } from "@/components/app-shell/shell-config";

export default async function ProjectKnowledgePage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  return <KnowledgeScreen scope={prettyLabel(projectSlug)} />;
}
