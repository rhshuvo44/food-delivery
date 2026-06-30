import { axiosClient } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";

/**
 * `services/` holds thin wrappers around axiosClient for cases outside the
 * RTK Query data-fetching layer — e.g. one-off calls, file uploads, or
 * calls made from Server Actions / route handlers. Most data-fetching in
 * this app goes through RTK Query API slices (see redux/api), added in
 * Phase 7 once the backend integration begins in earnest.
 */
export const healthService = {
  async check(): Promise<ApiResponse<{ status: string }>> {
    const { data } = await axiosClient.get("/health");
    return data;
  },
};
