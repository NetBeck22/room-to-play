import type { Artwork } from "./data";
import { ArtworkPiece } from "./ArtworkPiece";
import { Draggable } from "./Draggable";
import { Arrow, Chair, Figure, MeasureLine, Mouse, Plant, Star } from "./Doodles";

/** An illustrated gallery interior. Drawn architecture, real works. */
export function Room({
  number,
  title,
  works,
  onOpen,
  accent = false,
  hint,
}: {
  number: string;
  title: string;
  works: Artwork[];
  onOpen: (id: string) => void;
  accent?: boolean;
  hint: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-paper paper-grain">
      {/* drawn architecture */}
      <svg
        aria-hidden
        viewBox="0 0 1440 820"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-ink"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          filter="url(#rms-rough-soft)"
        >
          <path d="M0 118c360-9 1080-9 1440-2" />
          <path d="M0 128c380-7 1050-7 1440-1" strokeWidth="0.7" opacity="0.45" />
          <path d="M0 636c400-11 1040-11 1440-3" />
          <path d="M118 120v518M1322 122v514" strokeWidth="0.9" opacity="0.5" />
          <path d="M0 700c320 22 1120 22 1440 4" strokeWidth="0.7" opacity="0.35" />
        </g>
      </svg>
      {accent ? (
        <div
          aria-hidden
          className="absolute left-1/2 top-[118px] h-[520px] w-[42vw] -translate-x-1/2 bg-accent/25 mix-blend-multiply"
          style={{ clipPath: "polygon(6% 0, 100% 3%, 94% 100%, 0 96%)" }}
        />
      ) : null}

      {/* room label + technical notes */}
      <div className="absolute left-6 top-6 font-mono text-[10px] leading-[1.7] tracking-[0.22em] text-clay-dark md:left-12 md:top-10">
        {number}
        <br />
        LEUVEN / BELGIUM
        <br />
        {title}
      </div>
      <div className="absolute right-6 top-6 text-right font-mono text-[10px] leading-[1.7] tracking-[0.22em] text-clay-dark md:right-12 md:top-10">
        {works.length} WORKS
        <br />
        DAYLIGHT, NORTH
      </div>

      <MeasureLine
        aria-hidden
        label="8400 MM"
        className="absolute left-[8%] top-[13.5%] hidden w-[36%] text-clay-dark md:block"
      />

      {/* the works */}
      <div className="absolute inset-0">
        {works[0] ? (
          <ArtworkPiece
            work={works[0]}
            onOpen={onOpen}
            tilt={-0.7}
            className="left-[9%] top-[24%] h-[38vh] w-[19vw] min-w-[150px]"
          />
        ) : null}
        {works[1] ? (
          <ArtworkPiece
            work={works[1]}
            onOpen={onOpen}
            tilt={0.6}
            className="left-[38%] top-[18%] h-[46vh] w-[23vw] min-w-[170px]"
          />
        ) : null}
        {works[2] ? (
          <ArtworkPiece
            work={works[2]}
            onOpen={onOpen}
            tilt={-1.2}
            className="left-[70%] top-[27%] h-[33vh] w-[17vw] min-w-[140px]"
          />
        ) : null}
      </div>

      {/* furniture you can nudge */}
      <Draggable className="absolute bottom-[10%] left-[26%] w-[10vw] min-w-[90px] text-ink" range={70}>
        <Chair className="h-auto w-full" />
        <span className="mt-1 block font-hand text-[16px] text-clay-dark">yes, you can touch it.</span>
      </Draggable>

      <Plant aria-hidden className="absolute bottom-[8%] right-[7%] h-[28vh] w-auto text-ink" />

      <Figure
        aria-hidden
        className="absolute bottom-[12%] left-[6%] h-[18vh] w-auto text-ink walker"
      />

      <Star aria-hidden className="absolute left-[62%] top-[16%] h-6 w-6 text-ink opacity-70" />
      <Mouse aria-hidden className="absolute bottom-[3%] left-[52%] h-4 w-auto text-clay-dark opacity-70" />

      <div className="absolute bottom-[14%] right-[24%] hidden max-w-[190px] font-hand text-[19px] leading-tight text-ink md:block">
        {hint}
        <Arrow aria-hidden className="mt-1 h-4 w-24 rotate-[8deg] text-ink" />
      </div>
    </div>
  );
}
