"use client";

import { useState, useEffect, use } from "react";
import { createClient } from "@/lib/supabase/client";

export default function WorkspaceSecuritySettingsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = use(params);
  const decodedSlug = decodeURIComponent(workspaceSlug);
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [security, setSecurity] = useState({
    require_2fa: false,
    allow_public_links: true,
    domain_restriction: ""
  });
  
  const supabase = createClient();

  useEffect(() => {
    async function loadSecurity() {
      setLoading(true);
      const { data: workspace } = await supabase
        .from('workspaces')
        .select('id')
        .eq('slug', decodedSlug)
        .single();
        
      if (workspace) {
        const { data: prefs } = await supabase
          .from('workspace_settings')
          .select('security')
          .eq('workspace_id', workspace.id)
          .single();
          
        if (prefs?.security) {
          setSecurity(prev => ({ ...prev, ...prefs.security }));
        }
      }
      setLoading(false);
    }
    loadSecurity();
  }, [decodedSlug, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: workspace } = await supabase
        .from('workspaces')
        .select('id')
        .eq('slug', decodedSlug)
        .single();
        
      if (!workspace) throw new Error("Workspace not found");

      const { error } = await supabase
        .from('workspace_settings')
        .update({ security })
        .eq('workspace_id', workspace.id);
        
      if (error) throw error;
      
      alert("Workspace security settings saved successfully!");
    } catch (err: unknown) {
      alert("Error saving settings: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-surface rounded-lg"></div>;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-5">
        <h2 className="font-heading text-2xl text-text-primary">Security & Access</h2>
        <p className="mt-2 text-sm text-text-muted">
          Manage workspace-level security policies and access controls.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Access Policies</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface">
              <div>
                <span className="block text-sm font-medium text-text-primary">Require 2FA for all members</span>
                <span className="block text-xs text-text-muted mt-1">
                  Force all workspace members to enable Two-Factor Authentication.
                </span>
              </div>
              <input
                type="checkbox"
                checked={security.require_2fa}
                onChange={(e) => setSecurity({ ...security, require_2fa: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary/50"
              />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface">
              <div>
                <span className="block text-sm font-medium text-text-primary">Allow Public Project Links</span>
                <span className="block text-xs text-text-muted mt-1">
                  Allow members to generate read-only public sharing links for projects.
                </span>
              </div>
              <input
                type="checkbox"
                checked={security.allow_public_links}
                onChange={(e) => setSecurity({ ...security, allow_public_links: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Email Domain Restriction</label>
              <input
                type="text"
                value={security.domain_restriction}
                onChange={(e) => setSecurity({ ...security, domain_restriction: e.target.value })}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g. acme.com (leave blank to allow any)"
              />
              <p className="mt-2 text-xs text-text-muted">
                Only users with email addresses matching this domain can be invited to the workspace.
              </p>
            </div>
          </div>
        </section>

        <div className="pt-5 border-t border-border flex justify-end">
          <button type="submit" disabled={saving} className="signal-pill signal-pill-brand disabled:opacity-50">
            {saving ? "Saving..." : "Save Policies"}
          </button>
        </div>
      </form>
    </div>
  );
}
