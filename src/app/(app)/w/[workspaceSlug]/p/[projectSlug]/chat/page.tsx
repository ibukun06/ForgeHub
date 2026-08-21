import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ConversationFeed } from "@/components/workspace/ConversationFeed";

export default async function ProjectConversationPage({
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

  // Fetch comments linked to sections linked to documents linked to this project.
  // Supabase postgREST can handle nested joins, but since we are fetching from 'comments'
  // we need to filter by the project ID.
  const { data: comments } = await supabase
    .from("comments")
    .select(`
      id,
      content,
      resolved,
      created_at,
      author:users!author_id (name, email),
      section:sections!inner (
        id,
        prompt,
        document:documents!inner (
          title,
          document_type,
          project_id
        )
      )
    `)
    .eq("sections.documents.project_id", project.id)
    .order("created_at", { ascending: false });

  // Typecasting to match the Component structure
  // In a production setup, we'd define generic helper types to unwrap Supabase results.
  type CommentRow = {
    id: string;
    content: string;
    resolved: boolean;
    created_at: string;
    author: { name: string | null; email: string } | null;
    section: {
      id: string;
      prompt: string | null;
      document: { title: string | null; document_type: string };
    };
  };

  const formattedComments = (comments ?? []).map((c) => {
    const comment = c as unknown as CommentRow;
    return {
      id: comment.id,
      content: comment.content,
      resolved: comment.resolved,
      created_at: comment.created_at,
      author: {
        name: comment.author?.name || null,
        email: comment.author?.email || "unknown",
      },
      section: {
        id: comment.section.id,
        prompt: comment.section.prompt,
        document: {
          title: comment.section.document.title || comment.section.document.document_type,
          type: comment.section.document.document_type,
        },
      },
    };
  });

  return (
    <div className="flex h-full flex-col p-4 md:p-8">
      <ConversationFeed projectId={project.id} comments={formattedComments} />
    </div>
  );
}
