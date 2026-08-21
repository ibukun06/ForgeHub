"use client";

import { use } from "react";
import { Link as LinkIcon, Plus } from "lucide-react";

export default function WorkspaceIntegrationsSettingsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = use(params);
  const decodedSlug = decodeURIComponent(workspaceSlug);

  const integrations = [
    {
      id: "slack",
      name: "Slack",
      description: "Send workspace activity notifications to a Slack channel.",
      connected: false,
    },
    {
      id: "jira",
      name: "Jira",
      description: "Link engineering tickets across all workspace projects.",
      connected: false,
    },
    {
      id: "aws",
      name: "AWS S3",
      description: "Back up workspace CAD files to a custom S3 bucket.",
      connected: false,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-5">
        <h2 className="font-heading text-2xl text-text-primary">Integrations & Apps</h2>
        <p className="mt-2 text-sm text-text-muted">
          Connect {decodedSlug} workspace with your company&apos;s existing tools.
        </p>
      </div>

      <div className="space-y-6 max-w-3xl">
        {integrations.map(integration => (
          <div key={integration.id} className="p-5 border border-border rounded-xl bg-surface flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-text-primary shadow-sm">
                <LinkIcon className="w-5 h-5 text-text-muted" />
              </div>
              <div>
                <h3 className="font-medium text-text-primary flex items-center gap-2">
                  {integration.name}
                  {integration.connected && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium border border-emerald-500/20">
                      Connected
                    </span>
                  )}
                </h3>
                <p className="text-sm text-text-muted mt-1 max-w-xl">
                  {integration.description}
                </p>
              </div>
            </div>
            
            <div className="flex shrink-0 gap-2 mt-2 md:mt-0">
              <button 
                onClick={() => alert(`Connecting ${integration.id} (Stub)`)}
                className="px-3 py-1.5 bg-surface border border-border hover:bg-surface-elevated hover:border-primary/50 text-text-primary text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
