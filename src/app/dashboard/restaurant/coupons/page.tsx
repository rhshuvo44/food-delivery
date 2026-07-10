"use client";

import { useState } from "react";
import { Plus, Tag, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_COUPONS } from "@/constants/mockData";
import type { Coupon } from "@/types/domain.types";
import { toast } from "sonner";

export default function RestaurantCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(
    MOCK_COUPONS.filter((c) => c.restaurantName === "Spice Garden" || !c.restaurantName),
  );

  function handleDelete(id: string) {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    toast.success("Coupon removed");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Coupons</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create discount codes for your restaurant
          </p>
        </div>
        <Button size="sm"><Plus className="size-4" /> Create coupon</Button>
      </div>

      <div className="space-y-3">
        {coupons.map((coupon) => {
          const isExpired = new Date(coupon.validTill) < new Date();
          return (
            <Card key={coupon.id}>
              <CardContent className="flex items-start gap-4 py-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Tag className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-mono font-bold tracking-widest text-sm">{coupon.code}</p>
                    <Badge variant={isExpired ? "secondary" : coupon.type === "PERCENTAGE" ? "warning" : "success"}>
                      {coupon.type === "PERCENTAGE" ? `${coupon.value}% OFF` :
                       coupon.type === "FLAT" ? `৳${coupon.value} OFF` : "Free Delivery"}
                    </Badge>
                    {isExpired && <Badge variant="destructive" className="text-xs">Expired</Badge>}
                    {!coupon.restaurantName && <Badge variant="outline" className="text-xs">Platform-wide</Badge>}
                  </div>
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <p>Min order: ৳{coupon.minOrderAmount}{coupon.maxDiscount ? ` · Max discount: ৳${coupon.maxDiscount}` : ""}</p>
                    <p>Valid till: {new Date(coupon.validTill).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="icon" variant="ghost" className="size-8"><Pencil className="size-3.5" /></Button>
                  <Button size="icon" variant="ghost" className="size-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(coupon.id)}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {coupons.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-3 text-center rounded-2xl border border-dashed border-border">
            <Tag className="size-8 text-muted-foreground/40" />
            <p className="font-display font-semibold">No coupons yet</p>
            <Button size="sm" onClick={() => toast.info("Add coupon dialog coming in Phase 7")}>
              <Plus className="size-4" /> Create your first coupon
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
