import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DocumentationEditor } from "@/components/workspace/DocumentationEditor";

// Same prompt set the legacy /project/[id]/docs route used — carried
// over as-is, not reinvented, since the content was already right.
const PROMPTS: Record<string, string> = {
  problem_statement: "Who has the problem, what happens today, and what needs to change?",
  requirements: "What must this project do, and what constraints will shape the solution?",
  architecture: "What is the proposed solution made of, and why does this structure fit the problem?",
  testing_plan: "How will the team know the project works? Name the conditions, measures, and evidence.",
  decisions_log: "What important choices has the team made, and what alternatives did you consider?",
};

/**
 * This is the real documentation editor now, not a read-only summary —
 * ported over from the retired /project/[id]/docs route as part of the
 * workspace consolidation. It's functional parity, not a redesign: same
 * component, same two API routes (/api/projects/[id]/sections), just
 * reached through the app-shell instead of the standalone legacy shell,
 * and resolved by the project's real slug instead of a raw id.
 *
 * Known gap, not silently dropped: the old KnowledgeScreen here also
 * surfaced a read-only Decisions + research-library summary alongside
 * the doc list. That's genuinely different content from "edit a
 * section," and folding it back in (as a sidebar or a second tab) is
 * follow-up polish, not part of this milestone.
 */
export default async function ProjectKnowledgePage({
  params,
  searchParams,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
  searchParams: Promise<{ document?: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  const { document: selectedDocument } = await searchParams;
  const supabase = await createClient();

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

  const { data: documents } = await supabase
    .from("documents")
    .select("id, title, document_type, sections(id, prompt, content, status, order, updated_at)")
    .eq("project_id", project.id)
    .order("created_at");

  const normalized = (documents ?? []).map((document) => ({
    id: document.id,
    title: document.title ?? document.document_type,
    type: document.document_type,
    sections: (Array.isArray(document.sections) ? document.sections : [])
      .map((section) => ({
        ...section,
        prompt: section.prompt ?? PROMPTS[document.document_type] ?? "What should the team record here?",
      }))
      .sort((a, b) => a.order - b.order),
  }));

  const active = normalized.find((document) => document.id === selectedDocument) ?? normalized[0];

  return <DocumentationEditor projectId={project.id} documents={normalized} initialDocumentId={active?.id ?? null} />;
}
