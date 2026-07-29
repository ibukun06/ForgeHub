import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2 font-heading font-bold text-text-primary">
            <Logo variant="mesh" tone="mono" className="h-6 w-auto text-text-muted" />
            ForgeHub
          </Link>
          <p className="mt-2 max-w-xs text-sm text-text-muted">
            The workspace where engineering builds get documented, not lost.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary">Product</h3>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li>
                <Link href="/explore" className="hover:text-text-primary">
                  Explore
                </Link>
              </li>
              <li>
                <a href="#categories" className="hover:text-text-primary">
                  Categories
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-text-primary">
                  How it works
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary">Account</h3>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li>
                <Link href="/login" className="hover:text-text-primary">
                  Log in
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-text-primary">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-text-muted">© {new Date().getFullYear()} ForgeHub.</p>
    </footer>
  );
}
