// frontend/src/lib/api.ts
import { API_BASE_URL } from "@/lib/http";

type ApiErrorPayload = {
  detail?: string;
  message?: string;
  error?: string;
};

export type AnonUserState = {
  uuid: string;
  dailyUsedTime: number;
  dailyLimitTime: number;
  createdAt: string;
};

type AnonUserResponse = {
  uuid: string;
  created_at: string;
  daily_used_time: number;
  daily_limit_time: number;
};

const readErrorMessage = async (response: Response) => {
  try {
    const data: ApiErrorPayload | string = await response.json();
    if (typeof data === "string") {
      return data;
    }
    return data.detail ?? data.message ?? data.error ?? "Unknown API error";
  } catch {
    const fallback = await response.text();
    return fallback || `Request failed with status ${response.status}`;
  }
};

export async function authAnonymous(existingUuid?: string | null): Promise<AnonUserState> {
  const response = await fetch(`${API_BASE_URL}/auth/anonymous`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uuid: existingUuid ?? null }),
  });

  if (!response.ok) {
    const message = await readErrorMessage(response);
    throw new Error(message);
  }

  const data: AnonUserResponse = await response.json();
  return {
    uuid: data.uuid,
    createdAt: data.created_at,
    dailyUsedTime: data.daily_used_time,
    dailyLimitTime: data.daily_limit_time,
  };
}
