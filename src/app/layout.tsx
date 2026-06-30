import { Providers } from "@/providers";
import type { Metadata } from "next";
import "./globals.css";

/**
 * NOTE: Google Fonts (next/font/google) requires network access to
 * fonts.googleapis.com at build time, which is unavailable in this
 * environment. Using system font stack for now — Phase 2 (Design System)
 * will swap this for self-hosted distinctive fonts via next/font/local.
 */

export const metadata: Metadata = {
  title: "Food Delivery | Order food online",
  description:
    "Order food online from your favorite local restaurants — fast delivery, great prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
