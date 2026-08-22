"use server";

import { createClient } from "@/lib/supabase/server";

export async function setProjectVisibility(projectId: string, visibility: "private" | "published") {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("projects")
    .update({ 
      visibility,
      updated_at: new Date().toISOString() 
    })
    .eq("id", projectId);

  if (error) {
    console.error("Failed to update project visibility:", error);
    return { success: false, error: error.message };
  }
  
  return { success: true };
}
