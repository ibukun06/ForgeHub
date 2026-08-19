import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { getProjectUrl } from "@/lib/urls";
import { initials } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: profile } = await supabase.from("users").select("name").eq("id", id).maybeSingle();
  
  if (!profile) return {};

  return {
    title: `${profile.name} — Portfolio`,
    description: `View ${profile.name}'s engineering projects on ForgeHub.`,
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: profile } = await supabase.from("users").select("*").eq("id", id).maybeSingle();
  if (!profile) notFound();

  // Get published projects created by the user
  const { data: projectsData } = await supabase
    .from("projects")
    .select("id, name, description, project_type, slug, visibility")
    .eq("created_by", id)
    .eq("visibility", "published");

  const uniqueProjects = projectsData || [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-primary font-heading text-3xl font-bold text-white shadow-lg">
          {initials(profile.name || "F H")}
        </span>
        <div className="mt-6 sm:ml-8 sm:mt-0">
          <h1 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
            {profile.name || "ForgeHub Builder"}
          </h1>
          {profile.institution && (
            <p className="mt-2 text-lg text-secondary">{profile.institution}</p>
          )}
          {profile.bio && (
            <p className="mt-3 max-w-2xl text-text-muted">{profile.bio}</p>
          )}
          {profile.skills && profile.skills.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              {profile.skills.map((skill: string) => (
                <span key={skill} className="rounded-full bg-input-bg px-3 py-1 font-mono text-xs text-text-muted">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="border-b border-border pb-4 font-heading text-2xl font-bold text-text-primary">
          Published Projects ({uniqueProjects.length})
        </h2>
        
        {uniqueProjects.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-text-muted">No published projects yet.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {uniqueProjects.map((project: { id: string; name: string; description: string | null; project_type: string; slug: string; visibility: string }) => (
              <Link
                key={project.id}
                href={getProjectUrl(project.slug)}
                className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-border px-2 py-0.5 text-xs text-text-muted">
                    {project.project_type}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-text-primary">{project.name}</h3>
                {project.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-text-muted">{project.description}</p>
                )}
                <div className="mt-auto pt-6 text-sm font-medium text-primary hover:text-primary-hover">
                  View Project →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
