import { Clock, Users } from "lucide-react";
import { CATEGORIES } from "@/components/landing/data";
import { buttonVariants } from "@/components/ui/button";
import { getProjectUrl } from "@/lib/urls";
import { initials, relativeTime } from "@/lib/format";
import { StatusBadge } from "./StatusBadge";
import { TechStack } from "./TechStack";
import { FollowButton } from "./FollowButton";
import { ShareButton } from "./ShareButton";
import type { PublicProject } from "./data";

export function ProjectHero({ project }: { project: PublicProject }) {
  const category = CATEGORIES.find((c) => c.slug === project.category);

  return (
    <section className="border-b border-border">
      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 sm:h-64">
        {category && <category.icon className="h-16 w-16 text-primary" aria-hidden />}
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge progress={project.progress} />
          <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">{category?.label}</span>
          <span className="rounded-full border border-success/30 bg-success-bg px-3 py-1 text-xs text-success">
            Public
          </span>
        </div>

        <h1 className="mt-4 font-heading text-3xl font-bold text-text-primary sm:text-4xl">{project.name}</h1>
        <p className="mt-2 max-w-2xl text-lg text-text-muted">{project.description}</p>

        <div className="mt-6">
          <TechStack technologies={project.tags} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-text-muted">
          <span>
            By <span className="text-text-primary">{project.creator}</span> · {project.institution}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" aria-hidden /> {project.contributors} contributors
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" aria-hidden /> Updated {relativeTime(project.createdAt)}
          </span>
        </div>

        <div className="mt-4 flex items-center -space-x-2" aria-label="Team members">
          {project.team.slice(0, 6).map((member) => (
            <span
              key={member.username}
              title={member.name}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-bg bg-primary font-heading text-xs font-semibold text-white"
            >
              {initials(member.name)}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <FollowButton />
          <ShareButton title={project.name} url={getProjectUrl(project.slug)} />
          <a href="#documentation" className={buttonVariants("secondary")}>
            View Documentation
          </a>
          <button
            type="button"
            disabled
            title="Coming soon — team join requests aren't built yet"
            className={`${buttonVariants("secondary")} cursor-not-allowed opacity-60`}
          >
            Join Project <span className="ml-1 text-[10px] uppercase tracking-wide">Soon</span>
          </button>
        </div>
      </div>
    </section>
  );
}
