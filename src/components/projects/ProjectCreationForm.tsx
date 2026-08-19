"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";

const TYPES = [
  ["hardware", "Hardware", "Devices, prototypes, physical systems"],
  ["software", "Software", "Apps, platforms, tools, services"],
  ["research", "Research", "Experiments, studies, investigations"],
  ["multidisciplinary", "Multidisciplinary", "Work across technical disciplines"],
  ["other", "Other", "A project with its own shape"],
] as const;

const DOCUMENTS = [
  ["problem_statement", "Problem Statement", "Who has the problem, and what needs to change?", true],
  ["requirements", "Requirements", "What must the project do, and what constraints matter?", false],
  ["architecture", "Architecture / Design", "How is the solution shaped, and why?", false],
  ["testing_plan", "Testing Plan", "How will the team know if it works?", false],
  ["decisions_log", "Decisions Log", "What did the team choose, and why?", false],
] as const;

type ProjectType = (typeof TYPES)[number][0];
const DRAFT_KEY = "forgehub-project-draft";

function readDraft(): { name?: string; description?: string; projectType?: ProjectType; documents?: string[] } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function ProjectCreationForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(() => readDraft()?.name ?? "");
  const [description, setDescription] = useState(() => readDraft()?.description ?? "");
  const [projectType, setProjectType] = useState<ProjectType>(() => readDraft()?.projectType ?? "multidisciplinary");
  const [documents, setDocuments] = useState<string[]>(() => readDraft()?.documents ?? DOCUMENTS.map(([id]) => id));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ name, description, projectType, documents }));
  }, [name, description, projectType, documents]);

  function next() {
    setError("");
    if (step === 1 && !name.trim()) return setError("Add a project name before continuing.");
    if (step === 1 && description.length > 500) return setError("Keep the description under 500 characters.");
    setStep((current) => Math.min(4, current + 1));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim(), projectType, documents }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "We could not create the project.");
      window.localStorage.removeItem(DRAFT_KEY);
      window.location.assign(`/w/forgehub/p/${result.slug}/overview`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We could not create the project. Your draft is safe on this device.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div>
        <div className="mb-8 flex flex-wrap gap-2" aria-label="Project creation progress">
          {["Idea", "Type", "Documents", "Review"].map((label, index) => (
            <span
              key={label}
              className={`rounded-md border px-3 py-2 font-mono text-xs ${
                step === index + 1 ? "border-secondary bg-secondary/10 text-secondary" : "border-border text-text-muted"
              }`}
            >
              {String(index + 1).padStart(2, "0")} / {label}
            </span>
          ))}
        </div>

        {step === 1 && (
          <div className="flex flex-col gap-6">
            <Field label="Project name" required>
              {({ id, ...fieldProps }) => (
                <Input
                  id={id}
                  {...fieldProps}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Autonomous field rover"
                  autoComplete="off"
                />
              )}
            </Field>

            <Field label="What are you making?" hint={`${description.length}/500`}>
              {({ id, ...fieldProps }) => (
                <Textarea
                  id={id}
                  {...fieldProps}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe the problem, who it affects, and what you want to change."
                  className="min-h-36"
                />
              )}
            </Field>
          </div>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="text-sm font-medium text-text-primary">Choose a project type</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {TYPES.map(([value, label, helper]) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setProjectType(value)}
                  className={`rounded-lg border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ${
                    projectType === value ? "border-secondary bg-secondary/10" : "border-border bg-surface hover:border-primary/50"
                  }`}
                >
                  <span className="block font-medium text-text-primary">{label}</span>
                  <span className="mt-1 block text-sm text-text-muted">{helper}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend className="text-sm font-medium text-text-primary">Choose the starting documents</legend>
            <p className="mt-2 text-sm text-text-muted">Keep the set small enough to use. You can add custom documents later.</p>
            <div className="mt-5 grid gap-3">
              {DOCUMENTS.map(([id, title, helper, required]) => (
                <label
                  key={id}
                  className="flex gap-3 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary/50 focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2"
                >
                  <input
                    type="checkbox"
                    checked={documents.includes(id as string)}
                    disabled={required}
                    onChange={() =>
                      setDocuments((current) => (current.includes(id as string) ? current.filter((item) => item !== id) : [...current, id as string]))
                    }
                    className="mt-1 h-4 w-4 rounded border-border text-secondary focus:ring-0 focus:ring-offset-0"
                    style={{ accentColor: "var(--color-secondary)" }}
                  />
                  <span>
                    <span className="block font-medium text-text-primary">
                      {title}
                      {required && <span className="ml-2 font-mono text-xs text-secondary">required</span>}
                    </span>
                    <span className="mt-1 block text-sm text-text-muted">{helper}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-secondary">Ready to forge</p>
            <h2 className="mt-3 text-2xl font-semibold text-text-primary">{name}</h2>
            <p className="mt-2 text-text-muted">{description || "No description added yet."}</p>
            <div className="mt-6 grid gap-3 border-t border-border pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Project type</span>
                <strong className="capitalize text-text-primary">{projectType}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Starting documents</span>
                <strong className="text-text-primary">{documents.length}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Visibility</span>
                <strong className="text-text-primary">Private by default</strong>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p role="alert" className="mt-5 rounded-md border border-error-border bg-error-bg p-3 text-sm text-error">
            {error}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            disabled={saving}
            onClick={() => step > 1 && setStep((current) => current - 1)}
            className={buttonVariants({ variant: "secondary", className: step === 1 ? "invisible" : "" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
            Back
          </button>
          {step < 4 ? (
            <button type="button" onClick={next} className={buttonVariants({ variant: "primary" })}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </button>
          ) : (
            <button type="submit" disabled={saving} className={buttonVariants({ variant: "primary" })}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  Creating project…
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" aria-hidden />
                  Create project
                </>
              )}
            </button>
          )}
        </div>
      </div>
      <aside className="border-t border-border pt-6 text-sm text-text-muted lg:border-l lg:border-t-0 lg:pl-6">
        <p className="font-heading font-semibold text-text-primary">Start with a useful record.</p>
        <p className="mt-3">The first document set is a working hypothesis, not a contract. Your project stays private until you choose to publish it.</p>
        <Link href="/projects" className="mt-5 inline-block text-secondary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2">
          Back to projects
        </Link>
      </aside>
    </form>
  );
}
