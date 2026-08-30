import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Chapter II moves sideways. Drag, wheel or arrow keys — with inertia,
 * never a scrollbar.
 */
export function Chapter({ children }: { children: ReactNode }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const target = useRef(0);
  const drag = useRef<{ x: number; base: number } | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const max = () =>
      Math.max(0, (track.current?.scrollWidth ?? 0) - (viewport.current?.clientWidth ?? 0));

    const loop = () => {
      target.current = Math.max(-max(), Math.min(0, target.current));
      x.current += (target.current - x.current) * 0.09;
      if (track.current) track.current.style.transform = `translate3d(${x.current}px,0,0)`;
      const m = max();
      setProgress(m ? Math.min(1, -x.current / m) : 0);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const el = viewport.current;
    const onWheel = (e: WheelEvent) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
      if (!dx) return;
      e.preventDefault();
      target.current -= dx;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") target.current -= 420;
      if (e.key === "ArrowLeft") target.current += 420;
    };
    el?.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      el?.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={viewport}
      data-cursor="drag"
      className="relative h-[100svh] w-full cursor-grab touch-pan-y overflow-hidden bg-paper paper-grain"
      onPointerDown={(e) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        drag.current = { x: e.clientX, base: target.current };
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        target.current = drag.current.base + (e.clientX - drag.current.x) * 1.6;
      }}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
    >
      <div ref={track} className="flex h-full w-max items-stretch will-change-transform">
        {children}
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4">
        <span className="font-mono text-[10px] tracking-[0.28em] text-clay-dark">← DRAG →</span>
        <span className="relative block h-px w-[26vw] bg-clay">
          <span
            className="absolute -top-[3px] block h-[7px] w-[7px] rounded-full bg-ink transition-none"
            style={{ left: `${progress * 100}%` }}
          />
        </span>
      </div>
    </div>
  );
}

export function Panel({
  children,
  width = "100vw",
  className = "",
}: {
  children: ReactNode;
  width?: string;
  className?: string;
}) {
  return (
    <section
      className={`relative h-full shrink-0 border-r border-clay/60 ${className}`}
      style={{ width }}
    >
      {children}
    </section>
  );
}
