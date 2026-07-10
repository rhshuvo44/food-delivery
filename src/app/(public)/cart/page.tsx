"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Tag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/common/EmptyState";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCouponCode,
  selectCouponDiscount,
  removeItem,
  updateQuantity,
  applyCoupon,
  removeCoupon,
} from "@/redux/slices/cartSlice";
import { MOCK_COUPONS } from "@/constants/mockData";

const DELIVERY_FEE = 40;

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const couponCode = useAppSelector(selectCouponCode);
  const couponDiscount = useAppSelector(selectCouponDiscount);
  const [couponInput, setCouponInput] = useState("");

  function handleApplyCoupon() {
    const coupon = MOCK_COUPONS.find((c) => c.code === couponInput.trim().toUpperCase());
    if (!coupon) {
      toast.error("Invalid coupon code");
      return;
    }
    if (subtotal < coupon.minOrderAmount) {
      toast.error(`Minimum order amount ৳${coupon.minOrderAmount} required`);
      return;
    }
    let discount = 0;
    if (coupon.type === "PERCENTAGE") {
      discount = Math.min(
        (subtotal * coupon.value) / 100,
        coupon.maxDiscount ?? Infinity,
      );
    } else if (coupon.type === "FLAT") {
      discount = coupon.value;
    } else if (coupon.type === "FREE_DELIVERY") {
      discount = DELIVERY_FEE;
    }
    dispatch(applyCoupon({ code: coupon.code, discount }));
    toast.success(`Coupon applied — ৳${discount.toFixed(0)} discount!`);
    setCouponInput("");
  }

  const totalAmount = Math.max(0, subtotal + DELIVERY_FEE - couponDiscount);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add some delicious items to get started."
          action={
            <Button asChild>
              <Link href="/restaurants">Browse restaurants</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Your cart</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Items list */}
        <div className="space-y-3 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="border-border bg-card flex items-start gap-4 rounded-2xl border p-4"
            >
              <div className="bg-muted text-muted-foreground/30 flex size-14 shrink-0 items-center justify-center rounded-xl text-xl font-bold">
                {item.foodName.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display font-semibold">{item.foodName}</p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {item.restaurantName}
                </p>
                {item.selectedVariants.length > 0 && (
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    {item.selectedVariants.map((v) => v.optionLabel).join(", ")}
                  </p>
                )}
                <div className="mt-3 flex items-center justify-between">
                  {/* Quantity control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({ id: item.id, quantity: item.quantity - 1 }),
                        )
                      }
                      className="border-border hover:bg-secondary flex size-7 items-center justify-center rounded-full border"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({ id: item.id, quantity: item.quantity + 1 }),
                        )
                      }
                      className="border-border hover:bg-secondary flex size-7 items-center justify-center rounded-full border"
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-primary font-semibold">
                      ৳{(item.unitPrice * item.quantity).toFixed(0)}
                    </span>
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="space-y-4">
          <div className="border-border bg-card space-y-4 rounded-2xl border p-5">
            <h2 className="font-display text-lg font-semibold">Order summary</h2>

            {/* Coupon */}
            {couponCode ? (
              <div className="bg-accent/10 flex items-center justify-between rounded-xl px-3 py-2 text-sm">
                <span className="text-accent flex items-center gap-1.5 font-medium">
                  <Tag className="size-3.5" />
                  {couponCode}
                </span>
                <button
                  onClick={() => dispatch(removeCoupon())}
                  className="text-muted-foreground hover:text-destructive text-xs"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Coupon code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  className="h-9 text-sm"
                />
                <Button size="sm" variant="outline" onClick={handleApplyCoupon}>
                  Apply
                </Button>
              </div>
            )}

            <Separator />

            {/* Price breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>৳{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery fee</span>
                <span>৳{DELIVERY_FEE}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="text-accent flex justify-between">
                  <span>Discount</span>
                  <span>−৳{couponDiscount.toFixed(0)}</span>
                </div>
              )}
            </div>

            <Separator />

            <div className="font-display flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">৳{totalAmount.toFixed(0)}</span>
            </div>

            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout">Proceed to checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
