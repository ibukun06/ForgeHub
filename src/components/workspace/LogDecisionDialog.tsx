"use client";

import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";

export function LogDecisionDialog({
  projectId,
  open,
  onClose,
  onSuccess,
}: {
  projectId: string;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [decision, setDecision] = useState("");
  const [rationale, setRationale] = useState("");
  const [alternatives, setAlternatives] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!decision.trim()) return setError("The decision title is required.");
    if (!rationale.trim()) return setError("Please explain the rationale.");

    setSaving(true);
    try {
      const response = await fetch(`/api/projects/${projectId}/decisions`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ decision, rationale, alternatives }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Failed to log decision.");
      
      setDecision("");
      setRationale("");
      setAlternatives("");
      onSuccess();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} title="Log a decision" description="Record a design or engineering choice and the alternatives you considered.">
      <form onSubmit={submit} className="flex flex-col gap-5 mt-2">
        <Field label="The Decision" required hint={`${decision.length}/120`}>
          {({ id, ...fieldProps }) => (
            <Input
              id={id}
              {...fieldProps}
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              placeholder="e.g. Switched to a planetary gearbox"
              autoComplete="off"
              disabled={saving}
            />
          )}
        </Field>
        
        <Field label="Rationale" required hint={`${rationale.length}/1000`}>
          {({ id, ...fieldProps }) => (
            <Textarea
              id={id}
              {...fieldProps}
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="Why did you make this choice?"
              className="min-h-24"
              disabled={saving}
            />
          )}
        </Field>

        <Field label="Discarded Alternatives (Optional)" hint={`${alternatives.length}/1000`}>
          {({ id, ...fieldProps }) => (
            <Textarea
              id={id}
              {...fieldProps}
              value={alternatives}
              onChange={(e) => setAlternatives(e.target.value)}
              placeholder="What else did you consider, and why didn't you use it?"
              className="min-h-24"
              disabled={saving}
            />
          )}
        </Field>

        {error && (
          <p role="alert" className="rounded-md border border-error-border bg-error-bg p-3 text-sm text-error">
            {error}
          </p>
        )}

        <div className="mt-2 flex justify-end gap-3 border-t border-border pt-5">
          <button type="button" onClick={onClose} disabled={saving} className={buttonVariants({ variant: "secondary" })}>
            Cancel
          </button>
          <button type="submit" disabled={saving} className={buttonVariants({ variant: "primary" })}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                Saving…
              </>
            ) : (
              "Log Decision"
            )}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
