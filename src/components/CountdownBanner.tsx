'use client';
import { useState, useEffect } from "react";

const TARGET = new Date("2026-09-13T00:00:00").getTime();

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = Math.max(0, TARGET - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
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
        {/* Countdown */}
        <div className="flex flex-col items-center gap-6 lg:items-start">
          <div className="flex flex-col items-center gap-2 lg:items-start">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/90">
              The brushes come out in
            </p>
            <div className="h-px w-12 bg-primary-foreground/40" />
          </div>

          <div className="flex items-end gap-2 sm:gap-4 md:gap-6">
            {units.map((u, i) => (
              <div key={u.label} className="flex items-end gap-2 sm:gap-4 md:gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-2 shadow-inner backdrop-blur-sm sm:px-5 sm:py-3">
                    <span
                      key={u.value}
                      className="block font-display text-4xl font-bold tabular-nums text-primary-foreground animate-in fade-in slide-in-from-top-1 duration-500 sm:text-5xl md:text-6xl"
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

          <p className="font-display text-base italic text-primary-foreground sm:text-lg">
            September 13–19, 2026 · Douglas &amp; Sarpy County, Nebraska
          </p>
        </div>

        {/* CTA */}
        <div className="flex max-w-sm flex-col items-center gap-4 lg:items-start">
          <p className="font-display text-xl text-primary-foreground sm:text-2xl">
            Don't miss a brushstroke.
          </p>
          <p className="text-center font-body text-sm text-primary-foreground/90 lg:text-left">
            Get festival updates, artist announcements, and event reminders delivered to your inbox.
          </p>
          <a
            href="#newsletter"
            className="inline-flex items-center justify-center rounded-md bg-primary-foreground px-6 py-3 font-body text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50"
          >
            Subscribe for Updates
          </a>
        </div>
      </div>
    </section>
  );
};

export default CountdownBanner;
