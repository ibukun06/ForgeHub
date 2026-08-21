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

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary">Product</h3>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li><Link href="/features" className="hover:text-text-primary">Features</Link></li>
              <li><Link href="/explore" className="hover:text-text-primary">Explore</Link></li>
              <li><Link href="/explore" className="hover:text-text-primary">Workspaces</Link></li>
              <li><Link href="/explore" className="hover:text-text-primary">Projects</Link></li>
              <li><Link href="/pricing" className="hover:text-text-primary">Pricing</Link></li>
              <li><span className="opacity-50 cursor-not-allowed">Changelog</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li><span className="opacity-50 cursor-not-allowed">Documentation</span></li>
              <li><span className="opacity-50 cursor-not-allowed">Help Center</span></li>
              <li><span className="opacity-50 cursor-not-allowed">Blog</span></li>
              <li><span className="opacity-50 cursor-not-allowed">Engineering Resources</span></li>
              <li><span className="opacity-50 cursor-not-allowed">Community</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li><Link href="/about" className="hover:text-text-primary">About</Link></li>
              <li><span className="opacity-50 cursor-not-allowed">Careers</span></li>
              <li><Link href="/contact" className="hover:text-text-primary">Contact</Link></li>
              <li><span className="opacity-50 cursor-not-allowed">Press</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary">Social</h3>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li><span className="opacity-50 cursor-not-allowed">LinkedIn</span></li>
              <li><span className="opacity-50 cursor-not-allowed">GitHub</span></li>
              <li><span className="opacity-50 cursor-not-allowed">YouTube</span></li>
              <li><span className="opacity-50 cursor-not-allowed">X</span></li>
              <li><span className="opacity-50 cursor-not-allowed">Discord</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li><Link href="/privacy" className="hover:text-text-primary">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-text-primary">Terms</Link></li>
              <li><span className="opacity-50 cursor-not-allowed">Cookies</span></li>
              <li><span className="opacity-50 cursor-not-allowed">Security</span></li>
              <li><span className="opacity-50 cursor-not-allowed">Acceptable Use</span></li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-text-muted">© {new Date().getFullYear()} ForgeHub.</p>
    </footer>
  );
}
