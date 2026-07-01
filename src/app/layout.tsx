import type { Metadata } from "next";
import { Providers } from "@/providers";
import { fraunces, archivo } from "@/lib/fonts";
// Ignore missing type declarations for CSS module side-effect import
// @ts-ignore
import "./globals.css";

export const metadata: Metadata = {
  title: "Food Order | Order food online",
  description:
    "Order food online from your favorite local restaurants — fast delivery, great prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
