import Link from "next/link";
import { signOut } from "@/lib/actions/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-text-primary">
            import { Logo } from "@/components/ui/logo";
            <Logo variant="solid" className="h-8 w-auto" />
            ForgeHub
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              Log out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
