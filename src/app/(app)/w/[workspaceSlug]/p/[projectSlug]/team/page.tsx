import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TeamManagement } from "@/components/project/TeamManagement";
import { ProjectCockpitScreen } from "@/components/app-shell/screens";
import { prettyLabel } from "@/components/app-shell/shell-config";

export default async function ProjectTeamPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  const supabase = await createClient();

  // 1. Fetch the project to verify existence and get ID
  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", projectSlug)
    .single();

  if (!project) notFound();

  // 2. Fetch active members (this implicitly checks RLS, but if the user is a member, they can read project_members)
  const { data: members, error: membersError } = await supabase
    .from("project_members")
    .select(`
      id,
      user_id,
      role,
      joined_at,
      users ( name, email )
    `)
    .eq("project_id", project.id)
    .order("joined_at", { ascending: true });

  if (membersError || !members) notFound();

  // 3. Determine if current user is team_lead
  const { data: { user } } = await supabase.auth.getUser();
  const currentMember = members.find((m) => m.user_id === user?.id);
  const isLead = currentMember?.role === "team_lead";

  // 4. Fetch pending invites (ONLY if team_lead; otherwise RLS returns empty/error, so we skip)
  let invites: { id: string; email: string; role: string; expires_at: string }[] = [];
  if (isLead) {
    const { data: fetchedInvites } = await supabase
      .from("invites")
      .select("id, email, role, expires_at")
      .eq("project_id", project.id)
      .is("accepted_at", null)
      .order("created_at", { ascending: false });
    
    if (fetchedInvites) invites = fetchedInvites;
  }

  // Format data for the client component
  // We need to type-cast since Supabase's joined `users` comes as an array or object
  // and we expect an object.
  const formattedMembers = members.map((m) => ({
    id: m.id,
    user_id: m.user_id,
    role: m.role,
    joined_at: m.joined_at,
    users: Array.isArray(m.users) ? m.users[0] : m.users,
  }));

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow">Project structure</p>
          <h1 className="mt-3 font-heading text-3xl text-text-primary sm:text-4xl">Team Management</h1>
          <p className="mt-3 text-base text-text-muted">
            Manage who has access to {prettyLabel(projectSlug)}. Access is divided into execution (leads, contributors) and observation (advisors).
          </p>
        </div>
      </div>
      
      <TeamManagement
        projectId={project.id}
        currentUserId={user?.id || ""}
        members={formattedMembers}
        invites={invites}
        isLead={isLead}
      />
    </div>
  );
}
