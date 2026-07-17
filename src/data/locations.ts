export type LocationEvent = {
  dayId: string;
  dayLabel: string;
  time?: string;
  name: string;
};

export type FestivalLocation = {
  key: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  description: string;
  events: LocationEvent[];
  websiteUrl?: string;
};

export const festivalLocations: FestivalLocation[] = [
  {
    key: "wildwood-park",
    name: "Wildwood Park",
    address: "78th & Ralston Ave., Ralston, NE",
    lat: 41.2055,
    lng: -96.0436,
    description:
      "A neighborhood park in Ralston, Nebraska, hosting the festival's Youth Paintout, where local young artists take their easels outdoors for a morning of open-air painting.",
    events: [
      { dayId: "day-sep-12", dayLabel: "Sat · Sep 12", time: "10 AM – Noon", name: "Youth Paintout" },
    ],
  },
  {
    key: "baright-library",
    name: "Baright Public Library",
    address: "5555 S. 77th St., Ralston, NE",
    lat: 41.2096,
    lng: -96.0439,
    description:
      "Ralston's public library, home to the festival's Youth Art Show Reception and Festival Awards Judge Rick J. Delanty's ticketed lecture on Impressionism and Plein Air.",
    events: [
      { dayId: "day-sep-12", dayLabel: "Sat · Sep 12", time: "6 – 7:30 PM", name: "Youth Art Show Reception" },
      { dayId: "day-sep-17", dayLabel: "Thu · Sep 17", time: "5 – 6 PM", name: "Judge's Lecture — Impressionism & Plein Air (Ticketed)" },
    ],
  },
  {
    key: "downtown-ralston",
    name: "Downtown Ralston / Hinge Creative District",
    address: "Main St. & 77th St., Ralston, NE",
    lat: 41.2090,
    lng: -96.0445,
    description:
      "The heart of Ralston's HINGE Creative District, where festival artists paint along Main Street during the Monday Lunch Break Paintout and the Third Thursday evening paintout, and where the Quick Paint Competition takes place on the festival's closing Saturday.",
    events: [
      { dayId: "day-sep-14", dayLabel: "Mon · Sep 14", time: "11 AM – 1:30 PM", name: "Lunch Break Paintout" },
      { dayId: "day-sep-17", dayLabel: "Thu · Sep 17", time: "6 – 8 PM", name: "Third Thursday — Artists Painting During Tunes in Town Square" },
      { dayId: "day-sep-19", dayLabel: "Sat · Sep 19", time: "9 – 11 AM", name: "Quick Paint Competition" },
    ],
  },
  {
    key: "cathedral-castle",
    name: "Castle & Cathedral Creative District",
    address: "Joslyn Castle & St. Cecilia's Cathedral, Omaha, NE",
    lat: 41.2649,
    lng: -95.9697,
    description:
      "Omaha's Castle & Cathedral Creative District, home to Joslyn Castle and St. Cecilia's Cathedral, hosts a Tuesday Lunch Break Paintout during festival week.",
    events: [
      { dayId: "day-sep-15", dayLabel: "Tue · Sep 15", time: "11 AM – 1:30 PM", name: "Lunch Break Paintout" },
    ],
  },
  {
    key: "benson",
    name: "Benson Creative District",
    address: "62nd & Maple, Omaha, NE",
    lat: 41.2871,
    lng: -95.9750,
    description:
      "Omaha's Benson Creative District hosts a midweek Lunch Break Paintout, with festival artists painting throughout the neighborhood.",
    events: [
      { dayId: "day-sep-16", dayLabel: "Wed · Sep 16", time: "11 AM – 1:30 PM", name: "Lunch Break Paintout" },
    ],
  },
  {
    key: "dundee",
    name: "Dundee Creative District",
    address: "50th & Underwood, Omaha, NE",
    lat: 41.2691,
    lng: -95.9869,
    description:
      "Omaha's Dundee Creative District hosts a Thursday Lunch Break Paintout before the festival's Third Thursday evening events move to Ralston.",
    events: [
      { dayId: "day-sep-17", dayLabel: "Thu · Sep 17", time: "11 AM – 1:30 PM", name: "Lunch Break Paintout" },
    ],
  },
  {
    key: "the-granary",
    name: "Venues at the Granary",
    address: "7401 Main St., Ralston, NE",
    lat: 41.2098,
    lng: -96.0405,
    description:
      "Venues at the Granary in Ralston hosts the festival's Collectors Preview Reception and Awards Presentation, the Saturday Public Exhibition & Sale, and the live auction of Quick Paint pieces.",
    websiteUrl: "https://atthegranary.com/",
    events: [
      { dayId: "day-sep-18", dayLabel: "Fri · Sep 18", time: "5:30 – 8 PM", name: "Collectors Preview Reception and Awards Presentation" },
      { dayId: "day-sep-19", dayLabel: "Sat · Sep 19", time: "11 AM – 5 PM", name: "Public Exhibition & Sale" },
      { dayId: "day-sep-19", dayLabel: "Sat · Sep 19", time: "Noon – 1 PM", name: "Live Auction — Quick Paint Pieces" },
    ],
  },
];
