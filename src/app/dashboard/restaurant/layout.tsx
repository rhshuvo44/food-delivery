"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, UtensilsCrossed, Tag, Star,
  BarChart2, Store, Settings, LogOut, ChevronRight, Menu, X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const NAV_ITEMS = [
  { href: "/dashboard/restaurant",            label: "Dashboard",  icon: LayoutDashboard, exact: true },
  { href: "/dashboard/restaurant/orders",     label: "Orders",     icon: ShoppingBag,     badge: "3" },
  { href: "/dashboard/restaurant/foods",      label: "Foods",      icon: UtensilsCrossed },
  { href: "/dashboard/restaurant/categories", label: "Categories", icon: Tag },
  { href: "/dashboard/restaurant/coupons",    label: "Coupons",    icon: Tag },
  { href: "/dashboard/restaurant/reviews",    label: "Reviews",    icon: Star },
  { href: "/dashboard/restaurant/analytics",  label: "Analytics",  icon: BarChart2 },
  { href: "/dashboard/restaurant/profile",    label: "Profile",    icon: Store },
  { href: "/dashboard/restaurant/settings",   label: "Settings",   icon: Settings },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">F</span>
          <span className="font-display text-lg font-bold">Forkly</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-sidebar-foreground/60 hover:text-sidebar-foreground md:hidden">
            <X className="size-5" />
          </button>
        )}
      </div>

      {/* Restaurant identity */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent px-3 py-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 font-display text-sm font-bold text-primary">S</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Spice Garden</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="size-1.5 rounded-full bg-accent" />
              <span className="text-xs text-sidebar-foreground/60">Open</span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-sidebar-border" />

      <nav className="flex-1 space-y-0.5 px-3 py-4 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              )}>
              <Icon className="size-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge className="size-5 rounded-full p-0 text-[10px] justify-center">{item.badge}</Badge>
              )}
              {isActive && !item.badge && <ChevronRight className="size-3.5 opacity-50" />}
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-sidebar-border" />
      <div className="p-3">
        <Link href="/login"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="size-4" /> Log out
        </Link>
      </div>
    </aside>
  );
}

export default function RestaurantDashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden border-r border-sidebar-border md:flex">
        <Sidebar />
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative flex h-full"><Sidebar onClose={() => setMobileOpen(false)} /></div>
        </div>
      )}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex h-14 items-center gap-3 border-b border-border px-4 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
            <Menu className="size-5" />
          </Button>
          <span className="font-display font-semibold">Restaurant</span>
        </div>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
