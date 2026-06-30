import { useEffect, useState } from "react";

/**
 * Debounces a fast-changing value — useful for search inputs that
 * shouldn't fire an API call on every keystroke (used heavily in the
 * Search and Restaurants pages built in Phase 3).
 */
export function useDebounce<T>(value: T, delayMs = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
