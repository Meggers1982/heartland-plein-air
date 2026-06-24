'use client';
type WeekDay = { id: string; weekday: string; date?: string; label?: string };

const ScheduleJumpNav = ({ items }: { items: WeekDay[] }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid grid-cols-5 gap-2 sm:gap-3 md:grid-cols-9">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className="group flex aspect-square flex-col items-center justify-center rounded-md border border-border bg-card text-center transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:shadow-md"
          >
            <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-foreground/60 group-hover:text-primary-foreground/80 sm:text-xs">
              {item.weekday}
            </span>
            {item.date ? (
              <span className="font-display text-2xl font-bold leading-none text-foreground group-hover:text-primary-foreground sm:text-3xl">
                {item.date}
              </span>
            ) : (
              <span className="mt-1 font-display text-sm font-bold leading-tight text-foreground group-hover:text-primary-foreground">
                {item.label}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ScheduleJumpNav;
