import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  decision: z.string().trim().min(1, "The decision is required").max(120),
  rationale: z.string().trim().min(1, "Rationale is required").max(1000),
  alternatives: z.string().trim().max(1000).optional().nullable(),
});

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in to log a decision." }, { status: 401 });

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
    return NextResponse.json({ error: "Check the decision, rationale, and alternatives fields." }, { status: 400 });
  }

  const { data: decision, error } = await supabase
    .from("decisions")
    .insert({
      project_id: projectId,
      decision: parsed.data.decision,
      rationale: parsed.data.rationale,
      alternatives: parsed.data.alternatives || null,
      logged_by: user.id,
    })
    .select("id")
    .single();

  if (error || !decision) {
    return NextResponse.json({ error: "We could not save the decision. Try again." }, { status: 500 });
  }

  return NextResponse.json({ decisionId: decision.id }, { status: 201 });
}
