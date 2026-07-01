import { Star, Clock, Flame } from "lucide-react";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const sampleRestaurants = [
  {
    name: "Spice Garden",
    cuisine: "Bengali · Indian · Biryani",
    rating: 4.6,
    time: "25–35 min",
    discount: "20% OFF",
  },
  {
    name: "Burger Barn",
    cuisine: "American · Fast Food",
    rating: 4.3,
    time: "15–25 min",
    discount: null,
  },
  {
    name: "Sushi Theory",
    cuisine: "Japanese · Sushi",
    rating: 4.8,
    time: "30–40 min",
    discount: "Free Delivery",
  },
];

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-grain bg-secondary/40 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <Badge variant="warning" className="mb-4">
              <Flame className="size-3" />
              Now delivering in Gulshan & Banani
            </Badge>
            <h1 className="font-display text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Food you love,
              <br />
              <span className="text-primary italic">delivered fast.</span>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-md text-lg">
              Order from your favorite local restaurants — fresh, hot, and at your door in
              under 30 minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg">Order Now</Button>
              <Button size="lg" variant="outline">
                Browse Restaurants
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant grid */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Popular near you
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Top-rated restaurants ready to deliver
            </p>
          </div>
          <Button variant="link" className="hidden sm:inline-flex">
            View all
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sampleRestaurants.map((r) => (
            <Card
              key={r.name}
              className="overflow-hidden py-0 transition-shadow hover:shadow-md"
            >
              <div className="bg-muted relative flex h-40 items-center justify-center">
                <span className="font-display text-muted-foreground/40 text-3xl font-bold">
                  {r.name.charAt(0)}
                </span>
                {r.discount && (
                  <Badge variant="success" className="absolute top-3 left-3">
                    {r.discount}
                  </Badge>
                )}
              </div>
              <div className="space-y-2 px-5 py-4">
                <h3 className="font-display text-lg font-semibold">{r.name}</h3>
                <p className="text-muted-foreground text-sm">{r.cuisine}</p>
                <div className="flex items-center gap-4 pt-1 text-sm">
                  <span className="flex items-center gap-1 font-medium">
                    <Star className="fill-warning text-warning size-3.5" />
                    {r.rating}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {r.time}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
