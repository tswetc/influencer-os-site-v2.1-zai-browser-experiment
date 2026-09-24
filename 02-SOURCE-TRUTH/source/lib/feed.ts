// ============================================================================
// Fix Pack 11.2 — FEED: a ready slice of a profile, 12–30 frames (step 2).
// 2–3 shoots from packs of ONE world (mixing worlds is allowed but flagged),
// ~20% cutaways woven in by a rhythm template (hero → hero → cutaway → hero →
// detail), exactly ONE deliberately broken frame (role "off") near the end,
// captions + posting-day marks. Deterministic; re-roll bumps one frame's seed.
// ============================================================================

import {
  assignDays,
  caption,
  type CaptionVoice,
  voiceCaption,
  voiceFor,
} from "./captions";
import { buildCutaway } from "./cutaways";
import { type BuildOptions, buildPrompts } from "./engines";
import type { PackScene, ScenePack } from "./packs";
import {
  DETAIL_FRAMING,
  type FrameRole,
  heroPhrase,
  LOCATION_DRIFT,
  LOOSE_BREAKS,
  pick,
  propPool,
} from "./shoot";
import { seasonPhrases } from "./season";
import type { BuildResult, Lang, ModelCanon, SceneSpec } from "./types";

export interface FeedConfig {
  continuity: boolean;
  loose: boolean;
  captions: boolean;
  seed?: number;
  seeds?: number[];
  /** Fix Pack 11.3: the model's canon; null/empty = pack defaults. */
  canon?: ModelCanon | null;
  /** Fix Pack 16: bake the canon city's season into light / wardrobe. */
  season?: boolean;
  /** Fixed date injection point (selfcheck); defaults to now. */
  now?: Date;
}

export interface FeedPlanItem {
  role: FrameRole;
  shoot: number;
}

export interface FeedOutput {
  frames: BuildResult[];
  mixedWorlds: boolean;
  size: number;
}

export function clampFeedSize(n: number): number {
  return Math.min(30, Math.max(12, Math.round(n / 2) * 2));
}

/**
 * Rhythm template, not random: hero → hero → cutaway → hero → detail, cycled;
 * shoots are contiguous chunks (a real profile drops shoots in batches);
 * exactly one hero near the end becomes the broken "off" frame.
 */
export function planFeed(size: number): FeedPlanItem[] {
  const n = clampFeedSize(size);
  const shoots = n <= 18 ? 2 : 3;
  const pattern: FrameRole[] = ["hero", "hero", "cutaway", "hero", "detail"];
  const items: FeedPlanItem[] = [];
  for (let i = 0; i < n; i++) {
    items.push({
      role: pattern[i % pattern.length],
      shoot: Math.min(shoots - 1, Math.floor(i / (n / shoots))),
    });
  }
  for (let i = n - 2; i >= 0; i--) {
    if (items[i].role === "hero") {
      items[i] = { ...items[i], role: "off" };
      break;
    }
  }
  return items;
}

/** Apply a pack scene onto the base spec (same wiring as applying a pack). */
export function specFromPackScene(
  base: SceneSpec,
  pack: ScenePack,
  scene: PackScene,
): SceneSpec {
  return {
    ...base,
    location: scene.fields.location,
    lighting: scene.fields.lighting,
    pose: scene.fields.pose,
    outfit: scene.fields.outfit,
    mood: scene.fields.mood,
    capture: scene.capture,
    style: scene.style,
    world: pack.world,
    technique: scene.techniqueId,
  };
}

