"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Eye, MousePointer2 } from "lucide-react";

export default function AccessibilitySettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [accessibility, setAccessibility] = useState({
    reduce_motion: false,
    high_contrast: false,
    keyboard_shortcuts: true
  });
  
  const supabase = createClient();

  useEffect(() => {
    async function loadAccessibility() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: prefs } = await supabase
          .from('user_preferences')
          .select('accessibility')
          .eq('user_id', user.id)
          .single();
          
        if (prefs?.accessibility) {
          setAccessibility(prev => ({ ...prev, ...prefs.accessibility }));
        }
      }
      setLoading(false);
    }
    loadAccessibility();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('user_preferences')
        .update({ accessibility })
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      alert("Accessibility settings saved successfully!");
    } catch (err: unknown) {
      alert("Failed to save accessibility settings: " + (err instanceof Error ? err.message : String(err)));
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
        <h2 className="text-xl font-bold font-heading text-text-primary mb-1">Accessibility</h2>
        <p className="text-sm text-text-muted">Customize ForgeHub to meet your accessibility needs.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        
        {/* Visual Aids */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Visual Aids
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface hover:border-primary/50 transition-colors">
              <div>
                <span className="block text-sm font-medium text-text-primary">Reduce Motion</span>
                <span className="block text-xs text-text-muted mt-1">
                  Minimize UI animations and transitions throughout the application.
                </span>
              </div>
              <input
                type="checkbox"
                checked={accessibility.reduce_motion}
                onChange={(e) => setAccessibility({ ...accessibility, reduce_motion: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary/50"
              />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface hover:border-primary/50 transition-colors">
              <div>
                <span className="block text-sm font-medium text-text-primary">High Contrast Mode</span>
                <span className="block text-xs text-text-muted mt-1">
                  Increase contrast between text and backgrounds to improve readability.
                </span>
              </div>
              <input
                type="checkbox"
                checked={accessibility.high_contrast}
                onChange={(e) => setAccessibility({ ...accessibility, high_contrast: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary/50"
              />
            </div>
          </div>
        </section>

        {/* Interaction */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2 flex items-center gap-2">
            <MousePointer2 className="w-4 h-4" />
            Interaction
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface hover:border-primary/50 transition-colors">
              <div>
                <span className="block text-sm font-medium text-text-primary">Keyboard Shortcuts</span>
                <span className="block text-xs text-text-muted mt-1">
                  Enable global keyboard shortcuts for navigation and common actions.
                </span>
              </div>
              <input
                type="checkbox"
                checked={accessibility.keyboard_shortcuts}
                onChange={(e) => setAccessibility({ ...accessibility, keyboard_shortcuts: e.target.checked })}
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
            {saving ? "Saving..." : "Save Accessibility Options"}
          </button>
        </div>
      </form>
    </div>
  );
}
