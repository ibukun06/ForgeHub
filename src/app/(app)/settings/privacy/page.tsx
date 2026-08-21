"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function PrivacySettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [privacy, setPrivacy] = useState({
    profile_visibility: "public",
    search_indexing: true,
    activity_status: true
  });
  
  const supabase = createClient();

  useEffect(() => {
    async function loadPrivacy() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: prefs } = await supabase
          .from('user_preferences')
          .select('privacy')
          .eq('user_id', user.id)
          .single();
          
        if (prefs?.privacy) {
          setPrivacy(prev => ({ ...prev, ...prefs.privacy }));
        }
      }
      setLoading(false);
    }
    loadPrivacy();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('user_preferences')
        .update({ privacy })
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      alert("Privacy settings saved successfully!");
    } catch (err: unknown) {
      alert("Failed to save privacy settings: " + (err instanceof Error ? err.message : String(err)));
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
        <h2 className="text-xl font-bold font-heading text-text-primary mb-1">Privacy Options</h2>
        <p className="text-sm text-text-muted">Control who can see your profile and activity.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        
        {/* Profile Visibility */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Profile Visibility</h3>
          
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-4 border border-border rounded-lg bg-surface hover:border-primary/50 cursor-pointer transition-colors">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={privacy.profile_visibility === "public"}
                onChange={(e) => setPrivacy({ ...privacy, profile_visibility: e.target.value })}
                className="mt-1 h-4 w-4 text-primary focus:ring-primary/50"
              />
              <div>
                <span className="block text-sm font-medium text-text-primary">Public</span>
                <span className="block text-xs text-text-muted mt-1">
                  Anyone on or off ForgeHub can view your profile, portfolio, and public projects.
                </span>
              </div>
            </label>
            
            <label className="flex items-start gap-3 p-4 border border-border rounded-lg bg-surface hover:border-primary/50 cursor-pointer transition-colors">
              <input
                type="radio"
                name="visibility"
                value="workspace"
                checked={privacy.profile_visibility === "workspace"}
                onChange={(e) => setPrivacy({ ...privacy, profile_visibility: e.target.value })}
                className="mt-1 h-4 w-4 text-primary focus:ring-primary/50"
              />
              <div>
                <span className="block text-sm font-medium text-text-primary">Workspace Only</span>
                <span className="block text-xs text-text-muted mt-1">
                  Only members of your current workspaces can view your full profile details.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border border-border rounded-lg bg-surface hover:border-primary/50 cursor-pointer transition-colors">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={privacy.profile_visibility === "private"}
                onChange={(e) => setPrivacy({ ...privacy, profile_visibility: e.target.value })}
                className="mt-1 h-4 w-4 text-primary focus:ring-primary/50"
              />
              <div>
                <span className="block text-sm font-medium text-text-primary">Private</span>
                <span className="block text-xs text-text-muted mt-1">
                  Your profile is hidden. You will appear as &quot;Anonymous User&quot; in public discussions.
                </span>
              </div>
            </label>
          </div>
        </section>

        {/* Discovery & Activity */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Discovery & Activity</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface">
              <div>
                <span className="block text-sm font-medium text-text-primary">Search Engine Indexing</span>
                <span className="block text-xs text-text-muted mt-1">
                  Allow search engines (like Google) to index your public profile.
                </span>
              </div>
              <input
                type="checkbox"
                checked={privacy.search_indexing}
                onChange={(e) => setPrivacy({ ...privacy, search_indexing: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary/50"
                disabled={privacy.profile_visibility === "private"}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface">
              <div>
                <span className="block text-sm font-medium text-text-primary">Activity Status</span>
                <span className="block text-xs text-text-muted mt-1">
                  Show others when you are online and actively collaborating.
                </span>
              </div>
              <input
                type="checkbox"
                checked={privacy.activity_status}
                onChange={(e) => setPrivacy({ ...privacy, activity_status: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary/50"
              />
            </div>
          </div>
        </section>

        <div className="pt-5 border-t border-border flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="signal-pill signal-pill-brand disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Privacy Options"}
          </button>
        </div>
      </form>
    </div>
  );
}
