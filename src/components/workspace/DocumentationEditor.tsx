"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, FileText, Loader2, Save, Sparkles } from "lucide-react";

type Section = { id: string; prompt: string; content: string | null; status: string; order: number; updated_at: string };
type DocumentItem = { id: string; title: string; type: string; sections: Section[] };

export function DocumentationEditor({ projectId, documents, initialDocumentId }: { projectId: string; documents: DocumentItem[]; initialDocumentId: string | null }) {
  const [documentId, setDocumentId] = useState(initialDocumentId ?? documents[0]?.id ?? "");
  const activeDocument = useMemo(() => documents.find((document) => document.id === documentId) ?? documents[0], [documents, documentId]);
  const [sectionId, setSectionId] = useState(activeDocument?.sections[0]?.id ?? "");
  const activeSection = activeDocument?.sections.find((section) => section.id === sectionId) ?? activeDocument?.sections[0];
  const [content, setContent] = useState(activeSection?.content ?? "");
  const [saveState, setSaveState] = useState<"saved" | "unsaved" | "saving" | "error">("saved");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const [prevDocumentId, setPrevDocumentId] = useState(activeDocument?.id);
  if (activeDocument?.id !== prevDocumentId) {
    setPrevDocumentId(activeDocument?.id);
    setSectionId(activeDocument?.sections[0]?.id ?? "");
  }
  const [prevSectionId, setPrevSectionId] = useState(activeSection?.id);
  if (activeSection?.id !== prevSectionId) {
    setPrevSectionId(activeSection?.id);
    setContent(activeSection?.content ?? "");
    setSaveState("saved");
  }

  useEffect(() => {
    if (!activeSection || saveState === "saved") return;
    const timer = window.setTimeout(async () => {
      setSaveState("saving");
      try {
        const response = await fetch(`/api/projects/${projectId}/sections`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ sectionId: activeSection.id, documentId: activeDocument.id, content }) });
        if (!response.ok) throw new Error();
        setSaveState("saved");
      } catch { setSaveState("error"); }
    }, 900);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, activeSection?.id, activeDocument?.id, projectId]);

  async function createSection() {
    if (!activeDocument) return;
    setCreating(true); setCreateError("");
    try {
      const response = await fetch(`/api/projects/${projectId}/sections`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ documentId: activeDocument.id, prompt: `What should the team record in ${activeDocument.title.toLowerCase()}?` }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "We could not create the section.");
      window.location.reload();
    } catch (error) { setCreateError(error instanceof Error ? error.message : "We could not create the section."); setCreating(false); }
  }

  if (!documents.length) return <div className="rounded-lg border border-dashed border-border p-8"><p className="font-heading text-lg font-semibold text-text-primary">Your document set is empty.</p><p className="mt-2 max-w-xl text-sm leading-relaxed text-text-muted">Create a project with a guided document set, then start with the Problem Statement. There is no useful work in a blank editor.</p><Link href="/dashboard" className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">Back to projects</Link></div>;
  return <div className="grid gap-8 xl:grid-cols-[240px_210px_minmax(0,1fr)]">
    <aside className="border-b border-border pb-5 xl:border-b-0 xl:border-r xl:pb-0 xl:pr-5"><p className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">Documents</p><nav className="mt-4 grid gap-1" aria-label="Project documents">{documents.map((document) => <button type="button" key={document.id} onClick={() => setDocumentId(document.id)} className={`flex min-h-11 items-center gap-2 rounded-md px-3 text-left text-sm ${document.id === activeDocument?.id ? "bg-primary/10 font-medium text-primary" : "text-text-muted hover:bg-surface hover:text-text-primary"}`}><FileText className="h-4 w-4 shrink-0" aria-hidden /><span className="truncate">{document.title}</span></button>)}</nav></aside>
    <aside className="border-b border-border pb-5 xl:border-b-0 xl:border-r xl:pb-0 xl:pr-5"><p className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">Sections</p><nav className="mt-4 grid gap-1" aria-label="Document sections">{activeDocument?.sections.length ? activeDocument.sections.map((section) => <button type="button" key={section.id} onClick={() => setSectionId(section.id)} className={`flex min-h-11 items-center justify-between gap-2 rounded-md px-3 text-left text-sm ${section.id === activeSection?.id ? "bg-surface font-medium text-text-primary" : "text-text-muted hover:bg-surface"}`}><span className="truncate">{section.prompt.split("?")[0]}</span>{section.status === "team_reviewed" && <Check className="h-4 w-4 shrink-0 text-success" aria-label="Reviewed" />}</button>) : <div><p className="text-sm leading-relaxed text-text-muted">This document is ready for its first section.</p><button type="button" disabled={creating} onClick={createSection} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white">{creating && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}{creating ? "Preparing…" : "Create first section"}</button>{createError && <p role="alert" className="mt-2 text-xs text-error">{createError}</p>}</div>}</nav></aside>
    <section className="min-w-0"><div className="flex flex-col justify-between gap-3 border-b border-border pb-5 sm:flex-row sm:items-start"><div><p className="font-mono text-xs uppercase tracking-[0.12em] text-secondary">Guided editor</p><h2 className="mt-2 font-heading text-2xl font-semibold text-text-primary">{activeDocument?.title}</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">Answer the prompt in your own words. Forge AI can help shape a draft later, but the team owns the record.</p></div><span className="flex items-center gap-2 text-xs text-text-muted" aria-live="polite">{saveState === "saving" ? <><Save className="h-4 w-4 animate-pulse" />Saving…</> : saveState === "error" ? <span className="text-error">Could not save. Your text is still here.</span> : saveState === "unsaved" ? "Unsaved changes" : <><Check className="h-4 w-4 text-success" />Saved</>}</span></div>{activeSection ? <div className="mx-auto max-w-3xl pt-8"><p className="font-mono text-xs uppercase tracking-[0.12em] text-secondary">Prompt {activeSection.order + 1}</p><h3 className="mt-3 font-heading text-3xl font-semibold leading-tight text-text-primary">{activeSection.prompt}</h3><textarea value={content} onChange={(event) => { setContent(event.target.value); setSaveState("unsaved"); }} className="mt-8 min-h-[360px] w-full resize-y rounded-lg border border-border bg-input-bg p-5 text-base leading-relaxed text-text-primary outline-none transition-colors placeholder:text-text-muted/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20" placeholder="Start with what you know. Specific details beat polished language." aria-label="Documentation content"/><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><span className="text-xs text-text-muted">Autosaves after you stop typing. AI drafts will always be marked for human review.</span><button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-secondary/50 px-4 py-2 text-sm font-medium text-secondary hover:bg-secondary/10"><Sparkles className="h-4 w-4" aria-hidden />Ask Forge AI <span className="font-mono text-[10px]">SOON</span></button></div></div> : <div className="pt-8"><p className="text-text-primary">No section exists yet.</p><p className="mt-2 text-sm text-text-muted">This document is ready for its first guided section.</p></div>}</section>
  </div>;
}
