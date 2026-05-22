import AnimatedSection from "@/components/AnimatedSection";
import { Calendar, Paintbrush, MapPin, Users, PartyPopper, Gavel, ShoppingBag } from "lucide-react";

const schedule = [
  {
    day: "Saturday, Sept 12",
    title: "Pre-Festival Youth Paint Out",
    icon: Paintbrush,
    description: "Youth paint-out sessions at Wildwood Park, followed by an evening youth exhibition at the Baright Library.",
    time: "10:00 AM – 2:00 PM & 5:00 – 7:00 PM",
    location: "Wildwood Park & Baright Library, Ralston",
  },
  {
    day: "Sunday, Sept 13",
    title: "Artist Orientation",
    icon: Users,
    description: "Participating artists gather for orientation and the official kickoff of festival week.",
    time: "All Day",
    location: "Festival Headquarters",
  },
  {
    day: "Monday, Sept 14",
    title: "Quick Paint: Benson",
    icon: Paintbrush,
    description: "Artists paint across the metro area, then converge for a lunchtime Quick Paint Competition in Benson.",
    time: "Lunchtime",
    location: "62nd & Maple, Omaha",
  },
  {
    day: "Tuesday, Sept 15",
    title: "Quick Paint: Dundee",
    icon: Paintbrush,
    description: "Artists paint across the metro area, with a lunchtime Quick Paint Competition in historic Dundee.",
    time: "Lunchtime",
    location: "50th & Underwood, Omaha",
  },
  {
    day: "Wednesday, Sept 16",
    title: "Cathedral & Castle + Youth Mentors",
    icon: Users,
    description: "Lunchtime Quick Paint along 40th Street, followed by Youth–Professional Artist Mentor Sessions in the afternoon.",
    time: "Lunchtime & 4:00 – 5:30 PM",
    location: "40th St (Cuming–Davenport), Omaha",
  },
  {
    day: "Thursday, Sept 17",
    title: "Artist Lecture & Evening Quick Paint",
    icon: Paintbrush,
    description: "Artist lecture by the Plein Air Judge at the Library, then an Evening Quick Paint Competition during the concert in Ralston.",
    time: "5:00 – 6:00 PM & 6:00 – 8:00 PM",
    location: "Baright Library & Main and 77th, Ralston",
  },
  {
    day: "Friday, Sept 18",
    title: "Collector's Soirée",
    icon: PartyPopper,
    description: "An evening of music, food, an award ceremony, and the collector's auction at The Granary.",
    time: "5:00 – 8:00 PM",
    location: "The Granary, 7401 Main St., Ralston",
  },
  {
    day: "Saturday, Sept 19",
    title: "Public Exhibition & Auction",
    icon: Gavel,
    description: "The grand finale — browse the full collection and bid on original paintings created during the festival.",
    time: "1:00 – 4:00 PM",
    location: "The Granary, 7401 Main St., Ralston",
  },
  {
    day: "Sept 19 – Oct 2",
    title: "Online Art Sales",
    icon: ShoppingBag,
    description: "Remaining artworks are available for purchase online at ralstonarts.org and heartlandpleinair.org.",
    time: "Two Weeks",
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
