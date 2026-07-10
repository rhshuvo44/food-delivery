import Link from "next/link";
import { ShoppingBag, Heart, MapPin, Star, ChevronRight, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_ORDERS, ORDER_STATUS_CONFIG } from "@/constants/mockOrders";

const stats = [
  { label: "Total orders",    value: MOCK_ORDERS.length, icon: ShoppingBag, href: "/dashboard/customer/orders",    color: "text-primary",     bg: "bg-primary/10" },
  { label: "Wishlist items",  value: 4,                  icon: Heart,       href: "/dashboard/customer/wishlist",  color: "text-destructive", bg: "bg-destructive/10" },
  { label: "Saved addresses", value: 2,                  icon: MapPin,      href: "/dashboard/customer/addresses", color: "text-accent",      bg: "bg-accent/10" },
  { label: "Avg. rating given", value: "4.6",            icon: Star,        href: "/dashboard/customer/orders",    color: "text-warning",     bg: "bg-warning/10" },
];

const activeOrder = MOCK_ORDERS.find((o) => o.status === "ON_THE_WAY");

export default function CustomerDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Good morning, Rafiq! 👋</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here&apos;s what&apos;s happening with your account today.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="transition-all hover:-translate-y-0.5 hover:shadow-md">
                <CardContent className="flex flex-col gap-3 pt-2">
                  <div className={`flex size-10 items-center justify-center rounded-xl ${stat.bg}`}>
                    <Icon className={`size-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {activeOrder && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Your order is on the way!</p>
                <p className="text-xs text-muted-foreground">{activeOrder.restaurantName} · {activeOrder.orderNumber}</p>
              </div>
            </div>
            <Button size="sm" asChild>
              <Link href={`/dashboard/customer/orders/${activeOrder.id}`}>Track order</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Recent orders</h2>
          <Button variant="link" asChild className="text-sm">
            <Link href="/dashboard/customer/orders">View all <ChevronRight className="size-3.5" /></Link>
          </Button>
        </div>
        <div className="space-y-3">
          {MOCK_ORDERS.slice(0, 3).map((order) => {
            const cfg = ORDER_STATUS_CONFIG[order.status];
            return (
              <Link key={order.id} href={`/dashboard/customer/orders/${order.id}`}>
                <Card className="transition-all hover:shadow-md">
                  <CardContent className="flex items-center gap-4 py-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <ShoppingBag className="size-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm">{order.restaurantName}</p>
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {order.orderNumber} · {new Date(order.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-semibold text-sm text-primary">৳{order.totalAmount}</p>
                      <ChevronRight className="ml-auto mt-1 size-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-display text-lg font-semibold">Quick actions</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button variant="outline" className="h-14 justify-start gap-3 rounded-xl" asChild>
            <Link href="/restaurants">
              <ShoppingBag className="size-5 text-primary" />
              <div className="text-left">
                <p className="text-sm font-semibold">Order again</p>
                <p className="text-xs text-muted-foreground">Browse your favourite restaurants</p>
              </div>
            </Link>
          </Button>
          <Button variant="outline" className="h-14 justify-start gap-3 rounded-xl" asChild>
            <Link href="/dashboard/customer/addresses">
              <MapPin className="size-5 text-primary" />
              <div className="text-left">
                <p className="text-sm font-semibold">Update address</p>
                <p className="text-xs text-muted-foreground">Manage your delivery locations</p>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
