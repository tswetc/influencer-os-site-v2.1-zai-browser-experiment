"use client";

// Fix Pack 15 — landing "wow" layer. The hero runs the REAL prompt builder
// in front of the visitor: the scene types itself out, prompt blocks
// assemble one by one, engines morph, the strength gauge fills and the
// 9-frame grid reveals. §2 rule (marketing brief): full prompt text never
// renders readable on public surfaces — only block heads are visible,
// the rest is REPLACED by redaction bars (Fix Pack 16) — the hidden words
// never reach the DOM at all.

import { useEffect, useMemo, useRef, useState } from "react";
import { redactWords, seedRand } from "@/lib/redact";
import { buildPrompts } from "@/lib/engines";
import {
  DEMO_CHARACTER,
  DEMO_SCENE_TEXT,
  DEMO_WORLDS,
  demoSpec,
  splitPromptBlocks,
} from "@/lib/demo";
import { promptStrength } from "@/lib/strength";
import type { EngineId, Lang } from "@/lib/types";

export type HeroMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
} | null;

type Copy = Record<Lang, string>;

const T: Record<string, Copy> = {
  machineTitle: { ru: "Сцена → промпт, вживую", en: "Scene → prompt, live" },
  words: { ru: "слов", en: "words" },
  fullNote: {
    ru: "Полная структура промпта — в студии",
    en: "The full prompt structure lives in the studio",
  },
  gridNote: { ru: "9 кадров · одно лицо", en: "9 frames · one face" },
  madeNote: {
    ru: "сделано по промптам студии",
    en: "made with studio prompts",
  },
  beforeLabel: { ru: "Референс", en: "Reference" },
  afterLabel: { ru: "Результат", en: "Result" },
};

const HERO_ENGINES: Array<{ id: EngineId; label: string }> = [
  { id: "nano_pro", label: "Nano" },
  { id: "kling_3", label: "Kling" },
  { id: "seedance_2", label: "Seedance" },
  { id: "veo_scene", label: "Veo" },
  { id: "omni_flash", label: "Omni" },
];

// How many words of each block stay readable (§2: structure, not the text).
const HEAD_WORDS = 6;

function splitHead(text: string, words: number): [string, string] {
  let count = 0;
  const re = /\S+/g;
  let m: RegExpExecArray | null = re.exec(text);
  while (m) {
    count += 1;
    if (count === words) {
      const idx = m.index + m[0].length;
      return [text.slice(0, idx), text.slice(idx)];
    }
    m = re.exec(text);
  }
  return [text, ""];
}

// Fix Pack 19 — glass redaction. The hidden tail is replaced by decoy
// pseudo-words (lib/redact.ts) and each decoy gets its own gaussian blur
// density plus a subtle colored glass tint, with a light sheen on top.
// Beautiful — and safe: the real words never reach the DOM, so the blur
// cannot be "un-blurred" back into the prompt (§2).
const GLASS_TINTS = [
  "rgba(96,105,255,0.55)",
  "rgba(56,142,255,0.5)",
  "rgba(168,102,255,0.45)",
  "rgba(120,120,135,0.55)",
];

export function GlassText({
  hidden,
  seed = 0,
}: {
  hidden: string;
  seed?: number;
}) {
  const words = useMemo(
    () => redactWords(hidden, seed).split(" "),
    [hidden, seed],
  );
  return (
    <span aria-hidden="true" className="relative inline select-none">
      {" "}
      {words.map((w, i) => {
        const blur = 2.2 + seedRand(seed * 131 + i) * 3.4;
        const tint =
          GLASS_TINTS[Math.floor(seedRand(seed + i * 17) * GLASS_TINTS.length)];
        return (
          <span
            key={`${w}_${i}`}
            style={{
              color: tint,
              filter: `blur(${blur.toFixed(1)}px)`,
              opacity: 0.55 + seedRand(i * 7 + seed) * 0.35,
            }}
          >
            {w}{" "}
          </span>
        );
      })}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </span>
  );
}

