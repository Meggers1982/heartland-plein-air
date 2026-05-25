export type GalleryPainting = {
  filename: string;
  title: string;
  alt: string;
};

export type GalleryArtist = {
  name: string;
  slug: string;
  paintings: GalleryPainting[];
};

export const galleryArtists: GalleryArtist[] = [
  {
    name: "Hector Acuna",
    slug: "hector-acuna",
    paintings: [
      { filename: "hector-acuna-artist-at-the-easel.webp", title: "Artist at the Easel", alt: "plein air painting of artist painting at an easel on a suburban street" },
      { filename: "hector-acuna-aveda-window-reflection.webp", title: "Aveda Window Reflection", alt: "plein air painting of storefront window reflection of a town square" },
      { filename: "hector-acuna-summer-at-the-beach.webp", title: "Summer at the Beach", alt: "plein air painting of beach scene with an inner tube and figures on shore" },
    ],
  },
  {
    name: "Jason Bailey",
    slug: "jason-bailey",
    paintings: [
      { filename: "jason-bailey-main-street-intersection.webp", title: "Main Street Intersection", alt: "plein air painting of small town intersection with american flags on poles" },
      { filename: "jason-bailey-alley-with-utility-poles.webp", title: "Alley with Utility Poles", alt: "plein air painting of alley with brick buildings, utility poles, mountains" },
      { filename: "jason-bailey-railroad-tracks.webp", title: "Railroad Tracks", alt: "plein air painting of freight train on railroad tracks through wooded hills" },
    ],
  },
  {
    name: "Jacalyn Beam",
    slug: "jacalyn-beam",
    paintings: [
      { filename: "jacalyn-beam-floral-still-life.webp", title: "Floral Still Life", alt: "plein air painting of floral still life with yellow and pink flowers in vases" },
      { filename: "jacalyn-beam-field-colors.webp", title: "Field Colors", alt: "plein air painting of white farmhouse amid golden autumn trees and meadow" },
      { filename: "jacalyn-beam-morning-on-the-canal.webp", title: "Morning on the Canal", alt: "plein air painting of calm canal reflecting sailboats and waterfront buildings" },
    ],
  },
  {
    name: "Bob Beck",
    slug: "bob-beck",
    paintings: [
      { filename: "bob-beck-the-little-stream.webp", title: "The Little Stream", alt: "plein air painting of snowy winter forest with bare trees and small stream" },
      { filename: "bob-beck-may-20th.webp", title: "May 20th", alt: "plein air painting of rural barns and outbuildings in summer landscape" },
      { filename: "bob-beck-moss-point-farm.webp", title: "Moss Point Farm", alt: "plein air painting of farm with silo and barn amid autumn foliage" },
    ],
  },
  {
    name: "Michele Byrne",
    slug: "michele-byrne",
    paintings: [
      { filename: "michele-byrne-basilica-morning-light.webp", title: "Basilica Morning Light", alt: "plein air painting of crowd walking toward a grand basilica at golden hour" },
      { filename: "michele-byrne-first-day-in-paris.webp", title: "First Day in Paris", alt: "plein air painting of paris street cafe with red awning and pedestrians" },
    ],
  },
  {
    name: "Robin Cheers",
    slug: "robin-cheers",
    paintings: [
      { filename: "robin-cheers-late-afternoon-st-remy.webp", title: "Late Afternoon, St. Rémy", alt: "plein air painting of narrow stone alley with arch and shops in provence" },
      { filename: "robin-cheers-little-pink-house.webp", title: "Little Pink House", alt: "plein air painting of pink cottage with blooming cherry tree in spring" },
      { filename: "robin-cheers-marble-falls-charm.webp", title: "Marble Falls Charm", alt: "plein air painting of teal corner building with utility pole on sunny street" },
    ],
  },
  {
    name: "Larry DeGraff",
    slug: "larry-degraff",
    paintings: [
      { filename: "larry-degraff-where-the-rivers-meet.webp", title: "Where the Rivers Meet", alt: "plein air painting of city skyline with tall buildings reflected in a river" },
      { filename: "larry-degraff-wind-on-the-water.webp", title: "Wind on the Water", alt: "plein air painting of calm river with green trees reflected in sunlit water" },
      { filename: "larry-degraff-winters-gems.webp", title: "Winter's Gems", alt: "plein air painting of bare winter trees leaning over a snow-edged river" },
    ],
  },
  {
    name: "John Evans",
    slug: "john-evans",
    paintings: [
      { filename: "john-evans-around-the-bend.webp", title: "Around the Bend", alt: "plein air painting of bridge on rural road with red barn and spring tree" },
      { filename: "john-evans-behind-the-sale-barn-3.webp", title: "Behind the Sale Barn", alt: "plein air painting of grain silo and farm buildings on green rolling land" },
      { filename: "john-evans-going-to-town.webp", title: "Going to Town", alt: "plein air painting of rural road leading past a barn and utility poles" },
    ],
  },
  {
    name: "Debra Joy Groesser",
    slug: "debra-joy-groesser",
    paintings: [
      { filename: "debra-joy-groesser-autumn-farm-stormy-sky.webp", title: "Autumn Farm, Stormy Sky", alt: "debra joy groesser autumn farm with stormy sky" },
      { filename: "debra-joy-groesser-rocky-coastal-cliffs-ocean.webp", title: "Rocky Coastal Cliffs", alt: "debra joy groesser rocky coastal cliffs and ocean" },
      { filename: "debra-joy-groesser-wetland-marsh-lily-pads.webp", title: "Wetland Marsh, Lily Pads", alt: "debra joy groesser wetland marsh with lily pads" },
    ],
  },
  {
    name: "Kristin Hosbein",
    slug: "kristin-hosbein",
    paintings: [
      { filename: "kristin-hosbein-boats-at-the-marina.webp", title: "Boats at the Marina", alt: "plein air painting of blue sailboat and red motorboat docked at a marina" },
      { filename: "kristin-hosbein-harmony-at-dawn.webp", title: "Harmony at Dawn", alt: "plein air painting of red barn in a green meadow with red peony flowers" },
      { filename: "kristin-hosbein-heart-of-the-hill.webp", title: "Heart of the Hill", alt: "plein air painting of close-up of vibrant hot pink peonies in bloom" },
      { filename: "kristin-hosbein-summer-blooms.webp", title: "Summer Blooms", alt: "plein air painting of pink white and yellow roses blooming in a garden" },
    ],
  },
  {
    name: "Ann Larsen",
    slug: "ann-larsen",
    paintings: [
      { filename: "ann-larsen-pier-reflections.webp", title: "Pier Reflections", alt: "plein air painting of wooden pier pilings and green water reflections" },
      { filename: "ann-larsen-apalachicola-blues.webp", title: "Apalachicola Blues", alt: "plein air painting of bright blue building with palm tree on sunny street" },
      { filename: "ann-larsen-beals-island.webp", title: "Beals Island", alt: "plein air painting of two colorful sheds with laundry on a rural dirt road" },
      { filename: "ann-larsen-pumpkin-island-light.webp", title: "Pumpkin Island Light", alt: "plein air painting of lighthouse and buildings on island surrounded by water" },
    ],
  },
  {
    name: "John Lasater",
    slug: "john-lasater",
    paintings: [
      { filename: "john-lasater-sinks-cascade.webp", title: "Sinks Cascade", alt: "plein air painting of rushing stream flowing through rocky canyon boulders" },
      { filename: "john-lasater-sunday-mood.webp", title: "Sunday Mood", alt: "plein air painting of country road at dusk with rolling hills and farms" },
      { filename: "john-lasater-the-peaceful-hour.webp", title: "The Peaceful Hour", alt: "plein air painting of weathered barn at sunset with purple hills and dirt path" },
    ],
  },
  {
    name: "Dan Marshall",
    slug: "dan-marshall",
    paintings: [
      { filename: "dan-marshall-golden-hills-landscape.webp", title: "Golden Hills Landscape", alt: "plein air painting of watercolor of rolling golden hills under gray sky" },
      { filename: "dan-marshall-mountain-town.webp", title: "Mountain Town", alt: "plein air painting of watercolor of a mountain town with autumn foliage" },
      { filename: "dan-marshall-prairie-cloudscape.webp", title: "Prairie Cloudscape", alt: "plein air painting of watercolor prairie with dramatic storm clouds" },
    ],
  },
  {
    name: "Brenda Pinnick",
    slug: "brenda-pinnick",
    paintings: [
      { filename: "brenda-pinnick-all-the-colors.webp", title: "All the Colors", alt: "plein air painting of red and yellow flowers in a blue vase with cherries" },
      { filename: "brenda-pinnick-ode-to-spring.webp", title: "Ode to Spring", alt: "plein air painting of cottage with flowering shrubs along a garden path" },
      { filename: "brenda-pinnick-our-door-is-always-open.webp", title: "Our Door Is Always Open", alt: "plein air painting of sunlit cottage with pink flowering shrubs and trees" },
    ],
  },
  {
    name: "Radhika Srinivas",
    slug: "radhika-srinivas",
    paintings: [
      { filename: "radhika-srinivas-columbia-downtown.webp", title: "Columbia Downtown", alt: "plein air painting of black and white watercolor of downtown with clock tower" },
      { filename: "radhika-srinivas-morning-light-in-salzburg.webp", title: "Morning Light in Salzburg", alt: "plein air painting of european street corner with domed building and bicycles" },
      { filename: "radhika-srinivas-rte-441.webp", title: "Rte. 441", alt: "plein air painting of watercolor highway scene under dramatic storm clouds" },
    ],
  },
  {
    name: "Steve Stauffer",
    slug: "steve-stauffer",
    paintings: [
      { filename: "steve-stauffer-a-poplar-fall.webp", title: "A Poplar Fall", alt: "plein air painting of tall golden poplar trees with snow-capped mountains" },
      { filename: "steve-stauffer-borrego-plein-air.webp", title: "Borrego Plein Air", alt: "plein air painting of artist easel in desert with yellow wildflowers" },
      { filename: "steve-stauffer-cottonwood-creek-gold.webp", title: "Cottonwood Creek Gold", alt: "plein air painting of mountain creek with golden cottonwood trees in fall" },
    ],
  },
  {
    name: "Jill Stefani Wagner",
    slug: "jill-stefani-wagner",
    paintings: [
      { filename: "jill-stefani-wagner-my-path.webp", title: "My Path", alt: "plein air painting of sandy path through golden grasses leading to a river" },
      { filename: "jill-stefani-wagner-pleasanton-bakery.webp", title: "Pleasanton Bakery", alt: "plein air painting of outdoor cafe with red umbrellas on a sunny afternoon" },
      { filename: "jill-stefani-wagner-the-queen-and-her-court.webp", title: "The Queen and Her Court", alt: "plein air painting of white wildflowers blooming in a lush purple meadow" },
    ],
  },
  {
    name: "Durre Waseem",
    slug: "durre-waseem",
    paintings: [
      { filename: "durre-waseem-outdoor-cafe.webp", title: "Outdoor Café", alt: "plein air painting of sunny outdoor cafe with orange umbrellas and patrons" },
      { filename: "durre-waseem-tennessee-street.webp", title: "Tennessee Street", alt: "plein air painting of city street with tennessee theatre sign and figures" },
      { filename: "durre-waseem-horses-under-trees.webp", title: "Horses Under Trees", alt: "plein air painting of horses grazing in dappled shade under green trees" },
    ],
  },
  {
    name: "Ann Watcher",
    slug: "ann-watcher",
    paintings: [
      { filename: "ann-watcher-orange-slices.webp", title: "Orange Slices", alt: "plein air painting of orange slices in a blue bowl on gray background" },
      { filename: "ann-watcher-teapot-and-azaleas.webp", title: "Teapot and Azaleas", alt: "plein air painting of silver teapot with green cup and orange flowers" },
      { filename: "ann-watcher-under-the-pink-dogwood.webp", title: "Under the Pink Dogwood", alt: "plein air painting of garden with pink blooming trees and outdoor table" },
    ],
  },
  {
    name: "Robin Weiss",
    slug: "robin-weiss",
    paintings: [
      { filename: "robin-weiss-morning-hike.webp", title: "Morning Hike", alt: "plein air painting of two figures walking on a driftwood-strewn beach" },
      { filename: "robin-weiss-spring-barn.webp", title: "Spring Barn", alt: "plein air painting of red barn in a spring meadow with blooming trees" },
    ],
  },
  {
    name: "Chris Willey",
    slug: "chris-willey",
    paintings: [
      { filename: "chris-willey-padula-hillside.webp", title: "Padula Hillside", alt: "plein air painting of rolling hillside with mountains in the background" },
      { filename: "chris-willey-sidewalk-gardens.webp", title: "Sidewalk Gardens", alt: "plein air painting of garden path lined with purple, white, and yellow blooms" },
      { filename: "chris-willey-tuscan-sunset.webp", title: "Tuscan Sunset", alt: "plein air painting of vivid orange sunset over a rocky hilly landscape" },
    ],
  },
  {
    name: "Jeff Williams",
    slug: "jeff-williams",
    paintings: [
      { filename: "jeff-williams-san-saba-river-rocks.webp", title: "San Saba River Rocks", alt: "plein air painting of dry riverbed with rocky banks under a moody sky" },
      { filename: "jeff-williams-all-in-a-days-work.webp", title: "All in a Day's Work", alt: "plein air painting of oak tree with small boat resting at the rivers edge" },
      { filename: "jeff-williams-cimbar-still-life.webp", title: "Cimbar Still Life", alt: "plein air painting of industrial grain elevator and conveyor belt structure" },
    ],
  },
  {
    name: "Stephen Wysocki",
    slug: "stephen-wysocki",
    paintings: [
      { filename: "stephen-wysocki-boat-at-the-dock.webp", title: "Boat at the Dock", alt: "plein air painting of small boat floating beneath a weathered wooden dock" },
      { filename: "stephen-wysocki-lakeside-pines.webp", title: "Lakeside Pines", alt: "plein air painting of calm lakeside with tall pine trees and soft clouds" },
      { filename: "stephen-wysocki-vineyard-landscape.webp", title: "Vineyard Landscape", alt: "plein air painting of colorful vineyard field with trees and lavender hills" },
    ],
  },
  {
    name: "Rick Delanty",
    slug: "rick-delanty",
    paintings: [
      { filename: "rick-delanty-coastal-cliffs.webp", title: "Coastal Cliffs", alt: "plein air painting of ocean waves crashing against rugged coastal cliffs" },
    ],
  },
];

export type FlatPainting = GalleryPainting & { artistName: string; artistSlug: string };

export const allPaintings: FlatPainting[] = galleryArtists.flatMap((a) =>
  a.paintings.map((p) => ({ ...p, artistName: a.name, artistSlug: a.slug })),
);
