import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Admin client using the Service Role Key.
 * WARNING: This bypasses Row Level Security completely.
 * ONLY use this in Server Components or Server Actions where RLS needs to be intentionally bypassed
 * (e.g. fetching invite details before a user is authenticated or a member of a project).
 */
export function createAdminClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase URL or Service Role Key in environment.");
  }
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
