export type Tier = "Free" | "Creator" | "Career";

const KEY = "aicampus_tier";
const EVENT = "tier-change";

type TierListener = (tier: Tier) => void;

export function getTier(): Tier {
  const saved = (typeof window !== "undefined" && localStorage.getItem(KEY)) as Tier | null;
  return saved || "Free";
}

export function setTier(tier: Tier) {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, tier);
    window.dispatchEvent(new CustomEvent<Tier>(EVENT, { detail: tier } as any));
  }
}

import * as React from "react";
export function useTier(): [Tier, (t: Tier) => void] {
  const [tier, set] = React.useState<Tier>(getTier());
  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) set(getTier());
    };
    const onCustom: EventListener = ((e: CustomEvent<Tier>) => set(e.detail)) as unknown as EventListener;
    window.addEventListener("storage", onStorage);
    window.addEventListener(EVENT, onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVENT, onCustom);
    };
  }, []);
  const update = (t: Tier) => {
    setTier(t);
    set(t);
  };
  return [tier, update];
}
