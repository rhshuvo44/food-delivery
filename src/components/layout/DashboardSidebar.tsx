"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  items: SidebarNavItem[];
  basePath: string;
  brandLabel?: string;
}

/**
 * Shared dashboard sidebar shell — used identically across Customer,
 * Restaurant, and Admin dashboards (Phase 4–6). Each dashboard only
 * supplies its own `items` array; the chrome, active-state logic, and
 * dark "sidebar" surface (distinct CSS variables from the main app
 * background) stays consistent so the three dashboards feel like one
 * coherent product family rather than three different apps.
 */
export function DashboardSidebar({
  items,
  basePath,
  brandLabel = "Forkly",
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="border-sidebar-border bg-sidebar text-sidebar-foreground hidden w-64 shrink-0 flex-col border-r md:flex">
      <div className="flex h-16 items-center gap-2 px-5">
        <span className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-full text-sm font-black">
          F
        </span>
        <span className="font-display text-lg font-bold tracking-tight">
          {brandLabel}
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => {
          const href = `${basePath}${item.href}`;
          const isActive =
            pathname === href || (item.href === "" && pathname === basePath);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
