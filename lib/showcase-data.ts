// Fix Pack 19 — media showcase catalog, regrouped by REAL shoots after a
// frame-by-frame vision review of all 29 assets. Every project holds ONE
// shoot only: same location, same character, same client — shoots never
// mix. Story order: Create (the build itself) -> Passport (the character
// holds) -> the shoots and campaigns. Pure data (no JSX) so the in-app
// self-check can assert invariants: eleven projects, six video leads,
// every item under /showcase/, English alt texts, posters and thumbs
// everywhere, all 29 assets placed exactly once.
// Assets live in /public/showcase/{video,poster,img,thumb}.

export type ShowcaseCopy = { ru: string; en: string };

export type ShowcaseItem =
  | { kind: "video"; src: string; poster: string; alt: string }
  | { kind: "image"; full: string; thumb: string; alt: string };

export type ShowcaseProjectId =
  | "create"
  | "passport"
  | "cliff"
  | "collection"
  | "light"
  | "lipstick"
  | "neon"
  | "water"
  | "tennis"
  | "sneakers"
  | "splash";

export type ShowcaseProject = {
  id: ShowcaseProjectId;
  title: ShowcaseCopy;
  note: ShowcaseCopy;
  items: ShowcaseItem[];
};

const V = "/showcase/video";
const PO = "/showcase/poster";
const IM = "/showcase/img";
const TH = "/showcase/thumb";

const img = (name: string, alt: string): ShowcaseItem => ({
  kind: "image",
  full: `${IM}/${name}.jpg`,
  thumb: `${TH}/${name}.jpg`,
  alt,
});

const vid = (name: string, alt: string): ShowcaseItem => ({
  kind: "video",
  src: `${V}/${name}.mp4`,
  poster: `${PO}/${name}.jpg`,
  alt,
});

