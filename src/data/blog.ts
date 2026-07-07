export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Paragraphs separated by a blank line, same convention as artist bios. */
  content: string;
  date: string; // ISO date, e.g. "2026-07-07"
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
};

// Placeholder posts — replace or add to this array as real posts are ready.
export const blogPosts: BlogPost[] = [
  {
    slug: "meet-the-2026-roster",
    title: "Meet the 2026 Artist Roster",
    excerpt:
      "Twenty-five nationally recognized plein air painters are headed to the Omaha metro this September. Here's a first look at who's coming.",
    content:
      "This September, 25 nationally recognized artists will travel to the Omaha metro from across the country to spend a week painting Douglas and Sarpy County outdoors, on location, in real time.\n\nThe roster spans a wide range of styles and mediums — oil, watercolor, and pastel — and includes Signature Members of organizations like the American Impressionist Society, Oil Painters of America, and the National Oil and Acrylic Painters Society. Several have been featured in Plein Air Magazine and other national publications.\n\nWant the full lineup, including bios and links to each artist's work? Visit the Artists page to meet everyone joining us this year.",
    date: "2026-07-07",
    author: "Heartland Plein Air Festival",
    category: "Announcements",
    tags: ["artists", "2026 roster", "announcement"],
    featuredImage: "/assets/hero-pleinair.jpg",
    featuredImageAlt: "plein air painter working outdoors at an easel",
  },
];

export function getSortedPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(blogPosts.map((post) => post.category))).sort();
}

export function getAllTags(): string[] {
  return Array.from(new Set(blogPosts.flatMap((post) => post.tags))).sort();
}

/** Same-category posts first, then most recent others. Hidden until there are at least 3 posts total. */
export function getRelatedPosts(current: BlogPost, limit = 3): BlogPost[] {
  if (blogPosts.length < 3) return [];
  const others = getSortedPosts().filter((post) => post.slug !== current.slug);
  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Parses an ISO "YYYY-MM-DD" date as local time, avoiding the day-before shift `new Date(iso)` causes in negative UTC offsets. */
export function parsePostDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}
