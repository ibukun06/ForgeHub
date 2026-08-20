"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

export type OAuthProvider = "github" | "google" | "linkedin_oidc";

/**
 * Initiates an OAuth sign-in flow with the given provider.
 * Returns the provider's authorization URL for client-side redirect.
 */
export async function signInWithOAuth(provider: OAuthProvider) {
  const supabase = await createClient();
  const headerStore = await headers();
  const origin = headerStore.get("origin") ?? "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }

  return { error: "Could not initiate OAuth flow." };
}
