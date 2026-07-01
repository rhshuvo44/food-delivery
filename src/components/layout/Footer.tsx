import Link from "next/link";
import { Globe, MessageCircle, Send } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  "For restaurants": [
    { label: "Partner with us", href: "/partner" },
    { label: "Restaurant dashboard", href: "/dashboard/restaurant" },
  ],
  Support: [
    { label: "Help center", href: "/help" },
    { label: "Contact us", href: "/contact" },
    { label: "Terms of service", href: "/terms" },
    { label: "Privacy policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-border bg-card border-t">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full text-base font-black">
                F
              </span>
              <span className="font-display text-xl font-bold tracking-tight">
                Forkly
              </span>
            </Link>
            <p className="text-muted-foreground mt-3 max-w-[200px] text-sm">
              Great food, delivered fast — from the kitchens you love.
            </p>
            <div className="mt-4 flex gap-3">
              {[Globe, MessageCircle, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground flex size-8 items-center justify-center rounded-full transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-sm font-semibold">{heading}</p>
              <ul className="mt-3 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border text-muted-foreground mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Forkly. All rights reserved.</p>
          <p>Built for demonstration purposes — not affiliated with foodpanda.</p>
        </div>
      </div>
    </footer>
  );
}
