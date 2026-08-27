import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { STORAGE_KEYS } from "@/lib/constants";
import { MOCK_ENABLED, mockRequest } from "@/lib/mockApi";
import type { ApiError } from "@/types/api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api",
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (MOCK_ENABLED) {
    const url = (config.url ?? "").replace(config.baseURL ?? "", "");
    const body =
      typeof config.data === "string" ? JSON.parse(config.data) : config.data;
    const data = await mockRequest((config.method ?? "get").toUpperCase(), url, body);
    const response = {
      data,
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    } as AxiosResponse;
    throw { __mock: true, response } as { __mock: true; response: AxiosResponse };
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError> & { __mock?: boolean; response?: AxiosResponse }) => {
    if (error.__mock && error.response) {
      return error.response;
    }
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.AUTH);
      if (!window.location.pathname.startsWith("/login")) {
        window.location.assign("/login");
      }
    }
    const message =
      error.response?.data?.message ?? error.message ?? "Request failed";
    return Promise.reject(new Error(message));
  },
);

export default api;
