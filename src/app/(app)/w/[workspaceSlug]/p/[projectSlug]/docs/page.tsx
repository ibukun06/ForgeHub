import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DocEditor } from "@/components/workspace/doc-editor";

export default async function ProjectKnowledgePage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  const supabase = await createClient();

  let targetWorkspaceId: string | undefined;
  const { data: ws } = await supabase.from("workspaces").select("id").eq("slug", workspaceSlug).maybeSingle();
  if (ws) {
    targetWorkspaceId = ws.id;
  }

  let query = supabase.from("projects").select("id").eq("slug", projectSlug);
  if (targetWorkspaceId) {
    query = query.eq("workspace_id", targetWorkspaceId);
  }
  const { data: project } = await query.maybeSingle();

  if (!project) {
    notFound();
  }

  return <DocEditor />;
}
