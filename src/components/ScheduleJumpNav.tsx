type JumpItem = { id: string; short: string };

const ScheduleJumpNav = ({ items }: { items: JumpItem[] }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="flex-shrink-0 rounded-full border border-border bg-card px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-wider text-foreground/80 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              {item.short}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleJumpNav;