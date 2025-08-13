import { useState, useEffect } from "react";
import { useTier } from "@/state/tier";

interface UsageData {
  aiRequests: number;
  lastReset: string;
}

const USAGE_KEY = "aicampus_usage";
const LIMITS = {
  Free: { aiRequests: 20 },
  Creator: { aiRequests: Infinity },
  Career: { aiRequests: Infinity }
} as const;

export function useUsageTracking() {
  const [tier] = useTier();
  const [usage, setUsage] = useState<UsageData>(() => {
    const saved = localStorage.getItem(USAGE_KEY);
    const today = new Date().toDateString();
    
    if (saved) {
      const data = JSON.parse(saved);
      // Reset if it's a new day
      if (data.lastReset !== today) {
        return { aiRequests: 0, lastReset: today };
      }
      return data;
    }
    
    return { aiRequests: 0, lastReset: today };
  });

  const limits = LIMITS[tier];
  
  const saveUsage = (newUsage: UsageData) => {
    localStorage.setItem(USAGE_KEY, JSON.stringify(newUsage));
    setUsage(newUsage);
  };

  const incrementAiRequests = () => {
    const today = new Date().toDateString();
    const newUsage = {
      aiRequests: usage.lastReset === today ? usage.aiRequests + 1 : 1,
      lastReset: today
    };
    saveUsage(newUsage);
    return newUsage.aiRequests <= limits.aiRequests;
  };

  const canUseAi = usage.aiRequests < limits.aiRequests;
  const aiRequestsRemaining = Math.max(0, limits.aiRequests - usage.aiRequests);

  return {
    usage,
    limits,
    canUseAi,
    aiRequestsRemaining,
    incrementAiRequests
  };
}