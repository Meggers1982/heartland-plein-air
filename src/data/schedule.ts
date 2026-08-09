export type Audience = "public" | "ticketed" | "artists";

// A specific spot within a Lunch Break Paintout district where the public can
// expect to find artists working. Distinct from the event's own `location`,
// which names the district as a whole.
export type PaintoutSpot = {
  name: string;
  address?: string;
  note?: string;
};

export type ScheduleEvent = {
  time?: string;
  name: string;
  location?: string;
  address?: string;
  // Individual painting spots within the event's district.
  spots?: PaintoutSpot[];
  // Per-event sponsor credit. Sits on the event rather than the day so the
  // attribution stays with the event that was actually sponsored.
  sponsor?: string;
  sponsorLogo?: string;
  sponsorAlt?: string;
  sponsorUrl?: string;
};

export type ScheduleDay = {
  id: string;
  dayShort: string;
  dayLong: string;
  title: string;
  narrative: string;
  audience: Audience;
  events?: ScheduleEvent[];
  logo?: string;
  logoAlt?: string;
  logoUrl?: string;
};

export const days: ScheduleDay[] = [
  {
    id: "day-sep-12",
    dayShort: "Sat · Sep 12",
    dayLong: "Saturday, September 12",
    title: "It Starts with the Kids",
    audience: "public",
    narrative:
      "Before the festival officially opens, young artists get the spotlight. Local youth take their easels to Wildewood Park for a morning of open-air painting — then celebrate their work at the Youth Art Show Reception that evening at the Baright Public Library.",
    events: [
      {
        time: "10 AM – Noon",
        name: "Youth Paintout",
        location: "Wildewood Park",
        address: "78th & Ralston Ave., Ralston, NE",
      },
      {
        time: "Noon – 5 PM",
        name: "Artwork Framing & Hanging — Not Open to the Public",
      },
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
    narrative:
      "The invited artists gather for check-in, canvas stamping, and orientation. The calm before the paint flies.",
    events: [
      {
        time: "3 PM",
        name: "Artist Check-In, Canvas Stamping & Orientation",
      },
      {
        time: "4 – 5:30 PM",
        name: "Artist Meet & Greet",
      },
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
          {
            name: "Wildewood Park",
            address: "78th & Ralston Ave., Ralston, NE",
          },
          {
            name: "Historic Downtown Ralston",
          },
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
        address: "Joslyn Castle & St. Cecilia's Cathedral, Omaha, NE",
        spots: [
          {
            name: "Joslyn Castle & Gardens",
            address: "3902 Davenport St., Omaha, NE",
          },
          {
            name: "Cali Commons",
            address: "40th St. between California St. & Cuming St., Omaha, NE",
          },
          {
            name: "St. Cecilia Cathedral / Cathedral Arts Project",
            address: "701 N. 40th St., Omaha, NE",
          },
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
        address: "60th & Maple, Omaha, NE",
        spots: [
          {
            name: "Ted & Wally's Parking Lot",
            address: "6023 Maple St., Omaha, NE",
            note: "Festival info booth",
          },
          {
            name: "Benson Rain Garden",
            address: "5801 Maple St., Omaha, NE",
          },
          {
            name: "Gallagher Park",
            address: "2936 N. 52nd St., Omaha, NE",
          },
        ],
      },
      {
        time: "4 – 5:30 PM",
        name: "Youth Mentorship with Professional Artists — Preselected Participants Only",
      },
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
        address: "50th & Underwood, Omaha, NE",
        spots: [
          {
            name: "Memorial Park Rose Garden",
            address: "6005 Underwood Ave., Omaha, NE",
          },
          {
            name: "Dundee Business District Streetscape",
            address: "49th to 51st & Underwood Ave., Omaha, NE",
            note: "Antique street lights with hanging flower baskets",
          },
        ],
      },
      {
        time: "5 – 6 PM",
        name: "Judge's Lecture — Impressionism & Plein Air (Ticketed)",
        location: "Baright Public Library",
        address: "5555 S. 77th St., Ralston, NE",
      },
      {
        time: "6 – 8 PM",
        name: "Third Thursday — Artists Painting During Tunes in Town Square",
        location: "Downtown Ralston",
        address: "77th & Main St., Ralston, NE",
      },
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
      {
        time: "9 AM – 12:30 PM",
        name: "Artists Turn In Paintings",
        location: "Venues at the Granary",
        address: "7401 Main St., Ralston, NE",
      },
      {
        time: "5:30 – 8 PM",
        name: "Collectors Preview Reception and Awards Presentation",
        location: "Venues at the Granary",
        address: "7401 Main St., Ralston, NE",
      },
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
      {
        time: "7:30 – 8:30 AM",
        name: "Artist Breakfast",
        location: "Gazebo",
        address: "77th & Main St., Ralston, NE",
      },
      {
        time: "9 – 11 AM",
        name: "Quick Paint Competition",
        location: "Ralston Hinge Creative District",
        address: "Main St. & 77th St., Ralston, NE",
      },
      {
        time: "11 AM – 4 PM",
        name: "Public Exhibition & Sale",
        location: "Venues at the Granary",
        address: "7401 Main St., Ralston, NE",
      },
      {
        time: "Noon – 1 PM",
        name: "Live Auction — Quick Paint Pieces",
        location: "Granary Green",
        address: "7401 Main St., Ralston, NE",
      },
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

// Condensed teaser cards for the homepage "Week at a Glance" timeline.
// Each entry links back to `days` via dayId, so the date label and
// district logo can never drift out of sync with the full schedule page —
// only the curated title/description/time/location below are homepage-specific.
export type HomepageHighlight = {
  dayId: string;
  title: string;
  description: string;
  time: string;
  location: string;
  sponsor?: string;
  sponsorLogo?: string;
  sponsorAlt?: string;
  sponsorUrl?: string;
  // Links the homepage timeline card to the matching section on /tickets.
  // Only set on events that actually have something to buy or register for.
  ticketHref?: string;
  ticketLabel?: string;
};

export const homepageHighlights: HomepageHighlight[] = [
  {
    dayId: "day-sep-12",
    title: "Youth Paintout",
    description: "Young artists paint en plein air in the park.",
    time: "10 AM – Noon",
    location: "Wildewood Park (78th & Ralston Ave., Ralston, NE)",
    ticketHref: "/tickets#youth-paintout",
    ticketLabel: "Free — pre-registration required →",
  },
  {
    dayId: "day-sep-12",
    title: "Youth Art Show Reception",
    description: "Celebrate young painters' work.",
    time: "5 – 6:30 PM",
    location: "Baright Public Library (5555 S. 77th St., Ralston, NE)",
    sponsor: "Applewood Hy-Vee",
    sponsorLogo: "/assets/sponsors/hy-vee.webp",
    sponsorAlt: "hy-vee logo",
    sponsorUrl: "https://www.hy-vee.com/",
  },
  {
    dayId: "day-sep-13",
    title: "Artists Arrive",
    description: "Artist check-in, canvas stamping, and orientation.",
    time: "3 PM",
    location: "Festival Headquarters",
  },
  {
    dayId: "day-sep-14",
    title: "Lunch Break Paintout",
    description: "Open painting across the metro. Midday Lunch Break Paintout in Downtown Ralston.",
    time: "11 AM – 1:30 PM",
    location: "Downtown Ralston / Hinge Creative District",
  },
  {
    dayId: "day-sep-15",
    title: "Lunch Break Paintout",
    description: "Open painting across the metro. Midday Lunch Break Paintout in the Castle & Cathedral District.",
    time: "11 AM – 1:30 PM",
    location: "Castle & Cathedral Creative District",
  },
  {
    dayId: "day-sep-16",
    title: "Lunch Break Paintout + Youth Mentorship",
    description: "Midday Lunch Break Paintout in Benson. Private mentorship sessions for preselected youth that afternoon (not open to the public).",
    time: "11 AM – 1:30 PM",
    location: "Benson Creative District",
  },
  {
    dayId: "day-sep-17",
    title: "Third Thursday & Judge's Lecture",
    description: "Lunch Break Paintout in Dundee 11 AM–1:30 PM. Judge Rick J. Delanty presents a ticketed lecture on Impressionism and Plein Air at Baright Library 5–6 PM. Third Thursday concert with artists painting downtown 6–8 PM — open to the public.",
    time: "11 AM – 8 PM",
    location: "Dundee + Baright Library + Downtown Ralston",
    ticketHref: "/tickets#judges-lecture",
    ticketLabel: "Lecture tickets — $25 →",
  },
  {
    dayId: "day-sep-18",
    title: "Collectors Preview Reception and Awards Presentation",
    description: "Art reception and awards ceremony. Artwork for sale at artist's listed prices. Tickets required.",
    time: "5:30 – 8 PM",
    location: "Venues at the Granary (7401 Main St., Ralston, NE)",
    ticketHref: "/tickets#collectors-preview-reception",
    ticketLabel: "Reception tickets — $95 →",
  },
  {
    dayId: "day-sep-19",
    title: "Quick Paint & Public Exhibition",
    description: "Quick Paint Competition 9–11 AM. Public Exhibition & Sale 11 AM–4 PM. Live auction of Quick Paint pieces Noon–1 PM at [Granary Green](https://atthegranary.com/).",
    time: "9 AM – 4 PM",
    location: "Ralston Hinge Creative District + Venues at the Granary",
    ticketHref: "/tickets#public-exhibition-sale",
    ticketLabel: "RSVP for the Public Exhibition — free →",
  },
  {
    dayId: "day-online",
    title: "Online Sales",
    description: "Unsold works available for purchase online.",
    time: "All Day",
    location: "Online",
  },
];
