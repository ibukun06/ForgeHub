"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { KeyRound, Smartphone } from "lucide-react";

export default function SecuritySettingsPage() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
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
      setPassword("");
      setNewPassword("");
    } catch (err: any) {
      alert("Error updating password: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold font-heading text-text-primary mb-1">Security & Access</h2>
      <p className="text-sm text-text-muted mb-6">Manage your password and secure your account.</p>

      <div className="space-y-8">
        
        {/* Password Change */}
        <div>
          <div className="flex items-center gap-2 mb-4 text-text-primary font-medium">
            <KeyRound className="h-4 w-4" />
            <h3>Change Password</h3>
          </div>
          
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
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>

        <hr className="border-border" />

        {/* Sessions Stub */}
        <div>
          <div className="flex items-center gap-2 mb-4 text-text-primary font-medium">
            <Smartphone className="h-4 w-4" />
            <h3>Active Sessions</h3>
          </div>
          <div className="p-4 rounded-lg border border-border bg-surface-muted">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Current Session</p>
                <p className="text-xs text-text-muted mt-1">Windows • Microsoft Edge</p>
              </div>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">Active now</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-text-muted">
            Session management capabilities will be fully implemented in a future update.
          </p>
        </div>

      </div>
    </div>
  );
}
