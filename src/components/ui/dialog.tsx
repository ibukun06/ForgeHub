"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

<<<<<<< ours
/**
 * Deliberately no portal library — the mobile nav drawer and the command
 * palette already do fixed-position overlays this way in this codebase,
 * so this matches rather than introducing a second pattern for the same
 * problem.
 */
=======
>>>>>>> theirs
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])'
        );
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

    panelRef.current?.querySelector<HTMLElement>("input, textarea, select, button:not([disabled])")?.focus();
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [open, onClose]);

  if (!open) return null;

  return (
<<<<<<< ours
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <button type="button" onClick={onClose} className="absolute inset-0 cursor-default" tabIndex={-1} aria-label="Close dialog" />
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="surface-panel relative w-full max-w-md p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="dialog-title" className="font-heading text-xl text-text-primary">
              {title}
            </h2>
            {description && <p className="mt-1 text-sm text-text-muted">{description}</p>}
=======
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm animate-in fade-in duration-200">
      <button type="button" onClick={onClose} className="absolute inset-0 cursor-default" tabIndex={-1} aria-label="Close dialog" />
      <div 
        ref={panelRef} 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="dialog-title" 
        className="surface-panel relative w-full max-w-md p-6 animate-in zoom-in-95 duration-200 max-h-[calc(100vh-2rem)] overflow-y-auto"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="dialog-title" className="font-heading text-xl font-semibold text-text-primary">
              {title}
            </h2>
            {description && <p className="mt-1.5 text-sm text-text-muted">{description}</p>}
>>>>>>> theirs
          </div>
          <button
            type="button"
            onClick={onClose}
<<<<<<< ours
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary"
            aria-label="Close"
          >
            <X className="h-4 w-4" aria-hidden />
=======
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
            aria-label="Close"
          >
            <X className="h-4 w-4" aria-hidden="true" />
>>>>>>> theirs
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
