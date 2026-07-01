import Link from "next/link";

import { CUISINE_CATEGORIES, MOCK_RESTAURANTS } from "@/constants/mockData";

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Categories</h1>
      <p className="text-muted-foreground mt-1">Browse by what you&apos;re craving.</p>

      {/* Cuisine grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {CUISINE_CATEGORIES.map((cat) => {
          const count = MOCK_RESTAURANTS.filter((r) =>
            r.cuisineTags.some((t) => t.toLowerCase().includes(cat.label.toLowerCase())),
          ).length;
          return (
            <Link
              key={cat.label}
              href={`/restaurants?cuisine=${encodeURIComponent(cat.label)}`}
              className="group border-border bg-card hover:border-primary flex flex-col items-center justify-center gap-3 rounded-2xl border p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-4xl">{cat.emoji}</span>
              <div>
                <p className="font-display group-hover:text-primary font-semibold">
                  {cat.label}
                </p>
                <p className="text-muted-foreground text-xs">
                  {count} restaurant{count !== 1 ? "s" : ""}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* All restaurants CTA */}
      <div className="bg-secondary/50 mt-12 flex flex-col items-center gap-3 rounded-2xl py-10 text-center">
        <p className="font-display text-xl font-bold">Can&apos;t decide?</p>
        <p className="text-muted-foreground">
          Browse all available restaurants near you.
        </p>
        <Link
          href="/restaurants"
          className="bg-primary text-primary-foreground rounded-full px-6 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
        >
          See all restaurants
        </Link>
      </div>
    </div>
  );
}
