// Core data model types for Influencer OS

export type Mode = "photo" | "video";

export type EngineId =
  | "nano_pro"
  | "kling_3"
  | "seedance_2"
  | "veo_scene"
  | "veo_broll"
  | "omni_flash";

export type VisionProvider =
  "anthropic" | "openai" | "gemini" | "openrouter" | "custom";

export type Lang = "ru" | "en";

export type IdentityLevel = "full" | "mid" | "micro";

export type RefRole = "identity" | "scene" | "motion" | "audio" | "product";

export interface ReferencePhoto {
  id: string;
  role: RefRole;
  slot: number; // 1-4 face, 5 pose/scene
  angle: string;
  dataUrl: string; // compressed working image (base64 jpeg)
  thumbUrl: string; // ~256px thumbnail
  warnings: string[]; // i18n keys of soft quality warnings
  visionJson?: Record<string, unknown>;
}

// Fix Pack 11.3 — the model's canon: six blocks that make the pools hers.
// Stored ON the passport, so it rides versions, export and import for free.
export interface ModelCanon {
  schemaVersion: number;
  /** Who she is: archetype + vibe, 1–2 short EN phrases → MOOD. */
  whoSheIs: string;
  /** Her place: city + home type + interior phrases (EN) → cutaway scenes. */
  place: string[];
  /** 5–7 personal objects (EN, "her ...") → prop axis + cutaways. */
  objects: string[];
  /** Home world + favorite packs → library defaults. */
  homeWorld: "A" | "B" | "C" | "";
  favoritePacks: string[];
  /** Caption voice: style line + her own words/phrases → captions. */
  voiceStyle: string;
  voiceWords: string[];
  /** 2–3 body habits in frame (EN) → pose axis. */
  habits: string[];
  generatedAt?: string;
}

export interface CharacterPassport {
  schemaVersion: number;
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  identity: { full: string; mid: string; micro: string };
  device: string;
  anomalyLock: {
    checkboxes: string[];
    freeText: string;
    json: Record<string, unknown>;
  };
  faceAdherence: { static: number; motion: number };
  referencePhotos: ReferencePhoto[];
  visionSummary: string;
  /** Fix Pack 11.3: the model's canon; absent or empty = pack defaults. */
  canon?: ModelCanon;
}

export interface CaptureSelection {
  cap: string; // key of CAP or ""
  opt: string; // key of OPT or ""
  expo: string[]; // keys of EXPO
  imperf: string[]; // keys of IMPERF
  film: string; // key of FILM or ""
}

export interface SceneSpec {
  mode: Mode;
  engine: EngineId;
  subject: { characterId: string | null; identityLevel: IdentityLevel };
  location: string;
  lighting: string;
  camera: string;
  pose: string;
  outfit: string;
  /** Fix Pack 10 - B2: English product description injected into prompts. */
  product?: string;
  mood: string;
  capture: CaptureSelection;
  style: string[];
  realism: string[];
  /** Fix Pack 11: world layer A/B/C driving the mood suffix + film gate. */
  world?: "A" | "B" | "C";
  /** Fix Pack 11: technique id from lib/techniques.ts. */
  technique?: string;
  /** Fix Pack 12: modifier technique ids (Fragile / Deadpan) layered on top. */
  modifiers?: string[];
  motion: { action: string; intensity: number; cameraMove: string };
  audio: { dialogue: string; sfx: string; ambience: string };
  references: { role: RefRole; fileRef: string }[];
  confidence: Record<string, number>;
}

export interface BuildResult {
  prompt: string;
  /** Shot label for a carousel series (localized at build time). */
  label?: string;
  negative?: string;
  words?: number;
  underMin?: boolean; // true when the prompt is under the engine's minimum word budget
  // Fix Pack 11.2: shoot/feed frame metadata.
  role?: "hero" | "detail" | "cutaway" | "off";
  caption?: string; // caption in the world's voice; "" = post without caption
  day?: number; // posting-day mark inside a feed
  // Fix Pack 16: caption voice format mark (dump / sms / archive).
  voice?: string;
}

export interface HistoryRecord {
  id: string;
  engine: EngineId;
  mode: Mode;
  scenePreview: string;
  prompt: string;
  negative?: string;
  createdAt: string;
  /** Fix Pack 13: hit journal — did the platform accept this result? */
  outcome?: "hit" | "miss";
}

export interface Preset {
  id: string;
  name: string;
  style: string[];
  realism: string[];
  capture: CaptureSelection;
  engine: EngineId;
  mode: Mode;
}

export type Theme = "light" | "dark" | "contrast";

export interface Settings {
  schemaVersion: number;
  language: Lang | null; // null = auto
  theme: Theme;
  provider: VisionProvider;
  apiKey: string;
  model: string; // model slug override ("" = provider default); used by openrouter/custom
  customEndpoint: string; // OpenAI-compatible endpoint for provider "custom"
  onboarded: boolean;
  /** Fix Pack 13: ISO timestamp of the last backup export (for the reminder). */
  lastBackupAt?: string;
}

// Learn-from-edits: the user's own RU->EN mappings + tags they removed.
export interface UserDict {
  schemaVersion: number;
  entries: Record<
    string,
    {
      en: string;
      cat: "location" | "lighting" | "camera" | "pose" | "outfit" | "mood";
    }
  >;
  ignored: string[]; // English tags the user removed (never auto-suggest again)
}

// Fix Pack 9 - A4: a saved scene in the scene library (ios_scenes).
export interface SavedScene {
  id: string;
  name: string;
  text: string;
  mode: Mode;
  engine: EngineId;
  createdAt: string;
}

// Fix Pack 10 - B3: a snapshot of a character passport (rollback support).
export interface PassportVersion {
  id: string;
  savedAt: string;
  name: string;
  passport: CharacterPassport;
}