/** Animated strength dial (0..100). */
export function StrengthGauge({ value }: { value: number }) {
  const r = 25;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <svg
      viewBox="0 0 60 60"
      className="h-14 w-14 shrink-0"
      role="img"
      aria-label={`${v}/100`}
    >
      <circle
        cx="30"
        cy="30"
        r={r}
        fill="none"
        strokeWidth="5"
        stroke="currentColor"
        className="text-border"
      />
      <circle
        cx="30"
        cy="30"
        r={r}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        stroke="currentColor"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - v / 100)}
        transform="rotate(-90 30 30)"
        className="text-primary transition-[stroke-dashoffset] duration-700 ease-out"
      />
      <text
        x="30"
        y="34.5"
        textAnchor="middle"
        fill="currentColor"
        className="text-foreground"
        fontSize="13"
        fontWeight="600"
      >
        {v}
      </text>
    </svg>
  );
}

/** Small "living passport photo" next to the hero copy. */
export function LivePortrait({
  media,
  caption,
}: {
  media: HeroMedia;
  caption: string;
}) {
  if (!media) return null;
  return (
    <figure className="w-[150px] shrink-0 sm:w-[190px]">
      <div className="overflow-hidden rounded-2xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
        {media.type === "video" ? (
          <video
            src={media.src}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
            className="block aspect-[4/5] w-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.src}
            alt=""
            className="block aspect-[4/5] w-full object-cover"
          />
        )}
      </div>
      <figcaption className="mt-2 text-center text-[12px] leading-snug text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

/**
 * The hero machine: types the scene, assembles prompt blocks, cycles all
 * five engines and reveals the 3x3 grid (a single collage sliced by CSS).
 */
export function HeroShowcase({
  lang,
  gridImage,
}: {
  lang: Lang;
  gridImage?: string;
}) {
  const t = (k: string) => T[k][lang] || T[k].en;
  const scene = DEMO_WORLDS[0].scenes[0];
  const sceneText = DEMO_SCENE_TEXT[lang] || DEMO_SCENE_TEXT.en;

  const engines = useMemo(() => {
    const opts = {
      character: DEMO_CHARACTER,
      hasReference: false,
      compress: false,
      variants: 1,
    };
    return HERO_ENGINES.map((e) => {
      const [built] = buildPrompts(demoSpec(scene, e.id), opts);
      return {
        ...e,
        words: built.words,
        blocks: splitPromptBlocks(built.prompt),
        score: promptStrength(demoSpec(scene, e.id), DEMO_CHARACTER).score,
      };
    });
  }, [scene]);

  const [typed, setTyped] = useState(0);
  const [engineIdx, setEngineIdx] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [gridCells, setGridCells] = useState(0);
  const [paused, setPaused] = useState(false);
  const manual = useRef(false);

  const typing = typed < sceneText.length;
  const active = engines[engineIdx];

  // 1) Type the scene once on mount.
  useEffect(() => {
    setTyped(0);
    const id = window.setInterval(() => {
      setTyped((n) => {
        if (n >= sceneText.length) {
          window.clearInterval(id);
          return n;
        }
        return n + 2;
      });
    }, 24);
    return () => window.clearInterval(id);
  }, [sceneText]);

  // 2) Reveal prompt blocks one by one (restarts on every engine morph).
  useEffect(() => {
    if (typing) return;
    setRevealed(0);
    const total = active.blocks.length;
    const id = window.setInterval(() => {
      setRevealed((n) => {
        if (n >= total) {
          window.clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 320);
    return () => window.clearInterval(id);
  }, [typing, engineIdx, active.blocks.length]);

  // 3) Reveal the grid cells once, right after the first assembly starts.
  useEffect(() => {
    if (typing || !gridImage) return;
    const id = window.setInterval(() => {
      setGridCells((n) => {
        if (n >= 9) {
          window.clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 360);
    return () => window.clearInterval(id);
  }, [typing, gridImage]);

  // 4) Auto-advance to the next engine (hover pauses, a manual pick stops).
  useEffect(() => {
    if (typing || paused || manual.current) return;
    if (revealed < active.blocks.length) return;
    const id = window.setTimeout(() => {
      setEngineIdx((i) => (i + 1) % engines.length);
    }, 2600);
    return () => window.clearTimeout(id);
  }, [
    typing,
    paused,
    revealed,
    engineIdx,
    active.blocks.length,
    engines.length,
  ]);

  const progress =
    active.blocks.length > 0 ? revealed / active.blocks.length : 0;

  const cardCls =
    "rounded-2xl border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)]";

  return (
    <section
      className="mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`grid gap-4 ${gridImage ? "sm:grid-cols-[3fr_2fr]" : ""}`}
      >
        {/* The machine */}
        <div className={`${cardCls} p-5`}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {t("machineTitle")}
          </p>
          <p className="mt-3 min-h-[40px] font-mono text-[13px] leading-relaxed text-foreground">
            {sceneText.slice(0, typed)}
            <span
              className={`ml-0.5 inline-block h-[13px] w-[7px] translate-y-[2px] bg-primary ${
                typing ? "animate-pulse" : "opacity-0"
              }`}
            />
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {engines.map((e, i) => (
              <button
                key={e.id}
                type="button"
                aria-pressed={i === engineIdx}
                onClick={() => {
                  manual.current = true;
                  setEngineIdx(i);
                }}
                className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors duration-200 ${
                  i === engineIdx
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-ring/40"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
          <div className="mt-3 space-y-1.5" aria-hidden="true">
            {active.blocks.map((b, i) => {
              const [bHead, bTail] = splitHead(b, HEAD_WORDS);
              const on = !typing && i < revealed;
              return (
                <div
                  key={`${active.id}_${i}`}
                  className={`rounded-md border border-border bg-background px-3 py-2 transition-all duration-300 ${
                    on ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                  }`}
                >
                  <p className="max-h-[38px] select-none overflow-hidden font-mono text-[12px] leading-relaxed">
                    <span className="text-foreground">{bHead}</span>
                    {bTail ? <GlassText hidden={bTail} seed={i} /> : null}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-[12px] tabular-nums text-muted-foreground">
              {active.label} · {Math.round((active.words ?? 0) * progress)}{" "}
              {t("words")}
              <br />
              {t("fullNote")}
            </p>
            <StrengthGauge value={active.score * progress} />
          </div>
        </div>

        {/* The 9-frame reveal grid (one collage, sliced into cells) */}
        {gridImage ? (
          <div className={`${cardCls} p-5`}>
            <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-xl">
              {Array.from({ length: 9 }, (_, i) => {
                const col = i % 3;
                const row = Math.floor(i / 3);
                const on = i < gridCells;
                return (
                  <div
                    key={i}
                    className={`aspect-[3/4] bg-muted transition-all duration-500 ${
                      on
                        ? "scale-100 opacity-100"
                        : "scale-[0.98] animate-pulse opacity-40"
                    }`}
                    style={
                      on
                        ? {
                            backgroundImage: `url(${gridImage})`,
                            backgroundSize: "300% 300%",
                            backgroundPosition: `${col * 50}% ${row * 50}%`,
                          }
                        : undefined
                    }
                  />
                );
              })}
            </div>
            <p className="mt-2 text-center text-[12px] text-muted-foreground">
              {t("gridNote")} · {t("madeNote")}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** Draggable before/after comparison. Hidden until assets are configured. */
export function BeforeAfterSlider({
  lang,
  before,
  after,
}: {
  lang: Lang;
  before: string;
  after: string;
}) {
  const t = (k: string) => T[k][lang] || T[k].en;
  const [pos, setPos] = useState(50);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={after}
        alt={t("afterLabel")}
        draggable={false}
        className="block w-full select-none"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={before}
        alt={t("beforeLabel")}
        draggable={false}
        className="absolute inset-0 h-full w-full select-none object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-primary"
        style={{ left: `${pos}%` }}
      />
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${t("beforeLabel")} / ${t("afterLabel")}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <span className="absolute left-2 top-2 rounded-full bg-background/80 px-2 py-0.5 text-[12px] text-foreground">
        {t("beforeLabel")}
      </span>
      <span className="absolute right-2 top-2 rounded-full bg-background/80 px-2 py-0.5 text-[12px] text-foreground">
        {t("afterLabel")}
      </span>
    </div>
  );
}
