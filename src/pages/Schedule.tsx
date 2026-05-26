import { useEffect, useMemo, useState } from "react";
import { MapPin, Clock, ExternalLink, ArrowUp, CalendarPlus } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ScheduleJumpNav from "@/components/ScheduleJumpNav";
import CountdownBanner from "@/components/CountdownBanner";
import { buildEventIcs, downloadIcs } from "@/lib/ics";
import LocationsMap from "@/components/LocationsMap";
import { cn } from "@/lib/utils";
import { addJsonLd, breadcrumbSchema, SITE_URL } from "@/lib/schema";
import { setPageMeta } from "@/lib/meta";


type Audience = "public" | "ticketed" | "artists";

type ScheduleEvent = {
  time?: string;
  name: string;
  location?: string;
  address?: string;
};

type ScheduleDay = {
  id: string;
  dayShort: string;
  dayLong: string;
  title: string;
  narrative: string;
  audience: Audience;
  events?: ScheduleEvent[];
};

const days: ScheduleDay[] = [
  {
    id: "day-sep-12",
    dayShort: "Sat · Sep 12",
    dayLong: "Saturday, September 12",
    title: "It Starts with the Kids",
    audience: "public",
    narrative:
      "Before the festival officially opens, young artists get the spotlight. Local youth take their easels to Wildwood Park for a full afternoon of open-air painting — then celebrate their work that evening at the Baright Public Library. Come see what the next generation of plein air artists is made of.",
    events: [
      {
        time: "10 AM – 2 PM",
        name: "Youth Paint Out",
        location: "Wildwood Park",
        address: "Ralston Ave. & 78th St., Ralston, NE",
      },
      {
        time: "5 – 7 PM",
        name: "Youth Exhibition",
        location: "Baright Public Library",
        address: "5555 S. 77th St., Ralston, NE",
      },
    ],
  },
  {
    id: "day-sep-13",
    dayShort: "Sun · Sep 13",
    dayLong: "Sunday, September 13",
    title: "Artists Arrive",
    audience: "artists",
    narrative:
      "The 24 invited artists gather for orientation. The calm before the paint flies.",
  },
  {
    id: "day-sep-14",
    dayShort: "Mon · Sep 14",
    dayLong: "Monday, September 14",
    title: "The City Becomes a Canvas — Benson",
    audience: "public",
    narrative:
      "Starting today and running through Friday, artists fan out across Douglas and Sarpy Counties — painting historic neighborhoods, scenic vistas, and local landmarks. You might turn a corner and find one set up right in front of you. Stop and watch. Ask a question. That's the point. At midday, the action concentrates in Benson for the first Lunchtime Quick Paint Competition, where artists race the clock to capture a scene in front of a live audience.",
    events: [
      {
        time: "12 – 1 PM",
        name: "Quick Paint Competition",
        location: "Benson",
        address: "62nd & Maple, Omaha, NE",
      },
    ],
  },
  {
    id: "day-sep-15",
    dayShort: "Tue · Sep 15",
    dayLong: "Tuesday, September 15",
    title: "Quick Paint Moves to Dundee",
    audience: "public",
    narrative:
      "Another day of painting across the metro, with the Lunchtime Quick Paint Competition landing in the tree-lined streets of Dundee. Grab lunch nearby and stay to watch.",
    events: [
      {
        time: "12 – 1 PM",
        name: "Quick Paint Competition",
        location: "Dundee",
        address: "50th & Underwood, Omaha, NE",
      },
    ],
  },
  {
    id: "day-sep-16",
    dayShort: "Wed · Sep 16",
    dayLong: "Wednesday, September 16",
    title: "Architecture, Art, and a Little Mentorship",
    audience: "public",
    narrative:
      "The midweek Quick Paint heads to one of Omaha's most visually striking corridors — the Cathedral & Castle District, where gothic stonework and historic streetscapes give artists plenty to work with. Later in the afternoon, festival artists sit down with young painters for a mentorship session that's as much about the conversation as the craft.",
    events: [
      {
        time: "12 – 1 PM",
        name: "Quick Paint Competition",
        location: "Cathedral & Castle District",
        address: "40th St. between Cuming & Davenport, Omaha, NE",
      },
      {
        time: "4 – 5:30 PM",
        name: "Youth–Professional Artist Mentor Sessions",
      },
    ],
  },
  {
    id: "day-sep-17",
    dayShort: "Thu · Sep 17",
    dayLong: "Thursday, September 17",
    title: "An Evening Worth Staying Out For",
    audience: "public",
    narrative:
      "By day, artists continue painting across the city. By evening, the energy shifts to Ralston for one of the week's most memorable nights. Hear the festival's plein air judge speak candidly about the art form, the week's work, and what separates a good painting from a great one. Then stay for the Evening Quick Paint Competition — artists competing outdoors, under the sky, while a live concert plays around them.",
    events: [
      {
        time: "5 – 6 PM",
        name: "Artist Lecture by the Plein Air Judge",
        location: "Baright Public Library",
        address: "5555 S. 77th St., Ralston, NE",
      },
      {
        time: "6 – 8 PM",
        name: "Evening Quick Paint Competition during Concert",
        location: "Downtown Ralston",
        address: "Main St. & 77th St., Ralston, NE",
      },
    ],
  },
  {
    id: "day-sep-18",
    dayShort: "Fri · Sep 18",
    dayLong: "Friday, September 18",
    title: "The Collector's Soirée",
    audience: "ticketed",
    narrative:
      "An elegant close to the painting week. The Collector's Soirée at The Granary brings together art, music, food, and the first opportunity to acquire works from the festival's collection. Awards are announced, artists are celebrated, and the bidding begins. Tickets required.",
    events: [
      {
        time: "5 – 8 PM",
        name: "Collector's Soirée — live music, food, awards, art auction",
        location: "The Granary",
        address: "7401 Main St., Ralston, NE",
      },
    ],
  },
  {
    id: "day-sep-19",
    dayShort: "Sat · Sep 19",
    dayLong: "Saturday, September 19",
    title: "Open to Everyone",
    audience: "public",
    narrative:
      "You don't need an invitation for this one. The Public Exhibition and Auction throws open the doors so anyone can experience the full collection — every painting made during the week, displayed together for the first time. See the city through the eyes of 24 artists, then take a piece of it home.",
    events: [
      {
        time: "1 – 4 PM",
        name: "Public Exhibition and Auction",
        location: "The Granary",
        address: "7401 Main St., Ralston, NE",
      },
    ],
  },
  {
    id: "day-online",
    dayShort: "Sep 19 – Oct 2",
    dayLong: "September 19 – October 2",
    title: "Can't Make It in Person?",
    audience: "public",
    narrative:
      "Unsold works remain available for purchase online through October 2. Original, one-of-a-kind paintings of the Omaha metro — created on-site during the festival — available from wherever you are.",
  },
];

