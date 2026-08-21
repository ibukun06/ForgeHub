export default async function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-5">
        <h2 className="font-heading text-2xl text-text-primary">Account Security</h2>
        <p className="mt-2 text-sm text-text-muted">
          Manage your login credentials, email addresses, and active sessions.
        </p>
      </div>

      <div className="surface-panel p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
            Email Configuration
          </h3>
          <div className="grid gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
                Primary Email
              </label>
              <input
                id="email"
                type="email"
                disabled
                className="w-full rounded-md border border-border bg-surface-muted px-3 py-2 text-sm text-text-muted cursor-not-allowed"
                defaultValue="ibukun@example.com"
              />
              <p className="mt-1 text-xs text-text-muted">Your email address is managed through Supabase Auth.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
            Danger Zone
          </h3>
          <div className="rounded-lg border border-error/20 bg-error/5 p-4">
            <h4 className="font-medium text-error mb-2">Delete Account</h4>
            <p className="text-sm text-text-muted mb-4">
              Permanently remove your account, profile, and all associations with any workspaces. This action cannot be undone.
            </p>
            <button className="signal-pill signal-pill-danger">Delete my account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
