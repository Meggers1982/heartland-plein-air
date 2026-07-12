'use client';
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { AD_DEADLINE } from "@/lib/adDeadline";

const AdvertisingDeadlineBanner = () => {
  const [deadlinePassed, setDeadlinePassed] = useState(false);

  useEffect(() => {
    const check = () => setDeadlinePassed(Date.now() >= AD_DEADLINE);
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={deadlinePassed ? "bg-muted" : "bg-primary"}>
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-6 py-2 text-center">
        <Clock
          className={`h-4 w-4 flex-shrink-0 ${deadlinePassed ? "text-muted-foreground" : "text-primary-foreground"}`}
          aria-hidden="true"
        />
        <p
          className={`font-body text-xs font-semibold uppercase tracking-[0.15em] sm:text-sm ${deadlinePassed ? "text-muted-foreground" : "text-primary-foreground"}`}
        >
          {deadlinePassed
            ? "Advertising reservations are now closed"
            : "Advertising deadline: July 17, 2026 — reserve your ad space now"}
        </p>
      </div>
    </div>
  );
};

export default AdvertisingDeadlineBanner;
