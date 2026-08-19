"use client";

import { useState } from "react";
import { Mail, Shield, UserX, X, UserCog, UserCheck, Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import {
  createInvite,
  revokeInvite,
  removeMember,
  updateMemberRole,
} from "@/app/(app)/w/[workspaceSlug]/p/[projectSlug]/team/actions";
import type { InviteRole, MemberRole } from "@/lib/supabase/types";

// Note: These interfaces mirror the DB structure returned from Supabase
interface Member {
  id: string; // The project_members id
  user_id: string; // The users id
  role: MemberRole;
  joined_at: string;
  users: {
    name: string | null;
    email: string;
  };
}

interface Invite {
  id: string;
  email: string;
  role: InviteRole;
  expires_at: string;
}

export function TeamManagement({
  projectId,
  currentUserId,
  members,
  invites,
  isLead,
}: {
  projectId: string;
  currentUserId: string;
  members: Member[];
  invites: Invite[];
  isLead: boolean;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <ActiveMembers members={members} isLead={isLead} projectId={projectId} currentUserId={currentUserId} />
        {isLead && <PendingInvites invites={invites} projectId={projectId} />}
      </div>
      <div className="space-y-6">
        {isLead && <InvitePanel projectId={projectId} />}
        <PermissionsGlossary />
      </div>
    </div>
  );
}

function ActiveMembers({ members, isLead, projectId, currentUserId }: { members: Member[]; isLead: boolean; projectId: string; currentUserId: string }) {
  const { toast } = useToast();
  
  async function handleRemove(memberId: string) {
    if (!confirm("Are you sure you want to remove this member?")) return;
    const res = await removeMember(projectId, memberId);
    if (res.error) toast(res.error, "error");
    else toast("Member removed successfully", "success");
  }

  async function handleRoleChange(memberId: string, newRole: MemberRole) {
    if (!confirm(`Change role to ${newRole.replace("_", " ")}?`)) return;
    const res = await updateMemberRole(projectId, memberId, newRole);
    if (res.error) toast(res.error, "error");
    else toast("Role updated", "success");
  }

  return (
    <section className="surface-panel p-5">
      <h2 className="font-heading text-xl text-text-primary mb-4">Active Team</h2>
      <div className="divide-y divide-border">
        {members.map((member) => (
          <div key={member.id} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary uppercase font-bold text-sm">
                {(member.users.name || member.users.email).substring(0, 2)}
              </div>
              <div>
                <p className="font-medium text-text-primary text-sm">
                  {member.users.name || "Unknown User"} {member.user_id === currentUserId && <span className="text-text-muted text-xs font-normal ml-1">(You)</span>}
                </p>
                <p className="text-xs text-text-muted">{member.users.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {isLead && member.user_id !== currentUserId ? (
                <div className="flex items-center gap-2">
                  <select
                    value={member.role}
                    onChange={(e) => handleRoleChange(member.user_id, e.target.value as MemberRole)}
                    className="bg-transparent text-sm border border-border rounded-md px-2 py-1 text-text-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="team_lead">Team Lead</option>
                    <option value="contributor">Contributor</option>
                    <option value="advisor">Advisor</option>
                  </select>
                  <button onClick={() => handleRemove(member.user_id)} className="p-2 text-text-muted hover:text-error transition-colors" title="Remove member">
                    <UserX className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <span className="signal-pill signal-pill-neutral text-xs text-text-muted capitalize">
                  {member.role.replace("_", " ")}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PendingInvites({ invites, projectId }: { invites: Invite[]; projectId: string }) {
  const { toast } = useToast();

  async function handleRevoke(inviteId: string) {
    if (!confirm("Revoke this invitation?")) return;
    const res = await revokeInvite(inviteId);
    if (res.error) toast(res.error, "error");
    else toast("Invitation revoked", "success");
  }

  if (invites.length === 0) return null;

  return (
    <section className="surface-panel p-5">
      <h2 className="font-heading text-xl text-text-primary mb-4">Pending Invitations</h2>
      <div className="divide-y divide-border">
        {invites.map((invite) => (
          <div key={invite.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-text-muted" />
              <div>
                <p className="text-text-primary">{invite.email}</p>
                <p className="text-xs text-text-muted capitalize">Invited as {invite.role}</p>
              </div>
            </div>
            <button onClick={() => handleRevoke(invite.id)} className="text-xs text-text-muted hover:text-error transition-colors flex items-center gap-1">
              <X className="w-3 h-3" /> Revoke
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function InvitePanel({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<InviteRole>("contributor");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await createInvite(projectId, email, role);
    setLoading(false);
    
    if (res.error) {
      toast(res.error, "error");
    } else {
      toast("Invitation sent!", "success");
      setOpen(false);
      setEmail("");
    }
  }

  return (
    <section className="surface-panel p-5">
      <div className="mb-4">
        <h2 className="font-heading text-xl text-text-primary">Expand Team</h2>
        <p className="text-sm text-text-muted mt-1">Invite collaborators or advisors to this project.</p>
      </div>
      
      <button onClick={() => setOpen(true)} className={buttonVariants({ variant: "primary", className: "w-full" })}>
        <Plus className="w-4 h-4 mr-2" /> Invite Member
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} title="Invite to Project" description="Send an email invitation. The link will expire in 14 days.">
        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
          <div>
            <label className="text-sm font-medium text-text-primary mb-1 block">Email address</label>
            <Input required type="email" placeholder="colleague@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary mb-1 block">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as InviteRole)}
              className="w-full bg-input-bg border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            >
              <option value="contributor">Contributor</option>
              <option value="advisor">Advisor</option>
            </select>
            <p className="text-xs text-text-muted mt-2">Team Leads can only be promoted from existing contributors.</p>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={() => setOpen(false)} className={buttonVariants({ variant: "ghost" })}>Cancel</button>
            <button type="submit" disabled={loading} className={buttonVariants({ variant: "primary" })}>
              {loading ? "Sending..." : "Send Invitation"}
            </button>
          </div>
        </form>
      </Dialog>
    </section>
  );
}

function PermissionsGlossary() {
  return (
    <section className="surface-panel p-5">
      <h2 className="font-heading text-lg text-text-primary mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" /> Permissions
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-2"><UserCog className="w-4 h-4 text-text-muted" /> Team Lead</h3>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">Full access. Can update project settings, manage members, publish the project, and edit all documentation.</p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-2"><UserCheck className="w-4 h-4 text-text-muted" /> Contributor</h3>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">Execution access. Can edit documents, log decisions, and update work status. Cannot manage settings or members.</p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-2"><Mail className="w-4 h-4 text-text-muted" /> Advisor</h3>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">Review access. Can view all project materials and leave comments. Cannot modify content or structure.</p>
        </div>
      </div>
    </section>
  );
}
