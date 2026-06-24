'use client';
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import BackToTop from "@/components/BackToTop";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string[] };
type FaqCategory = { id: string; title: string; items: FaqItem[] };

const categories: FaqCategory[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        q: "What is plein air painting?",
        a: [
          'Plein air is a French term meaning "open air," and the practice is exactly what it sounds like: artists painting outside, directly from life, rather than working from photos or references back in a studio. The goal is to capture a place as it actually exists in a given moment — the quality of the light, the atmosphere, the movement, the feeling of being there.',
          "The tradition goes back to the 19th century and was central to the Impressionist movement. Artists like Monet and Renoir built their careers on it. Working outdoors means working quickly — a plein air piece is often completed within an hour or two before the light shifts — so the paintings tend to have an energy and immediacy that studio work can't quite replicate. Every painting is a one-of-a-kind record of a specific place at a specific moment in time.",
        ],
      },
      {
        q: "Where will the artists be painting?",
        a: [
          "Artists will paint freely across the Omaha Metro throughout the festival week, choosing their own locations each day. There are several scheduled events where you're guaranteed to find artists in action. Lunch Break Paintouts take place Monday through Thursday (11 AM–1:30 PM) — Downtown Ralston on September 14, the Castle & Cathedral Creative District on September 15, Benson on September 16, and Dundee on September 17. These are open painting sessions, not competitions, where artists work in a defined area and the public is welcome to watch. On Saturday, September 19, the Quick Paint Competition runs 9–11 AM within the Ralston Hinge Creative District boundary.",
          "Beyond those events, artists may paint anywhere that inspires them. Suggested locations include Lauritzen Gardens, the Old Market, the Riverfront, Memorial Park, Fort Omaha, Neale Woods, the Bob Kerrey Pedestrian Bridge, Elmwood Park Grotto, Fontenelle Forest, Schramm State Park, Chalco Hills, Boystown, and Ralston's Oak Park.",
        ],
      },
      {
        q: "Can I watch the artists paint?",
        a: [
          "The public is welcome to observe artists at work throughout the entire festival week. The daily Lunch Break Paintouts (Monday–Thursday, 11 AM–1:30 PM) are open painting sessions — easy to find, casual to watch. On Saturday morning, the Quick Paint Competition (9–11 AM) brings all participating artists into the Ralston Hinge Creative District simultaneously, racing a two-hour clock to complete a finished painting from scratch. It's one of the most exciting things to witness at any plein air festival.",
        ],
      },
      {
        q: "What should I expect when approaching an artist?",
        a: [
          "Talking to the artists is encouraged — it's part of what makes plein air festivals different from a traditional gallery show. Most painters are happy to answer questions about what they're working on, what they're looking at, and how they're reading the light.",
          "A few things to keep in mind: give them a bit of space while they're actively painting, since shadows and position can matter. Wait for a natural pause if they seem deep in concentration. But don't be shy — the artists are out in public by choice, and most of them genuinely enjoy the conversation.",
        ],
      },
      {
        q: "Is there an admission fee?",
        a: [
          "Watching artists paint throughout the week at outdoor locations across the metro is completely free, as is the Public Exhibition & Sale on September 19. The Collector's Soirée on September 18 and the Judge's Lecture on September 17 are ticketed events — sign up for the newsletter in the footer to be notified when tickets go on sale.",
        ],
      },
    ],
  },
  {
    id: "artists-events",
    title: "Artists & Events",
    items: [
      {
        q: "How many artists participate in the festival?",
        a: [
          "The inaugural Heartland Plein Air Festival brings together 24 nationally acclaimed invited artists, plus Awards Judge Rick J. Delanty. The festival also includes an Open Division with up to 40 additional artists who apply through the website, for a total of up to 64 participating artists.",
        ],
      },
      {
        q: "Are the artists juried or selected through an application process?",
        a: [
          "The festival runs two separate tracks. The featured artists were personally invited by the festival organizers — they're nationally recognized painters selected for the Invitational Division. A separate Open Division is available to additional artists through an application process. Check back to find application details closer to the event.",
        ],
      },
      {
        q: "What mediums do the artists use?",
        a: [
          "Plein air artists work in a range of mediums, and the Heartland Plein Air Festival doesn't restrict artists to a single one. Oil paint is the classic choice — it's what Monet and Renoir used, and it's still the most popular medium for capturing the nuances of light and atmosphere outdoors.",
          "Watercolor is another longtime favorite, valued for its portability and the spontaneous quality it brings to outdoor work. Pastel is widely used for its speed and brilliant, unmixed color. Acrylic is a more recent addition, drying quickly and working well in a range of conditions. Expect to see a mix across the festival's participating artists.",
        ],
      },
      {
        q: "How long do artists have to complete their paintings?",
        a: [
          "The only time restriction is the two-hour Quick Paint Competition on Saturday morning (9–11 AM, September 19). Otherwise, although artists typically spend two to three hours on a piece, they are free to spend as much time as they need to complete it to their satisfaction — sometimes going back for a second session if necessary.",
        ],
      },
      {
        q: "Are the paintings created during the festival?",
        a: [
          "Every painting exhibited and sold at Heartland Plein Air will be created on-site during the festival week, September 13–19, 2026. Artists paint directly from life at locations across the Omaha Metro — nothing is brought from home or finished in a studio beforehand.",
        ],
      },
      {
        q: "Will there be artist demonstrations or workshops?",
        a: [
          "Education is woven into the festival. Before the festival officially opens, a Youth Paintout runs September 12 at Wildwood Park (10 AM–Noon), followed by the Youth Art Show Reception that evening at the Baright Library (6–7:30 PM).",
          "On September 16, private mentorship sessions connect preselected youth participants with the festival's invited professional artists (4–5:30 PM) — this is not a public event. On September 17, Festival Awards Judge Rick J. Delanty will present a lecture on Impressionism and Plein Air at the Baright Public Library (5555 S. 77th Street, Ralston) from 5–6 PM — ticketed due to space limitations.",
          "The Lunch Break Paintouts (Monday–Thursday, 11 AM–1:30 PM) and the Thursday night paintout during the concert in Ralston give the public the opportunity to observe and learn from the artists as they paint.",
        ],
      },
      {
        q: "What is a Quick Paint Competition?",
        a: [
          "A Quick Paint is a timed painting competition where all participating artists work simultaneously in an area with specific boundaries — in this case, within the Ralston Hinge Creative District boundary — starting at the same moment and stopping when the clock runs out. Artists have just two hours to produce a finished painting from scratch, outdoors, in front of anyone who happens to be watching.",
          "It's one of the most compelling things you can witness at a plein air festival. Watching a blank canvas become a complete painting in real time, under pressure, in changing light, is genuinely exciting — and you get to see many painters working in fairly close proximity, observing how each approaches their subjects using different mediums and techniques. Upon completion, the artists frame their pieces and bring them to be auctioned off in a live auction!",
          "The Quick Paint competition will be from 9 AM to 11 AM on Saturday morning, September 19th, in Ralston in the area between 72nd St and 77th St, Main St to Burlington St. The live auction of these fresh paintings will be held from noon to 1 PM at Granary Green, 74th and Main St.",
        ],
      },
      {
        q: "Are there awards or competitions during the festival?",
        a: [
          "The festival offers over $10,000 in awards, with awards for both the invited artists and the open division artists. The awards ceremony will be held during the Collector's Soirée on September 18.",
          "The awards judge is Rick J. Delanty from San Clemente, California — a nationally recognized, award-winning master artist with signature memberships in AIS, OPA, LPAPA, and ASMA, and recognized as an ARC Salon Living Master.",
        ],
      },
      {
        q: "Can children or beginner artists participate?",
        a: [
          "Young artists are genuinely central to this festival. A Youth Paintout takes place September 12 at Wildwood Park, with the Youth Art Show Reception that same evening at the Baright Library. On September 16, preselected youth participate in private mentorship sessions with the festival's invited professional artists.",
          "The Open Division of the festival competition is open to local and regional artists who have some experience painting — it is not intended as a beginner track. For those new to plein air, the festival offers a wonderful opportunity to observe professional artists at work throughout the week and learn by watching.",
        ],
      },
    ],
  },
  {
    id: "visitors",
    title: "For Visitors",
    items: [
      {
        q: "What are the best locations to see artists painting?",
        a: [
          "The Lunch Break Paintouts are the most reliable option for finding artists mid-painting — Downtown Ralston (Sep 14), Castle & Cathedral Creative District (Sep 15), Benson (Sep 16), and Dundee (Sep 17), all 11 AM–1:30 PM. On Saturday, the Quick Paint Competition (Sep 19, 9–11 AM) brings all participating artists into the Ralston Hinge Creative District simultaneously.",
          "Outside of those events, artists paint freely across the metro, so sightings are more spontaneous. A map of locations and suggested painting areas is available on the Schedule page.",
        ],
      },
      {
        q: "What days and times is the festival open?",
        a: [
          "The festival runs September 13–19, 2026, with a pre-festival youth day on September 12. Key public events include:",
          "September 12 — Youth Paintout at Wildwood Park (10 AM–Noon) and Youth Art Show Reception at Baright Library (6–7:30 PM). September 14–17 — Daily Lunch Break Paintouts: Downtown Ralston (Sep 14), Castle & Cathedral District (Sep 15), Benson (Sep 16), Dundee (Sep 17), all 11 AM–1:30 PM. September 16 — Private Youth Mentorship Sessions, preselected participants only (4–5:30 PM).",
          "September 17 — Judge's Lecture: Impressionism & Plein Air at Baright Library (5–6 PM, ticketed); Third Thursday concert with artists painting downtown (6–8 PM, free). September 18 — Collector's Soirée at the Granary, Ralston (5:30–8 PM, ticketed). September 19 — Quick Paint Competition (9–11 AM, Ralston Hinge Creative District); Public Exhibition & Sale at the Granary (11 AM–5 PM, free); Live Auction of Quick Paint Pieces at Granary Green (Noon–1 PM). September 19–October 2 — Online art sale.",
        ],
      },
      {
        q: "Is the festival family-friendly?",
        a: [
          "The Heartland Plein Air Festival is welcoming to all ages. Two dedicated youth events take place: the Youth Paintout on Saturday, September 12 at Wildwood Park (10 AM–Noon, pre-registration required) and private mentorship sessions for preselected youth on Wednesday, September 16. The Youth Art Show Reception at the Baright Library on the evening of September 12 is open to everyone. The Public Exhibition & Sale on September 19 is free, and watching artists paint at outdoor locations across the metro is a casual, come-and-go experience that works well for families.",
        ],
      },
      {
        q: "Is there parking at event locations and the Granary?",
        a: [
          "The Lunch Break Paintout locations — Downtown Ralston, the Castle & Cathedral Creative District, Benson, and Dundee — all have street parking available nearby. The Quick Paint Competition on September 19 is held in Downtown Ralston at the Hinge Creative District, with the same street parking options.",
          "The Granary, which hosts the Collector's Soirée and Public Exhibition at 7401 Main Street in Ralston, has parking on site.",
        ],
      },
      {
        q: "Are the venues accessible?",
        a: [
          "The outdoor painting locations across the metro vary in terrain — parks, sidewalks, and urban streetscapes — and accessibility will differ by site. The Granary at 7401 Main Street in Ralston hosts both the Collector's Soirée and Public Exhibition.",
          "For specific accessibility questions about any venue, reach out to the festival organizers at ralstoncreativedistrict@gmail.com and we'll do our best to help you plan your visit.",
        ],
      },
      {
        q: "Will food or drinks be available?",
        a: [
          "The Collector's Soirée on September 18 includes catering and entertainment as part of the ticketed event at the Granary. Food and drink availability at Lunch Break Paintout locations and the Public Exhibition has not yet been confirmed — follow us on social media for updates closer to the event.",
        ],
      },
      {
        q: "Is there a map of artist painting locations?",
        a: [
          "A map of Lunch Break Paintout locations, the Quick Paint Competition site, and suggested painting locations across the metro is available on the Schedule page.",
        ],
      },
    ],
  },
  {
    id: "purchasing",
    title: "Buying the Art",
    items: [
      {
        q: "How do I get tickets to the Collector's Soirée?",
        a: [
          "Ticket details and pricing for the Collector's Soirée on September 18 will be announced closer to the event. Sign up for the newsletter in the footer to be notified when tickets go on sale.",
        ],
      },
      {
        q: "How can I purchase a painting?",
        a: [
          "Paintings are available for purchase at two events: the Collector's Soirée on September 18 (5:30–8 PM at the Granary, 7401 Main Street, Ralston) and the Public Exhibition on September 19 (11 AM–5 PM, also at the Granary). Works at both events are sold at the artist's listed price. The Soirée is ticketed; the Public Exhibition is free.",
          "For anyone unable to attend in person, an online sale of remaining artworks runs from September 19 through October 2 at HeartlandPleinAir.org and RalstonArts.org.",
        ],
      },
      {
        q: "How much do the paintings typically cost?",
        a: [
          "Pricing is set by each individual artist and won't be published in advance. Works are sold at the artist's listed price at both the Collector's Soirée and the Public Exhibition & Sale. Plein air paintings are generally considered more accessible than comparable gallery work, which is part of what makes festival exhibitions such a good opportunity for collectors at any level.",
        ],
      },
      {
        q: "Can I purchase artwork before the final exhibition?",
        a: [
          "The Collector's Soirée on September 18 — the evening before the Public Exhibition — is the earliest opportunity to purchase artwork. Works are not available for sale earlier in the festival week. Artists will not be able to sell their work directly off their easels prior to the exhibition.",
        ],
      },
      {
        q: "How does the online sale work?",
        a: [
          "Following the Public Exhibition on September 19, any paintings that remain available will move to an online sale running through October 2. The sale will be accessible through HeartlandPleinAir.org and RalstonArts.org.",
          "Details on how to browse available works and complete a purchase will be published closer to the event. Sign up for the newsletter in the footer to be notified when the online sale opens.",
        ],
      },
    ],
  },
  {
    id: "community",
    title: "Community & Sponsorship",
    items: [
      {
        q: "How can local businesses support the festival?",
        a: [
          "Sponsorship opportunities are available for businesses that want to be part of the inaugural Heartland Plein Air Festival. Current partners include the Benson Creative District, Historic Dundee Creative District, Castle & Cathedral Creative District, Visit Nebraska, the Wiebe Ralston Foundation, Nebraska Arts Council, and the Nebraska Cultural Endowment.",
          "For information on sponsorship levels and benefits, contact the Ralston HINGE Creative District directly.",
        ],
      },
      {
        q: "Are volunteer opportunities available?",
        a: [
          "Volunteers are being recruited to support the festival across a range of roles. Reach out through the Contact page and we'll get you connected to the right person.",
        ],
      },
      {
        q: "How can I become a festival sponsor?",
        a: [
          "Sponsorship inquiries can be submitted through the Contact page. For a direct conversation, reach City Administrator Jack Cheloha at 402.331.6677 or jcheloha@cityofralston.com.",
        ],
      },
      {
        q: "Does the festival partner with local nonprofits or schools?",
        a: [
          "We are working with local nonprofits FosterLove and Healing Ribbons, as well as the local public schools, to provide selected youth they serve with the opportunity to have a mentor session with one of the invited professional artists. Each youth will receive a plein air kit to keep and create with.",
          "Our youth paintout participants will be youth from the area schools and community. Each of those youth will also receive a plein air kit to keep and create with at home.",
        ],
      },
      {
        q: "How does the festival support the local arts community?",
        a: [
          "The Heartland Plein Air Festival was established specifically to use the arts as an economic driver for the Ralston and Omaha Metro region. Supported in part by a Nebraska Arts Council Creative District Development Grant, the festival is designed to attract visitors, generate economic activity, and put Ralston on the national map as an arts destination.",
          "The funds generated from the festival will help the RHCD to fund additional arts projects and programming throughout the year in all arts disciplines. The open division of the festival competition is open to local and regional artists, helping them gain important experience and exposure for their work.",
        ],
      },
    ],
  },
];

