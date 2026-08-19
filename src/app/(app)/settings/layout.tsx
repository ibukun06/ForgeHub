import { ReactNode } from "react";
import Link from "next/link";
import { User, Shield, Palette, Settings, Users, Key } from "lucide-react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-border bg-surface-muted/30 p-6 overflow-y-auto shrink-0">
        <h2 className="font-heading text-xl text-text-primary mb-6">Settings</h2>
        
        <div className="space-y-8">
          <section>
            <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-3">Personal</h3>
            <nav className="flex flex-col gap-1">
              <Link href="/settings/profile" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-primary hover:bg-surface-muted transition-colors">
                <User className="w-4 h-4 text-text-muted" /> Profile
              </Link>
              <Link href="/settings/account" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-primary hover:bg-surface-muted transition-colors">
                <Shield className="w-4 h-4 text-text-muted" /> Account
              </Link>
              <Link href="/settings/preferences" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-primary hover:bg-surface-muted transition-colors">
                <Palette className="w-4 h-4 text-text-muted" /> Preferences
              </Link>
            </nav>
          </section>

          <section>
            <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-3">Workspace</h3>
            <nav className="flex flex-col gap-1">
              <Link href="/settings/workspace/general" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-primary hover:bg-surface-muted transition-colors">
                <Settings className="w-4 h-4 text-text-muted" /> General
              </Link>
              <Link href="/settings/workspace/members" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-primary hover:bg-surface-muted transition-colors">
                <Users className="w-4 h-4 text-text-muted" /> Members
              </Link>
            </nav>
          </section>

          <section>
            <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-3">Administration</h3>
            <nav className="flex flex-col gap-1">
              <Link href="/settings/admin/roles" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-primary hover:bg-surface-muted transition-colors">
                <Key className="w-4 h-4 text-text-muted" /> Roles & Permissions
              </Link>
            </nav>
          </section>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
