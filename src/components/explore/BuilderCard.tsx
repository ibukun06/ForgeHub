import Link from "next/link";
import { getProfileUrl } from "@/lib/urls";
import { initials } from "@/lib/format";
import type { Builder } from "./data";

export function BuilderCard({ builder }: { builder: Builder }) {
  return (
    <Link
      href={getProfileUrl(builder.username)}
      className="flex flex-col items-center rounded-lg border border-border bg-surface p-6 text-center transition-colors hover:border-primary"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-white">
        {initials(builder.name)}
      </span>
      <h3 className="mt-3 font-heading text-sm font-semibold text-text-primary">{builder.name}</h3>
      <p className="mt-0.5 text-xs text-text-muted">{builder.title}</p>
      <p className="text-xs text-text-muted">{builder.institution}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-1">
        {builder.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="rounded-full bg-input-bg px-2 py-0.5 font-mono text-[10px] text-text-muted">
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-4 text-xs text-text-muted">
        <span>{builder.projectCount} project{builder.projectCount !== 1 && 's'}</span>
      </div>
    </Link>
  );
}
