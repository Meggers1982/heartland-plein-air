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

const SECTIONS = {
  sponsors: migrateSponsors,
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
