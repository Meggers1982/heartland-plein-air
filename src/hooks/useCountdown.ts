'use client';
import { useEffect, useState } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

/**
 * Countdown to `target` (epoch ms). Returns `null` until the component has
 * mounted on the client.
 *
 * Why null first: every page here is statically prerendered, so a time value
 * computed during render is baked into the HTML at BUILD time — potentially
 * days stale — and cannot match what the client computes on hydration. React
 * treats that as a text mismatch (error #418), throws, and re-renders the
 * subtree. Deferring the first value to an effect keeps the server and client
 * markup identical. Callers render a width-reserving placeholder for the one
 * frame before the first tick.
 */
export function useCountdown(target: number): TimeLeft | null {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(target));
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

/** True only once the countdown has mounted AND reached zero. */
export function isExpired(t: TimeLeft | null): boolean {
  return t !== null && t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0;
}
