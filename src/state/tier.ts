export type Tier = "Free" | "Creator" | "Career";

const KEY = "aicampus_tier";

export function getTier(): Tier {
  const saved = (typeof window !== "undefined" && localStorage.getItem(KEY)) as Tier | null;
  return saved || "Free";
}

export function setTier(tier: Tier) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, tier);
}
