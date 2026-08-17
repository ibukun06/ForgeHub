"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import type { ProjectType } from "@/lib/supabase/types";

const TYPES: Array<[ProjectType, string]> = [
  ["hardware", "Hardware"],
  ["software", "Software"],
  ["research", "Research"],
  ["multidisciplinary", "Multidisciplinary"],
  ["other", "Other"],
];

export function EditProjectDialog({
  projectId,
  initialName,
  initialDescription,
  initialType,
}: {
  projectId: string;
  initialName: string;
  initialDescription: string | null;
  initialType: ProjectType;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription ?? "");
  const [projectType, setProjectType] = useState<ProjectType>(initialType);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function openDialog() {
    // Reset to the last-known-real values every time it opens, so
    // cancelling an edit never leaves stale text sitting in the form
    // the next time someone opens it.
    setName(initialName);
    setDescription(initialDescription ?? "");
    setProjectType(initialType);
    setError("");
    setOpen(true);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Project name can't be empty.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim(), projectType }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "We could not save those changes.");
      setOpen(false);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We could not save those changes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        <Pencil className="mr-2 h-3.5 w-3.5" aria-hidden />
        Edit project
      </button>

      <Dialog
        open={open}
        onClose={() => (saving ? null : setOpen(false))}
        title="Edit project"
        description="Only the team lead can change these — the rest of the team will see the update right away."
      >
        <form onSubmit={submit} className="flex flex-col gap-4">
          {error && <Alert variant="error">{error}</Alert>}

          <Field label="Project name" required>
            {({ id, ...fieldProps }) => (
              <Input id={id} {...fieldProps} value={name} onChange={(event) => setName(event.target.value)} maxLength={120} required />
            )}
          </Field>

          <Field label="Description" hint={`${description.length}/500`}>
            {({ id, ...fieldProps }) => (
              <Textarea
                id={id}
                {...fieldProps}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                maxLength={500}
                rows={4}
              />
            )}
          </Field>

          <Field label="Project type">
            {({ id, ...fieldProps }) => (
              <Select
                id={id}
                {...fieldProps}
                value={projectType}
                onChange={(event) => setProjectType(event.target.value as ProjectType)}
              >
                {TYPES.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            )}
          </Field>

          <div className="mt-1 flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
