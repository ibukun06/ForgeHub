"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

/**
 * Visual only. There's no `project_follows` (or similar) table in the
 * schema yet, so this doesn't persist anywhere — it resets on refresh.
 * A real implementation needs that table plus an API route before this
 * button means anything beyond the current page load.
 */
export function FollowButton() {
  const [following, setFollowing] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFollowing(!following)}
      aria-pressed={following}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
        following ? "border-primary bg-primary text-white" : "border-border text-text-primary hover:border-primary"
      }`}
    >
      <Heart className={`h-4 w-4 ${following ? "fill-current" : ""}`} aria-hidden />
      {following ? "Following" : "Follow"}
    </button>
  );
}
