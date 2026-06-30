import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { axiosClient } from "@/lib/axios";

interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

interface AxiosBaseQueryError {
  status: number;
  data: unknown;
  message: string;
}

/**
 * Lets RTK Query endpoints use our shared Axios instance (so the refresh-token
 * interceptor, withCredentials, baseURL, etc. apply uniformly), instead of
 * RTK Query's built-in `fetchBaseQuery`.
 */
export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> =>
  async ({ url, method = "GET", data, params, headers }) => {
    try {
      const result = await axiosClient({ url, method, data, params, headers });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      const responseData = err.response?.data as { message?: string } | undefined;
      return {
        error: {
          status: err.response?.status ?? 500,
          data: err.response?.data,
          message: responseData?.message ?? err.message ?? "Something went wrong",
        },
      };
    }
  };
