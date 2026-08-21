"use client";

import { useState, useEffect, use } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProjectGeneralSettingsPage({ 
  params 
}: { 
  params: Promise<{ workspaceSlug: string, projectSlug: string }> 
}) {
  const { projectSlug } = use(params);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState<unknown>(null);
  
  const [generalInfo, setGeneralInfo] = useState({
    name: "",
    description: "",
    visibility: "private"
  });
  
  const supabase = createClient();

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", projectSlug)
        .single();
      
      if (data && !error) {
        setProject(data);
        setGeneralInfo({
          name: data.name,
          description: data.description || "",
          visibility: data.visibility
        });
      }
      setLoading(false);
    }
    loadProject();
  }, [supabase, projectSlug]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    setSaving(true);
    
    const updateData: Record<string, unknown> = {
      name: generalInfo.name,
      description: generalInfo.description,
      visibility: generalInfo.visibility,
    };
    
    try {
      const { error } = await supabase
        .from("projects")
        .update(updateData)
        .eq("id", (project as { id: string }).id);
        
      if (error) throw error;
      alert("Project general settings updated successfully.");
    } catch (err: unknown) {
      alert("Error saving settings: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-surface rounded-lg"></div>;
  }

  if (!project) {
    return <div className="p-4">Loading project...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-5">
        <h2 className="font-heading text-2xl text-text-primary">General Settings</h2>
        <p className="mt-2 text-sm text-text-muted">
          Manage the details and visibility of {(project as Record<string, unknown>).name as string}.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 max-w-3xl">
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Project Details</h3>
          
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Project Name</label>
              <input
                type="text"
                required
                value={generalInfo.name}
                onChange={e => setGeneralInfo({...generalInfo, name: e.target.value})}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
              <textarea
                rows={3}
                value={generalInfo.description}
                onChange={e => setGeneralInfo({...generalInfo, description: e.target.value})}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="What is this project about?"
              />
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Visibility & Publishing</h3>
          
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer group p-4 border border-border rounded-lg bg-surface hover:border-primary/50 transition-colors">
              <input 
                type="radio" 
                name="visibility" 
                value="private" 
                checked={generalInfo.visibility === "private"}
                onChange={() => setGeneralInfo({...generalInfo, visibility: "private"})}
                className="mt-1 w-4 h-4 text-primary focus:ring-primary/50"
              />
              <div>
                <div className="font-medium text-text-primary group-hover:text-primary transition-colors">Private Draft</div>
                <p className="text-sm text-text-muted mt-1">Only workspace members can view and edit this project.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group p-4 border border-border rounded-lg bg-surface hover:border-primary/50 transition-colors">
              <input 
                type="radio" 
                name="visibility" 
                value="published" 
                checked={generalInfo.visibility === "published"}
                onChange={() => setGeneralInfo({...generalInfo, visibility: "published"})}
                className="mt-1 w-4 h-4 text-primary focus:ring-primary/50"
              />
              <div>
                <div className="font-medium text-text-primary group-hover:text-primary transition-colors">Published Showcase</div>
                <p className="text-sm text-text-muted mt-1">Project is visible on your public profile and the explore feed.</p>
              </div>
            </label>
          </div>
        </section>

        <div className="pt-5 border-t border-border flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="signal-pill signal-pill-brand disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
