import Link from "next/link";
import { SignUpForm } from "./signup-form";
import { OAuthButtons, AuthDivider } from "@/components/auth/oauth-buttons";

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">Create your account</h1>
        <p className="mt-1 text-sm text-text-muted">
          Free for individuals — no card required.
        </p>
      </div>

      <OAuthButtons />
      <AuthDivider />

      <SignUpForm />

      <p className="text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:text-primary-hover">
          Log in
        </Link>
      </p>
    </div>
  );
}
