"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Sparkles,
  UserCircle2,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { initials } from "@/lib/format";
import { CommandSurface } from "./command-surface";
import { FAVORITE_LINKS, getShellState, PRIMARY_NAV, type ContextItem, type ShellState } from "./shell-config";

type AppShellProps = {
  user: {
    displayName: string;
    email: string;
  };
  children: ReactNode;
};

export function AppShell({ user, children }: AppShellProps) {
  const pathname = usePathname();
  const shellState = useMemo(() => getShellState(pathname), [pathname]);
  const [commandOpen, setCommandOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [contextCollapsed, setContextCollapsed] = useState(false);

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }

      if (event.key === "Escape") {
        setCommandOpen(false);
        setNavOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <GlobalSidebar
        shellState={shellState}
        user={user}
        openCommand={() => setCommandOpen(true)}
        mobileOpen={navOpen}
        closeMobile={() => setNavOpen(false)}
      />

      <div className="min-h-screen lg:pl-[18rem]">
        <header className="sticky top-0 z-30 border-b border-border/80 bg-bg/90 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-5 lg:px-6">
            <button
              type="button"
              onClick={() => setNavOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-surface text-text-primary transition-colors hover:border-primary lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>

            <button
              type="button"
              onClick={() => setContextCollapsed((value) => !value)}
              className="hidden h-10 w-10 items-center justify-center rounded-2xl border border-border bg-surface text-text-primary transition-colors hover:border-primary xl:inline-flex"
              aria-label={contextCollapsed ? "Expand context rail" : "Collapse context rail"}
            >
              {contextCollapsed ? (
                <PanelLeftOpen className="h-4 w-4" aria-hidden />
              ) : (
                <PanelLeftClose className="h-4 w-4" aria-hidden />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-1 overflow-x-auto whitespace-nowrap text-xs text-text-muted">
                {shellState.breadcrumbs.map((breadcrumb, index) => (
                  <div key={`${breadcrumb.label}-${index}`} className="flex items-center gap-1">
                    {breadcrumb.href ? (
                      <Link href={breadcrumb.href} className="transition-colors hover:text-text-primary">
                        {breadcrumb.label}
                      </Link>
                    ) : (
                      <span className="text-text-primary">{breadcrumb.label}</span>
                    )}
                    {index < shellState.breadcrumbs.length - 1 ? (
                      <ChevronRight className="h-3 w-3 text-text-muted" aria-hidden />
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <p className="signal-pill signal-pill-neutral text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  {shellState.scopeLabel}
                </p>
                <p className="truncate text-base font-semibold text-text-primary">{shellState.pageTitle}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="hidden items-center gap-2 rounded-2xl border border-border bg-surface px-3 py-2 text-sm text-text-muted transition-colors hover:border-primary hover:text-text-primary md:inline-flex"
            >
              <Search className="h-4 w-4" aria-hidden />
              Search, command, or ask AI
              <span className="rounded-lg border border-border px-2 py-0.5 text-[11px] uppercase tracking-[0.14em]">⌘K</span>
            </button>

            <Link
              href="/work#quick-create"
              className="hidden items-center gap-2 rounded-2xl bg-primary px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover sm:inline-flex"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Create
            </Link>
            <ThemeToggle />
            <div className="hidden items-center gap-3 rounded-2xl border border-border bg-surface px-3 py-2 text-sm shadow-sm sm:flex">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/12 text-sm font-semibold text-primary">
                {initials(user.displayName)}
              </span>
              <div className="min-w-0">
                <p className="truncate font-medium text-text-primary">{user.displayName}</p>
                <p className="truncate text-xs text-text-muted">{user.email}</p>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface shadow-sm sm:hidden">
              <UserCircle2 className="h-5 w-5 text-text-muted" aria-hidden />
            </div>
          </div>
        </header>

        <div className="flex min-h-[calc(100vh-73px)]">
          {!contextCollapsed ? <ContextRail shellState={shellState} /> : null}
          <main className="min-w-0 flex-1 px-4 py-5 sm:px-5 lg:px-6 lg:py-6">{children}</main>
          <UtilityRail shellState={shellState} />
        </div>
      </div>

      <MobileTabBar openCommand={() => setCommandOpen(true)} />
      <CommandSurface open={commandOpen} onClose={() => setCommandOpen(false)} shellState={shellState} />
    </div>
  );
}

function GlobalSidebar({
  shellState,
  user,
  openCommand,
  mobileOpen,
  closeMobile,
}: {
  shellState: ShellState;
  user: AppShellProps["user"];
  openCommand: () => void;
  mobileOpen: boolean;
  closeMobile: () => void;
}) {
  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden"
          aria-label="Close navigation overlay"
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[18rem] flex-col border-r border-white/8 bg-[#0f151d] text-slate-200 transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-4">
          <Link href="/home" className="flex items-center gap-3" onClick={closeMobile}>
            <div className="rounded-2xl bg-white/5 p-2">
              <Logo className="h-8 w-8" />
            </div>
            <div>
              <p className="font-heading text-lg text-white">ForgeHub</p>
              <p className="text-xs text-slate-400">Project operating system</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={closeMobile}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/8 text-slate-400 transition-colors hover:border-white/15 hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="p-4">
          <button
            type="button"
            onClick={openCommand}
            className="flex w-full items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left text-sm text-slate-300 transition-colors hover:border-white/15 hover:bg-white/8 hover:text-white"
          >
            <Search className="h-4 w-4" aria-hidden />
            Search, command, or ask AI
          </button>
        </div>

        <nav aria-label="Primary navigation" className="flex-1 space-y-1 px-3 pb-4">
          {PRIMARY_NAV.map((item) => {
            const active = shellState.activeArea === item.key;
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={closeMobile}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors ${
                  active ? "bg-white text-slate-950 shadow-lg shadow-slate-950/10" : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/8 px-4 py-4">
          <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Favorites
          </div>
          <div className="space-y-2">
            {FAVORITE_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobile}
                  className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 transition-colors hover:border-white/12 hover:bg-white/8 hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="border-t border-white/8 px-4 py-4">
          <div className="rounded-3xl border border-white/8 bg-white/4 p-3">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Signed in</p>
            <p className="mt-2 font-medium text-white">{user.displayName}</p>
            <p className="truncate text-sm text-slate-400">{user.email}</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function ContextRail({ shellState }: { shellState: ShellState }) {
  return (
    <aside className="hidden w-[18rem] shrink-0 border-r border-border bg-surface/75 px-4 py-5 xl:block">
      <div className="surface-panel mb-5 p-4">
        <p className="eyebrow">Current scope</p>
        <h2 className="mt-2 font-heading text-xl text-text-primary">{shellState.pageTitle}</h2>
        <p className="mt-1 text-sm text-text-muted">{shellState.scopeLabel}</p>
      </div>

      <div className="eyebrow mb-3">Context rail</div>
      <div className="space-y-2">
        {shellState.contextItems.map((item) => (
          <ContextRailItem key={item.href} item={item} />
        ))}
      </div>
    </aside>
  );
}

function ContextRailItem({ item }: { item: ContextItem }) {
  return (
    <Link href={item.href} className="surface-panel-muted block px-3 py-3 transition-colors hover:border-primary/60 hover:bg-surface">
      <p className="font-medium text-text-primary">{item.label}</p>
      {item.hint ? <p className="mt-1 text-sm text-text-muted">{item.hint}</p> : null}
    </Link>
  );
}

function UtilityRail({ shellState }: { shellState: ShellState }) {
  return (
    <aside className="hidden w-[20rem] shrink-0 border-l border-border bg-surface/70 px-4 py-5 2xl:block">
      <div className="eyebrow mb-3">Utility rail</div>
      <div className="space-y-4">
        {shellState.utilitySections.map((section) => (
          <div key={section.title} className="surface-panel p-4">
            <h3 className="font-medium text-text-primary">{section.title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              {section.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}

function MobileTabBar({ openCommand }: { openCommand: () => void }) {
  const pathname = usePathname();
  const state = useMemo(() => getShellState(pathname), [pathname]);
  const mobileItems = PRIMARY_NAV.filter((item) => ["home", "inbox", "work", "knowledge"].includes(item.key));

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 px-3 py-2 backdrop-blur-xl lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-5 items-center gap-2">
        {mobileItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const active = state.activeArea === item.key;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] ${
                active ? "text-primary" : "text-text-muted"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {item.shortLabel ?? item.label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={openCommand}
          className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_18px_36px_rgba(36,70,107,0.28)]"
          aria-label="Open command surface"
        >
          <Search className="h-5 w-5" aria-hidden />
        </button>

        {mobileItems.slice(2).map((item) => {
          const Icon = item.icon;
          const active = state.activeArea === item.key;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] ${
                active ? "text-primary" : "text-text-muted"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {item.shortLabel ?? item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
