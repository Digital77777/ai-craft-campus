import AppLayout from "@/layouts/AppLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState } from "react";
import { useTier } from "@/state/tier";
import { toast } from "@/hooks/use-toast";

export default function Tools() {
  const [tier] = useTier();
  const limit = useMemo(() => (tier === "Free" ? 20 : 1000), [tier]);
  const [used, setUsed] = useState(0);
  const [prompt, setPrompt] = useState("");

  const run = () => {
    if (used + 1 > limit) {
      toast({ title: "Daily limit reached", description: "Upgrade to Creator for unlimited usage." });
      return;
    }
    setUsed((u) => u + 1);
    toast({ title: "Prompt sent", description: "This is a demo. Connect Supabase + OpenAI to enable responses." });
  };

  return (
    <AppLayout>
      <SEO title="AI Tools – AI Campus" description="Try prompts and build with AI in a safe sandbox with live preview." />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">AI Tools</h1>
        <p className="mt-2 text-muted-foreground">Usage: {used}/{limit} per day</p>
      </header>

      <section className="rounded-xl border p-4">
        <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask anything or paste your prompt..." rows={6} />
        <div className="mt-3 flex gap-2">
          <Button onClick={run} variant="hero">Run</Button>
          <Button variant="secondary" onClick={() => setPrompt("")}>Clear</Button>
          <Button asChild variant="outline">
            <a href="/pricing">Upgrade</a>
          </Button>
        </div>
      </section>
    </AppLayout>
  );
}
