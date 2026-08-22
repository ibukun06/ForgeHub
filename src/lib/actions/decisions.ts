"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createDecision(projectId: string, decision: string, rationale: string, alternatives?: string, sectionId?: string) {
  const supabase = await createClient();
  
  // Get the current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("decisions")
    .insert({
      project_id: projectId,
      decision,
      rationale,
      alternatives,
      section_id: sectionId || null,
      logged_by: user.id
    });

  if (error) {
    console.error("Failed to create decision:", error);
    return { success: false, error: error.message };
  }
  
  return { success: true };
}
