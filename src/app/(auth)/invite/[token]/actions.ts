"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function acceptInviteAction(token: string) {
  const supabase = await createClient();
  
  // accept_invite is a security definer RPC, meaning it runs as a superuser
  // and bypasses RLS so it can insert the user into project_members even
  // if they aren't already a member.
  const { data: member, error } = await supabase.rpc("accept_invite", {
    p_token: token,
  });

  if (error) {
    console.error("Failed to accept invite:", error);
    return { error: error.message || "Failed to accept invitation." };
  }

  // Once accepted, we need to know the project slug and workspace slug to redirect to.
  // The member object only has `project_id`. Let's fetch the project details.
  const { data: project } = await supabase
    .from("projects")
    .select("slug, workspace_id, workspaces(slug)")
    .eq("id", member.project_id)
    .single();

  if (!project) {
    return { error: "Failed to resolve project details after accepting invite." };
  }

  // Next.js returns related table as an array or object depending on relationship.
  // Here workspaces is 1:1, so it should be an object or array of 1.
  const workspaceSlug = Array.isArray(project.workspaces) ? project.workspaces[0]?.slug : (project.workspaces as { slug: string } | null)?.slug;
  const projectUrl = `/w/${workspaceSlug}/p/${project.slug}/overview`;
  
  revalidatePath(projectUrl, "layout");
  return { success: true, redirectUrl: projectUrl };
}
