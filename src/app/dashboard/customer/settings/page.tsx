"use client";

import { useState, useEffect } from "react";
import { Bell, Shield, Globe, Trash2, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
          checked ? "bg-primary" : "bg-input"
        }`}
      >
        <span
          className={`pointer-events-none inline-block size-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newRestaurants: true,
    sms: false,
  });

  const [privacy, setPrivacy] = useState({
    shareData: false,
    marketing: false,
  });

  function toggleNotification(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Notification preference updated");
  }

  function togglePrivacy(key: keyof typeof privacy) {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Privacy setting updated");
  }

  // Prevent theme-toggle hydration mismatch — next-themes resolves
  // theme only on the client, so we skip rendering the active state
  // until after mount.
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage notifications, appearance, and account preferences
        </p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Moon className="size-4 text-muted-foreground" />
            <CardTitle>Appearance</CardTitle>
          </div>
          <CardDescription>Choose how Forkly looks to you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {(["light", "dark", "system"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`rounded-xl border-2 py-3 text-sm font-medium capitalize transition-colors ${
                  mounted && theme === t
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-muted-foreground" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Control what you hear from us</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ToggleRow
            label="Order status updates"
            description="Get notified when your order is confirmed, preparing, or delivered"
            checked={notifications.orderUpdates}
            onChange={() => toggleNotification("orderUpdates")}
          />
          <Separator />
          <ToggleRow
            label="Promotions & offers"
            description="Receive discount codes and special deals"
            checked={notifications.promotions}
            onChange={() => toggleNotification("promotions")}
          />
          <Separator />
          <ToggleRow
            label="New restaurant alerts"
            description="Be first to know when a new restaurant goes live near you"
            checked={notifications.newRestaurants}
            onChange={() => toggleNotification("newRestaurants")}
          />
          <Separator />
          <ToggleRow
            label="SMS notifications"
            description="Receive text messages for critical order updates"
            checked={notifications.sms}
            onChange={() => toggleNotification("sms")}
          />
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-muted-foreground" />
            <CardTitle>Privacy</CardTitle>
          </div>
          <CardDescription>Control how your data is used</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ToggleRow
            label="Share usage data"
            description="Help us improve Forkly by sharing anonymous usage statistics"
            checked={privacy.shareData}
            onChange={() => togglePrivacy("shareData")}
          />
          <Separator />
          <ToggleRow
            label="Personalised marketing"
            description="Allow us to show ads and recommendations based on your order history"
            checked={privacy.marketing}
            onChange={() => togglePrivacy("marketing")}
          />
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-muted-foreground" />
            <CardTitle>Language & Region</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">English (Bangladesh)</p>
            <p className="text-xs text-muted-foreground">Currency: BDT (৳)</p>
          </div>
          <Button variant="outline" size="sm" disabled>
            Change
          </Button>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trash2 className="size-4 text-destructive" />
            <CardTitle className="text-destructive">Danger zone</CardTitle>
          </div>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Delete account</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Permanently delete your account and all associated data.
                This action cannot be undone.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="shrink-0"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
            <DialogDescription>
              This will permanently delete your account, order history, addresses, and
              all associated data. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setDeleteDialogOpen(false);
                toast.error("Account deletion is disabled in demo mode.");
              }}
            >
              Yes, delete my account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
