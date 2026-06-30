import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/constants/config";

/**
 * Axios instance used for any imperative (non-RTK-Query) HTTP calls —
 * e.g. file uploads, one-off calls outside the Redux data layer.
 * RTK Query (Phase 7) will use its own `axiosBaseQuery` built on top of this.
 *
 * `withCredentials: true` is essential — our auth tokens live in httpOnly
 * cookies (see backend auth system), so every request must carry them.
 */
export const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/* ------------------------------------------------------------------ */
/* REQUEST INTERCEPTOR                                                 */
/* ------------------------------------------------------------------ */
axiosClient.interceptors.request.use(
  (config) => {
    // Cookies are sent automatically via withCredentials — nothing to
    // attach manually here. Reserved for future needs (e.g. request IDs,
    // locale headers, feature-flag headers).
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

/* ------------------------------------------------------------------ */
/* RESPONSE INTERCEPTOR + REFRESH-TOKEN RETRY LOGIC                    */
/* ------------------------------------------------------------------ */

let isRefreshing = false;
let pendingQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

function processQueue(error: unknown) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  pendingQueue = [];
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    // Don't attempt refresh-retry on the refresh endpoint itself
    // (would cause infinite loop) or if there's no config to retry.
    if (
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      if (isRefreshing) {
        // A refresh is already in-flight — queue this request until it resolves.
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => axiosClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosClient.post("/auth/refresh-token");
        processQueue(null);
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // Refresh failed — session is truly expired. Redirect to login.
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
