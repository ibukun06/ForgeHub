import { createClient } from "@/lib/supabase/server";
import { buttonVariants } from "@/components/ui/button";

export default async function ProfileSettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let profile = null;
  if (user) {
    const { data } = await supabase.from("users").select("*").eq("id", user.id).single();
    profile = data;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-text-primary">Profile</h1>
        <p className="mt-2 text-sm text-text-muted">Manage your public identity and professional details.</p>
      </div>

      <div className="surface-panel p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Full Name</label>
          <input 
            type="text" 
            defaultValue={profile?.name || ""} 
            className="w-full max-w-md bg-surface-muted border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Institution or Company</label>
          <input 
            type="text" 
            defaultValue={profile?.institution || ""} 
            className="w-full max-w-md bg-surface-muted border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="University of Engineering"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Bio</label>
          <textarea 
            defaultValue={profile?.bio || ""} 
            rows={4}
            className="w-full max-w-2xl bg-surface-muted border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Tell us about your background and interests."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Skills</label>
          <input 
            type="text" 
            defaultValue={(profile?.skills || []).join(", ")} 
            className="w-full max-w-2xl bg-surface-muted border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="React, Mechanical Engineering, CAD, Python (comma separated)"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button className={buttonVariants({ variant: "primary" })}>Save changes</button>
      </div>
    </div>
  );
}
