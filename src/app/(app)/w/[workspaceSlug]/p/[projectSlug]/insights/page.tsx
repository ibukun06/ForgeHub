import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EngineeringGraph } from "@/components/workspace/engineering-graph";
import { PageIntro } from "@/components/app-shell/screens";
import { prettyLabel } from "@/components/app-shell/shell-config";

export default async function ProjectInsightsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 1. Get the project
  const { data: project } = await supabase
    .from("projects")
    .select("id, name")
    .eq("slug", projectSlug)
    .single();

  if (!project) {
    redirect(`/w/${workspaceSlug}`);
  }

  // 2. Fetch all graph nodes (Documents, Sections, Decisions)
  const [{ data: documents }, { data: sections }, { data: decisions }] = await Promise.all([
    supabase.from("documents").select("*").eq("project_id", project.id),
    supabase.from("sections").select("*"), // Using in-memory filter due to lack of JOIN in this schema pattern for now
    supabase.from("decisions").select("*").eq("project_id", project.id)
  ]);

  // Filter sections to only those belonging to our project's documents
  const docIds = new Set((documents || []).map(d => d.id));
  const projectSections = (sections || []).filter(s => docIds.has(s.document_id));

  return (
    <div className="flex flex-col h-full bg-background space-y-6 pb-20 lg:pb-6">
      <PageIntro
        title="Engineering Graph"
        description={`Visual dependency mapping of requirements, documents, and architectural decisions for ${prettyLabel(projectSlug)}.`}
      />
      
      <div className="flex-1 min-h-[500px]">
        <EngineeringGraph 
          documents={documents || []} 
          sections={projectSections} 
          decisions={decisions || []} 
        />
      </div>
    </div>
  );
}
