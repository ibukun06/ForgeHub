"use server";

import { createClient } from "@/lib/supabase/server";

export async function saveSectionContent(sectionId: string, content: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("sections")
    .update({ 
      content, 
      updated_at: new Date().toISOString() 
    })
    .eq("id", sectionId);

  if (error) {
    console.error("Failed to save section content:", error);
    return { success: false, error: error.message };
  }
  
  return { success: true };
}

export async function approveSection(sectionId: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("sections")
    .update({ 
      status: "team_reviewed",
      updated_at: new Date().toISOString() 
    })
    .eq("id", sectionId);

  if (error) {
    console.error("Failed to approve section:", error);
    return { success: false, error: error.message };
  }
  
  return { success: true };
}
