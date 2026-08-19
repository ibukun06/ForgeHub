import Link from "next/link";
import { getProfileUrl } from "@/lib/urls";
import { initials } from "@/lib/format";
import type { TeamMember, MemberRole } from "./data";

const ROLE_LABELS: Record<MemberRole, string> = {
  team_lead: "Team Lead",
  contributor: "Contributor",
  advisor: "Advisor",
};

export function ContributorCard({ contributor }: { contributor: TeamMember }) {
  return (
    <Link
      href={getProfileUrl(contributor.username)}
      className="flex flex-col items-center rounded-lg border border-border bg-surface p-5 text-center transition-colors hover:border-primary"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold text-white">
        {initials(contributor.name)}
      </span>
      <h3 className="mt-3 font-heading text-sm font-semibold text-text-primary">{contributor.name}</h3>
      <span className="mt-0.5 text-xs text-secondary">{ROLE_LABELS[contributor.role]}</span>
      <p className="mt-2 text-xs text-text-muted">{contributor.contribution}</p>
    </Link>
  );
}
