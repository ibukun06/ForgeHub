import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  sectionId: z.string().trim().min(1, "Section ID is required"),
  content: z.string().trim().min(1, "Comment content is required").max(2000),
});

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in to post a comment." }, { status: 401 });

  const { data: membership } = await supabase
    .from("project_members")
    .select("role")
    .eq("project_id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership) {
    return NextResponse.json({ error: "You do not have access to this project." }, { status: 403 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Check the comment content." }, { status: 400 });
  }

  // Ensure the section belongs to this project
  const { data: section } = await supabase
    .from("sections")
    .select("id, document_id, documents!inner(project_id)")
    .eq("id", parsed.data.sectionId)
    .single();

  if (!section || section.documents.project_id !== projectId) {
    return NextResponse.json({ error: "Invalid section for this project." }, { status: 400 });
  }

  const { data: comment, error } = await supabase
    .from("comments")
    .insert({
      section_id: parsed.data.sectionId,
      author_id: user.id,
      content: parsed.data.content,
    })
    .select("id")
    .single();

  if (error || !comment) {
    return NextResponse.json({ error: "We could not save the comment. Try again." }, { status: 500 });
  }

  return NextResponse.json({ commentId: comment.id }, { status: 201 });
}
