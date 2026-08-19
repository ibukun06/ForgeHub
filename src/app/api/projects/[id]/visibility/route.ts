import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({ visibility: z.enum(["private", "published"]) });

/**
 * Separate from PATCH /api/projects/[id] on purpose — that route is a
 * full content edit (name/description/type together); this one toggles
 * a single, distinct concern (distribution state), and folding it into
 * the content-edit schema would've meant re-sending name/description/type
 * on every visibility flip just to satisfy that schema's required fields.
 */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in to publish this project." }, { status: 401 });

  const { data: membership } = await supabase
    .from("project_members")
    .select("role")
    .eq("project_id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership) {
    return NextResponse.json({ error: "You do not have access to this project." }, { status: 403 });
  }
  if (membership.role !== "team_lead") {
    return NextResponse.json({ error: "Only the team lead can change who this project is visible to." }, { status: 403 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Could not read the requested visibility." }, { status: 400 });
  }

  const { data: project, error } = await supabase
    .from("projects")
    .update({ visibility: parsed.data.visibility })
    .eq("id", projectId)
    .select("slug, visibility")
    .single();

  if (error || !project) {
    return NextResponse.json({ error: "We could not update visibility. Try again." }, { status: 500 });
  }

  return NextResponse.json({ visibility: project.visibility, slug: project.slug });
}
