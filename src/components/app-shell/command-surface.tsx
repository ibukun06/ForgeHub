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
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#0b1017]/65 px-4 py-8 backdrop-blur-sm lg:py-20">
      <div className="w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-[#111720] text-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4 lg:px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-slate-200">
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
              className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-500 lg:text-lg"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition-colors hover:border-white/20 hover:text-white"
            aria-label="Close command surface"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="border-b border-white/10 px-4 py-3 lg:px-6">
          <div className="flex flex-wrap gap-2">
            {COMMAND_MODE_TABS.map((mode) => {
              const active = mode === activeMode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setActiveMode(mode)}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                    active ? "bg-white text-slate-950" : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
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
            <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
              <span>{query ? "Results" : "Suggested next moves"}</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 tracking-normal text-slate-400">
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
                    className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-3 transition-colors hover:border-white/15 hover:bg-white/8"
                  >
                    <div>
                      <p className="font-medium text-white">{result.label}</p>
                      <p className="mt-1 text-sm text-slate-400">{result.mode} · direct jump</p>
                    </div>
                    <CornerDownLeft className="h-4 w-4 text-slate-500" aria-hidden />
                  </Link>
                ) : (
                  <button
                    key={`${result.mode}-${result.label}`}
                    type="button"
                    className="flex w-full items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-left transition-colors hover:border-white/15 hover:bg-white/8"
                  >
                    <div>
                      <p className="font-medium text-white">{result.label}</p>
                      <p className="mt-1 text-sm text-slate-400">{result.mode} · AI-assisted action</p>
                    </div>
                    <WandSparkles className="h-4 w-4 text-slate-500" aria-hidden />
                  </button>
                )
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Current context</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{shellState.pageTitle}</h3>
              <p className="mt-1 text-sm text-slate-400">{shellState.scopeLabel}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {shellState.breadcrumbs.map((crumb) => (
                  <span key={crumb.label} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300">
                    {crumb.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <Sparkles className="h-4 w-4 text-sky-300" aria-hidden />
                Ambient AI suggestions
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>• Summarize project health with linked evidence.</li>
                <li>• Draft a daily brief from recent work changes.</li>
                <li>• Convert discussion threads into durable decisions.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <Plus className="h-4 w-4 text-emerald-300" aria-hidden />
                Fast create
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
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
