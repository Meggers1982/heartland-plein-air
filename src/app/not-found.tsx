import Link from "next/link";
import { CalendarDays, Users, Ticket, Image as ImageIcon, HelpCircle, Mail } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import SetDocumentTitle from "@/components/SetDocumentTitle";
import { getFunders } from "@/sanity/queries/sponsors";
import { getContactInfo, getSiteChrome } from "@/sanity/queries/pages";

// Where a visitor who hit a dead link most likely meant to go. Deliberately
// not the whole nav — that's already one scroll up. These are the pages with
// something to actually do on them.
const destinations = [
  {
    href: "/schedule",
    icon: CalendarDays,
    title: "Schedule",
    description:
      "The full week of paint-outs, the Collector's Soirée, and the public exhibition and auction.",
  },
  {
    href: "/artists",
    icon: Users,
    title: "Artists",
    description: "Meet the invited artists painting across the Omaha metro.",
  },
  {
    href: "/tickets",
    icon: Ticket,
    title: "Tickets",
    description: "Reserve a spot for the festival's ticketed events.",
  },
  {
    href: "/gallery",
    icon: ImageIcon,
    title: "Gallery",
    description: "Browse work from the artists' portfolios.",
  },
  {
    href: "/faq",
    icon: HelpCircle,
    title: "FAQs",
    description: "Parking, accessibility, watching artists work, and how to buy a painting.",
  },
  {
    href: "/contact",
    icon: Mail,
    title: "Contact",
    description: "Questions we haven't answered? Reach the festival team.",
  },
];

export default async function NotFound() {
  const [sponsors, contactInfo, chrome] = await Promise.all([
    getFunders(),
    getContactInfo(),
    getSiteChrome(),
  ]);
  return (
    <div className="min-h-screen bg-background">
      {/* not-found.tsx can't export `metadata` — see SetDocumentTitle. */}
      <SetDocumentTitle title="Page Not Found | Heartland Plein Air Festival" />
      <SiteNav />

      {/* Same header treatment as every interior page: dark ground, eyebrow,
          display H1 — no body copy or CTA inside the header. */}
      <header className="bg-foreground pt-52 pb-16 md:pt-56">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            404
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-secondary md:text-6xl">
            Page Not Found
          </h1>
        </div>
      </header>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <AnimatedSection>
            <p className="mx-auto mb-12 max-w-2xl text-center font-body text-lg leading-relaxed text-foreground/85">
              This page doesn't exist, or it may have moved. Here's where most
              visitors are headed.
            </p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination, i) => {
              const Icon = destination.icon;
              return (
                <AnimatedSection key={destination.href} delay={i * 60} className="h-full">
                  <Link
                    href={destination.href}
                    className="flex h-full flex-col rounded-lg bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <h2 className="mb-1 font-display text-xl font-semibold text-foreground">
                      {destination.title}
                    </h2>
                    <p className="font-body text-sm leading-relaxed text-foreground/85">
                      {destination.description}
                    </p>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection delay={400}>
            <div className="mt-14 text-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
              >
                Return to Home
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SiteFooter sponsors={sponsors} contactInfo={contactInfo} chrome={chrome} />
    </div>
  );
}
