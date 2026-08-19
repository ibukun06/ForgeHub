import { buttonVariants } from "@/components/ui/button";
import { User, MoreHorizontal, Shield } from "lucide-react";

export default function WorkspaceMembersSettingsPage() {
  const mockMembers = [
    { name: "Jane Doe", email: "jane@example.com", role: "Owner" },
    { name: "John Smith", email: "john@example.com", role: "Admin" },
    { name: "Alice Johnson", email: "alice@example.com", role: "Member" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-text-primary">Members</h1>
          <p className="mt-2 text-sm text-text-muted">Manage who has access to this workspace.</p>
        </div>
        <button className={buttonVariants({ variant: "primary" })}>Invite member</button>
      </div>

      <div className="surface-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-muted border-b border-border text-text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockMembers.map((member, i) => (
                <tr key={i} className="hover:bg-surface-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-medium">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{member.name}</p>
                        <p className="text-xs text-text-muted">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface border border-border text-xs font-medium text-text-primary">
                      {member.role === 'Owner' || member.role === 'Admin' ? <Shield className="w-3 h-3 text-primary" /> : <User className="w-3 h-3 text-text-muted" />}
                      {member.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-surface rounded transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
