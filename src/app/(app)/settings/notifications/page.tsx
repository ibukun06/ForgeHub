"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function NotificationsSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [notifications, setNotifications] = useState({
    email_project_updates: true,
    email_mentions: true,
    email_ci_alerts: false,
    in_app_project_updates: true,
    in_app_mentions: true,
    in_app_ci_alerts: true,
    digest_frequency: "weekly"
  });
  
  const supabase = createClient();

  useEffect(() => {
    async function loadNotifications() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: prefs } = await supabase
          .from('user_preferences')
          .select('notifications')
          .eq('user_id', user.id)
          .single();
          
        if (prefs?.notifications) {
          setNotifications(prev => ({ ...prev, ...prefs.notifications }));
        }
      }
      setLoading(false);
    }
    loadNotifications();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('user_preferences')
        .update({ notifications })
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      alert("Notification preferences saved successfully!");
    } catch (err: unknown) {
      alert("Failed to save notifications: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-surface rounded-lg"></div>;
  }

  return (
    <div>
      <div className="border-b border-border pb-5 mb-6">
        <h2 className="text-xl font-bold font-heading text-text-primary mb-1">Notifications</h2>
        <p className="text-sm text-text-muted">Control how and when you receive alerts from ForgeHub.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-sm text-text-muted">
                <th className="pb-3 font-medium uppercase tracking-wider">Alert Type</th>
                <th className="pb-3 font-medium uppercase tracking-wider text-center w-24">In-App</th>
                <th className="pb-3 font-medium uppercase tracking-wider text-center w-24">Email</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                <td className="py-4">
                  <div className="font-medium text-text-primary">Project Updates</div>
                  <div className="text-text-muted text-xs mt-1">Changes to files, new comments, and project milestones.</div>
                </td>
                <td className="py-4 text-center">
                  <input type="checkbox" checked={notifications.in_app_project_updates} onChange={() => handleToggle('in_app_project_updates')} className="h-4 w-4 rounded border-border text-primary focus:ring-primary/50" />
                </td>
                <td className="py-4 text-center">
                  <input type="checkbox" checked={notifications.email_project_updates} onChange={() => handleToggle('email_project_updates')} className="h-4 w-4 rounded border-border text-primary focus:ring-primary/50" />
                </td>
              </tr>
              <tr className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                <td className="py-4">
                  <div className="font-medium text-text-primary">Team Mentions</div>
                  <div className="text-text-muted text-xs mt-1">When someone @mentions you in a comment or review.</div>
                </td>
                <td className="py-4 text-center">
                  <input type="checkbox" checked={notifications.in_app_mentions} onChange={() => handleToggle('in_app_mentions')} className="h-4 w-4 rounded border-border text-primary focus:ring-primary/50" />
                </td>
                <td className="py-4 text-center">
                  <input type="checkbox" checked={notifications.email_mentions} onChange={() => handleToggle('email_mentions')} className="h-4 w-4 rounded border-border text-primary focus:ring-primary/50" />
                </td>
              </tr>
              <tr className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                <td className="py-4">
                  <div className="font-medium text-text-primary">CI/CD Pipeline Alerts</div>
                  <div className="text-text-muted text-xs mt-1">Build failures, deployment status, and automated testing results.</div>
                </td>
                <td className="py-4 text-center">
                  <input type="checkbox" checked={notifications.in_app_ci_alerts} onChange={() => handleToggle('in_app_ci_alerts')} className="h-4 w-4 rounded border-border text-primary focus:ring-primary/50" />
                </td>
                <td className="py-4 text-center">
                  <input type="checkbox" checked={notifications.email_ci_alerts} onChange={() => handleToggle('email_ci_alerts')} className="h-4 w-4 rounded border-border text-primary focus:ring-primary/50" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <section className="space-y-5 pt-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Digests</h3>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Email Digest Frequency</label>
            <select
              value={notifications.digest_frequency}
              onChange={(e) => setNotifications({ ...notifications, digest_frequency: e.target.value })}
              className="w-full md:w-1/2 bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="never">Never (Turn off digests)</option>
              <option value="daily">Daily Summary</option>
              <option value="weekly">Weekly Recap</option>
            </select>
            <p className="mt-2 text-xs text-text-muted">
              Get a condensed summary of activity across all your workspaces and projects.
            </p>
          </div>
        </section>

        <div className="pt-5 border-t border-border flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="signal-pill signal-pill-brand disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Notifications"}
          </button>
        </div>
      </form>
    </div>
  );
}
