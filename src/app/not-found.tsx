import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-muted-foreground/15 text-[9rem] leading-none font-black select-none">
        404
      </p>
      <div className="-mt-4 space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground max-w-sm">
          Looks like this page took a wrong turn. It may have been moved, deleted, or
          never existed.
        </p>
      </div>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/restaurants">Browse restaurants</Link>
        </Button>
      </div>
    </div>
  );
}
