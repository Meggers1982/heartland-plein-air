import { Users } from "lucide-react";
import { REGISTRATION_FULL } from "@/lib/openDivisionRegistration";

// Matches AdvertisingDeadlineBanner's closed state. No client-side timer here:
// registration fills by hand, not on a clock, so this renders straight from
// the flag and stays a server component.
const OpenDivisionFullBanner = () => {
  if (!REGISTRATION_FULL) return null;

  return (
    <div className="bg-muted">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-6 py-2 text-center">
        <Users className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
        <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground sm:text-sm">
          Open Division registration is full
        </p>
      </div>
    </div>
  );
};

export default OpenDivisionFullBanner;
