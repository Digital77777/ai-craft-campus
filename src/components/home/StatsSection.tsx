const stats = [
  { number: "10,000+", label: "Students learning" },
  { number: "500+", label: "Projects built" },
  { number: "50+", label: "Gigs completed" },
  { number: "95%", label: "Success rate" }
];

export default function StatsSection() {
  return (
    <section className="mt-16 rounded-2xl border bg-card/50 p-8">
      <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i}>
            <div className="text-3xl font-bold text-primary">{stat.number}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}