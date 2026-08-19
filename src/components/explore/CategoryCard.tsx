import Link from "next/link";
import type { Category } from "@/components/landing/data";

export function CategoryCard({ category, count }: { category: Category; count: number }) {
  return (
    <Link
      href={`/explore?category=${category.slug}`}
      className="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface p-5 text-center transition-colors hover:border-primary"
    >
      <category.icon className="h-6 w-6 text-primary" aria-hidden />
      <span className="text-sm text-text-primary">{category.label}</span>
      <span className="font-mono text-xs text-text-muted">
        {count} project{count === 1 ? "" : "s"}
      </span>
    </Link>
  );
}
