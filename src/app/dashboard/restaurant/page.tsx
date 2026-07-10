import Link from "next/link";
import {
  ShoppingBag, Star, DollarSign,
  Clock, CheckCircle2, ChevronRight, AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_ORDERS, ORDER_STATUS_CONFIG } from "@/constants/mockOrders";

const KPI_CARDS = [
  { label: "Today's revenue",   value: "৳4,280", delta: "+12%", icon: DollarSign, positive: true  },
  { label: "Orders today",      value: "23",      delta: "+5",   icon: ShoppingBag, positive: true  },
  { label: "Avg. rating",       value: "4.6",     delta: "↑0.1", icon: Star,        positive: true  },
  { label: "Avg. prep time",    value: "24 min",  delta: "-2",   icon: Clock,        positive: true  },
];

const LIVE_ORDERS = MOCK_ORDERS.filter((o) =>
  ["PENDING","CONFIRMED","PREPARING"].includes(o.status),
);

const RECENT_ORDERS = MOCK_ORDERS.slice(0, 4);

export default function RestaurantDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Spice Garden</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Wednesday, {new Date().toLocaleDateString("en-BD", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent">
            <span className="size-1.5 rounded-full bg-accent" /> Open
          </span>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPI_CARDS.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label}>
              <CardContent className="pt-2">
                <div className="flex items-start justify-between">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-4.5 text-primary" />
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${kpi.positive ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"}`}>
                    {kpi.delta}
                  </span>
                </div>
                <p className="font-display mt-3 text-2xl font-bold">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Live orders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              Live orders
            </h2>
            <Button variant="link" size="sm" asChild>
              <Link href="/dashboard/restaurant/orders">View all</Link>
            </Button>
          </div>
          {LIVE_ORDERS.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center py-10 gap-2 text-center">
                <CheckCircle2 className="size-8 text-accent" />
                <p className="text-sm font-medium">All caught up!</p>
                <p className="text-xs text-muted-foreground">No pending orders right now.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {LIVE_ORDERS.map((order) => {
                const cfg = ORDER_STATUS_CONFIG[order.status];
                return (
                  <Card key={order.id} className="border-primary/20">
                    <CardContent className="py-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm">{order.orderNumber}</p>
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                      </p>
                      <div className="flex gap-2 pt-1">
                        <Button size="sm" className="flex-1 h-7 text-xs">Accept</Button>
                        <Button size="sm" variant="outline" className="flex-1 h-7 text-xs">Decline</Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Alert */}
          <Card className="border-warning/30 bg-warning/5">
            <CardContent className="flex items-start gap-3 py-3">
              <AlertCircle className="size-4 text-warning mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-warning">Inventory low</p>
                <p className="text-xs text-muted-foreground mt-0.5">Mutton Kacchi — check stock before accepting more orders.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent orders table */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent orders</h2>
            <Button variant="link" size="sm" asChild>
              <Link href="/dashboard/restaurant/orders">
                View all <ChevronRight className="size-3.5" />
              </Link>
            </Button>
          </div>
          <Card className="overflow-hidden p-0">
            <div className="divide-y divide-border">
              {/* Header row */}
              <div className="grid grid-cols-4 gap-3 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-muted/40">
                <span className="col-span-1">Order</span>
                <span className="col-span-1">Items</span>
                <span className="col-span-1">Status</span>
                <span className="col-span-1 text-right">Total</span>
              </div>
              {RECENT_ORDERS.map((order) => {
                const cfg = ORDER_STATUS_CONFIG[order.status];
                return (
                  <Link key={order.id} href="/dashboard/restaurant/orders"
                    className="grid grid-cols-4 gap-3 items-center px-4 py-3 text-sm hover:bg-muted/40 transition-colors">
                    <div>
                      <p className="font-medium text-xs">{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </p>
                    <Badge variant={cfg.variant} className="w-fit text-xs">{cfg.label}</Badge>
                    <p className="text-right font-semibold text-primary text-sm">৳{order.totalAmount}</p>
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "This week revenue", value: "৳28,460" },
          { label: "This month orders", value: "342"      },
          { label: "Returning customers", value: "68%"   },
          { label: "Avg. order value",   value: "৳380"   },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="font-display text-xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
