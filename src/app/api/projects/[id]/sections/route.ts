import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({ sectionId: z.string().uuid(), documentId: z.string().uuid(), content: z.string().max(100000) });

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in to edit documentation." }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "The documentation could not be saved." }, { status: 400 });

  const { data: membership } = await supabase.from("project_members").select("role").eq("project_id", projectId).eq("user_id", user.id).maybeSingle();
  if (!membership || !["team_lead", "contributor"].includes(membership.role)) return NextResponse.json({ error: "You do not have edit access to this project." }, { status: 403 });
  const { data: document } = await supabase.from("documents").select("id").eq("id", parsed.data.documentId).eq("project_id", projectId).maybeSingle();
  if (!document) return NextResponse.json({ error: "That document is not part of this project." }, { status: 404 });

  const { error } = await supabase.from("sections").update({ content: parsed.data.content, status: "ai_draft", last_edited_by: user.id, updated_at: new Date().toISOString() }).eq("id", parsed.data.sectionId).eq("document_id", parsed.data.documentId);
  if (error) return NextResponse.json({ error: "We could not save this section. Your text is still on screen." }, { status: 500 });
  return NextResponse.json({ saved: true });
}
