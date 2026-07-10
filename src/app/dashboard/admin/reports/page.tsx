import { FileBarChart, Download, TrendingUp, Users, Store, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const REPORT_TYPES = [
  {
    id: "revenue",
    title: "Revenue Report",
    description: "Platform-wide and per-restaurant revenue breakdown, GMV, commission earned.",
    icon: TrendingUp,
    lastGenerated: "Jul 7, 2026",
    format: "XLSX",
  },
  {
    id: "customers",
    title: "Customer Report",
    description: "New signups, active users, churn rate, retention analysis, lifetime value.",
    icon: Users,
    lastGenerated: "Jul 1, 2026",
    format: "CSV",
  },
  {
    id: "restaurants",
    title: "Restaurant Performance",
    description: "Restaurant ratings, order volumes, average prep times, top performers.",
    icon: Store,
    lastGenerated: "Jul 5, 2026",
    format: "XLSX",
  },
  {
    id: "orders",
    title: "Orders Report",
    description: "Order status breakdown, cancellation rates, delivery success metrics.",
    icon: ShoppingBag,
    lastGenerated: "Jul 7, 2026",
    format: "CSV",
  },
];

const QUICK_STATS = [
  { label: "Reports generated (30d)", value: "142" },
  { label: "Avg. report size",        value: "2.4 MB" },
  { label: "Most requested",          value: "Revenue" },
  { label: "Last export",             value: "Today 09:14" },
];

export default function AdminReportsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Generate and download platform reports
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {QUICK_STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="font-display text-xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Report types */}
      <div className="space-y-4">
        <h2 className="font-display text-lg font-semibold">Available Reports</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {REPORT_TYPES.map((report) => {
            const Icon = report.icon;
            return (
              <Card key={report.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">{report.format}</Badge>
                  </div>
                  <CardTitle className="text-base mt-2">{report.title}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between pt-0">
                  <p className="text-xs text-muted-foreground">
                    Last generated: {report.lastGenerated}
                  </p>
                  <Button size="sm" variant="outline">
                    <Download className="size-3.5" /> Download
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Custom date range */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileBarChart className="size-5 text-muted-foreground" />
            <CardTitle>Custom Report</CardTitle>
          </div>
          <CardDescription>
            Generate a custom report for a specific date range and entity type
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Report type</label>
              <select className="w-full rounded-xl border-2 border-input bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none">
                <option>Revenue</option>
                <option>Orders</option>
                <option>Customers</option>
                <option>Restaurants</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">From</label>
              <input type="date" defaultValue="2026-07-01"
                className="w-full rounded-xl border-2 border-input bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">To</label>
              <input type="date" defaultValue="2026-07-10"
                className="w-full rounded-xl border-2 border-input bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>
              <Download className="size-4" /> Generate & Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
