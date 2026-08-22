"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, LogOut, Settings, LayoutDashboard, Palette } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function UserMenu({ user }: { user: { email?: string; displayName?: string; user_metadata?: { full_name?: string }; id?: string } | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const pathname = usePathname();
  const workspaceSlugMatch = pathname.match(/^\/w\/([^/]+)/);
  const workspaceSlug = workspaceSlugMatch ? workspaceSlugMatch[1] : null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const getInitials = (email?: string) => email?.slice(0, 2).toUpperCase() || "U";

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-surface text-text-primary hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <span className="text-xs font-bold font-mono">{getInitials(user?.email)}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg border border-border bg-surface shadow-xl shadow-black/20 focus:outline-none z-50 overflow-hidden font-mono text-sm">
          <div className="px-4 py-3 border-b border-border bg-surface-muted">
            <p className="text-xs text-text-primary truncate font-bold">
              {user?.displayName || user?.user_metadata?.full_name || "Forging Engineer"}
            </p>
            <p className="text-[10px] text-text-muted truncate uppercase tracking-widest mt-1">
              {user?.email}
            </p>
          </div>

          <div className="py-1">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="group flex items-center px-4 py-2 text-text-muted hover:bg-surface-elevated hover:text-text-primary transition-colors"
            >
              <LayoutDashboard className="mr-3 h-4 w-4 group-hover:text-primary transition-colors" />
              Dashboard
            </Link>
            <Link
              href={user?.id ? `/profile/${user.id}` : "/settings/profile"}
              onClick={() => setIsOpen(false)}
              className="group flex items-center px-4 py-2 text-text-muted hover:bg-surface-elevated hover:text-text-primary transition-colors"
            >
              <User className="mr-3 h-4 w-4 group-hover:text-primary transition-colors" />
              Public Profile
            </Link>
            <Link
              href={workspaceSlug ? `/w/${workspaceSlug}/settings` : "/dashboard"}
              onClick={() => setIsOpen(false)}
              className="group flex items-center px-4 py-2 text-text-muted hover:bg-surface-elevated hover:text-text-primary transition-colors"
            >
              <Settings className="mr-3 h-4 w-4 group-hover:text-primary transition-colors" />
              Workspace Settings
            </Link>
            <Link
              href="/settings/appearance"
              onClick={() => setIsOpen(false)}
              className="group flex items-center px-4 py-2 text-text-muted hover:bg-surface-elevated hover:text-text-primary transition-colors"
            >
              <Palette className="mr-3 h-4 w-4 group-hover:text-primary transition-colors" />
              Theme & Appearance
            </Link>
          </div>

          <div className="border-t border-border py-1 bg-surface-muted">
            <button
              onClick={handleSignOut}
              className="group flex w-full items-center px-4 py-2 text-text-muted hover:bg-surface-elevated hover:text-error transition-colors"
            >
              <LogOut className="mr-3 h-4 w-4 group-hover:text-error transition-colors" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
