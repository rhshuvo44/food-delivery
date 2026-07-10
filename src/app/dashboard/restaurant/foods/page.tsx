"use client";

import { useState } from "react";
import { Plus, Search, ToggleLeft, ToggleRight, Pencil, Trash2, Star, Leaf } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_FOODS } from "@/constants/mockData";
import type { Food } from "@/types/domain.types";
import { toast } from "sonner";

export default function RestaurantFoodsPage() {
  const [foods, setFoods] = useState<Food[]>(
    MOCK_FOODS.filter((f) => f.restaurantId === "r1"),
  );
  const [query, setQuery] = useState("");

  const filtered = foods.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()),
  );

  function toggleAvailability(id: string) {
    setFoods((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, isAvailable: !f.isAvailable } : f,
      ),
    );
    const food = foods.find((f) => f.id === id);
    toast.success(`${food?.name} marked as ${food?.isAvailable ? "unavailable" : "available"}`);
  }

  function handleDelete(id: string) {
    setFoods((prev) => prev.filter((f) => f.id !== id));
    toast.success("Food item removed");
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-bold tracking-tight">Menu</h1>
        <Button size="sm">
          <Plus className="size-4" /> Add food item
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search menu items..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
      </div>

      {/* Summary stats */}
      <div className="flex gap-4 text-sm">
        <span className="text-muted-foreground"><strong className="text-foreground font-semibold">{foods.length}</strong> total items</span>
        <span className="text-muted-foreground"><strong className="text-accent font-semibold">{foods.filter((f) => f.isAvailable).length}</strong> available</span>
        <span className="text-muted-foreground"><strong className="text-destructive font-semibold">{foods.filter((f) => !f.isAvailable).length}</strong> unavailable</span>
      </div>

      {/* Foods list */}
      <div className="space-y-3">
        {filtered.map((food) => (
          <Card key={food.id} className={!food.isAvailable ? "opacity-60" : ""}>
            <CardContent className="flex items-start gap-4 py-4">
              {/* Placeholder image */}
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl font-bold text-muted-foreground/25 font-display">
                {food.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <p className="font-display font-semibold truncate">{food.name}</p>
                    {food.isVegetarian && <Leaf className="size-3.5 text-accent shrink-0" />}
                    {!food.isAvailable && <Badge variant="secondary" className="text-xs shrink-0">Unavailable</Badge>}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleAvailability(food.id)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={food.isAvailable ? "Mark unavailable" : "Mark available"}
                    >
                      {food.isAvailable
                        ? <ToggleRight className="size-6 text-accent" />
                        : <ToggleLeft className="size-6" />}
                    </button>
                    <Button size="icon" variant="ghost" className="size-8">
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="size-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(food.id)}>
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>

                {food.description && (
                  <p className="text-xs text-muted-foreground line-clamp-1">{food.description}</p>
                )}

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-primary">
                      ৳{food.discountPrice ?? food.price}
                    </span>
                    {food.discountPrice && (
                      <span className="text-xs text-muted-foreground line-through">৳{food.price}</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="size-3 fill-warning text-warning" />
                    {food.avgRating} ({food.totalReview})
                  </span>
                  <span className="text-xs text-muted-foreground">{food.totalSold} sold</span>
                </div>

                {food.variants.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {food.variants.map((v) => (
                      <Badge key={v.name} variant="outline" className="text-xs">
                        {v.name}: {v.options.map((o) => o.label).join(", ")}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-2 text-center">
            <p className="font-display font-semibold">No items match your search</p>
            <Button variant="outline" size="sm" onClick={() => setQuery("")}>Clear search</Button>
          </div>
        )}
      </div>
    </div>
  );
}
