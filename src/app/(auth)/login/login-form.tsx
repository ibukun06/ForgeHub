"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn, type AuthActionState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";

const initialState: AuthActionState = {};

export function LoginForm({ justVerified, redirectTo }: { justVerified: boolean; redirectTo?: string }) {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {justVerified && (
        <Alert variant="success">Email verified — you can log in now.</Alert>
      )}
      {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}
      {state.error && <Alert variant="error">{state.error}</Alert>}

      <Field label="Email" required errors={state.fieldErrors?.email}>
        {({ id, ...fieldProps }) => <Input id={id} {...fieldProps} name="email" type="email" autoComplete="email" required />}
      </Field>

      <Field label="Password" required errors={state.fieldErrors?.password}>
        {({ id, ...fieldProps }) => (
          <Input id={id} {...fieldProps} name="password" type="password" autoComplete="current-password" required />
        )}
      </Field>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
          <input type="checkbox" name="rememberMe" defaultChecked className="h-4 w-4 rounded border-border bg-input-bg text-primary focus:ring-primary" />
          Remember me
        </label>
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
