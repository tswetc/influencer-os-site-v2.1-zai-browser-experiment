// RU -> EN parser. Prompts are ALWAYS built in English regardless of UI language.
// Pipeline: norm() -> phrase (n-gram) pass -> user dict -> NM -> translit -> fuzzy -> RULES -> SW filter
//           -> ambiguity resolver -> ignored-tag filter -> categorized Scene Spec fields.
//
// The canon lives in three clearly separated, easily editable objects:
//   NM    - RU -> EN dictionary (each entry carries its Scene Spec category)
//   RULES - regex -> tag mappings (multi-language, phrase-level)
//   SW    - stop-words removed before tagging
// The user's own mappings (learn-from-edits) augment NM/RULES at runtime via ios_userdict.

import { loadUserDict } from "./storage";
import type { Mode, UserDict } from "./types";

export type TagCat =
  "location" | "lighting" | "camera" | "pose" | "outfit" | "mood";

export interface NMEntry {
  en: string;
  cat: TagCat;
}

// ============================================================================
// NM: RU -> EN dictionary (~150 entries), grouped by category. Extend freely.
// ============================================================================
export const NM: Record<string, NMEntry> = {
  // --- lighting / weather ---------------------------------------------------
  закат: { en: "golden hour", cat: "lighting" },
  "золотой час": { en: "golden hour", cat: "lighting" },
  рассвет: { en: "sunrise soft light", cat: "lighting" },
  сумерки: { en: "dusk, blue hour", cat: "lighting" },
  "голубой час": { en: "blue hour", cat: "lighting" },
  ночь: { en: "night", cat: "lighting" },
  ночью: { en: "night", cat: "lighting" },
  день: { en: "daylight", cat: "lighting" },
  днём: { en: "daylight", cat: "lighting" },
  полдень: { en: "harsh midday sun", cat: "lighting" },
  пасмурно: { en: "overcast soft light", cat: "lighting" },
  облачно: { en: "overcast soft light", cat: "lighting" },
  солнце: { en: "hard sunlight", cat: "lighting" },
  солнечно: { en: "bright sunlight", cat: "lighting" },
  тень: { en: "open shade", cat: "lighting" },
  неон: { en: "neon lighting", cat: "lighting" },
  свечи: { en: "candlelight", cat: "lighting" },
  окно: { en: "soft window light", cat: "lighting" },
  студия: { en: "studio lighting", cat: "lighting" },
  лампа: { en: "warm lamp light", cat: "lighting" },
  фонарь: { en: "street lamp light", cat: "lighting" },
  прожектор: { en: "spotlight", cat: "lighting" },
  контровой: { en: "backlight, rim light", cat: "lighting" },
  контражур: { en: "backlight silhouette edge", cat: "lighting" },
  блики: { en: "lens flare highlights", cat: "lighting" },
  "мягкий свет": { en: "soft diffused light", cat: "lighting" },
  "жёсткий свет": { en: "hard directional light", cat: "lighting" },
  "тёплый свет": { en: "warm light", cat: "lighting" },
  "холодный свет": { en: "cool light", cat: "lighting" },
  вспышка: { en: "direct on-camera flash", cat: "lighting" },
  гирлянда: { en: "fairy lights bokeh", cat: "lighting" },
  луна: { en: "moonlight", cat: "lighting" },
  костёр: { en: "campfire light", cat: "lighting" },
  дождь: { en: "rain, wet surfaces, reflections", cat: "lighting" },
  снег: { en: "snow falling", cat: "lighting" },
  туман: { en: "fog, soft haze", cat: "lighting" },
  гроза: { en: "storm clouds, dramatic sky", cat: "lighting" },
  ветер: { en: "wind-blown hair", cat: "lighting" },

  // --- locations --------------------------------------------------------------
  улица: { en: "city street", cat: "location" },
  город: { en: "city street", cat: "location" },
  центр: { en: "downtown city center", cat: "location" },
  кафе: { en: "cafe interior", cat: "location" },
  кофейня: { en: "coffee shop interior", cat: "location" },
  ресторан: { en: "restaurant interior", cat: "location" },
  бар: { en: "bar interior, dim warm light", cat: "location" },
  клуб: { en: "nightclub interior", cat: "location" },
  пляж: { en: "beach", cat: "location" },
  море: { en: "seaside", cat: "location" },
  океан: { en: "ocean shore", cat: "location" },
  бассейн: { en: "poolside", cat: "location" },
  спортзал: { en: "gym interior", cat: "location" },
  спальня: { en: "bedroom", cat: "location" },
  кухня: { en: "kitchen interior", cat: "location" },
  гостиная: { en: "living room", cat: "location" },
  ванная: { en: "bathroom mirror", cat: "location" },
  офис: { en: "office interior", cat: "location" },
  машина: { en: "car interior", cat: "location" },
  авто: { en: "car interior", cat: "location" },
  такси: { en: "taxi back seat", cat: "location" },
  метро: { en: "subway station", cat: "location" },
  вокзал: { en: "train station", cat: "location" },
  аэропорт: { en: "airport terminal", cat: "location" },
  самолёт: { en: "airplane cabin", cat: "location" },
  отель: { en: "hotel room", cat: "location" },
  лобби: { en: "hotel lobby", cat: "location" },
  балкон: { en: "balcony", cat: "location" },
  крыша: { en: "rooftop", cat: "location" },
  терраса: { en: "terrace", cat: "location" },
  парк: { en: "park", cat: "location" },
  лес: { en: "forest", cat: "location" },
  горы: { en: "mountains", cat: "location" },
  озеро: { en: "lakeside", cat: "location" },
  поле: { en: "open field", cat: "location" },
  пустыня: { en: "desert landscape", cat: "location" },
  дача: { en: "countryside house", cat: "location" },
  рынок: { en: "street market", cat: "location" },
  магазин: { en: "store interior", cat: "location" },
  "торговый центр": { en: "shopping mall", cat: "location" },
  музей: { en: "museum gallery", cat: "location" },
  библиотека: { en: "library interior", cat: "location" },
  лестница: { en: "staircase", cat: "location" },
  лифт: { en: "elevator interior", cat: "location" },
  двор: { en: "courtyard", cat: "location" },
  мост: { en: "bridge", cat: "location" },
  набережная: { en: "waterfront promenade", cat: "location" },

  // --- camera / framing -------------------------------------------------------
  селфи: { en: "phone selfie at arm's length", cat: "camera" },
  зеркало: { en: "mirror selfie", cat: "camera" },
  портрет: { en: "portrait framing", cat: "camera" },
  "весь рост": { en: "full-body shot", cat: "camera" },
  "в полный рост": { en: "full-body shot", cat: "camera" },
  "крупный план": { en: "close-up", cat: "camera" },
  "по пояс": { en: "waist-up framing", cat: "camera" },
  "со спины": { en: "shot from behind", cat: "camera" },
  сверху: { en: "high angle from above", cat: "camera" },
  снизу: { en: "low angle", cat: "camera" },
  сбоку: { en: "side profile framing", cat: "camera" },
  штатив: { en: "camera on tripod", cat: "camera" },
  дрон: { en: "aerial drone shot", cat: "camera" },
  "от первого лица": { en: "POV shot", cat: "camera" },
  широкоугольный: { en: "wide-angle lens", cat: "camera" },
  телевик: { en: "telephoto compression", cat: "camera" },
  боке: { en: "shallow depth of field, bokeh", cat: "camera" },
  "через плечо": { en: "over-the-shoulder framing", cat: "camera" },
  отражение: { en: "reflection shot", cat: "camera" },

  // --- pose / action ------------------------------------------------------------
  улыбка: { en: "smiling", cat: "pose" },
  улыбается: { en: "smiling", cat: "pose" },
  смеётся: { en: "laughing candidly", cat: "pose" },
  серьёзный: { en: "neutral expression", cat: "pose" },
  грустный: { en: "melancholic expression", cat: "pose" },
  задумчивый: { en: "pensive look", cat: "pose" },
  идёт: { en: "walking", cat: "pose" },
  гуляет: { en: "strolling casually", cat: "pose" },
  бежит: { en: "running", cat: "pose" },
  сидит: { en: "sitting", cat: "pose" },
  стоит: { en: "standing", cat: "pose" },
  лежит: { en: "lying down", cat: "pose" },
  прыгает: { en: "jumping mid-air", cat: "pose" },
  танцует: { en: "dancing", cat: "pose" },
  позирует: { en: "posing confidently", cat: "pose" },
  "смотрит в камеру": { en: "looking at camera", cat: "pose" },
  "смотрит в сторону": { en: "looking away", cat: "pose" },
  пьёт: { en: "drinking", cat: "pose" },
  ест: { en: "eating", cat: "pose" },
  читает: { en: "reading", cat: "pose" },
  держит: { en: "holding", cat: "pose" },
  обнимает: { en: "hugging", cat: "pose" },
  потягивается: { en: "stretching", cat: "pose" },
  "поправляет волосы": { en: "adjusting hair", cat: "pose" },
  оборачивается: { en: "turning around", cat: "pose" },
  наклоняется: { en: "leaning forward", cat: "pose" },
  машет: { en: "waving", cat: "pose" },

  // --- outfit ------------------------------------------------------------------------
  джинсы: { en: "jeans", cat: "outfit" },
  платье: { en: "dress", cat: "outfit" },
  юбка: { en: "skirt", cat: "outfit" },
  футболка: { en: "t-shirt", cat: "outfit" },
  рубашка: { en: "shirt", cat: "outfit" },
  блузка: { en: "blouse", cat: "outfit" },
  свитер: { en: "knit sweater", cat: "outfit" },
  худи: { en: "hoodie", cat: "outfit" },
  куртка: { en: "jacket", cat: "outfit" },
  пальто: { en: "coat", cat: "outfit" },
  плащ: { en: "trench coat", cat: "outfit" },
  костюм: { en: "tailored suit", cat: "outfit" },
  пиджак: { en: "blazer", cat: "outfit" },
  купальник: { en: "swimsuit", cat: "outfit" },
  бикини: { en: "bikini", cat: "outfit" },
  шорты: { en: "shorts", cat: "outfit" },
  топ: { en: "crop top", cat: "outfit" },
  кроссовки: { en: "sneakers", cat: "outfit" },
  каблуки: { en: "high heels", cat: "outfit" },
  ботинки: { en: "boots", cat: "outfit" },
  шляпа: { en: "hat", cat: "outfit" },
  кепка: { en: "baseball cap", cat: "outfit" },
  шарф: { en: "scarf", cat: "outfit" },
  спортивный: { en: "athleisure", cat: "outfit" },
  пижама: { en: "pajamas", cat: "outfit" },
  кожаный: { en: "leather", cat: "outfit" },

  // --- mood ------------------------------------------------------------------------
  уютно: { en: "cozy mood", cat: "mood" },
  романтично: { en: "romantic mood", cat: "mood" },
  драматично: { en: "dramatic mood", cat: "mood" },
  спокойно: { en: "calm serene mood", cat: "mood" },
  энергично: { en: "energetic vibe", cat: "mood" },
  загадочно: { en: "mysterious mood", cat: "mood" },
  весело: { en: "playful mood", cat: "mood" },
  роскошно: { en: "luxurious mood", cat: "mood" },
  минимализм: { en: "minimalist aesthetic", cat: "mood" },
  ностальгия: { en: "nostalgic mood", cat: "mood" },
};

