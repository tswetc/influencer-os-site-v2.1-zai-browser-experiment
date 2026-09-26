import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { providerSwitchPatch } from "@/lib/provider-settings";
import type { CharacterPassport, Settings } from "@/lib/types";

const idbData = vi.hoisted(() => new Map<string, unknown>());

vi.mock("@/lib/idb", () => ({
  idbAvailable: () => true,
  idbGet: async <T>(key: string): Promise<T | null> =>
    (idbData.get(key) as T | undefined) ?? null,
  idbSet: async (key: string, value: unknown): Promise<boolean> => {
    idbData.set(key, value);
    return true;
  },
  idbDel: async (key: string): Promise<void> => {
    idbData.delete(key);
  },
}));

import {
  CURRENT_SCHEMA,
  DEFAULT_SETTINGS,
  deletePassportVersions,
  importBackup,
  loadFavorites,
  loadHistory,
  loadPassportVersions,
  loadPresets,
  loadScenes,
  loadSettings,
  loadUserDict,
  pushPassportVersion,
  saveScenes,
  saveSettings,
  validateBackup,
  validatePassport,
} from "@/lib/storage";

class MemoryStorage {
  private data = new Map<string, string>();
  get length() {
    return this.data.size;
  }
  clear() {
    this.data.clear();
  }
  getItem(key: string) {
    return this.data.get(key) ?? null;
  }
  key(index: number) {
    return Array.from(this.data.keys())[index] ?? null;
  }
  removeItem(key: string) {
    this.data.delete(key);
  }
  setItem(key: string, value: string) {
    this.data.set(key, value);
  }
}

const localStorageMock = new MemoryStorage();

function passport(overrides: Partial<CharacterPassport> = {}): CharacterPassport {
  return {
    schemaVersion: CURRENT_SCHEMA,
    id: "char-1",
    name: "Test",
    createdAt: "2026-08-11T00:00:00.000Z",
    updatedAt: "2026-08-11T00:00:00.000Z",
    identity: { full: "full", mid: "mid", micro: "micro" },
    device: "phone",
    anomalyLock: { checkboxes: [], freeText: "", json: {} },
    faceAdherence: { static: 0.8, motion: 0.6 },
    referencePhotos: [],
    visionSummary: "",
    ...overrides,
  };
}

beforeEach(() => {
  idbData.clear();
  localStorageMock.clear();
  Object.assign(globalThis, {
    window: globalThis,
    localStorage: localStorageMock,
  });
});

afterEach(() => {
  localStorageMock.clear();
});

describe("provider switching", () => {
  it("clears OpenAI key/model when switching to Anthropic", () => {
    const current: Settings = {
      ...DEFAULT_SETTINGS,
      provider: "openai",
      apiKey: "TEST_KEY",
      model: "gpt-test",
    };
    const next = {
      ...current,
      ...providerSwitchPatch(current.provider, "anthropic"),
    };
    expect(next.provider).toBe("anthropic");
    expect(next.apiKey).toBe("");
    expect(next.model).toBe("");
  });

  it("clears an OpenRouter custom model slug when switching to OpenAI", () => {
    const current: Settings = {
      ...DEFAULT_SETTINGS,
      provider: "openrouter",
      apiKey: "OR_KEY",
      model: "vendor/custom-model:free",
    };
    const next = {
      ...current,
      ...providerSwitchPatch(current.provider, "openai"),
    };
    expect(next.model).toBe("");
    expect(next.apiKey).toBe("");
  });

  it("does not carry an OpenAI key into Custom and preserves the endpoint", () => {
    const current: Settings = {
      ...DEFAULT_SETTINGS,
      provider: "openai",
      apiKey: "TEST_KEY",
      model: "gpt-test",
      customEndpoint: "https://example.test/v1",
    };
    const next = {
      ...current,
      ...providerSwitchPatch(current.provider, "custom"),
    };
    expect(next.provider).toBe("custom");
    expect(next.apiKey).toBe("");
    expect(next.model).toBe("");
    expect(next.customEndpoint).toBe("https://example.test/v1");
  });

  it("does nothing when provider did not actually change", () => {
    expect(providerSwitchPatch("openai", "openai")).toBeNull();
  });
});

