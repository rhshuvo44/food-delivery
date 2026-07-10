import Link from "next/link";
import {
  Store, Users, ShoppingBag, DollarSign,
  TrendingUp, TrendingDown, ChevronRight, AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_ORDERS, ORDER_STATUS_CONFIG } from "@/constants/mockOrders";

const PLATFORM_STATS = [
  { label: "Total revenue",        value: "৳4,82,600", delta: "+18%", positive: true,  icon: DollarSign, href: "/dashboard/admin/reports" },
  { label: "Active restaurants",   value: "124",        delta: "+12",  positive: true,  icon: Store,      href: "/dashboard/admin/restaurants" },
  { label: "Registered customers", value: "8,420",      delta: "+340", positive: true,  icon: Users,      href: "/dashboard/admin/customers" },
  { label: "Total orders",         value: "23,180",     delta: "-2%",  positive: false, icon: ShoppingBag, href: "/dashboard/admin/orders" },
];

const RECENT_ORDERS = MOCK_ORDERS.slice(0, 5);

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Platform Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <Badge variant="default" className="shrink-0">Admin</Badge>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {PLATFORM_STATS.map((stat) => {
          const Icon = stat.icon;
          const Trend = stat.positive ? TrendingUp : TrendingDown;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="transition-all hover:-translate-y-0.5 hover:shadow-md">
                <CardContent className="pt-2">
                  <div className="flex items-start justify-between">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="size-4.5 text-primary" />
                    </div>
                    <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
                      stat.positive ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                    }`}>
                      <Trend className="size-3" />{stat.delta}
                    </span>
                  </div>
                  <p className="font-display mt-3 text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pending approvals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="size-4.5 text-warning" />
              Pending Approvals
            </h2>
            <Button variant="link" size="sm" asChild>
              <Link href="/dashboard/admin/restaurants">View all</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { name: "Dhaka Kitchen", cuisine: "Bengali · Desi", date: "Jul 6, 2026" },
              { name: "Noodle House", cuisine: "Chinese · Asian", date: "Jul 7, 2026" },
            ].map((r) => (
              <Card key={r.name} className="border-warning/20">
                <CardContent className="py-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">{r.name}</p>
                    <Badge variant="warning" className="text-xs">Pending</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.cuisine} · Applied {r.date}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 h-7 text-xs">Approve</Button>
                    <Button size="sm" variant="outline" className="flex-1 h-7 text-xs text-destructive hover:text-destructive">Reject</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* System health */}
          <Card>
            <CardHeader><CardTitle className="text-sm">System Health</CardTitle></CardHeader>
            <CardContent className="space-y-2.5">
              {[
                { label: "API response",    value: "98ms",  status: "good" },
                { label: "Uptime",          value: "99.9%", status: "good" },
                { label: "Failed orders",   value: "0.3%",  status: "warn" },
                { label: "Avg delivery",    value: "28 min",status: "good" },
              ].map((metric) => (
                <div key={metric.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{metric.label}</span>
                  <span className={`font-semibold ${metric.status === "good" ? "text-accent" : "text-warning"}`}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent orders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent Orders</h2>
            <Button variant="link" size="sm" asChild>
              <Link href="/dashboard/admin/orders">
                View all <ChevronRight className="size-3.5" />
              </Link>
            </Button>
          </div>
          <Card className="overflow-hidden p-0">
            <div className="grid grid-cols-5 gap-2 bg-muted/40 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <span className="col-span-2">Order / Restaurant</span>
              <span>Customer</span>
              <span>Status</span>
              <span className="text-right">Total</span>
            </div>
            {RECENT_ORDERS.map((order) => {
              const cfg = ORDER_STATUS_CONFIG[order.status];
              return (
                <div key={order.id} className="grid grid-cols-5 gap-2 items-center border-t border-border px-5 py-3 text-sm hover:bg-muted/20 transition-colors">
                  <div className="col-span-2">
                    <p className="font-medium text-xs">{order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground truncate">{order.restaurantName}</p>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">Rafiq A.</p>
                  <Badge variant={cfg.variant} className="w-fit text-[10px] px-1.5">{cfg.label}</Badge>
                  <p className="text-right font-semibold text-primary text-sm">৳{order.totalAmount}</p>
                </div>
              );
            })}
          </Card>

          {/* Top restaurants */}
          <Card>
            <CardHeader><CardTitle className="text-base">Top Restaurants This Month</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Spice Garden",  orders: 342, revenue: "৳95,000", rating: 4.6 },
                { name: "Burger Barn",   orders: 289, revenue: "৳72,500", rating: 4.3 },
                { name: "Sushi Theory",  orders: 198, revenue: "৳83,160", rating: 4.8 },
              ].map((r, i) => (
                <div key={r.name} className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.orders} orders · ★{r.rating}</p>
                  </div>
                  <p className="text-sm font-semibold text-primary shrink-0">{r.revenue}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