// ============================================================================
// RULES: regex -> tag mappings (works on the raw text, RU + EN + latinized)
// ============================================================================
export const RULES: { re: RegExp; tag: string; cat: TagCat }[] = [
  { re: /(закат|sunset)/i, tag: "golden hour", cat: "lighting" },
  { re: /(вечеринк|party)/i, tag: "lively party atmosphere", cat: "mood" },
  {
    re: /(неон|neon|ночной город)/i,
    tag: "neon city night, mixed color light",
    cat: "lighting",
  },
  {
    re: /(селфи|selfie)/i,
    tag: "phone selfie at arm's length, slight wide-angle",
    cat: "camera",
  },
  {
    re: /(зеркал|mirror)/i,
    tag: "mirror selfie, phone visible",
    cat: "camera",
  },
  {
    re: /(пляж|beach)/i,
    tag: "sunny beach, bright daylight, sand",
    cat: "location",
  },
  {
    re: /(спортзал|gym)/i,
    tag: "gym interior, fluorescent light",
    cat: "location",
  },
  {
    re: /(дожд|rain)/i,
    tag: "rain, wet surfaces, reflections",
    cat: "lighting",
  },
  { re: /(golden hour)/i, tag: "golden hour", cat: "lighting" },
  {
    re: /(rooftop|крыш)/i,
    tag: "rooftop at dusk, city skyline",
    cat: "location",
  },
  { re: /(sunrise|рассвет)/i, tag: "sunrise soft light", cat: "lighting" },
  { re: /(candle|свеч)/i, tag: "candlelight, warm flicker", cat: "lighting" },
  {
    re: /(полароид|polaroid)/i,
    tag: "polaroid instant film look",
    cat: "mood",
  },
];

