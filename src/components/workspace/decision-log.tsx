"use client";

import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/ui/empty-state";
import { createDecision } from "@/lib/actions/decisions";
import { Scale, Plus, History, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export function DecisionLog({ 
  projectId, 
  initialDecisions,
  sections = []
}: { 
  projectId: string; 
  initialDecisions: any[];
  sections?: any[];
  isReadOnly?: boolean;
}) {
  const [decisions, setDecisions] = useState(initialDecisions);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const decisionTitle = formData.get("decision") as string;
    const rationale = formData.get("rationale") as string;
    const alternatives = formData.get("alternatives") as string;
    const sectionId = formData.get("section_id") as string;

    const res = await createDecision(projectId, decisionTitle, rationale, alternatives, sectionId || undefined);
    
    if (res.success) {
      // Optimistic update
      setDecisions([{
        id: crypto.randomUUID(),
        decision: decisionTitle,
        rationale,
        alternatives,
        section_id: sectionId || null,
        created_at: new Date().toISOString(),
      }, ...decisions]);
      
      setIsOpen(false);
      router.refresh();
    } else {
      alert("Failed to create decision.");
    }
    
    setIsSubmitting(false);
  }

  function exportToMarkdown() {
    if (decisions.length === 0) return;
    
    const content = decisions.map(d => {
      let md = `## ${d.decision}\n\n`;
      md += `**Date:** ${new Date(d.created_at).toLocaleDateString()}\n\n`;
      md += `### Rationale\n${d.rationale}\n\n`;
      if (d.alternatives) {
        md += `### Alternatives Considered\n${d.alternatives}\n\n`;
      }
      md += `---\n`;
      return md;
    }).join("\n");

    const header = `# Architectural Decisions Log\n\n`;
    const fullMarkdown = header + content;

    const blob = new Blob([fullMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `decisions-log-${projectId}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-text-primary tracking-tight">Decisions Log</h1>
          <p className="mt-2 text-text-muted">Track architectural decisions and rationale for future reference.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {decisions.length > 0 && (
            <Button variant="outline" onClick={exportToMarkdown}>
              <Download className="mr-2 h-4 w-4" />
              Export MD
            </Button>
          )}
          {!isReadOnly && (
            <Button onClick={() => setIsOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Log Decision
            </Button>
          )}
        </div>
        
        <Dialog 
          open={isOpen} 
          onClose={() => setIsOpen(false)}
          title="Log Architectural Decision"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Decision Title" required>
              {(fieldProps) => (
                <Input {...fieldProps} name="decision" placeholder="e.g. Use Next.js App Router" required />
              )}
            </Field>
            
            {sections.length > 0 && (
              <Field label="Related Requirement (Optional)">
                {(fieldProps) => (
                  <select 
                    {...fieldProps} 
                    name="section_id"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">-- None --</option>
                    {sections.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.content ? s.content.replace(/<[^>]*>?/gm, "").substring(0, 50) + "..." : "Empty Requirement"}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
            )}

            <Field label="Rationale" required>
              {(fieldProps) => (
                <Textarea 
                  {...fieldProps}
                  name="rationale" 
                  placeholder="Why was this decision made?" 
                  rows={4} 
                  required 
                />
              )}
            </Field>
            <Field label="Alternatives Considered">
              {(fieldProps) => (
                <Textarea 
                  {...fieldProps}
                  name="alternatives" 
                  placeholder="What else did you consider?" 
                  rows={2} 
                />
              )}
            </Field>
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Decision"}
              </Button>
            </div>
          </form>
        </Dialog>
      </div>

      {decisions.length === 0 ? (
        <EmptyState 
          icon={Scale} 
          title="No decisions logged yet" 
          description="Start tracking your architectural choices to build context for the team."
        >
          {!isReadOnly && (
            <Button onClick={() => setIsOpen(true)}>
              Log First Decision
            </Button>
          )}
        </EmptyState>
      ) : (
        <div className="space-y-6">
          {decisions.map((decision) => (
            <Card key={decision.id} className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/80" />
              <CardHeader className="pb-3 pl-6">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{decision.decision}</CardTitle>
                  <span className="text-xs text-text-muted whitespace-nowrap flex items-center gap-1.5">
                    <History className="h-3 w-3" />
                    {formatDistanceToNow(new Date(decision.created_at), { addSuffix: true })}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pl-6 space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-text-secondary mb-1">Rationale</h4>
                  <p className="text-text-muted leading-relaxed">{decision.rationale}</p>
                </div>
                {decision.alternatives && (
                  <div>
                    <h4 className="font-semibold text-text-secondary mb-1">Alternatives Considered</h4>
                    <p className="text-text-muted leading-relaxed">{decision.alternatives}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
