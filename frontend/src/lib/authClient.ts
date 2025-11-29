import { isAxiosError, type AxiosRequestConfig } from "axios";
import { clearAccessToken, getAccessToken, http, setAccessToken } from "@/lib/http";

type TokenResponse = {
  access_token: string;
  token_type: string;
};

type ApiUser = {
  id: number;
  email: string;
  created_at: string;
  tariff_plan: number;
  daily_used_time: number;
};

export type User = {
  id: number;
  email: string;
  createdAt: string;
  tariffPlan: number;
  dailyUsedTime: number;
};

type RequestOptions = {
  retried?: boolean;
};

type ErrorPayload = {
  detail?: unknown;
  message?: string;
  error?: string;
};

export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const extractDetailMessage = (detail: unknown): string | null => {
  if (!detail) {
    return null;
  }
  if (typeof detail === "string") {
    return detail;
  }
  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0];
    if (typeof first === "string") {
      return first;
    }
    if (first && typeof first === "object" && "msg" in first) {
      const message = (first as { msg?: string }).msg;
      if (message) {
        return message;
      }
    }
  }
  if (typeof detail === "object" && detail) {
    const maybe = detail as { msg?: string };
    if (typeof maybe.msg === "string") {
      return maybe.msg;
    }
  }
  return null;
};

const extractErrorMessage = (payload: unknown): string => {
  if (!payload) {
    return "Неизвестная ошибка API";
  }
  if (typeof payload === "string") {
    return payload;
  }
  if (typeof payload === "object") {
    const { detail, message, error } = payload as ErrorPayload;
    const detailMessage = extractDetailMessage(detail);
    if (detailMessage) {
      return detailMessage;
    }
    if (message) {
      return message;
    }
    if (error) {
      return error;
    }
  }
  return "Произошла ошибка запроса";
};

const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;
    const message = extractErrorMessage(data ?? error.message);
    return new ApiError(message, status, data);
  }
  if (error instanceof Error) {
    return new ApiError(error.message);
  }
  return new ApiError("Неизвестная ошибка");
};

class AuthClient {
  private refreshPromise: Promise<string | null> | null = null;

  private mapUser(user: ApiUser): User {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.created_at,
      tariffPlan: user.tariff_plan,
      dailyUsedTime: user.daily_used_time,
    };
  }

  private handleUnauthorized() {
    clearAccessToken();
  }

  private async performRequest<T>(config: AxiosRequestConfig, options: RequestOptions = {}): Promise<T> {
    const requestConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...(config.headers ?? {}),
      },
    };

    try {
      const response = await http.request<T>(requestConfig);
      return response.data;
    } catch (error) {
      const axiosError = isAxiosError(error) ? error : null;
      const status = axiosError?.response?.status;

      if (status === 401) {
        if (options.retried) {
          this.handleUnauthorized();
          throw toApiError(error);
        }

        try {
          await this.refreshAccessToken();
        } catch {
          this.handleUnauthorized();
          throw toApiError(error);
        }

        return this.performRequest<T>({ ...requestConfig }, { ...options, retried: true });
      }

      throw toApiError(error);
    }
  }

  private async request<T>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.performRequest<T>(config, options);
  }

  private async refreshTokenInternal(): Promise<string> {
    if (this.refreshPromise) {
      const token = await this.refreshPromise;
      if (!token) {
        throw new ApiError("Не удалось обновить токен", 401);
      }
      return token;
    }

    this.refreshPromise = (async () => {
      const response = await http.post<TokenResponse>("/auth/refresh");
      const token = response.data.access_token;
      if (!token) {
        throw new ApiError("Ответ refresh не содержит токен", 500);
      }
      setAccessToken(token);
      return token;
    })()
      .then((token) => token)
      .catch((error) => {
        throw toApiError(error);
      })
      .finally(() => {
        this.refreshPromise = null;
      });

    const token = await this.refreshPromise;
    if (!token) {
      throw new ApiError("Не удалось обновить токен", 401);
    }
    return token;
  }

  async register(email: string, password: string): Promise<User> {
    const user = await this.request<ApiUser>({
      url: "/auth/register",
      method: "POST",
      data: { email, password },
    });
    return this.mapUser(user);
  }

  async login(email: string, password: string): Promise<void> {
    const tokens = await this.request<TokenResponse>({
      url: "/auth/login",
      method: "POST",
      data: { email, password },
    });
    setAccessToken(tokens.access_token);
  }

  async logout(): Promise<void> {
    try {
      await this.request({
        url: "/auth/logout",
        method: "POST",
      });
    } finally {
      this.handleUnauthorized();
    }
  }

  async logoutAll(): Promise<void> {
    try {
      await this.request({
        url: "/auth/logout_all",
        method: "POST",
      });
    } finally {
      this.handleUnauthorized();
    }
  }

  async refreshAccessToken(): Promise<string> {
    return this.refreshTokenInternal();
  }

  async getCurrentUser(): Promise<User> {
    const token = getAccessToken();
    if (!token) {
      throw new ApiError("Не авторизован", 401);
    }

    const user = await this.request<ApiUser>({
      url: "/auth/me",
      method: "GET",
    });
    return this.mapUser(user);
  }

  async requestWithAuth<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>(config);
  }
}

export const authClient = new AuthClient();
