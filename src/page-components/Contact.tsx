'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CountdownBanner from "@/components/CountdownBanner";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import FestivalContactInfo from "@/components/FestivalContactInfo";
import { setPageMeta } from "@/lib/meta";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

const topicOptions = ["Sponsorship", "Advertising", "Tickets", "General Questions"] as const;

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Please enter your name." })
    .max(100, { message: "Name must be less than 100 characters." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Please enter your email address." })
    .email({ message: "Please enter a valid email address." })
    .max(255, { message: "Email must be less than 255 characters." }),
  topic: z
    .string()
    .trim()
    .min(1, { message: "Please select a topic." }),
  subject: z
    .string()
    .trim()
    .min(1, { message: "Please enter a subject." })
    .max(150, { message: "Subject must be less than 150 characters." }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Please enter a message." })
    .max(2000, { message: "Message must be less than 2000 characters." }),
});

type FormState = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormState, string>>;

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mojopwyp";

const Contact = () => {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    topic: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact the Plein Air Festival Team: Ralston, NE";
    return setPageMeta(
      "Questions about the festival, sponsorships, volunteering, or advertising? Reach the Heartland Plein Air Festival team in Ralston, Nebraska.",
    );
  }, []);

  const update = <K extends keyof FormState>(key: K, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      router.push("/contact/success");
    } catch {
      setSubmitError(
        "Something went wrong sending your message. Please try again, or email us directly at ralstoncreativedistrict@gmail.com.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema([{ name: "Contact", path: "/contact" }])],
        }}
      />
      <SiteNav />

      <header className="bg-foreground pt-44 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            We'd Love to Hear From You
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-secondary md:text-6xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-secondary/80">
            Questions about the festival, sponsorship, volunteering, or press? Send us a note and we'll get back to you.
          </p>
        </div>
      </header>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-5">
          {/* Contact info */}
          <AnimatedSection className="md:col-span-2">
            <FestivalContactInfo headingLevel="h2" />
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={150} className="md:col-span-3">
            <div className="rounded-sm border border-border bg-card p-8 shadow-[0_24px_48px_-12px_hsl(var(--foreground)/0.08)] md:p-12">
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block px-1 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        maxLength={100}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        className="w-full rounded-sm border border-border bg-muted/60 px-4 py-3.5 font-body text-base text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20"
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="mt-1 px-1 font-body text-xs" style={{ color: "hsl(var(--destructive))" }}>
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block px-1 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="hello@example.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        maxLength={255}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        className="w-full rounded-sm border border-border bg-muted/60 px-4 py-3.5 font-body text-base text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20"
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="mt-1 px-1 font-body text-xs" style={{ color: "hsl(var(--destructive))" }}>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-topic" className="block px-1 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Topic
                    </label>
                    <div className="relative">
                      <select
                        id="contact-topic"
                        value={form.topic}
                        onChange={(e) => update("topic", e.target.value)}
                        aria-invalid={errors.topic ? "true" : "false"}
                        aria-describedby={errors.topic ? "contact-topic-error" : undefined}
                        className="w-full appearance-none rounded-sm border border-border bg-muted/60 px-4 py-3.5 pr-10 font-body text-base text-foreground transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20"
                      >
                        <option value="" disabled>
                          What can we help with?
                        </option>
                        {topicOptions.map((topic) => (
                          <option key={topic} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    {errors.topic && (
                      <p id="contact-topic-error" className="mt-1 px-1 font-body text-xs" style={{ color: "hsl(var(--destructive))" }}>
                        {errors.topic}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="block px-1 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Give us a quick summary"
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      maxLength={150}
                      aria-invalid={errors.subject ? "true" : "false"}
                      aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                      className="w-full rounded-sm border border-border bg-muted/60 px-4 py-3.5 font-body text-base text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                    {errors.subject && (
                      <p id="contact-subject-error" className="mt-1 px-1 font-body text-xs" style={{ color: "hsl(var(--destructive))" }}>
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block px-1 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={6}
                      placeholder="Tell us more..."
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      maxLength={2000}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      className="w-full resize-none rounded-sm border border-border bg-muted/60 px-4 py-3.5 font-body text-base text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="mt-1 px-1 font-body text-xs" style={{ color: "hsl(var(--destructive))" }}>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <p className="font-body text-sm" style={{ color: "hsl(var(--destructive))" }}>
                      {submitError}
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />
      <CountdownBanner />
      <NewsletterCTA />
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default Contact;