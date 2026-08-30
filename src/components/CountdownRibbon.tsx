'use client';
import { useCountdown, isExpired } from "@/hooks/useCountdown";
import { festivalStartTimestamp, formatFestivalLine } from "@/lib/festivalDate";
import { useFestivalInfo, useSiteChrome } from "@/components/SiteContext";

const FALLBACK_START = festivalStartTimestamp("2026-09-13");

const CountdownRibbon = () => {
  // null until mounted — see the hook for why the first value can't be
  // computed during render on these statically prerendered pages.
  const festival = useFestivalInfo();
  const chrome = useSiteChrome();
  // Falls back to the shipped dates if the document is ever missing, so the
  // countdown keeps running rather than the component throwing.
  const startsAt = festival ? festivalStartTimestamp(festival.startDate) : FALLBACK_START;
  const t = useCountdown(startsAt);

  // Only hide once the countdown has actually mounted and run out. Checking
  // Date.now() during render would reintroduce the hydration mismatch this
  // hook exists to prevent.
  if (isExpired(t)) return null;

  const units: Array<[string, number]> = [
    ["Days", t?.days ?? 0],
    ["Hrs", t?.hours ?? 0],
    ["Min", t?.minutes ?? 0],
    ["Sec", t?.seconds ?? 0],
  ];

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2">
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/90 sm:hidden">
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
        <p className="hidden font-display text-sm italic text-primary-foreground md:block">
          {festival && formatFestivalLine(festival.startDate, festival.endDate, festival.location, "short")}
        </p>
      </div>
    </div>
  );
};

export default CountdownRibbon;