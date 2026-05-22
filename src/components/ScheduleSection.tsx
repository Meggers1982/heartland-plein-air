import type { LucideIcon } from "lucide-react";
import { Calendar, Paintbrush, MapPin, Users, PartyPopper, Gavel, ShoppingBag, Globe } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

type SubEvent = { time?: string; location: string };
type Link = { label: string; href: string };
type Day = {
  date: string;
  weekday: string;
  title: string;
  icon: LucideIcon;
  description: string;
  events?: SubEvent[];
  links?: Link[];
};

const schedule: Day[] = [
  {
    date: "Sept 12, 2026",
    weekday: "Saturday",
    title: "Pre-Festival Youth Paint Out",
    icon: Paintbrush,
    description:
      "The festival kicks off early with youth paint-out sessions and an evening exhibition celebrating young artists.",
    events: [
      { time: "10:00 AM – 2:00 PM", location: "Wildwood Park · Ralston Ave & 78th St, Ralston" },
      { time: "5:00 – 7:00 PM", location: "Youth Exhibition · Baright Library, 5555 S. 77th St., Ralston" },
    ],
  },
  {
    date: "Sept 13, 2026",
    weekday: "Sunday",
    title: "Artist Orientation",
    icon: Users,
    description:
      "Participating artists gather for orientation and the official kickoff of festival week.",
    events: [{ location: "Festival Headquarters" }],
  },
  {
    date: "Sept 14, 2026",
    weekday: "Monday",
    title: "Quick Paint: Benson",
    icon: Paintbrush,
    description:
      "Artists paint across the metro area, then converge for a lunchtime Quick Paint Competition in Benson.",
    events: [{ time: "Lunchtime", location: "62nd & Maple, Omaha" }],
  },
  {
    date: "Sept 15, 2026",
    weekday: "Tuesday",
    title: "Quick Paint: Dundee",
    icon: Paintbrush,
    description:
      "Artists continue painting throughout the metro, with a lunchtime Quick Paint Competition in historic Dundee.",
    events: [{ time: "Lunchtime", location: "50th & Underwood, Omaha" }],
  },
  {
    date: "Sept 16, 2026",
    weekday: "Wednesday",
    title: "Cathedral & Castle + Youth Mentors",
    icon: Users,
    description:
      "A midday Quick Paint along 40th Street, followed by afternoon Youth–Professional Artist Mentor Sessions.",
    events: [
      { time: "Lunchtime", location: "40th Street between Cuming & Davenport, Omaha" },
      { time: "4:00 – 5:30 PM", location: "Youth–Professional Mentor Sessions" },
    ],
  },
  {
    date: "Sept 17, 2026",
    weekday: "Thursday",
    title: "Artist Lecture & Evening Quick Paint",
    icon: Paintbrush,
    description:
      "An evening lecture from the Plein Air Judge, followed by an Evening Quick Paint Competition during the Ralston concert.",
    events: [
      { time: "5:00 – 6:00 PM", location: "Artist Lecture · Baright Library, 5555 S. 77th St., Ralston" },
      { time: "6:00 – 8:00 PM", location: "Evening Quick Paint · Main & 77th Street, Ralston" },
    ],
  },
  {
    date: "Sept 18, 2026",
    weekday: "Friday",
    title: "Collector's Soirée",
    icon: PartyPopper,
    description:
      "An evening of music, food, an award ceremony, and the collector's auction at The Granary.",
    events: [{ time: "5:00 – 8:00 PM", location: "The Granary · 7401 Main St., Ralston" }],
  },
  {
    date: "Sept 19, 2026",
    weekday: "Saturday",
    title: "Public Exhibition & Auction",
    icon: Gavel,
    description:
      "The grand finale — browse the full collection and bid on original paintings created during the festival.",
    events: [{ time: "1:00 – 4:00 PM", location: "The Granary · 7401 Main St., Ralston" }],
  },
  {
    date: "Sept 19 – Oct 2, 2026",
    weekday: "Online",
    title: "Online Art Sales",
    icon: ShoppingBag,
    description:
      "Remaining artworks are available for purchase online for two weeks following the festival.",
    links: [
      { label: "ralstonarts.org", href: "https://www.ralstonarts.org" },
      { label: "heartlandpleinair.org", href: "https://www.heartlandpleinair.org" },
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
              const alignText = isLeft ? "md:text-right" : "";
              const rowReverse = isLeft ? "md:flex-row-reverse" : "";
              return (
                <AnimatedSection key={day.date + day.title} delay={i * 80}>
                  <div
                    className={`relative flex flex-col gap-4 md:flex-row md:items-start ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content card */}
                    <div className={`flex-1 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                      <div
                        className={`rounded-lg bg-card p-7 shadow-sm ring-1 ring-border/40 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${alignText}`}
                      >
                        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                          {day.date}
                        </p>
                        <p className="mt-1 font-display text-2xl font-semibold leading-tight text-foreground">
                          {day.weekday}
                        </p>
                        <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                          {day.title}
                        </h3>
                        <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                          {day.description}
                        </p>

                        {day.events && day.events.length > 0 && (
                          <ul className="mt-4 space-y-2 border-t border-border/60 pt-4">
                            {day.events.map((ev, idx) => (
                              <li
                                key={idx}
                                className={`flex flex-col gap-1 font-body text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1 ${
                                  isLeft ? "sm:justify-end" : ""
                                } ${rowReverse}`}
                              >
                                {ev.time && (
                                  <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                                    <Calendar className="h-3.5 w-3.5 text-primary" />
                                    {ev.time}
                                  </span>
                                )}
                                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                                  <MapPin className="h-3.5 w-3.5 text-primary" />
                                  {ev.location}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {day.links && day.links.length > 0 && (
                          <div
                            className={`mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border/60 pt-4 font-body text-sm ${
                              isLeft ? "md:justify-end" : ""
                            }`}
                          >
                            <Globe className="h-3.5 w-3.5 text-primary" />
                            {day.links.map((link, idx) => (
                              <span key={link.href} className="inline-flex items-center gap-3">
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-semibold text-primary hover:underline"
                                >
                                  {link.label}
                                </a>
                                {idx < day.links!.length - 1 && (
                                  <span className="text-muted-foreground/60">·</span>
                                )}
                              </span>
                            ))}
                          </div>
                        )}
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