import { Tag, Copy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_COUPONS } from "@/constants/mockData";

export default function OffersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Offers & Coupons
        </h1>
        <p className="text-muted-foreground mt-1">
          Grab the best deals before they expire.
        </p>
      </div>

      {/* Hero banner */}
      <div className="from-primary/20 via-primary/10 to-warning/10 mb-8 flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br">
        <div className="text-center">
          <p className="font-display text-primary text-4xl font-bold">50% OFF</p>
          <p className="text-muted-foreground mt-1 text-sm">On your first order</p>
          <p className="border-primary text-primary mt-2 rounded-full border-2 border-dashed px-4 py-1 text-sm font-semibold tracking-widest">
            WELCOME50
          </p>
        </div>
      </div>

      {/* Coupon cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_COUPONS.map((coupon) => (
          <Card key={coupon.id} className="relative overflow-hidden">
            <div className="bg-primary absolute top-0 right-0 h-full w-1.5" />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="bg-primary/10 flex size-10 items-center justify-center rounded-xl">
                  <Tag className="text-primary size-5" />
                </div>
                <Badge variant={coupon.type === "PERCENTAGE" ? "warning" : "success"}>
                  {coupon.type === "PERCENTAGE"
                    ? `${coupon.value}% OFF`
                    : coupon.type === "FLAT"
                      ? `৳${coupon.value} OFF`
                      : "Free Delivery"}
                </Badge>
              </div>
              <CardTitle className="mt-3">{coupon.code}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-muted-foreground text-sm">
                {coupon.maxDiscount && <p>Max discount: ৳{coupon.maxDiscount}</p>}
                <p>Min order: ৳{coupon.minOrderAmount}</p>
                {coupon.restaurantName && <p>Only at {coupon.restaurantName}</p>}
                <p className="mt-1">
                  Valid till:{" "}
                  {new Date(coupon.validTill).toLocaleDateString("en-BD", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Copy className="size-3.5" />
                Copy code
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
