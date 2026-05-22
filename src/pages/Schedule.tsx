import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Facebook, Instagram, Youtube, MapPin, Clock, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Highlights", href: "/#highlights" },
  { label: "Schedule", href: "/schedule" },
  { label: "Artists", href: "/#artists" },
  { label: "Gallery", href: "/#gallery" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

type ScheduleEvent = {
  time?: string;
  name: string;
  location?: string;
};

type ScheduleDay = {
  day: string;
  title: string;
  narrative: string;
  events?: ScheduleEvent[];
};

const days: ScheduleDay[] = [
  {
    day: "Saturday, September 12",
    title: "It Starts with the Kids",
    narrative:
      "Before the festival officially opens, young artists get the spotlight. Local youth take their easels to Wildwood Park for a full afternoon of open-air painting — then celebrate their work that evening at the Baright Public Library. Come see what the next generation of plein air artists is made of.",
    events: [
      { time: "10 AM – 2 PM", name: "Youth Paint Out", location: "Wildwood Park (Ralston Ave. & 78th St., Ralston, NE)" },
      { time: "5 – 7 PM", name: "Youth Exhibition", location: "Baright Public Library (5555 S. 77th St., Ralston, NE)" },
    ],
  },
  {
    day: "Sunday, September 13",
    title: "Artists Arrive",
    narrative:
      "The 25 invited artists gather for orientation. The calm before the paint flies.",
  },
  {
    day: "Monday, September 14",
    title: "The City Becomes a Canvas — Benson",
    narrative:
      "Starting today and running through Friday, artists fan out across Douglas and Sarpy Counties — painting historic neighborhoods, scenic vistas, and local landmarks. You might turn a corner and find one set up right in front of you. Stop and watch. Ask a question. That's the point. At midday, the action concentrates in Benson for the first Lunchtime Quick Paint Competition, where artists race the clock to capture a scene in front of a live audience.",
    events: [
      { time: "Lunchtime", name: "Quick Paint Competition", location: "Benson (62nd & Maple, Omaha, NE)" },
    ],
  },
  {
    day: "Tuesday, September 15",
    title: "Quick Paint Moves to Dundee",
    narrative:
      "Another day of painting across the metro, with the Lunchtime Quick Paint Competition landing in the tree-lined streets of Dundee. Grab lunch nearby and stay to watch.",
    events: [
      { time: "Lunchtime", name: "Quick Paint Competition", location: "Dundee (50th & Underwood, Omaha, NE)" },
    ],
  },
  {
    day: "Wednesday, September 16",
    title: "Architecture, Art, and a Little Mentorship",
    narrative:
      "The midweek Quick Paint heads to one of Omaha's most visually striking corridors — the Cathedral & Castle District, where gothic stonework and historic streetscapes give artists plenty to work with. Later in the afternoon, festival artists sit down with young painters for a mentorship session that's as much about the conversation as the craft.",
    events: [
      { time: "Lunchtime", name: "Quick Paint Competition", location: "Cathedral & Castle District (along 40th St. between Cuming & Davenport, Omaha, NE)" },
      { time: "4 – 5:30 PM", name: "Youth–Professional Artist Mentor Sessions" },
    ],
  },
  {
    day: "Thursday, September 17",
    title: "An Evening Worth Staying Out For",
    narrative:
      "By day, artists continue painting across the city. By evening, the energy shifts to Ralston for one of the week's most memorable nights. Hear the festival's plein air judge speak candidly about the art form, the week's work, and what separates a good painting from a great one. Then stay for the Evening Quick Paint Competition — artists competing outdoors, under the sky, while a live concert plays around them.",
    events: [
      { time: "5 – 6 PM", name: "Artist Lecture by the Plein Air Judge", location: "Baright Public Library (5555 S. 77th St., Ralston, NE)" },
      { time: "6 – 8 PM", name: "Evening Quick Paint Competition during Concert", location: "Downtown Ralston (Main St. & 77th St.)" },
    ],
  },
  {
    day: "Friday, September 18",
    title: "The Collector's Soirée",
    narrative:
      "An elegant close to the painting week. The Collector's Soirée at The Granary brings together art, music, food, and the first opportunity to acquire works from the festival's collection. Awards are announced, artists are celebrated, and the bidding begins. Tickets required.",
    events: [
      { time: "5 – 8 PM", name: "Collector's Soirée — live music, food, awards ceremony, and art auction", location: "The Granary (7401 Main St., Ralston, NE)" },
    ],
  },
  {
    day: "Saturday, September 19",
    title: "Open to Everyone",
    narrative:
      "You don't need an invitation for this one. The Public Exhibition and Auction throws open the doors so anyone can experience the full collection — every painting made during the week, displayed together for the first time. See the city through the eyes of 25 artists, then take a piece of it home.",
    events: [
      { time: "1 – 4 PM", name: "Public Exhibition and Auction", location: "The Granary (7401 Main St., Ralston, NE)" },
    ],
  },
  {
    day: "September 19 – October 2",
    title: "Can't Make It in Person?",
    narrative:
      "Unsold works remain available for purchase online through October 2. Original, one-of-a-kind paintings of the Omaha metro — created on-site during the festival — available from wherever you are.",
  },
];

const Schedule = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Schedule of Events | Heartland Plein Air Arts Festival";
    const desc = "Full schedule for the Heartland Plein Air Arts Festival, September 12 – October 2, 2026 across the Omaha metro.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      e.preventDefault();
      navigate("/");
      setTimeout(() => {
        document.querySelector(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-lg font-semibold text-primary-foreground">
            Heartland Plein Air Arts Festival
          </Link>
          <div className="hidden gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={(e) => handleNav(e as unknown as React.MouseEvent<HTMLAnchorElement>, link.href)}
                className="font-body text-sm font-medium tracking-wide text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-96 border-t border-primary-foreground/10" : "max-h-0"}`}>
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={(e) => handleNav(e as unknown as React.MouseEvent<HTMLAnchorElement>, link.href)}
                className="rounded px-3 py-2 font-body text-sm font-medium tracking-wide text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Page header */}
      <header className="bg-foreground pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-display text-5xl font-bold leading-tight text-secondary md:text-6xl">
            Schedule of Events
          </h1>
        </div>
      </header>

      {/* Intro */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <div className="space-y-5 font-body text-lg leading-relaxed text-foreground/85">
              <p>
                <em className="font-display text-primary">Plein air</em> — French for "open air" — is exactly what it sounds like. No studio, no reference photos, no do-overs. Just an artist, an easel, and whatever the light is doing right now.
              </p>
              <p>
                For one week every September, 25 nationally recognized plein air artists descend on the Omaha metro to paint the neighborhoods, landmarks, and hidden corners that make this place worth capturing. Every painting is created on-site, in real time, in front of anyone who happens to wander by.
              </p>
              <p>
                All week-long painting events are <strong>free and open to the public</strong>. Artists will be working at locations throughout Douglas and Sarpy Counties — follow along on social media for daily location updates. There's no velvet rope. No admission fee. Just artists at work, and you're invited to watch.
              </p>
              <p className="font-display text-xl italic text-primary">
                Here's what's happening and when.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Days */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl space-y-16 px-6">
          {days.map((d, i) => (
            <AnimatedSection key={d.day} delay={i * 60}>
              <article className="rounded-lg bg-card p-8 shadow-sm md:p-10">
                <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {d.day}
                </p>
                <h2 className="mb-4 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
                  {d.title}
                </h2>
                <p className="mb-6 font-body text-base leading-relaxed text-muted-foreground">
                  {d.narrative}
                </p>
                {d.events && d.events.length > 0 && (
                  <ul className="space-y-4 border-t border-border pt-6">
                    {d.events.map((ev, j) => (
                      <li key={j} className="flex flex-col gap-1">
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
                          <span className="flex items-start gap-1.5 pl-0 font-body text-sm text-muted-foreground">
                            <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                            {ev.location}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Online sales CTA */}
      <section className="py-20">
        <AnimatedSection className="mx-auto max-w-2xl px-6 text-center">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Online Sales
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
            Browse from wherever you are
          </h2>
          <p className="mb-8 font-body text-base text-muted-foreground">
            Unsold works remain available online through October 2.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.ralstonarts.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-primary px-6 py-3 font-body text-sm font-semibold tracking-wide text-primary-foreground transition-all hover:opacity-90 hover:scale-105"
            >
              ralstonarts.org <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://www.heartlandpleinair.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-primary/40 px-6 py-3 font-body text-sm font-semibold tracking-wide text-primary transition-all hover:bg-primary/10 hover:scale-105"
            >
              heartlandpleinair.org <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
          <span className="font-display text-lg font-semibold text-foreground">
            Heartland Plein Air Arts Festival
          </span>
          <p className="font-body text-sm text-muted-foreground">
            September 13–19, 2026 · Douglas & Sarpy County
          </p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
          <p className="font-body text-xs text-muted-foreground/60">
            © 2026 Heartland Plein Air Arts Festival. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Schedule;