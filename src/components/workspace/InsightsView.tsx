"use client";

import { AlertTriangle, TrendingUp, Users } from "lucide-react";
import type { InsightsScreenData } from "@/lib/app-shell-data";
import { prettyLabel } from "@/components/app-shell/shell-config";

export function InsightsView({ 
  projectSlug, 
  data 
}: { 
  workspaceSlug: string; 
  projectSlug: string; 
  data: InsightsScreenData;
}) {
  const { metrics, deliveryConfidence, workload, risks } = data;

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow text-secondary">{prettyLabel(projectSlug)} · Insights</p>
          <h1 className="mt-3 font-heading text-3xl text-text-primary sm:text-4xl">Project Health</h1>
          <p className="mt-4 text-base text-text-muted">
            Telemetry derived from workspace activity, section completion, and decision velocity.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="surface-panel p-5">
            <p className="text-sm font-medium text-text-muted">{metric.label}</p>
            <p className="mt-2 text-3xl font-heading text-text-primary">{metric.value}</p>
            <p className="mt-2 text-xs text-text-muted">{metric.hint}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="surface-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-secondary" />
            <h2 className="font-heading text-xl text-text-primary">Delivery confidence</h2>
          </div>
          <div className="relative pt-4 pb-2">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-text-muted">Current track</span>
              <span className="font-mono text-primary font-medium">{deliveryConfidence}%</span>
            </div>
            <div className="w-full h-3 bg-surface-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-1000" 
                style={{ width: `${deliveryConfidence}%` }} 
              />
            </div>
            <p className="text-xs text-text-muted mt-3">Calculated from approved sections versus total defined project scope.</p>
          </div>
        </div>

        <div className="surface-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h2 className="font-heading text-xl text-text-primary">Risk heatmap</h2>
          </div>
          <div className="space-y-3 mt-4">
            {risks.length === 0 ? (
              <p className="text-sm text-text-muted">No identified risks.</p>
            ) : (
              risks.map((risk, i) => (
                <div key={i} className="flex gap-3 items-start text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
                  <span className="text-text-primary">{risk}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="surface-panel p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-secondary" />
          <h2 className="font-heading text-xl text-text-primary">Workload signals</h2>
        </div>
        <div className="space-y-4">
          {workload.map((user, i) => (
            <div key={i} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0">
              <span className="text-sm font-medium text-text-primary">{user.member}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted">{user.assignedCount} pending items</span>
                <div className="w-24 h-1.5 bg-surface-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${user.assignedCount > 5 ? 'bg-error' : user.assignedCount > 2 ? 'bg-warning' : 'bg-success'}`}
                    style={{ width: `${Math.min(100, (user.assignedCount / 10) * 100)}%` }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
