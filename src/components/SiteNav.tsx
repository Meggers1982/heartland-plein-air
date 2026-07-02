'use client';
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import CountdownRibbon from "@/components/CountdownRibbon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinksBeforeAbout = [{ label: "Home", href: "/" }];

const navLinksAfterAbout = [
  { label: "Schedule", href: "/schedule" },
  { label: "Artists", href: "/artists" },
  { label: "Gallery", href: "/gallery" },
  { label: "Open Division", href: "/open-division" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const aboutDropdownLinks = [
  { label: "About", href: "/about" },
  { label: "Advertising", href: "/advertising" },
];

const SiteNav = () => {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const pathname = usePathname();
  const showRibbon = pathname !== "/";

  const closeMenus = () => {
    setOpen(false);
    setAboutOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          aria-label="Heartland Plein Air Festival home"
          className="relative block h-16 md:h-20 aspect-[1376/729] overflow-hidden"
        >
          <img
            src="/assets/heartland-logo.png"
            alt="heartland plein air festival sunset artist logo"
            className="absolute left-[-20.86%] top-[-65.71%] w-[139.53%] max-w-none"
          />
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {navLinksBeforeAbout.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenus}
              className="font-body text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

          <div
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <DropdownMenu open={aboutOpen} onOpenChange={setAboutOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-1 font-body text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-primary"
                  aria-haspopup="menu"
                  aria-expanded={aboutOpen}
                >
                  About
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${aboutOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={12}
                className="min-w-[10rem] rounded-md border border-border bg-popover p-1 font-body text-popover-foreground shadow-lg"
              >
                {aboutDropdownLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link
                      href={link.href}
                      onClick={closeMenus}
                      className="cursor-pointer rounded-sm px-3 py-2 text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary"
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {navLinksAfterAbout.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenus}
              className="font-body text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {showRibbon && <CountdownRibbon />}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[32rem] border-t border-border" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navLinksBeforeAbout.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenus}
              className="rounded px-3 py-2 font-body text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/about"
            onClick={closeMenus}
            className="rounded px-3 py-2 font-body text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/advertising"
            onClick={closeMenus}
            className="ml-4 rounded px-3 py-2 font-body text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
          >
            Advertising
          </Link>
          {navLinksAfterAbout.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenus}
              className="rounded px-3 py-2 font-body text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
