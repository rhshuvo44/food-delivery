"use client";

import { Leaf, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { use, useState } from "react";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_FOODS } from "@/constants/mockData";
import { useAppDispatch } from "@/redux/hooks";
import { addItem } from "@/redux/slices/cartSlice";
import { toast } from "sonner";

export default function FoodDetailPage({
  params,
}: {
  params: Promise<{ foodId: string }>;
}) {
  const { foodId } = use(params);
  const food = MOCK_FOODS.find((f) => f.id === foodId);
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  if (!food) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Item not found</h1>
      </div>
    );
  }

  const variantExtras = food.variants.reduce((total, variant) => {
    const selectedLabel = selectedVariants[variant.name] ?? variant.options[0]?.label;
    const selectedOption = variant.options.find((o) => o.label === selectedLabel);
    return total + (selectedOption?.extraPrice ?? 0);
  }, 0);

  const unitPrice = (food.discountPrice ?? food.price) + variantExtras;

  function handleAddToCart() {
    const builtVariants = food!.variants
      .map((v) => ({
        variantName: v.name,
        optionLabel: selectedVariants[v.name] ?? v.options[0]?.label ?? "",
        extraPrice:
          v.options.find(
            (o) => o.label === (selectedVariants[v.name] ?? v.options[0]?.label),
          )?.extraPrice ?? 0,
      }))
      .filter((v) => v.optionLabel);

    dispatch(
      addItem({
        foodId: food!.id,
        foodName: food!.name,
        foodImage: food!.images[0],
        quantity,
        unitPrice,
        selectedVariants: builtVariants,
        restaurantId: food!.restaurantId,
        restaurantName: food!.restaurantName ?? "",
      }),
    );
    toast.success(`${food!.name} × ${quantity} added to cart`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Restaurants", href: "/restaurants" },
          {
            label: food.restaurantName ?? "Restaurant",
            href: `/restaurants/${food.restaurantId}`,
          },
          { label: food.name },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Image placeholder */}
        <div className="bg-muted flex h-72 items-center justify-center overflow-hidden rounded-2xl lg:h-auto lg:min-h-80">
          <span className="font-display text-muted-foreground/20 text-8xl font-bold">
            {food.name.charAt(0)}
          </span>
        </div>

        {/* Info + config */}
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-start gap-2">
              <h1 className="font-display flex-1 text-2xl leading-tight font-bold">
                {food.name}
              </h1>
              {food.isVegetarian && (
                <Badge variant="success" className="shrink-0">
                  <Leaf className="size-3" /> Veg
                </Badge>
              )}
            </div>
            {food.description && (
              <p className="text-muted-foreground mt-2">{food.description}</p>
            )}
            <div className="mt-3 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="fill-warning text-warning size-4" />
                <strong>{food.avgRating}</strong>
                <span className="text-muted-foreground">({food.totalReview})</span>
              </span>
              <span className="text-muted-foreground">{food.totalSold} sold</span>
              {food.spiceLevel && food.spiceLevel > 0 && (
                <span>{"🌶".repeat(food.spiceLevel)}</span>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-display text-primary text-2xl font-bold">
              ৳{food.discountPrice ?? food.price}
            </span>
            {food.discountPrice && (
              <span className="text-muted-foreground text-base line-through">
                ৳{food.price}
              </span>
            )}
          </div>

          {/* Variants */}
          {food.variants.map((variant) => (
            <div key={variant.name}>
              <p className="mb-2 text-sm font-semibold">{variant.name}</p>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((option) => {
                  const isSelected =
                    (selectedVariants[variant.name] ?? variant.options[0]?.label) ===
                    option.label;
                  return (
                    <button
                      key={option.label}
                      onClick={() =>
                        setSelectedVariants((prev) => ({
                          ...prev,
                          [variant.name]: option.label,
                        }))
                      }
                      className={`rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {option.label}
                      {option.extraPrice > 0 && (
                        <span className="ml-1 opacity-70">+৳{option.extraPrice}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quantity + Add */}
          <div className="flex items-center gap-4 pt-2">
            <div className="border-border flex items-center gap-3 rounded-full border-2 px-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="hover:bg-secondary flex size-8 items-center justify-center rounded-full"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-6 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="hover:bg-secondary flex size-8 items-center justify-center rounded-full"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              className="flex-1"
              disabled={!food.isAvailable}
            >
              <ShoppingBag className="size-4" />
              Add to cart · ৳{(unitPrice * quantity).toFixed(0)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
