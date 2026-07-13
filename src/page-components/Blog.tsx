'use client';
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import BlogPostCard from "@/components/BlogPostCard";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import CountdownBanner from "@/components/CountdownBanner";
import BackToTop from "@/components/BackToTop";
import { getAllCategories, getAllTags, getSortedPosts } from "@/data/blog";
import { setPageMeta } from "@/lib/meta";
import { cn } from "@/lib/utils";

// Reads the initial ?category=/?tag= filter from the URL. Isolated in its own
// component (rather than called directly in Blog) because useSearchParams()
// requires a Suspense boundary during static prerendering.
const InitialFilterReader = ({
  onReady,
}: {
  onReady: (category: string | null, tag: string | null) => void;
}) => {
  const searchParams = useSearchParams();
  useEffect(() => {
    onReady(searchParams.get("category"), searchParams.get("tag"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

const Blog = () => {
  const posts = getSortedPosts();
  const categories = getAllCategories();
  const tags = getAllTags();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog | Heartland Plein Air Festival";
    return setPageMeta(
      "News, artist features, and updates from the Heartland Plein Air Festival, September 13–19, 2026.",
    );
  }, []);

  const filteredPosts = useMemo(
    () =>
      posts.filter(
        (post) =>
          (!selectedCategory || post.category === selectedCategory) &&
          (!selectedTag || post.tags.includes(selectedTag)),
      ),
    [posts, selectedCategory, selectedTag],
  );

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <InitialFilterReader
          onReady={(category, tag) => {
            if (category) setSelectedCategory(category);
            if (tag) setSelectedTag(tag);
          }}
        />
      </Suspense>
      <SiteNav />
      <main className="pt-36">
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <AnimatedSection>
              <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                News &amp; Updates
              </p>
              <h1 className="font-display text-5xl font-bold leading-tight text-foreground md:text-6xl">
                Blog
              </h1>
              <p className="mx-auto mt-6 font-body text-lg leading-relaxed text-muted-foreground">
                Festival news, artist features, and behind-the-scenes updates as we count down to September 13–19, 2026.
              </p>
            </AnimatedSection>

            {categories.length > 1 && (
              <AnimatedSection>
                <nav aria-label="Filter by category" className="mt-8 flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className={cn(
                      "rounded-full border px-4 py-2 font-body text-sm transition-colors",
                      !selectedCategory
                        ? "border-primary/40 bg-primary/10 font-semibold text-primary"
                        : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "rounded-full border px-4 py-2 font-body text-sm transition-colors",
                        selectedCategory === category
                          ? "border-primary/40 bg-primary/10 font-semibold text-primary"
                          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </nav>
              </AnimatedSection>
            )}

            {tags.length > 0 && (
              <AnimatedSection>
                <nav aria-label="Filter by tag" className="mt-4 flex flex-wrap justify-center gap-2">
                  {selectedTag && (
                    <button
                      type="button"
                      onClick={() => setSelectedTag(null)}
                      className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-body text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                    >
                      #{selectedTag} ✕
                    </button>
                  )}
                  {tags
                    .filter((tag) => tag !== selectedTag)
                    .map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedTag(tag)}
                        className="rounded-full border border-border px-3 py-1 font-body text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        #{tag}
                      </button>
                    ))}
                </nav>
              </AnimatedSection>
            )}
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-6">
            {filteredPosts.length === 0 ? (
              <p className="text-center font-body text-muted-foreground">
                No posts match this filter yet — check back soon.
              </p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, i) => (
                  <AnimatedSection key={post.slug} delay={i * 80}>
                    <BlogPostCard post={post} />
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <CountdownBanner />
      <NewsletterCTA />
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default Blog;
