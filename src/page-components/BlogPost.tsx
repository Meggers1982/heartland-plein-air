'use client';
import { useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NewsletterCTA from "@/components/NewsletterCTA";
import CountdownBanner from "@/components/CountdownBanner";
import BackToTop from "@/components/BackToTop";
import { parsePostDate, type BlogPost as BlogPostType } from "@/data/blog";
import { setPageMeta } from "@/lib/meta";

const BlogPost = ({ post }: { post: BlogPostType }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${post.title} | Heartland Plein Air Festival`;
    return setPageMeta(post.excerpt);
  }, [post]);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-36">
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

              <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
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

            {post.image && (
              <AnimatedSection>
                <div className="mt-8 aspect-video overflow-hidden rounded-lg bg-muted">
                  <img
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
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
      </main>
      <CountdownBanner />
      <NewsletterCTA />
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default BlogPost;
