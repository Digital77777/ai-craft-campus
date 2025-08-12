import AppLayout from "@/layouts/AppLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTier } from "@/state/tier";

export default function Account() {
  const [tier] = useTier();
  return (
    <AppLayout>
      <SEO title="Account – AI Campus" description="Manage your profile, portfolio and subscription tier." />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Account</h1>
        <p className="mt-2 text-muted-foreground">Manage your subscription and profile.</p>
      </header>

      <section className="rounded-xl border p-6">
        <div className="flex items-center gap-3">
          <span>Current tier</span>
          <Badge variant="secondary" className={tier === "Free" ? "badge-tier-free" : tier === "Creator" ? "badge-tier-creator" : "badge-tier-career"}>{tier}</Badge>
        </div>
        <p className="mt-2 text-muted-foreground">
          Upgrade to Creator for unlimited AI tools and marketplace access. Career adds mentorship and certificates.
        </p>
        <div className="mt-4 flex gap-2">
          <Button asChild variant="hero"><a href="/pricing">Upgrade</a></Button>
          <Button asChild variant="secondary"><a href="/learning">Continue Learning</a></Button>
        </div>
      </section>
    </AppLayout>
  );
}
