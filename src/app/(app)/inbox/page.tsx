import { InboxScreen } from "@/components/app-shell/screens";
import { getInboxScreenData } from "@/lib/app-shell-data";

export default async function InboxPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const tabParam = searchParams.tab;
  const activeTab = typeof tabParam === "string" ? tabParam : "Messages";
  const data = await getInboxScreenData();
  
  return <InboxScreen data={data} activeTab={activeTab} />;
}
