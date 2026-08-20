import { notFound } from "next/navigation";
import { User, Cpu, Map, Hammer, Hexagon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (!profile) return notFound();

  // Mocking "What has this person built?"
  const builtProjects = [
    { name: "Autonomous Rover", role: "Mechanical Lead", tech: "SolidWorks, Aluminum 6061", result: "Tested" },
    { name: "Water Filtration DB", role: "Solo", tech: "Next.js, PostGIS", result: "Deployed" }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 font-mono">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-16 border-b border-border pb-12">
        <div className="w-32 h-32 bg-surface border border-border flex items-center justify-center shadow-xl">
          <User className="h-12 w-12 text-text-muted" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-heading font-bold text-text-primary tracking-tight">{profile.name}</h1>
            <span className="bg-primary/10 border border-primary/20 text-primary px-3 py-1 text-xs uppercase tracking-widest">
              Engineer
            </span>
          </div>
          <p className="text-text-muted max-w-2xl">{profile.bio || "No biography provided. Judging by their work, they let their projects do the talking."}</p>
        </div>
      </div>

      {/* The "What has this person built?" Section */}
      <div className="mb-8">
        <h2 className="text-sm text-text-muted uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
          <Hammer className="h-4 w-4" /> Evidence of Work
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {builtProjects.map(proj => (
            <div key={proj.name} className="border border-border bg-surface p-6 shadow-md hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">{proj.name}</h3>
                <span className="text-[10px] uppercase border border-border px-2 py-1">{proj.result}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-text-muted uppercase tracking-widest mb-1">Role</div>
                  <div className="text-text-primary">{proj.role}</div>
                </div>
                <div>
                  <div className="text-text-muted uppercase tracking-widest mb-1">Core Tech</div>
                  <div className="text-text-primary">{proj.tech}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Domains */}
      <div className="mb-8 pt-8 border-t border-border">
        <h2 className="text-sm text-text-muted uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
          <Cpu className="h-4 w-4" /> Technical Domains
        </h2>
        <div className="flex gap-4 flex-wrap">
          <span className="border border-border bg-surface px-4 py-2 text-xs text-text-primary font-bold">ROBOTICS</span>
          <span className="border border-border bg-surface px-4 py-2 text-xs text-text-primary font-bold">FULL-STACK</span>
          <span className="border border-border bg-surface px-4 py-2 text-xs text-text-primary font-bold">CAD DESIGN</span>
        </div>
      </div>
    </div>
  );
}
