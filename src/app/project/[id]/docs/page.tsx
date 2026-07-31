import { createClient } from "@/lib/supabase/server";
import { DocumentationEditor } from "@/components/workspace/DocumentationEditor";

const PROMPTS: Record<string, string> = {
  problem_statement: "Who has the problem, what happens today, and what needs to change?",
  requirements: "What must this project do, and what constraints will shape the solution?",
  architecture: "What is the proposed solution made of, and why does this structure fit the problem?",
  testing_plan: "How will the team know the project works? Name the conditions, measures, and evidence.",
  decisions_log: "What important choices has the team made, and what alternatives did you consider?",
};

export default async function ProjectDocsPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ document?: string }> }) {
  const { id } = await params;
  const { document: selectedDocument } = await searchParams;
  const supabase = await createClient();
  const { data: documents } = await supabase.from("documents").select("id, title, document_type, sections(id, prompt, content, status, order, updated_at)").eq("project_id", id).order("created_at");
  const normalized = (documents ?? []).map((document) => ({
    id: document.id,
    title: document.title ?? document.document_type,
    type: document.document_type,
    sections: (Array.isArray(document.sections) ? document.sections : []).map((section) => ({ ...section, prompt: section.prompt ?? PROMPTS[document.document_type] ?? "What should the team record here?" })).sort((a, b) => a.order - b.order),
  }));
  const active = normalized.find((document) => document.id === selectedDocument) ?? normalized[0];
  return <DocumentationEditor projectId={id} documents={normalized} initialDocumentId={active?.id ?? null} />;
}
