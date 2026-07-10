"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Heart, MapPin, User, Settings, LogOut, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const NAV_ITEMS = [
  { href: "/dashboard/customer",           label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/customer/orders",    label: "My Orders", icon: ShoppingBag },
  { href: "/dashboard/customer/wishlist",  label: "Wishlist",  icon: Heart },
  { href: "/dashboard/customer/addresses", label: "Addresses", icon: MapPin },
  { href: "/dashboard/customer/profile",   label: "Profile",   icon: User },
  { href: "/dashboard/customer/settings",  label: "Settings",  icon: Settings },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">F</span>
          <span className="font-display text-lg font-bold tracking-tight">Forkly</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-sidebar-foreground/60 hover:text-sidebar-foreground md:hidden">
            <X className="size-5" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-3 px-5 py-4">
        <Avatar>
          <AvatarFallback className="bg-primary/20 text-primary font-semibold">RA</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-sidebar-foreground">Rafiq Ahmed</p>
          <p className="truncate text-xs text-sidebar-foreground/60">customer@forkly.com</p>
        </div>
      </div>
      <Separator className="bg-sidebar-border" />
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} onClick={onClose}
              className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-sidebar-accent text-sidebar-accent-foreground"
                         : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground")}>
              <Icon className="size-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="size-3.5 opacity-50" />}
            </Link>
          );
        })}
      </nav>
      <Separator className="bg-sidebar-border" />
      <div className="p-3">
        <Link href="/login" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="size-4" /> Log out
        </Link>
      </div>
    </aside>
  );
}

export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
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
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <span className="font-display font-semibold">My Account</span>
        </div>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
