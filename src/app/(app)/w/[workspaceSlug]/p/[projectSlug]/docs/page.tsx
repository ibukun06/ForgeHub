import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DocEditor } from "@/components/workspace/doc-editor";
import { DecisionLog } from "@/components/workspace/decision-log";

export default async function ProjectKnowledgePage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  let targetWorkspaceId: string | undefined;
  const { data: ws } = await supabase.from("workspaces").select("id").eq("slug", workspaceSlug).maybeSingle();
  if (ws) {
    targetWorkspaceId = ws.id;
  }

  let query = supabase.from("projects").select("id").eq("slug", projectSlug);
  if (targetWorkspaceId) {
    query = query.eq("workspace_id", targetWorkspaceId);
  }
  const { data: project } = await query.maybeSingle();

  if (!project) {
    notFound();
  }

  // 0. Fetch the user's role to enforce RBAC
  let isReadOnly = false;
  if (user) {
    const { data: memberData } = await supabase
      .from("project_members")
      .select("role")
      .eq("project_id", project.id)
      .eq("user_id", user.id)
      .maybeSingle();
    
    // Disable mutations for advisors/viewers
    if (memberData?.role === "advisor") {
      isReadOnly = true;
    }
  }

  // 1. Fetch the default Architecture document for this project
  let { data: document } = await supabase
    .from("documents")
    .select("*")
    .eq("project_id", project.id)
    .eq("document_type", "architecture")
    .maybeSingle();

  // 2. If it doesn't exist, create it (Auto-scaffolding Phase 3 MVP)
  if (!document) {
    const { data: newDoc, error: docError } = await supabase
      .from("documents")
      .insert({
        project_id: project.id,
        document_type: "architecture",
        title: "Architecture & Design",
      })
      .select()
      .single();
    
    if (docError || !newDoc) {
      console.error("Failed to create default document:", docError);
      return <div>Error initializing document.</div>;
    }
    document = newDoc;
  }

  // 3. Fetch the sections for this document
  let { data: sections } = await supabase
    .from("sections")
    .select("*")
    .eq("document_id", document.id)
    .order("order", { ascending: true });

  // 4. If no sections exist, create an initial one
  if (!sections || sections.length === 0) {
    const { data: newSection, error: secError } = await supabase
      .from("sections")
      .insert({
        document_id: document.id,
        content: "<p>Start writing your technical documentation here...</p>",
        order: 0,
      })
      .select()
      .single();
      
    if (secError || !newSection) {
      console.error("Failed to create default section:", secError);
      return <div>Error initializing section.</div>;
    }
    sections = [newSection];
  }

  // 5. Fetch decisions for the sidebar
  const { data: decisions } = await supabase
    .from("decisions")
    .select("*")
    .eq("project_id", project.id)
    .order("created_at", { ascending: false });

  // Use a client component to handle the layout if we wanted tabs, but we can just do CSS layout here.
  // Wait, DecisionLog takes `projectId`, `initialDecisions`, and `sections`.
  // We need to import it at the top. Let's make sure it's imported.

  return (
    <div className="flex h-full w-full">
      <div className="flex-1 overflow-y-auto">
        <DocEditor 
          documentId={document.id}
          sectionId={sections[0].id}
          initialContent={sections[0].content || ""}
          isReadOnly={isReadOnly}
        />
      </div>
      
      <div className="w-96 border-l border-border/50 bg-surface/30 overflow-y-auto hidden lg:block">
        <div className="p-4">
          <DecisionLog 
            projectId={project.id}
            initialDecisions={decisions || []}
            sections={sections}
            isReadOnly={isReadOnly}
          />
        </div>
      </div>
    </div>
  );
}
