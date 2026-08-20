"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Palette, Shield, AlertTriangle } from "lucide-react";

const SETTINGS_NAV = [
  { name: "Profile", href: "/settings/profile", icon: User },
  { name: "Appearance", href: "/settings/appearance", icon: Palette },
  { name: "Security", href: "/settings/security", icon: Shield },
  { name: "Account", href: "/settings/account", icon: AlertTriangle, danger: true },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-text-primary">Settings</h1>
        <p className="text-sm text-text-muted mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
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

        <main className="md:col-span-3">
          <div className="surface-panel p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
