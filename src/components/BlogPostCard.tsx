import Link from "next/link";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { parsePostDate, type BlogPost } from "@/data/blog";

const BlogPostCard = ({ post }: { post: BlogPost }) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group block h-full overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary"
  >
    <div className="aspect-video overflow-hidden bg-muted">
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.featuredImageAlt ?? post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      )}
    </div>
    <div className="flex h-full flex-col p-6">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
          {post.category}
        </Badge>
        <span className="flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          {format(parsePostDate(post.date), "MMMM d, yyyy")}
        </span>
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground">
        {post.title}
      </h3>
      <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
        {post.excerpt}
      </p>
      <p className="mt-4 font-body text-xs font-semibold uppercase tracking-widest text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        Read More →
      </p>
    </div>
  </Link>
);

export default BlogPostCard;
