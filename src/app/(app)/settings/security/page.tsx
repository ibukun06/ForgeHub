"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { KeyRound, Smartphone } from "lucide-react";

export default function SecuritySettingsPage() {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const supabase = createClient();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      alert("Password updated successfully!");
      setNewPassword("");
    } catch (err: unknown) {
      alert("Error updating password: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="border-b border-border pb-5 mb-6">
        <h2 className="text-xl font-bold font-heading text-text-primary mb-1">Security & Access</h2>
        <p className="text-sm text-text-muted">Manage your password and secure your account.</p>
      </div>

      <div className="space-y-8 max-w-3xl">
        
        {/* Password Change */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2 flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            Change Password
          </h3>
          
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter new password"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !newPassword}
              className="signal-pill signal-pill-brand disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </section>

        {/* Sessions Stub */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2 flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Active Sessions
          </h3>
          <div className="p-4 rounded-xl border border-border bg-surface-elevated shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Current Session</p>
                <p className="text-xs text-text-muted mt-1">Windows • Browser</p>
              </div>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">Active now</span>
            </div>
          </div>
          <p className="text-xs text-text-muted">
            Session management capabilities will be fully implemented in a future update.
          </p>
        </section>

      </div>
    </div>
  );
}
