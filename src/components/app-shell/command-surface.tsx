"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Command, CornerDownLeft, Plus, Search, Sparkles, WandSparkles, X } from "lucide-react";
import { COMMAND_MODE_TABS, type ShellState } from "./shell-config";

type CommandSurfaceProps = {
  open: boolean;
  onClose: () => void;
  shellState: ShellState;
};

type CommandMode = (typeof COMMAND_MODE_TABS)[number];

type CommandResult = {
  label: string;
  mode: CommandMode;
  href?: string;
};

const STATIC_RESULTS: CommandResult[] = [
  { label: "ForgeHub redesign cockpit", href: "/w/forgehub/p/forgehub-redesign/overview", mode: "Find" },
  { label: "My work — timeline view", href: "/work#timeline", mode: "Find" },
  { label: "Decision log", href: "/knowledge#decisions", mode: "Find" },
  { label: "Create a new project", href: "/projects/new", mode: "Create" },
  { label: "Create a new task", href: "/work#my-work", mode: "Create" },
  { label: "Create a decision record", href: "/knowledge#decisions", mode: "Create" },
  { label: "Summarize what changed since yesterday", mode: "Ask" },
  { label: "Draft weekly project update", mode: "Ask" },
  { label: "Prioritize the current backlog", mode: "Do" },
  { label: "Open pending approvals", href: "/inbox#approvals", mode: "Do" },
];

export function CommandSurface({ open, onClose, shellState }: CommandSurfaceProps) {
  const [activeMode, setActiveMode] = useState<CommandMode>("Find");
  const [query, setQuery] = useState("");

  const filteredResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return STATIC_RESULTS.filter((result) => {
      const modeMatches = result.mode === activeMode || query.length > 0;
      const queryMatches =
        normalized.length === 0 || result.label.toLowerCase().includes(normalized) || result.mode.toLowerCase().includes(normalized);
      return modeMatches && queryMatches;
    }).slice(0, 8);
  }, [activeMode, query]);

  if (!open) return null;

  return (
    // The backdrop scrim is the one deliberate exception to going
    // theme-aware below: a modal backdrop should dim the page behind it
    // in both light and dark mode, not invert to a pale overlay in light
    // mode — so this stays a fixed dark value on purpose, not an oversight.
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 py-8 backdrop-blur-sm lg:py-20 animate-in fade-in duration-200">
      <div className="surface-panel w-full max-w-4xl overflow-hidden shadow-2xl text-text-primary animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 border-b border-border px-4 py-4 lg:px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-input-bg text-text-primary">
            <Search className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <label htmlFor="forgehub-command" className="sr-only">
              Search or command
            </label>
            <input
              id="forgehub-command"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${shellState.pageTitle}, navigate, create, or ask AI`}
              className="w-full bg-transparent text-base text-text-primary outline-none placeholder:text-text-muted lg:text-lg"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-primary/40 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
            aria-label="Close command surface"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="border-b border-border px-4 py-3 lg:px-6">
          <div className="flex flex-wrap gap-2">
            {COMMAND_MODE_TABS.map((mode) => {
              const active = mode === activeMode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setActiveMode(mode)}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 ${
                    active
                      ? "bg-primary-soft font-medium text-primary"
                      : "bg-input-bg text-text-muted hover:bg-surface-muted hover:text-text-primary"
                  }`}
                >
                  {mode}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 px-4 py-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,1fr)] lg:px-6">
          <div>
            <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-text-muted">
              <span>{query ? "Results" : "Suggested next moves"}</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-1 tracking-normal text-text-muted">
                <Command className="h-3 w-3" aria-hidden />
                Cmd/Ctrl + K
              </span>
            </div>
            <div className="space-y-2">
              {filteredResults.map((result) => (
                result.href ? (
                  <Link
                    key={`${result.mode}-${result.label}`}
                    href={result.href}
                    onClick={onClose}
                    className="surface-panel-muted flex items-center justify-between px-4 py-3 transition-colors hover:border-primary/40 hover:bg-surface focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-text-primary">{result.label}</p>
                      <p className="mt-1 text-sm text-text-muted">{result.mode} · direct jump</p>
                    </div>
                    <CornerDownLeft className="h-4 w-4 text-text-muted" aria-hidden />
                  </Link>
                ) : (
                  <button
                    key={`${result.mode}-${result.label}`}
                    type="button"
                    className="surface-panel-muted flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-surface focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-text-primary">{result.label}</p>
                      <p className="mt-1 text-sm text-text-muted">{result.mode} · AI-assisted action</p>
                    </div>
                    <WandSparkles className="h-4 w-4 text-text-muted" aria-hidden />
                  </button>
                )
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="surface-panel-muted p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Current context</p>
              <h3 className="mt-3 text-lg font-semibold text-text-primary">{shellState.pageTitle}</h3>
              <p className="mt-1 text-sm text-text-muted">{shellState.scopeLabel}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {shellState.breadcrumbs.map((crumb) => (
                  <span key={crumb.label} className="rounded-full border border-border px-2.5 py-1 text-xs text-text-muted">
                    {crumb.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="surface-panel-muted p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                {/* Forge Orange for AI surfaces, per the design doc's own
                    "AI Mentor Interface: differentiated visually" note —
                    not an arbitrary accent color pick. */}
                <Sparkles className="h-4 w-4 text-secondary" aria-hidden />
                Ambient AI suggestions
              </div>
              <ul className="mt-3 space-y-2 text-sm text-text-muted">
                <li>• Summarize project health with linked evidence.</li>
                <li>• Draft a daily brief from recent work changes.</li>
                <li>• Convert discussion threads into durable decisions.</li>
              </ul>
            </div>

            <div className="surface-panel-muted p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                <Plus className="h-4 w-4 text-success" aria-hidden />
                Fast create
              </div>
              <ul className="mt-3 space-y-2 text-sm text-text-muted">
                <li>• New task in the current scope</li>
                <li>• New doc linked to this project</li>
                <li>• New decision record with owner and status</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
