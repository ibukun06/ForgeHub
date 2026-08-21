"use client";

import { useState, useEffect } from "react";
import { useTheme, type ThemeMode } from "@/components/theme/theme-provider";
import { Monitor, Moon, Sun, Clock, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const ACCENTS = [
  { id: "forge-orange", name: "Forge Orange", color: "bg-orange-500" },
  { id: "blue", name: "Blue", color: "bg-blue-500" },
  { id: "purple", name: "Purple", color: "bg-purple-500" },
  { id: "green", name: "Green", color: "bg-emerald-500" },
  { id: "teal", name: "Teal", color: "bg-teal-500" },
];

const LIGHT_THEMES = [
  { id: "forge-light", name: "Forge Light" },
  { id: "forge-light-hc", name: "High Contrast Light" },
];

const DARK_THEMES = [
  { id: "forge-dark", name: "Forge Dark" },
  { id: "forge-dim", name: "Forge Dim" },
  { id: "forge-dark-hc", name: "High Contrast Dark" },
];

export default function AppearanceSettingsPage() {
  const { preferences, setPreferences, resolvedTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Local state for workspace settings that aren't in theme provider
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
          
          // Hydrate the theme provider
          setPreferences({
            themeMode: appearance.themeMode || "system",
            lightTheme: appearance.lightTheme || "forge-light",
            darkTheme: appearance.darkTheme || "forge-dim",
            accent: appearance.accent || "forge-orange",
            density: appearance.density || "comfortable",
            motion: appearance.motion || "system"
          });

          // Hydrate non-theme appearance settings
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
            ...preferences,
            sidebar: sidebarState,
            grid_visibility: gridVisibility,
            cad_viewer: cadViewer
          }
        })
        .eq('user_id', user.id);
        
      if (error) throw error;
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

      <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl">
        
        {/* Theme Mode Selection */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Theme Mode</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ModeButton
              icon={<Monitor />} label="System" value="system"
              current={preferences.themeMode}
              onClick={() => setPreferences({ themeMode: "system" })}
            />
            <ModeButton
              icon={<Sun />} label="Light" value="light"
              current={preferences.themeMode}
              onClick={() => setPreferences({ themeMode: "light" })}
            />
            <ModeButton
              icon={<Moon />} label="Dark" value="dark"
              current={preferences.themeMode}
              onClick={() => setPreferences({ themeMode: "dark" })}
            />
            <ModeButton
              icon={<Clock />} label="Auto" value="auto"
              current={preferences.themeMode}
              onClick={() => setPreferences({ themeMode: "auto" })}
            />
          </div>
        </section>

        {/* Theme Presets */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Theme Presets</h3>
          
          {(preferences.themeMode === "system" || preferences.themeMode === "auto") ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Day Theme</label>
                <Select
                  value={preferences.lightTheme}
                  options={LIGHT_THEMES}
                  onChange={(v) => setPreferences({ lightTheme: v })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Night Theme</label>
                <Select
                  value={preferences.darkTheme}
                  options={DARK_THEMES}
                  onChange={(v) => setPreferences({ darkTheme: v })}
                />
              </div>
            </div>
          ) : preferences.themeMode === "light" ? (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Light Theme</label>
              <Select
                value={preferences.lightTheme}
                options={LIGHT_THEMES}
                onChange={(v) => setPreferences({ lightTheme: v })}
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Dark Theme</label>
              <Select
                value={preferences.darkTheme}
                options={DARK_THEMES}
                onChange={(v) => setPreferences({ darkTheme: v })}
              />
            </div>
          )}
        </section>

        {/* Accent Color */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Accent Color</h3>
          <div className="flex flex-wrap gap-4">
            {ACCENTS.map((accent) => (
              <button
                key={accent.id}
                type="button"
                onClick={() => setPreferences({ accent: accent.id })}
                className={`group relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  preferences.accent === accent.id ? "border-primary" : "border-transparent hover:scale-110"
                }`}
                title={accent.name}
              >
                <div className={`h-8 w-8 rounded-full ${accent.color}`} />
                {preferences.accent === accent.id && (
                  <Check className="absolute h-4 w-4 text-white drop-shadow-md" strokeWidth={3} />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Layout & Density */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Layout & Density</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Interface Density</label>
              <Select
                value={preferences.density}
                onChange={(v) => setPreferences({ density: v })}
                options={[
                  { id: "compact", name: "Compact" },
                  { id: "comfortable", name: "Comfortable" },
                  { id: "spacious", name: "Spacious" }
                ]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Motion</label>
              <Select
                value={preferences.motion}
                onChange={(v) => setPreferences({ motion: v })}
                options={[
                  { id: "system", name: "Follow System" },
                  { id: "full", name: "Full Motion" },
                  { id: "reduced", name: "Reduced Motion" }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Live Preview */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Live Preview</h3>
          <div className="surface-panel overflow-hidden border border-border">
            {/* Fake Header */}
            <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 rounded bg-primary"></div>
                <div className="font-semibold">ForgeHub UI</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-24 rounded bg-input-bg"></div>
                <div className="h-8 w-8 rounded-full bg-input-bg border border-border"></div>
              </div>
            </div>
            
            {/* Fake Body */}
            <div className="flex h-48 bg-bg">
              {/* Fake Sidebar */}
              <div className="hidden sm:block w-48 border-r border-border bg-surface p-3 space-y-2">
                <div className="h-6 w-full rounded bg-primary/10 text-primary px-2 py-1 text-xs font-medium flex items-center">
                  Overview
                </div>
                <div className="h-6 w-full rounded hover:bg-surface-muted text-text-muted px-2 py-1 text-xs flex items-center">
                  Projects
                </div>
                <div className="h-6 w-full rounded hover:bg-surface-muted text-text-muted px-2 py-1 text-xs flex items-center">
                  Settings
                </div>
              </div>
              {/* Fake Content */}
              <div className="flex-1 p-6">
                <div className="h-6 w-1/3 rounded bg-surface-elevated mb-4 border border-border"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-surface-muted"></div>
                  <div className="h-4 w-5/6 rounded bg-surface-muted"></div>
                  <div className="h-4 w-4/6 rounded bg-surface-muted"></div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" className="signal-pill signal-pill-brand">Primary Action</button>
                  <button type="button" className="signal-pill signal-pill-neutral">Secondary</button>
                </div>
              </div>
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

function ModeButton({ icon, label, value, current, onClick }: { icon: React.ReactNode, label: string, value: string, current: string, onClick: () => void }) {
  const isActive = current === value;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
        isActive 
          ? "border-primary bg-primary/5" 
          : "border-border bg-surface hover:border-border-strong"
      }`}
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-full shadow-sm border ${
        isActive ? "bg-surface-elevated text-primary border-primary/20" : "bg-surface text-text-muted border-border"
      }`}>
        {icon}
      </div>
      <span className={`text-sm font-medium ${isActive ? "text-primary" : "text-text-primary"}`}>
        {label}
      </span>
    </button>
  );
}

function Select({ value, onChange, options }: { value: string, onChange: (v: string) => void, options: { id: string, name: string }[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>{opt.name}</option>
      ))}
    </select>
  );
}
