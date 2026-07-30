import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProjectCreationForm } from "@/components/projects/ProjectCreationForm";

export default async function NewProjectPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/projects/new");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-secondary">Start a new build</p>
        <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">Give the idea some structure.</h1>
        <p className="mt-4 leading-relaxed text-text-muted">Answer a few useful questions, then ForgeHub will prepare a private project record instead of dropping you into a blank dashboard.</p>
      </div>
      <ProjectCreationForm />
    </div>
  );
}
