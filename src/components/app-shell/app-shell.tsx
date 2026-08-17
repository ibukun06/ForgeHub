"use client";

import type { ReactNode, RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
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

const SIDEBAR_STORAGE_KEY = "forgehub-sidebar-collapsed";

export function AppShell({ user, children }: AppShellProps) {
  const pathname = usePathname();
  const shellState = useMemo(() => getShellState(pathname), [pathname]);
  const [commandOpen, setCommandOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [contextCollapsed, setContextCollapsed] = useState(false);
  // Default to expanded on the server and on first paint — matches what
  // was there before this existed, so nothing shifts for anyone who
  // hasn't set a preference yet. Real value is read from localStorage
  // after mount (see effect below), same pattern ThemeProvider already
  // uses, to avoid a server/client hydration mismatch.
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSidebarCollapsed(stored === "true");
  }, []);

  function toggleSidebarCollapsed() {
    setSidebarCollapsed((value) => {
      const next = !value;
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      return next;
    });
  }

  function closeMobileNav() {
    setNavOpen(false);
    menuButtonRef.current?.focus();
  }

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }

      if (event.key === "Escape") {
        setCommandOpen(false);
        if (navOpen) {
          closeMobileNav();
        }
      }

      // Trap Tab inside the mobile drawer while it's open, so keyboard
      // focus can't silently escape into the dimmed content behind it.
      if (event.key === "Tab" && navOpen && sidebarRef.current) {
        const focusable = sidebarRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [navOpen]);

  // Move focus into the drawer the moment it opens, for keyboard and
  // screen-reader users who triggered it without a mouse.
  useEffect(() => {
    if (navOpen) {
      sidebarRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])')?.focus();
    }
  }, [navOpen]);

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <GlobalSidebar
        shellState={shellState}
        user={user}
        openCommand={() => setCommandOpen(true)}
        mobileOpen={navOpen}
        closeMobile={closeMobileNav}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={toggleSidebarCollapsed}
        sidebarRef={sidebarRef}
      />

      <div
        className={`min-h-screen transition-[padding-left] duration-200 ${
          sidebarCollapsed ? "lg:pl-16" : "lg:pl-[18rem]"
        }`}
      >
        <header className="sticky top-0 z-30 border-b border-border/80 bg-bg/90 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-5 lg:px-6">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setNavOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-primary transition-colors hover:border-primary lg:hidden focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>

            <button
              type="button"
              onClick={() => setContextCollapsed((value) => !value)}
              className="hidden h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-primary transition-colors hover:border-primary xl:inline-flex focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
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
              className="hidden items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-muted transition-colors hover:border-primary hover:text-text-primary md:inline-flex focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
            >
              <Search className="h-4 w-4" aria-hidden />
              Search, command, or ask AI
              <span className="rounded-lg border border-border px-2 py-0.5 text-[11px] uppercase tracking-[0.14em]">⌘K</span>
            </button>

            <Link
              href="/work#quick-create"
              className="hidden items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover sm:inline-flex focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Create
            </Link>
            <ThemeToggle />
            <div className="hidden items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2 text-sm shadow-sm sm:flex">
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
  collapsed,
  onToggleCollapsed,
  sidebarRef,
}: {
  shellState: ShellState;
  user: AppShellProps["user"];
  openCommand: () => void;
  mobileOpen: boolean;
  closeMobile: () => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  sidebarRef: RefObject<HTMLElement | null>;
}) {
  return (
    <>
      {mobileOpen ? (
        // Same "stays dark on purpose" reasoning as the command palette's
        // backdrop: an overlay scrim should dim the page in both themes,
        // not invert to a pale tint in light mode.
        <button
          type="button"
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label="Close navigation overlay"
        />
      ) : null}
      {/* Width only ever collapses at the lg breakpoint and up — on
          mobile this is a full-width overlay drawer regardless of the
          desktop collapsed preference, so labels always stay readable
          there. */}
      <aside
        ref={sidebarRef}
<<<<<<< ours
        className={`fixed inset-y-0 left-0 z-50 flex w-[18rem] flex-col border-r border-border bg-bg text-text-primary transition-[transform,width] duration-200 lg:translate-x-0 ${
=======
        className={`fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-[18rem] flex-col border-r border-border bg-bg text-text-primary transition-[transform,width] duration-200 lg:translate-x-0 ${
>>>>>>> theirs
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-16" : "lg:w-[18rem]"}`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-4">
          <Link href="/home" className="flex min-w-0 items-center gap-3" onClick={closeMobile}>
<<<<<<< ours
            <div className="shrink-0 rounded-2xl bg-input-bg p-2">
=======
            <div className="shrink-0 rounded-lg bg-input-bg p-2">
>>>>>>> theirs
              <Logo className="h-8 w-8" />
            </div>
            <div className={`min-w-0 ${collapsed ? "lg:hidden" : ""}`}>
              <p className="truncate font-heading text-lg text-text-primary">ForgeHub</p>
              <p className="truncate text-xs text-text-muted">Project operating system</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={closeMobile}
<<<<<<< ours
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-border text-text-muted transition-colors hover:border-primary/40 hover:text-text-primary lg:hidden"
=======
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-primary/40 hover:text-text-primary lg:hidden focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
>>>>>>> theirs
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {/* Desktop-only collapse control — mobile has its own hamburger
            and close button, and "collapsed" doesn't apply there. */}
        <div className="hidden px-3 pt-3 lg:block">
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`flex h-9 items-center gap-2 rounded-xl border border-border text-text-muted transition-colors hover:border-primary/40 hover:text-text-primary ${
              collapsed ? "w-full justify-center" : "w-full justify-start px-3"
            }`}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" aria-hidden /> : <PanelLeftClose className="h-4 w-4" aria-hidden />}
            {!collapsed && <span className="text-xs font-medium">Collapse</span>}
          </button>
        </div>

        <div className="p-4">
          <button
            type="button"
            onClick={openCommand}
            aria-label="Search, command, or ask AI"
<<<<<<< ours
            className={`flex w-full items-center gap-3 rounded-2xl border border-border bg-input-bg px-4 py-3 text-left text-sm text-text-muted transition-colors hover:border-primary/40 hover:bg-surface-muted hover:text-text-primary ${
=======
            className={`flex w-full items-center gap-3 rounded-lg border border-border bg-input-bg px-4 py-3 text-left text-sm text-text-muted transition-colors hover:border-primary/40 hover:bg-surface-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 ${
>>>>>>> theirs
              collapsed ? "lg:justify-center lg:px-0" : ""
            }`}
          >
            <Search className="h-4 w-4 shrink-0" aria-hidden />
            <span className={collapsed ? "lg:sr-only" : ""}>Search, command, or ask AI</span>
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
<<<<<<< ours
                className={`group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors ${
=======
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 ${
>>>>>>> theirs
                  active ? "bg-primary-soft font-medium text-primary" : "text-text-muted hover:bg-surface-muted hover:text-text-primary"
                } ${collapsed ? "lg:justify-center lg:px-0" : ""}`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                <span className={collapsed ? "lg:sr-only" : "font-medium"}>{item.label}</span>
                {collapsed && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-text-primary opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 lg:block"
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className={`border-t border-border px-4 py-4 ${collapsed ? "lg:hidden" : ""}`}>
          <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-text-muted">
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
<<<<<<< ours
                  className="flex items-center gap-3 rounded-2xl border border-border/60 px-3 py-2 text-sm text-text-muted transition-colors hover:border-primary/30 hover:bg-surface-muted hover:text-text-primary"
=======
                  className="flex items-center gap-3 rounded-lg border border-border/60 px-3 py-2 text-sm text-text-muted transition-colors hover:border-primary/30 hover:bg-surface-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
>>>>>>> theirs
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="border-t border-border px-4 py-4">
          <div className={collapsed ? "lg:hidden" : ""}>
            <div className="surface-panel-muted p-3">
              <p className="text-xs uppercase tracking-[0.14em] text-text-muted">Signed in</p>
              <p className="mt-2 truncate font-medium text-text-primary">{user.displayName}</p>
              <p className="truncate text-sm text-text-muted">{user.email}</p>
            </div>
          </div>
          {collapsed && (
            <div className="hidden justify-center lg:flex" title={`${user.displayName} — ${user.email}`}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/12 text-sm font-semibold text-primary">
                {initials(user.displayName)}
              </span>
            </div>
          )}
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
              className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 ${
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
          className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
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
              className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 ${
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
