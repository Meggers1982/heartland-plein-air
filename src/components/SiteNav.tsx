import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import heartlandLogo from "@/assets/heartland-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/schedule" },
  { label: "Artists", href: "/artists" },
  { label: "Gallery", href: "/#gallery" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          aria-label="Heartland Plein Air Festival home"
          className="relative block h-16 md:h-20 aspect-[1376/729] overflow-hidden"
        >
          <img
            src={heartlandLogo}
            alt="heartland plein air festival sunset artist logo"
            className="absolute left-[-20.86%] top-[-65.71%] w-[139.53%] max-w-none"
          />
        </Link>
        <div className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-body text-sm font-medium tracking-wide text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[32rem] border-t border-primary-foreground/10" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="rounded px-3 py-2 font-body text-sm font-medium tracking-wide text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;