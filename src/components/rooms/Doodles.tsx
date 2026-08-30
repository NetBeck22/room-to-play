/**
 * Hand-drawn SVG vocabulary for ROOMS.
 * Every line is drawn by hand-authored paths and roughened with a shared
 * turbulence filter so nothing looks vector-perfect.
 */
import type { SVGProps } from "react";

export function RoughDefs() {
  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
      <defs>
        <filter id="rms-rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves={3} seed={7} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="rms-rough-soft">
          <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves={2} seed={19} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

const pen = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  filter: "url(#rms-rough)",
} as const;

type P = SVGProps<SVGSVGElement>;

export function Arrow(props: P) {
  return (
    <svg viewBox="0 0 120 34" {...props}>
      <g {...pen}>
        <path d="M4 18c22-4 46-6 108-5" />
        <path d="M96 6c6 5 11 8 16 7" />
        <path d="M97 27c6-5 10-8 15-8" />
      </g>
    </svg>
  );
}

export function CurvedArrow(props: P) {
  return (
    <svg viewBox="0 0 130 90" {...props}>
      <g {...pen}>
        <path d="M6 8c34 6 62 26 78 62" />
        <path d="M72 62c6 6 11 9 13 12" />
        <path d="M92 56c-4 8-6 14-7 18" />
      </g>
    </svg>
  );
}

export function Circle(props: P) {
  return (
    <svg viewBox="0 0 200 130" {...props}>
      <g {...pen}>
        <path d="M100 6C48 6 8 32 7 66c-1 34 42 58 95 58 50 0 91-24 92-57C195 33 152 7 100 6Z" />
      </g>
    </svg>
  );
}

export function Underline(props: P) {
  return (
    <svg viewBox="0 0 200 14" {...props}>
      <g {...pen}>
        <path d="M3 9c46-5 96-7 194-6" />
        <path d="M12 13c40-4 84-5 168-5" strokeWidth={0.9} opacity={0.55} />
      </g>
    </svg>
  );
}

export function Star(props: P) {
  return (
    <svg viewBox="0 0 40 40" {...props}>
      <g {...pen}>
        <path d="M20 4v32M6 20h28M9 9l22 22M31 9 9 31" />
      </g>
    </svg>
  );
}

export function Door(props: P) {
  return (
    <svg viewBox="0 0 90 150" {...props}>
      <g {...pen}>
        <path d="M8 146V10c0-3 2-5 5-5l62 3c3 0 4 2 4 4l-2 133Z" />
        <path d="M16 138V16l55 2-1 121Z" strokeWidth={0.9} opacity={0.6} />
        <circle cx="62" cy="80" r="3.4" />
        <path d="M2 148h86" />
      </g>
    </svg>
  );
}

export function Chair(props: P) {
  return (
    <svg viewBox="0 0 140 130" {...props}>
      <g {...pen}>
        <path d="M22 74c20-6 62-8 96-3" />
        <path d="M24 74c-3 18-5 32-6 48M116 71c2 18 4 32 5 49" />
        <path d="M34 72c-1-24-2-42-1-58 0-4 2-6 6-6l50 3c4 0 5 2 5 6-1 16-1 32 1 52" />
        <path d="M40 22c16-1 34 0 50 2" strokeWidth={0.9} opacity={0.55} />
        <path d="M28 96c30-5 60-5 88-1" strokeWidth={0.9} opacity={0.45} />
      </g>
    </svg>
  );
}

export function Plant(props: P) {
  return (
    <svg viewBox="0 0 120 190" {...props}>
      <g {...pen}>
        <path d="M34 128h54l-7 56c0 3-2 5-5 5H45c-3 0-4-2-5-5Z" />
        <path d="M30 122h62" />
        <path d="M60 128c-2-32 0-58 4-78" />
        <path d="M64 76c-16-6-26-20-27-38 18 2 28 14 30 32" />
        <path d="M66 92c14-10 20-26 17-44-16 8-22 22-20 40" />
        <path d="M60 110c-14-2-24-10-28-22 15-2 25 6 30 18" />
      </g>
    </svg>
  );
}

