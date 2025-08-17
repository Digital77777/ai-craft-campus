import AppLayout from "@/layouts/AppLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTier } from "@/state/tier";
import { toast } from "@/hooks/use-toast";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import TierFeatureCard from "@/components/TierFeatureCard";
import AIChat from "@/components/tools/AIChat";
import CodeGenerator from "@/components/tools/CodeGenerator";
import AdvancedPrompting from "@/components/tools/AdvancedPrompting";
import APIIntegration from "@/components/tools/APIIntegration";
import PortfolioGenerator from "@/components/tools/PortfolioGenerator";
import InterviewPrepAI from "@/components/tools/InterviewPrepAI";
import { Code, Brain, Zap, Crown, Award } from "lucide-react";

export default function Tools() {
  const [tier, setTier] = useTier();
  const { usage, limits, aiRequestsRemaining } = useUsageTracking();

  const handleUpgrade = (targetTier: "Creator" | "Career") => {
    setTier(targetTier);
    toast({ title: `Upgraded to ${targetTier}!`, description: "You now have access to new features." });
  };

  return (
    <AppLayout>
      <SEO title="AI Tools – AI Campus" description="Try prompts and build with AI in a safe sandbox with live preview." />
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">AI Tools</h1>
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <p className="text-sm sm:text-base text-muted-foreground">
            Usage: {usage.aiRequests}/{limits.aiRequests === Infinity ? "∞" : limits.aiRequests} per day
          </p>
          <Badge variant="secondary" className={`badge-tier-${tier.toLowerCase()}`}>
            {tier} Tier
          </Badge>
          {tier === "Free" && (
            <p className="text-xs text-muted-foreground">
              {aiRequestsRemaining} requests remaining
            </p>
          )}
        </div>
      </header>

      {/* Basic Chat Tool */}
      <section className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">AI Chat Assistant</h2>
        <div className="h-[500px]">
          <AIChat />
        </div>
      </section>

      {/* Creator Tools */}
      <section className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Creator Tools</h2>
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <TierFeatureCard
            title="Code Generator"
            description="Generate complete code snippets and functions"
            requiredTier="Creator"
            onUpgrade={() => handleUpgrade("Creator")}
          >
            <div className="h-[400px]">
              <CodeGenerator />
            </div>
          </TierFeatureCard>
          
          <TierFeatureCard
            title="Advanced Prompting"
            description="Chain prompts, use templates, and advanced techniques"
            requiredTier="Creator"
            onUpgrade={() => handleUpgrade("Creator")}
          >
            <div className="h-[400px]">
              <AdvancedPrompting />
            </div>
          </TierFeatureCard>
          
          <TierFeatureCard
            title="API Integration"
            description="Connect to external APIs and services"
            requiredTier="Creator"
            onUpgrade={() => handleUpgrade("Creator")}
          >
            <div className="h-[400px]">
              <APIIntegration />
            </div>
          </TierFeatureCard>
        </div>
      </section>

      {/* Career Tools */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Career Tools</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <TierFeatureCard
            title="Portfolio Generator"
            description="AI-powered portfolio creation with industry templates"
            requiredTier="Career"
            onUpgrade={() => handleUpgrade("Career")}
          >
            <div className="h-[500px]">
              <PortfolioGenerator />
            </div>
          </TierFeatureCard>
          
          <TierFeatureCard
            title="Interview Prep AI"
            description="Practice technical interviews with AI feedback"
            requiredTier="Career"
            onUpgrade={() => handleUpgrade("Career")}
          >
            <div className="h-[500px]">
              <InterviewPrepAI />
            </div>
          </TierFeatureCard>
        </div>
      </section>
    </AppLayout>
  );
}
