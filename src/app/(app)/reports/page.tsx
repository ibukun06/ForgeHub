import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function LegacyRedirectPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  
  const { data: ws } = await supabase
    .from("workspace_members")
    .select("workspaces(slug)")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();
    
  const slug = (ws?.workspaces as any)?.slug ?? "forgehub";
  redirect(`/w/${slug}/reports`);
}
