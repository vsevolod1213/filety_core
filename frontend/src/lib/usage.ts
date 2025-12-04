import type { AnonUserState } from "@/lib/api";
import type { User } from "@/lib/auth";

type UsageInput = {
  anon: Pick<AnonUserState, "dailyLimitTime" | "dailyUsedTime"> | null;
  user: Pick<User, "dailyUsedTime" | "tariffPlan"> | null;
};

export type UsageSourceType = "anon" | "user" | "unlimited" | "unknown";

export type UsageSummary = {
  totalSeconds: number | null;
  usedSeconds: number;
  remainingSeconds: number;
  remainingMinutes: number;
  source: UsageSourceType;
};

const clampSeconds = (value: number | null | undefined): number => {
  if (!Number.isFinite(value ?? 0)) {
    return 0;
  }
  return Math.max(0, Math.floor(value ?? 0));
};

const TARIFF_LIMIT_SECONDS: Record<number, number | null> = {
  0: 12 * 60,
  1: 60 * 60,
  2: 6000,
  3: null,
};

export const getLimitByTariff = (tariffPlan: number | null | undefined): number | null => {
  if (tariffPlan == null) {
    return TARIFF_LIMIT_SECONDS[0];
  }
  const limit = TARIFF_LIMIT_SECONDS[tariffPlan];
  if (typeof limit === "number" || limit === null) {
    return limit;
  }
  return TARIFF_LIMIT_SECONDS[0];
};

export const computeUsage = ({ anon, user }: UsageInput): UsageSummary => {
  if (user) {
    const usedSeconds = clampSeconds(user.dailyUsedTime);
    const limitSeconds = getLimitByTariff(user.tariffPlan);
    if (limitSeconds === null) {
      return {
        totalSeconds: null,
        usedSeconds,
        remainingSeconds: Number.POSITIVE_INFINITY,
        remainingMinutes: Number.POSITIVE_INFINITY,
        source: "unlimited",
      };
    }
    const remainingSeconds = Math.max(limitSeconds - usedSeconds, 0);
    return {
      totalSeconds: limitSeconds,
      usedSeconds,
      remainingSeconds,
      remainingMinutes: Math.floor(remainingSeconds / 60),
      source: "user",
    };
  }

  if (anon) {
    const totalSeconds = clampSeconds(anon.dailyLimitTime);
    const usedSeconds = clampSeconds(anon.dailyUsedTime);
    const remainingSeconds = Math.max(totalSeconds - usedSeconds, 0);
    return {
      totalSeconds,
      usedSeconds,
      remainingSeconds,
      remainingMinutes: Math.floor(remainingSeconds / 60),
      source: "anon",
    };
  }

  return {
    totalSeconds: null,
    usedSeconds: 0,
    remainingSeconds: 0,
    remainingMinutes: 0,
    source: "unknown",
  };
};

export const isUsageDepleted = (usage: UsageSummary): boolean => {
  if (usage.source === "unlimited") {
    return false;
  }
  if (usage.totalSeconds === null) {
    return false;
  }
  return usage.remainingSeconds <= 0;
};
