"use client";

import { useState } from "react";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { WorkspaceSidebar } from "./WorkspaceSidebar";

export function WorkspaceShell({ projectId, project, children }: { projectId: string; project: { name: string; project_type: string; visibility: string; updated_at: string }; children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div className="min-h-screen bg-bg"><div className="mx-auto max-w-[1520px] px-3 py-3 sm:px-6 lg:px-8"><WorkspaceHeader projectId={projectId} project={project} onMenu={() => setSidebarOpen(true)} /><div className="mt-4 grid gap-5 lg:grid-cols-[224px_minmax(0,1fr)]"><WorkspaceSidebar projectId={projectId} open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><main id="workspace-main" className="min-w-0">{children}</main></div></div></div>;
}
