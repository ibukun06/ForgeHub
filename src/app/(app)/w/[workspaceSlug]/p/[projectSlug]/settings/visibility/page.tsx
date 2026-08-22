import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import VisibilitySettingsPage from "./visibility-settings";

export default async function Page({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("id, visibility, workspaces!inner(slug)")
    .eq("slug", projectSlug)
    .eq("workspaces.slug", workspaceSlug)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <div className="p-8">
      <VisibilitySettingsPage 
        projectId={project.id} 
        initialVisibility={project.visibility} 
        projectSlug={projectSlug}
      />
    </div>
  );
}
