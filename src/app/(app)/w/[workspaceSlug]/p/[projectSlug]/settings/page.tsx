import { redirect } from "next/navigation";

export default async function ProjectSettingsIndex({
  params,
}: {
  params: Promise<{ workspaceSlug: string, projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  redirect(`/w/${workspaceSlug}/p/${projectSlug}/settings/general`);
}
