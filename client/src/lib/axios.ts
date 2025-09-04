import { serverRoutes } from "@/app/api/server.routes";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // обов'язково для cookie
});

// простий флаг, щоб уникати infinite loop
let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

const shouldSkipRefresh = (url?: string) => {
  if (!url) return false;
  // url може бути відносним типу "/_api/auth/refresh" або вже переписаним
  return url.includes(serverRoutes._AUTH_REFRESH) || url.includes(serverRoutes._AUTH_LOGOUT);
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error?.response?.status === 401 && !original._retry && !shouldSkipRefresh(original?.url)) {
      if (isRefreshing) {
        await new Promise<void>((resolve) => pendingRequests.push(resolve));
        original._retry = true;
        return api(original);
      }

      try {
        isRefreshing = true;
        original._retry = true;
        await api.post(serverRoutes._AUTH_REFRESH);
        pendingRequests.forEach((fn) => fn());
        pendingRequests = [];
        return api(original);
      } catch (e) {
        pendingRequests = [];
        // випалюємо сесію на клієнті (опц.)
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
