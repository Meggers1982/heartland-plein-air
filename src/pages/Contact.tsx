import { useEffect, useState } from "react";
import { z } from "zod";
import { Facebook, Instagram, MapPin, Phone, Check, Mail } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CountdownBanner from "@/components/CountdownBanner";
import BackToTop from "@/components/BackToTop";
import { setPageMeta } from "@/lib/meta";
import { addJsonLd, organizationSchema, breadcrumbSchema, SITE_URL } from "@/lib/schema";

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

const Contact = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    return addJsonLd("contact-jsonld", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ContactPage",
          name: "Contact — Heartland Plein Air Arts Festival",
          url: `${SITE_URL}/contact`,
          description:
            "Contact the Heartland Plein Air Arts Festival for questions, sponsorship, volunteering, or press inquiries.",
        },
        {
          ...organizationSchema,
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+14029539173",
              email: "ralstoncreativedistrict@gmail.com",
              contactType: "customer service",
              availableLanguage: "English",
            },
            {
              "@type": "ContactPoint",
              telephone: "+14023316677",
              contactType: "sales",
              availableLanguage: "English",
            },
          ],
        },
        breadcrumbSchema("Contact", "/contact"),
      ],
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us | Heartland Plein Air Arts Festival";
    return setPageMeta(
      "Get in touch with the Heartland Plein Air Arts Festival. Questions about events, sponsorship opportunities, volunteering, or press — we'd love to hear from you.",
    );
  }, []);

  const update = <K extends keyof FormState>(key: K, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleBlur = <K extends keyof FormState>(key: K) => {
    const result = contactSchema.shape[key].safeParse(form[key]);
    if (!result.success) {
      setErrors((e) => ({ ...e, [key]: result.error.issues[0]?.message }));
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setSubmitError(null);
    setSubmitted(false);
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
    const res = await fetch("https://formspree.io/f/mzdwkdvz", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...result.data, _replyto: result.data.email }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.ok !== false) {
      setSubmitted(true);
    } else {
      setSubmitError("Something went wrong. Please email us directly at ralstoncreativedistrict@gmail.com.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <header id="main-content" tabIndex={-1} className="bg-foreground pt-44 pb-16">
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
            <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Festival Office
            </p>
            <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-foreground">
              Ralston HINGE Creative District
            </h2>
            <div className="space-y-5 font-body text-base text-foreground/85">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <address className="not-italic leading-relaxed">
                  5500 S 77th St
                  <br />
                  Ralston, NE 68127
                </address>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <a
                  href="tel:+14029539173"
                  className="transition-colors hover:text-primary"
                >
                  (402) 953-9173
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <a
                  href="mailto:ralstoncreativedistrict@gmail.com"
                  className="transition-colors hover:text-primary"
                >
                  ralstoncreativedistrict@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Follow Along
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/RalstonArts"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/50 text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/ralstonarts"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/50 text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={150} className="md:col-span-3">
            <div className="rounded-sm border border-border bg-card p-8 shadow-[0_24px_48px_-12px_hsl(var(--foreground)/0.08)] md:p-12">
              {submitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
                    <Check className="h-7 w-7 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-display text-2xl font-bold text-foreground">
                    Message sent
                  </h3>
                  <p className="max-w-md font-body text-base text-muted-foreground">
                    Thanks for reaching out. We'll get back to you as soon as we can.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-6 font-body text-sm text-primary underline underline-offset-4 transition-colors hover:text-primary/70"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block px-1 font-body text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Name <span aria-hidden="true" className="text-primary">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        maxLength={100}
                        aria-required="true"
                        aria-invalid={errors.name ? "true" : "false"}
                        className="w-full rounded-lg border border-border bg-muted/60 px-4 py-3.5 font-body text-base text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20"
                      />
                      {errors.name && (
                        <p className="mt-1 px-1 font-body text-xs" style={{ color: "hsl(var(--destructive))" }}>
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block px-1 font-body text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Email <span aria-hidden="true" className="text-primary">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="hello@example.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        maxLength={255}
                        aria-required="true"
                        aria-invalid={errors.email ? "true" : "false"}
                        className="w-full rounded-lg border border-border bg-muted/60 px-4 py-3.5 font-body text-base text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20"
                      />
                      {errors.email && (
                        <p className="mt-1 px-1 font-body text-xs" style={{ color: "hsl(var(--destructive))" }}>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="block px-1 font-body text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Subject <span aria-hidden="true" className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="What can we help you with?"
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      onBlur={() => handleBlur("subject")}
                      maxLength={150}
                      aria-required="true"
                      aria-invalid={errors.subject ? "true" : "false"}
                      className="w-full rounded-lg border border-border bg-muted/60 px-4 py-3.5 font-body text-base text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                    {errors.subject && (
                      <p className="mt-1 px-1 font-body text-xs" style={{ color: "hsl(var(--destructive))" }}>
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block px-1 font-body text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Message <span aria-hidden="true" className="text-primary">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={6}
                      placeholder="Tell us more..."
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                      maxLength={2000}
                      aria-required="true"
                      aria-invalid={errors.message ? "true" : "false"}
                      className="w-full resize-none rounded-lg border border-border bg-muted/60 px-4 py-3.5 font-body text-base text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                    <div className="flex items-start justify-between px-1">
                      {errors.message ? (
                        <p className="font-body text-xs" style={{ color: "hsl(var(--destructive))" }}>
                          {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <p className="ml-2 shrink-0 font-body text-xs text-muted-foreground/60">
                        {form.message.length} / 2000
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    {submitError && (
                      <p className="mb-4 font-body text-sm" style={{ color: "hsl(var(--destructive))" }}>
                        {submitError}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl active:translate-y-0"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BrushStrokeDivider />
      <CountdownBanner />
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default Contact;