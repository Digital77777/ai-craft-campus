import { Button } from "@/components/ui/button";
import { useTier } from "@/state/tier";
import { useAuth } from "@/hooks/useAuth";

export default function CurrentTierBenefits() {
  const [tier] = useTier();
  const { user } = useAuth();

  return (
    <section className="mt-16 rounded-3xl border bg-gradient-subtle p-8 md:p-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          Your {tier} Tier Benefits
        </h2>
        <p className="mt-4 text-muted-foreground">
          {tier === "Free" && "Start your AI journey with these essential features"}
          {tier === "Creator" && "Build amazing projects with unlimited access"}
          {tier === "Career" && "Professional tools for career advancement"}
        </p>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {user ? (
            <>
              <Button asChild size="lg" variant="hero">
                <a href="/learning">Explore Learning</a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="/tools">Try AI Tools</a>
              </Button>
              {tier !== "Career" && (
                <Button asChild size="lg" variant="outline">
                  <a href="/pricing">Upgrade Now</a>
                </Button>
              )}
            </>
          ) : (
            <>
              <Button asChild size="lg" variant="hero">
                <a href="/auth">Get Started</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="/pricing">View Pricing</a>
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}