export function buildFeed(
  packs: ScenePack[],
  base: SceneSpec,
  opts: BuildOptions,
  size: number,
  lang: Lang,
  cfg: FeedConfig,
): FeedOutput {
  const chosen = packs.slice(0, 3);
  const plan = planFeed(size);
  const seed = cfg.seed ?? 0;
  // Fix Pack 16 — Season Sync: one quiet seasonal layer, no weather APIs.
  const sz = cfg.season
    ? seasonPhrases(cfg.now ?? new Date(), cfg.canon?.place ?? null, seed)
    : null;
  const mixedWorlds = new Set(chosen.map((p) => p.world)).size > 1;
  const shootsCount = Math.max(...plan.map((p) => p.shoot)) + 1;
  // One scene = one location + one outfit per shoot; packs cycled across shoots.
  const shootScenes = Array.from({ length: shootsCount }, (_, k) => {
    const pack = chosen[k % chosen.length];
    const scene = pack.scenes[(seed + k) % pack.scenes.length];
    const spec = specFromPackScene(base, pack, scene);
    if (sz) {
      spec.lighting = [spec.lighting, sz.light].filter(Boolean).join(", ");
      if (k === 0)
        spec.outfit = [spec.outfit, sz.wardrobe].filter(Boolean).join(", ");
    }
    return { pack, spec };
  });
  const days = assignDays(plan.length);
  let heroN = 0;
  let detailN = 0;
  let cutN = 0;
  const frames = plan.map((item, i) => {
    const s = cfg.seeds?.[i] ?? seed;
    const { pack, spec } = shootScenes[item.shoot];
    // Fix Pack 16 — Feed Voice: some hero/detail captions drop in a special
    // format (photo-dump / unsent sms / archive numbering).
    const voice: CaptionVoice =
      cfg.captions && (item.role === "hero" || item.role === "detail")
        ? voiceFor(i, s)
        : "plain";
    const vCap = voice === "plain" ? "" : voiceCaption(voice, s + i, lang);
    const cap = cfg.captions
      ? vCap || caption(pack.world, item.role, s + i, lang, cfg.canon)
      : undefined;
    if (item.role === "cutaway") {
      cutN++;
      const r = buildCutaway(
        pack,
        s + i,
        lang,
        opts.character?.device,
        cfg.canon,
      );
      return {
        ...r,
        // Fix Pack 16: the first cutaway carries the seasonal cue.
        prompt: sz && cutN === 1 ? `${r.prompt} ${sz.cutaway}` : r.prompt,
        role: "cutaway" as const,
        caption: cap,
        day: days[i],
        label: `B-roll ${cutN} · ${r.label ?? ""}`,
      };
    }
    const drift = cfg.continuity ? "" : pick(LOCATION_DRIFT, s + i);
    let pose: string;
    if (item.role === "detail") {
      detailN++;
      pose = `${DETAIL_FRAMING}, holding ${pick(propPool(pack.id, cfg.canon), s + i)}`;
    } else {
      pose = [
        spec.pose,
        heroPhrase(
          heroN,
          s + i,
          pack.id,
          cfg.loose && item.role !== "off",
          cfg.canon,
        ),
      ]
        .filter(Boolean)
        .join(", ");
      if (item.role === "off") pose = `${pose}, ${pick(LOOSE_BREAKS, s + i)}`;
      heroN++;
    }
    const frameSpec: SceneSpec = {
      ...spec,
      location: [spec.location, drift].filter(Boolean).join(", "),
      pose,
    };
    const r = buildPrompts(frameSpec, { ...opts, variants: 1 })[0];
    const label =
      item.role === "off"
        ? lang === "ru"
          ? "OFF-кадр · одно нарушение Codex"
          : "OFF frame · one broken Codex rule"
        : item.role === "detail"
          ? `${lang === "ru" ? "Деталь" : "Detail"} ${detailN}`
          : `Hero ${heroN}`;
    return {
      ...r,
      role: item.role,
      caption: cap,
      day: days[i],
      label,
      voice: voice === "plain" ? undefined : voice,
    };
  });
  return { frames, mixedWorlds, size: plan.length };
}

// --- Fix Pack 16: Codex Line ---------------------------------------------------

/** One quiet line under a generated feed: the codex holds. */
export function codexLine(lang: Lang): string {
  return lang === "ru"
    ? "Codex 5/5 · одно намеренное нарушение"
    : "Codex 5/5 · one intentional break";
}

/** The five codex rules behind the line (popover content). */
export function codexDetails(lang: Lang): string[] {
  return lang === "ru"
    ? [
        "один мир на ленту — эстетика не смешивается",
        "hero → hero → B-roll → hero → деталь",
        "~20% кадров — B-roll без человека",
        "ровно один кадр намеренно нарушает Codex",
        "подписи — голосом мира или её собственными словами",
      ]
    : [
        "one world per feed — aesthetics never mix",
        "rhythm hero → hero → B-roll → hero → detail",
        "~20% of frames are no-person B-roll",
        "exactly one frame breaks Codex on purpose",
        "captions speak the world's voice or her own words",
      ];
}

