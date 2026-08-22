"use client";

import { useState, useTransition } from "react";
import { UserPlus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inviteWorkspaceMember } from "@/lib/actions/members";

export function InviteMemberDialog({ workspaceSlug }: { workspaceSlug: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await inviteWorkspaceMember(workspaceSlug, email, role);
        setIsOpen(false);
        setEmail("");
      } catch (error) {
        console.error("Failed to send invite:", error);
      }
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="signal-pill signal-pill-brand shrink-0">
        <UserPlus className="mr-2 h-4 w-4" />
        Invite Members
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-semibold">Invite to Workspace</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-border bg-input-bg px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary"
                  placeholder="engineer@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-md border border-border bg-input-bg px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setIsOpen(false)} type="button" disabled={isPending}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isPending}>
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Send Invite
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
