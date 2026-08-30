import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { artworks, byId } from "../components/rooms/data";
import { Cursor } from "../components/rooms/Cursor";
import { Opening } from "../components/rooms/Opening";
import { Room } from "../components/rooms/Room";
import { ArtworkDetail } from "../components/rooms/ArtworkDetail";
import { Chapter, Panel } from "../components/rooms/Chapter";
import { Draggable } from "../components/rooms/Draggable";
import {
  Arrow,
  FloorPlan,
  FrameSketch,
  Mouse,
  RoughDefs,
  Star,
  Underline,
} from "../components/rooms/Doodles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ROOMS. — Contemporary Art, Leuven" },
      {
        name: "description",
        content:
          "ROOMS. is a contemporary art gallery in Leuven, drawn by hand. Come in, look around, and discover artists room by room.",
      },
      { property: "og:title", content: "ROOMS. — Art, but make it a place." },
      {
        property: "og:description",
        content:
          "An illustrated, interactive gallery from Leuven. Three rooms, six works, one door.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoomsExperience,
});

function RoomsExperience() {
  const [entered, setEntered] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const artistRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const roomOne = artworks.filter((a) => a.room === "ROOM 01");
  const roomTwo = artworks.filter((a) => a.room === "ROOM 02");

  useEffect(() => {
    document.body.style.overflow = entered && !open ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered, open]);

  const goArtist = useCallback(() => {
    setOpen(null);
    requestAnimationFrame(() =>
      artistRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }, []);

  const work = open ? byId(open) : undefined;

  return (
    <main className="relative bg-paper text-ink">
      <RoughDefs />
      <Cursor />
      {!entered && <Opening onEnter={() => setEntered(true)} />}

      {/* ——— ROOM 01 ——— */}
      <section className={`h-[100svh] w-full ${entered ? "room-enter" : "opacity-0"}`}>
        <Room
          number="ROOM 01"
          title="THE FIRST WALL"
          works={roomOne}
          onOpen={setOpen}
          hint="three works. one of them is looking back."
        />
      </section>

      {/* ——— A BREATH OF TYPOGRAPHY ——— */}
      <section className="relative flex min-h-[85svh] w-full flex-col justify-center overflow-hidden px-6 py-24 md:px-14">
        <div className="font-mono text-[10px] tracking-[0.28em] text-clay-dark">CHAPTER I — ii</div>
        <h2 className="mt-8 font-display text-[15vw] leading-[0.78] tracking-[-0.05em] text-ink">
          <span className="block">EVERY</span>
          <span className="block pl-[8vw] md:pl-[22vw]">WORK</span>
          <span className="block">CHANGES</span>
          <span className="ml-[26vw] block font-serif text-[9vw] italic tracking-[-0.02em]">
            the room.
          </span>
        </h2>
        <p className="mt-10 max-w-[380px] self-end font-mono text-[11px] leading-[2] tracking-[0.14em] text-clay-dark">
          ROOMS. FINDS ARTISTS, HANGS THEIR WORK, AND BUILDS A SPACE AROUND IT — IN RESTAURANTS,
          HOTELS, SHOPS, EMPTY APARTMENTS, AND ONE DAY A ROOM OF OUR OWN.
        </p>
        <div className="mt-16 flex items-center gap-5">
          <span className="font-hand text-[20px]">keep going, it moves sideways →</span>
          <Arrow aria-hidden className="h-4 w-28 text-ink" />
        </div>
        <span className="absolute right-[12%] top-[18%] hidden font-hand text-[18px] text-clay-dark md:block">
          don&apos;t look here
        </span>
        <Mouse aria-hidden className="absolute bottom-8 right-[8%] h-4 w-auto text-clay-dark" />
      </section>

      {/* ——— CHAPTER II — HORIZONTAL ——— */}
      <div className="relative">
        <div className="absolute left-6 top-6 z-20 font-mono text-[10px] tracking-[0.28em] text-clay-dark md:left-12">
          CHAPTER II — SIDEWAYS
        </div>
        <Chapter>
          <Panel>
            <Room
              number="ROOM 02"
              title="THE GREEN LIGHT"
              works={roomTwo}
              onOpen={setOpen}
              accent
              hint="the wall was white this morning."
            />
          </Panel>

          {/* ARTIST — a studio wall */}
          <Panel width="115vw" className="bg-paper">
            <div ref={artistRef} className="relative h-full w-full overflow-hidden px-6 py-20 md:px-14">
              <div className="font-mono text-[10px] leading-[1.9] tracking-[0.24em] text-clay-dark">
                ARTIST 01 / REPRESENTED BY ROOMS.
              </div>
              <h3 className="mt-4 font-display text-[13vw] leading-[0.78] tracking-[-0.05em]">
                MALO
                <br />
                <span className="pl-[10vw]">MARCO</span>
              </h3>
              <div className="mt-8 max-w-[320px] font-serif text-[19px] italic leading-[1.4]">
                Paints love like it&apos;s for sale, then refuses to name a price.
              </div>
              <div className="mt-6 max-w-[300px] font-mono text-[10px] leading-[2.1] tracking-[0.18em] text-clay-dark">
                B. 1997 — LIVES AND WORKS BETWEEN BRUSSELS AND LEUVEN.
                <br />
                OIL, HOUSE PAINT, THE OCCASIONAL DOOR.
                <br />
                <span className="text-ink">INSTAGRAM ↗ / WEBSITE ↗</span>
              </div>

              {[
                { t: "SELLING LOVE", s: "160 × 110", x: "58%", y: "12%", r: -3 },
                { t: "STUDY, NIGHT", s: "40 × 30", x: "74%", y: "38%", r: 4 },
                { t: "UNTITLED", s: "50 × 50", x: "62%", y: "62%", r: -6 },
              ].map((f) => (
                <Draggable
                  key={f.t}
                  className="absolute h-[22vh] w-[15vw] min-w-[130px]"
                  style={{ left: f.x, top: f.y, transform: `rotate(${f.r}deg)` }}
                  range={120}
                >
                  <div className="relative h-full w-full bg-sand/50">
                    <FrameSketch className="absolute inset-0 h-full w-full text-ink" preserveAspectRatio="none" />
                    <div className="absolute inset-[10%] flex flex-col justify-end font-mono text-[9px] leading-[1.6] tracking-[0.16em] text-clay-dark">
                      <span className="text-ink">{f.t}</span>
                      {f.s} CM
                      <br />
                      IMAGE PENDING
                    </div>
                  </div>
                </Draggable>
              ))}
              <span className="absolute bottom-16 left-[36%] hidden font-hand text-[19px] md:block">
                move them around, he won&apos;t mind
              </span>
              <Star aria-hidden className="absolute right-[8%] top-[10%] h-6 w-6 opacity-70" />
            </div>
          </Panel>

          {/* COLLECTION — a leaning archive */}
          <Panel width="120vw">
            <div className="relative h-full w-full overflow-hidden px-6 py-20 md:px-14">
              <h3 className="font-display text-[11vw] leading-[0.8] tracking-[-0.05em]">
                THE COLLECTION
              </h3>
              <div className="mt-3 font-mono text-[10px] tracking-[0.24em] text-clay-dark">
                06 WORKS AVAILABLE — ENQUIRE FOR PRICES
              </div>
              <div className="absolute bottom-[12%] left-0 right-0 h-[46vh] px-6 md:px-14">
                <svg
                  aria-hidden
                  viewBox="0 0 1200 40"
                  preserveAspectRatio="none"
                  className="absolute bottom-0 left-0 h-8 w-full text-ink"
                >
                  <path
                    d="M4 14c320 8 880 8 1192-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    filter="url(#rms-rough-soft)"
                  />
                </svg>
                {artworks.map((a, i) => (
                  <button
                    key={a.id}
                    type="button"
                    data-cursor="look"
                    onClick={() => setOpen(a.id)}
                    className="group absolute bottom-3 h-[38vh] w-[13vw] min-w-[120px] origin-bottom transition-transform duration-500 hover:-translate-y-3"
                    style={{
                      left: `${4 + i * 14.5}%`,
                      transform: `rotate(${i % 2 ? 2.4 : -2.1}deg)`,
                      zIndex: 10 + i,
                    }}
                  >
                    <div className="relative h-full w-full bg-sand/50">
                      <FrameSketch className="absolute inset-0 h-full w-full text-ink" preserveAspectRatio="none" />
                      <span className="absolute inset-[10%] block text-left font-mono text-[9px] leading-[1.6] tracking-[0.14em] text-clay-dark">
                        IMAGE PENDING
                      </span>
                    </div>
                    <span className="pointer-events-none absolute -top-14 left-0 w-[190px] text-left font-mono text-[9px] leading-[1.7] tracking-[0.16em] text-ink opacity-0 transition-opacity group-hover:opacity-100">
                      {a.artist}
                      <br />
                      {a.title}
                      <br />
                      <span className="text-clay-dark">ENQUIRE</span>
                    </span>
                  </button>
                ))}
              </div>
              <span className="absolute bottom-8 right-[10%] font-hand text-[19px]">
                some lean, some hide.
              </span>
            </div>
          </Panel>
        </Chapter>
      </div>

      {/* ——— THE MAP ——— */}
      <section ref={mapRef} className="relative w-full px-6 py-28 md:px-14">
        <div className="font-mono text-[10px] tracking-[0.28em] text-clay-dark">
          CHAPTER III — THE PLAN
        </div>
        <div className="mt-10 grid items-center gap-14 md:grid-cols-[1.1fr_.9fr]">
          <FloorPlan
            className="h-auto w-full text-ink"
            onPick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
          <div>
            <h3 className="font-display text-[9vw] leading-[0.82] tracking-[-0.04em] md:text-[5vw]">
              ROOMS.
              <br />
              LEUVEN
            </h3>
            <Underline aria-hidden className="mt-2 h-3 w-[240px] text-ink" />
            <p className="mt-8 max-w-[340px] font-serif text-[20px] italic leading-[1.4]">
              One day, this will be a real room.
            </p>
            <div className="mt-8 font-mono text-[10px] leading-[2.1] tracking-[0.18em] text-clay-dark">
              ARTISTS / WORKS / EXHIBITIONS / SPACES / ABOUT
              <br />
              <a
                href="mailto:hello@rooms.gallery"
                data-cursor="look"
                className="text-ink underline decoration-clay underline-offset-4"
              >
                HELLO@ROOMS.GALLERY
              </a>
            </div>
            <span className="mt-10 block font-hand text-[19px]">you missed something. go back.</span>
          </div>
        </div>
      </section>

      {work ? (
        <ArtworkDetail work={work} onClose={() => setOpen(null)} onMeet={goArtist} />
      ) : null}
    </main>
  );
}
