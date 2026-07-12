import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <header className="bg-foreground pt-44 pb-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            404
          </p>
          <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-secondary md:text-6xl">
            Page Not Found
          </h1>
          <p className="mx-auto mb-8 max-w-xl font-body text-lg leading-relaxed text-secondary/85">
            The page you're looking for doesn't exist or may have moved. Let's get you back on track.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Return to Home
          </Link>
        </div>
      </header>
      <SiteFooter />
    </div>
  );
}
