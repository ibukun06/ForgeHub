"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { InviteRole, MemberRole } from "@/lib/supabase/types";

export async function createInvite(projectId: string, email: string, role: InviteRole) {
  const supabase = await createClient();

  // We rely on RLS: "invites_insert" is restricted to team_lead.
  const { data, error } = await supabase
    .from("invites")
    .insert({ project_id: projectId, email, role })
    .select()
    .single();

  if (error) {
    console.error("Failed to create invite:", error);
    if (error.code === "23505") {
      return { error: "An active invitation for this email already exists." };
    }
    return { error: "Could not create invitation. Ensure you have Team Lead permissions." };
  }

  revalidatePath(`/w/[workspaceSlug]/p/[projectSlug]/team`, "page");
  return { success: true, invite: data };
}

export async function revokeInvite(inviteId: string) {
  const supabase = await createClient();

  // We rely on RLS: "invites_delete" is restricted to team_lead.
  const { error } = await supabase
    .from("invites")
    .delete()
    .eq("id", inviteId);

  if (error) {
    console.error("Failed to revoke invite:", error);
    return { error: "Could not revoke invitation. Ensure you have Team Lead permissions." };
  }

  revalidatePath(`/w/[workspaceSlug]/p/[projectSlug]/team`, "page");
  return { success: true };
}

export async function updateMemberRole(projectId: string, memberId: string, role: MemberRole) {
  const supabase = await createClient();

  // We rely on RLS: "project_members_update" is restricted to team_lead.
  // There's also a trigger to prevent removing the last team lead.
  const { error } = await supabase
    .from("project_members")
    .update({ role })
    .eq("project_id", projectId)
    .eq("user_id", memberId);

  if (error) {
    console.error("Failed to update member role:", error);
    return { error: error.message || "Could not update member role." };
  }

  revalidatePath(`/w/[workspaceSlug]/p/[projectSlug]/team`, "page");
  return { success: true };
}

export async function removeMember(projectId: string, memberId: string) {
  const supabase = await createClient();

  // We rely on RLS: "project_members_delete" is restricted to team_lead.
  const { error } = await supabase
    .from("project_members")
    .delete()
    .eq("project_id", projectId)
    .eq("user_id", memberId);

  if (error) {
    console.error("Failed to remove member:", error);
    return { error: error.message || "Could not remove member. Ensure they are not the last team lead." };
  }

  revalidatePath(`/w/[workspaceSlug]/p/[projectSlug]/team`, "page");
  return { success: true };
}
