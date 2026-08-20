"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProjectSettingsPage({ 
  params 
}: { 
  params: Promise<{ workspaceSlug: string, projectSlug: string }> 
}) {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<any>(null);
  const [visibility, setVisibility] = useState<"private" | "published">("private");
  const supabase = createClient();

  useEffect(() => {
    async function loadProject() {
      const { projectSlug } = await params;
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", projectSlug)
        .single();
      
      if (data && !error) {
        setProject(data);
        setVisibility(data.visibility);
      }
    }
    loadProject();
  }, [supabase, params]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from("projects")
        .update({ visibility })
        .eq("id", project.id);
        
      if (error) throw error;
      alert("Project visibility updated successfully.");
    } catch (err: any) {
      alert("Error updating visibility: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!project) {
    return <div className="p-8">Loading project settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 font-mono">
      <h1 className="text-3xl font-heading font-bold mb-2 text-text-primary">Project Settings</h1>
      <p className="text-text-muted mb-8 pb-8 border-b border-border">
        Manage how the world sees {project.name}.
      </p>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-surface border border-border p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Visibility & Publishing</h2>
          
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="visibility" 
                value="private" 
                checked={visibility === "private"}
                onChange={() => setVisibility("private")}
                className="mt-1 w-4 h-4 text-primary bg-input-bg border-border focus:ring-primary/50"
              />
              <div>
                <div className="font-bold text-text-primary group-hover:text-primary transition-colors">Private Draft</div>
                <p className="text-sm text-text-muted mt-1">Only workspace members can view and edit this project.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="visibility" 
                value="published" 
                checked={visibility === "published"}
                onChange={() => setVisibility("published")}
                className="mt-1 w-4 h-4 text-primary bg-input-bg border-border focus:ring-primary/50"
              />
              <div>
                <div className="font-bold text-text-primary group-hover:text-primary transition-colors">Published Showcase</div>
                <p className="text-sm text-text-muted mt-1">Project is visible on your public profile and the explore feed.</p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading || visibility === project.visibility}
            className="px-6 py-2 bg-primary hover:bg-primary-hover text-white font-bold tracking-wide transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
