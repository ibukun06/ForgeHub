"use client";

import { useActionState, useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { completeOnboarding } from "@/lib/actions/onboarding";
import type { AuthActionState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";

const initialState: AuthActionState = {};

export function OnboardingForm() {
  const [state, formAction, pending] = useActionState(completeOnboarding, initialState);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  function addSkill(e: KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && <Alert variant="error">{state.error}</Alert>}

      <Field label="Name" required errors={state.fieldErrors?.name}>
        {({ id, ...fieldProps }) => <Input id={id} {...fieldProps} name="name" autoComplete="name" required />}
      </Field>

      <Field label="Institution" errors={state.fieldErrors?.institution} hint="Free-text — not verified in MVP.">
        {({ id, ...fieldProps }) => <Input id={id} {...fieldProps} name="institution" placeholder="e.g. Redeemer's University" />}
      </Field>

      <Field label="Bio" errors={state.fieldErrors?.bio}>
        {({ id, ...fieldProps }) => (
          <textarea
            id={id}
            {...fieldProps}
            name="bio"
            rows={3}
            className="w-full rounded-md border border-border bg-input-bg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-colors focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 aria-[invalid=true]:border-error aria-[invalid=true]:focus-visible:outline-error"
            placeholder="A sentence or two about your technical background"
          />
        )}
      </Field>

      <Field label="Skills" hint="Press Enter or comma to add a skill.">
        {({ id, ...fieldProps }) => (
          <div>
            <input type="hidden" name="skills" value={skills.join(",")} />
            <Input
              id={id}
              {...fieldProps}
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={addSkill}
              placeholder="e.g. CAD, Python, Mechanical Design"
            />
            {skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-text-primary"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => setSkills(skills.filter((s) => s !== skill))}
                      className="text-text-muted hover:text-error transition-colors focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 rounded-full"
                      aria-label={`Remove ${skill}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </Field>

      <Button type="submit" loading={pending} className="w-full">
        {pending ? "Saving…" : "Complete setup"}
      </Button>
    </form>
  );
}
