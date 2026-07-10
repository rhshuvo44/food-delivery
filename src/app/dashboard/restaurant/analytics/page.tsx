"use client";

import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const REVENUE_DATA = [
  { day: "Mon", revenue: 3200, orders: 14 },
  { day: "Tue", revenue: 4100, orders: 18 },
  { day: "Wed", revenue: 3800, orders: 16 },
  { day: "Thu", revenue: 5200, orders: 22 },
  { day: "Fri", revenue: 6800, orders: 29 },
  { day: "Sat", revenue: 7400, orders: 34 },
  { day: "Sun", revenue: 5900, orders: 26 },
];

const MONTHLY_DATA = [
  { month: "Jan", revenue: 68000 },
  { month: "Feb", revenue: 72000 },
  { month: "Mar", revenue: 81000 },
  { month: "Apr", revenue: 74000 },
  { month: "May", revenue: 89000 },
  { month: "Jun", revenue: 95000 },
];

const TOP_FOODS = [
  { name: "Chicken Biryani", orders: 234, revenue: 58500 },
  { name: "Mutton Kacchi",   orders: 189, revenue: 79380 },
  { name: "Paneer Masala",   orders: 142, revenue: 45440 },
  { name: "Naan",            orders: 381, revenue: 11430 },
];

const SUMMARY = [
  { label: "This week revenue",   value: "৳36,400" },
  { label: "This month revenue",  value: "৳95,000" },
  { label: "Orders this month",   value: "342"      },
  { label: "Avg. order value",    value: "৳278"     },
  { label: "Customer retention",  value: "68%"      },
  { label: "Menu conversion rate",value: "34%"      },
];

const CHART_COLORS = {
  primary: "oklch(0.58 0.19 35)",
  accent:  "oklch(0.55 0.13 152)",
};

export default function RestaurantAnalyticsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <h1 className="font-display text-2xl font-bold tracking-tight">Analytics</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {SUMMARY.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3.5">
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue / Orders chart */}
      <Tabs defaultValue="weekly">
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle>Revenue & Orders</CardTitle>
            <TabsList className="h-8">
              <TabsTrigger value="weekly" className="text-xs h-7 px-3">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs h-7 px-3">Monthly</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="weekly" className="mt-0">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11 }} tickFormatter={(v) => `৳${(v/1000).toFixed(0)}k`} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                  <Tooltip
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any, name: any) =>
                      name === "revenue"
                        ? [`৳${Number(value).toLocaleString()}`, "Revenue"]
                        : [value, "Orders"]}
                    contentStyle={{ borderRadius: "12px", border: "1px solid var(--color-border)", background: "var(--color-card)" }}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke={CHART_COLORS.primary} strokeWidth={2.5} dot={false} name="revenue" />
                  <Line yAxisId="right" type="monotone" dataKey="orders" stroke={CHART_COLORS.accent}  strokeWidth={2} dot={false} name="orders" strokeDasharray="4 2" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="monthly" className="mt-0">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={MONTHLY_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `৳${(v/1000).toFixed(0)}k`} />
                  <Tooltip
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(v: any) => [`৳${Number(v).toLocaleString()}`, "Revenue"]}
                    contentStyle={{ borderRadius: "12px", border: "1px solid var(--color-border)", background: "var(--color-card)" }}
                  />
                  <Bar dataKey="revenue" fill={CHART_COLORS.primary} radius={[6, 6, 0, 0]} name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      {/* Top performing foods */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Foods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0 p-0">
          <div className="grid grid-cols-4 gap-3 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-muted/40">
            <span className="col-span-2">Food item</span>
            <span className="text-right">Orders</span>
            <span className="text-right">Revenue</span>
          </div>
          {TOP_FOODS.map((food, idx) => (
            <div key={food.name} className="grid grid-cols-4 gap-3 items-center px-6 py-3.5 border-t border-border text-sm hover:bg-muted/20 transition-colors">
              <div className="col-span-2 flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-muted-foreground">
                  {idx + 1}
                </span>
                <span className="font-medium truncate">{food.name}</span>
              </div>
              <span className="text-right text-muted-foreground">{food.orders}</span>
              <span className="text-right font-semibold text-primary">৳{food.revenue.toLocaleString()}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
