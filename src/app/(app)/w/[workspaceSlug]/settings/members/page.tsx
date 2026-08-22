import { MoreHorizontal, Shield } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { InviteMemberDialog } from "@/components/workspace/invite-member-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Users } from "lucide-react";

type Props = {
  params: Promise<{ workspaceSlug: string }>;
};

export default async function WorkspaceMembersPage({ params }: Props) {
  const { workspaceSlug } = await params;
  const supabase = await createClient();

  // 1. Get workspace ID
  const { data: workspace } = await supabase
    .from("workspaces")
    .select("id")
    .eq("slug", workspaceSlug)
    .single();

  let members: any[] = [];
  
  if (workspace) {
    // 2. Get members joined with user profiles
    const { data: workspaceMembers } = await supabase
      .from("workspace_members")
      .select(`
        id,
        role,
        users (
          id,
          name,
          email,
          avatar_url
        )
      `)
      .eq("workspace_id", workspace.id);
      
    if (workspaceMembers) {
      members = workspaceMembers;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-5 gap-4">
        <div>
          <h2 className="font-heading text-2xl text-text-primary">Workspace Members</h2>
          <p className="mt-2 text-sm text-text-muted">
            Manage who has access to this workspace and their permission levels.
          </p>
        </div>
        <InviteMemberDialog workspaceSlug={workspaceSlug} />
      </div>

      {members.length === 0 ? (
        <EmptyState 
          icon={Users} 
          title="No Members Found" 
          description="It looks like this workspace has no members yet, or you lack permission to view them." 
        />
      ) : (
        <div className="surface-panel overflow-hidden">
          <div className="grid grid-cols-[1fr_120px_60px] gap-4 p-4 border-b border-border bg-surface-muted text-xs font-semibold text-text-muted uppercase tracking-wider">
            <div>Member</div>
            <div>Role</div>
            <div></div>
          </div>
          
          <div className="divide-y divide-border">
            {members.map((member) => (
              <div key={member.id} className="grid grid-cols-[1fr_120px_60px] gap-4 p-4 items-center">
                <div>
                  <p className="font-medium text-text-primary">{member.users?.name || "Unknown User"}</p>
                  <p className="text-sm text-text-muted truncate">{member.users?.email}</p>
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
      )}
    </div>
  );
}
