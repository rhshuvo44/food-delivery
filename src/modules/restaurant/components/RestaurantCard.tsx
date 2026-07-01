import Link from "next/link";
import { Clock, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Restaurant } from "@/types/domain.types";

interface RestaurantCardProps {
  restaurant: Restaurant;
  discount?: string;
}

export function RestaurantCard({ restaurant, discount }: RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <Card className="overflow-hidden py-0 transition-all hover:-translate-y-0.5 hover:shadow-md">
        {/* Cover image / placeholder */}
        <div className="bg-muted relative flex h-44 items-center justify-center overflow-hidden">
          <span className="font-display text-muted-foreground/25 text-5xl font-bold">
            {restaurant.name.charAt(0)}
          </span>
          {/* Badges overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {!restaurant.isOpen && (
              <Badge variant="secondary" className="bg-foreground/70 text-background">
                Closed
              </Badge>
            )}
            {discount && <Badge variant="warning">{discount}</Badge>}
            {restaurant.deliveryFee === 0 && (
              <Badge variant="success">Free delivery</Badge>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5 px-4 py-3.5">
          <h3 className="font-display text-lg leading-tight font-semibold">
            {restaurant.name}
          </h3>
          <p className="text-muted-foreground text-sm">
            {restaurant.cuisineTags.join(" · ")}
          </p>
          <div className="flex items-center gap-4 pt-0.5 text-sm">
            <span className="flex items-center gap-1 font-medium">
              <Star className="fill-warning text-warning size-3.5" />
              {restaurant.avgRating}
              <span className="text-muted-foreground font-normal">
                ({restaurant.totalReview})
              </span>
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="size-3.5" />
              {restaurant.avgPrepTimeMin}–{restaurant.avgPrepTimeMin + 10} min
            </span>
            {restaurant.deliveryFee > 0 && (
              <span className="text-muted-foreground ml-auto">
                ৳{restaurant.deliveryFee} delivery
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
