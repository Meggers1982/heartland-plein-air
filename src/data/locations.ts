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
    websiteUrl: "https://atthegranary.com/",
    events: [
      { dayId: "day-sep-18", dayLabel: "Fri · Sep 18", time: "5:30 – 8 PM", name: "Collectors Preview Reception and Awards Presentation" },
      { dayId: "day-sep-19", dayLabel: "Sat · Sep 19", time: "11 AM – 5 PM", name: "Public Exhibition & Sale" },
      { dayId: "day-sep-19", dayLabel: "Sat · Sep 19", time: "Noon – 1 PM", name: "Live Auction — Quick Paint Pieces" },
    ],
  },
];
