// Typed storage layer. Small data stays in localStorage; HEAVY data
// (characters, history, favorites, passport versions) lives in IndexedDB
// (Fix Pack 10, C3) with a one-time localStorage migration.
// schemaVersion migrations, quota guard, export/import.

import { idbAvailable, idbDel, idbGet, idbSet } from "./idb";
import type {
  CharacterPassport,
  HistoryRecord,
  PassportVersion,
  Preset,
  Settings,
  UserDict,
  SavedScene,
} from "./types";

const KEYS = {
  settings: "ios_settings",
  characters: "ios_characters",
  scenes: "ios_scenes",
  history: "ios_history",
  favorites: "ios_favorites",
  last: "ios_last",
  presets: "ios_presets",
  userdict: "ios_userdict",
} as const;

export const CURRENT_SCHEMA = 1;
const HISTORY_CAP = 100;
export const PASSPORT_VERSIONS_CAP = 10;

// --- Low-level helpers -------------------------------------------------------

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Quota guard: returns false when write fails (near limit) instead of crashing. */
function write(key: string, value: unknown): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** Approximate total localStorage usage in bytes. */
export function storageUsage(): number {
  if (typeof window === "undefined") return 0;
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k) continue;
    total += k.length + (localStorage.getItem(k)?.length || 0);
  }
  return total * 2; // UTF-16
}

/** Soft ceiling before we warn - most browsers cap localStorage near 5MB. */
export const STORAGE_SOFT_LIMIT_BYTES = 4.2 * 1024 * 1024;

export function storageNearLimit(): boolean {
  return storageUsage() > STORAGE_SOFT_LIMIT_BYTES;
}

// --- Heavy data layer (Fix Pack 10, C3) ---------------------------------------
// IndexedDB first. A value still sitting in localStorage is migrated over once
// and removed from localStorage. No IndexedDB (rare) => localStorage fallback.

async function readHeavy<T>(key: string, fallback: T): Promise<T> {
  if (!idbAvailable()) return read(key, fallback);
  const fromIdb = await idbGet<T>(key);
  if (fromIdb !== null) return fromIdb;
  const legacy = read<T | null>(key, null);
  if (legacy !== null) {
    await idbSet(key, legacy);
    try {
      localStorage.removeItem(key);
    } catch {
      // best effort
    }
    return legacy;
  }
  return fallback;
}

async function writeHeavy(key: string, value: unknown): Promise<boolean> {
  if (!idbAvailable()) return write(key, value);
  return idbSet(key, value);
}

// --- migrate() ---------------------------------------------------------------

/** Lifts data v1 -> v2 -> ... without losing unknown fields. */
export function migrate<T extends { schemaVersion?: number }>(data: T): T {
  const v = data.schemaVersion ?? 1;
  // Future: chain per-version transforms here (v1->v2, v2->v3, ...)
  if (v < CURRENT_SCHEMA) {
    return { ...data, schemaVersion: CURRENT_SCHEMA };
  }
  return data;
}

// --- Settings ----------------------------------------------------------------

export const DEFAULT_SETTINGS: Settings = {
  schemaVersion: CURRENT_SCHEMA,
  language: null,
  theme: "light",
  provider: "anthropic",
  apiKey: "",
  model: "",
  customEndpoint: "",
  onboarded: false,
};

// --- User dictionary (learn-from-edits, augments the parser canon) -----------

export const DEFAULT_USER_DICT: UserDict = {
  schemaVersion: CURRENT_SCHEMA,
  entries: {},
  ignored: [],
};

export function loadUserDict(): UserDict {
  const raw = read<Partial<UserDict>>(KEYS.userdict, {});
  return migrate({
    ...DEFAULT_USER_DICT,
    ...raw,
    entries: raw.entries && typeof raw.entries === "object" ? raw.entries : {},
    ignored: Array.isArray(raw.ignored) ? raw.ignored : [],
  }) as UserDict;
}

export function saveUserDict(d: UserDict): boolean {
  return write(KEYS.userdict, d);
}

export function loadSettings(): Settings {
  return migrate({
    ...DEFAULT_SETTINGS,
    ...read<Partial<Settings>>(KEYS.settings, {}),
  }) as Settings;
}

export function saveSettings(s: Settings): boolean {
  return write(KEYS.settings, s);
}

