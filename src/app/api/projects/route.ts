import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { generateUniqueProjectSlug } from "@/lib/slug";

const schema = z.object({
  name: z.string().trim().min(1, "Project name is required").max(120),
  description: z.string().max(500),
  projectType: z.enum(["hardware", "software", "research", "multidisciplinary", "other"]),
  documents: z.array(z.enum(["problem_statement", "requirements", "architecture", "testing_plan", "decisions_log"])).min(1),
  workspaceSlug: z.string().optional(),
});

const titles: Record<string, string> = {
  problem_statement: "Problem Statement",
  requirements: "Requirements",
  architecture: "Architecture / Design",
  testing_plan: "Testing Plan",
  decisions_log: "Decisions Log",
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in before creating a project." }, { status: 401 });

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Check the project name, description, type, and documents." }, { status: 400 });
  if (!parsed.data.documents.includes("problem_statement")) return NextResponse.json({ error: "A Problem Statement is required to start a project." }, { status: 400 });

  const normalizedName = parsed.data.name.toLocaleLowerCase();
  const { data: duplicate } = await supabase.from("projects").select("id").eq("created_by", user.id).ilike("name", normalizedName).maybeSingle();
  if (duplicate) return NextResponse.json({ error: "You already have a project with that name." }, { status: 409 });

  let workspaceId: string | undefined;
  if (parsed.data.workspaceSlug) {
    const { data: ws } = await supabase.from("workspaces").select("id").eq("slug", parsed.data.workspaceSlug).maybeSingle();
    workspaceId = ws?.id;
  }
  if (!workspaceId) {
    const { data: ws } = await supabase.from("workspace_members").select("workspace_id").eq("user_id", user.id).limit(1).maybeSingle();
    workspaceId = ws?.workspace_id;
  }
  if (!workspaceId) return NextResponse.json({ error: "No workspace available." }, { status: 400 });

  const slug = await generateUniqueProjectSlug(supabase, parsed.data.name);
  const { error: insertError } = await supabase.from("projects").insert({ name: parsed.data.name, description: parsed.data.description || null, project_type: parsed.data.projectType, created_by: user.id, visibility: "private", slug, workspace_id: workspaceId });
  if (insertError) {
    console.error("Project insertion error:", insertError);
    return NextResponse.json({ error: "We could not create the project. Try again." }, { status: 500 });
  }
  const { data: project, error: projectError } = await supabase.from("projects").select("id, slug").eq("slug", slug).single();
  if (projectError || !project) {
    console.error("Project select error:", projectError);
    return NextResponse.json({ error: "We could not fetch the project. Try again." }, { status: 500 });
  }

  const documentRows = parsed.data.documents.map((documentType) => ({ project_id: project.id, document_type: documentType, title: titles[documentType] }));
  const { error: documentError } = await supabase.from("documents").insert(documentRows);
  if (documentError) {
    await supabase.from("projects").delete().eq("id", project.id).eq("created_by", user.id);
    return NextResponse.json({ error: "The project could not finish setting itself up. Nothing was saved." }, { status: 500 });
  }

  return NextResponse.json({ projectId: project.id, slug: project.slug }, { status: 201 });
}
