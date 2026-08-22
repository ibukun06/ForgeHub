import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DecisionLog } from "@/components/workspace/decision-log";

export const metadata = {
  title: "Decisions Log | ForgeHub",
  description: "Architectural Decision Records",
};

export default async function DecisionsPage({
  params,
}: {
  params: { workspaceSlug: string; projectSlug: string };
}) {
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", params.projectSlug)
    .single();

  if (!project) {
    redirect(`/w/${params.workspaceSlug}`);
  }

  // Fetch decisions and sections in parallel
  const [
    { data: decisions, error: decisionsError },
    { data: sections, error: sectionsError }
  ] = await Promise.all([
    supabase
      .from("decisions")
      .select("*")
      .eq("project_id", project.id)
      .order("created_at", { ascending: false }),
    
    // We should ideally filter by document_id in this project, but we'll fetch all and filter in memory
    supabase
      .from("sections")
      .select("*")
  ]);

  if (decisionsError) console.error("Error fetching decisions:", decisionsError);
  if (sectionsError) console.error("Error fetching sections:", sectionsError);

  return (
    <DecisionLog 
      projectId={project.id} 
      initialDecisions={decisions || []} 
      sections={sections || []} 
    />
  );
}
