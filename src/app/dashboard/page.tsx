import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { buttonVariants } from "@/components/ui/button";
import { Hammer } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Projects the current user is a member of, via project_members —
  // the same join that drives every permission check in the app.
  const { data: memberships } = await supabase
    .from("project_members")
    .select("role, projects(id, name, description, project_type, visibility, updated_at)")
    .eq("user_id", user.id);

  const projects = (memberships ?? [])
    .map((m) => m.projects)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text-primary">Projects</h1>
        <Link href="/projects/new" className={buttonVariants("primary")}>
          Forge a Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.id}/overview`}
              className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary"
            >
              <h2 className="font-medium text-text-primary">{project.name}</h2>
              {project.description && (
                <p className="mt-1 line-clamp-2 text-sm text-text-muted">{project.description}</p>
              )}
              <span className="mt-3 inline-block rounded-full border border-border px-2 py-0.5 text-xs text-text-muted">
                {project.project_type}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
      <Hammer className="h-10 w-10 text-text-muted" aria-hidden />
      <h2 className="mt-4 text-lg font-medium text-text-primary">No projects yet</h2>
      <p className="mt-1 max-w-sm text-sm text-text-muted">
        Start one and get a guided document set ready to go — no blank page.
      </p>
      <Link href="/projects/new" className={buttonVariants("primary", "mt-4")}>
        Forge a Project
      </Link>
    </div>
  );
}
