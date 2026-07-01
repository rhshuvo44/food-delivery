"use client";

import Link from "next/link";
import { MapPin, Search, ShoppingBag, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleMobileNav } from "@/redux/slices/uiSlice";
import { selectCartCount } from "@/redux/slices/cartSlice";

/**
 * Public-site navbar — sticky, warm-cream surface with a hairline border
 * (not a hard drop shadow) so it reads as part of the page rather than
 * floating above it. Location pill is a deliberate food-delivery UX
 * convention (Foodpanda/Uber Eats/DoorDash all lead with "where are you
 * ordering to" before anything else).
 */
export function Navbar() {
  const dispatch = useAppDispatch();
  const isMobileNavOpen = useAppSelector((s) => s.ui.isMobileNavOpen);
  const cartCount = useAppSelector(selectCartCount);
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-border/70 bg-background/95 sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full text-base font-black">
            F
          </span>
          <span className="font-display hidden text-xl font-bold tracking-tight sm:inline">
            Forkly
          </span>
        </Link>

        {/* Location picker — desktop only */}
        <button className="border-border hover:border-primary hidden shrink-0 items-center gap-1.5 rounded-full border-2 px-3.5 py-2 text-sm font-medium transition-colors md:flex">
          <MapPin className="text-primary size-4" />
          <span className="max-w-35 truncate">Gulshan, Dhaka</span>
        </button>

        {/* Search — desktop only, grows to fill space */}
        <div className="relative hidden flex-1 md:block">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2" />
          <Input placeholder="Search restaurants or dishes..." className="h-11 pl-11" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Cart"
            className="relative"
            asChild
          >
            <Link href="/cart">
              <ShoppingBag className="size-5" />
              {cartCount > 0 && (
                <span className="bg-primary text-primary-foreground absolute top-1 right-1 flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </Button>

          {/* Account dropdown — desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/login">Log in</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register">Sign up</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            aria-expanded={isMobileNavOpen}
            onClick={() => dispatch(toggleMobileNav())}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