const audienceLabel: Record<Audience, string> = {
  public: "Free · Public",
  ticketed: "Tickets Required",
  artists: "Artists Only",
};

const audienceStyle: Record<Audience, string> = {
  public: "bg-primary/10 text-primary border-primary/30",
  ticketed: "bg-brand-plum/15 text-brand-plum border-brand-plum/35",
  artists: "bg-muted text-muted-foreground border-border",
};

const mapUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

// Map day.id like "day-sep-12" / "day-sep-18" to YYYYMMDD in 2026.
const dayIdToDate = (id: string): string | null => {
  const m = id.match(/^day-sep-(\d{1,2})$/);
  if (!m) return null;
  return `202609${String(m[1]).padStart(2, "0")}`;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

type EventFilter = "all" | "public" | "ticketed" | "competitions";

const EVENT_FILTERS: { value: EventFilter; label: string }[] = [
  { value: "all", label: "All Events" },
  { value: "public", label: "Free & Public" },
  { value: "ticketed", label: "Ticketed" },
  { value: "competitions", label: "Competitions" },
];

const Schedule = () => {
  const [eventFilter, setEventFilter] = useState<EventFilter>("all");

  const filteredDays = useMemo(() => {
    if (eventFilter === "public") return days.filter((d) => d.audience === "public");
    if (eventFilter === "ticketed") return days.filter((d) => d.audience === "ticketed");
    if (eventFilter === "competitions")
      return days.filter((d) =>
        d.events?.some((e) => e.name.toLowerCase().includes("competition")),
      );
    return days;
  }, [eventFilter]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Schedule | Heartland Plein Air Arts Festival";
    const cleanupMeta = setPageMeta(
      "Quick Paint competitions, the Collector's Soirée (Sep 18), and the free Public Exhibition & Auction (Sep 19) — full event schedule across the Omaha metro, September 13–19, 2026.",
    );

    const cleanupLd = addJsonLd("schedule-jsonld", {
      "@context": "https://schema.org",
      "@graph": [
        ...days
          .filter((d) => d.audience !== "artists" && d.events && d.events.length > 0)
          .flatMap((d) => {
            const date = d.id.replace("day-", "2026-").replace("sep-", "09-");
            return d.events!.map((ev) => ({
              "@type": "Event",
              name: ev.name,
              description: d.narrative,
              startDate: date,
              endDate: date,
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: ev.address
                ? { "@type": "Place", name: ev.location, address: ev.address }
                : undefined,
              isAccessibleForFree: d.audience === "public",
              organizer: { "@id": `${SITE_URL}/#organization` },
            }));
          }),
        breadcrumbSchema("Schedule", "/schedule"),
      ],
    });

    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      cleanupMeta();
      cleanupLd();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [showTopBtn, setShowTopBtn] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const weekItems = filteredDays.map((d) => {
    if (d.id === "day-online") {
      return { id: d.id, weekday: "Sep 19+", label: "Online" };
    }
    const parts = d.dayShort.split(" ");
    return { id: d.id, weekday: parts[0], date: parts[parts.length - 1] };
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <header id="main-content" tabIndex={-1} className="bg-foreground pt-44 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            September 13–19, 2026 · Omaha Metro
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-secondary md:text-6xl">
            Schedule of Events
          </h1>
        </div>
      </header>

      <CountdownBanner />

      {/* Intro */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <div className="mb-12">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Browse by day
              </p>
              <ScheduleJumpNav items={weekItems} />
            </div>
            <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/85">
              <p>
                <em className="font-display text-primary">Plein air</em> — French for "open air" — is exactly what it sounds like. No studio, no reference photos, no do-overs. Just an artist, an easel, and whatever the light is doing right now.
              </p>
              <p>
                For one week each September, 24 nationally recognized plein air artists descend on the Omaha metro to paint the neighborhoods, landmarks, and hidden corners that make this place worth capturing. Every painting is created on-site, in real time, in front of anyone who happens to wander by.
              </p>
              <p>
                All week-long painting events are <strong>free and open to the public</strong>. Artists will be working at locations throughout Douglas and Sarpy Counties — follow along on social media for daily location updates. There's no velvet rope. No admission fee. Just artists at work, and you're invited to watch.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Festival locations map */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mb-10 text-center">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Where to find us
              </p>
              <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                Festival Locations
              </h2>
              <p className="mx-auto max-w-2xl font-body text-base text-muted-foreground">
                Click any marker to see what's happening at that location and jump to the day in the schedule.
              </p>
            </div>
            <LocationsMap />
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Days */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl space-y-16 px-6">
          {/* Event type filter */}
          <div className="flex flex-wrap gap-2">
            {EVENT_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setEventFilter(f.value)}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-body text-xs font-semibold transition-colors",
                  eventFilter === f.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          {filteredDays.length === 0 && (
            <p className="text-center font-body text-sm text-muted-foreground">
              No events match this filter.
            </p>
          )}
          {filteredDays.map((d, i) => (
            <AnimatedSection key={d.id} delay={i * 60}>
              <article id={d.id} className="scroll-mt-32 rounded-lg bg-card p-8 shadow-sm md:p-10">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-3xl font-bold tracking-tight text-primary">
                    {d.dayShort}
                  </h2>
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider ${audienceStyle[d.audience]}`}
                  >
                    {audienceLabel[d.audience]}
                  </span>
                </div>
                <h3 className="mb-4 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
                  {d.title}
                </h3>
                <p className="mb-6 font-body text-base leading-relaxed text-muted-foreground">
                  {d.narrative}
                </p>
                {d.id === "day-online" && (
                  <a
                    href="#newsletter"
                    className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-body text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
                  >
                    Notify me when online sales open
                  </a>
                )}
                {d.events && d.events.length > 0 && (
                  <ul className="space-y-4 border-t border-border pt-6">
                    {d.events.map((ev) => {
                      const date = dayIdToDate(d.id);
                      const canDownload = !!date;
                      const handleAddToCalendar = () => {
                        if (!date) return;
                        const ics = buildEventIcs({
                          uid: `${d.id}-${slugify(ev.name)}`,
                          date,
                          time: ev.time,
                          name: ev.name,
                          location: ev.location,
                          address: ev.address,
                          description: d.narrative,
                        });
                        downloadIcs(`${d.id}-${slugify(ev.name)}.ics`, ics);
                      };
                      return (
                      <li key={`${d.id}-${ev.name}`} className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          {ev.time && (
                            <span className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-primary">
                              <Clock className="h-3.5 w-3.5" />
                              {ev.time}
                            </span>
                          )}
                          <span className="font-display text-base font-semibold text-foreground">
                            {ev.name}
                          </span>
                        </div>
                        {ev.location && (
                          <div className="flex items-start gap-1.5 font-body text-sm text-muted-foreground">
                            <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                            {ev.address ? (
                              <a
                                href={mapUrl(`${ev.location}, ${ev.address}`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-w-0 break-words text-primary transition-colors hover:underline"
                              >
                                {ev.location}{" "}
                                <span className="text-muted-foreground/80">({ev.address})</span>
                              </a>
                            ) : (
                              <span>{ev.location}</span>
                            )}
                          </div>
                        )}
                        {canDownload && (
                          <div className="mt-2 flex flex-col gap-0.5">
                            <button
                              type="button"
                              onClick={handleAddToCalendar}
                              title="Downloads a .ics calendar file — works with Google Calendar, Apple Calendar, and Outlook"
                              className="inline-flex w-fit items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-wide text-primary transition-all hover:bg-primary/20 hover:scale-[1.02]"
                            >
                              <CalendarPlus className="h-4 w-4" />
                              Add to calendar
                            </button>
                            <span className="font-body text-[11px] text-muted-foreground">
                              Downloads a .ics file — works with Google, Apple &amp; Outlook
                            </span>
                          </div>
                        )}
                      </li>
                      );
                    })}
                  </ul>
                )}
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <BrushStrokeDivider />

      <SiteFooter />

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${showTopBtn ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

export default Schedule;