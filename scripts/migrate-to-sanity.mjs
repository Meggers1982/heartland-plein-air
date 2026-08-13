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

const SECTIONS = {
  sponsors: migrateSponsors,
  schedule: migrateSchedule,
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
