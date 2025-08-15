import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, BookOpen, Code, TrendingUp } from "lucide-react";

const heroFeatures = [
  { icon: BookOpen, title: "Learn", desc: "AI fundamentals to advanced techniques" },
  { icon: Code, title: "Build", desc: "Real projects with AI tools" },
  { icon: TrendingUp, title: "Earn", desc: "Marketplace opportunities" },
];

export default function HeroSection() {
  const { user } = useAuth();

  return (
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
              <a href={user ? "/learning" : "/auth"}>
                {user ? "Continue Learning" : "Start Free Today"}
              </a>
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
  );
}