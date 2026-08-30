import { Sparkles, Calendar, Users } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

// Icons stay in code and pair with the labels by position: an editor can
// reword a perk, but can't pick a mismatched icon or break the row.
const PERK_ICONS = [Users, Calendar, Sparkles];
const DEFAULT_PERKS = [
  "Artist announcements",
  "Event schedules & maps",
  "Early collector access",
];

// Signups go straight into the district's FASO subscriber list. This used to be
// an inline Formspree form, which meant someone had to export the addresses and
// re-upload them by hand; sending people to FASO drops that step entirely.
export const NEWSLETTER_SIGNUP_URL =
  "https://ralstonhingecreativedistrict.faso.com/email-newsletter";

const NewsletterCTA = ({
  // Fallbacks keep the heading intact for homepage documents saved before these
  // fields existed — a blank heading would be a worse failure than stale wording.
  eyebrow = "Join the Festival",
  title = "Be the First to Know",
  perks: perkLabels,
  footnote = "No spam. Unsubscribe anytime. Festival updates only.",
}: {
  eyebrow?: string;
  title?: string;
  perks?: string[];
  footnote?: string;
} = {}) => {
  return (
    <section
      id="newsletter"
      className="relative scroll-mt-32 overflow-hidden bg-gradient-to-br from-foreground via-foreground to-primary/40 py-24"
    >
      {/* Decorative paint strokes */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-10 h-40 w-40 text-primary/15"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M10,70 C30,40 60,30 90,55 C80,75 50,80 20,90 Z" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 bottom-0 h-48 w-48 text-secondary/10"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M5,50 C25,20 70,15 95,40 C85,70 40,85 10,80 Z" />
      </svg>

      <AnimatedSection className="relative mx-auto max-w-2xl px-6 text-center">
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </p>
        <h2 className="mb-5 font-display text-4xl font-bold leading-tight text-background md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mb-10 max-w-xl font-body text-base leading-relaxed text-background/75 md:text-lg">
          Be the first to know — get artist announcements, paint-out locations, exhibition previews, and exclusive festival access, right in your inbox.
        </p>

        <ul className="mb-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-body text-sm text-background/80">
          {(perkLabels?.length ? perkLabels : DEFAULT_PERKS).map((label, i) => {
            const Icon = PERK_ICONS[i % PERK_ICONS.length];
            return (
              <li key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{label}</span>
              </li>
            );
          })}
        </ul>

        <a
          href={NEWSLETTER_SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-primary px-10 py-4 font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-[1.03] hover:opacity-95 active:scale-[0.98]"
        >
          Sign Up for Festival Updates
        </a>

        <p className="mt-4 font-body text-xs text-background/80">{footnote}</p>
      </AnimatedSection>
    </section>
  );
};

export default NewsletterCTA;
