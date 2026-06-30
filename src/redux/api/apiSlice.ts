import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

/**
 * The single root API slice. Every module's API endpoints (auth, restaurant,
 * food, order, etc. — built out in Phase 7) inject into this via
 * `apiSlice.injectEndpoints()` rather than creating separate `createApi`
 * instances, so they all share one cache and one set of tag types.
 */
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    "User",
    "Restaurant",
    "Category",
    "Food",
    "Cart",
    "Order",
    "Coupon",
    "Review",
    "Banner",
  ],
  endpoints: () => ({}),
});
