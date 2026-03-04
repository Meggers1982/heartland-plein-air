import AnimatedSection from "@/components/AnimatedSection";
import { Calendar, Paintbrush, MapPin, Users, PartyPopper, Gavel } from "lucide-react";

const schedule = [
  {
    day: "Saturday, Sept 13",
    title: "Opening Reception",
    icon: PartyPopper,
    description: "Welcome gathering for artists and the public. Meet the painters, enjoy live music, and preview the week ahead.",
    time: "5:00 PM – 8:00 PM",
    location: "Festival Headquarters",
  },
  {
    day: "Sunday, Sept 14",
    title: "Paint-Out Begins",
    icon: Paintbrush,
    description: "Artists fan out across Douglas and Sarpy County to begin capturing the region's beauty on canvas.",
    time: "8:00 AM – 5:00 PM",
    location: "Various Locations",
  },
  {
    day: "Monday – Tuesday",
    title: "Open Studio Days",
    icon: MapPin,
    description: "Visit painting sites throughout the metro area. Watch artists work en plein air and learn about their techniques.",
    time: "9:00 AM – 4:00 PM",
    location: "20+ Scenic Sites",
  },
  {
    day: "Wednesday, Sept 17",
    title: "Artist Demonstration",
    icon: Paintbrush,
    description: "A featured artist leads a live painting demonstration, sharing insights into the plein air process.",
    time: "10:00 AM – 12:00 PM",
    location: "Festival Headquarters",
  },
  {
    day: "Thursday, Sept 18",
    title: "Collector's Preview",
    icon: Users,
    description: "An exclusive first look at the week's completed works. Mingle with artists and fellow collectors over wine and hors d'oeuvres.",
    time: "6:00 PM – 9:00 PM",
    location: "Exhibition Venue",
  },
  {
    day: "Friday, Sept 19",
    title: "Exhibition & Auction",
    icon: Gavel,
    description: "The grand finale — browse the full collection and bid on original paintings created during the festival.",
    time: "5:00 PM – 9:00 PM",
    location: "Exhibition Venue",
  },
];

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
            {schedule.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <AnimatedSection key={event.title} delay={i * 80}>
                  <div className={`relative flex flex-col gap-4 md:flex-row md:items-start ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Content card */}
                    <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="rounded-lg bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                        <p className="mb-1 font-body text-xs font-semibold uppercase tracking-widest text-primary">
                          {event.day}
                        </p>
                        <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                          {event.title}
                        </h3>
                        <p className="mb-3 font-body text-sm leading-relaxed text-muted-foreground">
                          {event.description}
                        </p>
                        <div className={`flex gap-4 font-body text-xs text-muted-foreground/80 ${isLeft ? "md:justify-end" : ""}`}>
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
      </div>
    </section>
  );
};

export default ScheduleSection;
