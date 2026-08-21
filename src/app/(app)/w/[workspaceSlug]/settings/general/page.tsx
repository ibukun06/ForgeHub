"use client";

import { useState, useEffect, use } from "react";
import { createClient } from "@/lib/supabase/client";
import { HelpCircle } from "lucide-react";

export default function WorkspaceGeneralSettingsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = use(params);
  const decodedSlug = decodeURIComponent(workspaceSlug);
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [workspaceInfo, setWorkspaceInfo] = useState({
    name: decodedSlug,
    description: "",
    default_cad_format: "step"
  });
  
  const supabase = createClient();

  useEffect(() => {
    async function loadWorkspace() {
      setLoading(true);
      // Fetch workspace info
      const { data: workspace } = await supabase
        .from('workspaces')
        .select('id, name')
        .eq('slug', decodedSlug)
        .single();
        
      if (workspace) {
        setWorkspaceInfo(prev => ({ ...prev, name: workspace.name }));
        
        // Fetch workspace settings
        const { data: prefs } = await supabase
          .from('workspace_settings')
          .select('general')
          .eq('workspace_id', workspace.id)
          .single();
          
        if (prefs?.general) {
          setWorkspaceInfo(prev => ({ ...prev, ...prefs.general }));
        }
      }
      setLoading(false);
    }
    loadWorkspace();
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

      // Update workspace name
      await supabase
        .from('workspaces')
        .update({ name: workspaceInfo.name })
        .eq('id', workspace.id);

      // Update workspace general settings
      const { error } = await supabase
        .from('workspace_settings')
        .update({ 
          general: {
            description: workspaceInfo.description,
            default_cad_format: workspaceInfo.default_cad_format
          } 
        })
        .eq('workspace_id', workspace.id);
        
      if (error) throw error;
      
      alert("Workspace settings saved successfully!");
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
        <h2 className="font-heading text-2xl text-text-primary">Workspace General</h2>
        <p className="mt-2 text-sm text-text-muted">
          Manage the settings, branding, and details of this workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
            Workspace Information
          </h3>
          <div className="grid gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
                Workspace Name
              </label>
              <input
                id="name"
                type="text"
                value={workspaceInfo.name}
                onChange={e => setWorkspaceInfo({...workspaceInfo, name: e.target.value})}
                className="w-full rounded-lg border border-border bg-input-bg px-3 py-2 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-text-primary mb-1">
                Workspace URL (Slug)
              </label>
              <div className="flex rounded-lg border border-border shadow-sm">
                <span className="inline-flex items-center rounded-l-lg border-r border-border bg-surface-muted px-3 text-sm text-text-muted">
                  forgehub.com/w/
                </span>
                <input
                  id="slug"
                  type="text"
                  disabled
                  className="w-full min-w-0 flex-1 rounded-none rounded-r-lg bg-surface px-3 py-2 text-sm text-text-muted opacity-60 cursor-not-allowed"
                  value={decodedSlug}
                />
              </div>
              <p className="mt-1 text-xs text-text-muted">Workspace URLs cannot be changed after creation.</p>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={workspaceInfo.description}
                onChange={e => setWorkspaceInfo({...workspaceInfo, description: e.target.value})}
                className="w-full rounded-lg border border-border bg-input-bg px-3 py-2 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="What is this workspace for?"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted flex items-center justify-between">
            Engineering Defaults
            <HelpCircle className="h-4 w-4 text-text-muted" />
          </h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Workspace Default CAD Format
              </label>
              <select
                value={workspaceInfo.default_cad_format}
                onChange={e => setWorkspaceInfo({...workspaceInfo, default_cad_format: e.target.value})}
                className="w-full md:w-1/2 rounded-lg border border-border bg-input-bg px-3 py-2 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="step">STEP (.stp, .step)</option>
                <option value="iges">IGES (.igs, .iges)</option>
                <option value="stl">STL (.stl)</option>
              </select>
              <p className="mt-1 text-xs text-text-muted">This sets the default export format for all users in this workspace.</p>
            </div>
          </div>
        </div>

        <div className="pt-5 border-t border-border flex justify-end">
          <button type="submit" disabled={saving} className="signal-pill signal-pill-brand disabled:opacity-50">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
