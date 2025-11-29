import axios, { type InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.filety.online";

const ACCESS_TOKEN_KEY = "filety_access_token";
let accessToken: string | null = null;
let isHydrated = false;

const hydrateToken = () => {
  if (isHydrated || typeof window === "undefined") {
    return;
  }
  accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  isHydrated = true;
};

export const getAccessToken = () => {
  hydrateToken();
  return accessToken;
};

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (typeof window === "undefined") {
    return;
  }
  if (token) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};

export const clearAccessToken = () => {
  setAccessToken(null);
};

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
