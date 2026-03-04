import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

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
    <section className="bg-primary py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary-foreground" />
          <p className="font-display text-lg font-semibold text-primary-foreground">
            September 13–19, 2026
          </p>
        </div>
        <div className="flex gap-6">
          {units.map((u) => (
            <div key={u.label} className="flex flex-col items-center">
              <span className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                {String(u.value).padStart(2, "0")}
              </span>
              <span className="font-body text-xs uppercase tracking-widest text-primary-foreground/70">
                {u.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownBanner;
