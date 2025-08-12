import { Button } from "@/components/ui/button";
import { useTier } from "@/state/tier";

const TIERS = ["Free", "Creator", "Career"] as const;

export default function TierSwitcher() {
  const [tier, setTier] = useTier();
  return (
    <div className="flex items-center gap-1 rounded-full border bg-background p-1">
      {TIERS.map((t) => (
        <Button
          key={t}
          size="pill"
          variant={tier === t ? "hero" : "outline"}
          className={tier === t ? undefined : t === "Free" ? "chip-outline-free" : t === "Creator" ? "chip-outline-creator" : "chip-outline-career"}
          onClick={() => setTier(t)}
          aria-pressed={tier === t}
        >
          {t}
        </Button>
      ))}
    </div>
  );
}
