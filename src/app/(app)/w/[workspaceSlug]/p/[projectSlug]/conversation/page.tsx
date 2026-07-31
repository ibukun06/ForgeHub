import { ProjectConversationScreen } from "@/components/app-shell/screens";

export default async function ProjectConversationPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  return <ProjectConversationScreen projectSlug={projectSlug} />;
}
