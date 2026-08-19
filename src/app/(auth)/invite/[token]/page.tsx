import { notFound, redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { Mail, CheckCircle, AlertTriangle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { acceptInviteAction } from "./actions";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  
  // 1. Fetch current user session
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Fetch invite details safely bypassing RLS
  let adminClient;
  try {
    adminClient = createAdminClient();
  } catch (e) {
    // If the admin client fails (e.g. missing keys), we can't show the preview.
    console.error(e);
    return (
      <div className="text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-warning mx-auto" />
        <h1 className="font-heading text-2xl text-text-primary">System Error</h1>
        <p className="text-text-muted">Unable to process invitations at this time. Missing service role configuration.</p>
      </div>
    );
  }

  const { data: invite, error } = await adminClient
    .from("invites")
    .select(`
      id,
      email,
      role,
      expires_at,
      accepted_at,
      projects ( name, workspaces(slug) ),
      users ( name, email )
    `)
    .eq("token", token)
    .single();

  if (error || !invite) {
    return (
      <div className="text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-error mx-auto" />
        <h1 className="font-heading text-2xl text-text-primary">Invalid Invitation</h1>
        <p className="text-text-muted">This invitation link is invalid, expired, or has already been used.</p>
      </div>
    );
  }

  const isExpired = new Date(invite.expires_at) < new Date();
  if (isExpired || invite.accepted_at) {
    return (
      <div className="text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-warning mx-auto" />
        <h1 className="font-heading text-2xl text-text-primary">Invitation Expired</h1>
        <p className="text-text-muted">This invitation has expired or was already accepted.</p>
      </div>
    );
  }

  const projectName = Array.isArray(invite.projects) ? invite.projects[0]?.name : (invite.projects as { name: string } | null)?.name;
  const inviter = Array.isArray(invite.users) ? invite.users[0] : (invite.users as { name: string | null; email: string } | null);
  const inviterName = inviter?.name || inviter?.email || "Someone";

  // If the user isn't logged in, prompt them
  if (!user) {
    return (
      <div className="text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <h1 className="font-heading text-2xl text-text-primary">You've been invited!</h1>
        <p className="text-text-muted">
          {inviterName} has invited you to join <strong>{projectName}</strong> as a {invite.role}.
        </p>
        <div className="pt-4 space-y-3">
          <p className="text-sm text-text-muted">Sign in or create an account to accept.</p>
          <div className="flex flex-col gap-2">
            <a href={`/login?redirectTo=/invite/${token}`} className={buttonVariants({ variant: "primary", className: "w-full" })}>
              Sign In
            </a>
            <a href={`/signup?redirectTo=/invite/${token}`} className={buttonVariants({ variant: "outline", className: "w-full" })}>
              Create Account
            </a>
          </div>
        </div>
      </div>
    );
  }

  // User is logged in. Let's verify their email matches if we care, or just let anyone accept.
  // We'll let the user accept, but show a warning if email differs.
  const emailWarning = user.email !== invite.email;

  return (
    <div className="text-center space-y-4">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
        <CheckCircle className="h-6 w-6 text-success" />
      </div>
      <h1 className="font-heading text-2xl text-text-primary">Accept Invitation</h1>
      <p className="text-text-muted">
        {inviterName} has invited you to join <strong>{projectName}</strong> as a {invite.role}.
      </p>

      {emailWarning && (
        <div className="bg-warning/10 border border-warning/30 rounded p-3 text-sm text-left">
          <strong>Note:</strong> This invitation was sent to {invite.email}, but you are signed in as {user.email}. You can still accept it.
        </div>
      )}

      <form action={async () => {
        "use server";
        const result = await acceptInviteAction(token);
        if (result.success && result.redirectUrl) {
          redirect(result.redirectUrl);
        } else {
          // In a real app we'd pass this error back to the client, but for now redirecting back to the token page to re-render will show the error if the invite is now invalid, or we can just throw.
          throw new Error(result.error || "Failed to accept");
        }
      }}>
        <button type="submit" className={buttonVariants({ variant: "primary", className: "w-full mt-4" })}>
          Join Project
        </button>
      </form>
    </div>
  );
}
