"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Store, Users, ShoppingBag, UtensilsCrossed,
  Tag, Ticket, Image, FileBarChart, BarChart2, Settings,
  LogOut, ChevronRight, Menu, X, Shield,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard/admin",           label: "Dashboard",   icon: LayoutDashboard, exact: true },
      { href: "/dashboard/admin/analytics", label: "Analytics",   icon: BarChart2 },
      { href: "/dashboard/admin/reports",   label: "Reports",     icon: FileBarChart },
    ],
  },
  {
    label: "Management",
    items: [
      { href: "/dashboard/admin/restaurants", label: "Restaurants", icon: Store },
      { href: "/dashboard/admin/customers",   label: "Customers",   icon: Users },
      { href: "/dashboard/admin/orders",      label: "Orders",      icon: ShoppingBag },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/dashboard/admin/foods",       label: "Foods",       icon: UtensilsCrossed },
      { href: "/dashboard/admin/categories",  label: "Categories",  icon: Tag },
      { href: "/dashboard/admin/coupons",     label: "Coupons",     icon: Ticket },
      { href: "/dashboard/admin/banners",     label: "Banners",     icon: Image },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="flex h-16 items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">F</span>
          <div>
            <span className="font-display text-base font-bold tracking-tight">Forkly</span>
            <span className="ml-1.5 rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-semibold text-primary">ADMIN</span>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-sidebar-foreground/60 hover:text-sidebar-foreground md:hidden">
            <X className="size-5" />
          </button>
        )}
      </div>

      {/* Admin badge */}
      <div className="mx-3 mb-3 flex items-center gap-2.5 rounded-xl bg-primary/10 px-3 py-2">
        <div className="flex size-7 items-center justify-center rounded-full bg-primary/20">
          <Shield className="size-3.5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-sidebar-foreground">Platform Admin</p>
          <p className="truncate text-[11px] text-sidebar-foreground/60">admin@forkly.com</p>
        </div>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                    )}>
                    <Icon className="size-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight className="size-3.5 opacity-50" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
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

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
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
          <span className="font-display font-semibold">Admin Panel</span>
        </div>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
