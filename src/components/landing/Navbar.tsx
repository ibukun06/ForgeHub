"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

// Absolute paths, not bare "#anchor" — a relative anchor only works if
// you're already on the page that has that section. Now that Navbar is
// shared across every public page, that distinction actually matters.
const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/explore#categories", label: "Categories" },
  { href: "/#how-it-works", label: "How it works" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold text-text-primary">
          <Logo variant="solid" className="h-7 w-auto" />
          ForgeHub
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} pathname={pathname} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/login" className="text-sm text-text-muted transition-colors hover:text-text-primary">
            Log in
          </Link>
          <Link href="/signup" className={buttonVariants({ variant: "primary" })}>
            Start Forging
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-primary md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-text-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-2">
              <Link href="/login" className="text-sm text-text-muted">
                Log in
              </Link>
              <ThemeToggle />
            </div>
            <Link href="/signup" className={buttonVariants({ variant: "primary", className: "w-full justify-center" })}>
              Start Forging
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  // Only true page destinations (no #anchor) get active-state highlighting.
  // Categories/How-it-works are jump-links to a section, not a distinct
  // page — treating them as "current page" would be misleading.
  const isPageLink = !href.includes("#");
  const isActive = isPageLink && pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`text-sm transition-colors ${
        isActive ? "font-medium text-text-primary" : "text-text-muted hover:text-text-primary"
      }`}
    >
      {label}
    </Link>
  );
}
