"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const DISCIPLINES = [
  "Mechanical Engineering",
  "Mechatronics",
  "Electrical/Electronics",
  "Civil Engineering",
  "Software Engineering",
  "Manufacturing",
  "Robotics",
  "Aerospace",
  "Energy",
  "Computer Engineering",
  "Other"
];

const EXPERIENCE_LEVELS = [
  "Student",
  "Beginner",
  "Intermediate",
  "Professional",
  "Researcher",
  "Educator"
];

export default function ProfileSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [, setUser] = useState<{ id: string } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    location: "",
    website: "",
    institution: "",
    title: "",
    discipline: "",
    skills: "",
    expertise: "",
    twitter: "",
    github: "",
    linkedin: ""
  });
  
  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        
        // Fetch full profile from public.users
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profile) {
          const p = profile as { social_links?: Record<string, string>; name?: string; username?: string; bio?: string; location?: string; website?: string; institution?: string; title?: string; discipline?: string; skills?: string[]; expertise?: string[] };
          const social = p.social_links || {};
          setFormData({
            name: p.name || user.user_metadata?.full_name || "",
            username: p.username || user.user_metadata?.username || "",
            bio: p.bio || "",
            location: p.location || "",
            website: p.website || "",
            institution: p.institution || "",
            title: p.title || "",
            discipline: p.discipline || "",
            skills: (p.skills || []).join(", "),
            expertise: (p.expertise || []).join(", "),
            twitter: social.twitter || "",
            github: social.github || "",
            linkedin: social.linkedin || ""
          });
        }
      }
      setLoading(false);
    }
    loadUser();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // 1. Update Auth metadata (for username/name)
      await supabase.auth.updateUser({
        data: {
          full_name: formData.name,
          username: formData.username,
        }
      });
      
      const updateData: Record<string, unknown> = {
        name: formData.name,
        username: formData.username,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        institution: formData.institution,
        title: formData.title,
        discipline: formData.discipline,
        skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
        expertise: formData.expertise.split(",").map(s => s.trim()).filter(Boolean),
        social_links: {
          twitter: formData.twitter,
          github: formData.github,
          linkedin: formData.linkedin
        }
      };

      // 2. Update public profile directly
      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Use ForgeHub toast logic here instead of alert in future, but standardizing as requested
      alert("Profile saved successfully!");
    } catch (err: unknown) {
      alert("Failed to save profile: " + (err instanceof Error ? err.message : String(err)));
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
        <h2 className="text-xl font-bold font-heading text-text-primary mb-1">Public Profile</h2>
        <p className="text-sm text-text-muted">Manage your public ForgeHub identity and professional information.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        {/* Basic Info */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Basic Info</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Ada Lovelace"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Username</label>
              <div className="flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-border bg-surface text-text-muted text-sm">
                  forgehub.com/u/
                </span>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="flex-1 block w-full min-w-0 rounded-none rounded-r-lg bg-input-bg border border-border px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="adalovelace"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Bio</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Tell us about yourself..."
            />
          </div>
        </section>

        {/* Professional Identity */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Professional Identity</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Professional Title</label>
              <select
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select level...</option>
                {EXPERIENCE_LEVELS.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Engineering Discipline</label>
              <select
                value={formData.discipline}
                onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select discipline...</option>
                {DISCIPLINES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Institution / Company</label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g. MIT, SpaceX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g. San Francisco, CA"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Skills (comma separated)</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="CAD, Python, FEA..."
            />
          </div>
        </section>

        {/* Links */}
        <section className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted border-b border-border pb-2">Links & Social</h3>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Website / Portfolio</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">GitHub</label>
              <input
                type="text"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="@username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">LinkedIn</label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Twitter / X</label>
              <input
                type="text"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="w-full bg-input-bg border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="@username"
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
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
