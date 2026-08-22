"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CollaborationSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [collab, setCollab] = useState({
    auto_watch_projects: true,
    receive_invites: "anyone",
    show_online_status: true,
    default_comment_sort: "newest"
  });
  
  const supabase = createClient();

  useEffect(() => {
    async function loadCollab() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: prefs } = await supabase
          .from('user_preferences')
          .select('collaboration')
          .eq('user_id', user.id)
          .single();
          
        if (prefs?.collaboration) {
          setCollab(prev => ({ ...prev, ...(prefs.collaboration as any) }));
        }
      }
      setLoading(false);
    }
    loadCollab();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('user_preferences')
        .update({ collaboration: collab })
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      alert("Collaboration settings saved successfully!");
    } catch (err: unknown) {
      alert("Failed to save collaboration settings: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-surface rounded-lg"></div>;
  }

  return (
    <div>
      <div className="border-b border-border pb-5 mb-6">
        <h2 className="text-xl font-bold font-heading text-text-primary mb-1">Collaboration</h2>
        <p className="text-sm text-text-muted">Manage how you interact with teams, projects, and discussions.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        
        {/* Interaction Rules */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Interaction Rules</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface">
              <div>
                <span className="block text-sm font-medium text-text-primary">Automatically Watch Projects</span>
                <span className="block text-xs text-text-muted mt-1">
                  Automatically subscribe to notifications for projects you join or comment on.
                </span>
              </div>
              <input
                type="checkbox"
                checked={collab.auto_watch_projects}
                onChange={(e) => setCollab({ ...collab, auto_watch_projects: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Who can invite me to workspaces/projects?</label>
              <select
                value={collab.receive_invites}
                onChange={(e) => setCollab({ ...collab, receive_invites: e.target.value })}
                className="w-full md:w-1/2 bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="anyone">Anyone on ForgeHub</option>
                <option value="connections">Only users in my existing workspaces</option>
                <option value="none">No one (Block all invites)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Discussions */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Discussions & Reviews</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Default Comment Sorting</label>
              <select
                value={collab.default_comment_sort}
                onChange={(e) => setCollab({ ...collab, default_comment_sort: e.target.value })}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="resolved">Group by resolved status</option>
              </select>
            </div>
          </div>
        </section>

        <div className="pt-5 border-t border-border flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="signal-pill signal-pill-brand disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Collaboration Options"}
          </button>
        </div>
      </form>
    </div>
  );
}
