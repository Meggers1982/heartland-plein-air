'use client';
import Link from "next/link";
import type { ReactNode } from "react";

import { useCountdown } from "@/hooks/useCountdown";
import { useFestivalPhase } from "@/hooks/useFestivalPhase";
import {
  festivalEndTimestamp,
  festivalStartTimestamp,
  formatFestivalLine,
  scheduleDayAnchor,
} from "@/lib/festivalDate";
import { phaseCopy } from "@/lib/festivalPhaseCopy";
import { useFestivalInfo, useSiteChrome } from "@/components/SiteContext";
import { ONLINE_SALE_URL } from "@/lib/onlineSale";

const FALLBACK_START = festivalStartTimestamp("2026-09-13");
const FALLBACK_END = festivalEndTimestamp("2026-09-19");

const BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-md bg-primary-foreground px-6 py-3 font-body text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50";

/** The small caps line and rule above the clock (or the heading that replaces it). */
const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col items-center gap-2 lg:items-start">
    <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/90">
      {children}
    </p>
    <div className="h-px w-12 bg-primary-foreground/40" />
  </div>
);

/** The large line that takes the clock's place during and after the festival. */
const PhaseHeading = ({ children }: { children: ReactNode }) => (
  <p className="max-w-md text-balance text-center font-display text-3xl font-bold text-primary-foreground sm:text-4xl md:text-5xl lg:text-left">
    {children}
  </p>
);

/**
 * Three variants are rendered and CSS shows one — `phase-live:` / `phase-after:`
 * key off an attribute set on <html> before first paint. See the phase notes in
 * src/lib/festivalDate.ts for why this isn't React state.
 */
const CountdownBanner = () => {
  const festival = useFestivalInfo();
  const chrome = useSiteChrome();
  const copy = phaseCopy(chrome);
  // Falls back to the shipped dates if the document is ever missing, so the
  // countdown keeps running rather than the component throwing.
  const startsAt = festival ? festivalStartTimestamp(festival.startDate) : FALLBACK_START;
  const endsAt = festival ? festivalEndTimestamp(festival.endDate) : FALLBACK_END;
  // null until mounted — see the hook for why the first value can't be
  // computed during render on these statically prerendered pages.
  const timeLeft = useCountdown(startsAt);
  const phase = useFestivalPhase(startsAt, endsAt);

  // Plain /schedule until mounted; then jumps straight to today's day.
  const scheduleHref =
    festival && phase?.day ? `/schedule#${scheduleDayAnchor(festival.startDate, phase.day)}` : "/schedule";

  const units = [
    { label: "Days", value: timeLeft?.days ?? 0 },
    { label: "Hours", value: timeLeft?.hours ?? 0 },
    { label: "Minutes", value: timeLeft?.minutes ?? 0 },
    { label: "Seconds", value: timeLeft?.seconds ?? 0 },
  ];

  return (
    <section className="relative overflow-hidden bg-primary py-12">
      {/* Subtle texture wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, hsl(var(--secondary)) 0%, transparent 40%), radial-gradient(circle at 80% 70%, hsl(var(--secondary)) 0%, transparent 45%)",
        }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-4 lg:flex-row lg:justify-between lg:text-left">
        <div className="flex flex-col items-center gap-6 lg:items-start">
          {/* Before: the countdown */}
          <div className="flex flex-col items-center gap-6 phase-live:hidden phase-after:hidden lg:items-start">
            <Eyebrow>{chrome?.countdownLabel}</Eyebrow>

            <div className="flex items-end gap-2 sm:gap-4 md:gap-6">
              {units.map((u, i) => (
                <div key={u.label} className="flex items-end gap-2 sm:gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="relative rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-2 shadow-inner backdrop-blur-sm sm:px-5 sm:py-3">
                      {/* Pre-mount the digits render invisibly rather than being
                          omitted, so the box reserves its exact final width and
                          nothing shifts when the first tick lands. */}
                      <span
                        key={timeLeft ? u.value : "placeholder"}
                        className={`block font-display text-4xl font-bold tabular-nums text-primary-foreground animate-in fade-in slide-in-from-top-1 duration-500 sm:text-5xl md:text-6xl ${
                          timeLeft ? "" : "invisible"
                        }`}
                      >
                        {String(u.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="mt-2 font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-primary-foreground/90 sm:text-xs">
                      {u.label}
                    </span>
                  </div>
                  {i < units.length - 1 && (
                    <span
                      aria-hidden
                      className="pb-8 font-display text-3xl font-bold text-primary-foreground/30 sm:text-4xl md:text-5xl"
                    >
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* During */}
          <div className="hidden flex-col items-center gap-6 phase-live:flex lg:items-start">
            <Eyebrow>{copy.liveLabel}</Eyebrow>
            <PhaseHeading>{copy.liveHeading}</PhaseHeading>
          </div>

          {/* After */}
          <div className="hidden flex-col items-center gap-6 phase-after:flex lg:items-start">
            <Eyebrow>{copy.afterLabel}</Eyebrow>
            <PhaseHeading>{copy.afterHeading}</PhaseHeading>
          </div>

          <p className="text-center font-display text-base italic text-primary-foreground sm:text-lg lg:text-left">
            {festival && formatFestivalLine(festival.startDate, festival.endDate, festival.location, "long")}
          </p>
        </div>

        {/* CTA — the newsletter before the festival; the schedule while it's
            on; the online sale after (through Oct 4), since that's the one
            thing that's actually time-sensitive and actionable post-festival. */}
        <div className="flex max-w-sm flex-col items-center gap-4 phase-live:hidden phase-after:hidden lg:items-start">
          <p className="font-display text-xl text-primary-foreground sm:text-2xl">
            {chrome?.newsletterTitle}
          </p>
          <p className="text-center font-body text-sm text-primary-foreground/90 lg:text-left">
            {chrome?.newsletterBody}
          </p>
          <a href="#newsletter" className={BUTTON_CLASS}>
            Subscribe for Updates
          </a>
        </div>
        <div className="hidden max-w-sm flex-col items-center gap-4 phase-after:flex lg:items-start">
          <p className="font-display text-xl text-primary-foreground sm:text-2xl">
            Festival paintings are on sale
          </p>
          <p className="text-center font-body text-sm text-primary-foreground/90 lg:text-left">
            Original works painted during the festival are available to buy online through October 4.
          </p>
          <a
            href={ONLINE_SALE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={BUTTON_CLASS}
          >
            Shop the Online Sale
          </a>
        </div>
        <div className="hidden max-w-sm flex-col items-center gap-4 phase-live:flex lg:items-start">
          <p className="font-display text-xl text-primary-foreground sm:text-2xl">{copy.liveCtaTitle}</p>
          <p className="text-center font-body text-sm text-primary-foreground/90 lg:text-left">
            {copy.liveCtaBody}
          </p>
          <Link href={scheduleHref} className={BUTTON_CLASS}>
            {copy.liveCtaButton}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CountdownBanner;
