"use client";

import { useState } from "react";
import { Check, Copy, Globe, Lock, Share2 } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Alert } from "@/components/ui/alert";
import { getProjectUrl } from "@/lib/urls";
import type { ProjectVisibility } from "@/lib/supabase/types";

/**
 * App Flow §5 describes this as forgehub.com/p/[project-id]. That route
 * doesn't exist — /projects/[slug] does, already linked everywhere else
 * in the app via getProjectUrl(), with real generateStaticParams/
 * generateMetadata behind it. Going with what's actually built and
 * already the single source of truth for this URL shape, not the doc's
 * stale path.
 */
export function ShareProjectDialog({ projectId, slug, initialVisibility }: { projectId: string; slug: string; initialVisibility: ProjectVisibility }) {
  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState<ProjectVisibility>(initialVisibility);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const published = visibility === "published";
  const publicPath = getProjectUrl(slug);

  async function toggleVisibility() {
    const next: ProjectVisibility = published ? "private" : "published";
    setSaving(true);
    setError("");
    try {
      const response = await fetch(`/api/projects/${projectId}/visibility`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ visibility: next }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "We could not update visibility.");
      setVisibility(result.visibility);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We could not update visibility.");
    } finally {
      setSaving(false);
    }
  }

  async function copyLink() {
    const fullUrl = `${window.location.origin}${publicPath}`;
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-primary/40"
      >
        <Share2 className="h-3.5 w-3.5" aria-hidden />
        Share
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Share project"
        description="Publishing makes the project page below visible to anyone with the link — private stays visible only to your team."
      >
        <div className="flex flex-col gap-4">
          {error && <Alert variant="error">{error}</Alert>}

          <button
            type="button"
            onClick={toggleVisibility}
            disabled={saving}
            aria-pressed={published}
            className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors disabled:opacity-60 ${
              published ? "border-success/30 bg-success-bg text-success" : "border-border bg-input-bg text-text-primary"
            }`}
          >
            <span className="flex items-center gap-2 font-medium">
              {published ? <Globe className="h-4 w-4" aria-hidden /> : <Lock className="h-4 w-4" aria-hidden />}
              {published ? "Published — visible to anyone with the link" : "Private — visible only to your team"}
            </span>
            <span className="shrink-0 text-xs underline underline-offset-2">{saving ? "Saving…" : published ? "Make private" : "Publish"}</span>
          </button>

          {published && (
            <div>
              <label htmlFor="share-link" className="text-sm font-medium text-text-primary">
                Public link
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="share-link"
                  readOnly
                  value={typeof window !== "undefined" ? `${window.location.origin}${publicPath}` : publicPath}
                  onFocus={(event) => event.currentTarget.select()}
                  className="w-full rounded-lg border border-border bg-input-bg px-3 py-2 text-sm text-text-primary outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                >
                  {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
}
