"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart, Star, Clock, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/common/EmptyState";
import { MOCK_RESTAURANTS } from "@/constants/mockData";
import { useAppDispatch } from "@/redux/hooks";
import { addItem } from "@/redux/slices/cartSlice";
import { toast } from "sonner";

const MOCK_WISHLIST = [
  { id: "w1", foodId: "f1", foodName: "Chicken Biryani",      price: 250, restaurantId: "r1" },
  { id: "w2", foodId: "f2", foodName: "Mutton Kacchi",        price: 420, restaurantId: "r1" },
  { id: "w3", foodId: "f4", foodName: "Classic Smash Burger", price: 299, restaurantId: "r2" },
  { id: "w4", foodId: "f3", foodName: "Paneer Butter Masala", price: 320, restaurantId: "r1" },
];

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const [wishlist, setWishlist] = useState(MOCK_WISHLIST);

  function handleRemove(id: string) {
    setWishlist((p) => p.filter((w) => w.id !== id));
    toast.success("Removed from wishlist");
  }

  function handleAddToCart(item: (typeof MOCK_WISHLIST)[0]) {
    const restaurant = MOCK_RESTAURANTS.find((r) => r.id === item.restaurantId);
    dispatch(addItem({ foodId: item.foodId, foodName: item.foodName, quantity: 1, unitPrice: item.price, selectedVariants: [], restaurantId: item.restaurantId, restaurantName: restaurant?.name ?? "" }));
    toast.success(`${item.foodName} added to cart`);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Wishlist</h1>
          <p className="mt-1 text-sm text-muted-foreground">{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
        </div>
        {wishlist.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => { wishlist.forEach((item) => handleAddToCart(item)); }}>
            <ShoppingBag className="size-3.5" /> Add all to cart
          </Button>
        )}
      </div>
      {wishlist.length === 0 ? (
        <EmptyState icon={Heart} title="Your wishlist is empty" description="Save dishes you love for quick reordering."
          action={<Button size="sm" asChild><Link href="/restaurants">Browse restaurants</Link></Button>} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {wishlist.map((item) => {
            const r = MOCK_RESTAURANTS.find((res) => res.id === item.restaurantId);
            return (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex h-24 items-center justify-center bg-muted">
                  <span className="font-display text-3xl font-bold text-muted-foreground/25">{item.foodName.charAt(0)}</span>
                </div>
                <CardContent className="space-y-3 py-3">
                  <div>
                    <p className="font-display font-semibold leading-tight">{item.foodName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r?.name} · {r?.address.area}</p>
                    <div className="mt-1.5 flex items-center gap-3 text-xs">
                      <span className="font-semibold text-primary text-sm">৳{item.price}</span>
                      <span className="flex items-center gap-0.5 text-muted-foreground"><Star className="size-3 fill-warning text-warning" />{r?.avgRating}</span>
                      <span className="flex items-center gap-0.5 text-muted-foreground"><Clock className="size-3" />{r?.avgPrepTimeMin}–{(r?.avgPrepTimeMin ?? 0) + 10} min</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => handleAddToCart(item)}>
                      <ShoppingBag className="size-3.5" /> Add to cart
                    </Button>
                    <Button size="icon" variant="ghost" className="size-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemove(item.id)} aria-label="Remove from wishlist">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
