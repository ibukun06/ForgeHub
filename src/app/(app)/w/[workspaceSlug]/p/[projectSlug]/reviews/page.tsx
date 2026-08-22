import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { relativeTime } from "@/lib/format";
import { Check, Clock, FileText } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function ProjectReviewsPage({
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

  // Fetch role
  let role = "advisor";
  if (user) {
    const { data: memberData } = await supabase
      .from("project_members")
      .select("role")
      .eq("project_id", project.id)
      .eq("user_id", user.id)
      .maybeSingle();
    
    if (memberData) {
      role = memberData.role;
    }
  }
  const canApprove = role !== "advisor";

  // Fetch sections needing review
  const { data: sections } = await supabase
    .from("sections")
    .select("*, documents!inner(project_id, title)")
    .eq("documents.project_id", project.id)
    .neq("status", "team_reviewed")
    .order("updated_at", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8 h-full overflow-y-auto">
      <div className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-secondary mb-3">
          Peer Review
        </p>
        <h1 className="font-heading text-4xl text-text-primary tracking-tight">
          Review Queue
        </h1>
        <p className="mt-4 text-text-muted">
          Sections drafted by AI or peers that require formal approval before merging to the main project graph.
        </p>
      </div>

      {!sections || sections.length === 0 ? (
        <EmptyState 
          icon={Check} 
          title="All caught up" 
          description="There are no sections pending review in this project."
        />
      ) : (
        <div className="space-y-6">
          {sections.map(section => (
            <Card key={section.id} className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary/80" />
              <CardHeader className="pb-3 pl-6 flex flex-row items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-secondary mb-1 block">
                    {section.documents.title || "Document"}
                  </span>
                  <CardTitle className="text-xl leading-tight">
                    {section.prompt || "Draft Section"}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted whitespace-nowrap bg-surface px-2 py-1 rounded-md border border-border">
                  <Clock className="h-3 w-3" />
                  {relativeTime(section.updated_at)}
                </div>
              </CardHeader>
              <CardContent className="pl-6 space-y-4">
                <div className="bg-surface border border-border p-4 rounded-lg prose prose-sm dark:prose-invert max-w-none max-h-48 overflow-y-hidden relative">
                  <div dangerouslySetInnerHTML={{ __html: section.content || "<p class='text-text-muted italic'>Empty section</p>" }} />
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <form action={async () => {
                    "use server";
                    const { approveSection } = await import("@/lib/actions/docs");
                    await approveSection(section.id);
                  }}>
                    <Button type="submit" disabled={!canApprove} title={!canApprove ? "Mentors/Viewers cannot approve." : ""}>
                      <Check className="mr-2 h-4 w-4" />
                      Approve & Merge
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
