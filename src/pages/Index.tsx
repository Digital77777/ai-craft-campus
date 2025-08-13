import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import TierSwitcher from "@/components/TierSwitcher";
import { useTier } from "@/state/tier";
import { Sparkles, Rocket, Crown, Users, Briefcase, Award, Code, BookOpen, TrendingUp } from "lucide-react";

const heroFeatures = [
  { icon: BookOpen, title: "Learn", desc: "AI fundamentals to advanced techniques" },
  { icon: Code, title: "Build", desc: "Real projects with AI tools" },
  { icon: TrendingUp, title: "Earn", desc: "Marketplace opportunities" },
];

const tierShowcase = [
  {
    tier: "Free",
    title: "Start Your AI Journey",
    subtitle: "Perfect for beginners exploring AI",
    features: [
      { icon: BookOpen, text: "Beginner-friendly learning paths" },
      { icon: Users, text: "Active community support" },
      { icon: Sparkles, text: "20 AI requests daily" },
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

const stats = [
  { number: "10,000+", label: "Students learning" },
  { number: "500+", label: "Projects built" },
  { number: "50+", label: "Gigs completed" },
  { number: "95%", label: "Success rate" }
];

const Index = () => {
  const [tier] = useTier();
  
  return (
    <AppLayout>
      <SEO
        title="Digital Intelligence Marketplace – AI Campus"
        description="Learn, build, and earn with AI. Courses, tools, portfolios, gigs, and mentorship in one place."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/5 via-transparent to-accent/5 p-8 md:p-16">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-60" />
        <div className="relative">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Join thousands learning AI</span>
            </div>
            <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Your AI Career
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Starts Here</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground">
              From complete beginner to AI professional. Learn, build real projects, and land your dream job in the fastest-growing field.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="hero" className="px-8 py-6 text-lg">
                <a href="/learning">Start Free Today</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 py-6 text-lg">
                <a href="#tiers">See What's Possible</a>
              </Button>
            </div>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {heroFeatures.map((feature, i) => (
              <div key={i} className="group text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-16 rounded-2xl border bg-card/50 p-8">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-primary">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tier Showcase */}
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

      {/* Current Tier Benefits */}
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
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "AI Campus",
          url: typeof window !== "undefined" ? window.location.origin : "",
          sameAs: ["https://lovable.dev"],
        })
      }} />
    </AppLayout>
  );
};

export default Index;
