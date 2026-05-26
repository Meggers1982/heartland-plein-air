import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, Phone, Check } from "lucide-react";
import { z } from "zod";
import heartlandLogo from "@/assets/heartland-logo.png";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Please enter your email address." })
  .email({ message: "Please enter a valid email address." })
  .max(255, { message: "Email must be less than 255 characters." });


const FooterSignup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid email.");
      return;
    }
    setError(null);
    const res = await fetch("https://formspree.io/f/xgoqpoyk", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email: result.data }),
    });
    if (res.ok) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-2.5 font-body text-sm text-foreground"
      >
        <Check className="h-4 w-4 text-accent" aria-hidden="true" />
        <span>Thanks — you're on the list.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          placeholder="your@email.com"
          maxLength={255}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "footer-email-error" : undefined}
          className="min-w-0 flex-1 rounded-full border border-foreground/20 bg-foreground/5 px-4 py-2.5 font-body text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          className="rounded-full bg-primary px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-md shadow-primary/30 transition-all hover:scale-[1.03] hover:opacity-95 active:scale-[0.98]"
        >
          Subscribe
        </button>
      </div>
      <div className="mt-2 min-h-[1rem]" aria-live="polite">
        {error ? (
          <p
            id="footer-email-error"
            className="font-body text-xs"
            style={{ color: "hsl(var(--destructive))" }}
          >
            {error}
          </p>
        ) : (
          <p className="font-body text-xs text-foreground/50">
            No spam. Festival updates only.
          </p>
        )}
      </div>
    </form>
  );
};

const SiteFooter = () => {
  return (
    <footer className="bg-background text-foreground">
      <BrushStrokeDivider className="pt-6" strokeColor="hsl(var(--brand-soft-gold))" />
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col">
            <Link
              to="/"
              aria-label="Heartland Plein Air Arts Festival home"
              className="relative block w-full overflow-hidden rounded-lg aspect-[1376/729]"
            >
              <img
                src={heartlandLogo}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute left-[-20.86%] top-[-65.71%] w-[139.53%] max-w-none"
              />
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-foreground/70">
              The Heartland Plein Air Arts Festival brings nationally recognized artists to the greater Omaha metro for a week of outdoor painting, public access, and live art-making across more than 20 locations. Watch the work happen, meet the artists, and catch the full collection at the public exhibition and auction on September 19.
            </p>
          </div>

          {/* Visit */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
              Visit
            </h3>
            <address className="space-y-3 font-body text-sm not-italic text-foreground/70">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-medium text-foreground">
                    Ralston HINGE Creative District
                  </p>
                  <p>5500 S 77th St</p>
                  <p>Ralston, NE 68127</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                <a
                  href="tel:+14029539173"
                  className="transition-colors hover:text-accent"
                >
                  (402) 953-9173
                </a>
              </div>
            </address>
          </div>


          {/* Stay in Touch */}
          <div id="newsletter">
            <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
              Stay in Touch
            </h3>
            <FooterSignup />
            <div className="mt-5 flex gap-3">
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
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-foreground/10 pt-6 text-center md:flex-row md:text-left">
          <p className="font-body text-xs text-foreground/50">
            © {new Date().getFullYear()} Heartland Plein Air Arts Festival. All rights reserved. Website built by{" "}
            <a
              href="https://thebrandledger.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-accent"
            >
              Brand Ledger
            </a>
            .
          </p>
          <p className="font-body text-xs text-foreground/50">
            Presented by Ralston HINGE Creative District.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
