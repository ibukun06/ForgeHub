import { ProjectsScreen } from "@/components/app-shell/screens";
import { getProjectsScreenData } from "@/lib/app-shell-data";

export default async function ProjectsPage() {
  const data = await getProjectsScreenData();
  return <ProjectsScreen data={data} />;
}
