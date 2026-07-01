import Link from "next/link";

export default function AuthGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-secondary/40 flex min-h-screen flex-col items-center justify-center px-4 py-12">
      {/* Brand header */}
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full text-lg font-black">
          F
        </span>
        <span className="font-display text-2xl font-bold tracking-tight">Forkly</span>
      </Link>

      {/* Auth card */}
      <div className="border-border bg-card w-full max-w-md rounded-2xl border p-8 shadow-sm">
        {children}
      </div>

      <p className="text-muted-foreground mt-6 text-center text-xs">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="hover:text-foreground underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="hover:text-foreground underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
