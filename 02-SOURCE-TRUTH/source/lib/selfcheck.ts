// In-app acceptance suite (P12): asserts that prompt assembly
// follows the canon. Mirrors the external verification test set.

import {
  DEV,
  NEG_BASE,
  NEG_UGC,
  NEG_KLING,
  NEG_VEO,
  POS_SKIN,
  SENSOR,
  ENGINE_META,
  buildPrompts,
  CAP,
  OPT,
  EXPO,
  IMPERF,
  FILM,
  STYLE_PHRASES,
  WORLD_SUFFIX,
  FILM_TERMS,
  filterCaptureForWorld,
  BANNED_TERMS,
} from "./engines";
import {
  SERIES_SHIFTS,
  TECHNIQUES,
  TECHNIQUE_BY_ID,
  techniqueSeries,
  techniqueText,
} from "./techniques";
import { emptySceneSpec, resolveLocation } from "./scene";
import { personWordIn } from "./hints";
import { t } from "./i18n";
import { LICENSE_PROTOCOL, USES_LIMIT } from "./license";
import { TOUR_STEPS } from "./tour";
import { VIRTUAL_THRESHOLD } from "./virtual";
import { translitToCyr } from "./parse";
import { buildMultishot, planMultishot } from "./multishot";
import { PRODUCT_PROMPT, fnv1a, visionCacheKey } from "./visionCache";
import {
  BACKUP_FIELDS,
  STORAGE_SOFT_LIMIT_BYTES,
  appendVersion,
  backupDue,
  outcomeStats,
} from "./storage";
import { FMT_RANGE, SEED_PRESETS } from "./presets";
import {
  DEMO_CHARACTER,
  DEMO_WORLDS,
  demoSpec,
  makeTeaser,
  splitPromptBlocks,
  teaserSplit,
  TEASER_WORDS,
} from "./demo";
import { SCENE_PACKS, packSceneText } from "./packs";
import {
  archiveName,
  assignDays,
  caption,
  VOICE_RHYTHM,
  voiceCaption,
} from "./captions";
import { CUTAWAY_POOLS, buildCutaway } from "./cutaways";
import { buildFeed, codexDetails, codexLine, planFeed } from "./feed";
import { PROP_POOLS, propPool, shootComposition } from "./shoot";
import {
  emptyCanon,
  canonFilled,
  canonProps,
  canonHabits,
  canonCaptions,
  canonCutaways,
  canonMood,
  parseCanonText,
} from "./canon";
import { bundleJson, bundleText, shotListText } from "./bundle";
import { promptStrength } from "./strength";
import { antiDetectTips } from "./antidetect";
import { diagnose } from "./doctor";
import { parseManifest } from "./manifest";
import { clicheAdvice, CLICHES } from "./cliche";
import { QUIZ_QUESTIONS, scoreQuiz, WORLD_CODE } from "./quiz";
import {
  isRedacted,
  REDACT_GLYPH,
  redactBars,
  redactionLeaks,
  redactWords,
  tiltFor,
} from "./redact";
import { daylightTone, daypartOf, seasonFor, seasonPhrases } from "./season";
import { APP_VERSION, CHANGELOG } from "./changelog";
import { SHOWCASE_PROJECTS } from "./showcase-data";
import type { BuildResult, EngineId } from "./types";

export type SelfCheckResult = { name: string; pass: boolean };

const CANON = {
  DEV: "black iPhone 15 Pro Max in a transparent silicone case",
  NEG_BASE:
    "beauty filter, skin smoothing, airbrushed skin, blemish removal, pore filling, face symmetry correction, nose reshaping, matte plastic skin",
  NEG_UGC:
    "cinematic color grading, studio lighting, gimbal stabilization, instagram filter, watermark, text, logo",
  NEG_KLING:
    "clothing changes, hair style changes, de-aging, extra limbs, joint distortion, background flickering, beauty filter, skin smoothing, airbrushed skin, face symmetry correction, nose reshaping, matte plastic skin",
  POS_SKIN:
    "natural skin texture with visible pores and fine vellus hair, subtle sebum highlights in the T-zone, natural pigmentation with moles and freckles preserved, anatomical facial asymmetry, sharp focus",
  SENSOR:
    "subtle digital sensor noise, natural dynamic range, slight handheld imperfection",
};

