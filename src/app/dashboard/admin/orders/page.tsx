"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table, TableHeader, TableBody, TableRow,
  TableHead, TableCell,
} from "@/components/ui/table";
import { MOCK_ORDERS, ORDER_STATUS_CONFIG } from "@/constants/mockOrders";
import { useDebounce } from "@/hooks/useDebounce";

const TABS = ["All", "Active", "Delivered", "Cancelled"];

export default function AdminOrdersPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");
  const debounced = useDebounce(query, 300);

  const filtered = MOCK_ORDERS.filter((o) => {
    const matchQuery = !debounced || o.orderNumber.toLowerCase().includes(debounced.toLowerCase()) || o.restaurantName.toLowerCase().includes(debounced.toLowerCase());
    const matchTab =
      tab === "All" ? true :
      tab === "Active" ? ["PENDING","CONFIRMED","PREPARING","READY_FOR_PICKUP","PICKED_UP","ON_THE_WAY"].includes(o.status) :
      tab === "Delivered" ? o.status === "DELIVERED" :
      tab === "Cancelled" ? o.status === "CANCELLED" : true;
    return matchQuery && matchTab;
  });

  const totalRevenue = MOCK_ORDERS.filter((o) => o.status === "DELIVERED").reduce((s, o) => s + o.totalAmount, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Orders</h1>
        <p className="mt-1 text-sm text-muted-foreground">Platform-wide order management</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total orders",    value: MOCK_ORDERS.length },
          { label: "Active now",      value: MOCK_ORDERS.filter((o) => ["PREPARING","ON_THE_WAY"].includes(o.status)).length },
          { label: "Delivered today", value: MOCK_ORDERS.filter((o) => o.status === "DELIVERED").length },
          { label: "Revenue (shown)", value: `৳${totalRevenue.toLocaleString()}` },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search orders…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-1 rounded-xl bg-secondary p-1">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => {
              const cfg = ORDER_STATUS_CONFIG[order.status];
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs font-medium">{order.orderNumber}</TableCell>
                  <TableCell className="text-sm">{order.restaurantName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">Customer #{order.id.slice(-2)}</TableCell>
                  <TableCell>
                    <Badge variant={cfg.variant} className="text-xs">{cfg.label}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short" })}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">৳{order.totalAmount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">No orders match your filters.</div>
        )}
      </Card>
    </div>
  );
}
