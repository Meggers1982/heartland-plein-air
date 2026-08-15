// HISTORICAL RECORD — the `sponsors` section can no longer run. On 2026-08-15
// the 15 sponsor logo files it uploads from public/assets/sponsors/ were
// deleted, since the images now live in Sanity and nothing referenced the local
// copies. `uploadImageAsset()` will throw ENOENT on the first one. Recover them
// from git history if you ever genuinely need to re-seed. (hy-vee.webp survives
// — it is still rendered directly by src/page-components/Tickets.tsx.)
// Other sections are unaffected.
//
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

// ---------------------------------------------------------------------------
// artist (Phase 3) — folds gallery.ts's paintings onto the artist document
// ---------------------------------------------------------------------------

const ARTISTS = [
  { name: "Hector Acuna", src: "/assets/artists/hector-acuna.webp", alt: "side profile portrait of man in glasses and corduroy cap painting outdoors at sunset", location: "Wisconsin", bio: "Hector Acuna is a Wisconsin-based painter known for observational work that moves fluidly between studio and plein air. He holds a BFA from the University of Wisconsin-Stevens Point and an MFA from Michigan State University — and has quickly become one of the most recognized names in contemporary plein air painting.\n\nIn 2022, Plein Air Magazine named him one of three Artists to Watch. The following year, he received the inaugural M. Stephen Doherty Breakthrough Artist of the Year Award. A sought-after instructor and juror, he teaches workshops across the country and builds his own painting supports and frames by hand in his wood shop in Grafton, Wisconsin.", website: "https://www.acunaarts.com", instagram: "https://www.instagram.com/hectoracuna.pleinair/", facebook: "https://www.facebook.com/AcunaArt/" },
  { name: "Jason Bailey", src: "/assets/artists/jason-bailey.webp", objectPosition: "70% center", alt: "bearded artist smiling in black and white studio portrait", location: "Kentucky", bio: "Jason Bailey is a Kentucky-based impressionist painter and Signature Member of both the American Impressionist Society and the National Oil and Acrylic Painters Society. He paints primarily outdoors, drawn to small-town street scenes, railroad tracks, riverbanks, and the quiet energy of places most people walk past without stopping.\n\nHis work has been featured in Plein Air Magazine and Fine Art Connoisseur, and he has earned awards at competitions across the country including the Oil Painters of America Eastern Regional, NOAPS Best of America, and the Olmsted Plein Air Invitational in Atlanta. In 2025, he was accepted into the OPA National Exhibition.", website: "https://www.jasonbaileyfineart.com", instagram: "https://www.instagram.com/jasonbaileyfineart/", facebook: "https://www.facebook.com/jasonbaileyfineart/" },
  { name: "Jacalyn Beam", src: "/assets/artists/jacalyn-beam.webp", alt: "close-up portrait of a smiling woman with blonde bob haircut wearing a pearl necklace and earrings", location: "Delaware", bio: "Jacalyn Beam is an accomplished painter based in the Brandywine Valley, known for luminous impressionistic landscapes, still lifes, and plein air work. Influenced by Sorolla, Sargent, and the Wyeth family, she paints primarily from life — believing direct observation is the most authentic way to capture light, shadow, and atmosphere.\n\nA Signature Member of the American Impressionist Society, Oil Painters of America, and the Washington Society of Landscape Painters, her work has been featured in publications including 100 Mid-Atlantic Plein Air Painters, HUNT Magazine, and Art Collector Magazine. She has also served on the Delaware Arts Council and contributed to arts education initiatives nationally.", website: "https://www.jacalynbeam.com", instagram: "https://www.instagram.com/jacalynbeam/" },
  { name: "Bob Beck", src: "/assets/artists/bob-beck.webp", alt: "man wearing glasses outdoors in plaid button-up shirt", location: "Wisconsin", bio: "Bob Beck is a Wisconsin-based oil painter and Signature Member of both the American Impressionist Society and Oil Painters of America. He has won awards at national and international plein air competitions and has been featured in Plein Air Magazine. He has been accepted into the Oil Painters of America National Juried Exhibition four times — in 2022, 2023, 2025, and 2026.\n\nFor Bob, painting on location is everything. Working fast, reading light, and getting the drawing down before the scene shifts — that's the practice. He has painted extensively across the U.S. and abroad, spending time at the Monet Gardens in Giverny, Venice, and Prague.\n\nBob earned a BFA in painting and has operated the Bob Beck Art Gallery in Manitowoc, Wisconsin for the past 30 years.", website: "https://www.bobbeckartist.com" },
  { name: "Michele Byrne", src: "/assets/artists/michele-byrne.webp", alt: "woman with curly blonde hair wearing glasses and a wide-brim hat smiling outdoors", location: "New Mexico", bio: "Michele Byrne is an award-winning impressionistic oil painter known for energetic palette knife work, bold color, and what she calls \"The Art of Conversation\" — lively cafés, bustling street scenes, and atmospheric landscapes filled with movement and human connection. Her work was featured on the cover of PleinAir Magazine in January 2020.\n\nA Royal Talens Artist Ambassador and sought-after instructor, Michele teaches workshops across the U.S. and internationally in Europe. She is a Signature Member of the American Impressionist Society and Plein Air Artists of New Mexico, and exhibits with Reinert Fine Art in South Carolina and James R. Ross Fine Art in Indiana.", website: "https://www.michelebyrne.com", instagram: "https://www.instagram.com/michelebyrneart/", facebook: "https://www.facebook.com/michelebyrneart/" },
  { name: "Robin Cheers", src: "/assets/artists/robin-cheers.webp", objectPosition: "30% center", alt: "smiling woman with glasses in art studio beside painting", location: "Texas", bio: "Robin Cheers is an Austin-based oil painter working in the impressionist tradition, known for figure work and everyday scenes that capture the overlooked moments of modern life. A founding member of Plein Air Austin, she teaches workshops across the U.S. and abroad and has released an instructional video, Brushwork Secrets Unleashed, through Streamline Publishing.\n\nA Signature Member of the American Impressionist Society and National Oil and Acrylic Painters Society and elected member of the Salmagundi Club, her work has earned awards in both plein air competitions and juried exhibitions and is collected worldwide.", website: "https://www.robincheers.com", instagram: "https://www.instagram.com/robincheers/", facebook: "https://www.facebook.com/Robin-Cheers-71815508131/" },
  { name: "Larry DeGraff", src: "/assets/artists/larry-degraff.webp", alt: "smiling man outdoors in striped shirt and green backdrop", location: "Kansas", bio: "After a successful career as a greeting card artist at Hallmark Cards, Larry DeGraff transitioned into fine art — bringing with him a refined eye for composition and emotional nuance developed at the Kansas City Art Institute. Working primarily in oils, he's best known for atmospheric landscapes centered on water, quiet natural settings, and the understated beauty of places that transform under the right light.\n\nHis work has been featured in Southwest Art and PleinAir Magazine. He is a Signature Member of the National Oil and Acrylic Painters Society.", website: "https://www.larrydegraff.com", instagram: "https://www.instagram.com/larrydegraff/", facebook: "https://www.facebook.com/degrafffineart/" },
  { name: "John Evans", src: "/assets/artists/john-evans.webp", alt: "artist painting outdoors at easel wearing white hat", location: "Iowa", bio: "John Evans is an Iowa-based pastel painter and retired art educator with nearly 40 years in the classroom. Working in the space between realism and impressionism, he paints landscapes driven by light — searching out the moments when ordinary places become something worth stopping for.\n\nA charter member, Signature Member, and Past President of the Iowa Pastel Society, his work reflects a belief that pastel bridges painting and drawing in a way no other medium quite does.", website: "https://www.johnevans.faso.com", instagram: "https://www.instagram.com/johnevans1016/", facebook: "https://www.facebook.com/JohnEvans.Studio61/" },
  { name: "Debra Joy Groesser", src: "/assets/artists/debra-joy-groesser.webp", alt: "smiling woman with glasses posing in front of framed coastal paintings in an art gallery", location: "Nebraska", bio: "Debra Joy Groesser is a Nebraska-based painter best known for her impressionistic landscapes and plein air work. She holds a BFA from Bellevue College and has built an extensive exhibition record spanning national juried shows, solo exhibitions, and invitational events across the country. Her commissioned portrait of Richard and Mary Holland hangs permanently at the Holland Performing Arts Center in Omaha.\n\nA Signature Member and Past Board Chair of the American Impressionist Society, Master Signature Member of Plein Air Artists Colorado, and Signature Member of Oil Painters of America and LPAPA, her work has been featured in International Artist, Southwest Art, American Art Collector, and Plein Air Magazine. She has served as faculty at the Plein Air Convention and is represented by galleries in Montana and Nebraska — including her own gallery in Ralston.", website: "https://www.debrajoygroesser.com", instagram: "https://www.instagram.com/debrajoygroesser/", facebook: "https://www.facebook.com/DebraJoyGroesserFineArt/" },
  { name: "Kristin K. Hosbein", src: "/assets/artists/kristin-hosbein.webp", objectPosition: "30% center", alt: "smiling woman posing beside floral painting in art studio", location: "Michigan", bio: "Kristin K. Hosbein is an award-winning contemporary impressionist painter based in St. Joseph, Michigan. Painting en plein air since 2009, she's known for capturing fleeting light and atmosphere through expressive brushwork and luminous color — whether she's painting a quiet marina, vibrant blooms, or sunlit woodland scenes.\n\nA member of the American Impressionist Society and Oil Painters of America, Kristin has participated in plein air events across the U.S. and internationally. As a member of the United States Coast Guard Artist Program, her work is held in the national collection in Washington, D.C.", website: "https://www.kristinhosbein.com", instagram: "https://www.instagram.com/kristinkkh/", facebook: "https://www.facebook.com/kristinkhosbeinfineart/" },
  { name: "Ann Larsen", src: "/assets/artists/ann-larsen.webp", objectPosition: "center 25%", alt: "black and white portrait of a woman with curly hair smiling, wearing a turtleneck and a beaded pendant necklace", location: "New York", bio: "Ann Larsen is an award-winning plein air painter based in New York, invited to paint at some of the country's most celebrated events — including the Grand Canyon Plein Air Celebration of Art, Sedona Plein Air Festival, and the Rocky Mountain Plein Air Painters National Show at Grand Teton National Park.\n\nHer work has been exhibited at the Tucson Desert Art Museum, Booth Museum, and the National Cowboy & Western Heritage Museum. Awards include a Silver Medal from American Women Artists, Bronze Medal from OPA Eastern Regional, and Second Place at the AIS National Exhibition.", website: "https://www.annlarsen.com" },
  { name: "John Lasater", src: "/assets/artists/john-lasater.webp", alt: "black and white portrait of a man with glasses and beard wearing a cap and long sleeve shirt", location: "Arkansas", bio: "Based in Northwest Arkansas, John Lasater is an acclaimed contemporary landscape painter known for his thoughtful approach to light, atmosphere, and simplified design. His work — winding rural roads, peaceful streams, open fields — captures not just a location but the emotional experience of being present within it.\n\nA member of the Plein Air Painters of America, Lasater has earned numerous awards at prestigious national events and is widely respected as a teacher, writer, and mentor.", website: "https://www.lasaterart.com", instagram: "https://www.instagram.com/johnplasater/", facebook: "https://www.facebook.com/lasaterart/" },
  { name: "Dan Marshall", src: "/assets/artists/dan-marshall.webp", alt: "portrait of a man wearing round glasses, a tan brimmed hat, and a black t-shirt with tattooed arms", location: "Colorado", bio: "Dan Marshall is a Denver-based watercolor artist whose work captures the quiet poetry of everyday scenes — expansive landscapes, intimate street moments, and the human figure. Working primarily en plein air, he distills complex environments into mood-driven compositions through a restrained palette and a focus on value, edges, and subtle temperature shifts.\n\nHis writing has appeared in Watercolor Artist, Outdoor Painter, and PleinAir Magazine. He is a Signature Member of AWS, AIS, and LPAPA.", website: "https://www.danmarshallart.com", instagram: "https://www.instagram.com/danmarshallart/", facebook: "https://www.facebook.com/DanMarshallArt/" },
  { name: "Fernando Micheli", src: "/assets/artists/fernando-micheli.webp", objectPosition: "25% center", alt: "artist painting coastal landscape aboard boat near rocky shoreline", location: "California", bio: "Fernando Micheli came to painting late — picking up a brush for the first time in 2013 after a 36-year career as a landscape architect in Laguna Beach, California. It turned out to be a natural fit. Born in Tuscany and trained in Florence, he'd spent decades studying how light moves through built and natural environments. Plein air gave him a way to put that eye to work.\n\nA Signature Member of the Laguna Plein Air Painters Association, American Impressionist Society, and California Art Club, his work was featured in Plein Air Magazine's \"10 Artists to Collect Now\" in 2021. He maintains a studio and gallery in Laguna Beach and exhibits regularly at the Sawdust Festival.", website: "https://fernandomicheli.faso.com", instagram: "https://www.instagram.com/fernando1951micheli/", facebook: "https://www.facebook.com/p/Fernando-Micheli-Fine-Art-100036867775846/" },
  { name: "Brenda Pinnick", src: "/assets/artists/brenda-pinnick.webp", alt: "smiling woman in black cap standing in wooded area", location: "Georgia", bio: "Brenda Pinnick is an impressionist painter who uses color and brushwork to tell the story of time and place — landscapes, street scenes, still lifes, always chasing the light. A lifelong artist and former graphic designer at Hallmark Cards, she paints primarily on location in and around north Georgia, though a good road trip with her gear in tow is never out of the question.\n\nA Member of Excellence in the Southeastern Pastel Society, her work balances oil and pastel with equal fluency. She lives in Woodstock, Georgia with her husband, one perfect granddaughter, and a stubborn little white dog named Holli.", website: "https://www.brendapinnick.com", instagram: "https://www.instagram.com/brendapinnickfinearts/", facebook: "https://www.facebook.com/brendapinnickartist/" },
  { name: "Radhika Srinivas", src: "/assets/artists/radhika-srinivas.webp", alt: "woman with glasses smiling outdoors beside an easel with a watercolor painting of bright pink azaleas", location: "Pennsylvania", bio: "Radhika Srinivas is an award-winning watercolor artist based in the Philadelphia area, recognized for work that spans national juried exhibitions and plein air events. Her paintings are held in notable collections including the City of Wilmington, Valley Forge National Park, Raymond James Financial, and the private collection of Miles Copeland III, former manager of The Police.\n\nNotable awards include the Outstanding Watercolor Award in the Bold Brush Online competition (2015, 2016, 2018, 2023) and second place in the Plein Air Salon monthly competition in August 2023.", website: "https://www.radhikasrinivas.com", instagram: "https://www.instagram.com/radhikasrinivasfineart/", facebook: "https://www.facebook.com/rswatercolors/" },
  { name: "Steve Stauffer", src: "/assets/artists/steve-stauffer.webp", alt: "portrait of a man with a white beard wearing a cowboy hat and a yellow button-down shirt", location: "Utah", bio: "Steve Stauffer is a Utah-based oil painter whose love of plein air has taken him to some of the most spectacular landscapes in the country. His work captures those fleeting moments — a sunrise, a shift in light — that most people experience once and rarely get to hold onto.\n\nHe is a member of Oil Painters of America, the American Impressionist Society, Plein Air Painters of Utah, and Plein Air Utah Live.", website: "https://www.stevestauffer.com", instagram: "https://www.instagram.com/staufferstephen/", facebook: "https://www.facebook.com/p/Stauffer-Studios-100063588282297/" },
  { name: "Jill Stefani Wagner", src: "/assets/artists/jill-wagner.webp", alt: "smiling woman in black cap outdoors among trees", location: "Michigan", bio: "Jill Stefani Wagner is a Michigan-based pastel artist who paints landscapes, interiors, and figures — always with light as the subject. An avid plein air painter, she travels the country painting each unique region and spends winters in the studio working on larger pieces, still chasing the same thing.\n\nA Master Pastelist with both the Pastel Society of America and the International Association of Pastel Societies, Jill has been pastel faculty at the Plein Air Convention six times and teaches workshops around the world. She holds a BFA from the University of Michigan and owned an award-winning advertising firm in Ann Arbor before becoming a full-time artist. Her work is held in collections across the U.S. and Europe.", website: "https://www.jillwagnerart.com", instagram: "https://www.instagram.com/jillwagnerart/", facebook: "https://www.facebook.com/jill.s.wagner/" },
  { name: "Durre Waseem", src: "/assets/artists/durre-waseem.webp", alt: "woman with dark hair and glasses smiling outdoors against a bright sky", location: "California", bio: "Durre Waseem is an award-winning plein air and figurative painter based in Corona, California. Originally from Pakistan, she earned an MFA from Punjab University and taught graduate art students for nearly a decade before moving to the U.S. in 2001. Working across oils, watercolor, pastel, and acrylic, she's known for bold brushwork and an expressionistic style that captures both the character of a place and the energy of the people within it.\n\nRecent awards include Best of Show at TECHE Plein Air 2025, Artists' Choice Award at North Carolina Plein Air 2025, and Best Figurative Award at Cape Ann Plein Air 2025. She is a Signature Artist with the Laguna Plein Air Painters Association.", website: "https://dwaseem.faso.com", instagram: "https://www.instagram.com/waseemdurre/", facebook: "https://www.facebook.com/durre.waseem/" },
  { name: "Ann Watcher", src: "/assets/artists/ann-watcher.webp", objectPosition: "center 35%", alt: "woman with dark hair smiling while seated in tall golden grass wearing a blue jacket outdoors", location: "North Carolina", bio: "Ann Watcher grew up sketching in South Carolina and went on to earn a BFA from the University of South Carolina before studying at the New York Studio School in Greenwich Village. Working both in the studio and en plein air, she paints still lifes, interiors, figures, and landscapes — known for vivid color, dynamic compositions, and confident brushwork that captures mood as much as form.\n\nIn 2017, she was invited by the Ambassador of Bahrain to participate in the exhibition \"Women Artists of the American South.\" She is a Signature Member of the American Impressionist Society and an Associate Member of Oil Painters of America.", website: "https://www.annwatcher.com", instagram: "https://www.instagram.com/annwatcherart/" },
  { name: "Robin Weiss", src: "/assets/artists/robin-weiss.webp", objectPosition: "65% 35%", alt: "smiling gray-bearded man in a denim shirt and bandana in an art gallery", location: "Washington", bio: "Robin Weiss is a Pacific Northwest painter drawn to the fleeting moments most people catch only from the corner of their eye — brief flashes of light and shadow that appear and vanish before you can name them. Working alla prima, he begins and finishes each painting in a single sitting, letting the immediacy of the process match the immediacy of what he's trying to capture.\n\nHis work is rooted in the ever-changing landscape of the Pacific Northwest and driven by a search for what he calls truth and beauty in the ordinary.", website: "https://www.robinweissfineart.com", instagram: "https://www.instagram.com/robinpaulweiss/", facebook: "https://www.facebook.com/p/Robin-Weiss-Fine-Art-100064944795231/" },
  { name: "Chris Willey", src: "/assets/artists/chris-willey.webp", alt: "smiling artist standing beside framed paintings in gallery", location: "Missouri", bio: "Chris Willey is a Missouri-based painter with an MFA in Illustration from Syracuse University and a BFA in Drawing and Painting from the University of Nebraska. A former art professor at the University of Central Missouri, she has competed in 19 national juried plein air events and earned more than 77 awards across international, national, and regional competitions — including Best of Show and Gold.\n\nHer work is held in private and corporate collections in the U.S., Netherlands, and France. She holds Signature status in the Missouri Valley Impressionist Society, MidAmerica Pastel Society, and the International Society of Acrylic Painters, and has been awarded artist residencies in both Italy and the United States.", website: "https://www.chriswilley.com", instagram: "https://www.instagram.com/willey_chris/" },
  { name: "Jeff Williams", src: "/assets/artists/jeff-williams.webp", objectPosition: "30% center", alt: "smiling man in black and white portrait by brick wall", location: "Oklahoma", bio: "Jeff Williams is an Oklahoma-based watercolor painter whose work focuses on the contemporary western landscape — particularly sites with historic architectural components that carry the weight of a place's story. Working both en plein air and in the studio, he paints primarily in larger half-sheet and full-sheet formats, using each painting as a way to document, draw attention to, and start a conversation about the places he encounters.\n\nHis work has been shown in juried and invitational plein air events and exhibitions primarily across the eastern United States, with his current focus turning west.", website: "https://www.jeffwilliamswatercolor.com", instagram: "https://www.instagram.com/jeffwilliamswatercolor/", facebook: "https://www.facebook.com/people/Jeff-Williams-Watercolor/100063542743670/" },
  { name: "Stephen Wysocki", src: "/assets/artists/stephen-wysocki.webp", objectPosition: "30% center", alt: "artist outdoors beside easel painting vintage truck scene", location: "Wisconsin", bio: "Stephen Wysocki is a Wisconsin-based oil painter with a straightforward philosophy: show the beauty in the ordinary. He gravitates toward everyday structures, roadside objects, and the worn textures of things that get overlooked — finding the hard edges, the rust, the odd color, and building paintings that let those things speak.\n\nHe works on toned canvases with thin washes built up to thick sculptural highlights, often exploring warm and cool color triads to create atmosphere and mood. When the studio ideas run dry, he heads outside. Born in 1970, he raises buffalo, loves trout fishing, and gets homesick every time he travels to a painting event.", website: "https://swysockiart.fineartstudioonline.com", instagram: "https://www.instagram.com/swysockiart/" },
];

