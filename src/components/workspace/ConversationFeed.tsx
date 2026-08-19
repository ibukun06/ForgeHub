"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, MessageSquare } from "lucide-react";
import { relativeTime, initials } from "@/lib/format";

export type CommentRecord = {
  id: string;
  content: string;
  resolved: boolean;
  created_at: string;
  author: { name: string | null; email: string };
  section: {
    id: string;
    prompt: string | null;
    document: { title: string | null; type: string };
  };
};

export function CommentItem({ projectId, comment }: { projectId: string; comment: CommentRecord }) {
  const router = useRouter();
  const [resolved, setResolved] = useState(comment.resolved);
  const [resolving, setResolving] = useState(false);

  async function resolveComment() {
    if (resolved || resolving) return;
    setResolving(true);
    try {
      const response = await fetch(`/api/projects/${projectId}/comments/${comment.id}/resolve`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error();
      setResolved(true);
      router.refresh();
    } catch {
      // Revert if failed
      setResolving(false);
    }
  }

  const authorName = comment.author.name || comment.author.email;

  return (
    <article className={`surface-panel relative flex gap-4 rounded-xl p-5 transition-colors ${resolved ? "opacity-60" : ""}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-sm font-semibold text-text-primary">
        {initials(authorName)}
      </div>
      <div className="min-w-0 flex-1">
        <header className="flex items-start justify-between gap-2">
          <div>
            <span className="font-semibold text-text-primary">{authorName}</span>
            <span className="ml-2 text-xs text-text-muted">{relativeTime(comment.created_at)}</span>
          </div>
          {!resolved && (
            <button
              type="button"
              onClick={resolveComment}
              disabled={resolving}
              className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text-muted transition-colors hover:border-success/40 hover:text-success focus-visible:outline-2 focus-visible:outline-secondary"
            >
              {resolving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
              Resolve
            </button>
          )}
          {resolved && (
            <span className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-success">
              <Check className="h-3 w-3" />
              Resolved
            </span>
          )}
        </header>

        <div className="mt-1 rounded border-l-2 border-border pl-3 text-xs text-text-muted">
          On {comment.section.document.title}: &quot;{comment.section.prompt}&quot;
        </div>
        
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-text-primary">
          {comment.content}
        </p>
      </div>
    </article>
  );
}

export function ConversationFeed({ projectId, comments }: { projectId: string; comments: CommentRecord[] }) {
  const unresolved = comments.filter((c) => !c.resolved);
  const resolved = comments.filter((c) => c.resolved);

  if (comments.length === 0) {
    return (
      <div className="surface-panel-muted border border-dashed border-border p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface">
          <MessageSquare className="h-6 w-6 text-text-muted" aria-hidden />
        </div>
        <p className="mt-4 font-heading text-lg font-semibold text-text-primary">No conversations yet.</p>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          When the team leaves comments on document sections, they will appear here as actionable threads.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl pt-4">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-secondary">Activity Feed</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-text-primary">Project Conversations</h2>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Discussions across all project documentation, routed here for visibility and resolution.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {unresolved.map((comment) => (
          <CommentItem key={comment.id} projectId={projectId} comment={comment} />
        ))}
      </div>

      {resolved.length > 0 && (
        <div className="mt-12 space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">Resolved Threads ({resolved.length})</h3>
          {resolved.map((comment) => (
            <CommentItem key={comment.id} projectId={projectId} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
