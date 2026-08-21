"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AccountSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState("");
  const [startPage, setStartPage] = useState("home");
  
  const supabase = createClient();

  useEffect(() => {
    async function loadAccount() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
        
        // Load preferences
        const { data: prefs } = await supabase
          .from('user_preferences')
          .select('account')
          .eq('user_id', user.id)
          .single();
          
        if (prefs?.account) {
          const account = prefs.account as Record<string, unknown>;
          if (account.default_start_page) {
            setStartPage(String(account.default_start_page));
          }
        }
      }
      setLoading(false);
    }
    loadAccount();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Update email if changed
      if (email !== user.email) {
        const { error: authErr } = await supabase.auth.updateUser({ email });
        if (authErr) throw authErr;
        // In Supabase, this sends a confirmation email to both old and new addresses.
      }

      // Update preferences
      const { error: prefErr } = await supabase
        .from('user_preferences')
        .update({
          account: {
            default_start_page: startPage
          }
        })
        .eq('user_id', user.id);
        
      if (prefErr) throw prefErr;
      
      alert("Account settings saved successfully!" + (email !== user.email ? " Please check your email to confirm the change." : ""));
    } catch (err: unknown) {
      alert("Failed to save account settings: " + (err instanceof Error ? err.message : String(err)));
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
        <h2 className="text-xl font-bold font-heading text-text-primary mb-1">Account Identity</h2>
        <p className="text-sm text-text-muted">Manage your email address and app behavior.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        {/* Email Address */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Email Address</h3>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Primary Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-2/3 bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="you@example.com"
            />
            <p className="mt-2 text-xs text-text-muted">
              Changing your email will require verification. A confirmation link will be sent to both your old and new addresses.
            </p>
          </div>
        </section>

        {/* App Behavior */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">App Behavior</h3>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Default Start Page</label>
            <select
              value={startPage}
              onChange={(e) => setStartPage(e.target.value)}
              className="w-full md:w-1/2 bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="home">Home (Landing Page)</option>
              <option value="dashboard">Dashboard</option>
              <option value="explore">Explore</option>
              <option value="last_project">Last Visited Project</option>
            </select>
            <p className="mt-2 text-xs text-text-muted">
              Choose what you see first when intentionally opening ForgeHub. Public links will continue to function normally.
            </p>
          </div>
        </section>

        <div className="pt-5 border-t border-border flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="signal-pill signal-pill-brand disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Account"}
          </button>
        </div>
      </form>
    </div>
  );
}
