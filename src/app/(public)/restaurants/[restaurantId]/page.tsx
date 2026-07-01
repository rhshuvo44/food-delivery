"use client";

import { useState } from "react";
import { use } from "react";
import { Clock, Star, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { FoodCard } from "@/modules/food/components/FoodCard";
import { MOCK_RESTAURANTS, MOCK_FOODS, MOCK_CATEGORIES } from "@/constants/mockData";
import { EmptyState } from "@/components/common/EmptyState";

export default function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = use(params);
  const restaurant = MOCK_RESTAURANTS.find((r) => r.id === restaurantId);
  const foods = MOCK_FOODS.filter((f) => f.restaurantId === restaurantId);
  const categories = MOCK_CATEGORIES.filter((c) => c.restaurantId === restaurantId);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  if (!restaurant) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Restaurant not found</h1>
      </div>
    );
  }

  const visibleFoods = activeCategory
    ? foods.filter((f) => f.categoryId === activeCategory)
    : foods;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Restaurants", href: "/restaurants" },
          { label: restaurant.name },
        ]}
      />

      {/* Hero banner */}
      <div className="bg-muted mt-5 flex h-48 items-center justify-center overflow-hidden rounded-2xl sm:h-64">
        <span className="font-display text-muted-foreground/20 text-7xl font-bold">
          {restaurant.name.charAt(0)}
        </span>
      </div>

      {/* Restaurant info */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight">
              {restaurant.name}
            </h1>
            {!restaurant.isOpen && <Badge variant="secondary">Closed</Badge>}
          </div>
          <p className="text-muted-foreground mt-1">
            {restaurant.cuisineTags.join(" · ")}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <Star className="fill-warning text-warning size-4" />
              <strong>{restaurant.avgRating}</strong>
              <span className="text-muted-foreground">
                ({restaurant.totalReview} reviews)
              </span>
            </span>
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Clock className="size-4" />
              {restaurant.avgPrepTimeMin}–{restaurant.avgPrepTimeMin + 10} min
            </span>
            <span className="text-muted-foreground flex items-center gap-1.5">
              <MapPin className="size-4" />
              {restaurant.address.area}, {restaurant.address.city}
            </span>
          </div>
        </div>
        <div className="border-border bg-card flex shrink-0 gap-4 rounded-xl border p-4 text-sm">
          <div className="text-center">
            <p className="font-semibold">৳{restaurant.deliveryFee}</p>
            <p className="text-muted-foreground text-xs">Delivery fee</p>
          </div>
          <div className="bg-border w-px" />
          <div className="text-center">
            <p className="font-semibold">৳{restaurant.minOrderAmount}</p>
            <p className="text-muted-foreground text-xs">Min order</p>
          </div>
        </div>
      </div>

      {/* Category nav */}
      {categories.length > 0 && (
        <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !activeCategory
                ? "bg-primary text-primary-foreground"
                : "border-border hover:border-primary border"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(activeCategory === c.id ? null : c.id)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === c.id
                  ? "bg-primary text-primary-foreground"
                  : "border-border hover:border-primary border"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {/* Food list */}
      <div className="mt-6">
        {visibleFoods.length === 0 ? (
          <EmptyState title="No items in this category" />
        ) : (
          <div className="grid gap-3">
            {visibleFoods.map((food) => (
              <FoodCard key={food.id} food={food} layout="list" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
