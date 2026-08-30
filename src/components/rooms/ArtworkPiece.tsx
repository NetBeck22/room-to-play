import { useRef, useState } from "react";
import type { Artwork } from "./data";
import { Circle, FrameSketch } from "./Doodles";

/**
 * A work hanging on an illustrated wall.
 * Approaching it moves its drawn shadow, circles it in pen and writes a note.
 */
export function ArtworkPiece({
  work,
  onOpen,
  className = "",
  tilt = 0,
}: {
  work: Artwork;
  onOpen: (id: string) => void;
  className?: string;
  tilt?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [near, setNear] = useState(false);
  const [lean, setLean] = useState({ x: 0, y: 0 });

  return (
    <button
      ref={ref}
      type="button"
      data-cursor="look"
      aria-label={`${work.artist} — ${work.title}`}
      onClick={() => onOpen(work.id)}
      onPointerEnter={() => setNear(true)}
      onPointerLeave={() => {
        setNear(false);
        setLean({ x: 0, y: 0 });
      }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setLean({
          x: ((e.clientX - r.left) / r.width - 0.5) * 12,
          y: ((e.clientY - r.top) / r.height - 0.5) * 10,
        });
      }}
      className={`group absolute block text-ink ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {/* drawn shadow, drifts with the cursor */}
      <span
        aria-hidden
        className="absolute inset-0 bg-clay/45 transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${10 + lean.x}px, ${12 + lean.y}px)`,
          filter: "blur(1px)",
        }}
      />
      <span className="relative block h-full w-full bg-paper">
        <FrameSketch className="absolute inset-0 h-full w-full text-ink" />
        {/* clearly labelled placeholder — no invented artwork */}
        <span className="absolute inset-[9%] flex flex-col justify-between bg-sand/40 p-[6%] text-left">
          <span className="font-mono text-[8px] leading-[1.5] tracking-[0.18em] text-clay-dark">
            IMAGE
            <br />
            PENDING
          </span>
          <span className="block">
            <span className="block font-mono text-[9px] leading-[1.4] tracking-[0.16em] text-ink">
              {work.title}
            </span>
            <span className="block font-mono text-[8px] leading-[1.5] tracking-[0.16em] text-clay-dark">
              {work.artist}
              <br />
              {work.size}
            </span>
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(58deg, transparent 0 7px, rgba(23,23,21,.09) 7px 8px)",
            }}
          />
        </span>
      </span>

      <Circle
        aria-hidden
        className={`pointer-events-none absolute -inset-x-[9%] -inset-y-[7%] h-[114%] w-[118%] text-ink transition-opacity duration-300 ${
          near ? "opacity-90" : "opacity-0"
        }`}
        preserveAspectRatio="none"
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute -bottom-9 left-1 font-hand text-[19px] text-ink transition-all duration-300 ${
          near ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        look closer
      </span>
    </button>
  );
}
