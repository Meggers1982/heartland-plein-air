'use client';
import { useDraftModeEnvironment } from "next-sanity/hooks";

const DisableDraftMode = () => {
  const environment = useDraftModeEnvironment();
  // Only show outside of the Presentation tool's own iframe — inside it,
  // exiting draft mode is Presentation's job, not this button's.
  if (environment !== "live" && environment !== "unknown") return null;

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-50 rounded-full bg-foreground px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-background shadow-lg"
    >
      Disable Draft Mode
    </a>
  );
};

export default DisableDraftMode;
