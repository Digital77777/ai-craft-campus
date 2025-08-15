import AppLayout from "@/layouts/AppLayout";
import { SEO } from "@/components/SEO";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import TierShowcase from "@/components/home/TierShowcase";
import CurrentTierBenefits from "@/components/home/CurrentTierBenefits";

const Index = () => {
  
  return (
    <AppLayout>
      <SEO
        title="Digital Intelligence Marketplace – AI Campus"
        description="Learn, build, and earn with AI. Courses, tools, portfolios, gigs, and mentorship in one place."
      />

      <HeroSection />
      <StatsSection />
      <TierShowcase />
      <CurrentTierBenefits />

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
