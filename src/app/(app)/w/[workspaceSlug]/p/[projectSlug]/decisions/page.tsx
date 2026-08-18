import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DecisionsView } from "@/components/workspace/DecisionsView";

export default async function ProjectDecisionsPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", projectSlug)
    .maybeSingle();

  if (!project) {
    notFound();
  }

  const { data: decisions } = await supabase
    .from("decisions")
    .select("id, decision, rationale, alternatives, created_at, logged_by")
    .eq("project_id", project.id)
    .order("created_at", { ascending: false });

  return (
    <div className="flex h-full flex-col p-4 md:p-8">
      <DecisionsView projectId={project.id} decisions={decisions ?? []} />
    </div>
  );
}
