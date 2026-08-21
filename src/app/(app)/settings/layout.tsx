"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
<<<<<<< HEAD
import { User, Palette, Shield, Bell, Lock, HardDrive, Users, Accessibility, Link as LinkIcon, Database } from "lucide-react";
=======
import { User, Palette, Shield, AlertTriangle, Bell, Lock, HardDrive, Users, Accessibility, Link as LinkIcon, Database } from "lucide-react";
>>>>>>> dfb45177077b186131dffe1e49d84d8e443f6418

const SETTINGS_NAV = [
  { name: "Profile", href: "/settings/profile", icon: User },
  { name: "Account", href: "/settings/account", icon: Shield },
  { name: "Appearance", href: "/settings/appearance", icon: Palette },
  { name: "Notifications", href: "/settings/notifications", icon: Bell },
  { name: "Security", href: "/settings/security", icon: Lock },
  { name: "Privacy", href: "/settings/privacy", icon: Shield },
  { name: "Files & Storage", href: "/settings/files", icon: HardDrive },
  { name: "Collaboration", href: "/settings/collaboration", icon: Users },
  { name: "Accessibility", href: "/settings/accessibility", icon: Accessibility },
  { name: "Integrations", href: "/settings/integrations", icon: LinkIcon },
  { name: "Data & Privacy", href: "/settings/data-privacy", icon: Database, danger: true },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-text-primary">Personal Settings</h1>
        <p className="text-sm text-text-muted mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 hidden md:block">
          <nav className="flex flex-col gap-1">
            {SETTINGS_NAV.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
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
        </aside>

        {/* Mobile Nav (Dropdown/Select alternative could go here, for now relying on responsive flex/grid overrides later) */}
        <aside className="md:hidden">
            <select 
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-text-primary"
                value={pathname}
                onChange={(e) => window.location.href = e.target.value}
            >
                {SETTINGS_NAV.map(item => (
                    <option key={item.href} value={item.href}>{item.name}</option>
                ))}
            </select>
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
