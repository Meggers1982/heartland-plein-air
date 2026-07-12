import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";

const SITE_URL = "https://heartlandpleinair.org";

// Festival week — used as a reasonable lastModified for festival-content pages.
// Update if the underlying page content changes independently of the festival date.
const LAST_MODIFIED = new Date();

type RouteConfig = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

// "/advertising/success", "/sponsors/success", "/open-division/success", and
// "/contact/success" are intentionally excluded: they're post-submission
// confirmation pages with no content of their own, aren't meant to be
// discovered via search, and would look odd as a search result.
const routes: RouteConfig[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/advertising", changeFrequency: "monthly", priority: 0.5 },
  { path: "/artists", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.8 },
  { path: "/open-division", changeFrequency: "monthly", priority: 0.6 },
  { path: "/schedule", changeFrequency: "weekly", priority: 0.9 },
  { path: "/sponsors", changeFrequency: "monthly", priority: 0.6 },
  { path: "/tickets", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const postRoutes = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes];
}
