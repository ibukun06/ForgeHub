import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().trim().min(1, "Project name is required").max(120),
  description: z.string().max(500),
  projectType: z.enum(["hardware", "software", "research", "multidisciplinary", "other"]),
});

/**
 * Deliberately does not accept `slug` — per src/lib/slug.ts, a project's
 * slug is generated once at creation and never re-derived, so renaming a
 * project here can't silently break its existing URL.
 */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in to edit this project." }, { status: 401 });

  // API-layer check, matching this codebase's stated principle that
  // authorization lives here first — RLS's projects_update policy
  // (member_role_on(id) = 'team_lead') is the defense-in-depth backstop
  // behind it, not the only check.
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
    return NextResponse.json({ error: "Only the team lead can edit project details." }, { status: 403 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Check the project name, description, and type." }, { status: 400 });
  }

  const normalizedName = parsed.data.name.toLocaleLowerCase();
  const { data: duplicate } = await supabase
    .from("projects")
    .select("id")
    .eq("created_by", user.id)
    .ilike("name", normalizedName)
    .neq("id", projectId)
    .maybeSingle();
  if (duplicate) {
    return NextResponse.json({ error: "You already have another project with that name." }, { status: 409 });
  }

  const { error } = await supabase
    .from("projects")
    .update({
      name: parsed.data.name,
      description: parsed.data.description || null,
      project_type: parsed.data.projectType,
    })
    .eq("id", projectId);

  if (error) {
    return NextResponse.json({ error: "We could not save those changes. Try again." }, { status: 500 });
  }

  return NextResponse.json({ saved: true });
}
