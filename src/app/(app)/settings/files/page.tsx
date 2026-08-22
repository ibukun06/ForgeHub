"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { HardDrive, HelpCircle } from "lucide-react";

export default function FilesSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [files, setFiles] = useState({
    default_cad_format: "step",
    auto_versioning: true,
    local_sync_path: "",
    compression_enabled: true
  });
  
  const supabase = createClient();

  useEffect(() => {
    async function loadFiles() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: prefs } = await supabase
          .from('user_preferences')
          .select('files')
          .eq('user_id', user.id)
          .single();
          
        if (prefs?.files) {
          setFiles(prev => ({ ...prev, ...(prefs.files as any) }));
        }
      }
      setLoading(false);
    }
    loadFiles();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('user_preferences')
        .update({ files })
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      alert("File preferences saved successfully!");
    } catch (err: unknown) {
      alert("Failed to save file settings: " + (err instanceof Error ? err.message : String(err)));
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
        <h2 className="text-xl font-bold font-heading text-text-primary mb-1">Files & Storage</h2>
        <p className="text-sm text-text-muted">Manage how ForgeHub handles your CAD files and documents.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        
        {/* CAD Defaults */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">CAD Preferences</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Default Export Format</label>
              <select
                value={files.default_cad_format}
                onChange={(e) => setFiles({ ...files, default_cad_format: e.target.value })}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="step">STEP (.stp, .step)</option>
                <option value="iges">IGES (.igs, .iges)</option>
                <option value="stl">STL (.stl)</option>
                <option value="obj">OBJ (.obj)</option>
                <option value="native">Native Format (SolidWorks, Inventor, etc)</option>
              </select>
              <p className="mt-2 text-xs text-text-muted">
                Preferred format when downloading multi-format assets.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1 flex items-center justify-between">
                Local Sync Path
                <HelpCircle className="h-4 w-4 text-text-muted cursor-help" />
              </label>
              <input
                type="text"
                value={files.local_sync_path}
                onChange={(e) => setFiles({ ...files, local_sync_path: e.target.value })}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="C:\Users\Name\ForgeHub"
              />
              <p className="mt-2 text-xs text-text-muted">
                Default location for local file synchronization (Desktop App).
              </p>
            </div>
          </div>
        </section>

        {/* Storage Management */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Version Control & Storage</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface">
              <div>
                <span className="block text-sm font-medium text-text-primary">Automatic Versioning</span>
                <span className="block text-xs text-text-muted mt-1">
                  Automatically create minor versions when files are overwritten via web upload.
                </span>
              </div>
              <input
                type="checkbox"
                checked={files.auto_versioning}
                onChange={(e) => setFiles({ ...files, auto_versioning: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary/50"
              />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface">
              <div>
                <span className="block text-sm font-medium text-text-primary">Lossless Compression</span>
                <span className="block text-xs text-text-muted mt-1">
                  Compress CAD assemblies to save storage space without losing data integrity.
                </span>
              </div>
              <input
                type="checkbox"
                checked={files.compression_enabled}
                onChange={(e) => setFiles({ ...files, compression_enabled: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary/50"
              />
            </div>
          </div>
          
          {/* Storage Bar Stub */}
          <div className="pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-primary font-medium flex items-center gap-2"><HardDrive className="w-4 h-4" /> Personal Storage</span>
              <span className="text-text-muted">1.2 GB / 5 GB (24%)</span>
            </div>
            <div className="h-2 bg-surface-elevated rounded-full overflow-hidden border border-border">
              <div className="h-full bg-primary w-[24%] rounded-full"></div>
            </div>
            <p className="mt-2 text-xs text-text-muted">
              Note: Project files in team workspaces count against the workspace quota, not your personal storage.
            </p>
          </div>
        </section>

        <div className="pt-5 border-t border-border flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="signal-pill signal-pill-brand disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save File Preferences"}
          </button>
        </div>
      </form>
    </div>
  );
}
