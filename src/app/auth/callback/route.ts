import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && sessionData.user) {
      // Check profile completeness — route to onboarding if the user
      // hasn't set their display name yet, otherwise to dashboard.
      const { data: profile } = await supabase
        .from("users")
        .select("name")
        .eq("id", sessionData.user.id)
        .single();

      const destination = profile?.name ? "/dashboard" : "/onboarding";
      return NextResponse.redirect(`${origin}${destination}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=verification_failed`);
}
