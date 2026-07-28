import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center">
      <Logo variant="solid" className="mb-6 h-14 w-auto" />
      <h1 className="max-w-xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        Document the project as you build it, not the night before it&apos;s due.
      </h1>
      <p className="mt-4 max-w-md text-text-muted">
        A guided, AI-assisted workspace for student and early-career technical teams.
        Private by default, shareable when you&apos;re ready.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/signup" className={buttonVariants("primary")}>
          Start a project
        </Link>
        <Link href="/login" className={buttonVariants("secondary")}>
          Log in
        </Link>
      </div>
    </div>
  );
}
