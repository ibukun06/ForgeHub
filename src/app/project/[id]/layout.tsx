import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { WorkspaceShell } from "@/components/workspace/WorkspaceShell";

export default async function ProjectWorkspaceLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/project/${id}/overview`);

  const { data: membership } = await supabase.from("project_members").select("role, projects(id, name, project_type, visibility, updated_at)").eq("project_id", id).eq("user_id", user.id).maybeSingle();
  const project = Array.isArray(membership?.projects) ? membership.projects[0] : membership?.projects;
  if (!membership || !project) redirect("/dashboard");

  return <WorkspaceShell projectId={id} project={project}>{children}</WorkspaceShell>;
}
