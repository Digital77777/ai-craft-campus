import AppLayout from "@/layouts/AppLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useTier } from "@/state/tier";
import { toast } from "@/hooks/use-toast";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import TierFeatureCard from "@/components/TierFeatureCard";
import { Sparkles, Code, Brain, Zap, Crown, Award } from "lucide-react";

const basicTools = [
  {
    name: "AI Chat Assistant",
    description: "Basic conversational AI for learning and simple tasks",
    icon: Sparkles,
    tier: "Free" as const
  }
];

const creatorTools = [
  {
    name: "Code Generator",
    description: "Generate complete code snippets and functions",
    icon: Code,
    tier: "Creator" as const
  },
  {
    name: "Advanced Prompting",
    description: "Chain prompts, use templates, and advanced techniques",
    icon: Brain,
    tier: "Creator" as const
  },
  {
    name: "API Integration",
    description: "Connect to external APIs and services",
    icon: Zap,
    tier: "Creator" as const
  }
];

const careerTools = [
  {
    name: "Portfolio Generator",
    description: "AI-powered portfolio creation with industry templates",
    icon: Crown,
    tier: "Career" as const
  },
  {
    name: "Interview Prep AI",
    description: "Practice technical interviews with AI feedback",
    icon: Award,
    tier: "Career" as const
  }
];

export default function Tools() {
  const [tier, setTier] = useTier();
  const { usage, limits, canUseAi, aiRequestsRemaining, incrementAiRequests } = useUsageTracking();
  const [prompt, setPrompt] = useState("");

  const run = () => {
    if (!canUseAi) {
      toast({ 
        title: "Daily limit reached", 
        description: tier === "Free" ? "Upgrade to Creator for unlimited usage." : "Something went wrong." 
      });
      return;
    }
    
    const success = incrementAiRequests();
    if (success) {
      toast({ title: "Prompt sent", description: "This is a demo. Connect Supabase + OpenAI to enable responses." });
    }
  };

  const handleUpgrade = (targetTier: "Creator" | "Career") => {
    setTier(targetTier);
    toast({ title: `Upgraded to ${targetTier}!`, description: "You now have access to new features." });
  };

  return (
    <AppLayout>
      <SEO title="AI Tools – AI Campus" description="Try prompts and build with AI in a safe sandbox with live preview." />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">AI Tools</h1>
        <div className="mt-2 flex items-center gap-4">
          <p className="text-muted-foreground">
            Usage: {usage.aiRequests}/{limits.aiRequests === Infinity ? "∞" : limits.aiRequests} per day
          </p>
          <Badge variant="secondary" className={`badge-tier-${tier.toLowerCase()}`}>
            {tier} Tier
          </Badge>
        </div>
      </header>

      {/* Basic Chat Tool */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">AI Chat Assistant</h2>
        <Card className="tier-card-free">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Basic AI Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)} 
              placeholder="Ask anything or paste your prompt..." 
              rows={4} 
              disabled={!canUseAi}
            />
            <div className="mt-3 flex gap-2">
              <Button onClick={run} variant="hero" disabled={!canUseAi}>
                {canUseAi ? "Send" : "Limit Reached"}
              </Button>
              <Button variant="secondary" onClick={() => setPrompt("")}>Clear</Button>
              {tier === "Free" && (
                <p className="text-sm text-muted-foreground flex items-center ml-auto">
                  {aiRequestsRemaining} requests remaining
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Creator Tools */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Creator Tools</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {creatorTools.map((tool) => (
            <TierFeatureCard
              key={tool.name}
              title={tool.name}
              description={tool.description}
              requiredTier="Creator"
              onUpgrade={() => handleUpgrade("Creator")}
            >
              <div className="text-center py-4">
                <tool.icon className="h-12 w-12 mx-auto mb-2 text-primary" />
                <Button variant="secondary" className="w-full">
                  Use Tool
                </Button>
              </div>
            </TierFeatureCard>
          ))}
        </div>
      </section>

      {/* Career Tools */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Career Tools</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {careerTools.map((tool) => (
            <TierFeatureCard
              key={tool.name}
              title={tool.name}
              description={tool.description}
              requiredTier="Career"
              onUpgrade={() => handleUpgrade("Career")}
            >
              <div className="text-center py-4">
                <tool.icon className="h-12 w-12 mx-auto mb-2 text-primary" />
                <Button variant="secondary" className="w-full">
                  Use Tool
                </Button>
              </div>
            </TierFeatureCard>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
