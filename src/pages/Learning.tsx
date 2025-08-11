import AppLayout from "@/layouts/AppLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo, useState } from "react";

const DATA = [
  { id: 1, title: "AI Foundations", difficulty: "Beginner", description: "Intro to prompts, LLMs, and ethics." },
  { id: 2, title: "Build a Chatbot", difficulty: "Beginner", description: "Step-by-step guided chatbot project." },
  { id: 3, title: "AI Apps with TypeScript", difficulty: "Intermediate", description: "From components to API calls." },
  { id: 4, title: "RAG & Vector Search", difficulty: "Advanced", description: "Ground your models with your data." },
];

export default function Learning() {
  const [filter, setFilter] = useState<string>("All");
  const items = useMemo(() => DATA.filter(d => filter === "All" || d.difficulty === filter), [filter]);

  return (
    <AppLayout>
      <SEO title="Learning Paths – AI Campus" description="Structured learning paths from beginner to advanced with hands-on projects." />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Learning Paths</h1>
        <p className="mt-2 text-muted-foreground">Follow curated tracks and build real projects.</p>
      </header>

      <div className="mb-4 flex items-center gap-3">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            {(["All", "Beginner", "Intermediate", "Advanced"]).map(v => (
              <SelectItem key={v} value={v}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        {items.map((i) => (
          <Card key={i.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{i.title}</span>
                <Badge variant="secondary">{i.difficulty}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{i.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </AppLayout>
  );
}
