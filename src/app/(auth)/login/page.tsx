import Link from "next/link";
import { LoginForm } from "./login-form";
import { OAuthButtons, AuthDivider } from "@/components/auth/oauth-buttons";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ verify?: string }>;
}) {
  const { verify } = await searchParams;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">Log in</h1>
        <p className="mt-1 text-sm text-text-muted">Continue forging your engineering story.</p>
      </div>

      <OAuthButtons />
      <AuthDivider />

      <LoginForm justVerified={verify === "1"} />

      <p className="text-center text-sm text-text-muted">
        New to ForgeHub?{" "}
        <Link href="/signup" className="font-medium text-primary hover:text-primary-hover">
          Create an account
        </Link>
      </p>
    </div>
  );
}
