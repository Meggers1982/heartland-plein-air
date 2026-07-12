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

import { artists } from "@/data/artists";

const invitedCount = artists.length;

const ticketOffers = [
  {
    "@type": "Offer",
    name: "Collector VIP Pass",
    description:
      "Includes a private artist Meet & Greet (Sep 13), priority seating at the Judge's Lecture (Sep 17), the Collectors Preview Reception and Awards Presentation (Sep 18), and priority seating at the live auction (Sep 19).",
    price: "125",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
    url: "https://app.gopassage.com/events/heartland-plein-air-festival-vip",
  },
  {
    "@type": "Offer",
    name: "Judge's Lecture Ticket",
    description:
      "Standalone ticket to \"Introduction to Impressionism,\" presented by Judge of Awards and Master Artist Rick J. Delanty, September 17 at the Baright Public Library.",
    price: "25",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
    url: "https://app.gopassage.com/events/heartland-plein-air-festival-lecture-with-delanty",
  },
];

export const festivalEventSchema = {
  "@type": "Event",
  "@id": `${SITE_URL}/#festival`,
  name: "Heartland Plein Air Arts Festival",
  description:
    `${invitedCount} nationally recognized plein air artists paint the Omaha metro outdoors for a week, September 13–19, 2026. Daily Lunch Break Paintouts Monday–Thursday. Quick Paint Competition Saturday morning. Free Public Exhibition & Sale September 19. Collector VIP Pass ($125) includes the Collectors Preview Reception and Awards Presentation September 18.`,
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
    ...ticketOffers,
  ],
  performer: {
    "@type": "PerformingGroup",
    name: "Invited Plein Air Artists",
    description: `${invitedCount} nationally recognized plein air painters selected from across the United States, plus an Open Division of up to 40 local and regional artists.`,
  },
};
