"use client";

import { Plus, Leaf } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch } from "@/redux/hooks";
import { addItem } from "@/redux/slices/cartSlice";
import type { Food } from "@/types/domain.types";
import { toast } from "sonner";

interface FoodCardProps {
  food: Food;
  layout?: "grid" | "list";
}

export function FoodCard({ food, layout = "grid" }: FoodCardProps) {
  const dispatch = useAppDispatch();

  function handleAdd() {
    dispatch(
      addItem({
        foodId: food.id,
        foodName: food.name,
        foodImage: food.images[0],
        quantity: 1,
        unitPrice: food.discountPrice ?? food.price,
        selectedVariants: [],
        restaurantId: food.restaurantId,
        restaurantName: food.restaurantName ?? "",
      }),
    );
    toast.success(`${food.name} added to cart`);
  }

  if (layout === "list") {
    return (
      <div className="border-border bg-card flex items-center gap-4 rounded-xl border p-4">
        <div className="bg-muted text-muted-foreground/30 flex size-20 shrink-0 items-center justify-center rounded-xl text-2xl font-bold">
          {food.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                {food.isVegetarian && <Leaf className="text-accent size-3.5 shrink-0" />}
                <h4 className="font-display leading-tight font-semibold">{food.name}</h4>
              </div>
              {food.description && (
                <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
                  {food.description}
                </p>
              )}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-primary font-semibold">
                  ৳{food.discountPrice ?? food.price}
                </span>
                {food.discountPrice && (
                  <span className="text-muted-foreground text-xs line-through">
                    ৳{food.price}
                  </span>
                )}
                {food.spiceLevel && food.spiceLevel > 0 && (
                  <span className="text-destructive flex items-center gap-0.5 text-xs">
                    {"🌶".repeat(food.spiceLevel)}
                  </span>
                )}
              </div>
            </div>
            <Button
              size="icon"
              className="size-8 shrink-0"
              onClick={handleAdd}
              disabled={!food.isAvailable}
              aria-label={`Add ${food.name} to cart`}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group border-border bg-card relative flex flex-col overflow-hidden rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="bg-muted relative flex h-40 items-center justify-center">
        <span className="font-display text-muted-foreground/25 text-4xl font-bold">
          {food.name.charAt(0)}
        </span>
        {food.discountPrice && (
          <Badge variant="warning" className="absolute top-2 left-2">
            {Math.round(((food.price - food.discountPrice) / food.price) * 100)}% OFF
          </Badge>
        )}
        {food.isVegetarian && (
          <span className="bg-accent absolute top-2 right-2 flex size-6 items-center justify-center rounded-full">
            <Leaf className="text-accent-foreground size-3" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h4 className="font-display leading-tight font-semibold">{food.name}</h4>
        {food.description && (
          <p className="text-muted-foreground line-clamp-2 text-xs">{food.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-1">
          <div>
            <span className="text-primary font-semibold">
              ৳{food.discountPrice ?? food.price}
            </span>
            {food.discountPrice && (
              <span className="text-muted-foreground ml-1.5 text-xs line-through">
                ৳{food.price}
              </span>
            )}
          </div>
          <Button
            size="icon"
            className="size-8"
            onClick={handleAdd}
            disabled={!food.isAvailable}
            aria-label={`Add ${food.name} to cart`}
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
