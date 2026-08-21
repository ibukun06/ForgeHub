import { WorkspaceScreen } from "@/components/app-shell/screens";
import { createClient } from "@/lib/supabase/server";

export default async function WorkspacePage(props: { params: Promise<{ workspaceSlug: string }> }) {
  const params = await props.params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Verify workspace exists and user has access
  const { data: workspace } = await supabase
    .from("workspaces")
    .select("*, workspace_members!inner(role)")
    .eq("slug", params.workspaceSlug)
    .eq("workspace_members.user_id", user?.id as string)
    .single();

  if (!workspace) {
    return <div className="p-8 text-center text-text-muted">Workspace not found or access denied.</div>;
  }

  // Fetch projects in the workspace
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("workspace_id", workspace.id)
    .order("created_at", { ascending: false });

  return <WorkspaceScreen workspace={workspace} projects={projects || []} user={user} />;
}
