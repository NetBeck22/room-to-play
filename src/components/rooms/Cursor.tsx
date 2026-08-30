import { useEffect, useRef, useState } from "react";

const LABELS: Record<string, string> = {
  look: "LOOK",
  enter: "ENTER →",
  next: "NEXT →",
  meet: "MEET →",
  drag: "← DRAG →",
  close: "CLOSE ✕",
  move: "MOVE IT",
};

/** Imperfect ink cursor. Desktop / fine-pointer only. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setOn(true);
    document.documentElement.classList.add("has-ink-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      const key = el?.dataset.cursor ?? "";
      setLabel(LABELS[key] ?? null);
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
      if (ref.current) ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-ink-cursor");
    };
  }, []);

  if (!on) return null;

  return (
    <div ref={ref} className="ink-cursor" aria-hidden>
      <div className={`ink-cursor__inner ${label ? "is-labelled" : ""}`}>
        {label ? (
          <span className="ink-cursor__label">{label}</span>
        ) : (
          <svg viewBox="0 0 30 30" className="h-[26px] w-[26px] text-ink">
            <path
              d="M15 3C8 3 3 7 3 14s5 13 12 13 12-5 12-12S22 3 15 3Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              filter="url(#rms-rough)"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