const AWARDS_JUDGE = { name: "Rick J. Delanty", location: "California", website: "https://www.delantyfineart.com", instagram: "https://www.instagram.com/rickj.delanty/", facebook: "https://www.facebook.com/RickDelantyFineArt/", src: "/assets/artists/rick-j-delanty.webp", alt: "black and white portrait of smiling older man in black blazer and turtleneck sweater", bio: "Rick J. Delanty is a nationally recognized painter with a career spanning more than fifty years, known for award-winning plein air landscapes and coastal scenes throughout the American West. His work is held in the permanent collections of several museums, and he is the author of Beauty Unites Us. The Art Renewal Center designated him as an Associate Living Master.\n\nA Signature Member of the American Society of Marine Artists, the American Impressionist Society, and the Laguna Plein Air Painters Association, Rick has spent decades teaching, judging national competitions, and mentoring fellow artists." };

const GALLERY_ARTISTS = [
  { name: "Hector Acuna", slug: "hector-acuna", medium: "oil-and-pastel", paintings: [
    { filename: "hector-acuna-artist-at-the-easel.webp", title: "Artist at the Easel", alt: "plein air painting of artist painting at an easel on a suburban street" },
    { filename: "hector-acuna-aveda-window-reflection.webp", title: "Aveda Window Reflection", alt: "plein air painting of storefront window reflection of a town square" },
    { filename: "hector-acuna-summer-at-the-beach.webp", title: "Summer at the Beach", alt: "plein air painting of beach scene with an inner tube and figures on shore" },
  ] },
  { name: "Jason Bailey", slug: "jason-bailey", medium: "oil-and-pastel", paintings: [
    { filename: "jason-bailey-main-street-intersection.webp", title: "Main Street Intersection", alt: "plein air painting of small town intersection with american flags on poles" },
    { filename: "jason-bailey-alley-with-utility-poles.webp", title: "Alley with Utility Poles", alt: "plein air painting of alley with brick buildings, utility poles, mountains" },
    { filename: "jason-bailey-railroad-tracks.webp", title: "Railroad Tracks", alt: "plein air painting of freight train on railroad tracks through wooded hills" },
  ] },
  { name: "Jacalyn Beam", slug: "jacalyn-beam", medium: "oil-and-pastel", paintings: [
    { filename: "jacalyn-beam-floral-still-life.webp", title: "Floral Still Life", alt: "plein air painting of floral still life with yellow and pink flowers in vases" },
    { filename: "jacalyn-beam-field-colors.webp", title: "Field Colors", alt: "plein air painting of white farmhouse amid golden autumn trees and meadow" },
    { filename: "jacalyn-beam-morning-on-the-canal.webp", title: "Morning on the Canal", alt: "plein air painting of calm canal reflecting sailboats and waterfront buildings" },
  ] },
  { name: "Bob Beck", slug: "bob-beck", medium: "oil-and-pastel", paintings: [
    { filename: "bob-beck-the-little-stream.webp", title: "The Little Stream", alt: "plein air painting of snowy winter forest with bare trees and small stream" },
    { filename: "bob-beck-may-20th.webp", title: "May 20th", alt: "plein air painting of rural barns and outbuildings in summer landscape" },
    { filename: "bob-beck-moss-point-farm.webp", title: "Moss Point Farm", alt: "plein air painting of farm with silo and barn amid autumn foliage" },
  ] },
  { name: "Michele Byrne", slug: "michele-byrne", medium: "oil-and-pastel", paintings: [
    { filename: "michele-byrne-basilica-morning-light.webp", title: "Basilica Morning Light", alt: "plein air painting of crowd walking toward a grand basilica at golden hour" },
    { filename: "michele-byrne-first-day-in-paris.webp", title: "First Day in Paris", alt: "plein air painting of paris street cafe with red awning and pedestrians" },
  ] },
  { name: "Robin Cheers", slug: "robin-cheers", medium: "oil-and-pastel", paintings: [
    { filename: "robin-cheers-late-afternoon-st-remy.webp", title: "Late Afternoon, St. Rémy", alt: "plein air painting of narrow stone alley with arch and shops in provence" },
    { filename: "robin-cheers-little-pink-house.webp", title: "Little Pink House", alt: "plein air painting of pink cottage with blooming cherry tree in spring" },
    { filename: "robin-cheers-marble-falls-charm.webp", title: "Marble Falls Charm", alt: "plein air painting of teal corner building with utility pole on sunny street" },
  ] },
  { name: "Larry DeGraff", slug: "larry-degraff", medium: "oil-and-pastel", paintings: [
    { filename: "larry-degraff-where-the-rivers-meet.webp", title: "Where the Rivers Meet", alt: "plein air painting of city skyline with tall buildings reflected in a river" },
    { filename: "larry-degraff-wind-on-the-water.webp", title: "Wind on the Water", alt: "plein air painting of calm river with green trees reflected in sunlit water" },
    { filename: "larry-degraff-winters-gems.webp", title: "Winter's Gems", alt: "plein air painting of bare winter trees leaning over a snow-edged river" },
  ] },
  { name: "Rick J. Delanty", slug: "rick-delanty", medium: "oil-and-pastel", paintings: [
    { filename: "rick-delanty-beach-trail.webp", title: "Beach Trail", alt: "plein air painting of a sunlit coastal path along san clemente bluffs overlooking the ocean" },
    { filename: "rick-delanty-dusks-gentle-touch.webp", title: "Dusk's Gentle Touch", alt: "plein air painting of trees silhouetted against a dusky purple sky over calm water" },
    { filename: "rick-delanty-a-quiet-halleluia.webp", title: "A Quiet Halleluia", alt: "plein air painting of golden sunlight bursting through clouds over ocean waves" },
  ] },
  { name: "John Evans", slug: "john-evans", medium: "oil-and-pastel", paintings: [
    { filename: "john-evans-around-the-bend.webp", title: "Around the Bend", alt: "plein air painting of bridge on rural road with red barn and spring tree" },
    { filename: "john-evans-behind-the-sale-barn-3.webp", title: "Behind the Sale Barn", alt: "plein air painting of grain silo and farm buildings on green rolling land" },
    { filename: "john-evans-going-to-town.webp", title: "Going to Town", alt: "plein air painting of rural road leading past a barn and utility poles" },
  ] },
  { name: "Debra Joy Groesser", slug: "debra-joy-groesser", medium: "oil-and-pastel", paintings: [
    { filename: "debra-joy-groesser-autumn-farm-stormy-sky.webp", title: "Calm Before the Storm", alt: "plein air painting of autumn farm buildings under a stormy sky" },
    { filename: "debra-joy-groesser-rocky-coastal-cliffs-ocean.webp", title: "Reverence", alt: "plein air painting of rocky coastal cliffs above the ocean" },
    { filename: "debra-joy-groesser-wetland-marsh-lily-pads.webp", title: "Morning Light, Narada Lake", alt: "plein air painting of a wetland marsh with lily pads at dawn" },
  ] },
  { name: "Kristin Hosbein", slug: "kristin-hosbein", medium: "oil-and-pastel", paintings: [
    { filename: "kristin-hosbein-boats-at-the-marina.webp", title: "Boats at the Marina", alt: "plein air painting of blue sailboat and red motorboat docked at a marina" },
    { filename: "kristin-hosbein-harmony-at-dawn.webp", title: "Harmony at Dawn", alt: "plein air painting of red barn in a green meadow with red peony flowers" },
    { filename: "kristin-hosbein-heart-of-the-hill.webp", title: "Heart of the Hill", alt: "plein air painting of close-up of vibrant hot pink peonies in bloom" },
    { filename: "kristin-hosbein-summer-blooms.webp", title: "Summer Blooms", alt: "plein air painting of pink white and yellow roses blooming in a garden" },
  ] },
  { name: "Ann Larsen", slug: "ann-larsen", medium: "oil-and-pastel", paintings: [
    { filename: "ann-larsen-pier-reflections.webp", title: "Pier Reflections", alt: "plein air painting of wooden pier pilings and green water reflections" },
    { filename: "ann-larsen-apalachicola-blues.webp", title: "Apalachicola Blues", alt: "plein air painting of bright blue building with palm tree on sunny street" },
    { filename: "ann-larsen-beals-island.webp", title: "Beals Island", alt: "plein air painting of two colorful sheds with laundry on a rural dirt road" },
    { filename: "ann-larsen-pumpkin-island-light.webp", title: "Pumpkin Island Light", alt: "plein air painting of lighthouse and buildings on island surrounded by water" },
  ] },
  { name: "John Lasater", slug: "john-lasater", medium: "oil-and-pastel", paintings: [
    { filename: "john-lasater-sinks-cascade.webp", title: "Sinks Cascade", alt: "plein air painting of rushing stream flowing through rocky canyon boulders" },
    { filename: "john-lasater-sunday-mood.webp", title: "Sunday Mood", alt: "plein air painting of country road at dusk with rolling hills and farms" },
    { filename: "john-lasater-the-peaceful-hour.webp", title: "The Peaceful Hour", alt: "plein air painting of weathered barn at sunset with purple hills and dirt path" },
  ] },
  { name: "Dan Marshall", slug: "dan-marshall", medium: "watercolor", paintings: [
    { filename: "dan-marshall-golden-hills-landscape.webp", title: "Golden Hills Landscape", alt: "plein air painting of watercolor of rolling golden hills under gray sky" },
    { filename: "dan-marshall-mountain-town.webp", title: "Mountain Town", alt: "plein air painting of watercolor of a mountain town with autumn foliage" },
    { filename: "dan-marshall-prairie-cloudscape.webp", title: "Prairie Cloudscape", alt: "plein air painting of watercolor prairie with dramatic storm clouds" },
  ] },
  { name: "Brenda Pinnick", slug: "brenda-pinnick", medium: "oil-and-pastel", paintings: [
    { filename: "brenda-pinnick-all-the-colors.webp", title: "All the Colors", alt: "plein air painting of red and yellow flowers in a blue vase with cherries" },
    { filename: "brenda-pinnick-ode-to-spring.webp", title: "Ode to Spring", alt: "plein air painting of cottage with flowering shrubs along a garden path" },
    { filename: "brenda-pinnick-our-door-is-always-open.webp", title: "Our Door Is Always Open", alt: "plein air painting of sunlit cottage with pink flowering shrubs and trees" },
  ] },
  { name: "Radhika Srinivas", slug: "radhika-srinivas", medium: "watercolor", paintings: [
    { filename: "radhika-srinivas-columbia-downtown.webp", title: "Columbia Downtown", alt: "plein air painting of black and white watercolor of downtown with clock tower" },
    { filename: "radhika-srinivas-morning-light-in-salzburg.webp", title: "Morning Light in Salzburg", alt: "plein air painting of european street corner with domed building and bicycles" },
    { filename: "radhika-srinivas-rte-441.webp", title: "Rte. 441", alt: "plein air painting of watercolor highway scene under dramatic storm clouds" },
  ] },
  { name: "Steve Stauffer", slug: "steve-stauffer", medium: "oil-and-pastel", paintings: [
    { filename: "steve-stauffer-a-poplar-fall.webp", title: "A Poplar Fall", alt: "plein air painting of tall golden poplar trees with snow-capped mountains" },
    { filename: "steve-stauffer-borrego-plein-air.webp", title: "Borrego Plein Air", alt: "plein air painting of artist easel in desert with yellow wildflowers" },
    { filename: "steve-stauffer-cottonwood-creek-gold.webp", title: "Cottonwood Creek Gold", alt: "plein air painting of mountain creek with golden cottonwood trees in fall" },
  ] },
  { name: "Jill Stefani Wagner", slug: "jill-stefani-wagner", medium: "oil-and-pastel", paintings: [
    { filename: "jill-stefani-wagner-my-path.webp", title: "My Path", alt: "plein air painting of sandy path through golden grasses leading to a river" },
    { filename: "jill-stefani-wagner-pleasanton-bakery.webp", title: "Pleasanton Bakery", alt: "plein air painting of outdoor cafe with red umbrellas on a sunny afternoon" },
    { filename: "jill-stefani-wagner-the-queen-and-her-court.webp", title: "The Queen and Her Court", alt: "plein air painting of white wildflowers blooming in a lush purple meadow" },
  ] },
  { name: "Durre Waseem", slug: "durre-waseem", medium: "oil-and-pastel", paintings: [
    { filename: "durre-waseem-outdoor-cafe.webp", title: "Outdoor Café", alt: "plein air painting of sunny outdoor cafe with orange umbrellas and patrons" },
    { filename: "durre-waseem-tennessee-street.webp", title: "Tennessee Street", alt: "plein air painting of city street with tennessee theatre sign and figures" },
    { filename: "durre-waseem-horses-under-trees.webp", title: "Horses Under Trees", alt: "plein air painting of horses grazing in dappled shade under green trees" },
  ] },
  { name: "Ann Watcher", slug: "ann-watcher", medium: "oil-and-pastel", paintings: [
    { filename: "ann-watcher-orange-slices.webp", title: "Orange Slices", alt: "plein air painting of orange slices in a blue bowl on gray background" },
    { filename: "ann-watcher-teapot-and-azaleas.webp", title: "Teapot and Azaleas", alt: "plein air painting of silver teapot with green cup and orange flowers" },
    { filename: "ann-watcher-under-the-pink-dogwood.webp", title: "Under the Pink Dogwood", alt: "plein air painting of garden with pink blooming trees and outdoor table" },
  ] },
  { name: "Robin Weiss", slug: "robin-weiss", medium: "oil-and-pastel", paintings: [
    { filename: "robin-weiss-morning-hike.webp", title: "Morning Hike", alt: "plein air painting of two figures walking on a driftwood-strewn beach" },
    { filename: "robin-weiss-spring-barn.webp", title: "Spring Barn", alt: "plein air painting of red barn in a spring meadow with blooming trees" },
  ] },
  { name: "Chris Willey", slug: "chris-willey", medium: "oil-and-pastel", paintings: [
    { filename: "chris-willey-padula-hillside.webp", title: "Padula Hillside", alt: "plein air painting of rolling hillside with mountains in the background" },
    { filename: "chris-willey-sidewalk-gardens.webp", title: "Sidewalk Gardens", alt: "plein air painting of garden path lined with purple, white, and yellow blooms" },
    { filename: "chris-willey-tuscan-sunset.webp", title: "Tuscan Sunset", alt: "plein air painting of vivid orange sunset over a rocky hilly landscape" },
  ] },
  { name: "Jeff Williams", slug: "jeff-williams", medium: "watercolor", paintings: [
    { filename: "jeff-williams-san-saba-river-rocks.webp", title: "San Saba River Rocks", alt: "plein air painting of dry riverbed with rocky banks under a moody sky" },
    { filename: "jeff-williams-all-in-a-days-work.webp", title: "All in a Day's Work", alt: "plein air painting of oak tree with small boat resting at the rivers edge" },
    { filename: "jeff-williams-cimbar-still-life.webp", title: "Cimbar Still Life", alt: "plein air painting of industrial grain elevator and conveyor belt structure" },
  ] },
  { name: "Stephen Wysocki", slug: "stephen-wysocki", medium: "oil-and-pastel", paintings: [
    { filename: "stephen-wysocki-boat-at-the-dock.webp", title: "Boat at the Dock", alt: "plein air painting of small boat floating beneath a weathered wooden dock" },
    { filename: "stephen-wysocki-lakeside-pines.webp", title: "Lakeside Pines", alt: "plein air painting of calm lakeside with tall pine trees and soft clouds" },
    { filename: "stephen-wysocki-vineyard-landscape.webp", title: "Vineyard Landscape", alt: "plein air painting of colorful vineyard field with trees and lavender hills" },
  ] },
];

