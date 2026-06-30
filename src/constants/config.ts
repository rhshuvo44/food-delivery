export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api/v1";

export const APP_NAME = "FoodPanda Clone";

export const STORAGE_KEYS = {
  // We rely on httpOnly cookies for tokens (set by the backend), so nothing
  // sensitive is stored client-side. This is only for non-sensitive UI state.
  THEME: "fp-theme",
  CART_GUEST: "fp-guest-cart",
} as const;
