"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const supabase = createClient();
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      // If the user's session expires or they log out in another tab
      if (event === "SIGNED_OUT") {
        // Only redirect if we are on a protected route
        if (!pathname.startsWith("/login") && !pathname.startsWith("/signup")) {
          router.push(`/login?redirectTo=${encodeURIComponent(pathname)}`);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, pathname]);

  return <>{children}</>;
}
