<<<<<<< HEAD
import { Settings, Users, CreditCard, Shield, Link as LinkIcon, AlertTriangle } from "lucide-react";

=======
import Link from "next/link";
import { Settings, Users, CreditCard, Shield, Link as LinkIcon, AlertTriangle } from "lucide-react";

const WORKSPACE_SETTINGS_NAV = [
  { name: "General Settings", segment: "general", icon: Settings },
  { name: "Members & Roles", segment: "members", icon: Users },
  { name: "Billing & Plans", segment: "billing", icon: CreditCard },
  { name: "Security & Access", segment: "security", icon: Shield },
  { name: "Integrations & Apps", segment: "integrations", icon: LinkIcon },
  { name: "Danger Zone", segment: "danger-zone", icon: AlertTriangle, danger: true },
];

>>>>>>> dfb45177077b186131dffe1e49d84d8e443f6418
export default async function WorkspaceSettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const decodedSlug = decodeURIComponent(workspaceSlug);
  const baseUrl = `/w/${workspaceSlug}/settings`;

  // We are currently rendering inside a layout where the active route segment isn't readily available.
  // Next.js App Router nested layouts don't easily get the active leaf segment without Client Components.
  // To keep this simple and fast, we'll use a Client Component for the navigation links.
  
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-text-primary">Workspace Settings</h1>
        <p className="text-sm text-text-muted mt-1">Manage {decodedSlug} workspace preferences and team access.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 hidden md:block">
          <WorkspaceNav baseUrl={baseUrl} />
        </aside>

        <aside className="md:hidden">
          <WorkspaceNavMobile baseUrl={baseUrl} />
        </aside>

        <main className="md:col-span-3">
          <div className="surface-panel p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// Client components to handle active state
import { WorkspaceNav, WorkspaceNavMobile } from "./nav-client";
