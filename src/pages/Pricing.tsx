import AppLayout from "@/layouts/AppLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Beginner paths",
      "Community access",
      "20 AI requests/day",
    ],
    cta: "Get started",
  },
  {
    name: "Creator",
    price: "$8/mo",
    features: [
      "All Free features",
      "Unlimited AI tools",
      "1‑click templates",
      "Marketplace access",
    ],
    cta: "Go Creator",
    highlighted: true,
  },
  {
    name: "Career",
    price: "$29/mo",
    features: [
      "All Creator features",
      "Mentorship sessions",
      "Certificates & badges",
      "Job matching alerts",
    ],
    cta: "Go Career",
  },
];

export default function Pricing() {
  return (
    <AppLayout>
      <SEO title="Pricing – AI Campus" description="Compare Free, Creator, and Career plans. Upgrade to unlock AI tools, templates, gigs, and mentorship." />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Pricing</h1>
        <p className="mt-2 text-muted-foreground">Simple plans to learn, build and earn.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {tiers.map((t) => (
          <Card key={t.name} className={`${t.highlighted ? "border-primary" : ""} ${t.name === "Free" ? "tier-card-free" : t.name === "Creator" ? "tier-card-creator" : "tier-card-career"}`}>
            <CardHeader>
              <CardTitle className="flex items-baseline justify-between">
                <span>{t.name}</span>
                <span className="text-lg font-semibold text-primary">{t.price}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {t.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <Button asChild className="mt-4 w-full" variant={t.highlighted ? "hero" : "secondary"}>
                <a href="/account">{t.cta}</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "AI Campus Subscription",
          description: "Plans for learning AI with tools, templates, gigs and mentorship.",
          offers: tiers.map((t) => ({
            "@type": "Offer",
            name: t.name,
            price: t.price.replace("$", "").replace("/mo", ""),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          })),
        })
      }} />
    </AppLayout>
  );
}
