import Link from "next/link";
import { Settings2, Settings, AlertTriangle, Blocks } from "lucide-react";

const PROJECT_SETTINGS_NAV = [
  { name: "General Settings", segment: "general", icon: Settings },
  { name: "Features & Tools", segment: "features", icon: Blocks },
  { name: "Danger Zone", segment: "danger-zone", icon: AlertTriangle, danger: true },
];

export default async function ProjectSettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceSlug: string, projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  const decodedProjectSlug = decodeURIComponent(projectSlug);
  const baseUrl = `/w/${workspaceSlug}/p/${projectSlug}/settings`;

  return (
    <div className="mx-auto max-w-5xl py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-text-primary">Project Settings</h1>
        <p className="text-sm text-text-muted mt-1">Manage {decodedProjectSlug} configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 hidden md:block">
          <ProjectNav baseUrl={baseUrl} />
        </aside>

        <aside className="md:hidden">
          <ProjectNavMobile baseUrl={baseUrl} />
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

import { ProjectNav, ProjectNavMobile } from "./nav-client";
