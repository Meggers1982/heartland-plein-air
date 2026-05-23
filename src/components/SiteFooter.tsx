import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/schedule" },
  { label: "Artists", href: "/artists" },
  { label: "Gallery", href: "/#gallery" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

const FooterSignup = () => {
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

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-2.5 font-body text-sm text-primary-foreground"
      >
        <Check className="h-4 w-4 text-primary" aria-hidden="true" />
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
          className="min-w-0 flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-2.5 font-body text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
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
          <p className="font-body text-xs text-primary-foreground/50">
            No spam. Festival updates only.
          </p>
        )}
      </div>
    </form>
  );
};

const SiteFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuickLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("/#")) return;
    e.preventDefault();
    const hash = href.slice(1);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 60);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <BrushStrokeDivider className="pt-6" />
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" aria-label="Heartland Plein Air Arts Festival home" className="inline-flex">
              <img
                src={heartlandLogo}
                alt="Heartland Plein Air Arts Festival sunset artist logo"
                className="h-16 w-auto"
              />
            </Link>
            <p className="font-body text-sm leading-relaxed text-primary-foreground/70">
              A week-long celebration of plein air painting across Douglas & Sarpy County,
              September 13–19, 2026.
            </p>
          </div>

          {/* Visit */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-primary-foreground">
              Visit
            </h3>
            <address className="space-y-3 font-body text-sm not-italic text-primary-foreground/70">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-medium text-primary-foreground">
                    Ralston HINGE Creative District
                  </p>
                  <p>5500 S 77th St</p>
                  <p>Ralston, NE 68127</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                <a
                  href="tel:+14029539173"
                  className="transition-colors hover:text-primary"
                >
                  (402) 953-9173
                </a>
              </div>
            </address>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-primary-foreground">
              Explore
            </h3>
            <ul className="space-y-2 font-body text-sm">
              {quickLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleQuickLink(e, link.href)}
                      className="text-primary-foreground/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Stay in Touch */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-primary-foreground">
              Stay in Touch
            </h3>
            <FooterSignup />
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com/RalstonArts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/ralstonarts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-primary-foreground/10 pt-6 text-center md:flex-row md:text-left">
          <p className="font-body text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Heartland Plein Air Arts Festival. All rights reserved. Website built by{" "}
            <a
              href="https://thebrandledger.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-primary"
            >
              Brand Ledger
            </a>
          </p>
          <p className="font-body text-xs text-primary-foreground/50">
            Presented by Ralston Arts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;