import { LucideIcon, PackageOpen } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Reusable empty-state — used anywhere a list/collection has zero items:
 * empty cart, no orders yet, no search results, empty wishlist, etc.
 * Keep `title` specific to the context rather than a generic "No data".
 */
export function EmptyState({
  icon: Icon = PackageOpen,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "border-border bg-card/50 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-6 py-16 text-center",
        className,
      )}
    >
      <div className="bg-secondary flex size-14 items-center justify-center rounded-full">
        <Icon className="text-muted-foreground size-6" strokeWidth={1.75} />
      </div>
      <div className="space-y-1">
        <p className="font-display text-lg font-semibold">{title}</p>
        {description && (
          <p className="text-muted-foreground max-w-sm text-sm">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
