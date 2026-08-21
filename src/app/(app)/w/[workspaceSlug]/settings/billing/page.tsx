"use client";

import { use } from "react";
import { CreditCard, Check } from "lucide-react";

export default function WorkspaceBillingSettingsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  // Parameter destructured but not used in this mock UI

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-5">
        <h2 className="font-heading text-2xl text-text-primary">Billing & Plans</h2>
        <p className="mt-2 text-sm text-text-muted">
          Manage your workspace subscription and billing details.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">Current Plan</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary">Free Tier</h3>
              <p className="text-sm text-text-muted mt-1 max-w-xl">
                Up to 3 members and 5GB of storage. Essential engineering tools included.
              </p>
            </div>
            <button className="shrink-0 signal-pill signal-pill-brand flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" />
              Upgrade Plan
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
            Available Plans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border border-primary bg-surface-elevated rounded-xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-bl-lg">
                Current
              </div>
              <h4 className="font-bold text-text-primary">Free</h4>
              <div className="mt-2 mb-4">
                <span className="text-2xl font-bold">$0</span>
                <span className="text-text-muted text-sm">/mo</span>
              </div>
              <ul className="space-y-2 text-sm text-text-muted">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 3 Team Members</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 5GB CAD Storage</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Basic Versioning</li>
              </ul>
            </div>
            
            <div className="p-5 border border-border bg-surface hover:border-primary/50 transition-colors rounded-xl shadow-sm">
              <h4 className="font-bold text-text-primary">Professional</h4>
              <div className="mt-2 mb-4">
                <span className="text-2xl font-bold">$19</span>
                <span className="text-text-muted text-sm">/user/mo</span>
              </div>
              <ul className="space-y-2 text-sm text-text-muted">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Unlimited Members</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 500GB Storage</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Advanced Branching</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> High-Perf CAD Engine</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
