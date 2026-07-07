'use client';
import { useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BlogPostCard from "@/components/BlogPostCard";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import CountdownBanner from "@/components/CountdownBanner";
import BackToTop from "@/components/BackToTop";
import { Badge } from "@/components/ui/badge";
import { getRelatedPosts, parsePostDate, type BlogPost as BlogPostType } from "@/data/blog";
import { setPageMeta } from "@/lib/meta";

const BlogPost = ({ post }: { post: BlogPostType }) => {
  const relatedPosts = getRelatedPosts(post);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${post.title} | Heartland Plein Air Festival`;
    return setPageMeta(post.excerpt);
  }, [post]);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-44">
        <article className="pb-24">
          <div className="mx-auto max-w-3xl px-6">
            <AnimatedSection>
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Blog
              </Link>

              <Link href={`/blog?category=${encodeURIComponent(post.category)}`}>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  {post.category}
                </Badge>
              </Link>

              <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
                {post.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
                  {format(parsePostDate(post.date), "MMMM d, yyyy")}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-primary" aria-hidden="true" />
                  {post.author}
                </span>
              </div>
            </AnimatedSection>

            {post.featuredImage && (
              <AnimatedSection>
                <div className="mt-8 aspect-video overflow-hidden rounded-lg bg-muted">
                  <img
                    src={post.featuredImage}
                    alt={post.featuredImageAlt ?? post.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection>
              <div className="mt-8 space-y-5 font-body text-lg leading-relaxed text-foreground/85">
                {post.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </AnimatedSection>

            {post.tags.length > 0 && (
              <AnimatedSection>
                <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                      <Badge
                        variant="outline"
                        className="border-border text-muted-foreground hover:border-primary hover:text-primary"
                      >
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection>
              <Link
                href="/blog"
                className="mt-12 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Blog
              </Link>
            </AnimatedSection>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="border-t border-border bg-secondary/40 py-16">
            <div className="mx-auto max-w-6xl px-6">
              <AnimatedSection>
                <h2 className="mb-8 font-display text-3xl font-bold text-foreground">
                  Related Articles
                </h2>
              </AnimatedSection>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost, i) => (
                  <AnimatedSection key={relatedPost.slug} delay={i * 80}>
                    <BlogPostCard post={relatedPost} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <CountdownBanner />
      <NewsletterCTA />
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default BlogPost;
