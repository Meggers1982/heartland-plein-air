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
  telephone: "+14029539173",
  email: "ralstoncreativedistrict@gmail.com",
  foundingDate: "2021",
  nonprofitStatus: "Nonprofit501c3",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5500 S 77th St",
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

export const festivalEventSchema = {
  "@type": "Event",
  "@id": `${SITE_URL}/#festival`,
  name: "Heartland Plein Air Arts Festival",
  description:
    "Nationally recognized plein air artists paint the Omaha metro outdoors for a week. Free to watch all week. Public Exhibition and Auction open to everyone September 19.",
  startDate: "2026-09-13",
  endDate: "2026-09-19",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  isAccessibleForFree: true,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
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
      description: "Watch artists paint across the metro all week. Public Exhibition & Auction on September 19 is free and open to all.",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      url: SITE_URL,
    },
    {
      "@type": "Offer",
      name: "Collector's Soirée — September 18",
      description: "Ticketed evening event with early access to purchase artwork, live music, and the awards ceremony.",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      url: SITE_URL,
    },
  ],
  performer: {
    "@type": "PerformingGroup",
    name: "Invited Plein Air Artists",
    description: "Nationally recognized plein air painters selected from across the United States.",
  },
};
