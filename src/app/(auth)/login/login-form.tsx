"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn, type AuthActionState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";

const initialState: AuthActionState = {};

export function LoginForm({ justVerified }: { justVerified: boolean }) {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {justVerified && (
        <Alert variant="success">Email verified — you can log in now.</Alert>
      )}
      {state.error && <Alert variant="error">{state.error}</Alert>}

      <Field label="Email" required errors={state.fieldErrors?.email}>
        {({ id, ...fieldProps }) => <Input id={id} {...fieldProps} name="email" type="email" autoComplete="email" required />}
      </Field>

      <Field label="Password" required errors={state.fieldErrors?.password}>
        {({ id, ...fieldProps }) => (
          <Input id={id} {...fieldProps} name="password" type="password" autoComplete="current-password" required />
        )}
      </Field>

      <div className="flex justify-end">
        <Link href="/reset-password" className="text-xs text-text-muted hover:text-text-primary">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" loading={pending} className="w-full">
        {pending ? "Logging in…" : "Log in"}
      </Button>
    </form>
  );
}
