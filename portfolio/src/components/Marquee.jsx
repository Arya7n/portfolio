const Marquee = ({ items, className = "", speed = 28 }) => {
  const track = [...items, ...items, ...items];

  return (
    <div
      className={`relative overflow-hidden border-y border-ink/10 bg-paper-soft/60 ${className}`}
      aria-hidden
    >
      <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[#E8E8E3] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[#E8E8E3] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max">
        <div
          className="marquee-track flex shrink-0 items-center gap-10 py-4 md:py-5 pr-10"
          style={{ animationDuration: `${speed}s` }}
        >
          {track.map((item, i) => (
            <span
              key={`a-${item}-${i}`}
              className="flex items-center gap-10 text-sm md:text-base font-medium tracking-tight text-ink-muted whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent/70 shrink-0" />
              {item}
            </span>
          ))}
        </div>
        <div
          className="marquee-track flex shrink-0 items-center gap-10 py-4 md:py-5 pr-10"
          style={{ animationDuration: `${speed}s` }}
          aria-hidden
        >
          {track.map((item, i) => (
            <span
              key={`b-${item}-${i}`}
              className="flex items-center gap-10 text-sm md:text-base font-medium tracking-tight text-ink-muted whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent/70 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
