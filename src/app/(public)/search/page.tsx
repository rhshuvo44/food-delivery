"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RestaurantCard } from "@/modules/restaurant/components/RestaurantCard";
import { FoodCard } from "@/modules/food/components/FoodCard";
import { EmptyState } from "@/components/common/EmptyState";
import { MOCK_RESTAURANTS, MOCK_FOODS } from "@/constants/mockData";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const matchedRestaurants = useMemo(
    () =>
      debouncedQuery.trim()
        ? MOCK_RESTAURANTS.filter(
            (r) =>
              r.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
              r.cuisineTags.some((t) =>
                t.toLowerCase().includes(debouncedQuery.toLowerCase()),
              ),
          )
        : [],
    [debouncedQuery],
  );

  const matchedFoods = useMemo(
    () =>
      debouncedQuery.trim()
        ? MOCK_FOODS.filter(
            (f) =>
              f.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
              f.description?.toLowerCase().includes(debouncedQuery.toLowerCase()),
          )
        : [],
    [debouncedQuery],
  );

  const hasResults = matchedRestaurants.length > 0 || matchedFoods.length > 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Search</h1>

      {/* Search bar */}
      <div className="relative mt-5">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" />
        <Input
          autoFocus
          placeholder="Search restaurants, dishes, cuisines..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-14 pl-12 text-base"
        />
      </div>

      {/* Results */}
      <div className="mt-8">
        {!debouncedQuery.trim() ? (
          <EmptyState
            icon={Search}
            title="Start typing to search"
            description="Find restaurants or dishes by name, cuisine, or keyword."
          />
        ) : !hasResults ? (
          <EmptyState
            icon={Search}
            title={`No results for "${debouncedQuery}"`}
            description="Try a different keyword — check spelling or search for a cuisine type."
          />
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                All ({matchedRestaurants.length + matchedFoods.length})
              </TabsTrigger>
              <TabsTrigger value="restaurants">
                Restaurants ({matchedRestaurants.length})
              </TabsTrigger>
              <TabsTrigger value="foods">Dishes ({matchedFoods.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {matchedRestaurants.length > 0 && (
                <div>
                  <h2 className="font-display mb-3 text-lg font-semibold">Restaurants</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {matchedRestaurants.map((r) => (
                      <RestaurantCard key={r.id} restaurant={r} />
                    ))}
                  </div>
                </div>
              )}
              {matchedFoods.length > 0 && (
                <div>
                  <h2 className="font-display mb-3 text-lg font-semibold">Dishes</h2>
                  <div className="grid gap-3">
                    {matchedFoods.map((f) => (
                      <FoodCard key={f.id} food={f} layout="list" />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="restaurants">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {matchedRestaurants.map((r) => (
                  <RestaurantCard key={r.id} restaurant={r} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="foods">
              <div className="grid gap-3">
                {matchedFoods.map((f) => (
                  <FoodCard key={f.id} food={f} layout="list" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
