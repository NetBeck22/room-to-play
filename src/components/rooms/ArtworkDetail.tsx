import { useEffect } from "react";
import type { Artwork } from "./data";
import { Arrow, FrameSketch, Underline } from "./Doodles";

/** A page from the art book. The work steps forward, the room stays behind. */
export function ArtworkDetail({
  work,
  onClose,
  onMeet,
}: {
  work: Artwork;
  onClose: () => void;
  onMeet: () => void;
}) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-paper paper-grain detail-enter">
      <button
        type="button"
        onClick={onClose}
        data-cursor="close"
        className="fixed right-5 top-5 z-50 font-mono text-[10px] tracking-[0.24em] text-ink md:right-10 md:top-9"
      >
        ✕ BACK TO THE ROOM
      </button>

      <div className="relative mx-auto min-h-screen w-full max-w-[1500px] px-6 pb-28 pt-24 md:px-14">
        <div className="font-mono text-[10px] leading-[1.8] tracking-[0.24em] text-clay-dark">
          {work.room} / WALL A
          <br />
          {work.artist}
        </div>

        <div className="relative mt-6 md:mt-2">
          <h2 className="pointer-events-none relative z-20 font-display text-[16vw] leading-[0.8] tracking-[-0.04em] text-ink md:text-[13vw]">
            <span className="block">{work.titleLines[0]}</span>
            <span className="block pl-[18vw] md:pl-[26vw]">{work.titleLines[1]}</span>
          </h2>

          {/* the work crossing behind the letters */}
          <div className="relative z-10 -mt-[8vw] ml-[6vw] h-[58vh] w-[62vw] max-w-[720px] md:-mt-[7vw] md:ml-[10vw]">
            <span aria-hidden className="absolute inset-0 translate-x-4 translate-y-5 bg-clay/40" />
            <div className="relative h-full w-full bg-sand/40">
              <FrameSketch className="absolute inset-0 h-full w-full text-ink" preserveAspectRatio="none" />
              <div className="absolute inset-[7%] flex flex-col justify-between p-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-clay-dark">
                  IMAGE PENDING — RIGHTS NOT CLEARED
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(58deg, transparent 0 9px, rgba(23,23,21,.08) 9px 10px)",
                  }}
                />
                <a
                  href={work.reference}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="look"
                  className="relative z-10 font-mono text-[10px] tracking-[0.2em] text-ink underline decoration-clay underline-offset-4"
                >
                  SEE THE ORIGINAL LISTING ↗
                </a>
              </div>
            </div>
            <span className="absolute -right-6 top-[-2.5rem] rotate-[6deg] font-hand text-[20px] text-ink md:-right-24">
              {work.note}
            </span>
          </div>
        </div>

        {/* information, scattered around the edges */}
        <div className="pointer-events-none absolute right-6 top-[38vh] hidden w-[190px] font-mono text-[10px] leading-[2] tracking-[0.2em] text-ink md:block">
          {work.year}
          <br />
          {work.size}
          <br />
          {work.medium}
          <br />
          <span className="text-clay-dark">UNIQUE WORK</span>
        </div>

        <div className="mt-14 flex flex-wrap items-end gap-10 md:mt-6 md:pl-[10vw]">
          <div className="max-w-[360px] font-serif text-[22px] leading-[1.35] italic text-ink">
            A work that refuses to sit quietly on a wall — it rearranges everything standing near it.
          </div>
          <div className="font-mono text-[10px] leading-[2] tracking-[0.2em] text-clay-dark md:hidden">
            {work.year} / {work.size} / {work.medium}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-8 md:pl-[10vw]">
          <button type="button" onClick={onMeet} data-cursor="meet" className="group relative">
            <span className="font-display text-[clamp(28px,5vw,54px)] leading-none tracking-[-0.03em] text-ink">
              MEET THE ARTIST
            </span>
            <Underline
              aria-hidden
              className="absolute -bottom-2 left-0 h-3 w-full text-ink opacity-0 transition-opacity group-hover:opacity-100"
            />
          </button>
          <a
            href={`mailto:hello@rooms.gallery?subject=${encodeURIComponent(`${work.artist} — ${work.title}`)}`}
            data-cursor="look"
            className="group relative self-end pb-2"
          >
            <span className="font-display text-[clamp(20px,3vw,34px)] leading-none tracking-[-0.02em] text-clay-dark transition-colors group-hover:text-ink">
              ENQUIRE
            </span>
            <Arrow aria-hidden className="absolute -right-14 bottom-2 h-4 w-12 text-ink" />
          </a>
        </div>
      </div>
    </div>
  );
}
