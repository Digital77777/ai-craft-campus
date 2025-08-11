import AppLayout from "@/layouts/AppLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

const LISTINGS = [
  { id: 1, title: "Draft product descriptions", category: "Copywriting", budget: 80 },
  { id: 2, title: "Resume optimization with AI", category: "Career", budget: 60 },
  { id: 3, title: "Build a simple chatbot", category: "Development", budget: 200 },
  { id: 4, title: "Research assistant prompts", category: "Research", budget: 120 },
];

export default function Market() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [price, setPrice] = useState("Any");

  const items = useMemo(() => {
    return LISTINGS.filter((l) =>
      (cat === "All" || l.category === cat) &&
      (price === "Any" || (price === "<100" ? l.budget < 100 : l.budget >= 100)) &&
      (q.trim().length === 0 || l.title.toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, cat, price]);

  return (
    <AppLayout>
      <SEO title="Marketplace – AI Campus" description="Apply to micro‑gigs and build a portfolio with real work." />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="mt-2 text-muted-foreground">Filter by category and budget, then apply.</p>
      </header>

      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search gigs…" />
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            {["All", "Copywriting", "Career", "Development", "Research"].map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={price} onValueChange={setPrice}>
          <SelectTrigger><SelectValue placeholder="Budget" /></SelectTrigger>
          <SelectContent>
            {["Any", "<100", ">=100"].map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <section className="grid gap-4">
        {items.map((l) => (
          <Card key={l.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{l.title}</span>
                <span className="text-sm text-muted-foreground">${l.budget}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{l.category}</span>
              <Button asChild>
                <a href="/account">Apply</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </AppLayout>
  );
}
