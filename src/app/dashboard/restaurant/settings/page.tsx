"use client";

import { useState, useEffect } from "react";
import { Bell, Clock, Shield, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";

interface ToggleRowProps { label: string; description: string; checked: boolean; onChange: (v: boolean) => void; }
function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <button role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${checked ? "bg-primary" : "bg-input"}`}>
        <span className={`inline-block size-5 rounded-full bg-white shadow-lg transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

export default function RestaurantSettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [notifications, setNotifications] = useState({ newOrders: true, orderUpdates: true, reviews: true, lowStock: false });
  const [openingHours, setOpeningHours] = useState({ autoOpen: false, pauseOrders: false });

  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6">
      <h1 className="font-display text-2xl font-bold tracking-tight">Settings</h1>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose how the dashboard looks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {(["light","dark","system"] as const).map((t) => (
              <button key={t} onClick={() => setTheme(t)}
                className={`rounded-xl border-2 py-3 text-sm font-medium capitalize transition-colors ${
                  mounted && theme === t ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/40"
                }`}>
                {t}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><Bell className="size-4 text-muted-foreground" /><CardTitle>Notifications</CardTitle></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ToggleRow label="New order alerts" description="Get notified immediately when a new order arrives"
            checked={notifications.newOrders} onChange={(v) => { setNotifications((p) => ({ ...p, newOrders: v })); toast.success("Updated"); }} />
          <Separator />
          <ToggleRow label="Order status updates" description="Rider pickup, delivery confirmations"
            checked={notifications.orderUpdates} onChange={(v) => { setNotifications((p) => ({ ...p, orderUpdates: v })); toast.success("Updated"); }} />
          <Separator />
          <ToggleRow label="New reviews" description="Get notified when customers leave a review"
            checked={notifications.reviews} onChange={(v) => { setNotifications((p) => ({ ...p, reviews: v })); toast.success("Updated"); }} />
          <Separator />
          <ToggleRow label="Low inventory alerts" description="Alert when food items need restocking"
            checked={notifications.lowStock} onChange={(v) => { setNotifications((p) => ({ ...p, lowStock: v })); toast.success("Updated"); }} />
        </CardContent>
      </Card>

      {/* Hours */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><Clock className="size-4 text-muted-foreground" /><CardTitle>Operations</CardTitle></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ToggleRow label="Auto open/close" description="Automatically toggle restaurant status based on your set hours"
            checked={openingHours.autoOpen} onChange={(v) => { setOpeningHours((p) => ({ ...p, autoOpen: v })); toast.success("Updated"); }} />
          <Separator />
          <ToggleRow label="Pause new orders" description="Temporarily stop accepting orders without closing the restaurant"
            checked={openingHours.pauseOrders} onChange={(v) => { setOpeningHours((p) => ({ ...p, pauseOrders: v })); toast.success(v ? "New orders paused" : "Now accepting orders"); }} />
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <div className="flex items-center gap-2"><Shield className="size-4 text-destructive" /><CardTitle className="text-destructive">Danger zone</CardTitle></div>
        </CardHeader>
        <CardContent className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium">Close restaurant account</p>
            <p className="text-xs text-muted-foreground mt-0.5">Permanently remove your restaurant from the platform.</p>
          </div>
          <Button variant="destructive" size="sm" className="shrink-0" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="size-3.5" /> Close account
          </Button>
        </CardContent>
      </Card>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Close restaurant account?</DialogTitle>
            <DialogDescription>
              This will permanently remove Spice Garden from Forkly. All menu items, order history and reviews will be deleted. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { setDeleteOpen(false); toast.error("Account closure is disabled in demo mode."); }}>
              Yes, close account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
