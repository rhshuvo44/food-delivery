"use client";

import { Toaster } from "sonner";
import { StoreProvider } from "./StoreProvider";
import { ThemeProvider } from "./ThemeProvider";

/**
 * Single entry point for all client-side providers — keeps `layout.tsx`
 * (a Server Component) clean, since providers that use Context/hooks
 * must be Client Components.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster richColors position="top-right" closeButton />
      </ThemeProvider>
    </StoreProvider>
  );
}
