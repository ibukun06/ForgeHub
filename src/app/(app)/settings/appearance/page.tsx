"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { Monitor, Moon, Sun } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AppearanceSettingsPage() {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [density, setDensity] = useState("comfortable");
  const [sidebarState, setSidebarState] = useState("expanded");
  const [gridVisibility, setGridVisibility] = useState(true);
  const [cadViewer, setCadViewer] = useState("standard");
  
  const supabase = createClient();

  useEffect(() => {
    async function loadAppearance() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: prefs } = await supabase
          .from('user_preferences')
          .select('appearance')
          .eq('user_id', user.id)
          .single();
          
        if (prefs?.appearance) {
          const appearance = prefs.appearance as any;
          setDensity(appearance.density || "comfortable");
          setSidebarState(appearance.sidebar || "expanded");
          setGridVisibility(appearance.grid_visibility ?? true);
          setCadViewer(appearance.cad_viewer || "standard");
        }
      }
      setLoading(false);
    }
    loadAppearance();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('user_preferences')
        .update({
          appearance: {
            theme,
            density,
            sidebar: sidebarState,
            grid_visibility: gridVisibility,
            cad_viewer: cadViewer
          }
        })
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      alert("Appearance settings saved successfully!");
    } catch (err: unknown) {
      alert("Failed to save appearance settings: " + (err instanceof Error ? err.message : String(err)));
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
        <h2 className="text-xl font-bold font-heading text-text-primary mb-1">Appearance</h2>
        <p className="text-sm text-text-muted">Customize the look and feel of your ForgeHub experience.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        
        {/* Theme */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Theme</h3>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  theme === "light" 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-surface hover:border-primary/50"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm border border-slate-200">
                  <Sun className="h-5 w-5" />
                </div>
                <span className={`text-sm font-medium ${theme === "light" ? "text-primary" : "text-text-primary"}`}>
                  Light
                </span>
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  theme === "dark" 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-surface hover:border-primary/50"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-amber-500 shadow-sm border border-slate-800">
                  <Moon className="h-5 w-5" />
                </div>
                <span className={`text-sm font-medium ${theme === "dark" ? "text-primary" : "text-text-primary"}`}>
                  Dark
                </span>
              </button>

              <button
                type="button"
                onClick={() => setTheme("system")}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  theme === "system" 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-surface hover:border-primary/50"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-elevated text-text-muted shadow-sm border border-border">
                  <Monitor className="h-5 w-5" />
                </div>
                <span className={`text-sm font-medium ${theme === "system" ? "text-primary" : "text-text-primary"}`}>
                  System
                </span>
              </button>
            </div>
            <p className="mt-3 text-xs text-text-muted">
              System mode automatically switches between light and dark based on your OS settings.
            </p>
          </div>
        </section>

        {/* Layout Preferences */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Layout & Density</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Interface Density</label>
              <select
                value={density}
                onChange={(e) => setDensity(e.target.value)}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="compact">Compact</option>
                <option value="comfortable">Comfortable</option>
                <option value="spacious">Spacious</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Navigation Sidebar</label>
              <select
                value={sidebarState}
                onChange={(e) => setSidebarState(e.target.value)}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="expanded">Expanded by default</option>
                <option value="collapsed">Collapsed by default</option>
                <option value="remember">Remember last state</option>
              </select>
            </div>
          </div>
        </section>

        {/* Engineering Workspace */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Engineering Workspace</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Grid Visibility</label>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="grid-visibility"
                  checked={gridVisibility}
                  onChange={(e) => setGridVisibility(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary/50"
                />
                <label htmlFor="grid-visibility" className="text-sm text-text-primary">
                  Show background grid on engineering canvas
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Default CAD Viewer Engine</label>
              <select
                value={cadViewer}
                onChange={(e) => setCadViewer(e.target.value)}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="standard">Standard WebGL</option>
                <option value="high_performance">High Performance (Requires Hardware Accel)</option>
                <option value="lite">Lite (Faster loading)</option>
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
            {saving ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      </form>
    </div>
  );
}
