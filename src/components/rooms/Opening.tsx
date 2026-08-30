import { useEffect, useState } from "react";
import { CurvedArrow, Door, FloorPlan } from "./Doodles";

/** The almost-empty first page of the book. A plan, a door, an invitation. */
export function Opening({ onEnter }: { onEnter: () => void }) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 2400),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onEnter, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-paper paper-grain ${leaving ? "opening-leave" : ""}`}
    >
      <div className="absolute left-6 top-6 font-mono text-[10px] leading-[1.9] tracking-[0.24em] text-ink md:left-12 md:top-12">
        ROOMS.
        <br />
        LEUVEN
        <br />
        BELGIUM
        <br />
        2026
      </div>
      <div className="absolute right-6 top-6 text-right font-serif text-[15px] italic text-clay-dark md:right-12 md:top-12">
        art becomes a place.
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div
          className={`w-[min(560px,84vw)] text-ink transition-all duration-[1400ms] ease-out ${
            step >= 1 ? "opacity-100 blur-0" : "translate-y-3 opacity-0 blur-[2px]"
          }`}
        >
          <FloorPlan className="h-auto w-full" active="room-01" />
        </div>

        <div
          className={`relative mt-10 flex items-end gap-6 transition-all duration-1000 ${
            step >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={enter}
            data-cursor="enter"
            className="group relative flex items-end gap-4 text-ink"
          >
            <Door className="h-[110px] w-auto transition-transform duration-700 group-hover:-rotate-[7deg] group-hover:origin-left" />
            <span className="pb-3 text-left">
              <span className="block font-display text-[clamp(30px,6vw,64px)] leading-[0.85] tracking-[-0.04em]">
                COME IN.
              </span>
              <span className="mt-2 block font-mono text-[10px] tracking-[0.26em] text-clay-dark">
                CLICK TO ENTER — ROOM 01
              </span>
            </span>
          </button>
          <span
            className={`absolute -left-[150px] bottom-2 hidden font-hand text-[20px] text-ink transition-opacity duration-700 md:block ${
              step >= 3 ? "opacity-100" : "opacity-0"
            }`}
          >
            you can come in
            <CurvedArrow className="ml-8 mt-1 h-14 w-20 -scale-x-100 text-ink" />
          </span>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.3em] text-clay-dark">
        CONTEMPORARY ART / LEUVEN
      </div>
    </div>
  );
}
