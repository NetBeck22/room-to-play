export type Artwork = {
  id: string;
  artist: string;
  title: string;
  titleLines: [string, string];
  year: string;
  size: string;
  medium: string;
  note: string;
  reference: string;
  room: "ROOM 01" | "ROOM 02";
};

/**
 * Real works from real artists. We do not have licensed image files, so every
 * work is shown as a clearly labelled placeholder with its source reference.
 */
export const artworks: Artwork[] = [
  {
    id: "selling-love",
    artist: "MALO MARCO",
    title: "SELLING LOVE",
    titleLines: ["SELLING", "LOVE"],
    year: "2026",
    size: "160 × 110 CM",
    medium: "OIL ON CANVAS",
    note: "this one changes the room.",
    reference: "https://www.catawiki.com/nl/l/106161992-malo-selling-love",
    room: "ROOM 01",
  },
  {
    id: "silent-symbols",
    artist: "CHEAMIL GHIUNAIDIN",
    title: "SILENT SYMBOLS NO. 5",
    titleLines: ["SILENT", "SYMBOLS"],
    year: "2026",
    size: "120 × 90 CM",
    medium: "MIXED MEDIA",
    note: "we like this one. don't ask why.",
    reference: "https://www.catawiki.com/nl/l/106058506-cheamil-ghiunaidin-silent-symbols-no-5",
    room: "ROOM 01",
  },
  {
    id: "two-boys-one-dog",
    artist: "VALEN",
    title: "TWO BOYS, ONE DOG",
    titleLines: ["TWO BOYS,", "ONE DOG"],
    year: "2026",
    size: "100 × 100 CM",
    medium: "ACRYLIC ON LINEN",
    note: "the dog is watching you.",
    reference: "https://www.catawiki.com/nl/l/106124297-valen-two-boys-one-dog",
    room: "ROOM 01",
  },
  {
    id: "mirada-siamesa",
    artist: "CAMILO",
    title: "MIRADA SIAMESA",
    titleLines: ["MIRADA", "SIAMESA"],
    year: "2026",
    size: "140 × 100 CM",
    medium: "OIL ON CANVAS",
    note: "two heads, one thought.",
    reference: "https://www.catawiki.com/nl/l/106172169-camilo-mirada-siamesa",
    room: "ROOM 02",
  },
  {
    id: "ojos-de-esmeralda",
    artist: "ERNEST",
    title: "OJOS DE ESMERALDA",
    titleLines: ["OJOS DE", "ESMERALDA"],
    year: "2026",
    size: "90 × 70 CM",
    medium: "OIL ON BOARD",
    note: "green, but quietly.",
    reference: "https://www.catawiki.com/nl/l/106225642-ernest-ojos-de-esmeralda",
    room: "ROOM 02",
  },
  {
    id: "light-through-the-door",
    artist: "GIULIA",
    title: "LIGHT THROUGH THE DOOR",
    titleLines: ["LIGHT", "THROUGH"],
    year: "2026",
    size: "150 × 120 CM",
    medium: "OIL ON CANVAS",
    note: "there's another room.",
    reference: "https://www.catawiki.com/nl/l/106304009-giulia-light-through-the-door",
    room: "ROOM 02",
  },
];

export const byId = (id: string) => artworks.find((a) => a.id === id);
