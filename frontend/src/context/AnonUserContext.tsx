// frontend/src/context/AnonUserContext.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { authAnonymous, type AnonUserState } from "@/lib/api";

const STORAGE_KEY = "filety_uuid";

type RefreshOptions = {
  force?: boolean;
};

type AnonUserContextValue = {
  anonUser: AnonUserState | null;
  loading: boolean;
  error: string | null;
  remainingSeconds: number | null;
  refreshAnonUser: (options?: RefreshOptions) => Promise<AnonUserState | null>;
};

const AnonUserContext = createContext<AnonUserContextValue | null>(null);

export function useAnonUser() {
  const ctx = useContext(AnonUserContext);
  if (!ctx) {
    throw new Error("useAnonUser must be used within AnonUserProvider");
  }
  return ctx;
}

export function AnonUserProvider({ children }: { children: ReactNode }) {
  const [anonUser, setAnonUser] = useState<AnonUserState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inflightRef = useRef<Promise<AnonUserState | null> | null>(null);

  const fetchAnonUser = useCallback(async () => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedUuid = window.localStorage.getItem(STORAGE_KEY);
    const user = await authAnonymous(storedUuid);
    window.localStorage.setItem(STORAGE_KEY, user.uuid);
    setAnonUser(user);
    setError(null);
    return user;
  }, []);

  const refreshAnonUser = useCallback(
    async (options?: RefreshOptions) => {
      if (!options?.force && anonUser) {
        return anonUser;
      }

      if (inflightRef.current) {
        return inflightRef.current;
      }

      setLoading(true);
      const request = fetchAnonUser()
        .catch((err) => {
          const message =
            err instanceof Error ? err.message : "Не удалось получить данные анонимного пользователя";
          setError(message);
          console.error("[AnonUser] Failed to fetch anonymous user state", err);
          throw err instanceof Error ? err : new Error(message);
        })
        .finally(() => {
          inflightRef.current = null;
          setLoading(false);
        });

      inflightRef.current = request;
      return request;
    },
    [anonUser, fetchAnonUser],
  );

  useEffect(() => {
    if (anonUser || typeof window === "undefined") {
      return;
    }
    const timeout = window.setTimeout(() => {
      void refreshAnonUser({ force: true }).catch(() => {
        // error already handled inside refreshAnonUser
      });
    }, 0);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [anonUser, refreshAnonUser]);

  const remainingSeconds = useMemo(() => {
    if (!anonUser) return null;
    return Math.max(anonUser.dailyLimitTime - anonUser.dailyUsedTime, 0);
  }, [anonUser]);

  const value = useMemo(
    () => ({
      anonUser,
      loading,
      error,
      remainingSeconds,
      refreshAnonUser,
    }),
    [anonUser, loading, error, remainingSeconds, refreshAnonUser],
  );

  return <AnonUserContext.Provider value={value}>{children}</AnonUserContext.Provider>;
}
