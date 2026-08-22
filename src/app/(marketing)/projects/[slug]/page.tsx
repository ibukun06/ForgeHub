import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ArrowLeft, BookOpen, Calendar, Cpu, User } from "lucide-react";
import Link from "next/link";
import { relativeTime } from "@/lib/format";

export default async function PublicProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch the published project
  const { data: project } = await supabase
    .from("projects")
    .select("*, users!projects_created_by_fkey(name)")
    .eq("slug", slug)
    .eq("visibility", "published")
    .single();

  if (!project) {
    notFound();
  }

  // Fetch project materials
  const [{ data: documents }, { data: decisions }] = await Promise.all([
    supabase
      .from("documents")
      .select("id, title, document_type, created_at")
      .eq("project_id", project.id)
      .order("created_at", { ascending: true }),
    supabase
      .from("decisions")
      .select("id, decision, rationale, created_at")
      .eq("project_id", project.id)
      .order("created_at", { ascending: false })
  ]);

  const docs = documents || [];
  const decs = decisions || [];
  
  // Fetch sections for all documents to display content
  let sections: any[] = [];
  if (docs.length > 0) {
    const { data: secs } = await supabase
      .from("sections")
      .select("*")
      .in("document_id", docs.map(d => d.id))
      .order("created_at", { ascending: true });
    sections = secs || [];
  }

  return (
    <div className="min-h-screen bg-bg font-sans">
      {/* Navigation */}
      <nav className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/explore" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 text-sm">
              <ArrowLeft className="h-4 w-4" /> Back to Explore
            </Link>
          </div>
          <BrandLogo size={20} />
          <div className="w-24"></div> {/* Spacer for centering logo */}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Project Header */}
        <header className="mb-16">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-text-primary">{project.project_type}</span>
            <span className="inline-flex items-center rounded-full bg-surface-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-text-primary">Published</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            {project.name}
          </h1>
          <p className="text-xl text-text-muted max-w-3xl leading-relaxed mb-8">
            {project.description || "No description provided."}
          </p>
          
          <div className="flex flex-wrap gap-6 text-sm text-text-muted border-y border-border py-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>By {project.users?.name || 'Unknown Builder'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Started {relativeTime(project.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{docs.length} Documents</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              <span>{decs.length} Decisions</span>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Content Area: Documents */}
          <div className="space-y-16">
            {docs.map(doc => {
              const docSections = sections.filter(s => s.document_id === doc.id);
              return (
                <article key={doc.id} className="scroll-mt-24" id={`doc-${doc.id}`}>
                  <div className="border-b border-border pb-4 mb-8">
                    <h2 className="font-heading text-2xl font-bold text-text-primary">{doc.title || 'Untitled Document'}</h2>
                    <p className="text-xs uppercase tracking-widest text-text-muted mt-2">{doc.document_type}</p>
                  </div>
                  
                  <div className="space-y-8">
                    {docSections.map(section => (
                      <div key={section.id} className="prose prose-invert prose-p:text-text-muted prose-headings:text-text-primary max-w-none">
                        {/* We use dangerouslySetInnerHTML safely here as the content was generated via our rich text editor */}
                        <div dangerouslySetInnerHTML={{ __html: section.prompt || '<p class="italic text-text-muted">Empty section.</p>' }} />
                      </div>
                    ))}
                    {docSections.length === 0 && (
                      <p className="text-text-muted italic">This document has no content.</p>
                    )}
                  </div>
                </article>
              );
            })}
            
            {docs.length === 0 && (
              <div className="text-center py-12 border border-border bg-surface-muted rounded-xl">
                <p className="text-text-muted">No documents have been published for this project yet.</p>
              </div>
            )}
          </div>

          {/* Sidebar: Decisions Log & Table of Contents */}
          <aside className="space-y-8">
            {/* Table of Contents */}
            <div className="border border-border bg-surface p-6 sticky top-24">
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" /> Contents
              </h3>
              <ul className="space-y-2 text-sm">
                {docs.map(doc => (
                  <li key={doc.id}>
                    <a href={`#doc-${doc.id}`} className="text-text-muted hover:text-primary transition-colors">
                      {doc.title || 'Untitled'}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decisions Log */}
            <div className="border border-border bg-surface-muted p-6">
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-primary" /> Key Decisions
              </h3>
              {decs.length > 0 ? (
                <div className="space-y-6">
                  {decs.map(decision => (
                    <div key={decision.id} className="border-l-2 border-primary pl-4">
                      <h4 className="font-semibold text-text-primary text-sm mb-2">{decision.decision}</h4>
                      <p className="text-xs text-text-muted line-clamp-3">{decision.rationale}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-text-muted italic">No architectural decisions logged yet.</p>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
