'use client';
import { useEffect, useState } from "react";

import {
  PHASE_ATTRIBUTE,
  festivalDayNumber,
  festivalPhase,
  type FestivalPhase,
} from "@/lib/festivalDate";

export type FestivalPhaseState = {
  phase: FestivalPhase;
  /** 1 on opening day; null outside the festival. */
  day: number | null;
};

/**
 * The festival phase, for the details CSS can't pick on its own (today's day
 * number, today's schedule anchor). Which variant is VISIBLE is not decided
 * here — see the phase notes in src/lib/festivalDate.ts.
 *
 * Returns null until mounted, for the same reason useCountdown does: reading
 * the clock during render on these prerendered pages causes a hydration
 * mismatch.
 *
 * It also keeps the <html> phase attribute current, so a page left open across
 * midnight on opening or closing day switches over without a reload.
 */
export function useFestivalPhase(startsAt: number, endsAt: number): FestivalPhaseState | null {
  const [phase, setPhase] = useState<FestivalPhase | null>(null);
  const [day, setDay] = useState<number | null>(null);

  useEffect(() => {
    const sync = () => {
      const now = Date.now();
      const p = festivalPhase(now, startsAt, endsAt);
      if (document.documentElement.getAttribute(PHASE_ATTRIBUTE) !== p) {
        document.documentElement.setAttribute(PHASE_ATTRIBUTE, p);
      }
      setPhase(p);
      setDay(p === "live" ? festivalDayNumber(now, startsAt) : null);
    };
    sync();
    const id = setInterval(sync, 1000);
    return () => clearInterval(id);
  }, [startsAt, endsAt]);

  return phase === null ? null : { phase, day };
}
