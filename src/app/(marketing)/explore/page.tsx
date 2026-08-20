import { Network, Database, Layers, Search, Cpu, FolderOpen } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ExplorePage() {
  const supabase = await createClient();

  // Fetch published projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*, users!projects_created_by_fkey(name, username)")
    .eq("visibility", "published")
    .order("created_at", { ascending: false });

  const publishedProjects = projects || [];

  return (
    <div className="min-h-screen bg-bg font-mono">
      {/* Explore Header */}
      <header className="border-b border-border bg-surface-muted py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BrandLogo size={24} className="mb-6" />
          <h1 className="text-4xl font-heading font-bold text-text-primary tracking-tight mb-4">
            Technical Discovery
          </h1>
          <p className="text-text-muted max-w-2xl text-sm leading-relaxed">
            Don't just see what people are posting. See what they are building. Explore technical projects, 
            understand the problems being solved, and discover the materials and technologies shaping them.
          </p>
          
          <div className="mt-8 relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search projects, materials, domains, or problems..." 
              className="w-full bg-surface border border-border py-4 pl-12 pr-4 text-sm text-text-primary focus:outline-none focus:border-primary shadow-inner"
            />
          </div>
        </div>
      </header>

      {/* Discovery Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.2em] text-text-muted mb-6 flex items-center gap-2">
            <FolderOpen className="h-4 w-4" /> Recently Published Projects
          </h2>

          {publishedProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedProjects.map(proj => (
                <Link href={`/projects/${proj.slug}`} key={proj.id} className="block group h-full">
                  <div className="border border-border bg-surface p-6 shadow-md hover:border-primary/50 transition-colors h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">{proj.name}</h3>
                        <span className="text-[10px] uppercase border border-border px-2 py-1 bg-surface-muted">{proj.project_type}</span>
                      </div>
                      <p className="text-sm text-text-muted mb-4 line-clamp-3">
                        {proj.description || "No description provided."}
                      </p>
                    </div>
                    
                    <div className="text-xs text-text-muted flex items-center justify-between border-t border-border pt-4 mt-4">
                      <span>by {proj.users?.name || proj.users?.username || 'Unknown Builder'}</span>
                      <span className="text-primary font-bold">View Project →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 border border-border bg-surface-muted flex flex-col items-center justify-center text-center">
              <FolderOpen className="h-8 w-8 text-border mb-4" />
              <h3 className="text-lg font-bold text-text-primary mb-1">No Projects Found</h3>
              <p className="text-sm text-text-muted">There are no published projects on ForgeHub yet.</p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Domains */}
          <div className="col-span-1 border border-border bg-surface shadow-xl p-6">
            <h2 className="text-xs uppercase tracking-[0.2em] text-text-muted mb-6 flex items-center gap-2">
              <Cpu className="h-4 w-4" /> Domains
            </h2>
            <div className="space-y-3">
              {['Mechanical Systems', 'Robotics', 'Renewable Energy', 'AI & ML', 'Embedded Systems'].map(domain => (
                <div key={domain} className="flex justify-between items-center text-sm group cursor-pointer border-b border-border/50 pb-2">
                  <span className="text-text-primary group-hover:text-primary transition-colors">{domain}</span>
                  <span className="text-text-muted text-[10px]">Explore</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Graph Sample */}
          <div className="col-span-2 border border-border bg-surface-muted shadow-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <h2 className="text-xs uppercase tracking-[0.2em] text-text-muted mb-6 flex items-center gap-2">
              <Network className="h-4 w-4" /> Living Technical Graph
            </h2>
            
            <div className="relative h-[300px] flex items-center justify-center">
              {/* Abstract network visualization */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary/40 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-primary">PROJECT</span>
              </div>
              <div className="absolute top-1/4 left-1/4 w-24 h-24 border border-border rounded-full flex items-center justify-center">
                <span className="text-[10px] text-text-muted">MATERIAL</span>
              </div>
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-border rounded-full flex items-center justify-center">
                <span className="text-[10px] text-text-muted">PROBLEM</span>
              </div>
              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-border stroke-[1.5px]" fill="none">
                <line x1="50%" y1="50%" x2="25%" y2="25%" />
                <line x1="50%" y1="50%" x2="75%" y2="75%" />
              </svg>
            </div>
            
            <div className="text-center mt-4 text-xs text-text-muted">
              Projects connect through shared materials, problems, and solutions.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
