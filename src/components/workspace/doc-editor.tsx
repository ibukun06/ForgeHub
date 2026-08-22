"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { HocuspocusProvider } from "@hocuspocus/provider";
import * as Y from "yjs";
import { saveSectionContent } from "@/lib/actions/docs";
import { Check, Upload, Loader2 } from "lucide-react";
import { initials } from "@/lib/format";
import { EngineeringFile } from "@/components/editor/extensions/engineering-file";
import { createClient } from "@/lib/supabase/client";

export function DocEditor({ 
  documentId, 
  sectionId, 
  initialContent 
}: { 
  documentId: string;
  sectionId: string;
  initialContent: string;
  isReadOnly?: boolean;
}) {
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [railOpen, setRailOpen] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);

  // We only run YJS client-side
  const editor = useEditor({
    editable: !isReadOnly,
    extensions: [
      StarterKit.configure({
        history: false,
      } as any),
      EngineeringFile,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "prose prose-invert prose-lg max-w-none prose-p:leading-[1.7] prose-p:text-slate-200/90 prose-headings:text-text-primary prose-a:text-primary hover:prose-a:text-primary/80 focus:outline-none min-h-[500px]",
      },
    },
    onUpdate: ({ editor }) => {
      // Local fallback: mark syncing status
      setIsSynced(false);
      
      const html = editor.getHTML();
      // Server Action save (should be debounced in a real app, but for MVP we fire directly)
      saveSectionContent(sectionId, html)
        .then(() => setIsSynced(true))
        .catch(console.error);
    }
  });

  useEffect(() => {
    if (!editor) return;

    // Connect to a local Hocuspocus server or standard Websocket endpoint
    const hocuspocusProvider = new HocuspocusProvider({
      url: process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:1234",
      name: `document-${documentId}-section-${sectionId}`,
      onSynced: () => {
        setIsSynced(true);
      },
      onClose: () => {
        setIsSynced(false);
      }
    });

    setProvider(hocuspocusProvider);

    // Add collaboration extensions to Tiptap
    editor.extensionManager.extensions.push(
      Collaboration.configure({
        document: hocuspocusProvider.document,
      }),
      CollaborationCursor.configure({
        provider: hocuspocusProvider,
        user: {
          name: "Ibukunoluwa",
          color: "#3b82f6", // tailwind blue-500
        },
      })
    );

    return () => {
      // Fallback save on unmount
      const html = editor.getHTML();
      saveSectionContent(sectionId, html).catch(console.error);
      
      hocuspocusProvider.destroy();
    };
  }, [editor, documentId, sectionId]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setIsUploading(true);
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const filePath = `${documentId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('engineering_artifacts')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        alert('Failed to upload file.');
        return;
      }

      const { data: urlData } = supabase.storage
        .from('engineering_artifacts')
        .getPublicUrl(data.path);

      editor.chain().focus().setEngineeringFile({
        url: urlData.publicUrl,
        name: file.name,
        type: file.type || 'application/octet-stream'
      }).run();

    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative mx-auto max-w-[800px] w-full px-4 py-12 lg:px-8">
      {/* Document Header */}
      <div className="mb-12 border-b border-border/50 pb-8">
        <h1 className="font-heading text-4xl text-text-primary tracking-tight">
          Architecture & Design
        </h1>
        <div className="mt-6 flex items-center justify-between text-sm text-text-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft text-[10px] font-semibold text-primary shadow-sm" title="Ibukunoluwa">
                {initials("Ibukunoluwa")}
              </span>
              Ibukunoluwa
            </span>
            <span>·</span>
            <span>Last edited just now</span>
          </div>
          <div>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${isSynced ? 'text-success' : 'text-warning'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${isSynced ? 'bg-success' : 'bg-warning animate-pulse'}`}></span>
              {isSynced ? 'Synced' : 'Connecting...'}
            </span>
          </div>
        </div>
      </div>

      {/* Editor Body */}
      <div className="mb-8">
        {!isReadOnly && (
          <div className="mb-4 flex items-center gap-2">
            <label className={`inline-flex items-center gap-2 cursor-pointer rounded-md bg-surface border border-border px-3 py-1.5 text-sm font-medium hover:bg-surface-muted transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 text-text-muted" />}
              {isUploading ? 'Uploading...' : 'Upload File / CAD'}
              <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.step,.stl,.png,.jpg,.jpeg" />
            </label>
          </div>
        )}
        <EditorContent editor={editor} />
      </div>

      {/* Legacy Inline Task Capsule (Mocked for Visual Continuity) */}
      <div className="my-6 flex border-t border-border/50 pt-8">
        <button
          type="button"
          onClick={() => setRailOpen(!railOpen)}
          className={`group flex items-center gap-3 rounded-full border px-4 py-2 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
            railOpen 
              ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--color-primary),0.1)]" 
              : "border-border bg-surface-muted hover:border-primary/50 hover:bg-surface"
          }`}
        >
          <div 
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
              taskCompleted ? "border-success bg-success text-bg" : "border-text-muted/50 bg-bg text-transparent group-hover:border-primary"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setTaskCompleted(!taskCompleted);
            }}
          >
            <Check className="h-3 w-3" strokeWidth={3} />
          </div>
          
          <span className={`font-medium transition-colors ${taskCompleted ? "text-text-muted line-through" : "text-text-primary group-hover:text-primary"}`}>
            Phase 3: Realtime Engine Verification
          </span>
          
          <div className="ml-2 flex items-center gap-2 border-l border-border/50 pl-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-soft text-[9px] font-semibold text-primary shadow-sm" title="System">
              {initials("System")}
            </span>
            <span className={`text-xs ${taskCompleted ? "text-text-muted" : "text-error"}`}>Task Status</span>
          </div>
        </button>
      </div>

      {/* Simulated Utility Rail */}
      <div 
        className={`fixed bottom-0 right-0 top-0 z-40 w-80 transform border-l border-border bg-bg/95 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out ${
          railOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading text-lg text-text-primary">Task Details</h3>
            <button onClick={() => setRailOpen(false)} className="rounded-full p-2 text-text-muted hover:bg-surface hover:text-text-primary">
              <span className="sr-only">Close rail</span>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </button>
          </div>
          
          <div className="flex-1 space-y-6">
            <div>
              <p className="text-sm font-medium text-text-muted mb-2">Title</p>
              <p className="text-base text-text-primary">Phase 3: Realtime Engine Verification</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-text-muted mb-2">Assignee</p>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft text-[10px] font-semibold text-primary">SYS</span>
                  <span className="text-sm text-text-primary">System</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-text-muted mb-2">Status</p>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${taskCompleted ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                  {taskCompleted ? 'Done' : 'In Progress'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <input type="text" placeholder="Add a comment..." className="w-full rounded-md border border-border bg-input-bg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
      </div>
      
      {/* CSS for Collaboration Cursors */}
      <style dangerouslySetInnerHTML={{__html: `
        .collaboration-cursor__caret {
          border-left: 2px solid #0d0d0d;
          border-right: 2px solid #0d0d0d;
          margin-left: -2px;
          margin-right: -2px;
          pointer-events: none;
          position: relative;
          word-break: normal;
        }

        .collaboration-cursor__label {
          border-radius: 3px 3px 3px 0;
          color: #0d0d0d;
          font-size: 12px;
          font-style: normal;
          font-weight: 600;
          left: -1px;
          line-height: normal;
          padding: 0.1rem 0.3rem;
          position: absolute;
          top: -1.4em;
          user-select: none;
          white-space: nowrap;
        }
      `}} />
    </div>
  );
}
