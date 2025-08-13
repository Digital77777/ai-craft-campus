import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Crown, Zap } from "lucide-react";
import { useTier } from "@/state/tier";
import { Tier } from "@/state/tier";

interface TierFeatureCardProps {
  title: string;
  description: string;
  requiredTier: Tier;
  children?: React.ReactNode;
  onUpgrade?: () => void;
}

const TIER_ICONS = {
  Free: Zap,
  Creator: Crown,
  Career: Crown
};

const TIER_LEVELS = {
  Free: 0,
  Creator: 1,
  Career: 2
};

export default function TierFeatureCard({ 
  title, 
  description, 
  requiredTier, 
  children, 
  onUpgrade 
}: TierFeatureCardProps) {
  const [currentTier] = useTier();
  const hasAccess = TIER_LEVELS[currentTier] >= TIER_LEVELS[requiredTier];
  const TierIcon = TIER_ICONS[requiredTier];

  if (hasAccess) {
    return (
      <Card className={`tier-card-${currentTier.toLowerCase()}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TierIcon className="h-5 w-5" />
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden border-dashed opacity-75">
      <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/20" />
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-muted-foreground" />
          {title}
          <Badge variant="outline" className={`ml-auto ${
            requiredTier === "Creator" ? "badge-tier-creator" : "badge-tier-career"
          }`}>
            {requiredTier} Only
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-center py-4">
          <Button 
            variant="hero" 
            onClick={onUpgrade}
            className="w-full"
          >
            Upgrade to {requiredTier}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}