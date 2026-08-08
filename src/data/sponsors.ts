// Grant partners — funders and media partners, shown above the paid sponsor tiers.
export const sponsors = [
  {
    name: "Plein Air Magazine",
    logo: "/assets/plein-air-magazine-logo.png",
    alt: "PleinAir Magazine logo",
    url: "https://pleinairmagazine.com/",
  },
  {
    name: "Art of the West",
    logo: "/assets/art-of-the-west-logo.png",
    alt: "Art of the West magazine logo",
    url: "https://aotw.com/",
  },
  {
    name: "Visit Nebraska",
    logo: "/assets/visit-nebraska-logo.png",
    alt: "Visit Nebraska logo with state outline",
    url: "https://visitnebraska.com/",
  },
  {
    name: "Wiebe Ralston Foundation",
    logo: "/assets/wiebe-ralston-foundation-logo.png",
    alt: "Wiebe Ralston Foundation logo with state outline",
  },
  {
    name: "Ralston Archives Museum",
    logo: "/assets/ralston-archives-museum-logo.png",
    alt: "Frank & Velma Johnson Ralston Archives Museum logo",
    url: "https://www.ralstonarchivesmuseum.com/",
  },
  {
    name: "Nebraska Arts Council / Nebraska Cultural Endowment",
    logo: "/assets/nebraska-arts-council-logo.png",
    alt: "Nebraska Arts Council and Nebraska Cultural Endowment logos",
    url: "https://www.artscouncil.nebraska.gov/",
  },
  {
    name: "Sherwood Foundation",
    logo: "/assets/sherwood-foundation-logo.png",
    alt: "The Sherwood Foundation logo with oak tree",
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
        name: "Art of the West",
        logo: "/assets/art-of-the-west-logo.png",
        alt: "Art of the West magazine logo",
        url: "https://aotw.com/",
      },
      {
        name: "Ralston Keno",
        logo: "/assets/sponsors/ralston-keno.webp",
        alt: "Ralston Keno logo",
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
        alt: "United Seeds Inc logo",
        url: "https://unitedseeds.com/",
      },
      {
        name: "JEO",
        logo: "/assets/sponsors/jeo-consulting-group.webp",
        alt: "JEO Consulting Group logo",
        url: "https://jeo.com/",
      },
      {
        name: "E&A Consulting",
        logo: "/assets/sponsors/ea-consulting-group.webp",
        alt: "E&A Consulting Group logo",
        url: "https://eacg.com/",
      },
      {
        name: "King Kong",
        logo: "/assets/sponsors/king-kong.webp",
        alt: "King Kong restaurants logo",
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
        alt: "Edward Jones logo",
        url: "https://www.edwardjones.com/us-en/financial-advisor/jim-goodman",
      },
      {
        name: "Agave Azteca / Pancake Cafe",
        logo: "/assets/sponsors/pancake-cafe.webp",
        alt: "Agave Azteca and Pancake Cafe logo",
        url: "https://agaveazteca.com/",
      },
      {
        name: "Tanners Bar & Grill",
        logo: "/assets/sponsors/tanners-bar-and-grill.webp",
        alt: "Tanners Bar & Grill logo",
        url: "https://tannersbarandgrill.com/",
      },
      {
        name: "Dayspring Bank",
        logo: "/assets/sponsors/dayspring-bank.webp",
        alt: "Dayspring Bank logo",
        url: "https://www.dayspring.bank/",
      },
      {
        name: "Pivot at the Hinge",
        url: "https://www.ralstoneconomicdevelopment.org/projects",
      },
      {
        name: "Jensen Gardens",
        logo: "/assets/sponsors/jensen-gardens.webp",
        alt: "Jensen Gardens logo",
        url: "https://www.jensengardens.com/",
      },
      {
        name: "PJ Morgan — Ryan Ellis",
        logo: "/assets/sponsors/pj-morgan.webp",
        alt: "PJ Morgan Real Estate logo",
        url: "https://pjmorgan.com/team-member/ryan-ellis/",
      },
      {
        name: "Benson Creative District",
        logo: "/assets/benson-creative-district-logo.png",
        alt: "Benson Creative District logo",
        url: "https://www.bensoncreativedistrict.org/",
      },
      {
        name: "eCreamery",
        url: "https://ecreamery.com/",
      },
      {
        name: "Debra Joy Groesser Fine Art",
        url: "https://www.debrajoygroesserfineart.com/",
      },
      {
        name: "South O Roofing",
        logo: "/assets/sponsors/south-o-roofing.webp",
        alt: "South O Roofing logo",
        url: "https://southoroofing.com/",
      },
      {
        name: "Lovely Brewing Co.",
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