// ============================================================================
// EN aliases -> NM keys (English scene text support). Values must be existing
// NM keys so tags stay canonical.
// ============================================================================
export const EN_ALIASES: Record<string, string> = {
  // locations
  street: "улица",
  city: "город",
  cafe: "кафе",
  restaurant: "ресторан",
  club: "клуб",
  nightclub: "клуб",
  beach: "пляж",
  sea: "море",
  ocean: "океан",
  pool: "бассейн",
  gym: "спортзал",
  bedroom: "спальня",
  kitchen: "кухня",
  bathroom: "ванная",
  car: "машина",
  taxi: "такси",
  metro: "метро",
  subway: "метро",
  balcony: "балкон",
  rooftop: "крыша",
  terrace: "терраса",
  park: "парк",
  lake: "озеро",
  desert: "пустыня",
  market: "рынок",
  museum: "музей",
  library: "библиотека",
  stairs: "лестница",
  // lighting
  sun: "солнце",
  sunny: "солнце",
  neon: "неон",
  candle: "свечи",
  candles: "свечи",
  window: "окно",
  studio: "студия",
  lamp: "лампа",
  backlight: "контровой",
  flash: "вспышка",
  moon: "луна",
  snow: "снег",
  fog: "туман",
  overcast: "пасмурно",
  // camera
  selfie: "селфи",
  mirror: "зеркало",
  tripod: "штатив",
  drone: "дрон",
  bokeh: "боке",
  reflection: "отражение",
  // pose
  smiling: "улыбается",
  smile: "улыбается",
  laughing: "смеётся",
  serious: "серьёзный",
  sad: "грустный",
  pensive: "задумчивый",
  stretching: "потягивается",
  turning: "оборачивается",
  leaning: "наклоняется",
  // outfit
  dress: "платье",
  skirt: "юбка",
  tshirt: "футболка",
  shirt: "рубашка",
  blouse: "блузка",
  hoodie: "худи",
  jacket: "куртка",
  coat: "пальто",
  suit: "костюм",
  blazer: "пиджак",
  swimsuit: "купальник",
  bikini: "бикини",
  top: "топ",
  sneakers: "кроссовки",
  heels: "каблуки",
  boots: "ботинки",
  hat: "шляпа",
  cap: "кепка",
  pajamas: "пижама",
  leather: "кожаный",
  // mood
  cozy: "уютно",
  romantic: "романтично",
  dramatic: "драматично",
  calm: "спокойно",
  energetic: "энергично",
  mysterious: "загадочно",
  playful: "весело",
  luxurious: "роскошно",
  minimalist: "минимализм",
  nostalgic: "ностальгия",
};

