"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Users, CreditCard, Shield, Link as LinkIcon, AlertTriangle } from "lucide-react";

const WORKSPACE_SETTINGS_NAV = [
  { name: "General Settings", segment: "general", icon: Settings },
  { name: "Members & Roles", segment: "members", icon: Users },
  { name: "Billing & Plans", segment: "billing", icon: CreditCard },
  { name: "Security & Access", segment: "security", icon: Shield },
  { name: "Integrations & Apps", segment: "integrations", icon: LinkIcon },
  { name: "Danger Zone", segment: "danger-zone", icon: AlertTriangle, danger: true },
];

export function WorkspaceNav({ baseUrl }: { baseUrl: string }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {WORKSPACE_SETTINGS_NAV.map((item) => {
        const href = `${baseUrl}/${item.segment}`;
        const active = pathname.includes(`/${item.segment}`);
        const Icon = item.icon;
        
        return (
          <Link
            key={item.segment}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              active
                ? "bg-surface-elevated text-primary font-medium shadow-sm border border-border"
                : "text-text-muted hover:text-text-primary hover:bg-surface border border-transparent"
            } ${item.danger && !active ? "hover:text-error" : ""} ${
              item.danger && active ? "text-error border-error/20 bg-error/10" : ""
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

export function WorkspaceNavMobile({ baseUrl }: { baseUrl: string }) {
  const pathname = usePathname();
  
  // Find current active segment for the select element
  const activeSegment = WORKSPACE_SETTINGS_NAV.find(item => pathname.includes(`/${item.segment}`))?.segment || "general";

  return (
    <select 
      className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-text-primary"
      value={activeSegment}
      onChange={(e) => window.location.href = `${baseUrl}/${e.target.value}`}
    >
      {WORKSPACE_SETTINGS_NAV.map(item => (
        <option key={item.segment} value={item.segment}>{item.name}</option>
      ))}
    </select>
  );
}
