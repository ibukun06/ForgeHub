"use client";

import { useActionState, useState } from "react";
import { requestPasswordReset, type AuthActionState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";

const initialState: AuthActionState = {};

export function ResetPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const [state, formAction, pending] = useActionState(async (prev: AuthActionState, fd: FormData) => {
    const result = await requestPasswordReset(prev, fd);
    setSubmitted(true);
    return result;
  }, initialState);

  if (submitted) {
    return (
      <Alert variant="success">
        If that email is registered, a reset link is on its way — check your inbox.
      </Alert>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && <Alert variant="error">{state.error}</Alert>}
      <Field label="Email" required>
        {({ id, ...fieldProps }) => <Input id={id} {...fieldProps} name="email" type="email" autoComplete="email" required />}
      </Field>
      <Button type="submit" loading={pending} className="w-full">
        {pending ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}
