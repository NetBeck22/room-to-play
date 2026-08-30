import { useRef, useState, type ReactNode } from "react";

/** A drawn object you can nudge around. Slightly springy, never far. */
export function Draggable({
  children,
  className = "",
  range = 90,
  style,
  cursor = "move",
}: {
  children: ReactNode;
  className?: string;
  range?: number;
  style?: React.CSSProperties;
  cursor?: string;
}) {
  const [off, setOff] = useState({ x: 0, y: 0 });
  const start = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const clamp = (v: number) => Math.max(-range, Math.min(range, v));

  return (
    <div
      data-cursor={cursor}
      className={`touch-none select-none ${className}`}
      style={{
        ...style,
        transform: `${style?.transform ?? ""} translate3d(${off.x}px, ${off.y}px, 0)`,
        transition: start.current ? "none" : "transform .6s cubic-bezier(.22,1,.36,1)",
      }}
      onPointerDown={(e) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        start.current = { x: e.clientX, y: e.clientY, ox: off.x, oy: off.y };
      }}
      onPointerMove={(e) => {
        const s = start.current;
        if (!s) return;
        setOff({ x: clamp(s.ox + e.clientX - s.x), y: clamp(s.oy + e.clientY - s.y) });
      }}
      onPointerUp={() => {
        start.current = null;
      }}
      onPointerCancel={() => {
        start.current = null;
      }}
    >
      {children}
    </div>
  );
}
