'use client';
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { useCountdown } from "@/hooks/useCountdown";
import { useFestivalPhase } from "@/hooks/useFestivalPhase";
import {
  festivalEndTimestamp,
  festivalLengthDays,
  festivalStartTimestamp,
  formatFestivalLine,
  scheduleDayAnchor,
} from "@/lib/festivalDate";
import { phaseCopy } from "@/lib/festivalPhaseCopy";
import { useFestivalInfo, useSiteChrome } from "@/components/SiteContext";

const FALLBACK_START = festivalStartTimestamp("2026-09-13");
const FALLBACK_END = festivalEndTimestamp("2026-09-19");

/**
 * Before the festival: the countdown. During: "Happening now · Day N of 7",
 * linking to today on the schedule. After: hidden. CSS picks the variant from
 * an attribute set on <html> before first paint — see the phase notes in
 * src/lib/festivalDate.ts — so a returning visitor never sees the ribbon
 * render and then collapse.
 */
const CountdownRibbon = () => {
  const festival = useFestivalInfo();
  const chrome = useSiteChrome();
  const copy = phaseCopy(chrome);
  // Falls back to the shipped dates if the document is ever missing, so the
  // countdown keeps running rather than the component throwing.
  const startsAt = festival ? festivalStartTimestamp(festival.startDate) : FALLBACK_START;
  const endsAt = festival ? festivalEndTimestamp(festival.endDate) : FALLBACK_END;
  // Both null until mounted — see useCountdown for why the first value can't
  // be computed during render on these statically prerendered pages.
  const t = useCountdown(startsAt);
  const phase = useFestivalPhase(startsAt, endsAt);

  const totalDays = festival ? festivalLengthDays(festival.startDate, festival.endDate) : 7;
  const scheduleHref =
    festival && phase?.day ? `/schedule#${scheduleDayAnchor(festival.startDate, phase.day)}` : "/schedule";

  const units: Array<[string, number]> = [
    ["Days", t?.days ?? 0],
    ["Hrs", t?.hours ?? 0],
    ["Min", t?.minutes ?? 0],
    ["Sec", t?.seconds ?? 0],
  ];

  return (
    <div className="bg-primary text-primary-foreground phase-after:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2">
        {/* Before: the countdown */}
        <div className="flex items-center gap-3 phase-live:hidden sm:gap-5">
          {/* Hidden below 360px. The label and the four countdown units
              compete for one row, and on a 320px screen the "Sec" unit was
              being clipped off the edge — pre-existing, but raising the unit
              labels from 9px to 11px for legibility made it worse. Dropping
              the label is what buys the room back: it is the decorative half
              of the row, and the numbers are the point. */}
          <span className="hidden font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/90 min-[360px]:inline sm:hidden">
            {chrome?.ribbonLabelMobile}
          </span>
          <span className="hidden font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-foreground/90 sm:inline">
            {chrome?.ribbonLabelDesktop}
          </span>
          <div className="flex items-baseline gap-2 sm:gap-3">
            {units.map(([label, value], i) => (
              <div key={label} className="flex items-baseline gap-2 sm:gap-3">
                <span className="flex items-baseline gap-1">
                  {/* Invisible rather than omitted pre-mount so the ribbon
                      reserves its final width and doesn't shift on hydration. */}
                  <span
                    className={`font-display text-lg font-bold tabular-nums leading-none sm:text-xl ${
                      t ? "" : "invisible"
                    }`}
                  >
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/90 sm:text-[9px]">
                    {label}
                  </span>
                </span>
                {i < units.length - 1 && (
                  <span aria-hidden className="font-display text-base text-primary-foreground/40">
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* During: today's day, linking to it on the schedule. Same text-lg /
            sm:text-xl leading-none as the digits above, so the ribbon keeps its
            height and the scroll-mt offsets sized for nav + ribbon still hold. */}
        <Link
          href={scheduleHref}
          className="group hidden items-baseline gap-2 phase-live:flex sm:gap-3"
        >
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/90 sm:text-[10px] sm:tracking-[0.25em]">
            {copy.liveLabel}
          </span>
          <span aria-hidden className="font-display text-base text-primary-foreground/40">
            ·
          </span>
          {/* Invisible until mounted, like the digits: the day can't be known
              at build time, and the placeholder holds the width. */}
          <span
            className={`font-display text-lg font-bold tabular-nums leading-none group-hover:underline sm:text-xl ${
              phase?.day ? "" : "invisible"
            }`}
          >
            Day {phase?.day ?? 1} of {totalDays}
          </span>
          <ArrowRight
            aria-hidden
            className="h-4 w-4 self-center transition-transform group-hover:translate-x-0.5"
          />
        </Link>

        <p className="hidden font-display text-sm italic text-primary-foreground md:block">
          {festival && formatFestivalLine(festival.startDate, festival.endDate, festival.location, "short")}
        </p>
      </div>
    </div>
  );
};

export default CountdownRibbon;
