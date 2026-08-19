import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell/app-shell";
import { createClient } from "@/lib/supabase/server";
import { AuthProvider } from "@/components/auth/auth-provider";

export default async function AuthenticatedAppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const displayName =
    user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "ForgeHub Builder";

  return (
    <AuthProvider>
      <AppShell
        user={{
          displayName,
          email: user.email ?? "",
        }}
      >
        {children}
      </AppShell>
    </AuthProvider>
  );
}
