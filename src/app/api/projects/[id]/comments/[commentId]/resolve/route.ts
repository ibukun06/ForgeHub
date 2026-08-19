import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string; commentId: string }> }) {
  const { id: projectId, commentId } = await params;
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in to resolve a comment." }, { status: 401 });

  const { data: membership } = await supabase
    .from("project_members")
    .select("role")
    .eq("project_id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership) {
    return NextResponse.json({ error: "You do not have access to this project." }, { status: 403 });
  }

  // Verify the comment exists and belongs to this project
  const { data: comment } = await supabase
    .from("comments")
    .select("id, sections!inner(documents!inner(project_id))")
    .eq("id", commentId)
    .single();

  if (!comment || (comment.sections as { documents: { project_id: string } }).documents.project_id !== projectId) {
    return NextResponse.json({ error: "Invalid comment." }, { status: 400 });
  }

  const { error } = await supabase
    .from("comments")
    .update({
      resolved: true,
      resolved_by: user.id,
    })
    .eq("id", commentId);

  if (error) {
    return NextResponse.json({ error: "We could not resolve the comment. Try again." }, { status: 500 });
  }

  return NextResponse.json({ resolved: true }, { status: 200 });
}
