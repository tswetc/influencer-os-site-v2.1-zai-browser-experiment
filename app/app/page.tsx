"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ConfirmGate } from "@/components/confirm-gate";
import { LicenseGate } from "@/components/license-gate";
import { CapturePresets } from "@/components/capture-presets";
import { EngineSelector, ModeToggle } from "@/components/engine-selector";
import { FrameSlots } from "@/components/frame-slots";
import { HistoryTabs } from "@/components/history-tabs";
import { MotionAudio } from "@/components/motion-audio";
import { NegativePanel, defaultNegative } from "@/components/negative-panel";
import { OutputCard } from "@/components/output-card";
import { VideoHub } from "@/components/video-hub";
import { AssistantChat } from "@/components/assistant-chat";
import { PassportEditor, emptyPassport } from "@/components/passport-editor";
import dynamic from "next/dynamic";
import { canonNudgeSeen, markCanonNudgeSeen } from "@/lib/canon";
import { ReferenceVision } from "@/components/reference-vision";
import { SceneField } from "@/components/scene-field";
import { SceneLibrary } from "@/components/scene-library";
import { SpotlightTour } from "@/components/spotlight-tour";
import { TOUR_STEPS } from "@/lib/tour";
import { StyleRealism } from "@/components/style-realism";
import { Card, Chip, Disclosure, Segmented } from "@/components/ui-bits";
import {
  type BuildOptions,
  ENGINES_WITH_NEGATIVE,
  VIDEO_ENGINES,
  buildPrompts,
} from "@/lib/engines";
import { TECHNIQUE_BY_ID } from "@/lib/techniques";
import { buildSeriesFlex, buildShoot } from "@/lib/shoot";
import { buildFeed, codexDetails, codexLine } from "@/lib/feed";
import { isDemoMode } from "@/lib/demo";
import { clicheAdvice } from "@/lib/cliche";
import { seasonNote, seasonPhrases } from "@/lib/season";
import {
  downloadPng,
  drawSeriesCard,
  nextEpisode,
} from "@/components/share-card";
import { WORLD_CODE } from "@/lib/quiz";
import { hintsOn, markHintSeen, setHintsOn } from "@/lib/hints";
import { type MultishotCount, buildMultishot } from "@/lib/multishot";
import { analyzeImagesCached, analyzeProductCached } from "@/lib/visionCache";
import { DEMO_CHARACTER, DEMO_SCENE_TEXT } from "@/lib/demo";
import { detectLang, t } from "@/lib/i18n";
import { type TagCat, parse } from "@/lib/parse";
import { emptySceneSpec, resolveLocation, uuid } from "@/lib/scene";
import { TEMPLATES, type SceneTemplate } from "@/lib/templates";
import {
  SCENE_PACKS,
  packSceneText,
  type PackScene,
  type ScenePack,
} from "@/lib/packs";
import {
  type BackupFile,
  DEFAULT_SETTINGS,
  DEFAULT_USER_DICT,
  downloadBackup,
  deletePassportVersions,
  importBackup,
  loadCharacters,
  loadFavorites,
  loadHistory,
  loadPassportVersions,
  loadLast,
  loadPresets,
  loadScenes,
  loadSettings,
  loadUserDict,
  pushHistoryMany,
  pushPassportVersion,
  saveCharacters,
  saveFavorites,
  saveHistory,
  saveLast,
  savePresets,
  saveScenes,
  saveSettings,
  saveUserDict,
  backupDue,
  outcomeStats,
  setHistoryOutcome,
  storageNearLimit,
  validateBackup,
} from "@/lib/storage";
import type {
  BuildResult,
  CharacterPassport,
  EngineId,
  HistoryRecord,
  Lang,
  Mode,
  Preset,
  ReferencePhoto,
  SavedScene,
  SceneSpec,
  Settings,
  Theme,
  UserDict,
  PassportVersion,
} from "@/lib/types";
import { critiquePrompt, enhanceScene, translateWords } from "@/lib/llm";
import { type LlmConfig, parseVisionText } from "@/lib/vision";
import { cn } from "@/lib/utils";
import { AntiDetectPanel } from "@/components/anti-detect-panel";
import { promptStrength } from "@/lib/strength";
import { diagnose } from "@/lib/doctor";
import { APP_VERSION } from "@/lib/changelog";
import { FMT_RANGE, SEED_PRESETS, type PromptFormat } from "@/lib/presets";
import { ActionBar } from "@/components/studio/action-bar";
import { AppBanners } from "@/components/studio/app-banners";
import { AppHeader } from "@/components/studio/app-header";
import { SettingsOverlay } from "@/components/studio/settings-overlay";
import { useUndoRedo } from "@/hooks/use-undo-redo";

// FP23: the canon editor (and the heavy pack texts it pulls in) is
// code-split away from the studio bundle and loads on demand.
const CanonEditor = dynamic(
  () => import("@/components/canon-editor").then((m) => m.CanonEditor),
  { ssr: false },
);

const VISION_FIELDS = [
  "location",
  "lighting",
  "camera",
  "pose",
  "outfit",
] as const;

