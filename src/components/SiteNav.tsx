import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import heartlandLogo from "@/assets/heartland-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/schedule" },
  { label: "Artists", href: "/artists" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const SiteNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    if (href.startsWith("/#")) {
      const hash = href.slice(1);
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 60);
      } else {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    navigate(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          aria-label="Heartland Plein Air Festival home"
          className="relative block h-16 md:h-20 aspect-[1376/729] overflow-hidden"
        >
          <img
            src={heartlandLogo}
            alt="Heartland Plein Air Arts Festival"
            className="absolute left-[-20.86%] top-[-65.71%] w-[139.53%] max-w-none"
          />
        </Link>
        <div className="hidden gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                aria-current={isActive ? "page" : undefined}
                className={`border-b-2 pb-px font-body text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/80 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[32rem] border-t border-border" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                aria-current={isActive ? "page" : undefined}
                className={`rounded px-3 py-2 font-body text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground/80 hover:bg-muted hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;