// --- Characters (IndexedDB since Fix Pack 10) ---------------------------------

export async function loadCharacters(): Promise<CharacterPassport[]> {
  const list = await readHeavy<CharacterPassport[]>(KEYS.characters, []);
  return list.map((c) => migrate(c));
}

export async function saveCharacters(
  list: CharacterPassport[],
): Promise<boolean> {
  return writeHeavy(KEYS.characters, list);
}

// --- Passport versions (Fix Pack 10, B3) ---------------------------------------

function versionsKey(characterId: string): string {
  return `ios_passport_versions:${characterId}`;
}

/** Pure helper (unit-testable): newest first, no duplicate snapshots, capped. */
export function appendVersion(
  list: PassportVersion[],
  passport: CharacterPassport,
  cap = PASSPORT_VERSIONS_CAP,
): PassportVersion[] {
  const snapshot = JSON.stringify(passport);
  if (list[0] && JSON.stringify(list[0].passport) === snapshot) return list;
  const v: PassportVersion = {
    id: `${passport.id}_${Date.now().toString(36)}_${list.length}`,
    savedAt: new Date().toISOString(),
    name: passport.name || "unnamed",
    passport: JSON.parse(snapshot) as CharacterPassport,
  };
  return [v, ...list].slice(0, cap);
}

export async function loadPassportVersions(
  characterId: string,
): Promise<PassportVersion[]> {
  return readHeavy<PassportVersion[]>(versionsKey(characterId), []);
}

export async function pushPassportVersion(
  passport: CharacterPassport,
): Promise<PassportVersion[]> {
  const list = appendVersion(await loadPassportVersions(passport.id), passport);
  await writeHeavy(versionsKey(passport.id), list);
  return list;
}

/** Remove all stored version snapshots for a deleted character. */
export async function deletePassportVersions(
  characterId: string,
): Promise<void> {
  const key = versionsKey(characterId);
  if (idbAvailable()) await idbDel(key);
  if (typeof window !== "undefined") {
    try {
      // Also remove a never-migrated legacy copy so it cannot be resurrected.
      localStorage.removeItem(key);
    } catch {
      // best effort
    }
  }
}

// --- History / favorites (IndexedDB since Fix Pack 10) -------------------------

export async function loadHistory(): Promise<HistoryRecord[]> {
  return readHeavy<HistoryRecord[]>(KEYS.history, []);
}

export async function pushHistoryMany(
  recs: HistoryRecord[],
): Promise<HistoryRecord[]> {
  const list = [...recs, ...(await loadHistory())].slice(0, HISTORY_CAP);
  await writeHeavy(KEYS.history, list);
  return list;
}

export async function pushHistory(
  rec: HistoryRecord,
): Promise<HistoryRecord[]> {
  return pushHistoryMany([rec]);
}

export async function saveHistory(list: HistoryRecord[]): Promise<boolean> {
  return writeHeavy(KEYS.history, list.slice(0, HISTORY_CAP));
}

// --- Hit journal (Fix Pack 13) -------------------------------------------------

/** Set or clear the hit/miss mark on one history record. */
export async function setHistoryOutcome(
  id: string,
  outcome: "hit" | "miss" | null,
): Promise<HistoryRecord[]> {
  const list = (await loadHistory()).map((r) =>
    r.id === id ? { ...r, outcome: outcome ?? undefined } : r,
  );
  await writeHeavy(KEYS.history, list);
  return list;
}

export interface OutcomeStats {
  rated: number;
  hits: number;
  byEngine: Record<string, { rated: number; hits: number }>;
}

/** Pure helper (unit-testable): counts only records the user actually rated. */
export function outcomeStats(history: HistoryRecord[]): OutcomeStats {
  const stats: OutcomeStats = { rated: 0, hits: 0, byEngine: {} };
  for (const r of history) {
    if (r.outcome !== "hit" && r.outcome !== "miss") continue;
    stats.rated += 1;
    if (r.outcome === "hit") stats.hits += 1;
    const e = (stats.byEngine[r.engine] ??= { rated: 0, hits: 0 });
    e.rated += 1;
    if (r.outcome === "hit") e.hits += 1;
  }
  return stats;
}

export async function loadFavorites(): Promise<HistoryRecord[]> {
  return readHeavy<HistoryRecord[]>(KEYS.favorites, []);
}