describe("backup validation/import", () => {
  const baseBackup = {
    app: "Influencer OS",
    schemaVersion: CURRENT_SCHEMA,
    exportedAt: "2026-08-11T00:00:00.000Z",
    settings: { ...DEFAULT_SETTINGS },
    characters: [],
    scenes: [],
    history: [],
    favorites: [],
  };

  it("rejects malformed top-level collection/object shapes", () => {
    expect(validateBackup({ ...baseBackup, characters: "oops" })).toBeNull();
    expect(validateBackup({ ...baseBackup, settings: "oops" })).toBeNull();
    expect(validateBackup({ ...baseBackup, history: "oops" })).toBeNull();
    expect(validateBackup({ ...baseBackup, favorites: "oops" })).toBeNull();
    expect(validateBackup({ ...baseBackup, scenes: "oops" })).toBeNull();
    expect(validateBackup({ ...baseBackup, presets: "oops" })).toBeNull();
  });

  it("rejects null or malformed elements inside imported collections", () => {
    expect(validateBackup({ ...baseBackup, characters: [null] })).toBeNull();
    expect(validateBackup({ ...baseBackup, history: [null] })).toBeNull();
    expect(validateBackup({ ...baseBackup, favorites: [null] })).toBeNull();
    expect(validateBackup({ ...baseBackup, scenes: [null] })).toBeNull();
    expect(validateBackup({ ...baseBackup, presets: [null] })).toBeNull();
    expect(
      validateBackup({ ...baseBackup, history: [{ id: "broken" }] }),
    ).toBeNull();
    expect(
      validateBackup({
        ...baseBackup,
        characters: [{ ...passport(), referencePhotos: [null] }],
      }),
    ).toBeNull();
    expect(
      validateBackup({ ...baseBackup, characters: [passport()] }),
    ).not.toBeNull();
  });

  it("rejects a future unsupported schemaVersion", () => {
    expect(
      validateBackup({ ...baseBackup, schemaVersion: CURRENT_SCHEMA + 1 }),
    ).toBeNull();
  });

  it("rejects invalid settings provider, theme, and language semantics", () => {
    expect(
      validateBackup({
        ...baseBackup,
        settings: { ...DEFAULT_SETTINGS, provider: 123 },
      }),
    ).toBeNull();
    expect(
      validateBackup({
        ...baseBackup,
        settings: { ...DEFAULT_SETTINGS, provider: "invalid" },
      }),
    ).toBeNull();
    expect(
      validateBackup({
        ...baseBackup,
        settings: { ...DEFAULT_SETTINGS, theme: "banana" },
      }),
    ).toBeNull();
    expect(
      validateBackup({
        ...baseBackup,
        settings: { ...DEFAULT_SETTINGS, language: "de" },
      }),
    ).toBeNull();
  });

  it("rejects malformed settings field types", () => {
    const invalidSettings = [
      { ...DEFAULT_SETTINGS, schemaVersion: "1" },
      { ...DEFAULT_SETTINGS, apiKey: 123 },
      { ...DEFAULT_SETTINGS, model: 123 },
      { ...DEFAULT_SETTINGS, customEndpoint: 123 },
      { ...DEFAULT_SETTINGS, onboarded: "yes" },
      { ...DEFAULT_SETTINGS, lastBackupAt: 123 },
    ];
    for (const settings of invalidSettings) {
      expect(validateBackup({ ...baseBackup, settings })).toBeNull();
    }
  });

  it("rejects malformed user dictionary semantics", () => {
    expect(
      validateBackup({
        ...baseBackup,
        userdict: {
          schemaVersion: CURRENT_SCHEMA,
          entries: [],
          ignored: [],
        },
      }),
    ).toBeNull();
    expect(
      validateBackup({
        ...baseBackup,
        userdict: {
          schemaVersion: CURRENT_SCHEMA,
          entries: {},
          ignored: {},
        },
      }),
    ).toBeNull();
    expect(
      validateBackup({
        ...baseBackup,
        userdict: {
          schemaVersion: CURRENT_SCHEMA,
          entries: { broken: { en: 123, cat: "location" } },
          ignored: [],
        },
      }),
    ).toBeNull();
    expect(
      validateBackup({
        ...baseBackup,
        userdict: {
          schemaVersion: CURRENT_SCHEMA,
          entries: { broken: { en: "value", cat: "banana" } },
          ignored: [],
        },
      }),
    ).toBeNull();
  });

  it("rejects unknown engine ids in all engine-bearing backup collections", () => {
    const history = {
      id: "history-1",
      engine: "garbage",
      mode: "photo",
      scenePreview: "scene",
      prompt: "prompt",
      createdAt: "2026-08-11T00:00:00.000Z",
    };
    const scene = {
      id: "scene-1",
      name: "Scene",
      text: "scene",
      mode: "photo",
      engine: "garbage",
      createdAt: "2026-08-11T00:00:00.000Z",
    };
    const preset = {
      id: "preset-1",
      name: "Preset",
      style: [],
      realism: [],
      capture: { cap: "", opt: "", expo: [], imperf: [], film: "" },
      engine: "garbage",
      mode: "photo",
    };

    expect(validateBackup({ ...baseBackup, history: [history] })).toBeNull();
    expect(validateBackup({ ...baseBackup, favorites: [history] })).toBeNull();
    expect(validateBackup({ ...baseBackup, scenes: [scene] })).toBeNull();
    expect(validateBackup({ ...baseBackup, presets: [preset] })).toBeNull();
  });

  it("keeps a correct existing v1 backup importable", async () => {
    const validHistory = {
      id: "history-valid",
      engine: "nano_pro" as const,
      mode: "photo" as const,
      scenePreview: "scene",
      prompt: "prompt",
      createdAt: "2026-08-11T00:00:00.000Z",
    };
    const validScene = {
      id: "scene-valid",
      name: "Scene",
      text: "scene",
      mode: "photo" as const,
      engine: "nano_pro" as const,
      createdAt: "2026-08-11T00:00:00.000Z",
    };
    const validPreset = {
      id: "preset-valid",
      name: "Preset",
      style: [],
      realism: [],
      capture: { cap: "", opt: "", expo: [], imperf: [], film: "" },
      engine: "nano_pro" as const,
      mode: "photo" as const,
    };
    const validUserDict = {
      schemaVersion: CURRENT_SCHEMA,
      entries: {
        cafe: { en: "cafe", cat: "location" as const },
      },
      ignored: ["ignored-tag"],
    };
    const backup = validateBackup({
      ...baseBackup,
      history: [validHistory],
      favorites: [validHistory],
      scenes: [validScene],
      presets: [validPreset],
      userdict: validUserDict,
    });

    expect(backup).not.toBeNull();
    await importBackup(backup!, "replace");
    expect(await loadHistory()).toEqual([validHistory]);
    expect(await loadFavorites()).toEqual([validHistory]);
    expect(loadScenes()).toEqual([validScene]);
    expect(loadPresets()).toEqual([validPreset]);
    expect(loadUserDict()).toEqual(validUserDict);
  });

  it("does not mutate storage when importBackup receives invalid data directly", async () => {
    const existingScene = {
      id: "existing-scene",
      name: "Existing",
      text: "keep",
      mode: "photo" as const,
      engine: "nano_pro" as const,
      createdAt: "2026-08-11T00:00:00.000Z",
    };
    saveScenes([existingScene]);
    saveSettings({ ...DEFAULT_SETTINGS, theme: "dark" });

    await importBackup(
      {
        ...baseBackup,
        settings: { ...DEFAULT_SETTINGS, theme: "banana" },
        scenes: [],
      } as unknown as Parameters<typeof importBackup>[0],
      "replace",
    );

    expect(loadScenes()).toEqual([existingScene]);
    expect(loadSettings().theme).toBe("dark");
  });

  it("merges imported scenes by id instead of dropping them", async () => {
    const currentScene = {
      id: "scene-current",
      name: "Current scene",
      text: "current",
      mode: "photo" as const,
      engine: "nano_pro" as const,
      createdAt: "2026-08-11T00:00:00.000Z",
    };
    const importedScene = {
      id: "scene-imported",
      name: "Imported scene",
      text: "imported",
      mode: "video" as const,
      engine: "kling_3" as const,
      createdAt: "2026-08-11T01:00:00.000Z",
    };
    saveScenes([currentScene]);

    const backup = validateBackup({
      ...baseBackup,
      scenes: [importedScene],
    });
    expect(backup).not.toBeNull();

    await importBackup(backup!, "merge");
    expect(loadScenes()).toEqual([currentScene, importedScene]);
  });

  it("reloads scenes and resets a missing active Passport after Replace", () => {
    const source = readFileSync("app/app/page.tsx", "utf8");
    expect(source).toContain("setSavedScenes(loadScenes())");
    expect(source).toContain('if (modeChoice === "replace")');
    expect(source).toContain("nextCharacters.find((c) => c.id === passport.id)");
    expect(source).toContain("setPassport(emptyPassport())");
    expect(source).toContain("setPassportVersions([])");
    expect(source).toContain("setUseCharacter(false)");
  });

  it("clears the current API key after importing another provider", async () => {
    saveSettings({
      ...DEFAULT_SETTINGS,
      provider: "openai",
      apiKey: "OLD_OPENAI_KEY",
      model: "gpt-test",
    });

    const { apiKey: _ignored, ...safeSettings } = {
      ...DEFAULT_SETTINGS,
      provider: "anthropic" as const,
      model: "claude-test",
    };
    const backup = validateBackup({
      ...baseBackup,
      settings: safeSettings,
    });
    expect(backup).not.toBeNull();

    await importBackup(backup!, "replace");
    const settings = loadSettings();
    expect(settings.provider).toBe("anthropic");
    expect(settings.apiKey).toBe("");
    expect(settings.model).toBe("claude-test");
  });
});

describe("passport validation", () => {
  it("rejects identity with the wrong shape without throwing", () => {
    const raw = { ...passport(), identity: "oops" };
    expect(() => validatePassport(raw)).not.toThrow();
    expect(validatePassport(raw)).toBeNull();
  });

  it("rejects malformed nested reference photos and Canon arrays", () => {
    expect(
      validatePassport({ ...passport(), referencePhotos: [null] }),
    ).toBeNull();
    expect(
      validatePassport({
        ...passport(),
        canon: {
          schemaVersion: CURRENT_SCHEMA,
          whoSheIs: "test",
          place: [null],
          objects: [],
          homeWorld: "A",
          favoritePacks: [],
          voiceStyle: "test",
          voiceWords: [],
          habits: [],
        },
      }),
    ).toBeNull();
  });

  it("accepts a structurally valid passport", () => {
    expect(validatePassport(passport())).toEqual(passport());
  });
});

describe("passport version cascade delete", () => {
  it("removes saved version history for the deleted character id", async () => {
    const p = passport();
    await pushPassportVersion(p);
    expect(await loadPassportVersions(p.id)).toHaveLength(1);

    await deletePassportVersions(p.id);

    expect(await loadPassportVersions(p.id)).toEqual([]);
  });
});