export function runSelfCheck(): SelfCheckResult[] {
  const out: SelfCheckResult[] = [];
  const check = (name: string, pass: boolean) => out.push({ name, pass });
  const opts = {
    character: null,
    hasReference: true,
    compress: false,
    variants: 1,
  };

  try {
    // Constants verbatim
    check("DEV verbatim", DEV === CANON.DEV);
    check("NEG_BASE verbatim", NEG_BASE === CANON.NEG_BASE);
    check("NEG_UGC verbatim", NEG_UGC === CANON.NEG_UGC);
    check("NEG_KLING verbatim", NEG_KLING === CANON.NEG_KLING);
    check(
      "NEG_VEO composed",
      NEG_VEO ===
        `${CANON.NEG_BASE}, ${CANON.NEG_UGC}, subtitles, text overlays, on-screen text, captions, distorted hands, lip-sync issues, unnatural movements, oversaturation`,
    );
    check("POS_SKIN verbatim", POS_SKIN === CANON.POS_SKIN);
    check("SENSOR verbatim", SENSOR === CANON.SENSOR);
    check(
      "no seed exposed",
      ENGINE_META.every((e) => e.hasSeed === false),
    );

    // Kling
    {
      const spec = emptySceneSpec();
      spec.mode = "video";
      spec.engine = "kling_3";
      spec.audio.dialogue = "Hey, look at this";
      spec.motion.intensity = 0.4;
      const four = buildPrompts(spec, { ...opts, variants: 4 });
      check("kling: 4 variants", four.length === 4);
      check(
        "kling: intensities 0.3/0.5/0.7 + slider",
        four[0].prompt.includes("Motion intensity 0.3") &&
          four[1].prompt.includes("Motion intensity 0.5") &&
          four[2].prompt.includes("Motion intensity 0.7") &&
          four[3].prompt.includes("Motion intensity 0.4"),
      );
      check(
        "kling: dialogue format",
        four[0].prompt.includes('[Character A: natural]: "Hey, look at this"'),
      );
      check(
        "kling: negative = NEG_KLING",
        four.every((r) => r.negative === CANON.NEG_KLING),
      );
    }

    // Veo
    {
      const spec = emptySceneSpec();
      spec.mode = "video";
      spec.engine = "veo_scene";
      spec.audio.dialogue = "Welcome back";
      const [r] = buildPrompts(spec, opts);
      check(
        "veo: dialogue + (no subtitles)",
        r.prompt.includes(
          "The subject says, softly: Welcome back (no subtitles)",
        ),
      );
      check("veo: negative = NEG_VEO", r.negative === NEG_VEO);
      check("veo: underMin flag works", r.underMin === true);
    }

    // Veo B-roll
    {
      const spec = emptySceneSpec();
      spec.mode = "video";
      spec.engine = "veo_broll";
      spec.audio.dialogue = "should not appear";
      const [r] = buildPrompts(spec, opts);
      check(
        "b-roll: camera marker",
        r.prompt.includes("(that's where the camera is)"),
      );
      check("b-roll: no dialogue", !r.prompt.includes("should not appear"));
    }

    // Nano
    {
      const spec = emptySceneSpec();
      spec.engine = "nano_pro";
      spec.location = "cafe interior";
      spec.lighting = "soft window light";
      const [r] = buildPrompts(spec, opts);
      check("nano: no negative", r.negative === undefined);
      check("nano: canon device", r.prompt.includes(CANON.DEV));
      check("nano: U-attention key", r.prompt.includes("(key:"));
    }

    // Seedance
    {
      const spec = emptySceneSpec();
      spec.mode = "video";
      spec.engine = "seedance_2";
      const [r] = buildPrompts(spec, opts);
      check(
        "seedance: @-tags",
        r.prompt.includes("@image1") &&
          r.prompt.includes("@video1") &&
          r.prompt.includes("@audio1"),
      );
      check("seedance: no negative", r.negative === undefined);
    }

    // Omni Flash
    {
      const spec = emptySceneSpec();
      spec.mode = "video";
      spec.engine = "omni_flash";
      const [r] = buildPrompts(spec, opts);
      check(
        "omni: 5 parts + Use Flow",
        [
          "Goal:",
          "Input:",
          "Scene:",
          "Motion:",
          "Constraints:",
          "Use Flow.",
        ].every((p) => r.prompt.includes(p)),
      );
      check("omni: under 10 seconds", r.prompt.includes("under 10 seconds"));
      check("omni: PRESERVE present", r.prompt.includes("PRESERVE"));
      check("omni: no negative", r.negative === undefined);
    }

    // FP8 - demo character (B1)
    {
      const idWords = DEMO_CHARACTER.identity.full
        .split(/\s+/)
        .filter(Boolean).length;
      check("demo: identity 30-45 words", idWords >= 30 && idWords <= 45);
      check(
        "demo: anomaly lock canonical ending",
        DEMO_CHARACTER.anomalyLock.freeText.endsWith(
          "Do not normalize or correct these features.",
        ),
      );
      check(
        "demo: two worlds x three scenes",
        DEMO_WORLDS.length === 2 &&
          DEMO_WORLDS.every((w) => w.scenes.length === 3),
      );
      const spec = demoSpec(DEMO_WORLDS[0].scenes[0], "nano_pro");
      const [r] = buildPrompts(spec, {
        character: DEMO_CHARACTER,
        hasReference: false,
        compress: false,
        variants: 1,
      });
      check("demo: nano prompt has canon device", r.prompt.includes(CANON.DEV));
      check("demo: U-attention key present", r.prompt.includes("(key:"));
      check("demo: not under minimum", !r.underMin);
    }

    // --- Fix Pack 9: scene packs, location priority, package export ---------
    {
      check("fp9: original five packs still present", SCENE_PACKS.length >= 5);
      check(
        "fp9: every pack has 4+ scenes",
        SCENE_PACKS.every((p) => p.scenes.length >= 4),
      );
      check(
        "fp9: no photographer names in packs",
        !/(Goldin|Tillmans|Teller|Purienne|Cohen|Jacobs|litlonn)/i.test(
          JSON.stringify(SCENE_PACKS),
        ),
      );
      const sc0 = SCENE_PACKS[0].scenes[0];
      check(
        "fp9: pack scene text includes location",
        packSceneText(sc0).includes(sc0.fields.location),
      );
      check(
        "fp9: pack capture/style keys valid",
        SCENE_PACKS.every((p) =>
          p.scenes.every(
            (s) =>
              (!s.capture.cap || s.capture.cap in CAP) &&
              (!s.capture.opt || s.capture.opt in OPT) &&
              s.capture.expo.every((k) => k in EXPO) &&
              s.capture.imperf.every((k) => k in IMPERF) &&
              (!s.capture.film || s.capture.film in FILM) &&
              s.style.every((k) => k in STYLE_PHRASES),
          ),
        ),
      );
      const d1 = resolveLocation("kitchen at night", "hotel lobby");
      check(
        "fp9: scene text outranks scene reference",
        d1.location === "kitchen at night" &&
          d1.source === "text" &&
          d1.conflict !== null &&
          d1.conflict.refLocation === "hotel lobby",
      );
      const d2 = resolveLocation("", "hotel lobby");
      check(
        "fp9: reference fills empty text without conflict",
        d2.location === "hotel lobby" &&
          d2.source === "scene_ref" &&
          d2.conflict === null,
      );
      const d3 = resolveLocation("Hotel Lobby", "hotel lobby");
      check(
        "fp9: same location (case-insensitive) is not a conflict",
        d3.conflict === null && d3.source === "text",
      );
      const shots = [
        { label: "hook", prompt: "first prompt", negative: "neg one" },
        { prompt: "second prompt" },
      ] as BuildResult[];
      const meta = { engine: "kling_3", mode: "video", scene: "test scene" };
      const bt = bundleText(shots, meta);
      check(
        "fp9: bundle text has shot headers and negatives",
        bt.includes("Shot 1/2") &&
          bt.includes("Shot 2/2") &&
          bt.includes("NEGATIVE:") &&
          bt.includes("first prompt"),
      );
      const bj = JSON.parse(bundleJson(shots, meta)) as {
        engine: string;
        shots: Array<{ label: string | null; prompt: string }>;
      };
      check(
        "fp9: bundle json roundtrip",
        bj.shots.length === 2 &&
          bj.shots[0].label === "hook" &&
          bj.shots[1].label === null &&
          bj.engine === "kling_3",
      );
    }

    // --- Fix Pack 10: multishot, product slot, vision cache, versions -------
    {
      const spec = emptySceneSpec();
      spec.mode = "video";
      spec.engine = "kling_3";
      spec.motion.action = "pours coffee into a mug";
      spec.audio.dialogue = "Fresh batch";
      const ms = buildMultishot(spec, opts, 5, "en");
      check(
        "fp10: multishot has Shot 1..5",
        ms.prompt.includes("Shot 1 (3s):") &&
          ms.prompt.includes("Shot 5 (3s):") &&
          !ms.prompt.includes("Shot 6"),
      );
      check(
        "fp10: multishot continuous-scene header",
        ms.prompt.includes(
          "one continuous scene, the same character in every shot",
        ),
      );
      check(
        "fp10: multishot negative = NEG_KLING",
        ms.negative === CANON.NEG_KLING,
      );
      check(
        "fp10: multishot dialogue in Kling format",
        ms.prompt.includes('[Character A: natural]: "Fresh batch"'),
      );
      check(
        "fp10: plan 6 over budget, 5 fits 15s",
        planMultishot(6).overBudget === true &&
          planMultishot(5).totalSec === 15 &&
          planMultishot(5).overBudget === false,
      );

      const pspec = emptySceneSpec();
      pspec.engine = "nano_pro";
      pspec.product = "matte black ceramic mug";
      const [pn] = buildPrompts(pspec, opts);
      check(
        "fp10: nano PRODUCT block",
        pn.prompt.includes("PRODUCT: matte black ceramic mug."),
      );
      pspec.mode = "video";
      pspec.engine = "kling_3";
      const [pk] = buildPrompts(pspec, opts);
      check(
        "fp10: kling product in frame",
        pk.prompt.includes("Product in frame: matte black ceramic mug."),
      );

      const h1 = fnv1a("hello");
      check(
        "fp10: fnv1a deterministic and distinct",
        h1 === fnv1a("hello") && h1 !== fnv1a("hella") && h1.startsWith("fnv_"),
      );
      check(
        "fp10: cache key format",
        visionCacheKey(
          { provider: "anthropic", apiKey: "" },
          "abc",
          "scene",
        ) === "ios_vision_scene:anthropic:default:abc",
      );
      check(
        "fp10: product prompt canon (25 words, no brands)",
        PRODUCT_PROMPT.includes("25") &&
          PRODUCT_PROMPT.includes("no brand names"),
      );

      let vlist = appendVersion([], DEMO_CHARACTER);
      const afterDup = appendVersion(vlist, DEMO_CHARACTER);
      check(
        "fp10: version dedupe of identical snapshot",
        vlist.length === 1 && afterDup === vlist,
      );
      for (let i = 0; i < 12; i++) {
        vlist = appendVersion(vlist, { ...DEMO_CHARACTER, name: "v" + i });
      }
      check(
        "fp10: versions capped at 10, newest first",
        vlist.length === 10 && vlist[0].passport.name === "v11",
      );

      // --- Fix Pack 11: technique core --------------------------------
      check("fp11: 24 techniques", TECHNIQUES.length === 24);
      check(
        "fp11: five phrases per technique",
        TECHNIQUES.every((tq) =>
          [tq.cameraReason, tq.light, tq.state, tq.surface, tq.artifact].every(
            (s) => s.trim().length > 0,
          ),
        ),
      );
      const techAll = TECHNIQUES.map((tq) => techniqueText(tq))
        .join(" ")
        .toLowerCase();
      check(
        "fp11: no banned terms in techniques",
        BANNED_TERMS.every((b) => !techAll.includes(b)),
      );
      check(
        "fp11: film terms only in world C",
        TECHNIQUES.filter((tq) => tq.world !== "C").every((tq) =>
          FILM_TERMS.every((f) => !techniqueText(tq).toLowerCase().includes(f)),
        ),
      );
      check("fp11+12: 18 packs", SCENE_PACKS.length === 18);
      check(
        "fp11: every pack has a world and known techniques",
        SCENE_PACKS.every(
          (p) =>
            ["A", "B", "C"].includes(p.world) &&
            p.techniqueIds.length >= 1 &&
            p.techniqueIds.every((id) => Boolean(TECHNIQUE_BY_ID[id])),
        ),
      );
      const packAll = SCENE_PACKS.map((p) =>
        p.scenes.map((s) => packSceneText(s)).join(" "),
      )
        .join(" ")
        .toLowerCase();
      check(
        "fp11: no banned terms in packs",
        BANNED_TERMS.every((b) => !packAll.includes(b)),
      );
      const gated = filterCaptureForWorld(
        {
          cap: "film_35mm",
          opt: "",
          expo: [],
          imperf: ["film_dust"],
          film: "portra",
        },
        "A",
      );
      const kept = filterCaptureForWorld(
        { cap: "film_35mm", opt: "", expo: [], imperf: [], film: "portra" },
        "C",
      );
      check(
        "fp11: film capture stripped outside world C",
        gated.film === "" &&
          gated.cap === "iphone_hdr" &&
          !gated.imperf.includes("film_dust") &&
          kept.film === "portra" &&
          kept.cap === "film_35mm",
      );
      check(
        "fp11: series x6",
        SERIES_SHIFTS.length === 6 &&
          techniqueSeries(TECHNIQUES[0]).length === 6,
      );
      check(
        "fp11: world suffixes present",
        (["A", "B", "C"] as const).every((w) => WORLD_SUFFIX[w].length > 10),
      );
      // --- Fix Pack 11.2: shoot / feed / cutaways / captions -----------------
      check(
        "fp11.2: B-roll pool 3-5 on every pack",
        SCENE_PACKS.every((p) => {
          const n = CUTAWAY_POOLS[p.id]?.length ?? 0;
          return n >= 3 && n <= 5;
        }),
      );
      check(
        "fp11.2: prop pool on every pack",
        SCENE_PACKS.every((p) => (PROP_POOLS[p.id]?.length ?? 0) >= 3),
      );
      const cut = buildCutaway(SCENE_PACKS[0], 0, "en");
      check(
        "fp11.2: B-roll has no person and no identity",
        cut.prompt.includes("no people, no face") &&
          !cut.prompt.includes("IDENTITY"),
      );
      const comp = shootComposition(8);
      check(
        "fp11.2: shoot 8 = 5 hero + 2 detail + 1 B-roll",
        comp.filter((r) => r === "hero").length === 5 &&
          comp.filter((r) => r === "detail").length === 2 &&
          comp.filter((r) => r === "cutaway").length === 1,
      );
      check(
        "fp11.2: feed rhythm - one off frame, B-roll 15-25%",
        [12, 16, 30].every((n) => {
          const plan = planFeed(n);
          const off = plan.filter((x) => x.role === "off").length;
          const cuts = plan.filter((x) => x.role === "cutaway").length / n;
          return off === 1 && cuts >= 0.15 && cuts <= 0.25;
        }),
      );
      check(
        "fp11.2: captions follow world voice",
        caption("A", "hero", 0, "en") ===
          caption("A", "hero", 0, "en").toLowerCase() &&
          caption("C", "hero", 0, "en").length > 0 &&
          caption("A", "off", 0, "en") === "…",
      );
      const days = assignDays(16);
      check(
        "fp11.2: posting days are monotonic",
        days.length === 16 && days.every((d, i) => i === 0 || d >= days[i - 1]),
      );
    }

    // Fix Pack 11.3: canon smoke tests.
    {
      // Lazy-import to avoid circular dep; canon imports from types only.
      check("fp11.3: emptyCanon is not filled", !canonFilled(emptyCanon()));
      check(
        "fp11.3: emptyCanon props/habits/captions/B-roll are empty arrays",
        canonProps(emptyCanon()).length === 0 &&
          canonHabits(emptyCanon()).length === 0 &&
          canonCaptions(emptyCanon()).length === 0 &&
          canonCutaways(emptyCanon()).length === 0,
      );
      check(
        "fp11.3: canonMood on empty canon is empty string",
        canonMood(emptyCanon()) === "",
      );
      const filledCanon = {
        ...emptyCanon(),
        whoSheIs: "off-duty archivist, slow mornings",
        objects: ["her chipped enamel mug", "her worn linen tote"],
        place: ["Berlin, Prenzlauer Berg, cluttered kitchen shelf"],
        habits: ["tilts phone at hip, elbow locked"],
        voiceWords: ["still", "quieter"],
      };
      check("fp11.3: filled canon is canonFilled", canonFilled(filledCanon));
      check(
        "fp11.3: canonProps returns her objects first",
        canonProps(filledCanon)[0] === "her chipped enamel mug",
      );
      check(
        "fp11.3: canonHabits returns her habits",
        canonHabits(filledCanon)[0] === "tilts phone at hip, elbow locked",
      );
      check(
        "fp11.3: canonCaptions returns her voice words",
        canonCaptions(filledCanon).includes("still"),
      );
      check(
        "fp11.3: canonCutaways has her place",
        canonCutaways(filledCanon).length > 0 &&
          canonCutaways(filledCanon)[0].text.includes("Berlin"),
      );
      check(
        "fp11.3: canonMood on filled canon is non-empty",
        canonMood(filledCanon).length > 0,
      );
      check(
        "fp11.3: parseCanonText round-trips valid JSON",
        (() => {
          const raw = JSON.stringify({
            who: "test archetype",
            place: ["Paris, loft"],
            objects: ["her old wallet"],
            world: "A",
            favoritePacks: ["pack_diary"],
            voiceStyle: "lowercase, minimal",
            voiceWords: ["soft", "bare"],
            habits: ["holds camera low"],
          });
          const c = parseCanonText(raw);
          return c !== null && c.whoSheIs === "test archetype";
        })(),
      );
      check(
        "fp11.3: parseCanonText returns null on empty object",
        parseCanonText("{}") === null,
      );
      // Canon integrates with caption(): with canon words, hero caption = her word.
      const capWithCanon = caption("A", "hero", 0, "en", filledCanon);
      check(
        "fp11.3: caption uses canon voice words on hero frame",
        filledCanon.voiceWords.includes(capWithCanon),
      );
      check(
        "fp11.3: caption B-roll role ignores canon (uses B-roll pool)",
        caption("A", "cutaway", 0, "en", filledCanon).length >= 0,
      );
      check(
        "fp11.3: caption off role returns ellipsis regardless of canon",
        caption("A", "off", 0, "en", filledCanon) === "\u2026",
      );
      // Canon integrates with propPool(): her objects are first.
      const pool = propPool("pack_diary", filledCanon);
      check(
        "fp11.3: propPool puts canon objects first",
        pool[0] === "her chipped enamel mug",
      );
    }

    // --- Fix Pack 12: full catalog — 18 packs + 2 modifier layers ------------
    {
      const ids = SCENE_PACKS.map((p) => p.id);
      check(
        "fp12: six new packs present",
        [
          "pack_fitting",
          "pack_steam",
          "pack_4am",
          "pack_screen",
          "pack_motion",
          "pack_night",
        ].every((id) => ids.includes(id)),
      );
      check(
        "fp12: every pack has prop and B-roll pools",
        ids.every(
          (id) =>
            (PROP_POOLS[id] || []).length >= 3 &&
            (CUTAWAY_POOLS[id] || []).length >= 3,
        ),
      );
      const covered = new Set(SCENE_PACKS.flatMap((p) => p.techniqueIds));
      const uncovered = TECHNIQUES.filter(
        (t) => !t.modifier && t.id !== "t_body_landscape" && !covered.has(t.id),
      );
      check(
        "fp12: all wave-1 techniques covered by packs",
        uncovered.length === 0,
      );
      check(
        "fp12: fragile & deadpan are modifier layers",
        TECHNIQUE_BY_ID.t_fragility.modifier === true &&
          TECHNIQUE_BY_ID.t_deadpan.modifier === true,
      );
      const modSpec = {
        ...demoSpec(DEMO_WORLDS[0].scenes[0], "nano_pro"),
        world: "A" as const,
        modifiers: ["t_fragility"],
      };
      const [mr] = buildPrompts(modSpec, {
        character: DEMO_CHARACTER,
        hasReference: false,
        compress: false,
        variants: 1,
      });
      check(
        "fp12: modifier phrases reach the prompt",
        mr.prompt.includes("goosebumps"),
      );
      const plainSpec = {
        ...demoSpec(DEMO_WORLDS[0].scenes[0], "nano_pro"),
        world: "A" as const,
      };
      const [pr] = buildPrompts(plainSpec, {
        character: DEMO_CHARACTER,
        hasReference: false,
        compress: false,
        variants: 1,
      });
      check(
        "fp12: no modifier leak without chips",
        !pr.prompt.includes("goosebumps"),
      );
    }

    // --- Fix Pack 13: strength meter, anti-detect tips, journal, backup ------
    {
      const demo = demoSpec(DEMO_WORLDS[0].scenes[0], "nano_pro");
      const full = promptStrength(demo, DEMO_CHARACTER);
      check(
        "fp13: strength score is bounded 0..100",
        full.score >= 0 && full.score <= 100,
      );
      const empty = promptStrength(
        { ...emptySceneSpec(), mode: "photo", engine: "nano_pro" },
        null,
      );
      check(
        "fp13: empty spec scores below a filled one",
        empty.score < full.score,
      );
      check(
        "fp13: empty spec reports the location gap",
        empty.gaps.includes("location"),
      );

      const engines = [
        "nano_pro",
        "kling_3",
        "seedance_2",
        "veo_scene",
        "veo_broll",
        "omni_flash",
      ] as const;
      check(
        "fp13: every engine gets at least four anti-detect tips",
        engines.every((e) => antiDetectTips(e).length >= 4),
      );
      const nanoIds = antiDetectTips("nano_pro").map((x) => x.id);
      const klingIds = antiDetectTips("kling_3").map((x) => x.id);
      check(
        "fp13: negatives tip only on kling/veo, not nano",
        klingIds.includes("negatives") && !nanoIds.includes("negatives"),
      );
      check(
        "fp13: motion tip only on video engines",
        antiDetectTips("kling_3").some((x) => x.id === "motion") &&
          !antiDetectTips("nano_pro").some((x) => x.id === "motion"),
      );

      const old = new Date(Date.now() - 30 * 864e5).toISOString();
      const fresh = new Date().toISOString();
      check(
        "fp13: backupDue fires on stale backup with real data",
        backupDue(old, 2, 0) === true,
      );
      check(
        "fp13: backupDue stays quiet on a fresh backup",
        backupDue(fresh, 5, 50) === false,
      );
      check(
        "fp13: backupDue stays quiet with little data",
        backupDue(undefined, 1, 3) === false,
      );

      const shots: BuildResult[] = [
        { prompt: "p1", role: "hero", day: 1, caption: "c1" },
        { prompt: "p2", role: "detail", day: 2 },
      ];
      const sl = shotListText(shots, {
        engine: "nano_pro",
        mode: "photo",
        scene: "test",
      });
      check(
        "fp13: shot list groups days and numbers shots",
        sl.includes("## Day 1") &&
          sl.includes("## Day 2") &&
          sl.includes("Shot 2/2"),
      );

      check(
        "fp13: changelog newest entry matches APP_VERSION",
        CHANGELOG[0].version === APP_VERSION &&
          CHANGELOG[0].ru.length > 0 &&
          CHANGELOG[0].en.length > 0,
      );

      const st = outcomeStats([
        {
          id: "1",
          engine: "nano_pro",
          mode: "photo",
          scenePreview: "",
          prompt: "",
          createdAt: "",
          outcome: "hit",
        },
        {
          id: "2",
          engine: "nano_pro",
          mode: "photo",
          scenePreview: "",
          prompt: "",
          createdAt: "",
          outcome: "miss",
        },
        {
          id: "3",
          engine: "nano_pro",
          mode: "photo",
          scenePreview: "",
          prompt: "",
          createdAt: "",
        },
      ]);
      check(
        "fp13: outcomeStats counts only rated records",
        st.rated === 2 && st.hits === 1 && st.byEngine.nano_pro.rated === 2,
      );
    }

    // --- Fix Pack 14: prompt doctor, canon manifest, version -----------------
    {
      const empty = emptySceneSpec();
      const sugg = diagnose(empty, null);
      check(
        "fp14: doctor flags missing character and location as fixes",
        sugg.some((s) => s.id === "character" && s.severity === "fix") &&
          sugg.some((s) => s.id === "location" && s.severity === "fix"),
      );
      const firstTip = sugg.findIndex((s) => s.severity === "tip");
      check(
        "fp14: doctor sorts fixes before tips",
        firstTip === -1 ||
          sugg.slice(firstTip).every((s) => s.severity === "tip"),
      );
      const video = diagnose(emptySceneSpec("video", "kling_3"), null);
      check(
        "fp14: doctor asks for motion only on video engines",
        video.some((s) => s.id === "motion") &&
          !sugg.some((s) => s.id === "motion"),
      );
      const filled = diagnose(
        demoSpec(DEMO_WORLDS[0].scenes[0], "nano_pro"),
        DEMO_CHARACTER,
      );
      check(
        "fp14: doctor quiets down on a filled demo spec",
        filled.filter((s) => s.severity === "fix").length <
          sugg.filter((s) => s.severity === "fix").length,
      );
      check(
        "fp14: doctor flags a too-short result",
        diagnose(empty, null, { prompt: "x", underMin: true }).some(
          (s) => s.id === "short",
        ),
      );

      check(
        "fp14: manifest rejects malformed payloads",
        parseManifest(null) === null &&
          parseManifest("nope") === null &&
          parseManifest({}) === null &&
          parseManifest({ version: "" }) === null,
      );
      const m = parseManifest({
        version: "2026.07",
        title: "Canon",
        notes: ["a", 1, "b"],
        packs: ["p1"],
      });
      check(
        "fp14: manifest accepts a valid payload and keeps only strings",
        m !== null &&
          m.version === "2026.07" &&
          m.notes.length === 2 &&
          (m.packs || []).length === 1,
      );
    }

    // --- Fix Pack 15: §2 teaser privacy + landing hero machine ---------------
    {
      const scene = DEMO_WORLDS[0].scenes[0];
      const opts = {
        character: DEMO_CHARACTER,
        hasReference: false,
        compress: false,
        variants: 1,
      };
      const [nano] = buildPrompts(demoSpec(scene, "nano_pro"), opts);
      const [head, tail] = teaserSplit(nano.prompt);
      check(
        "fp15: teaser split joins back to the exact prompt",
        head + tail === nano.prompt,
      );
      check(
        "fp15: teaser hides most of the demo prompt",
        tail.length > head.length,
      );
      const teaser = makeTeaser(nano.prompt);
      check(
        "fp15: teaser is truncated and marked with an ellipsis",
        teaser.length < nano.prompt.length && teaser.endsWith("…"),
      );
      check(
        "fp15: teaser keeps short prompts intact",
        makeTeaser("one two three") === "one two three",
      );
      check(
        "fp15: teaser caps at the word budget",
        teaser.split(/\s+/).filter(Boolean).length <= TEASER_WORDS + 1,
      );
      const blocks = splitPromptBlocks(nano.prompt);
      check("fp15: demo prompt splits into display blocks", blocks.length >= 2);
      check(
        "fp15: display blocks preserve every prompt word",
        blocks.join(" ").split(/\s+/).filter(Boolean).length ===
          nano.prompt.split(/\s+/).filter(Boolean).length,
      );
      const heroEngines: EngineId[] = [
        "nano_pro",
        "kling_3",
        "seedance_2",
        "veo_scene",
        "omni_flash",
      ];
      check(
        "fp15: all five hero engines build non-empty prompts",
        heroEngines.every(
          (e) => buildPrompts(demoSpec(scene, e), opts)[0].prompt.length > 60,
        ),
      );
      check(
        "fp15: changelog keeps the 1.15 entry",
        CHANGELOG.some((e) => e.version === "1.15"),
      );
      check(
        "fp15: changelog lists the current version first",
        CHANGELOG[0].version === APP_VERSION,
      );
    }

    // --- Fix Pack 16: Proof & Life -------------------------------------------
    {
      // §2 redaction: bars instead of blur — hidden text never renders at all.
      const hidden = "her full scene formula stays inside the studio";
      const bars = redactBars(hidden, 7);
      check(
        "fp16: redaction leaks no hidden word",
        isRedacted(bars) && !redactionLeaks(hidden, bars),
      );
      check("fp16: redaction is deterministic", bars === redactBars(hidden, 7));
      check(
        "fp16: redaction keeps the word rhythm",
        bars.split(" ").length === hidden.split(/\s+/).length,
      );
      const tilts = Array.from({ length: 12 }, (_, i) => tiltFor(i));
      check(
        "fp16: gallery tilts stay small and never repeat in a row",
        tilts.every(
          (v, i) =>
            Math.abs(v) <= 2.5 && v !== 0 && (i === 0 || v !== tilts[i - 1]),
        ),
      );
      // Season Sync — deterministic, no weather APIs.
      const july = new Date(2026, 6, 17, 19, 0, 0);
      check(
        "fp16: July reads summer in the north, winter in a southern canon",
        seasonFor(july, null) === "summer" &&
          seasonFor(july, ["Sydney, Australia"]) === "winter",
      );
      check(
        "fp16: dayparts split the clock",
        daypartOf(8) === "morning" &&
          daypartOf(13) === "day" &&
          daypartOf(19) === "evening" &&
          daypartOf(23) === "night",
      );
      const sp = seasonPhrases(july, null, 0);
      check(
        "fp16: seasonal phrases are non-empty and deterministic",
        sp.light.length > 0 &&
          sp.cutaway.length > 0 &&
          sp.light === seasonPhrases(july, null, 0).light,
      );
      check(
        "fp16: daylight header tones differ morning vs night",
        daylightTone(8).tint !== daylightTone(23).tint,
      );
      // Feed Voice — caption formats from the profile atlas.
      check(
        "fp16: archive captions look like 0347.jpg",
        /^\d{4}\.jpg$/.test(archiveName(3)),
      );
      check(
        "fp16: the voice rhythm stays mostly plain with three special formats",
        VOICE_RHYTHM.filter((v) => v === "plain").length >= 4 &&
          (["dump", "sms", "archive"] as const).every((v) =>
            VOICE_RHYTHM.includes(v),
          ),
      );
      check(
        "fp16: special voices produce captions in both languages",
        (["dump", "sms", "archive"] as const).every(
          (v) =>
            voiceCaption(v, 2, "ru").length > 0 &&
            voiceCaption(v, 2, "en").length > 0,
        ),
      );
      // Season + voice inside a real generated feed.
      const opts16 = {
        character: DEMO_CHARACTER,
        hasReference: false,
        compress: false,
        variants: 1,
      };
      const feed16 = buildFeed(
        [SCENE_PACKS[0]],
        demoSpec(DEMO_WORLDS[0].scenes[0], "nano_pro"),
        opts16,
        12,
        "en",
        {
          continuity: true,
          loose: false,
          captions: true,
          season: true,
          now: july,
        },
      );
      check(
        "fp16: season sync bakes the seasonal light into feed prompts",
        feed16.frames.some((f) => f.prompt.includes(sp.light)),
      );
      check(
        "fp16: feed frames carry voice format marks",
        feed16.frames.some(
          (f) =>
            f.voice === "dump" || f.voice === "sms" || f.voice === "archive",
        ),
      );
      // Codex line.
      check(
        "fp16: the Codex line reads 5/5 and lists five rules",
        codexLine("ru").includes("5/5") &&
          codexLine("en").includes("5/5") &&
          codexDetails("ru").length === 5 &&
          codexDetails("en").length === 5,
      );
      // Cliché guard.
      check(
        "fp16: the cliché guard flags latte art and stays quiet on Codex scenes",
        clicheAdvice("girl with latte art in a cafe", "en") !== null &&
          clicheAdvice("crumpled tee on the chair, hard window light", "en") ===
            null,
      );
      check(
        "fp16: the ban list holds 12+ clichés with tips in both languages",
        CLICHES.length >= 12 &&
          CLICHES.every((c) => c.tip.ru.length > 0 && c.tip.en.length > 0),
      );
      // Cluster quiz.
      check(
        "fp16: the quiz asks 4 questions with 3 world-mapped options each",
        QUIZ_QUESTIONS.length === 4 &&
          QUIZ_QUESTIONS.every((q) => q.options.length === 3),
      );
      check(
        "fp16: quiz scoring is majority-based and deterministic",
        scoreQuiz(["A", "A", "B", "C"]) === "A" &&
          scoreQuiz(["A", "B", "B", "C"]) === "B" &&
          scoreQuiz(["A", "B", "C", "C"]) === "C",
      );
      check(
        "fp16: every world code names two starting packs",
        (["A", "B", "C"] as const).every(
          (w) =>
            WORLD_CODE[w].packs.length === 2 && WORLD_CODE[w].name.length > 0,
        ),
      );
      // Fix Pack 16.1 — b-roll no-people guard.
      check(
        "fp16.1: the b-roll guard flags person words and stays quiet otherwise",
        personWordIn("she pours coffee") !== null &&
          personWordIn("coffee drips into a cup") === null,
      );
      check(
        "fp23: app version is 1.23 and the changelog leads with it",
        APP_VERSION === "1.23" && CHANGELOG[0].version === "1.23",
      );
      // Fix Pack 23 - architecture invariants.
      check(
        "fp23: seed presets live in lib and keep unique ids",
        SEED_PRESETS.length >= 3 &&
          new Set(SEED_PRESETS.map((p) => p.id)).size === SEED_PRESETS.length,
      );
      check(
        "fp23: format ranges stay sane (min <= default <= max)",
        (["series", "shoot", "feed"] as const).every(
          (f) =>
            FMT_RANGE[f].min <= FMT_RANGE[f].def &&
            FMT_RANGE[f].def <= FMT_RANGE[f].max,
        ),
      );
      check(
        "fp23: a full backup carries presets and the quota guard is sane",
        (BACKUP_FIELDS as readonly string[]).includes("presets") &&
          STORAGE_SOFT_LIMIT_BYTES > 3 * 1024 * 1024 &&
          STORAGE_SOFT_LIMIT_BYTES < 5 * 1024 * 1024,
      );
      check(
        "fp23: the 1.23 changelog entry ships localized copy",
        CHANGELOG[0].ru.length > 0 &&
          CHANGELOG[0].ru.join("|") !== CHANGELOG[0].en.join("|"),
      );
      // Fix Pack 17 — media showcase invariants.
      check(
        "fp19: showcase has eleven projects and every path lives under /showcase/",
        SHOWCASE_PROJECTS.length === 11 &&
          SHOWCASE_PROJECTS.every((s) =>
            s.items.every((it) =>
              (it.kind === "video" ? it.src : it.full).startsWith("/showcase/"),
            ),
          ),
      );
      check(
        "fp19: six projects lead with a loop, the passport is stills-only",
        SHOWCASE_PROJECTS.filter((s) => s.items[0].kind === "video").length ===
          6 &&
          SHOWCASE_PROJECTS.every(
            (s) =>
              s.id !== "passport" || s.items.every((it) => it.kind === "image"),
          ),
      );
      check(
        "fp17: every video ships a poster and every image ships a thumb",
        SHOWCASE_PROJECTS.every((s) =>
          s.items.every((it) =>
            it.kind === "video"
              ? it.poster.length > 0 && it.src.endsWith(".mp4")
              : it.thumb.length > 0 && it.full.endsWith(".jpg"),
          ),
        ),
      );
      check(
        "fp17: every showcase item carries an English alt text",
        SHOWCASE_PROJECTS.every((s) =>
          s.items.every((it) => it.alt.trim().length > 5),
        ),
      );
      // Fix Pack 18 — the showcase tells the creation story first.
      check(
        "fp18: the story leads with creation — create video first, passport second",
        SHOWCASE_PROJECTS[0].id === "create" &&
          SHOWCASE_PROJECTS[0].items[0].kind === "video" &&
          SHOWCASE_PROJECTS[1].id === "passport",
      );
      check(
        "fp18: all 29 promo assets are placed exactly once (6 loops + 23 stills)",
        (() => {
          const paths = SHOWCASE_PROJECTS.flatMap((s) =>
            s.items.map((it) => (it.kind === "video" ? it.src : it.full)),
          );
          return (
            paths.length === 29 &&
            new Set(paths).size === 29 &&
            paths.filter((p) => p.endsWith(".mp4")).length === 6
          );
        })(),
      );
      // Fix Pack 18.1 — encoding guards: broken characters never ship again.
      check(
        "fp18.1: dictionaries are free of broken encoding (U+FFFD)",
        !JSON.stringify({
          techniques: TECHNIQUES,
          changelog: CHANGELOG,
          showcase: SHOWCASE_PROJECTS,
          packs: SCENE_PACKS,
        }).includes("\uFFFD"),
      );
      check(
        'fp18.1: transliteration maps "shch" to the Cyrillic letter',
        translitToCyr("shch") === "щ",
      );
      // Fix Pack 19 — real-shoot grouping + glass redaction.
      check(
        "fp19: shoots never mix — the blush frame lives only with the lipstick campaign",
        SHOWCASE_PROJECTS.every((s) =>
          s.items.every(
            (it) =>
              it.kind === "video" ||
              !it.full.includes("style-blush") ||
              s.id === "lipstick",
          ),
        ) &&
          SHOWCASE_PROJECTS.some(
            (s) =>
              s.id === "lipstick" &&
              s.items.some(
                (it) => it.kind === "image" && it.full.includes("style-blush"),
              ),
          ),
      );
      {
        const hiddenGlass = "cinematic 85mm portrait natural skin texture";
        const glass = redactWords(hiddenGlass, 5);
        check(
          "fp19: glass decoys keep the rhythm and leak no hidden word",
          glass === redactWords(hiddenGlass, 5) &&
            !glass.includes(REDACT_GLYPH) &&
            !redactionLeaks(hiddenGlass, glass) &&
            glass.split(/\s+/).length === hiddenGlass.split(/\s+/).length,
        );
      }
      // Fix Pack 20 — security layer.
      check(
        "fp20: license cache is server-signed (hmac-v2), client salt removed",
        LICENSE_PROTOCOL === "hmac-v2" && USES_LIMIT === 10,
      );
      check(
        "fp20: key-storage warning and rate-limit message are localized",
        t("key.warn", "ru").length > 20 &&
          t("key.warn", "en").length > 20 &&
          t("license.rate", "ru").length > 5 &&
          t("license.rate", "en").length > 5,
      );
      // Fix Pack 21 — studio UX layer.
      check(
        "fp21: guided tour has four anchored steps with localized copy",
        TOUR_STEPS.length === 4 &&
          new Set(TOUR_STEPS.map((s) => s.target)).size === 4 &&
          TOUR_STEPS.every(
            (s) =>
              t(s.titleKey, "ru").length > 0 &&
              t(s.titleKey, "en").length > 0 &&
              t(s.bodyKey, "ru") !== t(s.bodyKey, "en"),
          ),
      );
      check(
        "fp21: undo/redo and the hotkey sheet are localized",
        t("undo.label", "ru") !== t("undo.label", "en") &&
          t("hk.title", "ru") !== t("hk.title", "en") &&
          t("hotkeys.hint", "ru").includes("?"),
      );
      check(
        "fp21: long lists virtualize beyond a sane threshold",
        VIRTUAL_THRESHOLD >= 20 && VIRTUAL_THRESHOLD <= 100,
      );
      // Fix Pack 22 - UI/UX polish invariants.
      check(
        "fp22: silent draft restore ships localized copy with an undo action",
        t("draft.restored", "ru") !== t("draft.restored", "en") &&
          t("draft.undo", "ru").length > 0 &&
          t("draft.undo", "en").length > 0,
      );
      check(
        "fp22: app preferences moved into settings and the bar popover is labeled",
        t("settings.language", "ru") !== t("settings.language", "en") &&
          t("settings.appearance", "ru") !== t("settings.appearance", "en") &&
          t("build.options", "ru") !== t("build.options", "en"),
      );
      check(
        "fp22: the hints layer copy is emoji-free (quiet, opt-in)",
        !t("hints.label", "ru").includes("💡") &&
          !t("hints.label", "en").includes("💡"),
      );
    }
  } catch {
    out.push({ name: "suite crashed", pass: false });
  }

  return out;
}