// EN phrases -> NM keys
export const EN_PHRASE_ALIASES: Record<string, string> = {
  "close-up": "крупный план",
  "close up": "крупный план",
  "living room": "гостиная",
  "first person": "от первого лица",
  "wide angle": "широкоугольный",
  "over the shoulder": "через плечо",
};

// AMB: ambiguous terms -> multiple candidate tags; the user picks one (persisted
// into the user dictionary so the choice sticks).
export const AMB: Record<string, { options: NMEntry[] }> = {
  вечер: {
    options: [
      { en: "golden hour", cat: "lighting" },
      { en: "night", cat: "lighting" },
    ],
  },
  зал: {
    options: [
      { en: "gym interior", cat: "location" },
      { en: "living room", cat: "location" },
    ],
  },
  очки: {
    options: [
      { en: "sunglasses", cat: "outfit" },
      { en: "clear glasses", cat: "outfit" },
    ],
  },
  свет: {
    options: [
      { en: "soft diffused light", cat: "lighting" },
      { en: "hard directional light", cat: "lighting" },
    ],
  },
};

// ============================================================================
// SW: stop-words removed before tagging
// ============================================================================
export const SW = new Set([
  // RU
  "в",
  "во",
  "на",
  "с",
  "со",
  "и",
  "а",
  "но",
  "у",
  "к",
  "по",
  "за",
  "из",
  "от",
  "для",
  "около",
  "возле",
  "очень",
  "чуть",
  "это",
  "эта",
  "тот",
  "она",
  "он",
  "её",
  "его",
  "как",
  "где",
  "или",
  "же",
  "бы",
  "не",
  "ни",
  "что",
  "чтобы",
  // EN
  "the",
  "a",
  "an",
  "with",
  "very",
  "at",
  "in",
  "on",
  "of",
  "and",
  "or",
  "to",
  "is",
  "are",
  "her",
  "his",
  "she",
  "he",
  "it",
  "by",
  "near",
]);

