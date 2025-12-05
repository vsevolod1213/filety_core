import { useEffect, useState } from "react";
import { useAnonUser } from "@/context/AnonUserContext";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";

export type RecentTranscription = {
  id: number;
  createdAt: string;
  status: string;
  text: string;
};

type RecentTranscriptionResponse = {
  id: number;
  created_at: string;
  status: string;
  text: string;
};

export function useRecentTranscriptions(): {
  items: RecentTranscription[];
  loading: boolean;
  error: string | null;
} {
  const { user } = useAuth();
  const { anonUser } = useAnonUser();
  const [items, setItems] = useState<RecentTranscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = user?.id ?? null;
  const anonUuid = anonUser?.uuid ?? null;

  useEffect(() => {
    if (!userId && !anonUuid) {
      return;
    }

    const controller = new AbortController();

    const fetchRecent = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = new URL(`${API_BASE_URL}/transcriptions/recent`);
        const headers = new Headers();

        if (userId) {
          const token = getAccessToken();
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
        } else if (anonUuid) {
          url.searchParams.set("anon_uuid", anonUuid);
        } else {
          return;
        }

        const response = await fetch(url.toString(), {
          method: "GET",
          headers,
          credentials: "include",
          signal: controller.signal,
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Не удалось получить транскрипции");
        }

        const data: RecentTranscriptionResponse[] = await response.json();
        const mapped =
          Array.isArray(data) && data.length > 0
            ? data.map((item) => ({
                id: item.id,
                createdAt: item.created_at,
                status: item.status,
                text: item.text ?? "",
              }))
            : [];

        setItems(mapped);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
        const message = err instanceof Error ? err.message : "Не удалось получить транскрипции";
        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchRecent();

    return () => {
      controller.abort();
    };
  }, [userId, anonUuid]);

  return { items, loading, error };
}
