import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/types";

/**
 * Supabase client for use in Server Components, Server Actions, and Route
 * Handlers. Per Part 3 of the synthesis, this is where real authorization
 * checks belong — RLS is defense-in-depth, not the only line of defense.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            const isSessionOnly = cookieStore.get("forgehub_session_pref")?.value === "session";
            cookiesToSet.forEach(({ name, value, options }) => {
              if (isSessionOnly) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { maxAge, expires, ...restOptions } = options;
                cookieStore.set(name, value, restOptions);
              } else {
                cookieStore.set(name, value, options);
              }
            });
          } catch {
            // Called from a Server Component that can't set cookies —
            // safe to ignore as long as middleware.ts is refreshing
            // sessions on every request.
          }
        },
      },
    }
  );
}