function StudioPage() {
  // --- core state ------------------------------------------------------------
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [lang, setLang] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);
  const [userDict, setUserDict] = useState<UserDict>(DEFAULT_USER_DICT);

  const [mode, setMode] = useState<Mode>("photo");
  const [engine, setEngine] = useState<EngineId>("nano_pro");
  const [sceneText, setSceneText] = useState("");
  const [spec, setSpec] = useState<SceneSpec>(() => emptySceneSpec());
  const [photos, setPhotos] = useState<ReferencePhoto[]>([]);
  const [savedScenes, setSavedScenes] = useState<SavedScene[]>([]);
  const [negative, setNegative] = useState("");
  const [passport, setPassport] = useState<CharacterPassport>(() =>
    emptyPassport(),
  );
  const [characters, setCharacters] = useState<CharacterPassport[]>([]);
  const [useCharacter, setUseCharacter] = useState(false);

  // Trust gate
  const [visionApplied, setVisionApplied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState(false);
  // FP9 (C2): location conflict between scene text and scene reference
  const [locConflict, setLocConflict] = useState<{
    textLocation: string;
    refLocation: string;
  } | null>(null);
  // FP9 (A1): photo-to-video hub guidance state
  const [hubEngine, setHubEngine] = useState<EngineId | null>(null);
  // FP9 (A3): Veo first/last frame slots
  const [firstFrame, setFirstFrame] = useState<string | null>(null);
  const [lastFrame, setLastFrame] = useState<string | null>(null);

  // Generation
  const [variants, setVariants] = useState(1);
  // Fix Pack 11.2 (FP23: the format type and ranges moved to lib/presets).
  const [format, setFormat] = useState<PromptFormat>("single");
  const [fmtSize, setFmtSize] = useState(6);
  const [mixIds, setMixIds] = useState<string[]>([]);
  const [lastPack, setLastPack] = useState<ScenePack | null>(null);
  const [continuity, setContinuity] = useState(true);
  const [loose, setLoose] = useState(false);
  // Fix Pack 12: modifier layers (Fragile / Deadpan) on top of A/B packs.
  const [mods, setMods] = useState<string[]>([]);
  const [caps, setCaps] = useState(true);
  // FP22: the action-bar options popover (variants / compress / size / mix).
  const [optsOpen, setOptsOpen] = useState(false);
  const [feedFlagged, setFeedFlagged] = useState(false);
  const [frameSeeds, setFrameSeeds] = useState<Record<number, number>>({});
  const [hintsEnabled, setHintsEnabled] = useState(false);
  // Fix Pack 11.3: show canon nudge after first feed (exactly once).
  const [showCanonNudge, setShowCanonNudge] = useState(false);
  // Fix Pack 13: one-off character (temporary passport, never saved to library).
  const [oneOff, setOneOff] = useState(false);

  useEffect(() => {
    setHintsEnabled(hintsOn());
  }, []);

  function pickFormat(f: PromptFormat) {
    setFormat(f);
    if (f !== "single") setFmtSize(FMT_RANGE[f].def);
    markHintSeen("format");
  }

  function toggleMix(id: string) {
    setMixIds((cur) =>
      cur.includes(id)
        ? cur.filter((x) => x !== id)
        : cur.length >= 3
          ? cur
          : [...cur, id],
    );
  }

  const mixedWorldsPicked =
    new Set(
      mixIds
        .map((id) => SCENE_PACKS.find((p) => p.id === id)?.world)
        .filter(Boolean),
    ).size > 1;
  // FP10: multishot (A2), product slot (B2), cache note (C1), versions (B3).
  const [multishot, setMultishot] = useState<0 | MultishotCount>(0);
  const [productPhoto, setProductPhoto] = useState<ReferencePhoto | null>(null);
  const [cacheHits, setCacheHits] = useState(0);
  const [passportVersions, setPassportVersions] = useState<PassportVersion[]>(
    [],
  );

  // FP10 (B3): passport versions follow the selected character.
  useEffect(() => {
    void loadPassportVersions(passport.id).then(setPassportVersions);
  }, [passport.id]);
  const [compress, setCompress] = useState(false);
  const [results, setResults] = useState<BuildResult[]>([]);
  const [lastRecords, setLastRecords] = useState<HistoryRecord[]>([]);
  const [sceneHighlight, setSceneHighlight] = useState(false);

  // Collections
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [favorites, setFavorites] = useState<HistoryRecord[]>([]);
  const [presets, setPresets] = useState<Preset[]>([]);

  // Banners / dialogs
  const [storageWarn, setStorageWarn] = useState(false);
  // FP22: drafts restore silently at boot; the toast offers one-tap undo.
  const [restoredDraft, setRestoredDraft] = useState(false);
  const [pendingImport, setPendingImport] = useState<BackupFile | null>(null);
  const [importInvalid, setImportInvalid] = useState(false);
  const [onbStep, setOnbStep] = useState<number | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  // Fix Pack 21: the advanced section is lifted so the tour can open it;
  // the hotkey sheet toggles with "?".
  const [advOpen, setAdvOpen] = useState(false);
  const [hkOpen, setHkOpen] = useState(false);
  const [phIdx, setPhIdx] = useState(0);
  const [enhancing, setEnhancing] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [critic, setCritic] = useState<string | null>(null);
  const [criticBusy, setCriticBusy] = useState(false);

  const sceneRef = useRef<HTMLDivElement>(null);

  // --- boot ------------------------------------------------------------------
  useEffect(() => {
    const s = loadSettings();
    setSettings(s);
    setLang(s.language ?? detectLang());
    void loadCharacters().then(setCharacters);
    void loadHistory().then(setHistory);
    void loadFavorites().then(setFavorites);
    const p = loadPresets();
    if (p.length === 0) {
      savePresets(SEED_PRESETS);
      setPresets(SEED_PRESETS);
    } else {
      setPresets(p);
    }
    setUserDict(loadUserDict());
    setSavedScenes(loadScenes());
    // FP22: Apple-pattern silent restore - no question banner, undo instead.
    const last = loadLast();
    if (last) {
      setSceneText(last.sceneText);
      if (last.prompt) setResults([{ prompt: last.prompt }]);
      setRestoredDraft(true);
    }
    if (!s.onboarded) setOnbStep(0);
    setMounted(true);
  }, []);

  // Apply theme class to <html> (canon: light / dark / contrast)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "contrast");
    if (settings.theme === "dark" || settings.theme === "contrast") {
      root.classList.add(settings.theme);
    }
  }, [settings.theme]);

  // Keep <html lang> in sync with the rendered copy (a11y / screen readers).
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // FP22: the restore toast dismisses itself.
  useEffect(() => {
    if (!restoredDraft) return;
    const id = setTimeout(() => setRestoredDraft(false), 6000);
    return () => clearTimeout(id);
  }, [restoredDraft]);

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveSettings(next);
      return next;
    });
  }, []);

  function changeLang(l: Lang) {
    setLang(l);
    updateSettings({ language: l });
  }

  // Fix Pack 21 / FP23: undo/redo over generated results, now a reusable
  // hook. Any transition that replaces a non-empty results array pushes the
  // pre-change snapshot, so a good variant can't be lost.
  type UndoSnap = {
    sceneText: string;
    spec: SceneSpec;
    results: BuildResult[];
    negative: string;
    engine: EngineId;
    mode: Mode;
    format: PromptFormat;
    fmtSize: number;
    lastRecords: HistoryRecord[];
  };
  const {
    undo: undoResults,
    redo: redoResults,
    canUndo,
    canRedo,
  } = useUndoRedo<UndoSnap>({
    live: {
      sceneText,
      spec,
      results,
      negative,
      engine,
      mode,
      format,
      fmtSize,
      lastRecords,
    },
    results,
    getResults: (s) => s.results,
    apply: (s) => {
      setSceneText(s.sceneText);
      setSpec(s.spec);
      setResults(s.results);
      setNegative(s.negative);
      setEngine(s.engine);
      setMode(s.mode);
      setFormat(s.format);
      setFmtSize(s.fmtSize);
      setLastRecords(s.lastRecords);
      setHubEngine(null);
    },
  });

  // Fix Pack 13: hotkeys — Cmd/Ctrl+Enter generates, plain C copies the prompt.
  // Fix Pack 21: Cmd/Ctrl+Z / Shift+Z undo/redo a generation, 1–4 pick the
  // video engine, ? toggles the shortcut sheet. One listener reads live
  // state through a ref, so it never goes stale.
  const genRef = useRef<() => void>(() => {});
  const copyTextRef = useRef<string | null>(null);
  const hkRef = useRef<{
    pickEngine: (i: number) => void;
    undo: () => void;
    redo: () => void;
  }>({ pickEngine: () => {}, undo: () => {}, redo: () => {} });
  hkRef.current = {
    pickEngine: (i: number) => {
      const id = VIDEO_ENGINES[i]?.id as EngineId | undefined;
      if (mode === "video" && id) changeEngine(id);
    },
    undo: undoResults,
    redo: redoResults,
  };
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (document.querySelector('[aria-modal="true"]')) return;
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        genRef.current();
        return;
      }
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName;
      const editing =
        tag === "INPUT" || tag === "TEXTAREA" || Boolean(el?.isContentEditable);
      if (
        (e.metaKey || e.ctrlKey) &&
        !e.altKey &&
        (e.key === "z" || e.key === "Z" || e.key === "я" || e.key === "Я")
      ) {
        if (editing) return; // native text undo stays native
        e.preventDefault();
        if (e.shiftKey) hkRef.current.redo();
        else hkRef.current.undo();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (editing || (window.getSelection()?.toString().length ?? 0) > 0)
        return;
      if (e.key === "c" || e.key === "C" || e.key === "с" || e.key === "С") {
        if (copyTextRef.current)
          void navigator.clipboard.writeText(copyTextRef.current);
        return;
      }
      if (e.key === "?") {
        e.preventDefault();
        setHkOpen((v) => !v);
        return;
      }
      if (e.key >= "1" && e.key <= "9") {
        hkRef.current.pickEngine(Number(e.key) - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // --- scene parsing (live auto-tags) -----------------------------------------
  const parsed = useMemo(
    () => parse(sceneText, mode, userDict),
    [sceneText, mode, userDict],
  );

  useEffect(() => {
    // parse() only fills fields the user/Vision hasn't touched (no confidence entry)
    setSpec((prev) => {
      const next = { ...prev };
      for (const f of VISION_FIELDS) {
        if (prev.confidence[f] === undefined) next[f] = parsed[f];
      }
      return next;
    });
  }, [parsed]);

  useEffect(() => {
    if (sceneText.trim()) setSceneHighlight(false);
  }, [sceneText]);

  // --- learn-from-edits (user dictionary) --------------------------------------
  function removeTag(tag: string) {
    if (userDict.ignored.includes(tag)) return;
    const next: UserDict = { ...userDict, ignored: [...userDict.ignored, tag] };
    saveUserDict(next);
    setUserDict(next);
  }

  function resolveAmbiguity(term: string, en: string, cat: TagCat) {
    const next: UserDict = {
      ...userDict,
      entries: { ...userDict.entries, [term]: { en, cat } },
    };
    saveUserDict(next);
    setUserDict(next);
  }

  // --- mode / engine ----------------------------------------------------------
  function changeMode(m: Mode) {
    setMode(m);
    const e: EngineId =
      m === "photo" ? "nano_pro" : engine === "nano_pro" ? "kling_3" : engine;
    setEngine(e);
    setNegative(defaultNegative(e));
    setSpec((prev) => ({ ...prev, mode: m, engine: e }));
    setHubEngine(null);
    setResults([]);
  }

  function changeEngine(e: EngineId) {
    setEngine(e);
    setNegative(defaultNegative(e));
    setSpec((prev) => ({ ...prev, engine: e }));
    setHubEngine(null);
    setResults([]);
  }

  function applyTemplate(tpl: SceneTemplate) {
    changeMode(tpl.mode);
    changeEngine(tpl.engine);
    setSceneText(tpl.text[lang]);
  }

  // Rotate the example placeholder while the scene field is empty.
  useEffect(() => {
    if (sceneText) return;
    const id = setInterval(
      () => setPhIdx((i) => (i + 1) % TEMPLATES.length),
      6000,
    );
    return () => clearInterval(id);
  }, [sceneText]);

  const isVeo = engine === "veo_scene" || engine === "veo_broll";

  // --- LLM config + assistant actions (Fix Pack 5) ---------------------------
  const llmCfg: LlmConfig = {
    provider: settings.provider,
    apiKey: settings.apiKey,
    model: settings.model,
    customEndpoint: settings.customEndpoint,
  };

  async function handleEnhance() {
    if (!sceneText.trim() || enhancing) return;
    setEnhancing(true);
    const res = await enhanceScene(llmCfg, sceneText, lang);
    if (res.ok) setSceneText(res.text.trim());
    setEnhancing(false);
  }

  async function handleTranslateUnknown() {
    if (parsed.unknown.length === 0 || translating) return;
    setTranslating(true);
    const res = await translateWords(llmCfg, parsed.unknown);
    if (res.ok) {
      const next = { ...userDict, entries: { ...userDict.entries } };
      for (const e of res.entries) {
        next.entries[e.word] = { en: e.en, cat: e.cat };
      }
      saveUserDict(next);
      setUserDict(next);
    }
    setTranslating(false);
  }

  async function handleCritic() {
    if (results.length === 0 || criticBusy) return;
    setCriticBusy(true);
    const res = await critiquePrompt(llmCfg, results[0].prompt, engine, lang);
    setCritic(res.ok ? res.text.trim() : t(`err.${res.error ?? "http"}`, lang));
    setCriticBusy(false);
  }

  // --- Vision analysis ----------------------------------------------------------
  async function handleAnalyze() {
    if (!settings.apiKey || (photos.length === 0 && !productPhoto)) return;
    setAnalyzing(true);
    setAnalyzeError(false);
    try {
      let hits = 0;
      if (photos.length > 0) {
        // FP10 (C1): cache-first analysis - a repeated photo costs no credits.
        const cached = await analyzeImagesCached(
          llmCfg,
          photos.map((p) => p.dataUrl),
        );
        hits += cached.fromCache.filter(Boolean).length;
        const indexed = cached.results
          .map((r, i) => ({ r, photo: photos[i] }))
          .filter((x) => x.r.ok);
        if (indexed.length === 0) {
          setAnalyzeError(true);
        } else {
          // FP9 (C2): identity references never drive the scene fields; between
          // two scene references the last uploaded one wins.
          const sceneShots = indexed.filter((x) => x.photo?.role === "scene");
          const src =
            sceneShots.length > 0
              ? sceneShots[sceneShots.length - 1]
              : indexed[indexed.length - 1];
          const fields = parseVisionText(src.r.text);
          // FP9 (C2): explicit scene-field text outranks the scene reference;
          // identity photos never set the location at all.
          const refLocation = sceneShots.length > 0 ? fields.location : "";
          const decision = resolveLocation(parsed.location, refLocation);
          setSpec((prev) => ({
            ...prev,
            location: decision.location || prev.location,
            lighting: fields.lighting || prev.lighting,
            camera: fields.camera || prev.camera,
            pose: fields.pose || prev.pose,
            outfit: fields.outfit || prev.outfit,
            confidence: {
              ...prev.confidence,
              ...fields.confidence,
              ...(decision.source === "text" ? { location: 1 } : {}),
            },
            references: [
              ...photos,
              ...(productPhoto ? [productPhoto] : []),
            ].map((p) => ({ role: p.role, fileRef: p.id })),
          }));
          setLocConflict(decision.conflict);
          setVisionApplied(true);
          setConfirmed(false);
        }
      }
      // FP10 (B2): the product photo is described separately and lands in the
      // prompt as PRODUCT; it never touches the face or the location fields.
      if (productPhoto) {
        const prod = await analyzeProductCached(llmCfg, productPhoto.dataUrl);
        if (prod.fromCache) hits++;
        if (prod.result.ok && prod.result.text.trim()) {
          const desc = prod.result.text.trim().replace(/\s+/g, " ");
          setSpec((prev) => ({ ...prev, product: desc }));
        } else if (photos.length === 0) {
          setAnalyzeError(true);
        }
      }
      setCacheHits(hits);
    } finally {
      setAnalyzing(false);
    }
  }

  // --- photos (with storage guard before any persistence) -----------------------
  function handlePhotosChange(next: ReferencePhoto[]) {
    if (storageNearLimit()) setStorageWarn(true);
    setPhotos(next);
    if (next.length === 0) {
      setVisionApplied(false);
      setConfirmed(false);
      setLocConflict(null);
    }
  }

  // FP10 (B2): removing the product photo also clears the product field.
  function handleProductChange(p: ReferencePhoto | null) {
    setProductPhoto(p);
    setCacheHits(0);
    if (!p) setSpec((prev) => ({ ...prev, product: "" }));
  }

  // --- characters ---------------------------------------------------------------
  // FP8 (B1): one-tap demo character for first-run users.
  function loadDemoCharacter() {
    const exists = characters.some((c) => c.id === DEMO_CHARACTER.id);
    const list = exists ? characters : [...characters, DEMO_CHARACTER];
    if (!exists) {
      setCharacters(list);
      void saveCharacters(list);
    }
    setPassport(DEMO_CHARACTER);
    setUseCharacter(true);
    setSceneText(DEMO_SCENE_TEXT[lang]);
  }

  // Fix Pack 16 — showcase mode (?demo=1): the demo character + scene load so
  // screenshots and marketing videos have content. The library is untouched;
  // without the flag nothing changes.
  useEffect(() => {
    if (!isDemoMode()) return;
    setPassport(DEMO_CHARACTER);
    setUseCharacter(true);
    setSceneText(DEMO_SCENE_TEXT[lang]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveToLibrary() {
    // FP10 (B3): snapshot the previous state of an existing character first.
    const prevChar = characters.find((c) => c.id === passport.id);
    if (prevChar) void pushPassportVersion(prevChar).then(setPassportVersions);
    const list = prevChar
      ? characters.map((c) => (c.id === passport.id ? passport : c))
      : [...characters, passport];
    void saveCharacters(list);
    setCharacters(list);
    setUseCharacter(true);
    setOneOff(false);
  }

  function selectCharacter(id: string | null) {
    // Fix Pack 13: switching away from an unsaved one-off asks first.
    if (
      oneOff &&
      (passport.name.trim() || passport.identity.full.trim()) &&
      !characters.some((c) => c.id === passport.id) &&
      !window.confirm(t("oneoff.discard", lang))
    )
      return;
    setOneOff(false);
    if (id === null) {
      setPassport(emptyPassport());
      setUseCharacter(false);
      return;
    }
    const c = characters.find((x) => x.id === id);
    if (c) {
      setPassport(c);
      setUseCharacter(true);
    }
  }

  function deleteCharacter(id: string) {
    const list = characters.filter((c) => c.id !== id);
    void Promise.all([saveCharacters(list), deletePassportVersions(id)]);
    setCharacters(list);
    if (passport.id === id) {
      setPassport(emptyPassport());
      setPassportVersions([]);
    }
  }

  // FP10 (B3): roll the editor back to a stored snapshot (save is manual).
  function restoreVersion(v: PassportVersion) {
    setPassport({ ...v.passport, updatedAt: new Date().toISOString() });
    setUseCharacter(true);
  }

  // Fix Pack 13: start a one-off character (temporary, never saved).
  function startOneOff() {
    setPassport(emptyPassport());
    setUseCharacter(true);
    setOneOff(true);
  }

  // --- FP9: scene library (A4) + scene packs (A5) -------------------------------
  function saveCurrentScene() {
    if (!sceneText.trim()) return;
    if (storageNearLimit()) setStorageWarn(true);
    const s: SavedScene = {
      id: uuid(),
      name: sceneText.trim().slice(0, 48),
      text: sceneText.trim(),
      mode,
      engine,
      createdAt: new Date().toISOString(),
    };
    const list = [s, ...savedScenes];
    saveScenes(list);
    setSavedScenes(list);
  }

  function applySavedScene(s: SavedScene) {
    setMode(s.mode);
    setEngine(s.engine);
    setNegative(defaultNegative(s.engine));
    setSpec((prev) => ({ ...prev, mode: s.mode, engine: s.engine }));
    setSceneText(s.text);
    setHubEngine(null);
    setResults([]);
  }

  function deleteSavedScene(id: string) {
    const list = savedScenes.filter((x) => x.id !== id);
    saveScenes(list);
    setSavedScenes(list);
  }

  function applyPackScene(_pack: ScenePack, sc: PackScene) {
    setMode("photo");
    setEngine("nano_pro");
    setNegative(defaultNegative("nano_pro"));
    setSceneText(packSceneText(sc));
    setSpec((prev) => ({
      ...prev,
      mode: "photo",
      engine: "nano_pro",
      location: sc.fields.location,
      lighting: sc.fields.lighting,
      pose: sc.fields.pose,
      outfit: sc.fields.outfit,
      mood: sc.fields.mood,
      // Fix Pack 11: world + technique travel with the pack scene.
      world: _pack.world,
      technique: sc.techniqueId ?? _pack.techniqueIds[0],
      capture: {
        ...sc.capture,
        expo: [...sc.capture.expo],
        imperf: [...sc.capture.imperf],
      },
      style: [...sc.style],
      // Protect the precise pack fields from being re-parsed out of the text
      confidence: {
        ...prev.confidence,
        location: 1,
        lighting: 1,
        pose: 1,
        outfit: 1,
      },
    }));
    // Fix Pack 11.2: remember the pack — it powers shoot props & feed cutaways.
    setLastPack(_pack);
    setMixIds((cur) =>
      cur.includes(_pack.id) ? cur : [...cur, _pack.id].slice(0, 3),
    );
    setHubEngine(null);
    setResults([]);
  }

  // --- FP9 (A1): photo-to-video hub ----------------------------------------------
  function startVideoFrom(e: EngineId) {
    setMode("video");
    setEngine(e);
    setNegative(defaultNegative(e));
    setSpec((prev) => ({ ...prev, mode: "video", engine: e }));
    setHubEngine(e);
    setResults([]);
  }

  // --- generate --------------------------------------------------------------------
  const gateLocked = visionApplied && !confirmed;
  const hasManualScene =
    sceneText.trim().length > 0 ||
    VISION_FIELDS.some((f) => spec[f].trim().length > 0);

  // Fix Pack 11.2: format router — frame / series ×4–8 / shoot 6–12 / feed 12–30.
  function buildFormat(
    fullSpec: SceneSpec,
    buildOpts: BuildOptions,
    seedsArr?: number[],
  ): BuildResult[] {
    if (engine !== "nano_pro" || mode !== "photo" || format === "single") {
      return buildPrompts(fullSpec, buildOpts);
    }
    // Fix Pack 12: modifier layers apply to worlds A/B only, never to C.
    const specM =
      mods.length > 0 && fullSpec.world !== "C"
        ? { ...fullSpec, modifiers: mods }
        : fullSpec;
    if (format === "series") {
      return buildSeriesFlex(specM, buildOpts, fmtSize, lang);
    }
    // Fix Pack 11.3: pull canon from character (null if not using character or canon not set).
    const activeCanon = buildOpts.character?.canon ?? null;
    if (format === "shoot") {
      return buildShoot(specM, buildOpts, fmtSize, lang, {
        continuity,
        loose,
        pack: lastPack,
        seeds: seedsArr,
        canon: activeCanon,
      });
    }
    const sel = SCENE_PACKS.filter((p) => mixIds.includes(p.id));
    const packs =
      sel.length > 0 ? sel : lastPack ? [lastPack] : [SCENE_PACKS[0]];
    const out = buildFeed(packs, specM, buildOpts, fmtSize, lang, {
      continuity,
      loose,
      captions: caps,
      seeds: seedsArr,
      canon: activeCanon,
      // Fix Pack 16 — Season Sync: her city's season baked into the feed.
      season: true,
      now: new Date(),
    });
    setFeedFlagged(out.mixedWorlds);
    return out.frames;
  }

  // Fix Pack 11.2: re-roll ONE frame of a shoot/feed (bumps that frame's seed).
  function rerollFrame(i: number) {
    const nextSeeds = { ...frameSeeds, [i]: (frameSeeds[i] ?? 0) + 1 };
    setFrameSeeds(nextSeeds);
    const fullSpec: SceneSpec = { ...spec, mode, engine };
    const buildOpts = {
      character: useCharacter && passport.name ? passport : null,
      hasReference: photos.length > 0,
      compress,
      variants,
    };
    const arr = Array.from(
      { length: results.length },
      (_, k) => nextSeeds[k] ?? 0,
    );
    // Fix Pack 11.3: reroll passes canon through buildFormat → shoot/feed.
    const built = buildFormat(fullSpec, buildOpts, arr);
    setResults((cur) =>
      cur.map((r, k) => (k === i && built[i] ? built[i] : r)),
    );
  }

  // Fix Pack 16 — Series Card: the series rhythm as one collectible PNG
  // (episode-numbered S1·E№, zero prompts — §2 stays clean by design).
  function exportSeriesCard() {
    const world = spec.world ?? lastPack?.world ?? "A";
    const roles = Array.from(
      { length: 9 },
      (_, i) => results[i]?.role ?? "hero",
    );
    const ep = nextEpisode();
    const canvas = document.createElement("canvas");
    drawSeriesCard(canvas, {
      lang,
      episode: ep,
      world,
      worldName: WORLD_CODE[world].name,
      packLabel: lastPack ? lastPack.label[lang] : format,
      roles,
      version: APP_VERSION,
    });
    downloadPng(
      canvas,
      `influencer-os-series-${ep.replace("·", "e").toLowerCase()}.png`,
    );
  }

  function handleGenerate() {
    if (!hasManualScene) {
      setSceneHighlight(true);
      sceneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (gateLocked) return;

    const fullSpec: SceneSpec = { ...spec, mode, engine };
    const buildOpts = {
      character: useCharacter && passport.name ? passport : null,
      hasReference: photos.length > 0,
      compress,
      variants,
    };
    const built = (
      engine === "kling_3" && mode === "video" && multishot !== 0
        ? [buildMultishot(fullSpec, buildOpts, multishot, lang)]
        : buildFormat(fullSpec, buildOpts)
    ).map((r) =>
      ENGINES_WITH_NEGATIVE.includes(engine)
        ? { ...r, negative: negative || r.negative }
        : r,
    );
    setCritic(null);
    setFrameSeeds({});
    setResults(built);

    // Fix Pack 11.3: one quiet nudge after the FIRST built feed, exactly once.
    if (
      format === "feed" &&
      !canonNudgeSeen() &&
      !(
        useCharacter &&
        passport.canon &&
        Object.values(passport.canon).some((v) =>
          Array.isArray(v) ? v.length > 0 : Boolean((v as string)?.trim?.()),
        )
      )
    ) {
      setShowCanonNudge(true);
    }

    const records: HistoryRecord[] = built.map((r) => ({
      id: uuid(),
      engine,
      mode,
      scenePreview:
        (r.label ? r.label + " · " : "") + sceneText.trim().slice(0, 120),
      prompt: r.prompt,
      negative: r.negative,
      createdAt: new Date().toISOString(),
    }));
    setLastRecords(records);
    // FP10 (C3): history lives in IndexedDB; the write does not block the UI.
    void pushHistoryMany(records).then(setHistory);
    saveLast({
      sceneText,
      createdAt: new Date().toISOString(),
      prompt: built[0]?.prompt,
    });
    requestAnimationFrame(() => {
      document
        .getElementById("output")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Fix Pack 13: keep hotkey refs current every render.
  genRef.current = handleGenerate;
  copyTextRef.current = results[0]?.prompt ?? null;

  // --- favorites ---------------------------------------------------------------------
  function toggleFavorite(rec: HistoryRecord) {
    const exists = favorites.some((f) => f.id === rec.id);
    const next = exists
      ? favorites.filter((f) => f.id !== rec.id)
      : [rec, ...favorites];
    void saveFavorites(next);
    setFavorites(next);
  }

  function toggleFavoriteResult(i: number) {
    const rec = lastRecords[i];
    if (rec) toggleFavorite(rec);
  }

  // --- history -----------------------------------------------------------------------
  function repeatRecord(rec: HistoryRecord) {
    setMode(rec.mode);
    setEngine(rec.engine);
    setNegative(rec.negative || defaultNegative(rec.engine));
    setSpec((prev) => ({ ...prev, mode: rec.mode, engine: rec.engine }));
    setResults([{ prompt: rec.prompt, negative: rec.negative }]);
    setLastRecords([rec]);
    if (rec.scenePreview) setSceneText(rec.scenePreview);
    requestAnimationFrame(() => {
      document.getElementById("output")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  function deleteRecord(id: string) {
    const list = history.filter((h) => h.id !== id);
    void saveHistory(list);
    setHistory(list);
    const fav = favorites.filter((f) => f.id !== id);
    void saveFavorites(fav);
    setFavorites(fav);
  }

  // Fix Pack 13: mark a history record as hit/miss (or clear it).
  function handleOutcome(id: string, outcome: "hit" | "miss" | null) {
    void setHistoryOutcome(id, outcome).then(setHistory);
  }

  // --- presets -----------------------------------------------------------------------
  function applyPreset(p: Preset) {
    setMode(p.mode);
    setEngine(p.engine);
    setNegative(defaultNegative(p.engine));
    setSpec((prev) => ({
      ...prev,
      mode: p.mode,
      engine: p.engine,
      style: p.style,
      realism: p.realism,
      capture: p.capture,
    }));
  }

  function savePreset(name: string) {
    const p: Preset = {
      id: uuid(),
      name,
      style: spec.style,
      realism: spec.realism,
      capture: spec.capture,
      engine,
      mode,
    };
    const list = [p, ...presets];
    savePresets(list);
    setPresets(list);
  }

  function deletePreset(id: string) {
    const list = presets.filter((p) => p.id !== id);
    savePresets(list);
    setPresets(list);
  }

  // --- backup ------------------------------------------------------------------------
  function handleExport() {
    void downloadBackup(false);
    updateSettings({ lastBackupAt: new Date().toISOString() });
  }

  async function handleImportFile(file: File) {
    setImportInvalid(false);
    try {
      const raw = JSON.parse(await file.text());
      const backup = validateBackup(raw);
      if (!backup) {
        setImportInvalid(true);
        return;
      }
      setPendingImport(backup);
    } catch {
      setImportInvalid(true);
    }
  }

  async function confirmImport(modeChoice: "merge" | "replace") {
    if (!pendingImport) return;
    await importBackup(pendingImport, modeChoice);
    setPendingImport(null);
    // Reload all state from storage
    const s = loadSettings();
    const nextCharacters = await loadCharacters();
    setSettings(s);
    setLang(s.language ?? detectLang());
    setCharacters(nextCharacters);
    setSavedScenes(loadScenes());
    setHistory(await loadHistory());
    setFavorites(await loadFavorites());
    setPresets(loadPresets());
    setUserDict(loadUserDict());

    if (modeChoice === "replace") {
      const importedPassport = nextCharacters.find((c) => c.id === passport.id);
      if (importedPassport) {
        setPassport(importedPassport);
      } else {
        setPassport(emptyPassport());
        setPassportVersions([]);
        setUseCharacter(false);
        setOneOff(false);
      }
    }
  }

  // --- silent draft restore (FP22): applied at boot, undo via the toast ---------------
  function undoRestore() {
    setSceneText("");
    setResults([]);
    setLastRecords([]);
    setRestoredDraft(false);
  }

  // --- onboarding ---------------------------------------------------------------------
  function finishOnboarding() {
    setOnbStep(null);
    updateSettings({ onboarded: true });
  }

  // Fix Pack 21: tour steps that live inside the collapsed advanced section
  // open it before the spotlight measures its target.
  useEffect(() => {
    if (onbStep !== null && TOUR_STEPS[onbStep]?.opensAdvanced) {
      setAdvOpen(true);
    }
  }, [onbStep]);

  // Fix Pack 13: prompt strength for the current spec (null before first gen).
  const strength = useMemo(
    () =>
      results.length > 0
        ? promptStrength(
            { ...spec, mode, engine },
            useCharacter && passport.name ? passport : null,
          )
        : null,
    [results.length, spec, mode, engine, useCharacter, passport],
  );
  // Fix Pack 14: Prompt Doctor — actionable suggestions for the current spec.
  const suggestions = useMemo(
    () =>
      diagnose(
        { ...spec, mode, engine },
        useCharacter && passport.name ? passport : null,
        results[0] ?? null,
      ),
    [results, spec, mode, engine, useCharacter, passport],
  );
  const stats = useMemo(() => outcomeStats(history), [history]);
  const backupIsDue =
    mounted &&
    backupDue(settings.lastBackupAt, characters.length, history.length);

  const imageBytes = useMemo(
    () =>
      photos.reduce((sum, p) => sum + Math.round(p.dataUrl.length * 0.75), 0),
    [photos],
  );

  if (!mounted) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col gap-4 px-4 py-6" />
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col gap-4 px-4 pb-44 pt-6 min-[480px]:pb-32">
      {/* 1. Header (FP23: extracted) - title + one gear */}
      <AppHeader
        lang={lang}
        showDot={!settings.apiKey || backupIsDue}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* FP23: banner slot + restore toast extracted into components/studio */}
      <AppBanners
        lang={lang}
        storageWarn={storageWarn}
        onDismissStorage={() => setStorageWarn(false)}
        hasKey={Boolean(settings.apiKey)}
        onOpenSettings={() => setSettingsOpen(true)}
        restoredDraft={restoredDraft}
        onUndoRestore={undoRestore}
      />

      {/* 3. Mode toggle */}
      <ModeToggle lang={lang} mode={mode} onChange={changeMode} />

      {/* 4. Engine selector (+ B-Roll sub-toggle on Veo) */}
      <EngineSelector
        lang={lang}
        mode={mode}
        engine={isVeo ? "veo_scene" : engine}
        onChange={changeEngine}
      />
      {mode === "video" && isVeo ? (
        <div className="-mt-2 flex justify-end px-1">
          <Chip
            label={t("engine.broll", lang)}
            checked={engine === "veo_broll"}
            onChange={(v) => changeEngine(v ? "veo_broll" : "veo_scene")}
          />
        </div>
      ) : null}

      {/* FP9 (A3): Veo first/last frame slots */}
      {mode === "video" && isVeo ? (
        <FrameSlots
          lang={lang}
          first={firstFrame}
          last={lastFrame}
          onChange={(slot, v) =>
            slot === "first" ? setFirstFrame(v) : setLastFrame(v)
          }
        />
      ) : null}

      {/* 5. Scene field */}
      <div ref={sceneRef}>
        <SceneField
          lang={lang}
          value={sceneText}
          onChange={setSceneText}
          placeholder={`${t("scene.placeholder", lang)} ${TEMPLATES[phIdx].text[lang]}`}
          onExample={() => applyTemplate(TEMPLATES[phIdx])}
          onEnhance={settings.apiKey ? handleEnhance : undefined}
          enhancing={enhancing}
          onTranslate={settings.apiKey ? handleTranslateUnknown : undefined}
          translating={translating}
          parsed={parsed}
          highlight={sceneHighlight}
          onRemoveTag={removeTag}
          onResolveAmbiguity={resolveAmbiguity}
        />
        {/* FP22: one quiet tip channel - cliche guard first, canon nudge second. */}
        {clicheAdvice(sceneText, lang) ? (
          <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
            {clicheAdvice(sceneText, lang)}
          </p>
        ) : showCanonNudge ? (
          <p className="mt-2 flex items-start gap-2 text-[12px] leading-snug text-muted-foreground">
            <span className="min-w-0 flex-1">{t("canon.nudge", lang)}</span>
            <button
              type="button"
              className="shrink-0 underline"
              onClick={() => {
                markCanonNudgeSeen();
                setShowCanonNudge(false);
              }}
            >
              {t("canon.nudge.dismiss", lang)}
            </button>
          </p>
        ) : null}
      </div>

      {/* FP9: scene library + scene packs (A4 + A5) */}
      <SceneLibrary
        lang={lang}
        saved={savedScenes}
        canSave={sceneText.trim().length > 0}
        onSaveCurrent={saveCurrentScene}
        onApplySaved={applySavedScene}
        onDeleteSaved={deleteSavedScene}
        onApplyPack={applyPackScene}
      />

      {/* 6–13. Advanced options (collapsed; Fix Pack 21: the tour can open it) */}
      <Disclosure
        title={t("more.title", lang)}
        subtitle={t("more.subtitle", lang)}
        open={advOpen}
        onOpenChange={setAdvOpen}
      >
        <div className="flex flex-col gap-4">
          {/* 6. Style / Realism */}
          <StyleRealism
            lang={lang}
            style={spec.style}
            realism={spec.realism}
            onStyleChange={(s) => setSpec((prev) => ({ ...prev, style: s }))}
            onRealismChange={(r) =>
              setSpec((prev) => ({ ...prev, realism: r }))
            }
          />

          {/* 7. Capture presets */}
          <CapturePresets
            lang={lang}
            capture={spec.capture}
            onChange={(c) => setSpec((prev) => ({ ...prev, capture: c }))}
          />

          {/* 8. Reference + Vision */}
          <div data-tour="tour-reference">
            <ReferenceVision
              lang={lang}
              photos={photos}
              onPhotosChange={handlePhotosChange}
              canAnalyze={Boolean(settings.apiKey)}
              analyzing={analyzing}
              analyzeError={analyzeError}
              onAnalyze={handleAnalyze}
              productPhoto={productPhoto}
              onProductChange={handleProductChange}
              productDesc={spec.product || ""}
              cacheHits={cacheHits}
            />
          </div>

          {/* FP8: one-tap demo character (B1) */}
          {characters.length === 0 ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-border bg-card p-4">
              <p className="text-[13px] text-muted-foreground">
                {t("demo.note", lang)}
              </p>
              <button
                type="button"
                onClick={loadDemoCharacter}
                className="min-h-[44px] shrink-0 rounded-xl bg-primary px-4 text-[15px] font-semibold text-primary-foreground transition-opacity duration-200 hover:opacity-90"
              >
                {t("demo.try", lang)}
              </button>
            </div>
          ) : null}

          {/* Fix Pack 13: one-off character toggle */}
          {oneOff ? (
            <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-[13px] text-muted-foreground">
              <span className="flex-1">{t("oneoff.active", lang)}</span>
              <button
                type="button"
                className="shrink-0 underline"
                onClick={() => {
                  setPassport(emptyPassport());
                  setUseCharacter(false);
                  setOneOff(false);
                }}
              >
                {t("oneoff.clear", lang)}
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-[13px] font-medium text-muted-foreground underline hover:text-foreground"
                onClick={startOneOff}
              >
                {t("oneoff.start", lang)}
              </button>
            </div>
          )}

          {/* 9. Character passport */}
          <div data-tour="tour-character">
            <PassportEditor
              lang={lang}
              passport={passport}
              characters={characters}
              identityLevel={spec.subject.identityLevel}
              onIdentityLevelChange={(l) =>
                setSpec((prev) => ({
                  ...prev,
                  subject: { ...prev.subject, identityLevel: l },
                }))
              }
              onPassportChange={(p) => {
                setPassport(p);
                setUseCharacter(true);
              }}
              onSelectCharacter={selectCharacter}
              onSaveToLibrary={saveToLibrary}
              onDeleteCharacter={deleteCharacter}
              versions={passportVersions}
              onRestoreVersion={restoreVersion}
            />
          </div>

          {/* 9b. Fix Pack 11.3: Canon — under passport, optional, zero friction. */}
          {useCharacter ? (
            <CanonEditor
              lang={lang}
              passport={passport}
              world={lastPack?.world ?? "A"}
              llmCfg={llmCfg}
              onPassportChange={(p) => {
                setPassport(p);
                setUseCharacter(true);
              }}
            />
          ) : null}

          {/* 10. Motion & audio (video only) */}
          {mode === "video" ? (
            <MotionAudio
              lang={lang}
              engine={engine}
              spec={spec}
              onChange={setSpec}
            />
          ) : null}

          {/* 11. Negative (Kling / Veo only) */}
          <NegativePanel
            lang={lang}
            engine={engine}
            value={negative}
            onChange={setNegative}
          />

          {/* 13. Fix Pack 13: engine-aware realism / anti-detection panel */}
          <AntiDetectPanel lang={lang} engine={engine} />

          {/* FP22: series & feed fine-tuning - moved here from the bar gear popup */}
          {engine === "nano_pro" && mode === "photo" ? (
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/40 p-3">
              <span className="text-[13px] font-semibold text-card-foreground">
                {t("gear.title", lang)}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <Chip
                  label={t("gear.continuity", lang)}
                  checked={continuity}
                  onChange={setContinuity}
                />
                <Chip
                  label={t("gear.captions", lang)}
                  checked={caps}
                  onChange={setCaps}
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <span className="text-[13px] font-medium text-muted-foreground">
                  {t("gear.codex", lang)}
                </span>
                <Segmented<"strict" | "live">
                  size="sm"
                  label={t("gear.codex", lang)}
                  value={loose ? "live" : "strict"}
                  onChange={(v) => setLoose(v === "live")}
                  options={[
                    { value: "strict", label: t("gear.strict", lang) },
                    { value: "live", label: t("gear.live", lang) },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <span className="text-[13px] font-medium text-muted-foreground">
                  {t("gear.mods", lang)}
                </span>
                <div className="flex flex-wrap gap-2">
                  {["t_fragility", "t_deadpan"].map((m) => (
                    <Chip
                      key={m}
                      label={TECHNIQUE_BY_ID[m].label[lang]}
                      checked={mods.includes(m)}
                      onChange={(v) =>
                        setMods(v ? [...mods, m] : mods.filter((x) => x !== m))
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Disclosure>

      {/* 12. Trust gate (only after Vision analysis) */}
      {visionApplied ? (
        <ConfirmGate
          lang={lang}
          spec={spec}
          confirmed={confirmed}
          onSpecChange={setSpec}
          onAcceptAll={() => setConfirmed(true)}
          onReset={() => {
            setSpec((prev) => {
              const next = {
                ...prev,
                confidence: {} as Record<string, number>,
              };
              for (const f of VISION_FIELDS) next[f] = parsed[f];
              return next;
            });
            setVisionApplied(false);
            setConfirmed(false);
            setLocConflict(null);
          }}
          onReanalyze={handleAnalyze}
          canReanalyze={Boolean(settings.apiKey) && photos.length > 0}
          locationConflict={locConflict}
        />
      ) : null}

      {/* 15. Output */}
      <OutputCard
        lang={lang}
        results={results}
        imageBytes={imageBytes}
        strength={strength}
        suggestions={suggestions}
        onFavorite={toggleFavoriteResult}
        favorited={lastRecords.map((r) => favorites.some((f) => f.id === r.id))}
        onCritic={
          settings.apiKey && results.length > 0 ? handleCritic : undefined
        }
        onReroll={
          engine === "nano_pro" &&
          mode === "photo" &&
          (format === "shoot" || format === "feed") &&
          results.length > 1
            ? rerollFrame
            : undefined
        }
        feedFlag={feedFlagged && format === "feed"}
        critic={critic}
        criticBusy={criticBusy}
        exportMeta={{ engine, mode, scene: sceneText }}
        onUndo={undoResults}
        onRedo={redoResults}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      {/* Fix Pack 16: codex line + series card under a generated feed/series */}
      {(format === "feed" || format === "series") && results.length > 0 ? (
        <div className="flex flex-wrap items-start gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2 text-[12px] text-muted-foreground">
          <details className="min-w-0 flex-1">
            <summary className="cursor-pointer select-none">
              {codexLine(lang)}
              {format === "feed"
                ? ` · ${seasonNote(
                    seasonPhrases(
                      new Date(),
                      (useCharacter ? passport.canon?.place : null) ?? null,
                      0,
                    ),
                    lang,
                  )}`
                : ""}
            </summary>
            <ul className="mt-2 list-disc pl-5">
              {codexDetails(lang).map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </details>
          <button
            type="button"
            onClick={exportSeriesCard}
            className="shrink-0 rounded-md bg-secondary px-2.5 py-1.5 text-[12px] font-medium text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
          >
            Series Card · PNG
          </button>
        </div>
      ) : null}

      {/* FP9 (A1): photo-to-video hub */}
      <VideoHub
        lang={lang}
        showCta={
          mode === "photo" && engine === "nano_pro" && results.length > 0
        }
        activeEngine={hubEngine}
        onPick={startVideoFrom}
        onDismiss={() => setHubEngine(null)}
      />

      {settings.apiKey ? (
        <AssistantChat
          lang={lang}
          cfg={llmCfg}
          mode={mode}
          engine={engine}
          sceneText={sceneText}
          prompt={results[0]?.prompt ?? null}
          photo={photos[photos.length - 1]?.dataUrl}
          onApplyScene={(s) => setSceneText(s)}
          onApplyPrompt={(p) =>
            setResults((cur) =>
              cur.length > 0
                ? [{ ...cur[0], prompt: p }, ...cur.slice(1)]
                : cur,
            )
          }
        />
      ) : null}

      {/* 16. History / favorites / presets */}
      <HistoryTabs
        lang={lang}
        history={history}
        favorites={favorites}
        presets={presets}
        onRepeat={repeatRecord}
        onDelete={deleteRecord}
        onOutcome={handleOutcome}
        onToggleFavorite={toggleFavorite}
        onApplyPreset={applyPreset}
        onSavePreset={savePreset}
        onDeletePreset={deletePreset}
      />

      {/* 17. Settings overlay (FP23: extracted; hosts the FP22 appearance card) */}
      {settingsOpen ? (
        <SettingsOverlay
          lang={lang}
          onChangeLang={changeLang}
          settings={settings}
          onUpdateSettings={updateSettings}
          hintsEnabled={hintsEnabled}
          onHintsChange={(v) => {
            setHintsOn(v);
            setHintsEnabled(v);
          }}
          onShowHotkeys={() => {
            setSettingsOpen(false);
            setHkOpen(true);
          }}
          backupIsDue={backupIsDue}
          onExport={handleExport}
          onImportFile={handleImportFile}
          importInvalid={importInvalid}
          stats={stats}
          onClose={() => setSettingsOpen(false)}
        />
      ) : null}

      {/* Fix Pack 21: hotkey sheet (toggle with ?) */}
      {hkOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("hk.title", lang)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4"
        >
          <Card className="flex w-full max-w-sm flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-card-foreground">
                {t("hk.title", lang)}
              </h2>
              <button
                type="button"
                aria-label={t("settings.close", lang)}
                onClick={() => setHkOpen(false)}
                className="rounded-md p-1.5 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {(
                [
                  ["⌘/Ctrl + Enter", "hk.generate"],
                  ["C", "hk.copy"],
                  ["1–4", "hk.engines"],
                  ["⌘/Ctrl + Z", "hk.undo"],
                  ["⇧ + ⌘/Ctrl + Z", "hk.redo"],
                  ["?", "hk.sheet"],
                ] as const
              ).map(([keys, k]) => (
                <li
                  key={k}
                  className="flex items-center justify-between gap-3 text-[13px]"
                >
                  <span className="text-muted-foreground">{t(k, lang)}</span>
                  <kbd className="rounded-sm border border-border bg-muted px-2 py-1 font-mono text-[12px] text-card-foreground">
                    {keys}
                  </kbd>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      ) : null}

      {/* 19. Footer disclaimer */}
      <footer className="pb-2 pt-2 text-center text-[13px] leading-relaxed text-muted-foreground text-pretty">
        {t("footer.disclaimer", lang)} · v{APP_VERSION}
      </footer>

      {/* 14. Sticky action bar (FP22 one-row design; FP23: extracted) */}
      <ActionBar
        lang={lang}
        engine={engine}
        mode={mode}
        format={format}
        onPickFormat={pickFormat}
        gateLocked={gateLocked}
        onGenerate={handleGenerate}
        optsOpen={optsOpen}
        onToggleOpts={() => setOptsOpen((v) => !v)}
        variants={variants}
        onPickVariants={setVariants}
        compress={compress}
        onToggleCompress={setCompress}
        fmtSize={fmtSize}
        onFmtSize={setFmtSize}
        mixIds={mixIds}
        onToggleMix={toggleMix}
        mixedWorldsPicked={mixedWorldsPicked}
        multishot={multishot}
        onMultishot={setMultishot}
        hintsEnabled={hintsEnabled}
      />

      {/* Import merge/replace dialog */}
      {pendingImport ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("import.title", lang)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4"
        >
          <Card className="flex w-full max-w-sm flex-col gap-4">
            <h2 className="text-[15px] font-semibold text-card-foreground text-balance">
              {t("import.title", lang)}
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => confirmImport("merge")}
                className="rounded-md bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring"
              >
                {t("import.merge", lang)}
              </button>
              <button
                type="button"
                onClick={() => confirmImport("replace")}
                className="rounded-md border border-border bg-card px-4 py-2 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
              >
                {t("import.replace", lang)}
              </button>
              <button
                type="button"
                onClick={() => setPendingImport(null)}
                className="rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                {t("import.cancel", lang)}
              </button>
            </div>
          </Card>
        </div>
      ) : null}

      {/* 18. Onboarding — Fix Pack 21: spotlight tour over the real UI */}
      {onbStep !== null ? (
        <SpotlightTour
          lang={lang}
          step={onbStep}
          onNext={() =>
            onbStep >= TOUR_STEPS.length - 1
              ? finishOnboarding()
              : setOnbStep(onbStep + 1)
          }
          onSkip={finishOnboarding}
        />
      ) : null}
    </main>
  );
}

export default function AppPage() {
  return (
    <LicenseGate>
      <StudioPage />
    </LicenseGate>
  );
}