export async function saveFavorites(list: HistoryRecord[]): Promise<boolean> {
  return writeHeavy(KEYS.favorites, list);
}

// --- Presets -----------------------------------------------------------------

export function loadPresets(): Preset[] {
  return read<Preset[]>(KEYS.presets, []);
}

export function savePresets(list: Preset[]): boolean {
  return write(KEYS.presets, list);
}

// --- Scene library (Fix Pack 9, A4) -------------------------------------------

export function loadScenes(): SavedScene[] {
  return read<SavedScene[]>(KEYS.scenes, []);
}

export function saveScenes(list: SavedScene[]): boolean {
  return write(KEYS.scenes, list);
}

// --- Last draft (crash recovery) ----------------------------------------------

export interface LastDraft {
  sceneText: string;
  createdAt: string;
  prompt?: string;
}

export function loadLast(): LastDraft | null {
  return read<LastDraft | null>(KEYS.last, null);
}

export function saveLast(d: LastDraft): boolean {
  return write(KEYS.last, d);
}

export function clearLast(): void {
  if (typeof window !== "undefined") localStorage.removeItem(KEYS.last);
}

// --- Backup reminder (Fix Pack 13) ----------------------------------------------

/**
 * Pure helper (unit-testable): the reminder fires only when there is real data
 * to lose (2+ characters or 30+ history records) and the last backup is absent,
 * unparseable or older than 14 days.
 */
export function backupDue(
  lastBackupAt: string | undefined,
  characterCount: number,
  historyCount: number,
  now: number = Date.now(),
): boolean {
  if (characterCount < 2 && historyCount < 30) return false;
  if (!lastBackupAt) return true;
  const then = Date.parse(lastBackupAt);
  if (Number.isNaN(then)) return true;
  return now - then > 14 * 24 * 60 * 60 * 1000;
}

// --- Export / import ------------------------------------------------------------

export interface BackupFile {
  app: "Influencer OS";
  schemaVersion: number;
  exportedAt: string;
  settings: Omit<Settings, "apiKey"> & { apiKey?: string };
  characters: CharacterPassport[];
  scenes: SavedScene[];
  history: HistoryRecord[];
  favorites: HistoryRecord[];
  userdict?: UserDict;
  // FP23: custom presets travel with the backup too.
  presets?: Preset[];
}

/** Everything a full backup carries (FP23: asserted by the self-check). */
export const BACKUP_FIELDS = [
  "settings",
  "characters",
  "scenes",
  "history",
  "favorites",
  "userdict",
  "presets",
] as const;

export async function exportBackup(includeKey = false): Promise<BackupFile> {
  const settings = loadSettings();
  const { apiKey, ...safe } = settings;
  return {
    app: "Influencer OS",
    schemaVersion: CURRENT_SCHEMA,
    exportedAt: new Date().toISOString(),
    settings: includeKey ? settings : safe,
    characters: await loadCharacters(),
    scenes: read(KEYS.scenes, []),
    history: await loadHistory(),
    favorites: await loadFavorites(),
    userdict: loadUserDict(),
    presets: read(KEYS.presets, []),
  };
}

