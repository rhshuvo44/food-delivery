"use client";
import { use } from "react";
import Link from "next/link";
import { ChevronLeft, MapPin, Clock, CheckCircle2, Circle, RefreshCw, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MOCK_ORDERS, ORDER_STATUS_CONFIG } from "@/constants/mockOrders";

const TRACKING_STEPS = [
  { status: "CONFIRMED",  label: "Order confirmed" },
  { status: "PREPARING",  label: "Restaurant preparing" },
  { status: "PICKED_UP",  label: "Rider picked up" },
  { status: "ON_THE_WAY", label: "Out for delivery" },
  { status: "DELIVERED",  label: "Delivered" },
];
const STATUS_ORDER = ["PENDING","CONFIRMED","PREPARING","READY_FOR_PICKUP","PICKED_UP","ON_THE_WAY","DELIVERED"];

export default function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const order = MOCK_ORDERS.find((o) => o.id === orderId);

  if (!order) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <p className="font-display text-xl font-bold">Order not found</p>
      <Button variant="outline" asChild>
        <Link href="/dashboard/customer/orders"><ChevronLeft className="size-4" /> Back to orders</Link>
      </Button>
    </div>
  );

  const cfg = ORDER_STATUS_CONFIG[order.status];
  const currentStatusIdx = STATUS_ORDER.indexOf(order.status);
  const isCancelled = order.status === "CANCELLED";
  const isDelivered  = order.status === "DELIVERED";

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6">
      <Link href="/dashboard/customer/orders" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronLeft className="size-4" /> All orders
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-xl font-bold">{order.orderNumber}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            <Clock className="inline size-3.5 mr-1" />
            {new Date(order.createdAt).toLocaleString("en-BD", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <Badge variant={cfg.variant} className="shrink-0">{cfg.label}</Badge>
      </div>

      {!isCancelled && (
        <Card>
          <CardHeader><CardTitle className="text-base">Order tracking</CardTitle></CardHeader>
          <CardContent>
            {TRACKING_STEPS.map((step, idx) => {
              const stepIdx = STATUS_ORDER.indexOf(step.status);
              const isDone   = currentStatusIdx >= stepIdx;
              const isActive = STATUS_ORDER[currentStatusIdx] === step.status;
              const isLast   = idx === TRACKING_STEPS.length - 1;
              return (
                <div key={step.status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {isDone ? <CheckCircle2 className={`size-5 shrink-0 ${isActive ? "text-primary" : "text-accent"}`} />
                            : <Circle className="size-5 shrink-0 text-border" />}
                    {!isLast && <div className={`w-0.5 flex-1 my-1 ${isDone ? "bg-accent" : "bg-border"}`} style={{ minHeight: 24 }} />}
                  </div>
                  <div className="pb-5">
                    <p className={`text-sm font-medium ${isDone ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                    {isActive && !isDelivered && (
                      <p className="text-xs text-primary mt-0.5 flex items-center gap-1">
                        <RefreshCw className="size-3 animate-spin" /> In progress
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="flex items-center gap-4 py-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted font-display text-xl font-bold text-muted-foreground/40">
            {order.restaurantName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{order.restaurantName}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="size-3.5" /> Gulshan, Dhaka</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Items ordered</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {item.name}
                <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">×{item.quantity}</span>
              </span>
              <span className="font-medium">৳{item.price}</span>
            </div>
          ))}
          <Separator />
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>৳{order.totalAmount - order.deliveryFee + order.discountAmount}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Delivery fee</span><span>৳{order.deliveryFee}</span></div>
            {order.discountAmount > 0 && <div className="flex justify-between text-accent"><span>Discount</span><span>−৳{order.discountAmount}</span></div>}
          </div>
          <Separator />
          <div className="flex justify-between font-display font-bold">
            <span>Total</span><span className="text-primary">৳{order.totalAmount}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row">
        {isDelivered  && <Button className="flex-1" variant="outline"><Star className="size-4" /> Rate this order</Button>}
        <Button className="flex-1" asChild><Link href="/restaurants">Reorder</Link></Button>
        {!isCancelled && !isDelivered && <Button variant="destructive" className="flex-1">Cancel order</Button>}
      </div>
    </div>
  );
}
