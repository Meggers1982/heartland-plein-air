import { Facebook, Instagram, Youtube } from "lucide-react";

const SiteFooter = () => (
  <footer className="border-t border-border bg-background py-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
      <span className="font-display text-lg font-semibold text-foreground">
        Heartland Plein Air Arts Festival
      </span>
      <p className="font-body text-sm text-muted-foreground">
        September 13–19, 2026 · Douglas & Sarpy County
      </p>
      <div className="flex gap-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Facebook">
          <Facebook className="h-5 w-5" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Instagram">
          <Instagram className="h-5 w-5" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" aria-label="YouTube">
          <Youtube className="h-5 w-5" />
        </a>
      </div>
      <p className="font-body text-xs text-muted-foreground/60">
        © 2026 Heartland Plein Air Arts Festival. All rights reserved.
      </p>
    </div>
  </footer>
);

export default SiteFooter;