export function Figure(props: P) {
  return (
    <svg viewBox="0 0 60 140" {...props}>
      <g {...pen}>
        <circle cx="30" cy="16" r="11" />
        <path d="M30 27v52" />
        <path d="M30 38 12 58M30 38l19 17" />
        <path d="m30 79-13 56M30 79l14 55" />
      </g>
    </svg>
  );
}

export function Mouse(props: P) {
  return (
    <svg viewBox="0 0 70 40" {...props}>
      <g {...pen}>
        <path d="M8 32c-4-12 6-22 20-22 12 0 18 6 22 14 8 2 12 4 14 8Z" />
        <circle cx="24" cy="18" r="4.5" />
        <circle cx="17" cy="24" r="1.2" fill="currentColor" />
        <path d="M8 32c-5 3-6 6-4 6" />
      </g>
    </svg>
  );
}

export function MeasureLine({ label, ...props }: P & { label?: string }) {
  return (
    <svg viewBox="0 0 240 26" {...props}>
      <g {...pen}>
        <path d="M6 4v18M234 4v18M8 13h224" />
      </g>
      {label ? (
        <text
          x="120"
          y="9"
          textAnchor="middle"
          fill="currentColor"
          style={{ font: "500 8px var(--font-mono)", letterSpacing: "0.14em" }}
        >
          {label}
        </text>
      ) : null}
    </svg>
  );
}

export function FrameSketch(props: P) {
  return (
    <svg viewBox="0 0 200 260" preserveAspectRatio="none" {...props}>
      <g {...pen}>
        <path d="M6 8c62-3 128-3 189 1 3 42 3 200 0 244-63 3-127 3-189 0C3 208 3 52 6 8Z" />
        <path d="M14 17c58-2 118-2 173 1 2 38 2 186 0 226-58 2-116 2-173 0-2-40-2-189 0-227Z" strokeWidth={0.8} opacity={0.5} />
      </g>
    </svg>
  );
}

/** Hand-drawn architectural floor plan used as the site's navigation. */
export function FloorPlan({
  active,
  onPick,
  ...props
}: P & { active?: string; onPick?: (id: string) => void }) {
  const rooms: { id: string; label: string; x: number; y: number; w: number; h: number }[] = [
    { id: "room-01", label: "ROOM 01", x: 20, y: 120, w: 150, h: 110 },
    { id: "hall", label: "HALL", x: 175, y: 120, w: 110, h: 110 },
    { id: "room-02", label: "ROOM 02", x: 175, y: 14, w: 110, h: 100 },
    { id: "room-03", label: "ROOM 03", x: 290, y: 120, w: 130, h: 110 },
    { id: "artist", label: "ARTIST", x: 175, y: 236, w: 110, h: 76 },
  ];
  return (
    <svg viewBox="0 0 440 330" {...props}>
      <g {...pen}>
        {rooms.map((r) => (
          <g
            key={r.id}
            onClick={() => onPick?.(r.id)}
            data-cursor="enter"
            style={{ cursor: "none" }}
            opacity={active && active !== r.id ? 0.55 : 1}
          >
            <path
              d={`M${r.x} ${r.y}c${r.w * 0.4} -2 ${r.w * 0.7} -2 ${r.w} 1c2 ${r.h * 0.4} 2 ${r.h * 0.75} -1 ${r.h}c-${r.w * 0.5} 2 -${r.w * 0.8} 2 -${r.w} 0c-2 -${r.h * 0.5} -2 -${r.h * 0.7} 1 -${r.h + 1}Z`}
            />
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="transparent" stroke="none" />
            <text
              x={r.x + r.w / 2}
              y={r.y + r.h / 2 + 3}
              textAnchor="middle"
              fill="currentColor"
              stroke="none"
              style={{ font: "500 9px var(--font-mono)", letterSpacing: "0.18em" }}
            >
              {r.label}
            </text>
          </g>
        ))}
        {/* doorways */}
        <path d="M172 160h6M172 190h6M286 165h6M228 112v10M228 232v8" strokeWidth={2.6} />
      </g>
    </svg>
  );
}
