import { notFound } from "next/navigation";
import {
  HomeScreen,
  KnowledgeScreen,
  PlaceholderScreen,
  ProjectsScreen,
  WorkScreen,
} from "@/components/app-shell/screens";
import {
  getHomeScreenData,
  getKnowledgeScreenData,
  getProjectsScreenData,
  getWorkScreenData,
} from "@/lib/app-shell-data";
import { prettyLabel } from "@/components/app-shell/shell-config";

const VALID_SECTIONS = new Set([
  "home",
  "projects",
  "work",
  "knowledge",
  "conversations",
  "reports",
  "templates",
  "admin",
]);

export default async function WorkspaceSectionPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; section: string }>;
}) {
  const { workspaceSlug, section } = await params;

  if (!VALID_SECTIONS.has(section)) {
    notFound();
  }

  const scope = `${prettyLabel(workspaceSlug)} workspace`;

  switch (section) {
    case "home":
      return <HomeScreen scope={scope} data={await getHomeScreenData(workspaceSlug)} />;
    case "projects":
      return <ProjectsScreen scope={scope} data={await getProjectsScreenData(workspaceSlug)} />;
    case "work":
      return <WorkScreen scope={scope} data={await getWorkScreenData(workspaceSlug)} />;
    case "knowledge":
      return <KnowledgeScreen scope={scope} data={await getKnowledgeScreenData(workspaceSlug)} />;
    case "conversations":
      return (
        <PlaceholderScreen
          title={`${scope} conversations`}
          description="Workspace-level communication scope for project channels, announcements, and direct coordination."
        />
      );
    case "reports":
      return (
        <PlaceholderScreen
          title={`${scope} reports`}
          description="Workspace-level reporting for health, delivery confidence, and strategic oversight."
        />
      );
    case "templates":
      return (
        <PlaceholderScreen
          title={`${scope} templates`}
          description="Reusable operating models tailored to the current workspace and its teams."
        />
      );
    case "admin":
      return (
        <PlaceholderScreen
          title={`${scope} admin`}
          description="Permissions, policies, and automations for the current workspace."
        />
      );
    default:
      return notFound();
  }
}
