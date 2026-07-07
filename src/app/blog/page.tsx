import type { Metadata } from "next";
import Blog from "@/page-components/Blog";

export const metadata: Metadata = {
  title: "Blog | Heartland Plein Air Festival",
  description:
    "News, artist features, and updates from the Heartland Plein Air Festival, September 13–19, 2026.",
  alternates: { canonical: "https://heartlandpleinair.org/blog" },
};

export default function BlogPage() {
  return <Blog />;
}
