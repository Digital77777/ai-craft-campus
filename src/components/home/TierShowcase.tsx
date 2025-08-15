import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TierSwitcher from "@/components/TierSwitcher";
import { useTier } from "@/state/tier";
import { Rocket, Crown, Users, Briefcase, Award, Code, BookOpen, TrendingUp } from "lucide-react";

const tierShowcase = [
  {
    tier: "Free",
    title: "Start Your AI Journey",
    subtitle: "Perfect for beginners exploring AI",
    features: [
      { icon: BookOpen, text: "Beginner-friendly learning paths" },
      { icon: Users, text: "Active community support" },
      { icon: Code, text: "20 AI requests daily" },
    ],
    cta: "Begin Learning",
    gradient: "from-slate-500/20 to-slate-600/20",
    accent: "text-slate-600",
    bgClass: "tier-card-free"
  },
  {
    tier: "Creator",
    title: "Build Without Limits",
    subtitle: "For ambitious builders and creators",
    features: [
      { icon: Rocket, text: "Unlimited AI tools & models" },
      { icon: Code, text: "1-click project templates" },
      { icon: Briefcase, text: "Marketplace access" },
    ],
    cta: "Unlock Creator",
    gradient: "from-blue-500/20 to-cyan-500/20",
    accent: "text-blue-600",
    bgClass: "tier-card-creator",
    popular: true
  },
  {
    tier: "Career",
    title: "Launch Your AI Career",
    subtitle: "Professional development & opportunities",
    features: [
      { icon: Award, text: "Verified certificates & badges" },
      { icon: Users, text: "1:1 mentorship sessions" },
      { icon: TrendingUp, text: "Job matching & premium gigs" },
    ],
    cta: "Advance Career",
    gradient: "from-purple-500/20 to-pink-500/20",
    accent: "text-purple-600",
    bgClass: "tier-card-career"
  }
];

export default function TierShowcase() {
  const [tier] = useTier();

  return (
    <section id="tiers" className="mt-20">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight">Choose Your Path</h2>
        <p className="mt-4 text-xl text-muted-foreground">Every tier unlocks new possibilities</p>
        <div className="mt-6 flex justify-center">
          <TierSwitcher />
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {tierShowcase.map((tierInfo, i) => (
          <Card 
            key={i} 
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${tierInfo.bgClass} ${
              tierInfo.popular ? 'ring-2 ring-primary scale-105' : ''
            }`}
          >
            {tierInfo.popular && (
              <div className="absolute -right-12 top-6 rotate-45 bg-primary px-12 py-1 text-xs font-semibold text-primary-foreground">
                POPULAR
              </div>
            )}
            <div className={`absolute inset-0 bg-gradient-to-br ${tierInfo.gradient} opacity-50`} />
            <CardHeader className="relative">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={tierInfo.accent}>{tierInfo.tier}</Badge>
                {tier === tierInfo.tier && <Badge variant="secondary">Current</Badge>}
              </div>
              <CardTitle className="text-2xl">{tierInfo.title}</CardTitle>
              <p className="text-muted-foreground">{tierInfo.subtitle}</p>
            </CardHeader>
            <CardContent className="relative space-y-4">
              {tierInfo.features.map((feature, j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className={`rounded-lg bg-primary/10 p-2`}>
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
              <Button 
                className="w-full mt-6" 
                variant={tierInfo.popular ? "hero" : "secondary"}
                onClick={() => {
                  const event = new CustomEvent('setTier', { detail: tierInfo.tier });
                  window.dispatchEvent(event);
                }}
              >
                {tierInfo.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}