import Link from "next/link";
import { ResetPasswordForm } from "./reset-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">Reset your password</h1>
        <p className="mt-1 text-sm text-text-muted">
          We&apos;ll email you a link to choose a new one.
        </p>
      </div>

      <ResetPasswordForm />

      <p className="text-center text-sm text-text-muted">
        <Link href="/login" className="font-medium text-primary hover:text-primary-hover">
          Back to log in
        </Link>
      </p>
    </div>
  );
}
