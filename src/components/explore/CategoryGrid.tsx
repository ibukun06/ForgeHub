import { CATEGORIES } from "@/components/landing/data";
import { MOCK_PROJECTS } from "./data";
import { CategoryCard } from "./CategoryCard";

export function CategoryGrid() {
  return (
    <section id="categories" className="border-b border-border py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">Browse by category</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              count={MOCK_PROJECTS.filter((p) => p.category === category.slug).length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
