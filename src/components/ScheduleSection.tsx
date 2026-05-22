import AnimatedSection from "@/components/AnimatedSection";
import { Calendar, Paintbrush, MapPin, Users, PartyPopper, Gavel, Sunrise, BookOpen, Award, GraduationCap, ShoppingCart, Monitor } from "lucide-react";

interface ScheduleEvent {
  time: string;
  description: string;
  location?: string;
}

interface ScheduleDay {
  day: string;
  title: string;
  icon: React.ElementType;
  events: ScheduleEvent[];
}

const schedule: ScheduleDay[] = [
  {
    day: "Saturday, September 12",
    title: "Pre-Festival Youth Paint Out",
    icon: Sunrise,
    events: [
      {
        time: "10 AM – 2 PM",
        description: "Youth Paint Out Session",
        location: "Wildwood Park (Ralston Ave. & 78th St., Ralston, NE)",
      },
      {
        time: "5 – 7 PM",
        description: "Youth Exhibition",
        location: "Baright Public Library (5555 S. 77th St., Ralston, NE)",
      },
    ],
  },
  {
    day: "Sunday, September 13",
    title: "Artist Orientation",
    icon: BookOpen,
    events: [
      {
        time: "All Day",
        description: "Welcome and orientation for participating artists",
      },
    ],
  },
  {
    day: "Monday, September 14",
    title: "Open Painting + Quick Paint",
    icon: Paintbrush,
    events: [
      {
        time: "Morning – Afternoon",
        description: "Artists paint freely across the metro area",
      },
      {
        time: "Lunchtime",
        description: "Quick Paint Competition",
        location: "Benson (62nd & Maple, Omaha, NE)",
      },
    ],
  },
  {
    day: "Tuesday, September 15",
    title: "Open Painting + Quick Paint",
    icon: Paintbrush,
    events: [
      {
        time: "Morning – Afternoon",
        description: "Artists paint freely across the metro area",
      },
      {
        time: "Lunchtime",
        description: "Quick Paint Competition",
        location: "Dundee (50th & Underwood, Omaha, NE)",
      },
    ],
  },
  {
    day: "Wednesday, September 16",
    title: "Open Painting + Quick Paint + Youth Mentorship",
    icon: GraduationCap,
    events: [
      {
        time: "Morning – Afternoon",
        description: "Artists paint freely across the metro area",
      },
      {
        time: "Lunchtime",
        description: "Quick Paint Competition",
        location: "Cathedral & Castle District (Along 40th St. between Cuming & Davenport, Omaha, NE)",
      },
      {
        time: "4 – 5:30 PM",
        description: "Youth–Professional Artist Mentor Sessions",
      },
    ],
  },
  {
    day: "Thursday, September 17",
    title: "Open Painting + Evening Quick Paint",
    icon: Paintbrush,
    events: [
      {
        time: "Morning – Afternoon",
        description: "Artists paint freely across the metro area",
      },
      {
        time: "5 – 6 PM",
        description: "Artist Lecture by the Plein Air Judge",
        location: "Baright Public Library (5555 S. 77th St., Ralston, NE)",
      },
      {
        time: "6 – 8 PM",
        description: "Evening Quick Paint Competition during Concert",
        location: "Downtown Ralston (Main St. & 77th St.)",
      },
    ],
  },
  {
    day: "Friday, September 18",
    title: "Open Painting + Collector's Soirée",
    icon: PartyPopper,
    events: [
      {
        time: "Morning – Afternoon",
        description: "Artists paint freely across the metro area",
      },
      {
        time: "5 – 8 PM",
        description: "Collector's Soirée — Featuring live music, food, awards ceremony, and art auction",
        location: "The Granary (7401 Main St., Ralston, NE)",
      },
    ],
  },
  {
    day: "Saturday, September 19",
    title: "Public Exhibition & Auction",
    icon: Gavel,
    events: [
      {
        time: "1 – 4 PM",
        description: "Public Exhibition and Auction",
        location: "The Granary (7401 Main St., Ralston, NE)",
      },
    ],
  },
  {
    day: "September 19 – October 2",
    title: "Online Sales",
    icon: Monitor,
    events: [
      {
        time: "All Day",
        description: "Unsold works available for purchase online",
      },
    ],
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
            {schedule.map((day, i) => {
              const isLeft = i % 2 === 0;
              const Icon = day.icon;
              return (
                <AnimatedSection key={day.title + day.day} delay={i * 80}>
                  <div className={`relative flex flex-col gap-4 md:flex-row md:items-start ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Content card */}
                    <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="rounded-lg bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                        <p className="mb-1 font-body text-xs font-semibold uppercase tracking-widest text-primary">
                          {day.day}
                        </p>
                        <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                          {day.title}
                        </h3>
                        <div className="space-y-3">
                          {day.events.map((event, j) => (
                            <div key={j} className="border-t border-border/60 pt-3 first:border-0 first:pt-0">
                              <div className={`flex items-center gap-2 font-body text-xs text-primary/80 ${isLeft ? "md:justify-end" : ""}`}>
                                <Calendar className="h-3 w-3 shrink-0" />
                                <span className="font-semibold">{event.time}</span>
                              </div>
                              <p className={`mt-1 font-body text-sm leading-relaxed text-muted-foreground ${isLeft ? "md:text-right" : ""}`}>
                                {event.description}
                              </p>
                              {event.location && (
                                <div className={`mt-1 flex items-start gap-1 font-body text-xs text-muted-foreground/80 ${isLeft ? "md:justify-end" : ""}`}>
                                  <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>
                          ))}
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
