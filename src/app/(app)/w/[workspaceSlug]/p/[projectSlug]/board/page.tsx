import { notFound } from "next/navigation";
import { WorkScreen } from "@/components/app-shell/screens";
import { getProjectCockpitData, getWorkScreenData } from "@/lib/app-shell-data";
import { DecisionLog } from "@/components/workspace/decision-log";
import { createClient } from "@/lib/supabase/server";

export default async function ProjectWorkPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  const cockpit = await getProjectCockpitData(projectSlug, workspaceSlug);

  if (!cockpit) {
    notFound();
  }

  const data = await getWorkScreenData(workspaceSlug, projectSlug);
  const supabase = await createClient();

  // Fetch decisions for this project
  const { data: decisions } = await supabase
    .from("decisions")
    .select("*")
    .eq("project_id", cockpit.project.id)
    .order("created_at", { ascending: false });

  // Fetch sections (requirements) to allow linking decisions to requirements
  const { data: sections } = await supabase
    .from("sections")
    .select("*, documents!inner(project_id)")
    .eq("documents.project_id", cockpit.project.id);

  return (
    <div className="flex h-full w-full">
      <div className="flex-1 overflow-y-auto px-6">
        <WorkScreen scope={cockpit.milestoneLabel} data={data} />
      </div>
      
      <div className="w-96 border-l border-border/50 bg-surface/30 overflow-y-auto hidden 2xl:block">
        <div className="p-4">
          <DecisionLog 
            projectId={cockpit.project.id}
            initialDecisions={decisions || []}
            sections={sections || []}
            isReadOnly={cockpit.role === "advisor"}
          />
        </div>
      </div>
    </div>
  );
}