/** Before/after pair for the outfit spotlight — same cliff, two coats. */
export const SHOWCASE_BEFORE_AFTER = {
  before: `${IM}/outfit-cliff-black.jpg`,
  after: `${IM}/outfit-cliff-green.jpg`,
} as const;

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "create",
    title: {
      ru: "Создание персонажа · синий мейкап",
      en: "Character build · blue makeup",
    },
    note: {
      ru: "Одна съёмка: образ строится на видео, результат — комп-карта в четырёх ракурсах.",
      en: "One shoot: the look is built on video, the result is a four-angle comp card.",
    },
    items: [
      vid(
        "makeup-blue",
        "Character creation — avant-garde blue makeup built up on video",
      ),
      img("style-lashes", "The result: sculpted lashes, blue avant-garde look"),
      img("style-lashes-grid", "The finished character, four angles"),
    ],
  },
  {
    id: "passport",
    title: { ru: "Один персонаж · 4 ракурса", en: "One character · 4 angles" },
    note: {
      ru: "Одна студия, один персонаж — четыре ракурса. Лицо не «разваливается».",
      en: "One studio, one character — four angles. The face does not drift.",
    },
    items: [
      img("character-portrait", "Character portrait — afro, white top"),
      img("character-front", "Full length, front"),
      img("character-profile", "Profile"),
      img("character-back", "From the back — same character"),
    ],
  },
  {
    id: "cliff",
    title: { ru: "Outfit swap · скала", en: "Outfit swap · cliff" },
    note: {
      ru: "Одна локация — обрыв у моря. Меняется только гардероб: пальто в кадрах, одежда из флэт-лея — на видео.",
      en: "One location — a cliff over the sea. Only the wardrobe changes: coats in the stills, the flat-lay outfit in the loop.",
    },
    items: [
      vid(
        "outfit-rock",
        "Outfit swap — the flat-lay look lands on the model, studio to cliff",
      ),
      img("outfit-cliff-black", "Black coat on the cliff"),
      img("outfit-cliff-green", "Leopard coat — same cliff, same character"),
      img("outfit-cliff-floral", "Leopard coat, full look — same cliff"),
    ],
  },
  {
    id: "collection",
    title: {
      ru: "Студия → подиум",
      en: "Studio → runway",
    },
    note: {
      ru: "Одна коллекция: примерка в студии — и тот же образ на подиуме.",
      en: "One collection: the studio fitting — and the same look on the runway.",
    },
    items: [
      img("outfit-suit", "Psychedelic suit, studio chair"),
      img("outfit-red", "Red suit — same studio, same chair"),
      img("outfit-runway", "The same psychedelic look on the runway"),
    ],
  },
  {
    id: "light",
    title: {
      ru: "Один персонаж · разный свет",
      en: "One character · different light",
    },
    note: {
      ru: "Одна модель, один кадр — меняется только световая схема. Процесс — на видео.",
      en: "One model, one framing — only the lighting setup changes. The change itself is on video.",
    },
    items: [
      vid("light-change", "Light changes on the same face — AI video loop"),
      img("light-01", "Low-key portrait, hard shadow"),
      img("light-02", "Soft directional daylight"),
      img("light-03", "Bright, even key light"),
    ],
  },
  {
    id: "lipstick",
    title: { ru: "Помада: бьюти-кампания", en: "Lipstick: beauty campaign" },
    note: {
      ru: "Одна съёмка на шалфейном фоне: предметка, четыре кадра с моделью и румяна крупно.",
      en: "One sage-background shoot: the product still, four frames with the model, and the blush close-up.",
    },
    items: [
      img(
        "product-lipstick-grid",
        "Lipstick campaign, four frames — same model",
      ),
      img("product-lipstick", "Silver lipstick still life"),
      img("style-blush", "Blush close-up — same beauty shoot"),
    ],
  },
  {
    id: "neon",
    title: { ru: "Неон: та же помада, ночь", en: "Neon: same lipstick, night" },
    note: {
      ru: "Отдельная съёмка того же продукта: красная комната, синие колонны, вечерний кадр.",
      en: "A separate shoot of the same product: red room, blue pillars, an evening frame.",
    },
    items: [
      img("light-red-03", "Red room — glossy lips, earring detail"),
      img("light-red-02", "Red room — applying the lipstick"),
      img("light-red-01", "Red room, blue pillars — wide"),
    ],
  },
  {
    id: "water",
    title: { ru: "«water»: красный кадр", en: "“water”: the red frame" },
    note: {
      ru: "Одна кампания: мокрые волосы, красный бархат, продукт у глаза — раскадровка на видео.",
      en: "One campaign: wet hair, red velvet, the product at the eye — the storyboard runs on video.",
    },
    items: [
      vid("product-red", "“water” product campaign on red — AI video loop"),
    ],
  },
  {
    id: "tennis",
    title: { ru: "Спорт: корт и ракетка", en: "Sport: court and racket" },
    note: {
      ru: "Одна принт-кампания: игрок на корте и ракетка в небе — плёночный цвет.",
      en: "One print campaign: the player on the court and the racket in the sky — film-like color.",
    },
    items: [vid("product-racket", "Racket print campaign — AI video loop")],
  },
  {
    id: "sneakers",
    title: { ru: "Кроссовки: предметка + UGC", en: "Sneakers: product + UGC" },
    note: {
      ru: "Один продукт в двух жанрах: каталожная предметка и вертикальный UGC-кадр.",
      en: "One product, two genres: the catalog still and the vertical UGC clip.",
    },
    items: [
      vid("ugc-sneakers", "UGC-style sneaker clip — vertical AI video"),
      img("product-sneaker", "Sneaker product shot (fictional brand)"),
    ],
  },
  {
    id: "splash",
    title: { ru: "Сплэш-постер", en: "The splash poster" },
    note: {
      ru: "Отдельный редакционный кадр: брызги, эскимо, жёсткое солнце.",
      en: "A standalone editorial frame: spray, the popsicle, hard sun.",
    },
    items: [
      img("style-splash", "Editorial splash with ice cream — campaign poster"),
    ],
  },
];
