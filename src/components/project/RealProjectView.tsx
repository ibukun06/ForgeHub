import Link from "next/link";
import { FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { initials, relativeTime } from "@/lib/format";
import { DOC_TYPE_LABELS, type DocSectionType, type SectionStatus } from "./data";
import type { RealPublicProject } from "./data";
import { ShareButton } from "./ShareButton";
import { getProfileUrl, getProjectUrl } from "@/lib/urls";

const TYPE_LABELS: Record<string, string> = {
  hardware: "Hardware",
  software: "Software",
  research: "Research",
  multidisciplinary: "Multidisciplinary",
  other: "Other",
};

const ROLE_LABELS: Record<string, string> = {
  team_lead: "Team Lead",
  contributor: "Contributor",
  advisor: "Advisor",
};

const STATUS_LABELS: Record<SectionStatus, string> = {
  not_started: "Not started",
  ai_draft: "AI draft",
  team_reviewed: "Team reviewed",
};

const STATUS_STYLES: Record<SectionStatus, string> = {
  not_started: "text-text-muted border-border",
  ai_draft: "text-warning border-warning/30 bg-warning-bg",
  team_reviewed: "text-success border-success/30 bg-success-bg",
};

/**
 * Deliberately not reusing ProjectHero/ProjectOverview/ProgressSection/
 * MediaGallery/etc. — those expect fields real projects don't have yet
 * (progress %, likes, views, featured, tags, milestones with dates,
 * activity feed, media). Forcing real data through them would mean
 * either fabricating those numbers or making nine components
 * defensively handle absence — both worse than one small honest view
 * built for what's actually there.
 */
export function RealProjectView({ project }: { project: RealPublicProject }) {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">
              {TYPE_LABELS[project.projectType] ?? project.projectType}
            </span>
            <span className="rounded-full border border-success/30 bg-success-bg px-3 py-1 text-xs text-success">Published</span>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold text-text-primary sm:text-4xl">{project.name}</h1>
          {project.description && <p className="mt-3 max-w-2xl text-lg text-text-muted">{project.description}</p>}
          <p className="mt-4 text-sm text-text-muted">Started {relativeTime(project.createdAt)}</p>

          {project.team.length > 0 && (
            <div className="mt-6 flex items-center -space-x-2" aria-label="Team members">
              {project.team.slice(0, 6).map((member) => (
                <Link
                  key={member.userId}
                  href={getProfileUrl(member.userId)}
                  title={`${member.name} — ${ROLE_LABELS[member.role] ?? member.role}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-bg bg-primary font-heading text-xs font-semibold text-white hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-bg transition-all"
                >
                  {initials(member.name)}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/explore" className={buttonVariants({ variant: "secondary" })}>
              Explore more projects
            </Link>
            <ShareButton title={project.name} url={getProjectUrl(project.slug)} />
          </div>
        </div>
      </section>

      {project.team.length > 0 && (
        <section className="border-b border-border py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-text-primary">Team</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.team.map((member) => (
                <Link key={member.userId} href={getProfileUrl(member.userId)} className="flex flex-col items-center rounded-lg border border-border bg-surface p-5 text-center hover:border-primary transition-colors">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold text-white">
                    {initials(member.name)}
                  </span>
                  <h3 className="mt-3 font-heading text-sm font-semibold text-text-primary">{member.name}</h3>
                  <span className="mt-0.5 text-xs text-secondary">{ROLE_LABELS[member.role] ?? member.role}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.documentation.length > 0 && (
        <section className="border-b border-border py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-text-primary">Documentation</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.documentation.map((doc, index) => (
                <div key={`${doc.documentType}-${index}`} className="surface-panel-muted p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 font-heading text-sm font-semibold text-text-primary">
                      <FileText className="h-4 w-4 shrink-0 text-secondary" aria-hidden />
                      {doc.title ?? DOC_TYPE_LABELS[doc.documentType as DocSectionType] ?? doc.documentType}
                    </span>
                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] ${STATUS_STYLES[doc.status]}`}>
                      {STATUS_LABELS[doc.status]}
                    </span>
                  </div>
                  {doc.excerpt && <p className="mt-3 line-clamp-2 text-sm text-text-muted">{doc.excerpt}…</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 text-center">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">Building something like this?</h2>
          <p className="mt-3 text-text-muted">Document it from day one, not the night before it&apos;s due.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/signup" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Create Your Own Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
