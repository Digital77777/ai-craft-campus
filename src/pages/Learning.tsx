import AppLayout from "@/layouts/AppLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo, useState } from "react";
import { useTier } from "@/state/tier";
import TierFeatureCard from "@/components/TierFeatureCard";
import { BookOpen, Code, Brain, Crown, Award, Users, Zap } from "lucide-react";

const FREE_COURSES = [
  { id: 1, title: "AI Foundations", difficulty: "Beginner", description: "Intro to prompts, LLMs, and ethics.", tier: "Free", icon: BookOpen },
  { id: 2, title: "Build a Chatbot", difficulty: "Beginner", description: "Step-by-step guided chatbot project.", tier: "Free", icon: Code },
];

const CREATOR_COURSES = [
  { id: 3, title: "AI Apps with TypeScript", difficulty: "Intermediate", description: "From components to API calls.", tier: "Creator", icon: Brain },
  { id: 4, title: "Advanced Prompt Engineering", difficulty: "Intermediate", description: "Chain-of-thought, few-shot, and fine-tuning.", tier: "Creator", icon: Zap },
  { id: 5, title: "RAG & Vector Search", difficulty: "Advanced", description: "Ground your models with your data.", tier: "Creator", icon: Code },
];

const CAREER_COURSES = [
  { id: 6, title: "AI Product Management", difficulty: "Advanced", description: "Lead AI initiatives in organizations.", tier: "Career", icon: Crown },
  { id: 7, title: "AI Ethics & Governance", difficulty: "Advanced", description: "Responsible AI deployment strategies.", tier: "Career", icon: Award },
  { id: 8, title: "AI Consulting Masterclass", difficulty: "Expert", description: "Build and run an AI consulting business.", tier: "Career", icon: Users },
];

export default function Learning() {
  const [tier, setTier] = useTier();
  const [filter, setFilter] = useState<string>("All");
  
  const allCourses = [...FREE_COURSES, ...CREATOR_COURSES, ...CAREER_COURSES];
  const items = useMemo(() => 
    allCourses.filter(d => filter === "All" || d.difficulty === filter), 
    [filter]
  );

  const handleUpgrade = (targetTier: "Creator" | "Career") => {
    setTier(targetTier);
  };

  return (
    <AppLayout>
      <SEO title="Learning Paths – AI Campus" description="Structured learning paths from beginner to advanced with hands-on projects." />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Learning Paths</h1>
        <div className="mt-2 flex items-center gap-4">
          <p className="text-muted-foreground">Follow curated tracks and build real projects.</p>
          <Badge variant="secondary" className={`badge-tier-${tier.toLowerCase()}`}>
            {tier} Tier
          </Badge>
        </div>
      </header>

      <div className="mb-6 flex items-center gap-3">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by difficulty" />
          </SelectTrigger>
          <SelectContent>
            {(["All", "Beginner", "Intermediate", "Advanced", "Expert"]).map(v => (
              <SelectItem key={v} value={v}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Free Courses */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Free Courses
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {FREE_COURSES.filter(c => filter === "All" || c.difficulty === filter).map((course) => (
            <Card key={course.id} className="tier-card-free">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <course.icon className="h-5 w-5" />
                  {course.title}
                  <Badge variant="secondary" className="ml-auto">{course.difficulty}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <Button variant="hero" className="w-full">Start Learning</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Creator Courses */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Creator Courses
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {CREATOR_COURSES.filter(c => filter === "All" || c.difficulty === filter).map((course) => (
            <TierFeatureCard
              key={course.id}
              title={course.title}
              description={course.description}
              requiredTier="Creator"
              onUpgrade={() => handleUpgrade("Creator")}
            >
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{course.difficulty}</Badge>
                <Button variant="secondary" className="ml-auto">
                  Start Course
                </Button>
              </div>
            </TierFeatureCard>
          ))}
        </div>
      </section>

      {/* Career Courses */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5" />
          Career Courses
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {CAREER_COURSES.filter(c => filter === "All" || c.difficulty === filter).map((course) => (
            <TierFeatureCard
              key={course.id}
              title={course.title}
              description={course.description}
              requiredTier="Career"
              onUpgrade={() => handleUpgrade("Career")}
            >
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{course.difficulty}</Badge>
                <Button variant="secondary" className="ml-auto">
                  Start Course
                </Button>
              </div>
            </TierFeatureCard>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
