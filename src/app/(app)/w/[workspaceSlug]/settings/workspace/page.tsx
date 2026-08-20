export default async function WorkspaceSettingsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const decodedSlug = decodeURIComponent(workspaceSlug);

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-5">
        <h2 className="font-heading text-2xl text-text-primary">Workspace General</h2>
        <p className="mt-2 text-sm text-text-muted">
          Manage the settings, branding, and details of this workspace.
        </p>
      </div>

      <div className="surface-panel p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
            Workspace Information
          </h3>
          <div className="grid gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
                Workspace Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                defaultValue={decodedSlug}
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-text-primary mb-1">
                Workspace URL (Slug)
              </label>
              <div className="flex rounded-md border border-border shadow-sm">
                <span className="inline-flex items-center rounded-l-md border-r border-border bg-surface-muted px-3 text-sm text-text-muted">
                  forgehub.com/w/
                </span>
                <input
                  id="slug"
                  type="text"
                  className="w-full min-w-0 flex-1 rounded-none rounded-r-md bg-surface px-3 py-2 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  defaultValue={decodedSlug}
                />
              </div>
              <p className="mt-1 text-xs text-text-muted">Changing the slug can break existing links.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="signal-pill signal-pill-brand">Save Changes</button>
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
            Danger Zone
          </h3>
          <div className="rounded-lg border border-error/20 bg-error/5 p-4">
            <h4 className="font-medium text-error mb-2">Delete Workspace</h4>
            <p className="text-sm text-text-muted mb-4">
              Permanently delete this workspace and all associated projects, documents, and data. This action cannot be undone.
            </p>
            <button className="signal-pill signal-pill-danger">Delete workspace</button>
          </div>
        </div>
      </div>
    </div>
  );
}
