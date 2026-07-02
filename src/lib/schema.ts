export function addJsonLd(id: string, data: object): () => void {
  document.getElementById(id)?.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
  return () => document.getElementById(id)?.remove();
}

export const SITE_URL = "https://heartlandpleinair.org";

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Ralston HINGE Creative District",
  alternateName: "Heartland Plein Air Arts Festival",
  url: SITE_URL,
  telephone: "+14025926552",
  email: "ralstoncreativedistrict@gmail.com",
  foundingDate: "2021",
  nonprofitStatus: "Nonprofit501c3",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5615 S. 77th St",
    addressLocality: "Ralston",
    addressRegion: "NE",
    postalCode: "68127",
    addressCountry: "US",
  },
  sameAs: [
    "https://ralstonarts.org",
    "https://www.facebook.com/RalstonArts",
    "https://www.instagram.com/ralstonarts",
  ],
};

export function breadcrumbSchema(label: string, path: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: label, item: `${SITE_URL}${path}` },
    ],
  };
}

import { days } from "@/data/schedule";
import { artists } from "@/data/artists";

const invitedCount = artists.length;

// Ticketed offers derived from days marked audience: "ticketed"
const ticketedDayOffers = days
  .filter((d) => d.audience === "ticketed")
  .map((d) => ({
    "@type": "Offer",
    name: `${d.title} — ${d.dayLong}`,
    description: d.narrative,
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
    url: SITE_URL,
  }));

// Ticketed offers derived from individual events tagged "(Ticketed)" within public days
const ticketedEventOffers = days
  .filter((d) => d.audience !== "ticketed")
  .flatMap((d) =>
    (d.events ?? [])
      .filter((ev) => ev.name.includes("(Ticketed)"))
      .map((ev) => ({
        "@type": "Offer",
        name: `${ev.name.replace(" (Ticketed)", "")} — ${d.dayLong}`,
        description: `Ticketed event.${ev.time ? ` ${ev.time}.` : ""}${ev.location ? ` ${ev.location}.` : ""}${ev.address ? ` ${ev.address}.` : ""}`,
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        url: SITE_URL,
      }))
  );

export const festivalEventSchema = {
  "@type": "Event",
  "@id": `${SITE_URL}/#festival`,
  name: "Heartland Plein Air Arts Festival",
  description:
    `${invitedCount} nationally recognized plein air artists paint the Omaha metro outdoors for a week, September 13–19, 2026. Daily Lunch Break Paintouts Monday–Thursday. Quick Paint Competition Saturday morning. Free Public Exhibition & Sale September 19. Collector's Soirée September 18 (ticketed).`,
  startDate: "2026-09-13",
  endDate: "2026-09-19",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  isAccessibleForFree: true,
  url: SITE_URL,
  image: `${SITE_URL}/assets/hero-pleinair.jpg`,
  location: {
    "@type": "Place",
    name: "Omaha Metro Area",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Omaha",
      addressRegion: "NE",
      addressCountry: "US",
    },
  },
  organizer: { "@id": `${SITE_URL}/#organization` },
  offers: [
    {
      "@type": "Offer",
      name: "Free Public Access",
      description: "Watch artists paint across the metro all week. Lunch Break Paintouts Monday–Thursday, 11 AM–1:30 PM. Public Exhibition & Sale on September 19 is free and open to all.",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      url: SITE_URL,
    },
    ...ticketedDayOffers,
    ...ticketedEventOffers,
  ],
  performer: {
    "@type": "PerformingGroup",
    name: "Invited Plein Air Artists",
    description: `${invitedCount} nationally recognized plein air painters selected from across the United States, plus an Open Division of up to 40 local and regional artists.`,
  },
};
