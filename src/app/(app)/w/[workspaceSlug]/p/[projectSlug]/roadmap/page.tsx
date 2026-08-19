import { ProjectPlanScreen } from "@/components/app-shell/screens";

export default async function ProjectPlanPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  return <ProjectPlanScreen projectSlug={projectSlug} />;
}