function normalizeArtistName(name) {
  return name
    .split(/\s+/)
    .filter((token) => !/^[a-z]\.?$/i.test(token))
    .join(" ")
    .toLowerCase();
}

async function migrateArtists() {
  console.log("Uploading artist documents (this uploads ~95 images, expect it to take a while)...");

  const galleryByNormalizedName = new Map(
    GALLERY_ARTISTS.map((g) => [normalizeArtistName(g.name), g])
  );

  const roster = [...ARTISTS, AWARDS_JUDGE];
  for (const [i, person] of roster.entries()) {
    const isJudge = person === AWARDS_JUDGE;
    const gallery = galleryByNormalizedName.get(normalizeArtistName(person.name));
    if (!gallery) {
      console.warn(`  WARNING: no gallery.ts entry matches "${person.name}" — creating with no paintings.`);
    }

    const headshot = await uploadImageAsset(person.src);
    const paintings = gallery
      ? await Promise.all(
          gallery.paintings.map(async (p, pi) => ({
            _key: `p${pi}`,
            image: await uploadImageAsset(`/artwork/${p.filename}`),
            title: p.title,
            alt: p.alt,
          }))
        )
      : undefined;

    await client.createOrReplace({
      _id: `artist-${slugify(person.name)}`,
      _type: "artist",
      name: person.name,
      slug: { _type: "slug", current: gallery?.slug ?? slugify(person.name) },
      headshot,
      ...(person.alt && { headshotAlt: person.alt }),
      ...(person.objectPosition && { objectPosition: person.objectPosition }),
      location: person.location,
      bio: person.bio,
      ...(person.website && { website: person.website }),
      ...(person.instagram && { instagram: person.instagram }),
      ...(person.facebook && { facebook: person.facebook }),
      isJudge,
      ...(gallery && { medium: gallery.medium }),
      ...(paintings && { paintings }),
      orderRank: `a${i}`,
    });
    console.log(`  artist: ${person.name}${gallery ? ` (${gallery.paintings.length} paintings)` : ""}`);
  }
}