// ============================================================================
// norm(): lowercase, trim, strip noise
// ============================================================================
export function norm(text: string): string {
  return text
    .toLowerCase()
    .replace(/ё/g, "ё") // normalize composed ё
    .replace(/[^\p{L}\p{N}\s'-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ============================================================================
// Transliteration: latinized RU -> Cyrillic ("zakat" -> "закат")
// ============================================================================
const TRANSLIT: [string, string][] = [
  ["shch", "щ"],
  ["sch", "щ"],
  ["zh", "ж"],
  ["kh", "х"],
  ["ts", "ц"],
  ["ch", "ч"],
  ["sh", "ш"],
  ["yu", "ю"],
  ["ju", "ю"],
  ["ya", "я"],
  ["ja", "я"],
  ["yo", "ё"],
  ["jo", "ё"],
  ["ye", "е"],
  ["a", "а"],
  ["b", "б"],
  ["v", "в"],
  ["g", "г"],
  ["d", "д"],
  ["e", "е"],
  ["z", "з"],
  ["i", "и"],
  ["j", "й"],
  ["k", "к"],
  ["l", "л"],
  ["m", "м"],
  ["n", "н"],
  ["o", "о"],
  ["p", "п"],
  ["r", "р"],
  ["s", "с"],
  ["t", "т"],
  ["u", "у"],
  ["f", "ф"],
  ["h", "х"],
  ["c", "ц"],
  ["y", "ы"],
  ["w", "в"],
  ["x", "кс"],
  ["q", "к"],
  ["'", "ь"],
];

export function translitToCyr(word: string): string {
  if (!/^[a-z'-]+$/.test(word)) return word;
  let out = "";
  let i = 0;
  while (i < word.length) {
    let matched = false;
    for (const [lat, cyr] of TRANSLIT) {
      if (word.startsWith(lat, i)) {
        out += cyr;
        i += lat.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      out += word[i];
      i++;
    }
  }
  return out;
}

// ============================================================================
// Fuzzy matching: Levenshtein distance (early-exit, distance <= 1 for len >= 5)
// ============================================================================
export function levenshtein(a: string, b: string, max = 2): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const dp = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    let rowMin = dp[0];
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(
        dp[j] + 1,
        dp[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      prev = tmp;
      if (dp[j] < rowMin) rowMin = dp[j];
    }
    if (rowMin > max) return max + 1;
  }
  return dp[b.length];
}

// ============================================================================
// wc(): clamp word count to the engine limit.
//   Nano 150-250 (compressed 80-150), Seedance 50-70, Veo 100-150.
// Trims whole sentences from the end first, then words.
// ============================================================================
export const ENGINE_WORD_BUDGET: Record<string, [number, number]> = {
  nano_full: [150, 250],
  nano_tight: [80, 150],
  seedance: [50, 70],
  veo: [100, 150],
};

export interface WcResult {
  text: string;
  words: number;
  clamped: boolean;
  underMin: boolean;
}

export function wc(text: string, min: number, max: number): WcResult {
  const countWords = (s: string) => s.split(/\s+/).filter(Boolean).length;
  let words = countWords(text);
  if (words <= max)
    return { text, words, clamped: false, underMin: words < min };
  // Drop sentences from the end while over budget
  const sentences = text.split(/(?<=[.!?])\s+/);
  let out = [...sentences];
  while (out.length > 1 && countWords(out.join(" ")) > max) out.pop();
  let joined = out.join(" ");
  // Still over (single giant sentence) -> hard word slice
  if (countWords(joined) > max) {
    joined = joined.split(/\s+/).filter(Boolean).slice(0, max).join(" ");
  }
  words = countWords(joined);
  return { text: joined, words, clamped: true, underMin: words < min };
}

// ============================================================================
// Smart word-budget trimming: drop lowest-priority tag groups first.
// Priority: mood (0) < style (1) < scene (2) < identity (3).
// ============================================================================
export const TAG_PRIORITY: Record<string, number> = {
  mood: 0,
  style: 1,
  scene: 2,
  identity: 3,
};

export function trimToBudget(
  blocks: { text: string; priority: number }[],
  maxWords: number,
): string {
  const countWords = (s: string) => s.split(/\s+/).filter(Boolean).length;
  const kept = [...blocks];
  const total = () => countWords(kept.map((b) => b.text).join(" "));
  // Drop whole low-priority blocks first
  while (total() > maxWords && kept.length > 1) {
    let lowest = 0;
    for (let i = 1; i < kept.length; i++) {
      if (kept[i].priority < kept[lowest].priority) lowest = i;
    }
    if (kept[lowest].priority >= TAG_PRIORITY.identity) break; // never drop identity
    kept.splice(lowest, 1);
  }
  return wc(kept.map((b) => b.text).join(" "), 0, maxWords).text;
}

// ============================================================================
// parse(): orchestrator -> tags + partial Scene Spec fields + ambiguities
// ============================================================================
export interface Ambiguity {
  term: string;
  options: NMEntry[];
}

export interface ParsedTags {
  location: string;
  lighting: string;
  camera: string;
  pose: string;
  outfit: string;
  mood: string;
  tags: string[]; // all extracted English tags for the chips row
  tagCats: Record<string, TagCat>; // tag -> category (for the editor UI)
  tagSources: Record<string, string>; // tag -> source term (for learn-from-edits)
  ambiguities: Ambiguity[]; // unresolved terms; user picks -> user dict
  unknown: string[]; // meaningful words nothing matched (LLM translate candidates)
}

const EMPTY: ParsedTags = {
  location: "",
  lighting: "",
  camera: "",
  pose: "",
  outfit: "",
  mood: "",
  tags: [],
  tagCats: {},
  tagSources: {},
  ambiguities: [],
  unknown: [],
};

export function parse(
  text: string,
  _mode: Mode = "photo",
  dict?: UserDict,
): ParsedTags {
  if (!text.trim()) return EMPTY;
  const user = dict ?? loadUserDict();
  const cleaned = norm(text);
  const ignored = new Set(user.ignored);

  const found = new Map<string, { cat: TagCat; source: string }>();
  const known = new Set<string>();
  const add = (en: string, cat: TagCat, source: string) => {
    if (!ignored.has(en)) found.set(en, { cat, source });
  };

  // 1) Phrase pass (n-grams): user dict multi-word entries first, then NM phrases.
  //    Longest keys first so "золотой час" wins over "час".
  const userPhrases = Object.entries(user.entries).filter(([k]) =>
    k.includes(" "),
  );
  const nmPhrases = Object.entries(NM).filter(([k]) => k.includes(" "));
  for (const [ru, entry] of [...userPhrases, ...nmPhrases].sort(
    (a, b) => b[0].length - a[0].length,
  )) {
    if (cleaned.includes(ru)) {
      add(entry.en, entry.cat, ru);
      for (const part of ru.split(" ")) known.add(part);
    }
  }

  // 1b) English phrase aliases -> NM entries (EN scene text support)
  for (const [enPhrase, ruKey] of Object.entries(EN_PHRASE_ALIASES).sort(
    (a, b) => b[0].length - a[0].length,
  )) {
    const entry = NM[ruKey];
    if (entry && cleaned.includes(enPhrase)) {
      add(entry.en, entry.cat, enPhrase);
      for (const part of enPhrase.split(" ")) known.add(part);
    }
  }

  // 2) Single-word pass: exact -> user dict -> NM -> translit -> stem -> fuzzy.
  const words = cleaned.split(" ").filter((w) => w && !SW.has(w));
  const nmSingles = Object.entries(NM).filter(([k]) => !k.includes(" "));
  const userSingles = Object.entries(user.entries).filter(
    ([k]) => !k.includes(" "),
  );
  for (const w of words) {
    // user dictionary always wins (learn-from-edits)
    const userHit = user.entries[w];
    if (userHit) {
      add(userHit.en, userHit.cat, w);
      known.add(w);
      continue;
    }
    // user dict stem match (RU inflections: зале/залом -> зал)
    let userStemMatched = false;
    for (const [ru, entry] of userSingles) {
      const stem = ru.length > 4 ? ru.slice(0, ru.length - 1) : ru;
      if (
        stem.length >= 3 &&
        w.startsWith(stem) &&
        w.length - stem.length <= 3
      ) {
        add(entry.en, entry.cat, w);
        known.add(w);
        userStemMatched = true;
        break;
      }
    }
    if (userStemMatched) continue;
    // ambiguous term already resolved by user dict? handled above; else defer to ambiguity list
    if (AMB[w]) {
      known.add(w);
      continue;
    }
    // English alias (EN scene text support)
    const aliasHit = EN_ALIASES[w] ? NM[EN_ALIASES[w]] : undefined;
    if (aliasHit) {
      add(aliasHit.en, aliasHit.cat, w);
      known.add(w);
      continue;
    }
    // exact / latinized
    const candidates = [w, translitToCyr(w)];
    let matched = false;
    for (const c of candidates) {
      const hit = NM[c];
      if (hit) {
        add(hit.en, hit.cat, w);
        known.add(w);
        matched = true;
        break;
      }
    }
    if (matched) continue;
    // loose stem prefix (RU inflections: закатом/закате -> закат)
    for (const [ru, entry] of nmSingles) {
      const stem = ru.length > 4 ? ru.slice(0, ru.length - 1) : ru;
      if (stem.length >= 4 && candidates.some((c) => c.startsWith(stem))) {
        add(entry.en, entry.cat, w);
        known.add(w);
        matched = true;
        break;
      }
    }
    if (matched) continue;
    // fuzzy (typos): Levenshtein <= 1 for words of 5+ chars
    if (w.length >= 5) {
      for (const [ru, entry] of nmSingles) {
        if (
          ru.length >= 5 &&
          candidates.some((c) => levenshtein(c, ru, 1) <= 1)
        ) {
          add(entry.en, entry.cat, w);
          known.add(w);
          break;
        }
      }
    }
  }

  // 3) Regex RULES on the raw text
  for (const { re, tag, cat } of RULES) {
    if (re.test(text) && !ignored.has(tag)) {
      if (!found.has(tag)) found.set(tag, { cat, source: tag });
    }
  }

  // 4) Ambiguity resolver: surface unresolved ambiguous terms as choices
  const ambiguities: Ambiguity[] = [];
  for (const [term, { options }] of Object.entries(AMB)) {
    // Word-boundary match with a short inflection tail: «зале» fires,
    // but «спортзале» does not (already handled by the NM dictionary).
    const hit = words.some(
      (w) => w === term || (w.startsWith(term) && w.length - term.length <= 3),
    );
    if (!hit) continue;
    if (user.entries[term]) continue; // already resolved
    if (options.some((o) => ignored.has(o.en))) continue;
    ambiguities.push({ term, options });
  }

  // 5) Unknown meaningful words: candidates for LLM translation into tags.
  // Structural/meta words that never make useful visual tags.
  const UNKNOWN_NOISE = new Set([
    "девушка",
    "девушки",
    "девушкой",
    "женщина",
    "парень",
    "взгляд",
    "взглядом",
    "при",
    "говорит",
    "камера",
    "камеру",
    "камерой",
    "окно",
    "окна",
    "окне",
    "окном",
    "ночного",
    "ночью",
    "girl",
    "woman",
    "guy",
    "look",
    "looks",
    "looking",
    "mood",
    "style",
    "camera",
    "lights",
    "light",
    "night",
    "talking",
    "talks",
  ]);
  const unknownWords: string[] = [];
  for (const w of words) {
    if (known.has(w)) continue;
    if (
      ambiguities.some(
        (a) =>
          w === a.term ||
          (w.startsWith(a.term) && w.length - a.term.length <= 3),
      )
    ) {
      continue;
    }
    if (w.length < 3) continue;
    if (!/^[a-zа-яё-]+$/i.test(w)) continue;
    if (UNKNOWN_NOISE.has(w)) continue;
    if (RULES.some(({ re }) => re.test(w))) continue;
    if (unknownWords.includes(w)) continue;
    unknownWords.push(w);
    if (unknownWords.length >= 6) break;
  }

  const tags = Array.from(found.keys());
  const tagCats: Record<string, TagCat> = {};
  const tagSources: Record<string, string> = {};
  for (const [tag, meta] of found) {
    tagCats[tag] = meta.cat;
    tagSources[tag] = meta.source;
  }
  const pick = (cat: TagCat) =>
    tags.filter((tg) => tagCats[tg] === cat).join(", ");

  return {
    location: pick("location"),
    lighting: pick("lighting"),
    camera: pick("camera"),
    pose: pick("pose"),
    outfit: pick("outfit"),
    mood: pick("mood"),
    tags,
    tagCats,
    tagSources,
    ambiguities,
    unknown: unknownWords,
  };
}
