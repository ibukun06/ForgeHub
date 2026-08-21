import { DashboardScreen } from "@/components/app-shell/screens";
import { createClient } from "@/lib/supabase/server";
import { getDashboardScreenData } from "@/lib/app-shell-data";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const data = await getDashboardScreenData();
  
  return <DashboardScreen data={data} user={user} />;
}
