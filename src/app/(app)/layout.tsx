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

  const { data: workspaceMembers } = await supabase
    .from("workspace_members")
    .select("workspace_id, workspaces!inner(id, slug, name)")
    .eq("user_id", user.id);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const workspaces = (workspaceMembers || []).map((m: any) => ({
    id: m.workspaces.id,
    slug: m.workspaces.slug,
    name: m.workspaces.name,
  }));

  return (
    <AuthProvider>
      <AppShell
        user={{
          ...user,
          displayName,
          email: user.email ?? "",
        }}
        workspaces={workspaces}
      >
        {children}
      </AppShell>
    </AuthProvider>
  );
}
