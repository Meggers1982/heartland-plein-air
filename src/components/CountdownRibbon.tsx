import { useEffect, useState } from "react";

const TARGET = new Date("2026-09-13T00:00:00").getTime();

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const CountdownRibbon = () => {
  const [t, setT] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (TARGET - Date.now() <= 0) return null;

  const units: Array<[string, number]> = [
    ["Days", t.days],
    ["Hrs", t.hours],
    ["Min", t.minutes],
    ["Sec", t.seconds],
  ];

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2">
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="hidden font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-foreground/70 sm:inline">
            Brushes Out In
          </span>
          <div className="flex items-baseline gap-2 sm:gap-3">
            {units.map(([label, value], i) => (
              <div key={label} className="flex items-baseline gap-2 sm:gap-3">
                <span className="flex items-baseline gap-1">
                  <span className="font-display text-lg font-bold tabular-nums leading-none sm:text-xl">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
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
        <p className="hidden font-display text-sm italic text-primary-foreground/90 md:block">
          Sept 13–19, 2026 · Douglas &amp; Sarpy County
        </p>
      </div>
    </div>
  );
};

export default CountdownRibbon;