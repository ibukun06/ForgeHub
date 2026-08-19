import { buttonVariants } from "@/components/ui/button";

export default function WorkspaceGeneralSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-text-primary">Workspace Settings</h1>
        <p className="mt-2 text-sm text-text-muted">Manage workspace branding, visibility, and defaults.</p>
      </div>

      <div className="surface-panel p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Workspace Name</label>
          <input 
            type="text" 
            defaultValue="ForgeHub" 
            className="w-full max-w-md bg-surface-muted border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Workspace URL slug</label>
          <div className="flex items-center">
            <span className="bg-surface border border-r-0 border-border rounded-l-md px-3 py-2 text-sm text-text-muted">forgehub.com/w/</span>
            <input 
              type="text" 
              defaultValue="forgehub" 
              className="w-full max-w-[250px] bg-surface-muted border border-border rounded-r-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <p className="text-xs text-text-muted mt-2">Warning: Changing the slug will break existing links.</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button className={buttonVariants({ variant: "primary" })}>Save workspace settings</button>
      </div>
    </div>
  );
}
