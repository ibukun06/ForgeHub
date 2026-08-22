import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/signup", "/reset-password", "/auth", "/explore", "/projects", "/profile", "/invite"];

function isPublicPath(pathname: string) {
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) return true;
  if (pathname === "/") return true;
  return false;
}

/**
 * Refreshes the Supabase auth session on every request and redirects
 * unauthenticated users away from protected routes. Route Handlers/Server
 * Actions still re-check permissions themselves — this is the first gate,
 * not the only one (Part 3: "authorization enforced at the API layer, not
 * just hidden in the UI").
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  const supabase = createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          const isSessionOnly = request.cookies.get("forgehub_session_pref")?.value === "session";
          cookiesToSet.forEach(({ name, value, options }) => {
            if (isSessionOnly) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { maxAge, expires, ...restOptions } = options;
              supabaseResponse.cookies.set(name, value, restOptions);
            } else {
              supabaseResponse.cookies.set(name, value, options);
            }
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthPath = ["/login", "/signup", "/reset-password"].some((p) =>
    request.nextUrl.pathname.startsWith(p)
  );

  // If logged in and trying to access an auth page (login/signup), redirect to dashboard or intended location.
  // We explicitly DO NOT redirect if they visit "/" because authenticated users should be able to view the landing page.
  if (user && isAuthPath) {
    let redirectTo = request.nextUrl.searchParams.get("redirectTo") || "/dashboard";
    if (["/login", "/signup", "/reset-password"].some(p => redirectTo.startsWith(p))) {
      redirectTo = "/dashboard";
    }
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = redirectTo;
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  // If not logged in and trying to access a protected route, redirect to login
  if (!user && !isPublicPath(request.nextUrl.pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
