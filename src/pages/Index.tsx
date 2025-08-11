import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { useEffect, useState } from "react";
import { getTier, setTier, Tier } from "@/state/tier";

const features = [
  { title: "Learn", desc: "Structured paths from zero to job-ready." },
  { title: "Build", desc: "1‑click templates and a live sandbox editor." },
  { title: "Earn", desc: "Portfolio hosting and marketplace micro‑gigs." },
];

const TierToggle = () => {
  const [tier, update] = useState<Tier>(getTier());
  useEffect(() => update(getTier()), []);
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="text-muted-foreground">Demo as:</span>
      {(["Free", "Creator", "Career"] as Tier[]).map((t) => (
        <Button
          key={t}
          size="pill"
          variant={tier === t ? "hero" : "outline"}
          onClick={() => {
            setTier(t);
            update(t);
          }}
          aria-pressed={tier === t}
        >
          {t}
        </Button>
      ))}
    </div>
  );
};

const Index = () => {
  const tier = getTier();
  return (
    <AppLayout>
      <SEO
        title="Digital Intelligence Marketplace – AI Campus"
        description="Learn, build, and earn with AI. Courses, tools, portfolios, gigs, and mentorship in one place."
      />

      <section className="relative overflow-hidden rounded-2xl border p-8 md:p-12">
        <div className="pointer-events-none absolute -inset-20 -z-10 bg-gradient-primary opacity-10 blur-3xl" aria-hidden />
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Learn, build, and earn with AI
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A campus for the AI era: structured learning paths, embedded tools, portfolios, and a marketplace to land real work.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="xl" variant="hero">
                <a href="/learning">Start Learning</a>
              </Button>
              <Button asChild size="xl" variant="outline">
                <a href="/pricing">See Pricing</a>
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="secondary">Current tier: {tier}</Badge>
              <TierToggle />
            </div>
          </div>
          <div className="relative w-full max-w-sm md:max-w-md">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border bg-card shadow-[var(--shadow-soft)]">
              <div className="h-full w-full bg-gradient-primary opacity-80" />
            </div>
            <div className="absolute -right-6 -top-6 rounded-lg border bg-background px-3 py-2 text-xs shadow">
              Priority models on Creator & Career
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <article key={f.title} className="group rounded-xl border p-6 transition-transform hover:-translate-y-0.5">
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-muted-foreground">{f.desc}</p>
          </article>
        ))}
      </section>

      <section className="mt-12 rounded-2xl border p-6">
        <h2 className="text-2xl font-semibold">Upgrade to unlock more</h2>
        <p className="mt-2 text-muted-foreground">
          Creator adds unlimited AI tools, templates, and marketplace access. Career adds mentorship, certificates, and job matching.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild size="lg" variant="hero">
            <a href="/pricing">Compare tiers</a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="/tools">Try AI tools</a>
          </Button>
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
