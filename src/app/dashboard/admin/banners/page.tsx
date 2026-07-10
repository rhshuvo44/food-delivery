"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ImageIcon, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  position: string;
  order: number;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  linkUrl?: string;
}

const INITIAL_BANNERS: Banner[] = [
  { id: "b1", title: "50% Off Your First Order", subtitle: "Use code WELCOME50", position: "HOME_TOP",     order: 1, isActive: true,  startDate: "2026-01-01", endDate: "2026-12-31", linkUrl: "/offers" },
  { id: "b2", title: "Free Delivery Weekend",     subtitle: "Every Saturday & Sunday", position: "HOME_MIDDLE",  order: 1, isActive: true,  startDate: "2026-07-01", endDate: "2026-07-31", linkUrl: "/restaurants" },
  { id: "b3", title: "New Restaurants Near You",  subtitle: "Discover fresh options",  position: "HOME_TOP",     order: 2, isActive: false, startDate: "2026-06-01", endDate: "2026-08-31" },
  { id: "b4", title: "Rate Your Last Order",      subtitle: "Help others decide",       position: "CHECKOUT_PAGE",order: 1, isActive: true,  startDate: "2026-01-01" },
];

const POSITION_LABELS: Record<string, string> = {
  HOME_TOP:      "Home — Top",
  HOME_MIDDLE:   "Home — Middle",
  RESTAURANT_PAGE: "Restaurant page",
  CHECKOUT_PAGE:   "Checkout page",
};

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);

  function toggleActive(id: string) {
    setBanners((prev) => prev.map((b) => b.id === id ? { ...b, isActive: !b.isActive } : b));
    const b = banners.find((b) => b.id === id);
    toast.success(`Banner ${b?.isActive ? "deactivated" : "activated"}`);
  }

  function handleDelete(id: string) {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    toast.success("Banner removed");
  }

  const grouped = Object.entries(POSITION_LABELS).map(([pos, label]) => ({
    position: pos, label, items: banners.filter((b) => b.position === pos),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Banners</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage promotional banners across the platform
          </p>
        </div>
        <Button size="sm">
          <Plus className="size-4" /> Add banner
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total banners",  value: banners.length },
          { label: "Active",         value: banners.filter((b) => b.isActive).length },
          { label: "Positions used", value: new Set(banners.map((b) => b.position)).size },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Grouped by position */}
      {grouped.map(({ position, label, items }) => (
        <div key={position} className="space-y-3">
          <h2 className="font-display text-base font-semibold flex items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              {label}
            </span>
          </h2>
          <div className="space-y-3">
            {items.map((banner) => {
              const isExpired = banner.endDate && new Date(banner.endDate) < new Date();
              return (
                <Card key={banner.id} className={!banner.isActive ? "opacity-60" : ""}>
                  <CardContent className="flex items-start gap-4 py-4">
                    {/* Placeholder for banner image */}
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-warning/20">
                      <ImageIcon className="size-6 text-primary/60" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display font-semibold text-sm">{banner.title}</p>
                          <p className="text-xs text-muted-foreground">{banner.subtitle}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <Badge variant={banner.isActive && !isExpired ? "success" : "secondary"} className="text-xs">
                            {isExpired ? "Expired" : banner.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">Order #{banner.order}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>
                          {new Date(banner.startDate).toLocaleDateString("en-BD", { day: "numeric", month: "short" })}
                          {banner.endDate && ` → ${new Date(banner.endDate).toLocaleDateString("en-BD", { day: "numeric", month: "short" })}`}
                        </span>
                        {banner.linkUrl && <span className="truncate">↗ {banner.linkUrl}</span>}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => toggleActive(banner.id)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={banner.isActive ? "Deactivate" : "Activate"}
                      >
                        {banner.isActive
                          ? <ToggleRight className="size-6 text-accent" />
                          : <ToggleLeft className="size-6" />}
                      </button>
                      <Button size="icon" variant="ghost" className="size-8">
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(banner.id)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
