import { useCallback, useEffect, useMemo, useRef } from "react";
import { useAnonUser } from "@/context/AnonUserContext";
import { useAuth } from "@/context/AuthContext";
import type { AnonUserState } from "@/lib/api";
import type { User } from "@/lib/auth";
import { computeUsage, type UsageSummary } from "@/lib/usage";

type RefreshUsageOptions = {
  force?: boolean;
};

type RefreshUsageResult = {
  anon: AnonUserState | null;
  user: User | null;
};

type UseUsageResult = {
  usage: UsageSummary;
  loading: boolean;
  anonError: string | null;
  anonUser: AnonUserState | null;
  user: User | null;
  refreshUsage: (options?: RefreshUsageOptions) => Promise<RefreshUsageResult>;
};

export function useUsage(): UseUsageResult {
  const {
    anonUser,
    loading: anonLoading,
    error: anonError,
    refreshAnonUser,
  } = useAnonUser();
  const { user, loading: authLoading, refreshUser } = useAuth();

  const usage = useMemo(
    () =>
      computeUsage({
        anon: anonUser,
        user,
      }),
    [anonUser, user],
  );

  const refreshUsage = useCallback(
    async (options?: RefreshUsageOptions): Promise<RefreshUsageResult> => {
      const anonPromise = refreshAnonUser(options);
      const userPromise = refreshUser();
      const [anon, refreshedUser] = await Promise.all([anonPromise, userPromise]);
      return { anon, user: refreshedUser };
    },
    [refreshAnonUser, refreshUser],
  );

  const logKeyRef = useRef<string | null>(null);
  useEffect(() => {
    let message: string | null = null;
    const remaining = Number.isFinite(usage.remainingSeconds) ? usage.remainingSeconds : "∞";
    if (usage.source === "user" || usage.source === "unlimited") {
      message = `[Usage] Using user quota (plan=${user?.tariffPlan ?? "unknown"}, remaining=${remaining} sec)`;
    } else if (usage.source === "anon") {
      message = `[Usage] Using anonymous quota (remaining=${remaining} sec)`;
    }
    if (!message) {
      return;
    }
    const key = `${usage.source}-${remaining}-${user?.tariffPlan ?? "unknown"}`;
    if (logKeyRef.current === key) {
      return;
    }
    logKeyRef.current = key;
    console.info(message);
  }, [usage.source, usage.remainingSeconds, user?.tariffPlan]);

  return {
    usage,
    loading: anonLoading || authLoading,
    anonError,
    anonUser,
    user,
    refreshUsage,
  };
}
