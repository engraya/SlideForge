import axios, { AxiosError } from "axios";

export const apiFetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://intellislide-ai-api.onrender.com",
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

apiFetcher.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => Promise.reject(error)
);

apiFetcher.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const message =
        (error.response.data as { message?: string })?.message ??
        `Request failed with status ${error.response.status}`;
      return Promise.reject(new Error(message));
    }
    if (error.request) {
      return Promise.reject(new Error("Network error — please check your connection"));
    }
    return Promise.reject(error);
  }
);
