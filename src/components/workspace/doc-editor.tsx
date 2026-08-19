"use client";

import React, { useState } from "react";
import { Check, Edit3, MoreHorizontal, MessageSquare, History } from "lucide-react";
import { initials } from "@/lib/format";

export function DocEditor() {
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [railOpen, setRailOpen] = useState(false);

  return (
    <div className="relative mx-auto max-w-[800px] w-full px-4 py-12 lg:px-8">
      {/* Document Header */}
      <div className="mb-12 border-b border-border/50 pb-8">
        <h1 className="font-heading text-4xl text-text-primary tracking-tight">Phase 3: Visual System Signoff</h1>
        <div className="mt-6 flex items-center gap-4 text-sm text-text-muted">
          <span className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft text-[10px] font-semibold text-primary shadow-sm" title="Ibukunoluwa">
              {initials("Ibukunoluwa")}
            </span>
            Ibukunoluwa
          </span>
          <span>·</span>
          <span>Last edited 2h ago</span>
        </div>
      </div>

      {/* Document Body */}
      <div className="prose prose-invert prose-lg max-w-none prose-p:leading-[1.7] prose-p:text-slate-200/90 prose-headings:text-text-primary prose-a:text-primary hover:prose-a:text-primary/80">
        <p>
          The primary objective of this phase is to move past wireframes and establish the exact high-fidelity tokens that will govern the application. We are standardizing on the "Obsidian Glass" aesthetic.
        </p>
        
        <p>
          Before we can merge the responsive layouts into the main branch, we need to ensure that the primary Navigation components (Sidebar, Context Rail) have fully adopted the new surface tokens.
        </p>

        {/* Inline Task Capsule */}
        <div className="my-6 flex">
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
              Audit navigation surfaces for legacy opacity usage
            </span>
            
            <div className="ml-2 flex items-center gap-2 border-l border-border/50 pl-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-soft text-[9px] font-semibold text-primary shadow-sm" title="Design Team">
                {initials("Design Team")}
              </span>
              <span className={`text-xs ${taskCompleted ? "text-text-muted" : "text-error"}`}>Due today</span>
            </div>
          </button>
        </div>

        <p>
          Once this audit is completed, we will shift focus to building out the interactive execution views, primarily the Work Screen Kanban board and the new Mobile Inbox zero flow.
        </p>

        <h2>Interaction Guidelines</h2>
        <p>
          Surfaces should never feel flat. Always employ a subtle inset shadow (`--shadow-glass`) to create a sense of depth, and use a 1px solid border on hover to indicate interactability.
        </p>
      </div>

      {/* Simulated Utility Rail that opens when clicking the task */}
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
              <p className="text-base text-text-primary">Audit navigation surfaces for legacy opacity usage</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-text-muted mb-2">Assignee</p>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft text-[10px] font-semibold text-primary">DT</span>
                  <span className="text-sm text-text-primary">Design Team</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-text-muted mb-2">Status</p>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${taskCompleted ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                  {taskCompleted ? 'Done' : 'In Progress'}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium text-text-muted mb-4">Activity</p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-text-muted">
                    <Edit3 className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-sm text-text-primary"><span className="font-medium">You</span> changed the due date</p>
                    <p className="text-xs text-text-muted">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-text-muted">
                    <MessageSquare className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-sm text-text-primary"><span className="font-medium">Ibukunoluwa</span> commented</p>
                    <p className="mt-1 text-sm text-text-muted">"Make sure to check the command surface backdrop as well."</p>
                    <p className="mt-1 text-xs text-text-muted">Yesterday at 4:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <input type="text" placeholder="Add a comment..." className="w-full rounded-md border border-border bg-input-bg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