export async function downloadBackup(includeKey = false): Promise<void> {
  const data = await exportBackup(includeKey);
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "influencer-os-backup.json";
  a.click();
  URL.revokeObjectURL(url);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (!isRecord(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function validSchemaVersion(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0 &&
    value <= CURRENT_SCHEMA
  );
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function validMode(value: unknown): value is "photo" | "video" {
  return value === "photo" || value === "video";
}

function validEngineId(value: unknown): boolean {
  return (
    value === "nano_pro" ||
    value === "kling_3" ||
    value === "seedance_2" ||
    value === "veo_scene" ||
    value === "veo_broll" ||
    value === "omni_flash"
  );
}

function validProvider(value: unknown): boolean {
  return (
    value === "anthropic" ||
    value === "openai" ||
    value === "gemini" ||
    value === "openrouter" ||
    value === "custom"
  );
}

function validLanguage(value: unknown): boolean {
  return value === null || value === "ru" || value === "en";
}

function validTheme(value: unknown): boolean {
  return value === "light" || value === "dark" || value === "contrast";
}

function validBackupSettings(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    validSchemaVersion(value.schemaVersion) &&
    validLanguage(value.language) &&
    validTheme(value.theme) &&
    validProvider(value.provider) &&
    (value.apiKey === undefined || typeof value.apiKey === "string") &&
    typeof value.model === "string" &&
    typeof value.customEndpoint === "string" &&
    typeof value.onboarded === "boolean" &&
    (value.lastBackupAt === undefined || typeof value.lastBackupAt === "string")
  );
}

const USERDICT_CATEGORIES = new Set([
  "location",
  "lighting",
  "camera",
  "pose",
  "outfit",
  "mood",
]);

function validUserDict(value: unknown): boolean {
  if (!isRecord(value) || !validSchemaVersion(value.schemaVersion)) return false;
  if (!isPlainRecord(value.entries) || !isStringArray(value.ignored)) {
    return false;
  }
  return Object.values(value.entries).every(
    (entry) =>
      isPlainRecord(entry) &&
      typeof entry.en === "string" &&
      typeof entry.cat === "string" &&
      USERDICT_CATEGORIES.has(entry.cat),
  );
}

function validReferencePhoto(value: unknown): boolean {
  if (!isRecord(value)) return false;
  const role = value.role;
  return (
    typeof value.id === "string" &&
    (role === "identity" ||
      role === "scene" ||
      role === "motion" ||
      role === "audio" ||
      role === "product") &&
    typeof value.slot === "number" &&
    Number.isFinite(value.slot) &&
    typeof value.angle === "string" &&
    typeof value.dataUrl === "string" &&
    typeof value.thumbUrl === "string" &&
    isStringArray(value.warnings) &&
    (value.visionJson === undefined || isRecord(value.visionJson))
  );
}

function validHistoryRecord(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    validEngineId(value.engine) &&
    validMode(value.mode) &&
    typeof value.scenePreview === "string" &&
    typeof value.prompt === "string" &&
    (value.negative === undefined || typeof value.negative === "string") &&
    typeof value.createdAt === "string" &&
    (value.outcome === undefined ||
      value.outcome === "hit" ||
      value.outcome === "miss")
  );
}

function validCaptureSelection(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    typeof value.cap === "string" &&
    typeof value.opt === "string" &&
    isStringArray(value.expo) &&
    isStringArray(value.imperf) &&
    typeof value.film === "string"
  );
}

function validPreset(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    isStringArray(value.style) &&
    isStringArray(value.realism) &&
    validCaptureSelection(value.capture) &&
    validEngineId(value.engine) &&
    validMode(value.mode)
  );
}

function validSavedScene(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.text === "string" &&
    validMode(value.mode) &&
    validEngineId(value.engine) &&
    typeof value.createdAt === "string"
  );
}

export function validateBackup(raw: unknown): BackupFile | null {
  if (!isRecord(raw)) return null;
  const d = raw;
  // Accept the canon name and the legacy lowercase name for backward compatibility.
  if (
    (d.app !== "Influencer OS" && d.app !== "influencer-os") ||
    !validSchemaVersion(d.schemaVersion)
  )
    return null;

  const collectionValidators = {
    characters: (value: unknown) => validatePassport(value) !== null,
    history: validHistoryRecord,
    favorites: validHistoryRecord,
    scenes: validSavedScene,
    presets: validPreset,
  } as const;
  for (const [field, validateItem] of Object.entries(collectionValidators)) {
    const value = d[field];
    if (value === undefined) continue;
    if (!Array.isArray(value) || !value.every(validateItem)) return null;
  }
  if (
    "settings" in d &&
    d.settings !== undefined &&
    !validBackupSettings(d.settings)
  ) {
    return null;
  }
  if (
    "userdict" in d &&
    d.userdict !== undefined &&
    !validUserDict(d.userdict)
  ) {
    return null;
  }

  return migrate({
    ...d,
    app: "Influencer OS",
  } as unknown as BackupFile & { schemaVersion: number }) as BackupFile;
}

