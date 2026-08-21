"use client";

import { useState, useEffect, use } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProjectFeaturesSettingsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { projectSlug } = use(params);
  const decodedProjectSlug = decodeURIComponent(projectSlug);
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [features, setFeatures] = useState({
    enable_issues: true,
    enable_wiki: true,
    enable_discussions: false
  });
  
  const supabase = createClient();

  useEffect(() => {
    async function loadFeatures() {
      setLoading(true);
      const { data: project } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', decodedProjectSlug)
        .single();
        
      if (project) {
        const { data: prefs } = await supabase
          .from('project_settings')
          .select('features')
          .eq('project_id', project.id)
          .single();
          
        if (prefs?.features) {
          setFeatures(prev => ({ ...prev, ...prefs.features }));
        }
      }
      setLoading(false);
    }
    loadFeatures();
  }, [decodedProjectSlug, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: project } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', decodedProjectSlug)
        .single();
        
      if (!project) throw new Error("Project not found");

      const { error } = await supabase
        .from('project_settings')
        .update({ features })
        .eq('project_id', project.id);
        
      if (error) throw error;
      
      alert("Project features saved successfully!");
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
        <h2 className="font-heading text-2xl text-text-primary">Features & Tools</h2>
        <p className="mt-2 text-sm text-text-muted">
          Enable or disable tools available within {decodedProjectSlug}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface">
            <div>
              <span className="block text-sm font-medium text-text-primary">Issue Tracker</span>
              <span className="block text-xs text-text-muted mt-1">
                Lightweight issue tracking for engineering tasks and bugs.
              </span>
            </div>
            <input
              type="checkbox"
              checked={features.enable_issues}
              onChange={(e) => setFeatures({ ...features, enable_issues: e.target.checked })}
              className="h-5 w-5 rounded border-border text-primary focus:ring-primary/50"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface">
            <div>
              <span className="block text-sm font-medium text-text-primary">Wiki / Documentation</span>
              <span className="block text-xs text-text-muted mt-1">
                Knowledge base for design decisions, specs, and architecture.
              </span>
            </div>
            <input
              type="checkbox"
              checked={features.enable_wiki}
              onChange={(e) => setFeatures({ ...features, enable_wiki: e.target.checked })}
              className="h-5 w-5 rounded border-border text-primary focus:ring-primary/50"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface">
            <div>
              <span className="block text-sm font-medium text-text-primary">Discussions</span>
              <span className="block text-xs text-text-muted mt-1">
                Forum-style communication for team Q&A and announcements.
              </span>
            </div>
            <input
              type="checkbox"
              checked={features.enable_discussions}
              onChange={(e) => setFeatures({ ...features, enable_discussions: e.target.checked })}
              className="h-5 w-5 rounded border-border text-primary focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="pt-5 border-t border-border flex justify-end">
          <button type="submit" disabled={saving} className="signal-pill signal-pill-brand disabled:opacity-50">
            {saving ? "Saving..." : "Save Features"}
          </button>
        </div>
      </form>
    </div>
  );
}
