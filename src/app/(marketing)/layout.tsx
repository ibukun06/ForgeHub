import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

/**
 * Defaults for every page under (marketing). A page that exports its own
 * `metadata` overrides individual fields (title, description, OG, etc.);
 * anything it doesn't specify falls back to what's here. `title.default`
 * is used verbatim by pages that don't set a title at all (the landing
 * page); `title.template` wraps whatever a child page *does* set (so
 * Explore's "Explore" becomes "Explore | ForgeHub").
 */
export const metadata: Metadata = {
  title: {
    default: "ForgeHub — Document the project as you build it",
    template: "%s | ForgeHub",
  },
  description:
    "The workspace for engineering students, researchers, and makers — plan, document, and build in one place, with an AI mentor and a portfolio page that proves you built it.",
  openGraph: {
    siteName: "ForgeHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
