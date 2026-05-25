import { useEffect, useRef, useState } from "react";

type WeekDay = { id: string; weekday: string; date?: string; label?: string };

const ScheduleJumpNav = ({ items }: { items: WeekDay[] }) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Reset selected tab when the items list changes (e.g. after event filter changes)
  useEffect(() => {
    if (items.length > 0 && !items.find((item) => item.id === activeId)) {
      setActiveId(items[0].id);
    }
  }, [items]);

  // Keep the active tab in sync with scroll position
  useEffect(() => {
    const OFFSET = 160; // accounts for fixed nav + buffer
    const handleScroll = () => {
      let currentId = items[0]?.id ?? "";
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= OFFSET) currentId = id;
      }
      setActiveId(currentId);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToDay = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  const activate = (item: WeekDay) => {
    setActiveId(item.id);
    tabRefs.current.get(item.id)?.focus();
    scrollToDay(item.id);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: WeekDay) => {
    e.preventDefault();
    activate(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const count = items.length;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        activate(items[(index + 1) % count]);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        activate(items[(index - 1 + count) % count]);
        break;
      case "Home":
        e.preventDefault();
        activate(items[0]);
        break;
      case "End":
        e.preventDefault();
        activate(items[count - 1]);
        break;
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div
        role="tablist"
        aria-label="Jump to day"
        className="flex gap-2 overflow-x-auto pb-1 md:grid md:grid-cols-9 md:gap-3 md:overflow-visible md:pb-0"
      >
        {items.map((item, index) => {
          const isSelected = item.id === activeId;
          return (
            <a
              key={item.id}
              ref={(el) => {
                if (el) tabRefs.current.set(item.id, el);
                else tabRefs.current.delete(item.id);
              }}
              href={`#${item.id}`}
              role="tab"
              aria-selected={isSelected}
              aria-controls={item.id}
              tabIndex={isSelected ? 0 : -1}
              onClick={(e) => handleClick(e, item)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`group flex flex-none w-[60px] md:w-auto aspect-square flex-col items-center justify-center rounded-md border text-center transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md ${
                isSelected
                  ? "-translate-y-0.5 border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-card hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              <span
                className={`font-body text-[10px] font-semibold uppercase tracking-widest sm:text-xs ${
                  isSelected
                    ? "text-primary-foreground/80"
                    : "text-foreground/60 group-hover:text-primary-foreground/80"
                }`}
              >
                {item.weekday}
              </span>
              {item.date ? (
                <span
                  className={`font-display text-2xl font-bold leading-none sm:text-3xl ${
                    isSelected
                      ? "text-primary-foreground"
                      : "text-foreground group-hover:text-primary-foreground"
                  }`}
                >
                  {item.date}
                </span>
              ) : (
                <span
                  className={`mt-1 font-display text-sm font-bold leading-tight ${
                    isSelected
                      ? "text-primary-foreground"
                      : "text-foreground group-hover:text-primary-foreground"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleJumpNav;
