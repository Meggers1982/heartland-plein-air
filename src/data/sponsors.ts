export type Partner = {
  name: string;
  logo: string;
  alt: string;
  url?: string;
  // Kept out of the "Presented with Support From" grid on /sponsors, but still
  // shown in the site footer strip and the homepage "Made Possible By" row.
  // Use this instead of deleting the entry — the array feeds all three places,
  // so removing a partner here removes them from every page on the site.
  hideFromPartnersGrid?: boolean;
};

// Funders and media partners. Rendered in THREE places, so edit with care:
//   1. /sponsors — the "Presented with Support From" grid (respects
//      `hideFromPartnersGrid`)
//   2. SiteFooter — the "Sponsors & Partners" strip, on every page
//   3. SponsorsSection — the homepage "Made Possible By" row
export const sponsors: Partner[] = [
  {
    // Media partner. Off the /sponsors grid per client request 2026-08-09,
    // but still credited in the footer and on the homepage.
    name: "Plein Air Magazine",
    logo: "/assets/plein-air-magazine-logo.png",
    alt: "pleinair magazine logo",
    url: "https://pleinairmagazine.com/",
    hideFromPartnersGrid: true,
  },
  {
    // Off the /sponsors grid per client request 2026-08-09; recognized there
    // in the Platinum tier instead. Still credited in the footer and homepage.
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

// Paid sponsor tiers. Logo size steps down by level (see `logoHeight` in
// Sponsors.tsx); Bronze is name-only by design. Sponsors without a `logo`
// render as a name card until artwork is supplied.
export const sponsorLevels = [
  {
    name: "Platinum Sponsors",
    id: "platinum-sponsors",
    sponsors: [
      {
        // Recognized here rather than in the "Presented with Support From"
        // grid, which it was removed from on 2026-08-09.
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
    name: "Gold Sponsors",
    id: "gold-sponsors",
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
    name: "Silver Sponsors",
    id: "silver-sponsors",
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
        // The tagline was cropped off this mark — it's cream-on-cream and
        // would be invisible against the page background.
        name: "Lovely Brew Co.",
        logo: "/assets/sponsors/lovely-brew-co.webp",
        alt: "lovely brew co. logo",
        url: "https://www.lovelybrewco.com/",
      },
    ],
  },
  {
    name: "Bronze Sponsors",
    id: "bronze-sponsors",
    // Bronze recognition is name-only — no logos at this level.
    nameOnly: true,
    sponsors: [
      {
        name: "John L. Hoich Foundation",
      },
      {
        name: "Embris Group",
        url: "https://www.embris.com/",
      },
    ],
  },
];
