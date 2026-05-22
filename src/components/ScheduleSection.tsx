import AnimatedSection from "@/components/AnimatedSection";
import { Calendar, Paintbrush, MapPin, PartyPopper, Gavel, Sunrise, BookOpen, GraduationCap, Monitor, Users } from "lucide-react";

const schedule = [
  {
    day: "Saturday, September 12",
    title: "Youth Paint Out Session",
    icon: Sunrise,
    description: "Young artists paint en plein air in the park.",
    time: "10 AM – 2 PM",
    location: "Wildwood Park (Ralston Ave. & 78th St., Ralston, NE)",
  },
  {
    day: "Saturday, September 12",
    title: "Youth Exhibition",
    icon: Users,
    description: "Celebrate the work of young plein air painters at a public exhibition.",
    time: "5 – 7 PM",
    location: "Baright Public Library (5555 S. 77th St., Ralston, NE)",
  },
  {
    day: "Sunday, September 13",
    title: "Artist Orientation",
    icon: BookOpen,
    description: "Welcome and orientation for participating artists as the festival week begins.",
    time: "All Day",
    location: "Festival Headquarters",
  },
  {
    day: "Monday, September 14",
    title: "Open Painting + Quick Paint",
    icon: Paintbrush,
    description: "Artists paint freely across the metro area, with a lunchtime Quick Paint Competition.",
    time: "Lunchtime",
    location: "Benson (62nd & Maple, Omaha, NE)",
  },
  {
    day: "Tuesday, September 15",
    title: "Open Painting + Quick Paint",
    icon: Paintbrush,
    description: "Artists paint freely across the metro area, with a lunchtime Quick Paint Competition.",
    time: "Lunchtime",
    location: "Dundee (50th & Underwood, Omaha, NE)",
  },
  {
    day: "Wednesday, September 16",
    title: "Quick Paint + Youth Mentorship",
    icon: GraduationCap,
    description: "Open painting and a lunchtime Quick Paint Competition, followed by Youth–Professional Artist Mentor Sessions from 4 – 5:30 PM.",
    time: "Lunchtime",
    location: "Cathedral & Castle District (Along 40th St. between Cuming & Davenport, Omaha, NE)",
  },
  {
    day: "Thursday, September 17",
    title: "Artist Lecture & Evening Quick Paint",
    icon: Paintbrush,
    description: "Open painting all day, an artist lecture by the Plein Air Judge from 5 – 6 PM at Baright Public Library, then an Evening Quick Paint Competition during the concert from 6 – 8 PM.",
    time: "5 – 8 PM",
    location: "Downtown Ralston (Main St. & 77th St.)",
  },
  {
    day: "Friday, September 18",
    title: "Collector's Soirée",
    icon: PartyPopper,
    description: "Artists paint freely during the day. In the evening, join us for live music, food, the awards ceremony, and art auction.",
    time: "5 – 8 PM",
    location: "The Granary (7401 Main St., Ralston, NE)",
  },
  {
    day: "Saturday, September 19",
    title: "Public Exhibition & Auction",
    icon: Gavel,
    description: "The grand finale — browse the full collection and bid on original paintings created during the festival.",
    time: "1 – 4 PM",
    location: "The Granary (7401 Main St., Ralston, NE)",
  },
  {
    day: "September 19 – October 2",
    title: "Online Sales",
    icon: Monitor,
    description: "Unsold works available for purchase online.",
    time: "All Day",
    location: "Online",
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
                <AnimatedSection key={event.day + event.title} delay={i * 80}>
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
                        <div className={`flex flex-wrap gap-4 font-body text-xs text-muted-foreground/80 ${isLeft ? "md:justify-end" : ""}`}>
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