import AppLayout from "@/layouts/AppLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import { useTier } from "@/state/tier";
import TierFeatureCard from "@/components/TierFeatureCard";
import { Briefcase, Crown, Star, Zap } from "lucide-react";

const FREE_GIGS = [
  { id: 1, title: "Basic product descriptions", category: "Copywriting", budget: 25, tier: "Free", difficulty: "Easy" },
  { id: 2, title: "Simple data entry", category: "Admin", budget: 15, tier: "Free", difficulty: "Easy" },
];

const CREATOR_GIGS = [
  { id: 3, title: "Build a chatbot", category: "Development", budget: 200, tier: "Creator", difficulty: "Medium" },
  { id: 4, title: "AI content strategy", category: "Marketing", budget: 150, tier: "Creator", difficulty: "Medium" },
  { id: 5, title: "Custom AI workflows", category: "Automation", budget: 300, tier: "Creator", difficulty: "Hard" },
];

const CAREER_GIGS = [
  { id: 6, title: "AI transformation consulting", category: "Consulting", budget: 2500, tier: "Career", difficulty: "Expert" },
  { id: 7, title: "Executive AI strategy", category: "Strategy", budget: 5000, tier: "Career", difficulty: "Expert" },
  { id: 8, title: "AI ethics audit", category: "Compliance", budget: 1800, tier: "Career", difficulty: "Expert" },
];

export default function Market() {
  const [tier, setTier] = useTier();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [price, setPrice] = useState("Any");

  const allGigs = [...FREE_GIGS, ...CREATOR_GIGS, ...CAREER_GIGS];
  const items = useMemo(() => {
    return allGigs.filter((l) =>
      (cat === "All" || l.category === cat) &&
      (price === "Any" || (price === "<100" ? l.budget < 100 : price === "100-1000" ? (l.budget >= 100 && l.budget <= 1000) : l.budget > 1000)) &&
      (q.trim().length === 0 || l.title.toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, cat, price]);

  const handleUpgrade = (targetTier: "Creator" | "Career") => {
    setTier(targetTier);
  };

  const categories = ["All", "Copywriting", "Admin", "Development", "Marketing", "Automation", "Consulting", "Strategy", "Compliance"];

  return (
    <AppLayout>
      <SEO title="Marketplace – AI Campus" description="Apply to micro‑gigs and build a portfolio with real work." />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <div className="mt-2 flex items-center gap-4">
          <p className="text-muted-foreground">Apply to gigs and build your portfolio.</p>
          <Badge variant="secondary" className={`badge-tier-${tier.toLowerCase()}`}>
            {tier} Tier
          </Badge>
        </div>
      </header>

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search gigs…" />
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={price} onValueChange={setPrice}>
          <SelectTrigger><SelectValue placeholder="Budget" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Any">Any Budget</SelectItem>
            <SelectItem value="<100">Under $100</SelectItem>
            <SelectItem value="100-1000">$100 - $1,000</SelectItem>
            <SelectItem value=">1000">Over $1,000</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Free Tier Gigs */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Entry Level Gigs
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {FREE_GIGS.filter(gig => 
            (cat === "All" || gig.category === cat) &&
            (price === "Any" || (price === "<100" ? gig.budget < 100 : price === "100-1000" ? (gig.budget >= 100 && gig.budget <= 1000) : gig.budget > 1000)) &&
            (q.trim().length === 0 || gig.title.toLowerCase().includes(q.toLowerCase()))
          ).map((gig) => (
            <Card key={gig.id} className="tier-card-free">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{gig.title}</span>
                  <span className="text-lg font-semibold text-primary">${gig.budget}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">{gig.category}</Badge>
                  <Badge variant="outline">{gig.difficulty}</Badge>
                </div>
                <Button variant="hero" className="w-full">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Creator Tier Gigs */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Professional Gigs
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {CREATOR_GIGS.filter(gig => 
            (cat === "All" || gig.category === cat) &&
            (price === "Any" || (price === "<100" ? gig.budget < 100 : price === "100-1000" ? (gig.budget >= 100 && gig.budget <= 1000) : gig.budget > 1000)) &&
            (q.trim().length === 0 || gig.title.toLowerCase().includes(q.toLowerCase()))
          ).map((gig) => (
            <TierFeatureCard
              key={gig.id}
              title={gig.title}
              description={`${gig.category} • ${gig.difficulty} • $${gig.budget}`}
              requiredTier="Creator"
              onUpgrade={() => handleUpgrade("Creator")}
            >
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{gig.category}</Badge>
                <span className="text-lg font-semibold text-primary">${gig.budget}</span>
              </div>
              <Button variant="secondary" className="w-full">Apply</Button>
            </TierFeatureCard>
          ))}
        </div>
      </section>

      {/* Career Tier Gigs */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5" />
          Executive Gigs
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {CAREER_GIGS.filter(gig => 
            (cat === "All" || gig.category === cat) &&
            (price === "Any" || (price === "<100" ? gig.budget < 100 : price === "100-1000" ? (gig.budget >= 100 && gig.budget <= 1000) : gig.budget > 1000)) &&
            (q.trim().length === 0 || gig.title.toLowerCase().includes(q.toLowerCase()))
          ).map((gig) => (
            <TierFeatureCard
              key={gig.id}
              title={gig.title}
              description={`${gig.category} • ${gig.difficulty} • $${gig.budget}`}
              requiredTier="Career"
              onUpgrade={() => handleUpgrade("Career")}
            >
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{gig.category}</Badge>
                <span className="text-lg font-semibold text-primary">${gig.budget}</span>
              </div>
              <Button variant="secondary" className="w-full">Apply</Button>
            </TierFeatureCard>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
