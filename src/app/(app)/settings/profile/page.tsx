"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProfileSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    bio: "",
  });
  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setFormData({
          fullName: user.user_metadata?.full_name || "",
          username: user.user_metadata?.username || "",
          bio: user.user_metadata?.bio || "",
        });
      }
    }
    loadUser();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
          username: formData.username,
          bio: formData.bio,
        }
      });
      if (error) throw error;
      alert("Profile updated successfully!");
    } catch (err: any) {
      alert("Error updating profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold font-heading text-text-primary mb-1">Public Profile</h2>
      <p className="text-sm text-text-muted mb-6">This information will be displayed publicly on your profile.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Username</label>
          <div className="flex rounded-lg shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-border bg-surface text-text-muted text-sm">
              forgehub.com/profile/
            </span>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="flex-1 block w-full min-w-0 rounded-none rounded-r-lg bg-input-bg border border-border px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="johndoe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Bio</label>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="A short bio about yourself..."
          />
          <p className="mt-1 text-xs text-text-muted">Brief description for your profile. URLs are hyperlinked.</p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
