import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2 text-lg font-semibold text-text-primary">
        <Logo variant="solid" className="h-8 w-auto" />
        ForgeHub
      </Link>
      <div className="w-full max-w-[26rem] rounded-lg border border-border bg-surface p-6">
        {children}
      </div>
    </div>
  );
}
