export type Audience = "public" | "ticketed" | "artists";

export type ScheduleEvent = {
  time?: string;
  name: string;
  location?: string;
  address?: string;
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
};

export const days: ScheduleDay[] = [
  {
    id: "day-sep-12",
    dayShort: "Sat · Sep 12",
    dayLong: "Saturday, September 12",
    title: "It Starts with the Kids",
    audience: "public",
    narrative:
      "Before the festival officially opens, young artists get the spotlight. Local youth take their easels to Wildwood Park for a morning of open-air painting — then celebrate their work at the Youth Art Show Reception that evening at the Baright Public Library.",
    events: [
      {
        time: "10 AM – Noon",
        name: "Youth Paintout",
        location: "Wildwood Park",
        address: "78th & Ralston Ave., Ralston, NE",
      },
      {
        time: "Noon – 5 PM",
        name: "Artwork Framing & Hanging — Not Open to the Public",
      },
      {
        time: "6 – 7:30 PM",
        name: "Youth Art Show Reception",
        location: "Baright Public Library",
        address: "5555 S. 77th St., Ralston, NE",
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
    logoAlt: "Ralston Hinge Creative District logo",
    narrative:
      "Starting today and running through Friday, artists fan out across Douglas and Sarpy Counties — painting historic neighborhoods, scenic vistas, and local landmarks. You might turn a corner and find one set up right in front of you. Stop and watch. Ask a question. That's the point. At midday, the action kicks off in Downtown Ralston's Hinge Creative District for the first Lunch Break Paintout.",
    events: [
      {
        time: "11 AM – 1:30 PM",
        name: "Lunch Break Paintout",
        location: "Downtown Ralston / Hinge Creative District",
        address: "Main St. & 77th St., Ralston, NE",
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
    logoAlt: "Castle & Cathedral Creative District logo",
    narrative:
      "Another day of painting across the metro, with the Lunch Break Paintout heading to the Castle & Cathedral Creative District — home to Joslyn Castle and St. Cecilia's Cathedral. Grab lunch nearby and stay to watch.",
    events: [
      {
        time: "11 AM – 1:30 PM",
        name: "Lunch Break Paintout",
        location: "Castle & Cathedral Creative District",
        address: "Joslyn Castle & St. Cecilia's Cathedral, Omaha, NE",
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
    logoAlt: "Benson Creative District logo",
    narrative:
      "The midweek Lunch Break Paintout heads to the Benson Creative District. That afternoon, invited festival artists meet privately with preselected youth participants — this portion of the day is not open to the public.",
    events: [
      {
        time: "11 AM – 1:30 PM",
        name: "Lunch Break Paintout",
        location: "Benson Creative District",
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
    logo: "/assets/dundee-logo.png",
    logoAlt: "Dundee Creative District logo",
    narrative:
      "By day, artists paint through the Dundee Creative District. By evening, the energy shifts to Ralston for Third Thursday — one of the week's most memorable nights. Festival Awards Judge Rick J. Delanty presents a ticketed lecture on Impressionism and Plein Air at the Baright Public Library. Afterward, artists spread out across downtown Ralston, painting live while the concert plays around them. Come mingle, watch, and take it all in — this is not a Quick Paint event.",
    events: [
      {
        time: "11 AM – 1:30 PM",
        name: "Lunch Break Paintout",
        location: "Dundee Creative District",
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
    title: "The Collector's Soirée",
    audience: "ticketed",
    narrative:
      "Artists deliver their completed festival paintings in the morning. That evening, the Collector's Soirée at The Granary brings together art, music, food, and the first opportunity to purchase works from the festival's collection at the artist's listed price. Awards are announced and artists are celebrated. Tickets required.",
    events: [
      {
        time: "9 AM – 12:30 PM",
        name: "Artists Turn In Paintings",
        location: "Venues at the Granary",
        address: "7401 Main St., Ralston, NE",
      },
      {
        time: "5:30 – 8 PM",
        name: "Collector's Soirée — art reception & awards",
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
    logoAlt: "Ralston Hinge Creative District logo",
    narrative:
      "The festival closes with a full day open to all. Watch artists compete in the Quick Paint Competition at 9 AM, then browse every painting made during festival week at the Public Exhibition & Sale — artwork available at the artist's listed price. At noon, Quick Paint pieces go to live auction at Granary Green. You don't need an invitation — just show up.",
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
        time: "11 AM – 5 PM",
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
    dayShort: "Sep 19 – Oct 2",
    dayLong: "September 19 – October 2",
    title: "Can't Make It in Person?",
    audience: "public",
    narrative:
      "Unsold works remain available for purchase online through October 2. Original, one-of-a-kind paintings of the Omaha metro — created on-site during the festival — available from wherever you are.",
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
};

export const homepageHighlights: HomepageHighlight[] = [
  {
    dayId: "day-sep-12",
    title: "Youth Paintout",
    description: "Young artists paint en plein air in the park.",
    time: "10 AM – Noon",
    location: "Wildwood Park (78th & Ralston Ave., Ralston, NE)",
  },
  {
    dayId: "day-sep-12",
    title: "Youth Art Show Reception",
    description: "Celebrate young painters' work.",
    time: "6 – 7:30 PM",
    location: "Baright Public Library (5555 S. 77th St., Ralston, NE)",
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
  },
  {
    dayId: "day-sep-18",
    title: "Collector's Soirée",
    description: "Art reception and awards ceremony. Artwork for sale at artist's listed prices. Tickets required.",
    time: "5:30 – 8 PM",
    location: "Venues at the Granary (7401 Main St., Ralston, NE)",
  },
  {
    dayId: "day-sep-19",
    title: "Quick Paint & Public Exhibition",
    description: "Quick Paint Competition 9–11 AM. Public Exhibition & Sale 11 AM–5 PM. Live auction of Quick Paint pieces Noon–1 PM at Granary Green.",
    time: "9 AM – 5 PM",
    location: "Ralston Hinge Creative District + Venues at the Granary",
  },
  {
    dayId: "day-online",
    title: "Online Sales",
    description: "Unsold works available for purchase online.",
    time: "All Day",
    location: "Online",
  },
];
