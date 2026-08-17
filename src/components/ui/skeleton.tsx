import { type HTMLAttributes } from "react";

export function Skeleton({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  const hasBg = className.includes("bg-");
  return (
    <div
      className={`animate-pulse rounded-md ${hasBg ? "" : "bg-border/60"} ${className}`}
      {...props}
    />
  );
}
