import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import BrushStrokeDivider from "@/components/BrushStrokeDivider";
import FooterSignup from "@/components/FooterSignup";
import { urlFor } from "@/sanity/lib/image";
import type { Sponsor } from "@/sanity/queries/sponsors";

const SiteFooter = ({ sponsors }: { sponsors: Sponsor[] }) => {
  return (
    <footer className="bg-background text-foreground">
      <BrushStrokeDivider className="pt-6" />
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col">
            <Link
              href="/"
              aria-label="Heartland Plein Air Festival home"
              className="relative block w-full overflow-hidden rounded-lg aspect-[1376/729]"
            >
              <img
                src="/assets/heartland-logo.png"
                alt="heartland plein air festival sunset artist logo"
                className="absolute left-[-20.86%] top-[-65.71%] w-[139.53%] max-w-none"
              />
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-foreground/80">
              The Heartland Plein Air Festival brings 25 nationally recognized artists to the greater Omaha metro for a week of outdoor painting, public access, and live art-making across more than 20 locations. Watch the work happen, meet the artists, and catch the full collection at the public exhibition and auction on September 19.
            </p>
          </div>

          {/* Visit */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
              Visit
            </h3>
            <address className="space-y-3 font-body text-sm not-italic text-foreground/80">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-medium text-foreground">
                    Ralston HINGE Creative District
                  </p>
                  <p>5615 S. 77th St</p>
                  <p>Ralston, NE 68127</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                <a
                  href="tel:+14025926552"
                  className="transition-colors hover:text-primary"
                >
                  (402) 592-6552
                </a>
              </div>
            </address>
          </div>


          {/* Stay in Touch */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
              Stay in Touch
            </h3>
            <FooterSignup />
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com/RalstonArts/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/70 transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/ralstonarts/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/70 transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Sponsors & Partners */}
        <div className="mt-12 border-t border-foreground/10 pt-6">
          <p className="mb-4 text-center font-body text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80">
            Sponsors &amp; Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {sponsors.map((sponsor) => {
              const img = sponsor.logo ? (
                <img
                  src={urlFor(sponsor.logo).width(340).auto("format").url()}
                  alt={sponsor.alt ?? sponsor.name}
                  className="h-10 w-auto max-w-[170px] object-contain md:h-14"
                />
              ) : (
                <span className="font-body text-sm font-semibold text-foreground">
                  {sponsor.name}
                </span>
              );
              return sponsor.url ? (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={sponsor.name}
                  className="transition-opacity hover:opacity-80"
                >
                  {img}
                </a>
              ) : (
                <span key={sponsor.name}>{img}</span>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-foreground/10 pt-6 text-center md:flex-row md:text-left">
          <p className="font-body text-xs text-foreground/80">
            © {new Date().getFullYear()} Heartland Plein Air Festival. All rights reserved. Website built by{" "}
            <a
              href="https://thebrandledger.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-primary"
            >
              Brand Ledger
            </a>
            .
          </p>
          <div className="flex items-center gap-2">
            <p className="font-body text-xs text-foreground/80">
              Presented by the Ralston HINGE Creative District, a registered
              501(c)(3) nonprofit. Charity ID (EIN): 41-5038534.
            </p>
            <a
              href="https://ralstonarts.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ralston HINGE Creative District"
              className="transition-opacity hover:opacity-80"
            >
              <img
                src="/assets/hinge-creative-district-logo-horizontal.png"
                alt="ralston hinge creative district logo"
                className="h-7 w-auto object-contain md:h-8"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
