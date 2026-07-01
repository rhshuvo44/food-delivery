"use client";

import { AlertTriangle, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Reusable error-state — for failed data fetches (RTK Query error states,
 * Phase 7). Distinct from EmptyState: this implies something went WRONG,
 * not that there's simply nothing there yet.
 */
export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this right now. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center gap-3 rounded-2xl border px-6 py-16 text-center",
        className,
      )}
    >
      <div className="bg-destructive/10 flex size-14 items-center justify-center rounded-full">
        <AlertTriangle className="text-destructive size-6" strokeWidth={1.75} />
      </div>
      <div className="space-y-1">
        <p className="font-display text-lg font-semibold">{title}</p>
        <p className="text-muted-foreground max-w-sm text-sm">{description}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
          <RotateCw className="size-3.5" />
          Try again
        </Button>
      )}
    </div>
  );
}
