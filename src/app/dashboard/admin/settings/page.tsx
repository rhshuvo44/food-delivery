"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Globe, Shield, CreditCard, Zap } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ToggleRowProps { label: string; description: string; checked: boolean; onChange: () => void; }
function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <button role="switch" aria-checked={checked} onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${checked ? "bg-primary" : "bg-input"}`}>
        <span className={`inline-block size-5 rounded-full bg-white shadow-lg transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [platform, setPlatform] = useState({ name: "Forkly", supportEmail: "support@forkly.com", commissionPct: "15", maxDeliveryKm: "10" });
  const [flags, setFlags] = useState({ maintenanceMode: false, newRegistrations: true, riderApp: true, pushNotifications: true });

  useEffect(() => { setMounted(true); }, []);

  function toggle(key: keyof typeof flags) {
    setFlags((p) => ({ ...p, [key]: !p[key] }));
    toast.success("Setting updated");
  }

  function handleSave() {
    toast.success("Platform settings saved");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Admin Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Platform-wide configuration and controls</p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Admin panel theme preference</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {(["light", "dark", "system"] as const).map((t) => (
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

      {/* Platform config */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><Globe className="size-4 text-muted-foreground" /><CardTitle>Platform Configuration</CardTitle></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Platform name</Label>
              <Input value={platform.name} onChange={(e) => setPlatform((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Support email</Label>
              <Input type="email" value={platform.supportEmail} onChange={(e) => setPlatform((p) => ({ ...p, supportEmail: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Platform commission (%)</Label>
              <Input type="number" value={platform.commissionPct} onChange={(e) => setPlatform((p) => ({ ...p, commissionPct: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Max delivery radius (km)</Label>
              <Input type="number" value={platform.maxDeliveryKm} onChange={(e) => setPlatform((p) => ({ ...p, maxDeliveryKm: e.target.value }))} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm" onClick={handleSave}>Save changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Feature flags */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><Zap className="size-4 text-muted-foreground" /><CardTitle>Feature Flags</CardTitle></div>
          <CardDescription>Toggle platform features on or off globally</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ToggleRow label="Maintenance mode" description="Takes the entire platform offline for all users (show maintenance page)"
            checked={flags.maintenanceMode} onChange={() => toggle("maintenanceMode")} />
          {flags.maintenanceMode && (
            <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-2.5">
              <p className="text-sm font-medium text-destructive">⚠ Maintenance mode is ON — platform is offline for customers</p>
            </div>
          )}
          <Separator />
          <ToggleRow label="New customer registrations" description="Allow new customers to sign up on the platform"
            checked={flags.newRegistrations} onChange={() => toggle("newRegistrations")} />
          <Separator />
          <ToggleRow label="Rider app access" description="Allow riders to log in and accept delivery assignments"
            checked={flags.riderApp} onChange={() => toggle("riderApp")} />
          <Separator />
          <ToggleRow label="Push notifications" description="Send order update push notifications to customers and riders"
            checked={flags.pushNotifications} onChange={() => toggle("pushNotifications")} />
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><Shield className="size-4 text-muted-foreground" /><CardTitle>Security</CardTitle></div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Two-factor authentication", status: "enabled",  variant: "success" as const },
            { label: "API rate limiting",          status: "active",   variant: "success" as const },
            { label: "HTTPS / TLS",                status: "enforced", variant: "success" as const },
            { label: "Last admin login",           status: "Today 08:32 · Dhaka, BD", variant: "outline" as const },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <Badge variant={item.variant} className="text-xs">{item.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payment gateway */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><CreditCard className="size-4 text-muted-foreground" /><CardTitle>Payment Gateways</CardTitle></div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "SSLCommerz",   connected: true  },
            { name: "bKash API",    connected: true  },
            { name: "Stripe",       connected: false },
          ].map((gw) => (
            <div key={gw.name} className="flex items-center justify-between">
              <p className="text-sm font-medium">{gw.name}</p>
              <div className="flex items-center gap-2">
                <Badge variant={gw.connected ? "success" : "secondary"} className="text-xs">
                  {gw.connected ? "Connected" : "Disconnected"}
                </Badge>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  {gw.connected ? "Configure" : "Connect"}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
