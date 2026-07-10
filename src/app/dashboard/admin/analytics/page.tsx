"use client";

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const PLATFORM_REVENUE = [
  { month: "Jan", revenue: 320000, orders: 1820 },
  { month: "Feb", revenue: 385000, orders: 2140 },
  { month: "Mar", revenue: 412000, orders: 2390 },
  { month: "Apr", revenue: 368000, orders: 2050 },
  { month: "May", revenue: 495000, orders: 2810 },
  { month: "Jun", revenue: 548000, orders: 3120 },
];

const CATEGORY_DIST = [
  { name: "Biryani",  value: 34, color: "oklch(0.58 0.19 35)" },
  { name: "Burgers",  value: 22, color: "oklch(0.78 0.15 80)" },
  { name: "Pizza",    value: 18, color: "oklch(0.55 0.13 152)" },
  { name: "Sushi",    value: 12, color: "oklch(0.55 0.16 260)" },
  { name: "Other",    value: 14, color: "oklch(0.68 0.02 50)" },
];

const HOURLY_ORDERS = [
  { hour: "8am",  orders: 42  },
  { hour: "10am", orders: 118 },
  { hour: "12pm", orders: 294 },
  { hour: "2pm",  orders: 187 },
  { hour: "4pm",  orders: 95  },
  { hour: "6pm",  orders: 312 },
  { hour: "8pm",  orders: 278 },
  { hour: "10pm", orders: 143 },
];

const TOP_CITIES = [
  { city: "Gulshan",    orders: 4820, revenue: "৳18,24,000" },
  { city: "Banani",     orders: 3910, revenue: "৳14,85,800" },
  { city: "Dhanmondi",  orders: 3280, revenue: "৳12,46,400" },
  { city: "Uttara",     orders: 2540, revenue: "৳9,65,200"  },
  { city: "Mirpur",     orders: 1920, revenue: "৳7,29,600"  },
];

const SUMMARY = [
  { label: "Platform GMV (6m)",    value: "৳25,28,000" },
  { label: "Avg. basket size",     value: "৳312"        },
  { label: "Order success rate",   value: "96.8%"       },
  { label: "New restaurants (6m)", value: "38"          },
  { label: "Rider utilisation",    value: "74%"         },
  { label: "Avg. delivery time",   value: "28 min"      },
];

const tooltipStyle = { borderRadius: "12px", border: "1px solid var(--color-border)", background: "var(--color-card)" };

export default function AdminAnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Platform-wide performance metrics</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {SUMMARY.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3.5">
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue trend */}
      <Tabs defaultValue="revenue">
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle>Platform Revenue & Orders</CardTitle>
            <TabsList className="h-8">
              <TabsTrigger value="revenue" className="text-xs h-7 px-3">Revenue</TabsTrigger>
              <TabsTrigger value="orders" className="text-xs h-7 px-3">Orders</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="revenue" className="mt-0">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={PLATFORM_REVENUE} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="oklch(0.58 0.19 35)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="oklch(0.58 0.19 35)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(v: any) => [`৳${Number(v).toLocaleString()}`, "Revenue"]}
                    contentStyle={tooltipStyle}
                  />
                  <Area
                    type="monotone" dataKey="revenue" stroke="oklch(0.58 0.19 35)"
                    strokeWidth={2.5} fill="url(#revenueGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="orders" className="mt-0">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={PLATFORM_REVENUE} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(v: any) => [Number(v).toLocaleString(), "Orders"]}
                    contentStyle={tooltipStyle}
                  />
                  <Bar dataKey="orders" fill="oklch(0.55 0.13 152)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      {/* Two-column: pie + hourly */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Orders by Category</CardTitle></CardHeader>
          <CardContent className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={CATEGORY_DIST} cx="50%" cy="50%" innerRadius={45} outerRadius={72}
                  dataKey="value" strokeWidth={0}>
                  {CATEGORY_DIST.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {CATEGORY_DIST.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2 text-sm">
                  <span className="size-2.5 rounded-full shrink-0" style={{ background: cat.color }} />
                  <span className="text-muted-foreground">{cat.name}</span>
                  <span className="ml-auto font-semibold">{cat.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Orders by Hour (Today)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={HOURLY_ORDERS} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(v: any) => [v, "Orders"]}
                  contentStyle={tooltipStyle}
                />
                <Bar dataKey="orders" fill="oklch(0.58 0.19 35)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top cities */}
      <Card>
        <CardHeader><CardTitle>Top Areas by Orders</CardTitle></CardHeader>
        <CardContent className="space-y-0 p-0">
          <div className="grid grid-cols-3 gap-3 bg-muted/40 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span className="col-span-1">Area</span>
            <span className="text-right">Orders</span>
            <span className="text-right">Revenue</span>
          </div>
          {TOP_CITIES.map((city, i) => (
            <div key={city.city} className="grid grid-cols-3 gap-3 items-center border-t border-border px-6 py-3 text-sm hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <span className="font-medium">{city.city}</span>
              </div>
              <p className="text-right text-muted-foreground">{city.orders.toLocaleString()}</p>
              <p className="text-right font-semibold text-primary">{city.revenue}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
