import { createClient } from "@/lib/supabase/server";
import { buttonVariants } from "@/components/ui/button";

export default async function AccountSettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-text-primary">Account</h1>
        <p className="mt-2 text-sm text-text-muted">Manage your email, password, and authentication methods.</p>
      </div>

      <div className="surface-panel p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Email address</label>
          <input 
            type="email" 
            defaultValue={user?.email || ""}
            disabled
            className="w-full max-w-md bg-surface border border-border/50 rounded-md px-3 py-2 text-sm text-text-muted cursor-not-allowed"
          />
          <p className="text-xs text-text-muted mt-2">Your email address cannot be changed currently.</p>
        </div>
      </div>

      <div className="surface-panel p-6 border-warning/20">
        <h2 className="text-lg font-medium text-text-primary mb-2">Change Password</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">New password</label>
            <input 
              type="password" 
              className="w-full bg-surface-muted border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Confirm new password</label>
            <input 
              type="password" 
              className="w-full bg-surface-muted border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className={buttonVariants({ variant: "secondary" })}>Update password</button>
        </div>
      </div>

      <div className="surface-panel p-6 border-error/20 bg-error/5">
        <h2 className="text-lg font-medium text-error mb-2">Danger Zone</h2>
        <p className="text-sm text-text-muted mb-4">Permanently delete your account and all associated data.</p>
        <button className={`${buttonVariants({ variant: "outline" })} text-error border-error/50 hover:bg-error/10`}>Delete account</button>
      </div>
    </div>
  );
}
