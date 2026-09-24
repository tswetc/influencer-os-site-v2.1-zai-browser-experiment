// ============================================================================
// Fix Pack 11.2 — CUTAWAYS: frames without the person (~15–25% of a feed).
// A cutaway prompt NEVER contains IDENTITY / passport data: it is assembled
// here from scratch, not via the standard prompt builder. Each pack ships a pool of 3–5
// prompt-ready empty-scene moments; the pool is only the default — Fix Pack
// 11.3 (Canon) will cross it with the model's own place and personal objects.
// ============================================================================

import { canonCutaways } from "./canon";
import { DEV, SENSOR, WORLD_SUFFIX } from "./engines";
import type { ScenePack } from "./packs";
import type { BuildResult, Lang, ModelCanon } from "./types";

export type Cutaway = {
  id: string;
  label: Record<Lang, string>;
  /** English empty-scene phrase. No person, no face, no identity. */
  text: string;
  lighting: string;
};

export const CUTAWAY_POOLS: Record<string, Cutaway[]> = {
  pack_diary: [
    {
      id: "cut_diary_bed",
      label: { ru: "Неубранная кровать", en: "Unmade bed" },
      text: "an unmade bed, blanket pushed aside, a dent still in the pillow",
      lighting: "hard morning sunlight stripes across the sheets",
    },
    {
      id: "cut_diary_chair",
      label: { ru: "Одежда на стуле", en: "Clothes on a chair" },
      text: "yesterday's clothes slipping off the back of a chair",
      lighting: "flat grey daylight from the window",
    },
    {
      id: "cut_diary_sill",
      label: { ru: "Подоконник", en: "Window sill" },
      text: "a window sill with an empty glass and a single hair clip",
      lighting: "soft late-morning light, dust in the air",
    },
    {
      id: "cut_diary_cable",
      label: { ru: "Зарядка на полу", en: "Charger on the floor" },
      text: "a phone charger cable snaking across the bedroom floor",
      lighting: "warm low lamp light in the evening",
    },
  ],
  pack_flash: [
    {
      id: "cut_flash_table",
      label: { ru: "Кухонный стол", en: "Kitchen table" },
      text: "a bare kitchen table with one plate and crumbs, night outside",
      lighting: "harsh direct on-camera flash, background falling to black",
    },
    {
      id: "cut_flash_stairs",
      label: { ru: "Лестничная клетка", en: "Stairwell corner" },
      text: "a stairwell corner with peeling paint and a radiator",
      lighting: "direct flash flattening the wall, hard shadow behind the pipe",
    },
    {
      id: "cut_flash_fridge",
      label: { ru: "Открытый холодильник", en: "Open fridge" },
      text: "an open fridge glowing in a dark kitchen, shelves half empty",
      lighting: "cold fridge light only, everything else black",
    },
  ],
  pack_sunlight: [
    {
      id: "cut_sun_tiles",
      label: { ru: "Кафель у бассейна", en: "Pool tiles" },
      text: "wet pool tiles with a drying footprint trail",
      lighting: "hard noon sun, knife-sharp shadows",
    },
    {
      id: "cut_sun_lounger",
      label: { ru: "Шезлонг", en: "Vinyl lounger" },
      text: "a vinyl lounger with a striped towel flung over it",
      lighting: "blinding southern light, glare on the vinyl",
    },
    {
      id: "cut_sun_water",
      label: { ru: "Блики на воде", en: "Water glare" },
      text: "sun ripples on turquoise water, nothing else in the frame",
      lighting: "midday sun bouncing hard off the surface",
    },
  ],
  pack_americana: [
    {
      id: "cut_motel_sign",
      label: { ru: "Неон мотеля", en: "Motel neon" },
      text: "a motel vacancy sign against a dusk sky, wires crossing the frame",
      lighting: "neon glow against fading daylight",
    },
    {
      id: "cut_motel_bed",
      label: { ru: "Покрывало и телевизор", en: "Bedspread and TV" },
      text: "a patterned motel bedspread and an old TV on the dresser",
      lighting: "even artificial ceiling light, slightly too warm",
    },
    {
      id: "cut_motel_lot",
      label: { ru: "Парковка", en: "Parking lot" },
      text: "an almost empty motel parking lot with one dusty car",
      lighting: "flat overhead noon sun, saturated colors",
    },
  ],
  pack_studio: [
    {
      id: "cut_cast_wall",
      label: { ru: "Стена с метками", en: "Taped wall" },
      text: "a bare casting wall with tape marks and one plastic chair",
      lighting: "even businesslike daylight from a big window",
    },
    {
      id: "cut_cast_rail",
      label: { ru: "Рейл с номерами", en: "Numbered rail" },
      text: "a clothes rail with numbered cards pinned to garment bags",
      lighting: "neutral studio strip light",
    },
    {
      id: "cut_cast_polas",
      label: { ru: "Полароиды на стене", en: "Polaroids on the wall" },
      text: "a grid of test polaroids taped to a white wall",
      lighting: "flat daylight, no drama",
    },
  ],
  pack_suburb: [
    {
      id: "cut_sub_sprinkler",
      label: { ru: "Поливалка", en: "Sprinkler" },
      text: "a lawn sprinkler ticking over an empty, too-perfect lawn",
      lighting: "clean afternoon sun, saturated green",
    },
    {
      id: "cut_sub_mailbox",
      label: { ru: "Почтовые ящики", en: "Mailboxes" },
      text: "a row of identical suburban mailboxes along the curb",
      lighting: "hard 3pm light, long shadows",
    },
    {
      id: "cut_sub_pool",
      label: { ru: "Край бассейна", en: "Pool edge" },
      text: "a backyard pool edge with an inflatable float drifting alone",
      lighting: "postcard-bright sun, one wrong quiet note",
    },
  ],
  pack_concrete: [
    {
      id: "cut_conc_yard",
      label: { ru: "Двор панельки", en: "Panel-block yard" },
      text: "a panel-block courtyard with a bent swing and trampled snowless ground",
      lighting: "flat grey overcast daylight",
    },
    {
      id: "cut_conc_window",
      label: { ru: "Окно подъезда", en: "Stairwell window" },
      text: "a stairwell window with wired glass and a dying plant on the sill",
      lighting: "cold fluorescent tube overhead",
    },
    {
      id: "cut_conc_underpass",
      label: { ru: "Переход", en: "Underpass" },
      text: "an empty concrete underpass, wet floor reflecting the lights",
      lighting: "greenish fluorescent strips, uneven",
    },
  ],
  pack_cup: [
    {
      id: "cut_cup_table",
      label: { ru: "Чашка на столе", en: "Cup on the table" },
      text: "a half-finished coffee cup on a table with croissant crumbs",
      lighting: "soft morning window light",
    },
    {
      id: "cut_cup_sill",
      label: { ru: "Пар над чашкой", en: "Steam over the cup" },
      text: "a steaming cup on a windowsill, condensation on the glass",
      lighting: "backlit morning haze",
    },
    {
      id: "cut_cup_cafe",
      label: { ru: "Столик кафе", en: "Cafe table" },
      text: "an empty cafe table with sugar packets and a folded receipt",
      lighting: "daylight through a big cafe window",
    },
  ],
  pack_transit: [
    {
      id: "cut_tr_window",
      label: { ru: "Окно в дожде", en: "Rain-streaked window" },
      text: "a bus window streaked with rain, empty seat in front of it",
      lighting: "grey moving daylight, city smeared outside",
    },
    {
      id: "cut_tr_seat",
      label: { ru: "Свет на сиденье", en: "Light on the seat" },
      text: "golden hour light crossing worn train seat fabric",
      lighting: "low warm sun through the glass, moving shadows",
    },
    {
      id: "cut_tr_ticket",
      label: { ru: "Билет и ключи", en: "Ticket and keys" },
      text: "a paper ticket and keys dropped on the seat beside",
      lighting: "soft window light, reflections on the glass",
    },
  ],
  pack_wide: [
    {
      id: "cut_wide_shoes",
      label: { ru: "Кроссовки у двери", en: "Sneakers by the door" },
      text: "sneakers kicked off by the door, laces still tied",
      lighting: "hallway ceiling light, slightly green",
    },
    {
      id: "cut_wide_lift",
      label: { ru: "Пустой лифт", en: "Empty lift" },
      text: "an empty lift interior, scratched metal walls",
      lighting: "flat lift panel light",
    },
    {
      id: "cut_wide_floor",
      label: { ru: "Пол и обёртки", en: "Floor and wrappers" },
      text: "snack wrappers and a phone face-down on the floor",
      lighting: "TV glow flickering in a dim room",
    },
  ],
  pack_polaroid90: [
    {
      id: "cut_p90_prints",
      label: { ru: "Полароиды на ковре", en: "Prints on the carpet" },
      text: "a scatter of polaroid prints on a patterned carpet",
      lighting: "direct flash, hard falloff into the room",
    },
    {
      id: "cut_p90_wallcarpet",
      label: { ru: "Ковёр на стене", en: "Wall carpet" },
      text: "an ornamental wall carpet with one framed family photo",
      lighting: "bare bulb light, warm and uneven",
    },
    {
      id: "cut_p90_table",
      label: { ru: "Стол после гостей", en: "Table after guests" },
      text: "a festive table after everyone left, napkins and empty glasses",
      lighting: "flash-lit, deep shadows behind the chairs",
    },
  ],
  pack_fitting: [
    {
      id: "cut_fit_rail",
      label: { ru: "Рейл", en: "The rail" },
      text: "a rolling rail of numbered garments, tags swinging slightly",
      lighting: "flat studio daylight",
    },
    {
      id: "cut_fit_pins",
      label: { ru: "Булавки", en: "Pins" },
      text: "a pin cushion and a paper measuring tape on a stool",
      lighting: "even fluorescent working light",
    },
    {
      id: "cut_fit_wall",
      label: { ru: "Полароиды на стене", en: "Polaroids on the wall" },
      text: "fitting polaroids taped in a crooked row on the studio wall",
      lighting: "ceiling light glare on glossy prints",
    },
    {
      id: "cut_fit_floor",
      label: { ru: "Бирки на полу", en: "Tags on the floor" },
      text: "a small heap of clips and price tags by the mirror",
      lighting: "soft window light across the floor",
    },
  ],
  pack_steam: [
    {
      id: "cut_steam_mirror",
      label: { ru: "Полоса на зеркале", en: "Streak on the mirror" },
      text: "a fogged mirror with one hand-wiped streak, already fogging back",
      lighting: "warm bulb diffused by steam",
    },
    {
      id: "cut_steam_towel",
      label: { ru: "Полотенце", en: "The towel" },
      text: "a towel on a hook, still dripping onto the tiles",
      lighting: "grey light from a frosted window",
    },
    {
      id: "cut_steam_brush",
      label: { ru: "Расчёска", en: "Hairbrush" },
      text: "a hairbrush with wet strands left on the shelf",
      lighting: "single warm bathroom bulb",
    },
    {
      id: "cut_steam_tiles",
      label: { ru: "Конденсат", en: "Condensation" },
      text: "condensation running down the tiles in thin lines",
      lighting: "steamy warm light, soft edges",
    },
  ],
  pack_4am: [
    {
      id: "cut_4am_phone",
      label: { ru: "Телефон в простынях", en: "Phone in the sheets" },
      text: "a phone glowing face-down in the folds of the sheets",
      lighting: "cold screen light in a black room",
    },
    {
      id: "cut_4am_kettle",
      label: { ru: "Чайник", en: "The kettle" },
      text: "kettle steam rising against a black kitchen window",
      lighting: "one dim warm bulb",
    },
    {
      id: "cut_4am_clock",
      label: { ru: "Часы", en: "The clock" },
      text: "a dim clock reading 4:12 on a shelf in the dark",
      lighting: "faint glow, everything else underexposed",
    },
    {
      id: "cut_4am_blanket",
      label: { ru: "Откинутое одеяло", en: "Blanket thrown back" },
      text: "a blanket thrown back, a dent still in the pillow",
      lighting: "street light seeping through the curtain",
    },
  ],
  pack_screen: [
    {
      id: "cut_screen_laptop",
      label: { ru: "Пауза", en: "Paused" },
      text: "a laptop paused mid-frame in a dark room",
      lighting: "screen glow as the only source",
    },
    {
      id: "cut_screen_prop",
      label: { ru: "Телефон у чашки", en: "Phone against a mug" },
      text: "a phone propped against a mug, a call still connected",
      lighting: "cold screen light on the tabletop",
    },
    {
      id: "cut_screen_cables",
      label: { ru: "Зарядки", en: "Chargers" },
      text: "a tangle of chargers and cables on the desk edge",
      lighting: "dim desk lamp",
    },
    {
      id: "cut_screen_glare",
      label: { ru: "Блик экрана", en: "Screen glare" },
      text: "screen glare reflected in a glass of water",
      lighting: "blue screen light in a dark room",
    },
  ],
  pack_motion: [
    {
      id: "cut_motion_brush",
      label: { ru: "Расчёска на полу", en: "Brush on the floor" },
      text: "a hairbrush dropped in the middle of the floor",
      lighting: "soft window daylight",
    },
    {
      id: "cut_motion_jacket",
      label: { ru: "Куртка на ручке", en: "Jacket on the doorknob" },
      text: "a jacket flung over the doorknob, one sleeve inside out",
      lighting: "hallway ceiling light",
    },
    {
      id: "cut_motion_chair",
      label: { ru: "Стул", en: "The chair" },
      text: "a chair still rocking slightly, nobody in the frame",
      lighting: "flat daylight",
    },
    {
      id: "cut_motion_keys",
      label: { ru: "Ключи", en: "The keys" },
      text: "keys just landed in the bowl, still tilted",
      lighting: "warm entryway lamp",
    },
  ],
  pack_night: [
    {
      id: "cut_night_pan",
      label: { ru: "Сковорода", en: "The pan" },
      text: "a pan on the stove, thin steam rising into the bulb light",
      lighting: "single incandescent bulb overhead",
    },
    {
      id: "cut_night_window",
      label: { ru: "Чёрное окно", en: "Black window" },
      text: "a black kitchen window with the bulb's reflection hanging in it",
      lighting: "warm light inside, nothing outside",
    },
    {
      id: "cut_night_fork",
      label: { ru: "Вилка", en: "The fork" },
      text: "a fork left on the counter edge next to the pan lid",
      lighting: "low warm light, deep shadows",
    },
    {
      id: "cut_night_fridge",
      label: { ru: "Дверца холодильника", en: "Fridge door" },
      text: "the fridge door left ajar, cold light spilling on the floor",
      lighting: "cold fridge light in a dark kitchen",
    },
  ],
  pack_squint: [
    {
      id: "cut_sq_curtain",
      label: { ru: "Штора в контровом", en: "Backlit curtain" },
      text: "a thin curtain glowing with low sun, pattern of the window behind",
      lighting: "soft golden backlight, flare licking the frame edge",
    },
    {
      id: "cut_sq_balcony",
      label: { ru: "Перила балкона", en: "Balcony railing" },
      text: "a balcony railing catching the last warm light, city softened behind",
      lighting: "golden hour, gentle haze",
    },
    {
      id: "cut_sq_beam",
      label: { ru: "Луч на стене", en: "Beam on the wall" },
      text: "a dusty sunbeam crossing a plain wall, nothing else staged",
      lighting: "low warm side light, floating dust",
    },
  ],
};

