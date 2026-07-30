import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, FileText, Flag, FolderOpen, Settings, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const TABS = [
  { slug: "overview", label: "Overview", icon: Flag },
  { slug: "docs", label: "Documentation", icon: BookOpen },
  { slug: "decisions", label: "Decisions", icon: FileText },
  { slug: "files", label: "Files", icon: FolderOpen },
  { slug: "team", label: "Team", icon: Users },
  { slug: "settings", label: "Settings", icon: Settings },
];

export default async function ProjectWorkspaceLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/project/${id}/overview`);

  const { data: membership } = await supabase.from("project_members").select("role, projects(id, name, description, project_type, visibility, updated_at, created_by)").eq("project_id", id).eq("user_id", user.id).maybeSingle();
  const project = Array.isArray(membership?.projects) ? membership?.projects[0] : membership?.projects;
  if (!membership || !project) redirect("/dashboard");

  return <div className="min-h-screen bg-bg"><div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"><Link href="/dashboard" className="text-sm text-text-muted hover:text-text-primary">← Back to projects</Link><header className="mt-7 flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-xs uppercase tracking-[0.12em] text-secondary">{project.project_type} · {project.visibility === "private" ? "Private project" : "Published snapshot"}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">{project.name}</h1>{project.description && <p className="mt-2 max-w-2xl text-text-muted">{project.description}</p>}</div><Link href={`/project/${id}/team`} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-secondary hover:text-secondary">Invite team</Link></header><nav className="-mb-px mt-5 flex gap-1 overflow-x-auto" aria-label="Project workspace"><div className="flex min-w-max gap-1">{TABS.map(({ slug, label, icon: Icon }) => <Link key={slug} href={`/project/${id}/${slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface hover:text-text-primary"><Icon className="h-4 w-4" aria-hidden />{label}</Link>)}</div></nav><main className="py-8">{children}</main></div></div>;
}
