import { createClient } from "@/lib/supabase/server";
import { WorkspaceOverview } from "@/components/workspace/WorkspaceOverview";
import { WORKSPACE_OVERVIEW } from "@/components/workspace/data";

export default async function ProjectOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: documents }, { count: memberCount }, { count: decisionCount }] = await Promise.all([
    supabase.from("documents").select("id, title, document_type, sections(id, status)").eq("project_id", id),
    supabase.from("project_members").select("id", { count: "exact", head: true }).eq("project_id", id),
    supabase.from("decisions").select("id", { count: "exact", head: true }).eq("project_id", id),
  ]);

  const sectionRows = (documents ?? []).flatMap((document) => Array.isArray(document.sections) ? document.sections : []);
  const reviewed = sectionRows.filter((section) => section.status === "team_reviewed").length;
  const completeness = sectionRows.length ? Math.round((reviewed / sectionRows.length) * 100) : WORKSPACE_OVERVIEW.stats.completeness;
  const overview = {
    ...WORKSPACE_OVERVIEW,
    stats: { ...WORKSPACE_OVERVIEW.stats, completeness, recentUpdates: `${decisionCount ?? 0} decisions logged` },
    documents: documents?.length ? documents.map((document, index) => ({
      id: document.id,
      title: document.title ?? document.document_type,
      status: (Array.isArray(document.sections) && document.sections.some((section) => section.status === "team_reviewed") ? "reviewed" : "in_progress") as "reviewed" | "in_progress",
      owner: index === 0 ? "Project team" : "Assigned contributor",
      updated: "Recently",
    })) : WORKSPACE_OVERVIEW.documents,
    team: WORKSPACE_OVERVIEW.team.slice(0, Math.max(1, Math.min(memberCount ?? 1, 4))),
  };

  return <WorkspaceOverview projectId={id} data={overview} />;
}
