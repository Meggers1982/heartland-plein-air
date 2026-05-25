import { useEffect, useState } from "react";
import { z } from "zod";
import { Facebook, Instagram, MapPin, Phone, Check, Mail } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CountdownBanner from "@/components/CountdownBanner";
import NewsletterCTA from "@/components/NewsletterCTA";
import BackToTop from "@/components/BackToTop";
import { setPageMeta } from "@/lib/meta";

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

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact | Heartland Plein Air Arts Festival";
    return setPageMeta(
      "Get in touch with the Heartland Plein Air Arts Festival — questions, sponsorships, volunteer inquiries, and more.",
    );
  }, []);

  const update = <K extends keyof FormState>(key: K, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <header className="bg-foreground pt-32 pb-16">
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
                  href="mailto:info@heartlandpleinair.org"
                  className="transition-colors hover:text-primary"
                >
                  info@heartlandpleinair.org
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/ralstonarts"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={150} className="md:col-span-3">
            <div className="rounded-lg border border-border bg-card p-8 shadow-sm md:p-10">
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
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block font-body text-sm font-semibold text-foreground">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        maxLength={100}
                        aria-invalid={errors.name ? "true" : "false"}
                        className="w-full rounded-md border border-border bg-background px-4 py-2.5 font-body text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {errors.name && (
                        <p className="mt-1 font-body text-xs" style={{ color: "hsl(var(--destructive))" }}>
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block font-body text-sm font-semibold text-foreground">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        maxLength={255}
                        aria-invalid={errors.email ? "true" : "false"}
                        className="w-full rounded-md border border-border bg-background px-4 py-2.5 font-body text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {errors.email && (
                        <p className="mt-1 font-body text-xs" style={{ color: "hsl(var(--destructive))" }}>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="mb-1.5 block font-body text-sm font-semibold text-foreground">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      maxLength={150}
                      aria-invalid={errors.subject ? "true" : "false"}
                      className="w-full rounded-md border border-border bg-background px-4 py-2.5 font-body text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.subject && (
                      <p className="mt-1 font-body text-xs" style={{ color: "hsl(var(--destructive))" }}>
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block font-body text-sm font-semibold text-foreground">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={6}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      maxLength={2000}
                      aria-invalid={errors.message ? "true" : "false"}
                      className="w-full resize-y rounded-md border border-border bg-background px-4 py-2.5 font-body text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.message && (
                      <p className="mt-1 font-body text-xs" style={{ color: "hsl(var(--destructive))" }}>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Send Message
                  </button>
                </form>
              )}
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