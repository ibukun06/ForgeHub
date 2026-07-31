import { KnowledgeScreen } from "@/components/app-shell/screens";
import { getKnowledgeScreenData } from "@/lib/app-shell-data";

export default async function KnowledgePage() {
  const data = await getKnowledgeScreenData();
  return <KnowledgeScreen data={data} />;
}
