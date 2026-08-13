// One-off, re-runnable content migration from src/data/*.ts into Sanity.
// Deterministic _ids + createOrReplace make every section safe to re-run,
// but re-running after the *source* data has changed will overwrite whatever
// edits were made directly in Studio for that document — treat this as a
// one-time seed per type, not a sync script.
//
// Usage: set -a && source .env.local && set +a && node scripts/migrate-to-sanity.mjs [section...]
// With no section args, every section below runs. Pass one or more section
// names (e.g. `node scripts/migrate-to-sanity.mjs sponsors`) to run a subset.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const client = createClient({
  projectId: requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: requireEnv("NEXT_PUBLIC_SANITY_DATASET"),
  token: requireEnv("SANITY_API_WRITE_TOKEN"),
  apiVersion: "2024-01-01",
  useCdn: false,
});

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}. Did you \`source .env.local\`?`);
  }
  return value;
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Mirrors src/lib/richText.tsx's LINK_PATTERN exactly, so the migrated
// Portable Text renders identically to what renderRichText() produced.
const LINK_PATTERN = /\[([^\]]+)\]\(((?:\/|https?:\/\/)[^)]+)\)/g;

function textToPortableTextBlock(text, key) {
  const children = [];
  const markDefs = [];
  let lastIndex = 0;
  let match;
  let markIndex = 0;
  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text))) {
    if (match.index > lastIndex) {
      children.push({ _type: "span", _key: `${key}-s${children.length}`, text: text.slice(lastIndex, match.index), marks: [] });
    }
    const [, label, href] = match;
    const markKey = `${key}-link${markIndex++}`;
    markDefs.push({ _type: "link", _key: markKey, href });
    children.push({ _type: "span", _key: `${key}-s${children.length}`, text: label, marks: [markKey] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    children.push({ _type: "span", _key: `${key}-s${children.length}`, text: text.slice(lastIndex), marks: [] });
  }
  return { _type: "block", _key: key, style: "normal", markDefs, children };
}

function markdownBracketsToPortableText(text) {
  return [textToPortableTextBlock(text, "b0")];
}

function paragraphsToPortableText(paragraphs) {
  return paragraphs.map((p, i) => textToPortableTextBlock(p, `b${i}`));
}

const assetCache = new Map();

async function uploadImageAsset(localPublicPath) {
  if (assetCache.has(localPublicPath)) return assetCache.get(localPublicPath);
  const absPath = path.join(REPO_ROOT, "public", localPublicPath);
  const asset = await client.assets.upload("image", fs.createReadStream(absPath), {
    filename: path.basename(absPath),
  });
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  assetCache.set(localPublicPath, ref);
  return ref;
}

// ---------------------------------------------------------------------------
// openDivisionQuickFact — handled interactively in Phase 2, no script needed.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// sponsorTier + sponsor (Phase 3)
// ---------------------------------------------------------------------------

const SPONSOR_TIERS = [
  {
    slug: "titanium",
    name: "Titanium",
    price: "$5,000 and over",
    min: 5000,
    icon: "Crown",
    benefits: [
      "Full-page ad in the festival catalog",
      "Logo on banners, ads, and website",
      "Three Collector's VIP Packages",
    ],
  },
  {
    slug: "platinum",
    name: "Platinum",
    price: "$2,500 to $4,999",
    min: 2500,
    icon: "Gem",
    benefits: [
      "Full-page ad in the festival catalog",
      "Logo on banners, ads, and website",
      "Two Collector's VIP Packages",
    ],
  },
  {
    slug: "gold",
    name: "Gold",
    price: "$1,000 to $2,499",
    min: 1000,
    icon: "Award",
    benefits: [
      "Half-page ad in the festival catalog",
      "Logo on banners, ads, and website",
      "One Collector's VIP Package",
    ],
  },
  {
    slug: "silver",
    name: "Silver",
    price: "$500 to $999",
    min: 500,
    icon: "Medal",
    benefits: ["Quarter-page ad in the festival catalog", "Logo on website", "Name on banner"],
    nameOnly: false,
  },
  {
    slug: "bronze",
    name: "Bronze",
    price: "$250 to $499",
    min: 250,
    icon: "Star",
    benefits: ["Name listed in the festival catalog", "Name listed on website"],
    nameOnly: true,
  },
  {
    slug: "friend-of-the-district",
    name: "Friend of the District",
    price: "$100 to $249",
    min: 100,
    icon: "Heart",
    benefits: ["Name listed on website"],
  },
];

const FUNDERS = [
  {
    name: "Plein Air Magazine",
    logo: "/assets/plein-air-magazine-logo.png",
    alt: "pleinair magazine logo",
    url: "https://pleinairmagazine.com/",
    hideFromPartnersGrid: true,
  },
  {
    name: "Art of the West",
    logo: "/assets/art-of-the-west-logo.png",
    alt: "art of the west magazine logo",
    url: "https://aotw.com/",
    hideFromPartnersGrid: true,
  },
  {
    name: "Visit Nebraska",
    logo: "/assets/visit-nebraska-logo.png",
    alt: "visit nebraska logo with state outline",
    url: "https://visitnebraska.com/",
  },
  {
    name: "Wiebe Ralston Foundation",
    logo: "/assets/wiebe-ralston-foundation-logo.png",
    alt: "wiebe ralston foundation logo with state outline",
  },
  {
    name: "Ralston Archives Museum",
    logo: "/assets/ralston-archives-museum-logo.png",
    alt: "frank & velma johnson ralston archives museum logo",
    url: "https://www.ralstonarchivesmuseum.com/",
  },
  {
    name: "Nebraska Arts Council / Nebraska Cultural Endowment",
    logo: "/assets/nebraska-arts-council-logo.png",
    alt: "nebraska arts council and nebraska cultural endowment logos",
    url: "https://www.artscouncil.nebraska.gov/",
  },
  {
    name: "Sherwood Foundation",
    logo: "/assets/sherwood-foundation-logo.png",
    alt: "the sherwood foundation logo with oak tree",
    url: "https://sherwoodfoundation.org/",
  },
];

const SPONSOR_LEVELS = [
  {
    tierSlug: "platinum",
    sponsors: [
      {
        name: "Art of the West",
        logo: "/assets/art-of-the-west-logo.png",
        alt: "art of the west magazine logo",
        url: "https://aotw.com/",
      },
      {
        name: "Ralston Keno",
        logo: "/assets/sponsors/ralston-keno.webp",
        alt: "ralston keno logo",
        url: "https://www.ralstonkeno.com/",
      },
    ],
  },
  {
    tierSlug: "gold",
    sponsors: [
      {
        name: "United Seeds",
        logo: "/assets/sponsors/united-seeds-inc.webp",
        alt: "united seeds inc logo",
        url: "https://unitedseeds.com/",
      },
      {
        name: "JEO",
        logo: "/assets/sponsors/jeo-consulting-group.webp",
        alt: "jeo consulting group logo",
        url: "https://jeo.com/",
      },
      {
        name: "E&A Consulting",
        logo: "/assets/sponsors/ea-consulting-group.webp",
        alt: "e&a consulting group logo",
        url: "https://eacg.com/",
      },
      {
        name: "King Kong",
        logo: "/assets/sponsors/king-kong.webp",
        alt: "king kong restaurants logo",
        url: "https://www.kingkongrestaurants.com/",
      },
    ],
  },
  {
    tierSlug: "silver",
    sponsors: [
      {
        name: "Edward Jones — Jim Goodman",
        logo: "/assets/sponsors/edward-jones.webp",
        alt: "edward jones logo",
        url: "https://www.edwardjones.com/us-en/financial-advisor/jim-goodman",
      },
      {
        name: "Agave Azteca / Pancake Cafe",
        logo: "/assets/sponsors/pancake-cafe.webp",
        alt: "agave azteca and pancake cafe logo",
        url: "https://agaveazteca.com/",
      },
      {
        name: "Tanners Bar & Grill",
        logo: "/assets/sponsors/tanners-bar-and-grill.webp",
        alt: "tanners bar & grill logo",
        url: "https://tannersbarandgrill.com/",
      },
      {
        name: "Dayspring Bank",
        logo: "/assets/sponsors/dayspring-bank.webp",
        alt: "dayspring bank logo",
        url: "https://www.dayspring.bank/",
      },
      {
        name: "Pivot at the Hinge",
        url: "https://www.ralstoneconomicdevelopment.org/projects",
      },
      {
        name: "Jensen Gardens",
        logo: "/assets/sponsors/jensen-gardens.webp",
        alt: "jensen gardens logo",
        url: "https://www.jensengardens.com/",
      },
      {
        name: "PJ Morgan — Ryan Ellis",
        logo: "/assets/sponsors/pj-morgan.webp",
        alt: "pj morgan real estate logo",
        url: "https://pjmorgan.com/team-member/ryan-ellis/",
      },
      {
        name: "Benson Creative District",
        logo: "/assets/benson-creative-district-logo.png",
        alt: "benson creative district logo",
        url: "https://www.bensoncreativedistrict.org/",
      },
      {
        name: "eCreamery",
        logo: "/assets/sponsors/ecreamery.webp",
        alt: "ecreamery ice cream logo",
        url: "https://ecreamery.com/",
      },
      {
        name: "Debra Joy Groesser Fine Art",
        logo: "/assets/sponsors/debra-joy-groesser-fine-art.webp",
        alt: "debra joy groesser fine art logo",
        url: "https://www.debrajoygroesserfineart.com/",
      },
      {
        name: "South O Roofing",
        logo: "/assets/sponsors/south-o-roofing.webp",
        alt: "south o roofing logo",
        url: "https://southoroofing.com/",
      },
      {
        name: "Lovely Brew Co.",
        logo: "/assets/sponsors/lovely-brew-co.webp",
        alt: "lovely brew co. logo",
        url: "https://www.lovelybrewco.com/",
      },
    ],
  },
  {
    tierSlug: "bronze",
    sponsors: [
      { name: "John L. Hoich Foundation" },
      { name: "Embris Group", url: "https://www.embris.com/" },
    ],
  },
];

async function migrateSponsors() {
  console.log("Uploading sponsor tier + sponsor documents...");

  const tierIdBySlug = new Map(SPONSOR_TIERS.map((t) => [t.slug, `sponsorTier-${t.slug}`]));

  for (const [i, tier] of SPONSOR_TIERS.entries()) {
    await client.createOrReplace({
      _id: tierIdBySlug.get(tier.slug),
      _type: "sponsorTier",
      name: tier.name,
      price: tier.price,
      min: tier.min,
      icon: tier.icon,
      benefits: tier.benefits,
      nameOnly: Boolean(tier.nameOnly),
      orderRank: `a${i}`,
    });
    console.log(`  sponsorTier: ${tier.name}`);
  }

  for (const [i, funder] of FUNDERS.entries()) {
    const logo = funder.logo ? await uploadImageAsset(funder.logo) : undefined;
    await client.createOrReplace({
      _id: `sponsor-${slugify(funder.name)}`,
      _type: "sponsor",
      name: funder.name,
      ...(logo && { logo }),
      ...(funder.alt && { alt: funder.alt }),
      ...(funder.url && { url: funder.url }),
      hideFromPartnersGrid: Boolean(funder.hideFromPartnersGrid),
      orderRank: `a${i}`,
    });
    console.log(`  sponsor (funder): ${funder.name}`);
  }

  for (const level of SPONSOR_LEVELS) {
    const tierId = tierIdBySlug.get(level.tierSlug);
    if (!tierId) {
      console.warn(`  WARNING: no sponsorTier matches tierSlug "${level.tierSlug}"`);
      continue;
    }
    for (const [i, sponsor] of level.sponsors.entries()) {
      const logo = sponsor.logo ? await uploadImageAsset(sponsor.logo) : undefined;
      await client.createOrReplace({
        _id: `sponsor-${level.tierSlug}-${slugify(sponsor.name)}`,
        _type: "sponsor",
        name: sponsor.name,
        ...(logo && { logo }),
        ...(sponsor.alt && { alt: sponsor.alt }),
        ...(sponsor.url && { url: sponsor.url }),
        tier: { _type: "reference", _ref: tierId },
        orderRank: `a${i}`,
      });
      console.log(`  sponsor (${level.tierSlug}): ${sponsor.name}`);
    }
  }
}

// ---------------------------------------------------------------------------
// scheduleDay + homepageHighlight + festivalLocation (Phase 3)
// ---------------------------------------------------------------------------

// scheduleDay _id is the bare dayId string (not "scheduleDay-<dayId>") on
// purpose: the frontend has several places that depend on the exact literal
// ("day-sep-12", "day-online", ...) for anchors and regex matching, and
// reusing it directly as the document _id avoids carrying a duplicate field
// just to hold the same string.
const SCHEDULE_DAYS = [
  {
    id: "day-sep-12",
    dayShort: "Sat · Sep 12",
    dayLong: "Saturday, September 12",
    title: "It Starts with the Kids",
    audience: "public",
    narrative:
      "Before the festival officially opens, young artists get the spotlight. Local youth take their easels to Wildewood Park for a morning of open-air painting — then celebrate their work at the Youth Art Show Reception that evening at the Baright Public Library.",
    events: [
      { time: "10 AM – Noon", name: "Youth Paintout", location: "Wildewood Park", address: "8000 Ralston Ave., Ralston, NE" },
      { time: "Noon – 5 PM", name: "Artwork Framing & Hanging — Not Open to the Public" },
      {
        time: "5 – 6:30 PM",
        name: "Youth Art Show Reception",
        location: "Baright Public Library",
        address: "5555 S. 77th St., Ralston, NE",
        sponsor: "Applewood Hy-Vee",
        sponsorLogo: "/assets/sponsors/hy-vee.webp",
        sponsorAlt: "hy-vee logo",
        sponsorUrl: "https://www.hy-vee.com/",
      },
    ],
  },
  {
    id: "day-sep-13",
    dayShort: "Sun · Sep 13",
    dayLong: "Sunday, September 13",
    title: "Artists Arrive",
    audience: "artists",
    narrative: "The invited artists gather for check-in, canvas stamping, and orientation. The calm before the paint flies.",
    events: [
      { time: "3 PM", name: "Artist Check-In, Canvas Stamping & Orientation" },
      { time: "4 – 5:30 PM", name: "Artist Meet & Greet" },
    ],
  },
  {
    id: "day-sep-14",
    dayShort: "Mon · Sep 14",
    dayLong: "Monday, September 14",
    title: "The City Becomes a Canvas",
    audience: "public",
    logo: "/assets/hinge-creative-district-logo.png",
    logoAlt: "ralston hinge creative district logo",
    narrative:
      "Starting today and running through Friday, artists fan out across Douglas and Sarpy Counties — painting historic neighborhoods, scenic vistas, and local landmarks. You might turn a corner and find one set up right in front of you. Stop and watch. Ask a question. That's the point. At midday, the action kicks off in Downtown Ralston's Hinge Creative District for the first Lunch Break Paintout.",
    events: [
      {
        time: "11 AM – 1:30 PM",
        name: "Lunch Break Paintout",
        location: "Downtown Ralston / Hinge Creative District",
        address: "Main St. & 77th St., Ralston, NE",
        spots: [
          { name: "Wildewood Park", address: "8000 Ralston Ave., Ralston, NE" },
          { name: "Historic Downtown Ralston" },
        ],
      },
    ],
  },
  {
    id: "day-sep-15",
    dayShort: "Tue · Sep 15",
    dayLong: "Tuesday, September 15",
    title: "Castle & Cathedral Creative District",
    audience: "public",
    logo: "/assets/castle-and-cathedral-district-logo.png",
    logoAlt: "castle & cathedral creative district logo",
    logoUrl: "https://castleandcathedraldistrict.org/",
    narrative:
      "Another day of painting across the metro, with the Lunch Break Paintout heading to the Castle & Cathedral Creative District — home to Joslyn Castle and St. Cecilia's Cathedral. Grab lunch nearby and stay to watch.",
    events: [
      {
        time: "11 AM – 1:30 PM",
        name: "Lunch Break Paintout",
        location: "Castle & Cathedral Creative District",
        address: "40th & Davenport St., Omaha, NE",
        spots: [
          { name: "Joslyn Castle & Gardens", address: "3902 Davenport St., Omaha, NE" },
          { name: "Cali Commons", address: "40th St. between California St. & Cuming St., Omaha, NE" },
          { name: "St. Cecilia Cathedral / Cathedral Arts Project", address: "701 N. 40th St., Omaha, NE" },
        ],
      },
    ],
  },
  {
    id: "day-sep-16",
    dayShort: "Wed · Sep 16",
    dayLong: "Wednesday, September 16",
    title: "Benson & Youth Mentorship",
    audience: "public",
    logo: "/assets/benson-creative-district-logo.png",
    logoAlt: "benson creative district logo",
    logoUrl: "https://www.bensoncreativedistrict.org/",
    narrative:
      "The midweek Lunch Break Paintout heads to the Benson Creative District. That afternoon, invited festival artists meet privately with preselected youth participants — this portion of the day is not open to the public.",
    events: [
      {
        time: "11 AM – 1:30 PM",
        name: "Lunch Break Paintout",
        location: "Benson Creative District",
        address: "60th & Maple St., Omaha, NE",
        spots: [
          { name: "Ted & Wally's Parking Lot", address: "6023 Maple St., Omaha, NE", note: "Festival info booth" },
          { name: "Benson Rain Garden", address: "5801 Maple St., Omaha, NE" },
          { name: "Gallagher Park", address: "2936 N. 52nd St., Omaha, NE" },
        ],
      },
      { time: "4 – 5:30 PM", name: "Youth Mentorship with Professional Artists — Preselected Participants Only" },
    ],
  },
  {
    id: "day-sep-17",
    dayShort: "Thu · Sep 17",
    dayLong: "Thursday, September 17",
    title: "Third Thursday & An Evening Worth Staying Out For",
    audience: "public",
    logo: "/assets/dundee-logo.webp",
    logoAlt: "dundee creative district logo",
    logoUrl: "https://www.visitdundeeomaha.com",
    narrative:
      "By day, artists paint through the Dundee Creative District. By evening, the energy shifts to Ralston for Third Thursday — one of the week's most memorable nights. Festival Awards Judge Rick J. Delanty presents a ticketed lecture on Impressionism and Plein Air at the Baright Public Library. Afterward, artists spread out across downtown Ralston, painting live while the concert plays around them. Come mingle, watch, and take it all in — this is not a Quick Paint event.",
    events: [
      {
        time: "11 AM – 1:30 PM",
        name: "Lunch Break Paintout",
        location: "Dundee Creative District",
        address: "50th & Underwood Ave., Omaha, NE",
        spots: [
          { name: "Memorial Park Rose Garden", address: "6005 Underwood Ave., Omaha, NE" },
          { name: "Dundee Business District Streetscape", address: "49th to 51st & Underwood Ave., Omaha, NE", note: "Antique street lights with hanging flower baskets" },
        ],
      },
      { time: "5 – 6 PM", name: "Judge's Lecture — Impressionism & Plein Air (Ticketed)", location: "Baright Public Library", address: "5555 S. 77th St., Ralston, NE" },
      { time: "6 – 8 PM", name: "Third Thursday — Artists Painting During Tunes in Town Square", location: "Downtown Ralston", address: "Main St. & 77th St., Ralston, NE" },
    ],
  },
  {
    id: "day-sep-18",
    dayShort: "Fri · Sep 18",
    dayLong: "Friday, September 18",
    title: "Collectors Preview Reception and Awards Presentation",
    audience: "ticketed",
    narrative:
      "Artists deliver their completed festival paintings in the morning. That evening, the Collectors Preview Reception and Awards Presentation at [The Granary](https://atthegranary.com/) brings together art, music, food, and the first opportunity to purchase works from the festival's collection at the artist's listed price. Awards are announced and artists are celebrated. Tickets required.",
    events: [
      { time: "9 AM – 12:30 PM", name: "Artists Turn In Paintings", location: "Venues at the Granary", address: "7401 Main St., Ralston, NE" },
      { time: "5:30 – 8 PM", name: "Collectors Preview Reception and Awards Presentation", location: "Venues at the Granary", address: "7401 Main St., Ralston, NE" },
    ],
  },
  {
    id: "day-sep-19",
    dayShort: "Sat · Sep 19",
    dayLong: "Saturday, September 19",
    title: "Open to Everyone",
    audience: "public",
    logo: "/assets/hinge-creative-district-logo.png",
    logoAlt: "ralston hinge creative district logo",
    narrative:
      "The festival closes with a full day open to all. Watch artists compete in the Quick Paint Competition at 9 AM, then browse every painting made during festival week at the Public Exhibition & Sale — artwork available at the artist's listed price. At noon, Quick Paint pieces go to live auction at [Granary Green](https://atthegranary.com/). You don't need an invitation — just show up.",
    events: [
      { time: "7:30 – 8:30 AM", name: "Artist Breakfast", location: "Gazebo", address: "Main St. & 77th St., Ralston, NE" },
      { time: "9 – 11 AM", name: "Quick Paint Competition", location: "Ralston Hinge Creative District", address: "Main St. & 77th St., Ralston, NE" },
      { time: "11 AM – 4 PM", name: "Public Exhibition & Sale", location: "Venues at the Granary", address: "7401 Main St., Ralston, NE" },
      { time: "Noon – 1 PM", name: "Live Auction — Quick Paint Pieces", location: "Granary Green", address: "7401 Main St., Ralston, NE" },
    ],
  },
  {
    id: "day-online",
    dayShort: "Sep 21 – Oct 4",
    dayLong: "September 21 – October 4",
    title: "Can't Make It in Person?",
    audience: "public",
    narrative:
      "Unsold works remain available for purchase online through October 4. Original, one-of-a-kind paintings of the Omaha metro — created on-site during the festival — available from wherever you are.",
  },
];

const HOMEPAGE_HIGHLIGHTS = [
  { dayId: "day-sep-12", title: "Youth Paintout", description: "Young artists paint en plein air in the park.", time: "10 AM – Noon", location: "Wildewood Park (8000 Ralston Ave., Ralston, NE)", ticketHref: "/tickets#youth-paintout", ticketLabel: "Free — pre-registration required →" },
  { dayId: "day-sep-12", title: "Youth Art Show Reception", description: "Celebrate young painters' work.", time: "5 – 6:30 PM", location: "Baright Public Library (5555 S. 77th St., Ralston, NE)", sponsor: "Applewood Hy-Vee", sponsorLogo: "/assets/sponsors/hy-vee.webp", sponsorAlt: "hy-vee logo", sponsorUrl: "https://www.hy-vee.com/" },
  { dayId: "day-sep-13", title: "Artists Arrive", description: "Artist check-in, canvas stamping, and orientation.", time: "3 PM", location: "Festival Headquarters" },
  { dayId: "day-sep-14", title: "Lunch Break Paintout", description: "Open painting across the metro. Midday Lunch Break Paintout in Downtown Ralston.", time: "11 AM – 1:30 PM", location: "Downtown Ralston / Hinge Creative District" },
  { dayId: "day-sep-15", title: "Lunch Break Paintout", description: "Open painting across the metro. Midday Lunch Break Paintout in the Castle & Cathedral District.", time: "11 AM – 1:30 PM", location: "Castle & Cathedral Creative District" },
  { dayId: "day-sep-16", title: "Lunch Break Paintout + Youth Mentorship", description: "Midday Lunch Break Paintout in Benson. Private mentorship sessions for preselected youth that afternoon (not open to the public).", time: "11 AM – 1:30 PM", location: "Benson Creative District" },
  { dayId: "day-sep-17", title: "Third Thursday & Judge's Lecture", description: "Lunch Break Paintout in Dundee 11 AM–1:30 PM. Judge Rick J. Delanty presents a ticketed lecture on Impressionism and Plein Air at Baright Library 5–6 PM. Third Thursday concert with artists painting downtown 6–8 PM — open to the public.", time: "11 AM – 8 PM", location: "Dundee + Baright Library + Downtown Ralston", ticketHref: "/tickets#judges-lecture", ticketLabel: "Lecture tickets — $25 →" },
  { dayId: "day-sep-18", title: "Collectors Preview Reception and Awards Presentation", description: "Art reception and awards ceremony. Artwork for sale at artist's listed prices. Tickets required.", time: "5:30 – 8 PM", location: "Venues at the Granary (7401 Main St., Ralston, NE)", ticketHref: "/tickets#collectors-preview-reception", ticketLabel: "Reception tickets — $95 →" },
  { dayId: "day-sep-19", title: "Quick Paint & Public Exhibition", description: "Quick Paint Competition 9–11 AM. Public Exhibition & Sale 11 AM–4 PM. Live auction of Quick Paint pieces Noon–1 PM at [Granary Green](https://atthegranary.com/).", time: "9 AM – 4 PM", location: "Ralston Hinge Creative District + Venues at the Granary", ticketHref: "/tickets#public-exhibition-sale", ticketLabel: "RSVP for the Public Exhibition — free →" },
  { dayId: "day-online", title: "Online Sales", description: "Unsold works available for purchase online.", time: "All Day", location: "Online" },
];

const FESTIVAL_LOCATIONS = [
  {
    key: "wildewood-park",
    name: "Wildewood Park",
    address: "8000 Ralston Ave., Ralston, NE",
    lat: 41.1966,
    lng: -96.037,
    description: "A neighborhood park in Ralston, Nebraska, hosting the festival's Youth Paintout, where local young artists take their easels outdoors for a morning of open-air painting.",
    events: [{ dayId: "day-sep-12", time: "10 AM – Noon", name: "Youth Paintout" }],
  },
  {
    key: "baright-library",
    name: "Baright Public Library",
    address: "5555 S. 77th St., Ralston, NE",
    lat: 41.2019,
    lng: -96.0318,
    description: "Ralston's public library, home to the festival's Youth Art Show Reception and Festival Awards Judge Rick J. Delanty's ticketed lecture on Impressionism and Plein Air.",
    events: [
      { dayId: "day-sep-12", time: "5 – 6:30 PM", name: "Youth Art Show Reception" },
      { dayId: "day-sep-17", time: "5 – 6 PM", name: "Judge's Lecture — Impressionism & Plein Air (Ticketed)" },
    ],
  },
  {
    key: "downtown-ralston",
    name: "Downtown Ralston / Hinge Creative District",
    address: "Main St. & 77th St., Ralston, NE",
    lat: 41.202,
    lng: -96.0285,
    description: "The heart of Ralston's HINGE Creative District, where festival artists paint along Main Street during the Monday Lunch Break Paintout and the Third Thursday evening paintout, and where the Quick Paint Competition takes place on the festival's closing Saturday.",
    events: [
      { dayId: "day-sep-14", time: "11 AM – 1:30 PM", name: "Lunch Break Paintout" },
      { dayId: "day-sep-17", time: "6 – 8 PM", name: "Third Thursday — Artists Painting During Tunes in Town Square" },
      { dayId: "day-sep-19", time: "9 – 11 AM", name: "Quick Paint Competition" },
    ],
  },
  {
    key: "cathedral-castle",
    name: "Castle & Cathedral Creative District",
    address: "40th & Davenport St., Omaha, NE",
    lat: 41.2641,
    lng: -95.972,
    description: "Omaha's Castle & Cathedral Creative District, home to Joslyn Castle and St. Cecilia's Cathedral, hosts a Tuesday Lunch Break Paintout during festival week.",
    events: [{ dayId: "day-sep-15", time: "11 AM – 1:30 PM", name: "Lunch Break Paintout" }],
  },
  {
    key: "benson",
    name: "Benson Creative District",
    address: "60th & Maple St., Omaha, NE",
    lat: 41.2849,
    lng: -96.0054,
    description: "Omaha's Benson Creative District hosts a midweek Lunch Break Paintout, with festival artists painting throughout the neighborhood.",
    events: [{ dayId: "day-sep-16", time: "11 AM – 1:30 PM", name: "Lunch Break Paintout" }],
  },
  {
    key: "dundee",
    name: "Dundee Creative District",
    address: "50th & Underwood Ave., Omaha, NE",
    lat: 41.265,
    lng: -95.9903,
    description: "Omaha's Dundee Creative District hosts a Thursday Lunch Break Paintout before the festival's Third Thursday evening events move to Ralston.",
    events: [{ dayId: "day-sep-17", time: "11 AM – 1:30 PM", name: "Lunch Break Paintout" }],
  },
  {
    key: "the-granary",
    name: "Venues at the Granary",
    address: "7401 Main St., Ralston, NE",
    lat: 41.202,
    lng: -96.0271,
    description: "Venues at the Granary in Ralston hosts the festival's Collectors Preview Reception and Awards Presentation, the Saturday Public Exhibition & Sale, and the live auction of Quick Paint pieces.",
    websiteUrl: "https://atthegranary.com/",
    events: [
      { dayId: "day-sep-18", time: "5:30 – 8 PM", name: "Collectors Preview Reception and Awards Presentation" },
      { dayId: "day-sep-19", time: "11 AM – 4 PM", name: "Public Exhibition & Sale" },
      { dayId: "day-sep-19", time: "Noon – 1 PM", name: "Live Auction — Quick Paint Pieces" },
    ],
  },
];

async function migrateEventSponsor(ev) {
  if (!ev.sponsorLogo) return ev;
  const { sponsorLogo, ...rest } = ev;
  return { ...rest, sponsorLogo: await uploadImageAsset(sponsorLogo) };
}

async function migrateSchedule() {
  console.log("Uploading scheduleDay + homepageHighlight + festivalLocation documents...");

  for (const day of SCHEDULE_DAYS) {
    const logo = day.logo ? await uploadImageAsset(day.logo) : undefined;
    const events = day.events
      ? await Promise.all(
          day.events.map(async (ev, i) => ({
            _key: `ev${i}`,
            ...(await migrateEventSponsor(ev)),
            ...(ev.spots && {
              spots: ev.spots.map((spot, si) => ({ _key: `sp${si}`, ...spot })),
            }),
          }))
        )
      : undefined;
    await client.createOrReplace({
      _id: day.id,
      _type: "scheduleDay",
      dayShort: day.dayShort,
      dayLong: day.dayLong,
      title: day.title,
      narrative: markdownBracketsToPortableText(day.narrative),
      audience: day.audience,
      ...(events && { events }),
      ...(logo && { logo }),
      ...(day.logoAlt && { logoAlt: day.logoAlt }),
      ...(day.logoUrl && { logoUrl: day.logoUrl }),
      orderRank: `a${SCHEDULE_DAYS.indexOf(day)}`,
    });
    console.log(`  scheduleDay: ${day.title}`);
  }

  for (const [i, highlight] of HOMEPAGE_HIGHLIGHTS.entries()) {
    const { dayId, ...rest } = highlight;
    const sponsorLogo = rest.sponsorLogo ? await uploadImageAsset(rest.sponsorLogo) : undefined;
    await client.createOrReplace({
      _id: `homepageHighlight-${i}-${slugify(highlight.title)}`,
      _type: "homepageHighlight",
      ...rest,
      ...(sponsorLogo && { sponsorLogo }),
      day: { _type: "reference", _ref: dayId },
      orderRank: `a${i}`,
    });
    console.log(`  homepageHighlight: ${highlight.title}`);
  }

  for (const [i, loc] of FESTIVAL_LOCATIONS.entries()) {
    const { key, events, ...rest } = loc;
    await client.createOrReplace({
      _id: `festivalLocation-${key}`,
      _type: "festivalLocation",
      ...rest,
      events: events.map((ev, ei) => ({
        _key: `ev${ei}`,
        day: { _type: "reference", _ref: ev.dayId },
        time: ev.time,
        name: ev.name,
      })),
      orderRank: `a${i}`,
    });
    console.log(`  festivalLocation: ${loc.name}`);
  }
}

// ---------------------------------------------------------------------------
// adSize (Phase 3)
// ---------------------------------------------------------------------------

const AD_SIZES = [
  {
    slug: "full-page",
    name: "Full Page Ad",
    price: "$300",
    icon: "Maximize2",
    dimensions: '6" x 6" plus .125" bleed on all sides',
  },
  {
    slug: "half-page",
    name: "Half Page Ad",
    price: "$200",
    icon: "Rows2",
    dimensions: 'Vertical: 2.8125"w x 5.75"h — or Horizontal: 5.75"w x 2.8125"h',
  },
  {
    slug: "quarter-page",
    name: "Quarter Page Ad",
    price: "$125",
    icon: "LayoutGrid",
    dimensions: '2.8" x 2.8"',
  },
];

async function migrateAdSizes() {
  console.log("Uploading adSize documents...");
  for (const [i, size] of AD_SIZES.entries()) {
    await client.createOrReplace({
      _id: `adSize-${size.slug}`,
      _type: "adSize",
      name: size.name,
      price: size.price,
      icon: size.icon,
      dimensions: size.dimensions,
      orderRank: `a${i}`,
    });
    console.log(`  adSize: ${size.name}`);
  }
}

// ---------------------------------------------------------------------------
// faqCategory + faqItem (Phase 3)
// ---------------------------------------------------------------------------

const FAQ_CATEGORIES = [
  {
    id: "general",
    title: "General",
    items: [
      {
        q: "What is plein air painting?",
        featured: true,
        a: [
          'Plein air is a French term meaning "open air," and the practice is exactly what it sounds like: artists painting outside, directly from life, rather than working from photos or references back in a studio. The goal is to capture a place as it actually exists in a given moment — the quality of the light, the atmosphere, the movement, the feeling of being there.',
          "The tradition goes back to the 19th century and was central to the Impressionist movement. Artists like Monet and Renoir built their careers on it. Working outdoors means working quickly — a plein air piece is often completed within an hour or two before the light shifts — so the paintings tend to have an energy and immediacy that studio work can't quite replicate. Every painting is a one-of-a-kind record of a specific place at a specific moment in time.",
        ],
      },
      {
        q: "Where will the artists be painting?",
        featured: true,
        a: [
          "Artists will paint freely across the Omaha Metro throughout the festival week, choosing their own locations each day. There are several scheduled events where you're guaranteed to find artists in action. Lunch Break Paintouts take place Monday through Thursday (11 AM–1:30 PM) — Downtown Ralston on September 14, the Castle & Cathedral Creative District on September 15, Benson on September 16, and Dundee on September 17. These are open painting sessions, not competitions, where artists work in a defined area and the public is welcome to watch. On Saturday, September 19, the Quick Paint Competition runs 9–11 AM within the Ralston Hinge Creative District boundary.",
          "Beyond those events, artists may paint anywhere that inspires them. Suggested locations include Lauritzen Gardens, the Old Market, the Riverfront, Memorial Park, Fort Omaha, Neale Woods, the Bob Kerrey Pedestrian Bridge, Elmwood Park Grotto, Fontenelle Forest, Schramm State Park, Chalco Hills, Boystown, and Ralston's Oak Park. See the [Schedule page](/schedule) for the full day-by-day map.",
        ],
      },
      {
        q: "Can I watch the artists paint?",
        featured: true,
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
        featured: true,
        a: [
          "Watching artists paint throughout the week at outdoor locations across the metro is completely free, as is the Public Exhibition & Sale on September 19. The Collector VIP Pass ($125) gets you into the Collectors Preview Reception and Awards Presentation on September 18, priority seating at the Judge's Lecture on September 17, a private artist Meet & Greet on September 13, and priority seating at the live auction on September 19. Prefer a standalone ticket? The Judge's Lecture is $25 and the Collectors Preview Reception is $95. See the [Tickets page](/tickets) for details.",
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
          "The inaugural Heartland Plein Air Festival brings together 25 nationally acclaimed invited artists (see them all on the [Artists page](/artists)), including Awards Judge Rick J. Delanty, who both judges and paints. The festival also includes an [Open Division](/open-division) with up to 40 additional artists who apply online, for a total of up to 65 participating artists.",
        ],
      },
      {
        q: "Are the artists juried or selected through an application process?",
        a: [
          "The festival runs two separate tracks. The featured artists were personally invited by the festival organizers — they're nationally recognized painters selected for the Invitational Division. A separate [Open Division](/open-division) is available to additional artists through an application process. Check back to find application details closer to the event.",
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
          "Education is woven into the festival. Before the festival officially opens, a Youth Paintout runs September 12 at Wildewood Park (10 AM–Noon), followed by the Youth Art Show Reception that evening at the Baright Library (5–6:30 PM), sponsored by Applewood Hy-Vee.",
          "On September 16, private mentorship sessions connect preselected youth participants with the festival's invited professional artists (4–5:30 PM) — this is not a public event. On September 17, Festival Awards Judge Rick J. Delanty will present a lecture on Impressionism and Plein Air at the Baright Public Library (5555 S. 77th Street, Ralston) from 5–6 PM — ticketed due to space limitations.",
          "The Lunch Break Paintouts (Monday–Thursday, 11 AM–1:30 PM) and the Thursday night paintout during the concert in Ralston give the public the opportunity to observe and learn from the artists as they paint.",
        ],
      },
      {
        q: "What is a Quick Paint Competition?",
        a: [
          "A Quick Paint is a timed painting competition where all participating artists work simultaneously in an area with specific boundaries — in this case, within the Ralston Hinge Creative District boundary — starting at the same moment and stopping when the clock runs out. Artists have just two hours to produce a finished painting from scratch, outdoors, in front of anyone who happens to be watching.",
          "It's one of the most compelling things you can witness at a plein air festival. Watching a blank canvas become a complete painting in real time, under pressure, in changing light, is genuinely exciting — and you get to see many painters working in fairly close proximity, observing how each approaches their subjects using different mediums and techniques. Upon completion, the artists frame their pieces and bring them to be auctioned off in a live auction!",
          "The Quick Paint competition will be from 9 AM to 11 AM on Saturday morning, September 19th, in Ralston in the area between 72nd St and 77th St, Main St to Burlington St. The live auction of these fresh paintings will be held from noon to 1 PM at [Granary Green](https://atthegranary.com/), 74th and Main St.",
        ],
      },
      {
        q: "Are there awards or competitions during the festival?",
        a: [
          "The festival offers over $10,000 in awards, with awards for both the invited artists and the open division artists. The awards ceremony will be held during the Collectors Preview Reception and Awards Presentation on September 18.",
          "The awards judge is Rick J. Delanty from San Clemente, California — a nationally recognized, award-winning master artist with signature memberships in AIS, OPA, LPAPA, and ASMA, and recognized as an ARC Salon Living Master.",
        ],
      },
      {
        q: "Can children or beginner artists participate?",
        a: [
          "Young artists are genuinely central to this festival. A Youth Paintout takes place September 12 at Wildewood Park, with the Youth Art Show Reception that same evening at the Baright Library. On September 16, preselected youth participate in private mentorship sessions with the festival's invited professional artists.",
          "The [Open Division](/open-division) of the festival competition is open to local and regional artists who have some experience painting — it is not intended as a beginner track. For those new to plein air, the festival offers a wonderful opportunity to observe professional artists at work throughout the week and learn by watching.",
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
          "Outside of those events, artists paint freely across the metro, so sightings are more spontaneous. A map of locations and suggested painting areas is available on the [Schedule page](/schedule).",
        ],
      },
      {
        q: "What days and times is the festival open?",
        a: [
          "The festival runs September 13–19, 2026, with a pre-festival youth day on September 12. Key public events include:",
          "September 12 — Youth Paintout at Wildewood Park (10 AM–Noon) and Youth Art Show Reception at Baright Library (5–6:30 PM), sponsored by Applewood Hy-Vee.",
          "September 14–17 — Daily Lunch Break Paintouts: Downtown Ralston (Sep 14), Castle & Cathedral District (Sep 15), Benson (Sep 16), Dundee (Sep 17), all 11 AM–1:30 PM.",
          "September 16 — Private Youth Mentorship Sessions, preselected participants only (4–5:30 PM).",
          "September 17 — Judge's Lecture: Impressionism & Plein Air at Baright Library (5–6 PM, ticketed); Third Thursday concert with artists painting downtown (6–8 PM, free).",
          "September 18 — Collectors Preview Reception and Awards Presentation at [the Granary](https://atthegranary.com/), Ralston (5:30–8 PM, ticketed).",
          "September 19 — Quick Paint Competition (9–11 AM, Ralston Hinge Creative District); Public Exhibition & Sale at [the Granary](https://atthegranary.com/) (11 AM–4 PM, free); Live Auction of Quick Paint Pieces at [Granary Green](https://atthegranary.com/) (Noon–1 PM).",
          "September 21–October 4 — Online art sale.",
          "See the [Schedule page](/schedule) for the full day-by-day itinerary and a map of locations.",
        ],
      },
      {
        q: "Is the festival family-friendly?",
        a: [
          "The Heartland Plein Air Festival is welcoming to all ages. Two dedicated youth events take place: the Youth Paintout on Saturday, September 12 at Wildewood Park (10 AM–Noon, [pre-registration required](/tickets#youth-paintout)) and private mentorship sessions for preselected youth on Wednesday, September 16. The Youth Art Show Reception at the Baright Library on the evening of September 12 is open to everyone. The Public Exhibition & Sale on September 19 is free, and watching artists paint at outdoor locations across the metro is a casual, come-and-go experience that works well for families.",
        ],
      },
      {
        q: "Is there parking at event locations and the Granary?",
        a: [
          "The Lunch Break Paintout locations — Downtown Ralston, the Castle & Cathedral Creative District, Benson, and Dundee — all have street parking available nearby. The Quick Paint Competition on September 19 is held in Downtown Ralston at the Hinge Creative District, with the same street parking options.",
          "[The Granary](https://atthegranary.com/), which hosts the Collectors Preview Reception and Awards Presentation and Public Exhibition at 7401 Main Street in Ralston, has parking on site.",
        ],
      },
      {
        q: "Are the venues accessible?",
        a: [
          "The outdoor painting locations across the metro vary in terrain — parks, sidewalks, and urban streetscapes — and accessibility will differ by site. [The Granary](https://atthegranary.com/) at 7401 Main Street in Ralston hosts both the Collectors Preview Reception and Awards Presentation and Public Exhibition.",
          "For specific accessibility questions about any venue, reach out to the festival organizers at info@ralstonarts.org and we'll do our best to help you plan your visit.",
        ],
      },
      {
        q: "Will food or drinks be available?",
        a: [
          "The Collectors Preview Reception and Awards Presentation on September 18 includes catering and entertainment as part of the ticketed event at [the Granary](https://atthegranary.com/). Food and drink availability at Lunch Break Paintout locations and the Public Exhibition has not yet been confirmed — follow us on social media for updates closer to the event.",
        ],
      },
      {
        q: "Is there a map of artist painting locations?",
        a: [
          "A map of Lunch Break Paintout locations, the Quick Paint Competition site, and suggested painting locations across the metro is available on the [Schedule page](/schedule).",
        ],
      },
    ],
  },
  {
    id: "purchasing",
    title: "Buying the Art",
    items: [
      {
        q: "How do I get tickets to the Collectors Preview Reception and Awards Presentation?",
        a: [
          "A standalone ticket to the Collectors Preview Reception and Awards Presentation is available for $95. It's also included in the Collector VIP Pass ($125), which additionally gets you a private artist Meet & Greet on September 13, priority seating at the Judge's Lecture on September 17, and priority seating at the live auction on September 19. See the [Tickets page](/tickets) to purchase.",
        ],
      },
      {
        q: "How can I purchase a painting?",
        featured: true,
        a: [
          "Paintings are available for purchase at two events: the Collectors Preview Reception and Awards Presentation on September 18 (5:30–8 PM at [the Granary](https://atthegranary.com/), 7401 Main Street, Ralston) and the Public Exhibition on September 19 (11 AM–4 PM, also at the Granary). Works at both events are sold at the artist's listed price. The Collectors Preview Reception and Awards Presentation is ticketed; the Public Exhibition is free.",
          "For anyone unable to attend in person, an online sale of remaining artworks runs from September 21 through October 4 at HeartlandPleinAir.org and RalstonArts.org.",
        ],
      },
      {
        q: "How much do the paintings typically cost?",
        a: [
          "Pricing is set by each individual artist and won't be published in advance. Works are sold at the artist's listed price at both the Collectors Preview Reception and Awards Presentation and the Public Exhibition & Sale. Plein air paintings are generally considered more accessible than comparable gallery work, which is part of what makes festival exhibitions such a good opportunity for collectors at any level.",
        ],
      },
      {
        q: "Can I purchase artwork before the final exhibition?",
        a: [
          "The Collectors Preview Reception and Awards Presentation on September 18 — the evening before the Public Exhibition — is the earliest opportunity to purchase artwork. Works are not available for sale earlier in the festival week. Artists will not be able to sell their work directly off their easels prior to the exhibition.",
        ],
      },
      {
        q: "How does the online sale work?",
        a: [
          "Following the Public Exhibition on September 19, any paintings that remain available will move to an online sale running through October 4. The sale will be accessible through HeartlandPleinAir.org and RalstonArts.org.",
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
          "Sponsorship opportunities are available for businesses that want to be part of the inaugural Heartland Plein Air Festival. Current partners include the [Benson Creative District](https://www.bensoncreativedistrict.org/), [Historic Dundee Creative District](https://www.visitdundeeomaha.com), [Castle & Cathedral Creative District](https://castleandcathedraldistrict.org/), [Visit Nebraska](https://visitnebraska.com/), the Wiebe Ralston Foundation, [Nebraska Arts Council](https://www.artscouncil.nebraska.gov/), and the [Nebraska Cultural Endowment](https://nebraskaculturalendowment.org/).",
          "For information on sponsorship levels and benefits, see the [Sponsors page](/sponsors) or [contact us](/contact) to learn more. Businesses can also reach collectors and attendees directly by placing an ad in the festival catalog — see the [Advertising page](/advertising) for sizes and pricing.",
        ],
      },
      {
        q: "Are volunteer opportunities available?",
        a: [
          "Volunteers are being recruited to support the festival across a range of roles. Reach out through the [Contact page](/contact) and we'll get you connected to the right person.",
        ],
      },
      {
        q: "How can I become a festival sponsor?",
        a: [
          "Sponsorship inquiries can be submitted through the [Contact page](/contact), and sponsorship levels and benefits are listed on the [Sponsors page](/sponsors). For a direct conversation, reach the Ralston HINGE Creative District at info@ralstonarts.org, attn. Debra Joy Groesser.",
        ],
      },
      {
        q: "Does the festival partner with local nonprofits or schools?",
        a: [
          "We are working with local nonprofits [FosterLove](https://fosterlove.com/) and [Healing Ribbons](https://www.healingribbons.org/), as well as the local public schools, to provide selected youth they serve with the opportunity to have a mentor session with one of the invited professional artists. Each youth will receive a plein air kit to keep and create with.",
          "Our youth paintout participants will be youth from the area schools and community. Each of those youth will also receive a plein air kit to keep and create with at home.",
        ],
      },
      {
        q: "How does the festival support the local arts community?",
        a: [
          "The Heartland Plein Air Festival was established specifically to use the arts as an economic driver for the Ralston and Omaha Metro region. Supported in part by a Nebraska Arts Council Creative District Development Grant, the festival is designed to attract visitors, generate economic activity, and put Ralston on the national map as an arts destination.",
          "The funds generated from the festival will help the RHCD to fund additional arts projects and programming throughout the year in all arts disciplines. The [Open Division](/open-division) of the festival competition is open to local and regional artists, helping them gain important experience and exposure for their work.",
        ],
      },
    ],
  },
];

async function migrateFaq() {
  console.log("Uploading faqCategory + faqItem documents...");
  let globalIndex = 0;
  for (const [ci, category] of FAQ_CATEGORIES.entries()) {
    await client.createOrReplace({
      _id: category.id,
      _type: "faqCategory",
      title: category.title,
      orderRank: `a${ci}`,
    });
    console.log(`  faqCategory: ${category.title}`);

    for (const [ii, item] of category.items.entries()) {
      await client.createOrReplace({
        _id: `faqItem-${category.id}-${ii}`,
        _type: "faqItem",
        category: { _type: "reference", _ref: category.id },
        question: item.q,
        answer: paragraphsToPortableText(item.a),
        featured: Boolean(item.featured),
        orderRank: `a${globalIndex}`,
      });
      globalIndex++;
    }
    console.log(`    ${category.items.length} items`);
  }
}

const SECTIONS = {
  sponsors: migrateSponsors,
  schedule: migrateSchedule,
  adSizes: migrateAdSizes,
  faq: migrateFaq,
};

async function main() {
  const requested = process.argv.slice(2);
  const sections = requested.length ? requested : Object.keys(SECTIONS);
  for (const name of sections) {
    const fn = SECTIONS[name];
    if (!fn) {
      throw new Error(`Unknown section "${name}". Available: ${Object.keys(SECTIONS).join(", ")}`);
    }
    await fn();
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