// ---------------------------------------------------------------------------
// homepage singleton (Phase 5b) — seeds the section order the homepage
// already had before section composition existed, so cutover is identical.
// ---------------------------------------------------------------------------

async function migrateHomepage() {
  console.log("Uploading homepage singleton...");

  const heroBg = await uploadImageAsset("/assets/spring-greens-djgroesser.webp");
  const aboutImg = await uploadImageAsset("/assets/plein-air-painter-niobrara-river.webp");

  const sections = [
    {
      _key: "hero",
      _type: "heroSection",
      eyebrow: "September 13–19, 2026",
      title: "Heartland Plein Air Festival",
      subtitle:
        "Art, out in the open. Twenty-five nationally recognized artists, painting Douglas and Sarpy County exactly as it looks in September.",
      backgroundImage: heroBg,
      primaryCta: { label: "View Schedule", href: "/schedule" },
      secondaryCta: { label: "Buy Tickets", href: "/tickets" },
      tertiaryCta: { label: "Meet the Artists", href: "/artists" },
    },
    {
      _key: "about",
      _type: "aboutSection",
      eyebrow: "About the Festival",
      title: "Art Made Here",
      paragraphs: [
        'Plein air is French for "open air" — painting done outside, on location, in direct response to the light and landscape in front of you. No studio, no reference photos. Just the artist and the scene as it actually is.',
        "During festival week, 25 nationally recognized artists spread out across more than 20 locations in Douglas and Sarpy Counties — historic neighborhoods, scenic overlooks, landmarks, and everyday places made interesting by the right set of eyes. The public is welcome to follow along, watch the work happen, and talk to the artists as they paint.",
        "Every piece in the final exhibition was made that week, on-site. What you're seeing — and buying — is a record of a specific place at a specific moment in September 2026. That's not something you can replicate.",
      ],
      linkLabel: "Read Our Full Story →",
      linkHref: "/about",
      image: aboutImg,
    },
    {
      _key: "highlights",
      _type: "festivalHighlightsSection",
      eyebrow: "What to Expect",
      title: "Festival Highlights",
      highlights: [
        {
          _key: "h0",
          icon: "Users",
          title: "25 National Artists",
          description:
            "Twenty-five nationally recognized painters, working outdoors across the metro for a full week.",
        },
        {
          _key: "h1",
          icon: "MapPin",
          title: "20+ Scenic Locations",
          description:
            "Parks, historic neighborhoods, scenic overlooks, and everyday places made interesting by the right set of eyes.",
        },
        {
          _key: "h2",
          icon: "Eye",
          title: "Watch Artists Create",
          description:
            "Follow artists across the metro, watch the work happen in real time, and talk to them as they paint.",
        },
        {
          _key: "h3",
          icon: "ShoppingBag",
          title: "Exhibition & Auction",
          description:
            "Every painting in the exhibition was made on-site that week — what you're buying is a record of this place in September 2026.",
        },
      ],
    },
    { _key: "scheduleTeaser", _type: "scheduleTeaserSection" },
    {
      _key: "vipPass",
      _type: "vipPassTeaserSection",
      eyebrow: "Get Closer to the Art",
      title: "Collector VIP Pass",
      description:
        "Most festival events are free and open to the public. For $125, the Collector VIP Pass gets you a private artist Meet & Greet, priority seating at the Judge's Lecture, the Collectors Preview Reception and Awards Presentation, and priority seating at the live auction. Prefer a standalone ticket? The lecture is $25 and the Collectors Preview Reception is $95.",
      ctaLabel: "View Tickets",
      ctaHref: "/tickets",
    },
    {
      _key: "locations",
      _type: "paintingLocationsSection",
      eyebrow: "Where the Art Happens",
      title: "Painting Locations",
      description:
        "More than 20 scenic spots across Douglas & Sarpy County — historic neighborhoods, parks, overlooks, and everyday places worth a second look.",
      helperText:
        "Filter by day to see where artists will be painting, then click a pin on the map for location details and directions.",
    },
    { _key: "artistSpotlight", _type: "artistSpotlightSection" },
    { _key: "sponsors", _type: "sponsorsSection" },
    {
      _key: "faqTeaser",
      _type: "faqTeaserSection",
      eyebrow: "Questions?",
      title: "Frequently Asked Questions",
      linkLabel: "View All FAQs",
      linkHref: "/faq",
    },
    { _key: "newsletter", _type: "newsletterCtaSection" },
  ];

  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    sections,
  });
  console.log(`  homepage: ${sections.length} sections`);
}

