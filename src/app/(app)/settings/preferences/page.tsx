import { buttonVariants } from "@/components/ui/button";

export default function PreferencesSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-text-primary">Preferences</h1>
        <p className="mt-2 text-sm text-text-muted">Customize your ForgeHub interface and application behavior.</p>
      </div>

      <div className="surface-panel p-6 space-y-6">
        <div>
          <h2 className="text-lg font-medium text-text-primary mb-4">Appearance</h2>
          
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="radio" name="theme" defaultChecked className="mt-1" />
              <div>
                <p className="font-medium text-text-primary">System preference</p>
                <p className="text-sm text-text-muted">Automatically switch between light and dark themes based on your system.</p>
              </div>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="radio" name="theme" className="mt-1" />
              <div>
                <p className="font-medium text-text-primary">Dark</p>
                <p className="text-sm text-text-muted">High-contrast dark mode optimized for technical workspaces.</p>
              </div>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="radio" name="theme" className="mt-1" />
              <div>
                <p className="font-medium text-text-primary">Light</p>
                <p className="text-sm text-text-muted">Clean, bright interface for daytime use.</p>
              </div>
            </label>
          </div>
        </div>
      </div>
      
      <div className="surface-panel p-6 space-y-6">
        <div>
          <h2 className="text-lg font-medium text-text-primary mb-4">Notifications</h2>
          
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-1" />
              <div>
                <p className="font-medium text-text-primary">In-app notifications</p>
                <p className="text-sm text-text-muted">Receive updates in the ForgeHub Inbox.</p>
              </div>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1" />
              <div>
                <p className="font-medium text-text-primary">Email summaries</p>
                <p className="text-sm text-text-muted">Receive a daily digest of project activity.</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className={buttonVariants({ variant: "primary" })}>Save preferences</button>
      </div>
    </div>
  );
}
