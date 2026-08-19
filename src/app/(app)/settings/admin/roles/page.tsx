import { buttonVariants } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function AdminRolesSettingsPage() {
  const roles = [
    { name: "Owner", description: "Full access to all workspace settings, billing, and deletion.", count: 1 },
    { name: "Admin", description: "Can manage members, projects, and most workspace settings.", count: 2 },
    { name: "Member", description: "Can create and edit projects, invite guests, and comment.", count: 15 },
    { name: "Guest", description: "Limited access to explicitly shared projects only.", count: 4 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-text-primary">Roles & Permissions</h1>
        <p className="mt-2 text-sm text-text-muted">Configure fine-grained access control policies for your organization.</p>
      </div>

      <div className="surface-panel p-6 border-warning/20 bg-warning/5 flex items-start gap-4">
        <ShieldAlert className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-text-primary">Enterprise Feature</h3>
          <p className="text-sm text-text-muted mt-1">Custom roles and granular permission matrices are available on Enterprise plans. You are currently viewing the default role definitions.</p>
          <button className={`mt-3 ${buttonVariants({ variant: "outline", size: "sm" })}`}>Upgrade to customize</button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-text-primary">Default Roles</h2>
        {roles.map((role) => (
          <div key={role.name} className="surface-panel p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-text-primary flex items-center gap-2">
                {role.name}
                <span className="text-xs bg-surface-muted px-2 py-0.5 rounded text-text-muted">{role.count} users</span>
              </h3>
              <p className="text-sm text-text-muted mt-1">{role.description}</p>
            </div>
            <button className={`${buttonVariants({ variant: "outline", size: "sm" })}`} disabled>
              View matrix
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
