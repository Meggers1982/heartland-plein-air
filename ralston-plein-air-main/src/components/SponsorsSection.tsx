import AnimatedSection from "@/components/AnimatedSection";

const sponsors = [
  { name: "First National Bank", initials: "FNB" },
  { name: "Metro Arts Council", initials: "MAC" },
  { name: "Heartland Gallery", initials: "HG" },
  { name: "Prairie Wind Media", initials: "PWM" },
  { name: "Douglas County Tourism", initials: "DCT" },
  { name: "Sarpy County Foundation", initials: "SCF" },
];

const SponsorsSection = () => {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection className="mb-10 text-center">
          <p className="mb-1 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Made Possible By
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Our Sponsors
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {sponsors.map((s) => (
              <div
                key={s.name}
                className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                  <span className="font-display text-lg font-bold text-muted-foreground">
                    {s.initials}
                  </span>
                </div>
                <p className="text-center font-body text-xs font-medium text-muted-foreground">
                  {s.name}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SponsorsSection;
