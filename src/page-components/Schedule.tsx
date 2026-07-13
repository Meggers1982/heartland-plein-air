'use client';
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Clock, CalendarPlus } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ScheduleJumpNav from "@/components/ScheduleJumpNav";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import CountdownBanner from "@/components/CountdownBanner";
import { buildEventIcs, downloadIcs } from "@/lib/ics";
import LocationsMap from "@/components/LocationsMap";
import { cn } from "@/lib/utils";
import { renderRichText } from "@/lib/richText";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { days, type Audience } from "@/data/schedule";

type EventFilter = "all" | "public" | "ticketed" | "competitions";

const EVENT_FILTERS: { value: EventFilter; label: string }[] = [
  { value: "all", label: "All Events" },
  { value: "public", label: "Free & Public" },
  { value: "ticketed", label: "Ticketed" },
  { value: "competitions", label: "Competitions" },
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

// One Event per public/ticketed day with concrete events.
const scheduleEventsSchema = days
  .filter((d) => d.audience !== "artists" && d.events && d.events.length > 0)
  .flatMap((d) =>
    d.events!.map((ev) => ({
      "@type": "Event",
      name: ev.name,
      description: d.narrative,
      startDate: d.id.replace("day-", "2026-").replace("sep-", "09-"),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: ev.address
        ? {
            "@type": "Place",
            name: ev.location,
            address: ev.address,
          }
        : undefined,
      isAccessibleForFree: d.audience === "public",
      organizer: {
        "@type": "Organization",
        name: "Heartland Plein Air Festival",
        url: "https://heartlandpleinair.org",
      },
    })),
  );

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
    document.title = "Plan Your Visit: Plein Air Festival Schedule Omaha";
    const desc =
      "Full event schedule for the Heartland Plein Air Festival — daily paint-outs, the Judge's Lecture, Collectors Preview, and the Sept. 19 public exhibition.";

    const ensureMeta = (name: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      return el;
    };
    ensureMeta("description").setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://heartlandpleinair.org/schedule");
  }, []);

  const weekItems = filteredDays.map((d) => {
    if (d.id === "day-online") {
      return { id: d.id, weekday: "Sep 19+", label: "Online" };
    }
    const parts = d.dayShort.split(" ");
    return { id: d.id, weekday: parts[0], date: parts[parts.length - 1] };
  });

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbSchema([{ name: "Schedule", path: "/schedule" }]),
            ...scheduleEventsSchema,
          ],
        }}
      />
      <SiteNav />

      <header className="bg-foreground pt-44 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
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
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Browse by day
              </p>
              <ScheduleJumpNav items={weekItems} />
            </div>
            <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/85">
              <p>
                <em className="font-display text-primary">Plein air</em> — French for "open air" — is exactly what it sounds like. No studio, no reference photos, no do-overs. Just an artist, an easel, and whatever the light is doing right now.
              </p>
              <p>
                For one week each September, 25 nationally recognized plein air artists descend on the Omaha metro to paint the neighborhoods, landmarks, and hidden corners that make this place worth capturing. Every painting is created on-site, in real time, in front of anyone who happens to wander by.
              </p>
              <p>
                All week-long painting events are <strong>free and open to the public</strong>. Artists will be working at locations throughout Douglas and Sarpy Counties — follow along on social media for daily location updates. There's no velvet rope. No admission fee. Just artists at work, and you're invited to watch.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Festival locations map */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mb-6 text-center">
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Where to find us
              </p>
              <h2 className="mb-4 font-display text-4xl font-bold text-foreground">
                Festival Locations
              </h2>
              <p className="mx-auto max-w-2xl font-body text-lg text-muted-foreground">
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
                  <p className="font-display text-2xl font-bold tracking-tight text-primary">
                    {d.dayShort}
                  </p>
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider ${audienceStyle[d.audience]}`}
                  >
                    {audienceLabel[d.audience]}
                  </span>
                </div>
                <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground">
                  {d.title}
                </h2>
                {d.logo && (
                  <div className="mb-4">
                    {d.logoUrl ? (
                      <a
                        href={d.logoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={d.logoAlt}
                        className="inline-block transition-opacity hover:opacity-80"
                      >
                        <img
                          src={d.logo}
                          alt={d.logoAlt}
                          className="max-h-12 w-auto max-w-[240px] object-contain"
                        />
                      </a>
                    ) : (
                      <img
                        src={d.logo}
                        alt={d.logoAlt}
                        className="max-h-12 w-auto max-w-[240px] object-contain"
                      />
                    )}
                  </div>
                )}
                <p className="mb-6 font-body text-lg leading-relaxed text-muted-foreground">
                  {renderRichText(d.narrative)}
                </p>
                {d.id === "day-online" && (
                  <a
                    href="#newsletter"
                    className="mb-2 inline-flex items-center gap-2 rounded bg-primary px-5 py-2.5 font-body text-sm font-semibold tracking-wide text-primary-foreground transition-all hover:opacity-90 hover:scale-105"
                  >
                    Notify me when online sales open
                  </a>
                )}
                {["day-sep-13", "day-sep-17", "day-sep-18", "day-sep-19"].includes(d.id) && (
                  <Link
                    href="/tickets"
                    className="mb-6 inline-block font-body text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
                  >
                    Included in the Collector VIP Pass →
                  </Link>
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
                                className="transition-colors hover:text-primary hover:underline"
                              >
                                {ev.location}{" "}
                                <span className="text-muted-foreground/90">({ev.address})</span>
                              </a>
                            ) : (
                              <span>{ev.location}</span>
                            )}
                          </div>
                        )}
                        {canDownload && (
                          <button
                            type="button"
                            onClick={handleAddToCalendar}
                            className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-wide text-primary transition-all hover:bg-primary/20 hover:scale-[1.02]"
                          >
                            <CalendarPlus className="h-4 w-4" />
                            Add to calendar
                          </button>
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

      <NewsletterCTA />

      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default Schedule;