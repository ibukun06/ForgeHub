import { HomeScreen } from "@/components/app-shell/screens";
import { getHomeScreenData } from "@/lib/app-shell-data";

export default async function HomePage() {
  const data = await getHomeScreenData();
  return <HomeScreen data={data} />;
}
