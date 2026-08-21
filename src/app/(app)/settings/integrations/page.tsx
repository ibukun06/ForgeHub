"use client";

import { useState } from "react";
import { Link as LinkIcon, Plus, ExternalLink, Settings as SettingsIcon, Trash2 } from "lucide-react";

export default function IntegrationsSettingsPage() {
  const [integrations] = useState([
    {
      id: "github",
      name: "GitHub",
      description: "Import projects, sync commits, and link issues.",
      connected: true,
      icon: "github"
    },
    {
      id: "slack",
      name: "Slack",
      description: "Receive notifications and preview ForgeHub links in Slack.",
      connected: false,
      icon: "slack"
    },
    {
      id: "jira",
      name: "Jira",
      description: "Link engineering tickets to ForgeHub milestones.",
      connected: false,
      icon: "jira"
    }
  ]);

  const handleConnect = (id: string) => {
    alert(`Connecting to ${id}... (Stub)`);
  };

  const handleDisconnect = (id: string) => {
    alert(`Disconnecting from ${id}... (Stub)`);
  };

  const handleConfigure = (id: string) => {
    alert(`Configuring ${id}... (Stub)`);
  };

  return (
    <div>
      <div className="border-b border-border pb-5 mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-heading text-text-primary mb-1">Integrations</h2>
          <p className="text-sm text-text-muted">Connect ForgeHub with your other tools and services.</p>
        </div>
      </div>

      <div className="space-y-6 max-w-3xl">
        
        {integrations.map(integration => (
          <div key={integration.id} className="p-5 border border-border rounded-xl bg-surface flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:border-primary/30">
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
              {integration.connected ? (
                <>
                  <button 
                    onClick={() => handleConfigure(integration.id)}
                    className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-elevated rounded-lg transition-colors border border-transparent hover:border-border"
                    title="Configure"
                  >
                    <SettingsIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDisconnect(integration.id)}
                    className="p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors border border-transparent hover:border-error/20"
                    title="Disconnect"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => handleConnect(integration.id)}
                  className="px-3 py-1.5 bg-surface border border-border hover:bg-surface-elevated hover:border-primary/50 text-text-primary text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
        
        <div className="mt-8 pt-6 border-t border-border flex justify-center">
          <button className="text-sm text-primary hover:text-primary-hover font-medium flex items-center gap-1 transition-colors">
            Browse all available integrations <ExternalLink className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
}
