"use client";

import { useState } from "react";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_ORDERS, ORDER_STATUS_CONFIG } from "@/constants/mockOrders";
import { toast } from "sonner";

const TABS = ["All","Pending","Preparing","Ready","Completed"];

export default function RestaurantOrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const filtered = orders.filter((o) => {
    if (activeTab === "All") return true;
    if (activeTab === "Pending")   return ["PENDING","CONFIRMED"].includes(o.status);
    if (activeTab === "Preparing") return o.status === "PREPARING";
    if (activeTab === "Ready")     return ["READY_FOR_PICKUP","PICKED_UP"].includes(o.status);
    if (activeTab === "Completed") return ["DELIVERED","CANCELLED"].includes(o.status);
    return true;
  });

  function updateStatus(id: string, status: string) {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: status as typeof o.status } : o));
    toast.success(`Order status updated to ${ORDER_STATUS_CONFIG[status]?.label}`);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold tracking-tight">Orders</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4" />
          <span>Auto-refreshes every 30s</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-secondary p-1 overflow-x-auto">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`shrink-0 flex-1 rounded-lg py-2 px-3 text-sm font-medium transition-colors ${
              activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.map((order) => {
          const cfg = ORDER_STATUS_CONFIG[order.status];
          const isPending   = ["PENDING","CONFIRMED"].includes(order.status);
          const isPreparing = order.status === "PREPARING";

          return (
            <Card key={order.id} className={isPending ? "border-primary/30 bg-primary/5" : ""}>
              <CardContent className="py-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{order.orderNumber}</p>
                      <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      {isPending && <span className="size-2 rounded-full bg-primary animate-pulse" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(order.createdAt).toLocaleString("en-BD", {
                        day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <p className="font-display text-lg font-bold text-primary shrink-0">৳{order.totalAmount}</p>
                </div>

                {/* Items */}
                <div className="rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                  {order.items.map((i, idx) => (
                    <span key={idx}>
                      {i.name} ×{i.quantity}
                      {idx < order.items.length - 1 ? <span className="mx-1.5 text-border">·</span> : ""}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                {isPending && (
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => updateStatus(order.id, "PREPARING")}>
                      <CheckCircle2 className="size-3.5" /> Accept & Start Preparing
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive"
                      onClick={() => updateStatus(order.id, "CANCELLED")}>
                      <XCircle className="size-3.5" /> Decline
                    </Button>
                  </div>
                )}
                {isPreparing && (
                  <Button size="sm" variant="outline" className="w-full"
                    onClick={() => updateStatus(order.id, "READY_FOR_PICKUP")}>
                    <CheckCircle2 className="size-3.5" /> Mark as Ready for Pickup
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-2 text-center">
            <CheckCircle2 className="size-10 text-accent" />
            <p className="font-display font-semibold">No orders here</p>
            <p className="text-sm text-muted-foreground">Orders in this category will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
