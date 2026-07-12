import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";

type FestivalContactInfoProps = {
  headingLevel?: "h2" | "h3";
};

const FestivalContactInfo = ({ headingLevel = "h3" }: FestivalContactInfoProps) => {
  const Heading = headingLevel;
  return (
    <div>
      <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        Festival Office
      </p>
      <Heading
        className={`mb-6 font-display font-bold leading-tight text-foreground ${headingLevel === "h2" ? "text-3xl" : "text-2xl"}`}
      >
        Ralston HINGE Creative District
      </Heading>
      <div className="space-y-5 font-body text-base text-foreground/85">
        <div className="flex items-start gap-3">
          <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
          <address className="not-italic leading-relaxed">
            5615 S. 77th St
            <br />
            Ralston, NE 68127
          </address>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
          <a href="tel:+14025926552" className="transition-colors hover:text-primary">
            (402) 592-6552
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
    </div>
  );
};

export default FestivalContactInfo;
