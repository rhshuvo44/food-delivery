"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { MapPin, CreditCard, Banknote } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCouponDiscount,
  clearCart,
} from "@/redux/slices/cartSlice";

const DELIVERY_FEE = 40;

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^\+?01[3-9]\d{8}$/, "Enter a valid BD mobile number"),
  street: z.string().min(5, "Street address is required"),
  area: z.string().min(2, "Area is required"),
  note: z.string().optional(),
  paymentMethod: z.enum(["CASH_ON_DELIVERY", "CARD", "MOBILE_BANKING"]),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const couponDiscount = useAppSelector(selectCouponDiscount);
  const total = Math.max(0, subtotal + DELIVERY_FEE - couponDiscount);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "CASH_ON_DELIVERY" },
  });

  const paymentMethod = watch("paymentMethod");

  async function onSubmit() {
    // Simulated — Phase 7 wires this to the real API
    await new Promise((r) => setTimeout(r, 1200));
    dispatch(clearCart());
    toast.success("Order placed! Track it in your dashboard.");
    router.push("/dashboard/customer/orders");
  }

  // Guard: redirect if cart is empty — must be in useEffect, not at render
  // time, to avoid "location is not defined" during SSR static generation.
  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="space-y-8 lg:col-span-2">
          {/* Delivery address */}
          <section className="border-border bg-card space-y-4 rounded-2xl border p-6">
            <h2 className="font-display flex items-center gap-2 text-lg font-semibold">
              <MapPin className="text-primary size-5" />
              Delivery address
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="co-name">Full name</Label>
                <Input id="co-name" placeholder="Rafiq Ahmed" {...register("name")} />
                {errors.name && (
                  <p className="text-destructive text-xs">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="co-phone">Phone number</Label>
                <Input id="co-phone" placeholder="01XXXXXXXXX" {...register("phone")} />
                {errors.phone && (
                  <p className="text-destructive text-xs">{errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="co-street">Street / House / Road</Label>
                <Input
                  id="co-street"
                  placeholder="House 25, Road 11"
                  {...register("street")}
                />
                {errors.street && (
                  <p className="text-destructive text-xs">{errors.street.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="co-area">Area / Thana</Label>
                <Input id="co-area" placeholder="Banani, Dhaka" {...register("area")} />
                {errors.area && (
                  <p className="text-destructive text-xs">{errors.area.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="co-note">Delivery note (optional)</Label>
                <Input
                  id="co-note"
                  placeholder="Ring bell twice, etc."
                  {...register("note")}
                />
              </div>
            </div>
          </section>

          {/* Payment method */}
          <section className="border-border bg-card space-y-4 rounded-2xl border p-6">
            <h2 className="font-display flex items-center gap-2 text-lg font-semibold">
              <CreditCard className="text-primary size-5" />
              Payment method
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {(
                [
                  {
                    value: "CASH_ON_DELIVERY",
                    label: "Cash on Delivery",
                    icon: Banknote,
                  },
                  { value: "MOBILE_BANKING", label: "bKash / Nagad", icon: CreditCard },
                  { value: "CARD", label: "Debit / Credit Card", icon: CreditCard },
                ] as const
              ).map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setValue("paymentMethod", value)}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center text-sm font-medium transition-colors ${
                    paymentMethod === value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Icon className="size-5" />
                  {label}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="border-border bg-card space-y-4 rounded-2xl border p-5">
            <h2 className="font-display text-lg font-semibold">Order summary</h2>

            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.foodName} × {item.quantity}
                  </span>
                  <span>৳{(item.unitPrice * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>

            <Separator />

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
              <span className="text-primary">৳{total.toFixed(0)}</span>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Placing order..." : `Place order · ৳${total.toFixed(0)}`}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