// ---------------------------------------------------------------------------
// formConfig (Phase 6) — seeds each form's field list copy-identical to its
// current hardcoded labels/placeholders/maxLengths, so cutover changes
// nothing visible. Regex/pattern validation (zip, phone format) and the
// two youth-paintout consent checkboxes are NOT part of this content type —
// they stay hardcoded in the form components themselves.
// ---------------------------------------------------------------------------

const FORM_CONFIGS = [
  {
    formKey: "contact",
    name: "Contact Form",
    submitLabel: "Send Message",
    fields: [
      { key: "name", label: "Name", placeholder: "Your name", type: "text", required: true, maxLength: 100 },
      { key: "email", label: "Email", placeholder: "hello@example.com", type: "email", required: true, maxLength: 255 },
      { key: "topic", label: "Topic", type: "select", required: true },
      { key: "subject", label: "Subject", placeholder: "Give us a quick summary", type: "text", required: true, maxLength: 150 },
      { key: "message", label: "Message", placeholder: "Tell us more...", type: "textarea", required: true, maxLength: 2000 },
    ],
  },
  {
    formKey: "sponsorshipInquiry",
    name: "Sponsorship Inquiry Form",
    submitLabel: "Submit Sponsorship Inquiry",
    successTitle: "Inquiry sent",
    successMessage: "Thanks for your interest in sponsoring the festival — we'll follow up soon.",
    fields: [
      { key: "name", label: "Name", placeholder: "Your name", type: "text", required: true, maxLength: 100 },
      { key: "organization", label: "Organization / Business Name", placeholder: "Your organization", type: "text", required: true, maxLength: 150 },
      { key: "email", label: "Email", placeholder: "hello@example.com", type: "email", required: true, maxLength: 255 },
      { key: "phone", label: "Phone", type: "tel", placeholder: "(402) 555-0100", required: false, maxLength: 30 },
      { key: "level", label: "Sponsorship Level", type: "select", required: true },
      { key: "message", label: "Message", placeholder: "Anything else we should know?", type: "textarea", required: false, maxLength: 2000 },
    ],
  },
  {
    formKey: "advertisingInquiry",
    name: "Advertising Inquiry Form",
    submitLabel: "Submit Ad Reservation",
    successTitle: "Reservation sent",
    successMessage: "Thanks for reserving your ad space — we'll follow up with next steps.",
    fields: [
      { key: "name", label: "Name", placeholder: "Your name", type: "text", required: true, maxLength: 100 },
      { key: "organization", label: "Organization / Business Name", placeholder: "Your organization", type: "text", required: true, maxLength: 150 },
      { key: "email", label: "Email", placeholder: "hello@example.com", type: "email", required: true, maxLength: 255 },
      { key: "phone", label: "Phone", type: "tel", placeholder: "(402) 555-0100", required: false, maxLength: 30 },
      { key: "level", label: "Ad Size", type: "select", required: true },
      { key: "message", label: "Message", placeholder: "Anything else we should know?", type: "textarea", required: false, maxLength: 2000 },
    ],
  },
  {
    formKey: "openDivisionInquiry",
    name: "Open Division Registration Form",
    submitLabel: "Submit Registration",
    successTitle: "Inquiry sent",
    successMessage: "Thanks for reaching out. We'll get back to you as soon as we can.",
    fields: [
      { key: "name", label: "Name", placeholder: "Your name", type: "text", required: true, maxLength: 100 },
      { key: "street", label: "Street Address", placeholder: "123 Main St.", type: "text", required: true, maxLength: 150 },
      { key: "city", label: "City", placeholder: "Omaha", type: "text", required: true, maxLength: 100 },
      { key: "state", label: "State", placeholder: "NE", type: "text", required: true, maxLength: 50 },
      { key: "zip", label: "Zip Code", placeholder: "68127", type: "text", required: true, maxLength: 10 },
      { key: "email", label: "Email", placeholder: "hello@example.com", type: "email", required: true, maxLength: 255 },
      { key: "phone", label: "Phone", type: "tel", placeholder: "(402) 555-0100", required: false, maxLength: 30 },
      { key: "level", label: "Primary Medium", type: "select", required: true },
      { key: "message", label: "Message", placeholder: "Anything else we should know?", type: "textarea", required: false, maxLength: 2000 },
    ],
  },
  {
    formKey: "youthPaintout",
    name: "Youth Paintout Registration Form",
    submitLabel: "Register for the Youth Paintout",
    fields: [
      { key: "firstName", label: "Youth's First Name", placeholder: "First name", type: "text", required: true, maxLength: 100 },
      { key: "lastName", label: "Youth's Last Name", placeholder: "Last name", type: "text", required: true, maxLength: 100 },
      { key: "age", label: "Youth's Age", placeholder: "Age", type: "text", required: true, maxLength: 3 },
      { key: "streetAddress", label: "Street Address", placeholder: "Street address", type: "text", required: true, maxLength: 200 },
      { key: "city", label: "City", placeholder: "City", type: "text", required: true, maxLength: 100 },
      { key: "state", label: "State", placeholder: "State", type: "text", required: true, maxLength: 50 },
      { key: "zip", label: "ZIP Code", placeholder: "ZIP code", type: "text", required: true, maxLength: 10 },
      { key: "phone", label: "Phone", placeholder: "(402) 555-0100", type: "tel", required: true, maxLength: 30 },
      { key: "email", label: "Email Address", placeholder: "you@example.com", type: "email", required: true, maxLength: 255 },
      { key: "parentName", label: "Parent or Guardian Name", placeholder: "Parent or guardian's full name", type: "text", required: true, maxLength: 150 },
      { key: "emergencyContactName", label: "Emergency Contact Name", placeholder: "Full name", type: "text", required: true, maxLength: 150 },
      { key: "emergencyContactPhone", label: "Emergency Contact Phone", placeholder: "(402) 555-0100", type: "tel", required: true, maxLength: 30 },
      { key: "relationship", label: "Emergency Contact's Relationship to Student", placeholder: "e.g. Grandparent, family friend", type: "text", required: true, maxLength: 100 },
    ],
  },
];

async function migrateFormConfigs() {
  console.log("Uploading formConfig documents...");
  for (const config of FORM_CONFIGS) {
    await client.createOrReplace({
      _id: `formConfig-${config.formKey}`,
      _type: "formConfig",
      formKey: config.formKey,
      name: config.name,
      submitLabel: config.submitLabel,
      ...(config.successTitle && { successTitle: config.successTitle }),
      ...(config.successMessage && { successMessage: config.successMessage }),
      fields: config.fields.map((f, i) => ({ _key: `f${i}`, ...f })),
    });
    console.log(`  formConfig: ${config.name}`);
  }
}

const SECTIONS = {
  sponsors: migrateSponsors,
  schedule: migrateSchedule,
  adSizes: migrateAdSizes,
  faq: migrateFaq,
  artists: migrateArtists,
  homepage: migrateHomepage,
  formConfigs: migrateFormConfigs,
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