/** Minimal structural guard for standalone Passport JSON imports. */
export function validatePassport(raw: unknown): CharacterPassport | null {
  if (!isRecord(raw) || !validSchemaVersion(raw.schemaVersion)) return null;
  if (
    typeof raw.id !== "string" ||
    typeof raw.name !== "string" ||
    typeof raw.createdAt !== "string" ||
    typeof raw.updatedAt !== "string" ||
    typeof raw.device !== "string" ||
    typeof raw.visionSummary !== "string"
  )
    return null;

  if (!isRecord(raw.identity)) return null;
  if (
    typeof raw.identity.full !== "string" ||
    typeof raw.identity.mid !== "string" ||
    typeof raw.identity.micro !== "string"
  )
    return null;

  if (!isRecord(raw.anomalyLock)) return null;
  if (
    !isStringArray(raw.anomalyLock.checkboxes) ||
    typeof raw.anomalyLock.freeText !== "string" ||
    !isRecord(raw.anomalyLock.json)
  )
    return null;

  if (!isRecord(raw.faceAdherence)) return null;
  if (
    typeof raw.faceAdherence.static !== "number" ||
    !Number.isFinite(raw.faceAdherence.static) ||
    typeof raw.faceAdherence.motion !== "number" ||
    !Number.isFinite(raw.faceAdherence.motion)
  )
    return null;

  if (
    !Array.isArray(raw.referencePhotos) ||
    !raw.referencePhotos.every(validReferencePhoto)
  )
    return null;

  if (raw.canon !== undefined) {
    if (!isRecord(raw.canon)) return null;
    const canonArrayFields = [
      "place",
      "objects",
      "favoritePacks",
      "voiceWords",
      "habits",
    ] as const;
    for (const field of canonArrayFields) {
      if (!isStringArray(raw.canon[field])) return null;
    }
    if (
      !validSchemaVersion(raw.canon.schemaVersion) ||
      typeof raw.canon.whoSheIs !== "string" ||
      (raw.canon.homeWorld !== "" &&
        raw.canon.homeWorld !== "A" &&
        raw.canon.homeWorld !== "B" &&
        raw.canon.homeWorld !== "C") ||
      typeof raw.canon.voiceStyle !== "string" ||
      (raw.canon.generatedAt !== undefined &&
        typeof raw.canon.generatedAt !== "string")
    )
      return null;
  }

  return migrate(raw as unknown as CharacterPassport);
}

export async function importBackup(
  backup: BackupFile,
  mode: "merge" | "replace",
): Promise<void> {
  const validated = validateBackup(backup);
  if (!validated) return;
  backup = validated;

  if (mode === "replace") {
    await saveCharacters(backup.characters || []);
    await saveHistory(backup.history || []);
    await saveFavorites(backup.favorites || []);
    write(KEYS.scenes, backup.scenes || []);
    if (backup.presets) write(KEYS.presets, backup.presets);
    if (backup.userdict) saveUserDict(backup.userdict);
  } else {
    const chars = await loadCharacters();
    const ids = new Set(chars.map((c) => c.id));
    await saveCharacters([
      ...chars,
      ...(backup.characters || []).filter((c) => !ids.has(c.id)),
    ]);
    const hist = await loadHistory();
    const hids = new Set(hist.map((h) => h.id));
    await saveHistory([
      ...(backup.history || []).filter((h) => !hids.has(h.id)),
      ...hist,
    ]);
    const fav = await loadFavorites();
    const fids = new Set(fav.map((f) => f.id));
    await saveFavorites([
      ...fav,
      ...(backup.favorites || []).filter((f) => !fids.has(f.id)),
    ]);
    if (backup.scenes) {
      const curScenes = loadScenes();
      const sceneIds = new Set(curScenes.map((scene) => scene.id));
      saveScenes([
        ...curScenes,
        ...backup.scenes.filter((scene) => !sceneIds.has(scene.id)),
      ]);
    }
    if (backup.presets) {
      const curP = read<Preset[]>(KEYS.presets, []);
      const pids = new Set(curP.map((p) => p.id));
      write(KEYS.presets, [
        ...curP,
        ...backup.presets.filter((p) => !pids.has(p.id)),
      ]);
    }
    if (backup.userdict) {
      const cur = loadUserDict();
      saveUserDict({
        schemaVersion: CURRENT_SCHEMA,
        // Current (local) mappings win over imported ones on merge.
        entries: { ...backup.userdict.entries, ...cur.entries },
        ignored: Array.from(
          new Set([...cur.ignored, ...(backup.userdict.ignored || [])]),
        ),
      });
    }
  }
  const current = loadSettings();
  saveSettings({
    ...current,
    ...backup.settings,
    apiKey: "",
    schemaVersion: CURRENT_SCHEMA,
  });
}

