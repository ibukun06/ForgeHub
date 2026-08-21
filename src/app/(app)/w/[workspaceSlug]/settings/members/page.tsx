import { MoreHorizontal, Shield, UserPlus } from "lucide-react";

export default async function WorkspaceMembersPage() {
  // Placeholder data. In Phase 2 this will fetch from workspace_members table.
  const members = [
    { name: "Ibukunoluwa", email: "ibukun@example.com", role: "Owner" },
    { name: "AI Architect", email: "architect@example.com", role: "Admin" },
    { name: "Contributor", email: "contributor@example.com", role: "Member" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-5 gap-4">
        <div>
          <h2 className="font-heading text-2xl text-text-primary">Workspace Members</h2>
          <p className="mt-2 text-sm text-text-muted">
            Manage who has access to this workspace and their permission levels.
          </p>
        </div>
        <button className="signal-pill signal-pill-brand flex items-center shrink-0">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Members
        </button>
      </div>

      <div className="surface-panel overflow-hidden">
        <div className="grid grid-cols-[1fr_120px_60px] gap-4 p-4 border-b border-border bg-surface-muted text-xs font-semibold text-text-muted uppercase tracking-wider">
          <div>Member</div>
          <div>Role</div>
          <div></div>
        </div>
        
        <div className="divide-y divide-border">
          {members.map((member, i) => (
            <div key={i} className="grid grid-cols-[1fr_120px_60px] gap-4 p-4 items-center">
              <div>
                <p className="font-medium text-text-primary">{member.name}</p>
                <p className="text-sm text-text-muted truncate">{member.email}</p>
              </div>
              <div>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  member.role === 'Owner' ? 'bg-primary/10 text-primary' :
                  member.role === 'Admin' ? 'bg-secondary/10 text-secondary' :
                  'bg-surface-elevated text-text-muted'
                }`}>
                  {member.role === 'Owner' || member.role === 'Admin' ? (
                    <Shield className="mr-1 h-3 w-3" />
                  ) : null}
                  {member.role}
                </span>
              </div>
              <div className="flex justify-end">
                <button className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
