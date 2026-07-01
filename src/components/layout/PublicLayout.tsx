import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/**
 * Shared shell for every customer-facing public page (Home, Restaurants,
 * Restaurant Details, Cart, Checkout, etc. — built out in Phase 3).
 * Keeps Navbar/Footer consistent without repeating them in every page file.
 */
export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
