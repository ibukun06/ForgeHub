"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { SectionStatus } from "@/lib/supabase/types";

export async function updateSectionStatus(sectionId: string, newStatus: SectionStatus) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("sections")
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq("id", sectionId);

  if (error) {
    console.error("Failed to update section status:", error);
    throw new Error("Failed to update section status");
  }

  // We should ideally pass the exact paths to revalidate, but for now we'll revalidate the layout
  // which will update the kanban board where this data is used.
  revalidatePath("/", "layout");
}

export async function clearNotification(notificationId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("id", notificationId);

  if (error) {
    console.error("Failed to clear notification:", error);
    throw new Error("Failed to clear notification");
  }

  revalidatePath("/", "layout");
}
