'use client';
import { useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import CountdownBanner from "@/components/CountdownBanner";
import BackToTop from "@/components/BackToTop";
import { getSortedPosts, parsePostDate } from "@/data/blog";
import { setPageMeta } from "@/lib/meta";

const Blog = () => {
  const posts = getSortedPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog | Heartland Plein Air Festival";
    return setPageMeta(
      "News, artist features, and updates from the Heartland Plein Air Festival, September 13–19, 2026.",
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-36">
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <AnimatedSection>
              <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                News &amp; Updates
              </p>
              <h1 className="font-display text-5xl font-bold text-foreground md:text-6xl">
                Blog
              </h1>
              <p className="mx-auto mt-6 font-body text-lg leading-relaxed text-muted-foreground">
                Festival news, artist features, and behind-the-scenes updates as we count down to September 13–19, 2026.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-6">
            {posts.length === 0 ? (
              <p className="text-center font-body text-muted-foreground">
                No posts yet — check back soon.
              </p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <AnimatedSection key={post.slug} delay={i * 80}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block h-full overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {post.image && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.imageAlt ?? post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex h-full flex-col p-6">
                        <div className="mb-2 flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-primary">
                          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                          {format(parsePostDate(post.date), "MMMM d, yyyy")}
                        </div>
                        <h2 className="font-display text-xl font-semibold text-foreground">
                          {post.title}
                        </h2>
                        <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                          {post.excerpt}
                        </p>
                        <p className="mt-4 font-body text-xs font-semibold uppercase tracking-widest text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                          Read More →
                        </p>
                      </div>
                    </Link>
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
