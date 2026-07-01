"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CUISINE_CATEGORIES, MOCK_RESTAURANTS } from "@/constants/mockData";
import { useDebounce } from "@/hooks/useDebounce";
import { RestaurantCard } from "@/modules/restaurant/components/RestaurantCard";

interface RestaurantsClientProps {
  initialCuisine?: string;
}

export default function RestaurantsClient({ initialCuisine }: RestaurantsClientProps) {
  const [query, setQuery] = useState("");
  const [activeCuisine, setActiveCuisine] = useState<string | null>(
    initialCuisine ?? null,
  );
  const [onlyOpen, setOnlyOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  const filtered = useMemo(() => {
    return MOCK_RESTAURANTS.filter((r) => {
      const matchesQuery =
        !debouncedQuery ||
        r.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        r.cuisineTags.some((t) => t.toLowerCase().includes(debouncedQuery.toLowerCase()));
      const matchesCuisine =
        !activeCuisine ||
        r.cuisineTags.some((t) => t.toLowerCase().includes(activeCuisine.toLowerCase()));
      const matchesOpen = !onlyOpen || r.isOpen;
      return matchesQuery && matchesCuisine && matchesOpen;
    });
  }, [debouncedQuery, activeCuisine, onlyOpen]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Restaurants</h1>
      <p className="text-muted-foreground mt-1">
        {MOCK_RESTAURANTS.length} restaurants delivering near you
      </p>

      {/* Search + filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2" />
          <Input
            placeholder="Search restaurants or cuisines..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={onlyOpen ? "default" : "outline"}
          size="sm"
          onClick={() => setOnlyOpen(!onlyOpen)}
        >
          <SlidersHorizontal className="size-3.5" />
          Open now
        </Button>
      </div>

      {/* Cuisine filter chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCuisine(null)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
            !activeCuisine
              ? "bg-primary text-primary-foreground"
              : "border-border hover:border-primary hover:text-primary border"
          }`}
        >
          All
        </button>
        {CUISINE_CATEGORIES.map((c) => (
          <button
            key={c.label}
            onClick={() => setActiveCuisine(activeCuisine === c.label ? null : c.label)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              activeCuisine === c.label
                ? "bg-primary text-primary-foreground"
                : "border-border hover:border-primary hover:text-primary border"
            }`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-8">
        {filtered.length === 0 ? (
          <EmptyState
            title="No restaurants found"
            description="Try adjusting your search or clearing filters."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setActiveCuisine(null);
                  setOnlyOpen(false);
                }}
              >
                Clear filters
              </Button>
            }
          />
        ) : (
          <>
            <p className="text-muted-foreground mb-4 text-sm">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
