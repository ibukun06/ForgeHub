import Link from "next/link";
import { CATEGORIES } from "./data";

export function Categories() {
  return (
    <section id="categories" className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">Browse by category</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/explore?category=${category.slug}`}
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface p-5 text-center transition-colors hover:border-primary"
            >
              <category.icon className="h-6 w-6 text-primary" aria-hidden />
              <span className="text-sm text-text-primary">{category.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
