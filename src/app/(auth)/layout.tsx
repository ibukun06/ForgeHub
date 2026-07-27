import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2 text-lg font-semibold text-text-primary">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
          F
        </span>
        ForgeHub
      </Link>
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-6">
        {children}
      </div>
    </div>
  );
}
