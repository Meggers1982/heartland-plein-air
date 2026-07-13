import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { Calendar, MapPin } from "lucide-react";
import { renderRichText } from "@/lib/richText";
import { days, homepageHighlights } from "@/data/schedule";

const ScheduleSection = () => {
  return (
    <section id="schedule" className="bg-secondary/50 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <AnimatedSection className="mb-16 text-center">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            The Week at a Glance
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground">
            Festival Schedule
          </h2>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 hidden w-px bg-border md:left-1/2 md:block" />

          <div className="space-y-8">
            {homepageHighlights.map((event, i) => {
              const isLeft = i % 2 === 0;
              const day = days.find((d) => d.id === event.dayId);
              const dayLabel = day?.dayLong ?? "";
              return (
                <AnimatedSection key={event.dayId + event.title} delay={i * 80}>
                  <div className={`relative flex flex-col gap-4 md:flex-row md:items-start ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Content card */}
                    <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="rounded-lg bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                        <p className="mb-1 font-body text-xs font-semibold uppercase tracking-widest text-primary">
                          {dayLabel}
                        </p>
                        <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                          {event.title}
                        </h3>
                        {day?.logo && (
                          <div className={`mb-3 flex ${isLeft ? "md:justify-end" : ""}`}>
                            {day.logoUrl ? (
                              <a
                                href={day.logoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={day.logoAlt}
                                className="transition-opacity hover:opacity-80"
                              >
                                <img
                                  src={day.logo}
                                  alt={day.logoAlt}
                                  className="max-h-10 w-auto max-w-[220px] object-contain"
                                />
                              </a>
                            ) : (
                              <img
                                src={day.logo}
                                alt={day.logoAlt}
                                className="max-h-10 w-auto max-w-[220px] object-contain"
                              />
                            )}
                          </div>
                        )}
                        <p className="mb-3 font-body text-sm leading-relaxed text-muted-foreground">
                          {renderRichText(event.description)}
                        </p>
                        <div className={`flex flex-wrap gap-4 font-body text-xs text-muted-foreground ${isLeft ? "md:justify-end" : ""}`}>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-6 top-6 hidden h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-card md:left-1/2 md:flex">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden flex-1 md:block" />
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/schedule"
            className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
          >
            View Full Schedule
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
