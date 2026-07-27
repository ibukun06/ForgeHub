"use client";

import { useActionState } from "react";
import { signUp, type AuthActionState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";

const initialState: AuthActionState = {};

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUp, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && <Alert variant="error">{state.error}</Alert>}

      <Field label="Email" required errors={state.fieldErrors?.email}>
        {(id) => <Input id={id} name="email" type="email" autoComplete="email" required />}
      </Field>

      <Field
        label="Password"
        required
        errors={state.fieldErrors?.password}
        hint="At least 8 characters, with a number and a special character."
      >
        {(id) => (
          <Input id={id} name="password" type="password" autoComplete="new-password" required />
        )}
      </Field>

      <Button type="submit" loading={pending} className="w-full">
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