const Faq = () => {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(categories[0].id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (i) =>
            i.q.toLowerCase().includes(q) ||
            i.a.some((p) => p.toLowerCase().includes(q)),
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [query]);

  useEffect(() => {
    const handler = () => {
      const offset = 160;
      let current = filtered[0]?.id ?? "";
      for (const c of filtered) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= offset) current = c.id;
      }
      if (current) setActiveId(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [filtered]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const totalCount = categories.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary/10 pt-44 pb-24">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Help Center
            </p>
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-foreground md:text-6xl">
              Everything You Need to Know Before You Go
            </h1>
            <p className="mx-auto mb-8 max-w-2xl font-body text-lg font-light leading-relaxed text-muted-foreground">
              From registration and judging to paint-outs and prizes — find answers to the most common questions about the Heartland Plein Air Festival, or browse by topic below.
            </p>
            <div className="relative mx-auto max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions… (e.g. tickets, parking, kids)"
                className="h-14 rounded-full border-2 border-border bg-background pl-12 pr-5 font-body text-base shadow-sm focus-visible:ring-primary"
              />
            </div>
            <div className="mt-8">
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Browse by topic
              </p>
              <nav className="flex flex-wrap justify-center gap-2">
                {filtered.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => scrollTo(c.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 font-body text-sm transition-colors",
                      activeId === c.id
                        ? "border-primary/40 bg-primary/10 font-semibold text-primary"
                        : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {c.title}
                    <span className="ml-2 text-xs opacity-60">{c.items.length}</span>
                  </button>
                ))}
              </nav>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />

      {/* Body */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="min-w-0">
            {filtered.length === 0 && (
              <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
                <p className="font-display text-lg text-foreground">
                  No results for "{query}"
                </p>
                <p className="mt-2 font-body text-sm text-muted-foreground">
                  Try a different keyword, or clear your search to browse all topics.
                </p>
              </div>
            )}

            {filtered.map((c, idx) => (
              <AnimatedSection key={c.id} delay={idx * 50}>
                <div id={c.id} className="mb-14 scroll-mt-28">
                  <h2 className="mb-6 font-display text-3xl font-bold text-foreground md:text-4xl">
                    {c.title}
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {c.items.map((item, i) => (
                      <AccordionItem key={i} value={`${c.id}-${i}`}>
                        <AccordionTrigger className="font-display text-lg font-semibold text-foreground text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="font-body text-base leading-relaxed text-muted-foreground space-y-4">
                          {item.a.map((paragraph, pi) => (
                            <p key={pi}>{paragraph}</p>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div id="contact">
        <NewsletterCTA />
      </div>

      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default Faq;
