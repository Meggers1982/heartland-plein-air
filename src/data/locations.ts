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
};

export const festivalLocations: FestivalLocation[] = [
  {
    key: "wildwood-park",
    name: "Wildwood Park",
    address: "Ralston Ave. & 78th St., Ralston, NE",
    lat: 41.2055,
    lng: -96.0436,
    events: [
      { dayId: "day-sep-12", dayLabel: "Sat · Sep 12", time: "10 AM – 2 PM", name: "Youth Paint Out" },
    ],
  },
  {
    key: "baright-library",
    name: "Baright Public Library",
    address: "5555 S. 77th St., Ralston, NE",
    lat: 41.2096,
    lng: -96.0439,
    events: [
      { dayId: "day-sep-12", dayLabel: "Sat · Sep 12", time: "5 – 7 PM", name: "Youth Exhibition" },
      { dayId: "day-sep-17", dayLabel: "Thu · Sep 17", time: "5 – 6 PM", name: "Artist Lecture by the Plein Air Judge" },
    ],
  },
  {
    key: "benson",
    name: "Benson",
    address: "62nd & Maple, Omaha, NE",
    lat: 41.2871,
    lng: -95.9750,
    events: [
      { dayId: "day-sep-14", dayLabel: "Mon · Sep 14", time: "Lunchtime", name: "Quick Paint Competition" },
    ],
  },
  {
    key: "dundee",
    name: "Dundee",
    address: "50th & Underwood, Omaha, NE",
    lat: 41.2691,
    lng: -95.9869,
    events: [
      { dayId: "day-sep-15", dayLabel: "Tue · Sep 15", time: "Lunchtime", name: "Quick Paint Competition" },
    ],
  },
  {
    key: "cathedral-castle",
    name: "Cathedral & Castle District",
    address: "40th St. between Cuming & Davenport, Omaha, NE",
    lat: 41.2649,
    lng: -95.9697,
    events: [
      { dayId: "day-sep-16", dayLabel: "Wed · Sep 16", time: "Lunchtime", name: "Quick Paint Competition" },
    ],
  },
  {
    key: "downtown-ralston",
    name: "Downtown Ralston",
    address: "Main St. & 77th St., Ralston, NE",
    lat: 41.2090,
    lng: -96.0445,
    events: [
      { dayId: "day-sep-17", dayLabel: "Thu · Sep 17", time: "6 – 8 PM", name: "Evening Quick Paint Competition during Concert" },
    ],
  },
  {
    key: "the-granary",
    name: "The Granary",
    address: "7401 Main St., Ralston, NE",
    lat: 41.2098,
    lng: -96.0405,
    events: [
      { dayId: "day-sep-18", dayLabel: "Fri · Sep 18", time: "5 – 8 PM", name: "Collector's Soirée" },
      { dayId: "day-sep-19", dayLabel: "Sat · Sep 19", time: "1 – 4 PM", name: "Public Exhibition and Auction" },
    ],
  },
];