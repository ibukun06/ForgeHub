import { InboxScreen } from "@/components/app-shell/screens";
import { getInboxScreenData } from "@/lib/app-shell-data";

export default async function InboxPage() {
  const data = await getInboxScreenData();
  return <InboxScreen data={data} />;
}
