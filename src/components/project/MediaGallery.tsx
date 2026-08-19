"use client";

import { useState } from "react";
import { Image as ImageIcon, Box, Workflow, Video as VideoIcon } from "lucide-react";
import type { MediaItem } from "./data";

const MEDIA_ICONS = { image: ImageIcon, cad: Box, diagram: Workflow, video: VideoIcon };
const MEDIA_LABELS: Record<MediaItem["type"], string> = {
  image: "Image",
  cad: "CAD render",
  diagram: "Diagram",
  video: "Video",
};

export function MediaGallery({ media }: { media: MediaItem[] }) {
  const [selected, setSelected] = useState(0);
  if (media.length === 0) return null;

  const active = media[selected];
  const ActiveIcon = MEDIA_ICONS[active.type];

  return (
    <section className="border-b border-border py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-text-primary">Media</h2>

        <div
          className="mt-6 flex h-64 flex-col items-center justify-center gap-2 rounded-lg border border-border bg-gradient-to-br from-primary/15 to-secondary/15"
          aria-live="polite"
        >
          <ActiveIcon className="h-10 w-10 text-primary" aria-hidden />
          <p className="text-sm text-text-muted">{active.caption}</p>
          <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-text-muted">
            {MEDIA_LABELS[active.type]}
          </span>
        </div>

        {media.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {media.map((item, i) => {
              const Icon = MEDIA_ICONS[item.type];
              return (
                <button
                  key={item.caption + i}
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-pressed={i === selected}
                  aria-label={`View ${MEDIA_LABELS[item.type]}: ${item.caption}`}
                  className={`flex h-16 w-20 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                    i === selected ? "border-primary bg-primary/10" : "border-border bg-surface hover:border-primary"
                  }`}
                >
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
