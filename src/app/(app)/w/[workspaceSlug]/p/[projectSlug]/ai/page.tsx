import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AIChat } from "@/components/workspace/ai-chat";

export default async function ProjectAIPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", projectSlug)
    .maybeSingle();

  if (!project) {
    notFound();
  }

  return (
    <div className="flex h-full flex-col p-4 md:p-8">
      <div className="mx-auto w-full max-w-4xl h-full pb-12 lg:pb-0">
        <AIChat projectId={project.id} />
      </div>
    </div>
  );
}
