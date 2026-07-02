import AnimatedSection from "@/components/AnimatedSection";
import { Calendar, Paintbrush, MapPin, PartyPopper, Gavel, Sunrise, BookOpen, GraduationCap, Monitor, Users } from "lucide-react";

const schedule = [
  {
    day: "Saturday, September 12",
    title: "Youth Paintout",
    icon: Sunrise,
    description: "Young artists paint en plein air in the park.",
    time: "10 AM – Noon",
    location: "Wildwood Park (78th & Ralston Ave., Ralston, NE)",
  },
  {
    day: "Saturday, September 12",
    title: "Youth Art Show Reception",
    icon: Users,
    description: "Celebrate young painters' work.",
    time: "6 – 7:30 PM",
    location: "Baright Public Library (5555 S. 77th St., Ralston, NE)",
  },
  {
    day: "Sunday, September 13",
    title: "Artists Arrive",
    icon: BookOpen,
    description: "Artist check-in, canvas stamping, and orientation.",
    time: "3 PM",
    location: "Festival Headquarters",
  },
  {
    day: "Monday, September 14",
    title: "Lunch Break Paintout",
    icon: Paintbrush,
    description: "Open painting across the metro. Midday Lunch Break Paintout in Downtown Ralston.",
    time: "11 AM – 1:30 PM",
    location: "Downtown Ralston / Hinge Creative District",
    logo: "/assets/hinge-creative-district-logo.png",
    logoAlt: "Ralston Hinge Creative District logo",
  },
  {
    day: "Tuesday, September 15",
    title: "Lunch Break Paintout",
    icon: Paintbrush,
    description: "Open painting across the metro. Midday Lunch Break Paintout in the Castle & Cathedral District.",
    time: "11 AM – 1:30 PM",
    location: "Castle & Cathedral Creative District",
    logo: "/assets/castle-and-cathedral-district-logo.png",
    logoAlt: "Castle & Cathedral Creative District logo",
  },
  {
    day: "Wednesday, September 16",
    title: "Lunch Break Paintout + Youth Mentorship",
    icon: GraduationCap,
    description: "Midday Lunch Break Paintout in Benson. Private mentorship sessions for preselected youth that afternoon (not open to the public).",
    time: "11 AM – 1:30 PM",
    location: "Benson Creative District",
    logo: "/assets/benson-creative-district-logo.png",
    logoAlt: "Benson Creative District logo",
  },
  {
    day: "Thursday, September 17",
    title: "Third Thursday & Judge's Lecture",
    icon: Paintbrush,
    description: "Lunch Break Paintout in Dundee 11 AM–1:30 PM. Judge Rick J. Delanty presents a ticketed lecture on Impressionism and Plein Air at Baright Library 5–6 PM. Third Thursday concert with artists painting downtown 6–8 PM — open to the public.",
    time: "11 AM – 8 PM",
    location: "Dundee + Baright Library + Downtown Ralston",
    logo: "/assets/dundee-logo.png",
    logoAlt: "Dundee Creative District logo",
  },
  {
    day: "Friday, September 18",
    title: "Collector's Soirée",
    icon: PartyPopper,
    description: "Art reception and awards ceremony. Artwork for sale at artist's listed prices. Tickets required.",
    time: "5:30 – 8 PM",
    location: "Venues at the Granary (7401 Main St., Ralston, NE)",
  },
  {
    day: "Saturday, September 19",
    title: "Quick Paint & Public Exhibition",
    icon: Gavel,
    description: "Quick Paint Competition 9–11 AM. Public Exhibition & Sale 11 AM–5 PM. Live auction of Quick Paint pieces Noon–1 PM at Granary Green.",
    time: "9 AM – 5 PM",
    location: "Ralston Hinge Creative District + Venues at the Granary",
    logo: "/assets/hinge-creative-district-logo.png",
    logoAlt: "Ralston Hinge Creative District logo",
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
                        {event.logo && (
                          <div className={`mb-3 flex ${isLeft ? "md:justify-end" : ""}`}>
                            <img
                              src={event.logo}
                              alt={event.logoAlt}
                              className="max-h-10 w-auto max-w-[220px] object-contain"
                            />
                          </div>
                        )}
                        <p className="mb-3 font-body text-sm leading-relaxed text-muted-foreground">
                          {event.description}
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
      </div>
    </section>
  );
};

export default ScheduleSection;