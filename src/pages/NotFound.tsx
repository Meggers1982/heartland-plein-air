import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/schedule" },
  { label: "Artists", href: "/artists" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center"
      >
        <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          404
        </p>
        <h1 className="mb-4 font-display text-5xl font-bold text-foreground md:text-6xl">
          Page Not Found
        </h1>
        <p className="mx-auto mb-10 max-w-sm font-body text-base leading-relaxed text-muted-foreground">
          That page doesn't exist. Here are some places to head next:
        </p>
        <nav aria-label="Suggested pages" className="flex flex-wrap justify-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="rounded-full border border-border bg-card px-5 py-2.5 font-body text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
};

export default NotFound;
