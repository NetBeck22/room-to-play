import { useEffect, useState } from "react";

export type Stop = { id: string; n: string; label: string };

/**
 * The itinerary. ROOMS. is one walk in six stops — this little map on the
 * left tells you where you are and lets you jump ahead.
 */
export function Journey({ stops, visible }: { stops: Stop[]; visible: boolean }) {
  const [active, setActive] = useState(stops[0]?.id ?? "");

  useEffect(() => {
    if (!visible) return;
    const els = stops
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const obs = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (seen) setActive(seen.target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -20% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [stops, visible]);

  if (!visible) return null;

  return (
    <nav
      aria-label="The route through ROOMS."
      className="fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 md:block"
    >
      <ul className="flex flex-col gap-3 border-l border-clay/70 pl-3">
        {stops.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <button
                type="button"
                data-cursor="next"
                onClick={() =>
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="group flex items-center gap-2 text-left"
              >
                <span
                  className={`block h-[7px] w-[7px] rounded-full transition-all duration-500 ${
                    on ? "scale-125 bg-rust" : "bg-clay group-hover:bg-clay-dark"
                  }`}
                />
                <span
                  className={`font-mono text-[9px] tracking-[0.22em] transition-colors duration-300 ${
                    on ? "text-ink" : "text-clay-dark"
                  }`}
                >
                  {s.n} {on ? s.label : ""}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** A hand-written line that carries you from one stop into the next. */
export function Passage({ from, to, note }: { from: string; to: string; note: string }) {
  return (
    <div className="relative flex w-full items-center gap-6 bg-paper-deep/60 px-6 py-10 md:px-14">
      <span className="font-mono text-[10px] tracking-[0.26em] text-clay-dark">{from}</span>
      <span className="h-px flex-1 bg-clay" />
      <span className="max-w-[280px] text-center font-hand text-[19px] leading-tight text-ink">
        {note}
      </span>
      <span className="h-px flex-1 bg-clay" />
      <span className="font-mono text-[10px] tracking-[0.26em] text-ink">{to}</span>
    </div>
  );
}
