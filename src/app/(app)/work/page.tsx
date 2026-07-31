import { WorkScreen } from "@/components/app-shell/screens";
import { getWorkScreenData } from "@/lib/app-shell-data";

export default async function WorkPage() {
  const data = await getWorkScreenData();
  return <WorkScreen data={data} />;
}
