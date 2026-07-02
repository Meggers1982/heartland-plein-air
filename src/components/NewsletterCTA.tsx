'use client';
import { useState } from "react";
import { z } from "zod";
import { Sparkles, Calendar, Users, Check } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Please enter your email address." })
  .email({ message: "Please enter a valid email address." })
  .max(255, { message: "Email must be less than 255 characters." });

const perks = [
  { icon: Users, label: "Artist announcements" },
  { icon: Calendar, label: "Event schedules & maps" },
  { icon: Sparkles, label: "Early collector access" },
];

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid email.");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground to-primary/40 py-24"
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
          Join the Festival
        </p>
        <h2 className="mb-5 font-display text-4xl font-bold leading-tight text-background md:text-5xl">
          Be the First to Know
        </h2>
        <p className="mx-auto mb-10 max-w-xl font-body text-base leading-relaxed text-background/75 md:text-lg">
          Be the first to know — get artist announcements, paint-out locations, exhibition previews, and exclusive festival access, right in your inbox.
        </p>

        <ul className="mb-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-body text-sm text-background/80">
          {perks.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>{label}</span>
            </li>
          ))}
        </ul>

        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-full border border-primary/40 bg-primary/15 px-6 py-4 font-body text-base text-background animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <Check className="h-5 w-5 text-primary" aria-hidden="true" />
            <span>Thanks — you're on the list.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto max-w-lg"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:rounded-full sm:border sm:border-background/20 sm:bg-background/5 sm:p-1.5 sm:backdrop-blur-sm sm:focus-within:ring-2 sm:focus-within:ring-primary">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="your@email.com"
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? "newsletter-error" : "newsletter-trust"}
                maxLength={255}
                className="flex-1 rounded-full border border-background/20 bg-background/10 px-6 py-3.5 font-body text-base text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-primary sm:border-0 sm:bg-transparent sm:focus:ring-0"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-[1.03] hover:opacity-95 active:scale-[0.98]"
              >
                Subscribe
              </button>
            </div>

            <div className="mt-4 min-h-[1.25rem]" aria-live="polite">
              {error ? (
                <p
                  id="newsletter-error"
                  className="font-body text-sm text-destructive-foreground"
                  style={{ color: "hsl(var(--destructive))" }}
                >
                  {error}
                </p>
              ) : (
                <p
                  id="newsletter-trust"
                  className="font-body text-xs text-background/80"
                >
                  No spam. Unsubscribe anytime. Festival updates only.
                </p>
              )}
            </div>
          </form>
        )}
      </AnimatedSection>
    </section>
  );
};

export default NewsletterCTA;