/** Fix Pack 11.3: canon cutaways (her place × her objects) go FIRST. */
export function cutawayPool(
  packId: string,
  canon?: ModelCanon | null,
): Cutaway[] {
  return [...canonCutaways(canon), ...(CUTAWAY_POOLS[packId] ?? [])];
}

function composeCutaway(
  text: string,
  lighting: string,
  world: "A" | "B" | "C",
  device?: string,
): string {
  return [
    `SCENE: ${text}, ${lighting}, nobody in the frame, a lived-in moment just left behind.`,
    "TECHNIQUE: casual handheld phone snapshot of an empty scene, slightly careless framing, one physically plausible imperfection: soft handheld blur at the frame edges.",
    `TECHNICAL: ${device || DEV}, ${SENSOR}.`,
    `MOOD: quiet in-between moment, ${WORLD_SUFFIX[world]}.`,
    `(key: empty scene, no people, no face, no hands, ${lighting})`,
  ].join(" ");
}

/** Build one cutaway from a pack pool. Deterministic by index. */
export function buildCutaway(
  pack: ScenePack,
  index: number,
  lang: Lang,
  device?: string,
  canon?: ModelCanon | null,
): BuildResult {
  const pool = cutawayPool(pack.id, canon);
  if (pool.length === 0) {
    return buildAdHocCutaway("", "", pack.world, lang, device);
  }
  const c = pool[((index % pool.length) + pool.length) % pool.length];
  return {
    prompt: composeCutaway(c.text, c.lighting, pack.world, device),
    label: c.label[lang],
    role: "cutaway",
  };
}

/** Packless fallback: an empty-scene frame built from the current location. */
export function buildAdHocCutaway(
  location: string,
  lighting: string,
  world: "A" | "B" | "C",
  lang: Lang,
  device?: string,
): BuildResult {
  const text = location || "the corner of the room she just left";
  const light = lighting || "soft natural window light";
  return {
    prompt: composeCutaway(text, light, world, device),
    label: "B-roll",
    role: "cutaway",
  };
}

