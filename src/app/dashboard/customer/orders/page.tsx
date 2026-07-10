"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { MOCK_ORDERS, ORDER_STATUS_CONFIG } from "@/constants/mockOrders";

const STATUS_TABS = ["All","Active","Delivered","Cancelled"];

export default function CustomerOrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const filtered = MOCK_ORDERS.filter((o) => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return ["PENDING","CONFIRMED","PREPARING","READY_FOR_PICKUP","PICKED_UP","ON_THE_WAY"].includes(o.status);
    if (activeTab === "Delivered") return o.status === "DELIVERED";
    if (activeTab === "Cancelled") return o.status === "CANCELLED";
    return true;
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <h1 className="font-display text-2xl font-bold tracking-tight">My Orders</h1>
      <div className="flex gap-1 rounded-xl bg-secondary p-1">
        {STATUS_TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
              activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            {tab}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <EmptyState icon={ShoppingBag} title="No orders here" description="Your orders in this category will appear here."
          action={<Button size="sm" asChild><Link href="/restaurants">Start ordering</Link></Button>} />
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const cfg = ORDER_STATUS_CONFIG[order.status];
            return (
              <Link key={order.id} href={`/dashboard/customer/orders/${order.id}`}>
                <Card className="transition-all hover:shadow-md">
                  <CardContent className="flex items-start gap-4 py-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <ShoppingBag className="size-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-display font-semibold">{order.restaurantName}</p>
                        <Badge variant={cfg.variant} className="shrink-0">{cfg.label}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {order.items.map((i) => `${i.name} ×${i.quantity}`).join(" · ")}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-sm text-primary">৳{order.totalAmount}</span>
                          <ChevronRight className="size-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
