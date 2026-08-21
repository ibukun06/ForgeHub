import { notFound } from "next/navigation";
import { User, Cpu, Hammer } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch the public profile
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (!profile) return notFound();

  // Fetch published projects for this user
  const { data: projects } = await supabase
    .from("projects")
    .select("*, workspaces (slug)")
    .eq("created_by", profile.id)
    .eq("visibility", "published")
    .order("created_at", { ascending: false });

  // Fallback projects if none found, but in reality we just render what we get
  const builtProjects = projects || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 font-mono">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-16 border-b border-border pb-12">
        <div className="w-32 h-32 bg-surface border border-border flex items-center justify-center shadow-xl overflow-hidden">
          <User className="h-12 w-12 text-text-muted" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h1 className="text-4xl font-heading font-bold text-text-primary tracking-tight">
              {profile.name || "Unknown Builder"}
            </h1>
            <span className="bg-primary/10 border border-primary/20 text-primary px-3 py-1 text-xs uppercase tracking-widest w-max">
              {profile.institution || "Builder"}
            </span>
          </div>
          <p className="text-text-muted max-w-2xl mb-4">
            {profile.bio || "No biography provided. Judging by their work, they let their projects do the talking."}
          </p>
        </div>
      </div>

      {/* The "What has this person built?" Section */}
      <div className="mb-8">
        <h2 className="text-sm text-text-muted uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
          <Hammer className="h-4 w-4" /> Evidence of Work
        </h2>
        
        {builtProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {builtProjects.map(proj => (
              <Link href={`/projects/${proj.slug}`} key={proj.id} className="block group">
                <div className="border border-border bg-surface p-6 shadow-md hover:border-primary/50 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">{proj.name}</h3>
                      <span className="text-[10px] uppercase border border-border px-2 py-1">{proj.project_type}</span>
                    </div>
                    <p className="text-sm text-text-muted mb-4 line-clamp-2">
                      {proj.description || "No description provided."}
                    </p>
                  </div>
                  
                  <div className="text-xs text-text-muted flex items-center justify-between border-t border-border pt-4 mt-4">
                    <span>Published</span>
                    <span className="text-primary font-bold">View Project →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 border border-border bg-surface flex flex-col items-center justify-center text-center">
            <Hammer className="h-8 w-8 text-border mb-4" />
            <h3 className="text-lg font-bold text-text-primary mb-1">No Public Projects</h3>
            <p className="text-sm text-text-muted">This user hasn&apos;t published any projects yet.</p>
          </div>
        )}
      </div>

      {/* Technical Domains */}
      {(profile.skills && profile.skills.length > 0) && (
        <div className="mb-8 pt-8 border-t border-border">
          <h2 className="text-sm text-text-muted uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Cpu className="h-4 w-4" /> Technical Domains
          </h2>
          <div className="flex gap-4 flex-wrap">
            {profile.skills.map((skill: string) => (
              <span key={skill} className="border border-border bg-surface px-4 py-2 text-xs text-text-primary font-bold uppercase tracking-wider">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
