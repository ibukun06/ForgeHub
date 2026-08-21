import { Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for engineers, students, and teams.",
};

const TIERS = [
  {
    name: "Free",
    id: "tier-free",
    href: "/signup",
    priceMonthly: "$0",
    description: "Perfect for students and solo engineers building public projects.",
    features: [
      "Unlimited public projects",
      "5GB engineering file storage",
      "Basic version history (30 days)",
      "Public profile and portfolio",
      "Community support",
    ],
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "/signup",
    priceMonthly: "$12",
    description: "For professional engineers and makers who need private workspaces.",
    features: [
      "Everything in Free",
      "Unlimited private projects",
      "100GB engineering file storage",
      "Advanced permissions",
      "Unlimited version history",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Team",
    id: "tier-team",
    href: "/signup",
    priceMonthly: "$29",
    description: "For engineering teams, research labs, and small hardware startups.",
    features: [
      "Everything in Pro",
      "Shared team workspaces",
      "1TB pooled team storage",
      "Advanced team permissions",
      "Review and approval workflows",
      "Admin controls and reporting",
    ],
    featured: false,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "/contact",
    priceMonthly: "Custom",
    description: "For large organizations requiring enterprise-grade security and compliance.",
    features: [
      "Everything in Team",
      "Unlimited storage",
      "Single Sign-On (SSO)",
      "Custom retention policies",
      "Audit logs and export",
      "Dedicated success manager",
    ],
    featured: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PricingPage() {
  return (
    <div className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-primary uppercase tracking-[0.2em]">Pricing</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl font-heading">
            Pricing plans for teams of all sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-text-muted">
<<<<<<< HEAD
          Whether you&apos;re a student documenting your first robot, or an enterprise team managing complex hardware files, we have a plan for you.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {TIERS.map((tier) => (
=======
          Whether you're a student documenting your first robot, or an enterprise team managing complex hardware files, we have a plan for you.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {TIERS.map((tier, tierIdx) => (
>>>>>>> dfb45177077b186131dffe1e49d84d8e443f6418
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? "ring-2 ring-primary" : "ring-1 ring-border",
                "rounded-3xl p-8 xl:p-10 bg-surface flex flex-col justify-between"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.featured ? "text-primary" : "text-text-primary",
                      "text-lg font-semibold leading-8"
                    )}
                  >
                    {tier.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-text-muted">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-text-primary">{tier.priceMonthly}</span>
                  {tier.priceMonthly !== "Custom" && <span className="text-sm font-semibold leading-6 text-text-muted">/month</span>}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-text-muted xl:mt-10">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? "bg-primary text-bg hover:bg-primary/90"
                    : "text-text-primary ring-1 ring-inset ring-border hover:ring-primary/50",
                  "mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all"
                )}
              >
                {tier.name === "Enterprise" ? "Contact sales" : "Get started"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
