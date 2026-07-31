import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const saveSchema = z.object({ sectionId: z.string().uuid(), documentId: z.string().uuid(), content: z.string().max(100000) });
const createSchema = z.object({ documentId: z.string().uuid(), prompt: z.string().min(1).max(500) });

async function getEditor(request: Request, projectId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, error: NextResponse.json({ error: "Sign in to edit documentation." }, { status: 401 }) };
  const { data: membership } = await supabase.from("project_members").select("role").eq("project_id", projectId).eq("user_id", user.id).maybeSingle();
  if (!membership || !["team_lead", "contributor"].includes(membership.role)) return { supabase, error: NextResponse.json({ error: "You do not have edit access to this project." }, { status: 403 }) };
  return { supabase, user };
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = await params;
  const { supabase, error, user } = await getEditor(request, projectId);
  if (error || !user) return error;
  const parsed = createSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Add a useful prompt before creating the section." }, { status: 400 });
  const { data: document } = await supabase.from("documents").select("id").eq("id", parsed.data.documentId).eq("project_id", projectId).maybeSingle();
  if (!document) return NextResponse.json({ error: "That document is not part of this project." }, { status: 404 });
  const { count } = await supabase.from("sections").select("id", { count: "exact", head: true }).eq("document_id", parsed.data.documentId);
  const { data: section, error: insertError } = await supabase.from("sections").insert({ document_id: parsed.data.documentId, prompt: parsed.data.prompt, order: count ?? 0, status: "not_started" }).select("id, prompt, content, status, order, updated_at").single();
  if (insertError || !section) return NextResponse.json({ error: "We could not create that section." }, { status: 500 });
  return NextResponse.json({ section }, { status: 201 });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = await params;
  const { supabase, error, user } = await getEditor(request, projectId);
  if (error || !user) return error;
  const parsed = saveSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "The documentation could not be saved." }, { status: 400 });
  const { data: document } = await supabase.from("documents").select("id").eq("id", parsed.data.documentId).eq("project_id", projectId).maybeSingle();
  if (!document) return NextResponse.json({ error: "That document is not part of this project." }, { status: 404 });
  const { error: updateError } = await supabase.from("sections").update({ content: parsed.data.content, last_edited_by: user.id, updated_at: new Date().toISOString() }).eq("id", parsed.data.sectionId).eq("document_id", parsed.data.documentId);
  if (updateError) return NextResponse.json({ error: "We could not save this section. Your text is still on screen." }, { status: 500 });
  return NextResponse.json({ saved: true });
}
