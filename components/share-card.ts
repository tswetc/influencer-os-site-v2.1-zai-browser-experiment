// ============================================================================
// Fix Pack 16 — SHARE CARDS. One canvas module draws BOTH PNG artifacts:
// the quiz result card and the series card (3×3 rhythm). Composition rules:
// 4:5 canvas (1080×1350), 6% margins, thirds rhythm, mono code line bottom
// left, version bottom right, ZERO prompt text (§2 stays clean by design).
// ============================================================================

import type { World } from "@/lib/captions";
import { redactBars } from "@/lib/redact";
import type { Lang } from "@/lib/types";

export const CARD_W = 1080;
export const CARD_H = 1350;
const M = Math.round(CARD_W * 0.06); // 6% margin

const PAPER = "#FAFAF8";
const INK = "#161616";
const MUTED = "#8E8E89";
const HAIR = "#E4E4DF";

export const WORLD_ACCENT: Record<World, string> = {
  A: "#B0754E",
  B: "#5B6470",
  C: "#8A4B3B",
};

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

function setup(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, CARD_W, CARD_H);
  // Hairline frame — the “printed card” feel.
  ctx.strokeStyle = HAIR;
  ctx.lineWidth = 2;
  ctx.strokeRect(M / 2, M / 2, CARD_W - M, CARD_H - M);
  return ctx;
}

function header(ctx: CanvasRenderingContext2D, version: string) {
  ctx.fillStyle = MUTED;
  ctx.font = `600 26px ${MONO}`;
  ctx.textAlign = "left";
  ctx.fillText("INFLUENCER OS", M, M + 26);
  ctx.textAlign = "right";
  ctx.fillText(`v${version}`, CARD_W - M, M + 26);
  ctx.textAlign = "left";
}

function footer(ctx: CanvasRenderingContext2D, left: string, right: string) {
  ctx.fillStyle = MUTED;
  ctx.font = `500 24px ${MONO}`;
  ctx.textAlign = "left";
  ctx.fillText(left, M, CARD_H - M);
  ctx.textAlign = "right";
  ctx.fillText(right, CARD_W - M, CARD_H - M);
  ctx.textAlign = "left";
}

function wrap(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lh: number,
): number {
  const words = text.split(/\s+/);
  let line = "";
  let yy = y;
  for (const w of words) {
    const probe = line ? `${line} ${w}` : w;
    if (ctx.measureText(probe).width > maxW && line) {
      ctx.fillText(line, x, yy);
      line = w;
      yy += lh;
    } else {
      line = probe;
    }
  }
  if (line) ctx.fillText(line, x, yy);
  return yy + lh;
}

export interface QuizCardOpts {
  lang: Lang;
  world: World;
  worldName: string;
  tag: string;
  packs: [string, string];
  version: string;
}

/** The quiz result: “her code” as a collectible card. */
export function drawQuizCard(canvas: HTMLCanvasElement, o: QuizCardOpts) {
  const ctx = setup(canvas);
  if (!ctx) return;
  header(ctx, o.version);
  const accent = WORLD_ACCENT[o.world];

  // Kicker at the upper third line.
  const third = CARD_H / 3;
  ctx.fillStyle = MUTED;
  ctx.font = `600 30px ${SANS}`;
  ctx.fillText(o.lang === "ru" ? "ТВОЙ КОД" : "YOUR CODE", M, third - 60);

  // The big code.
  ctx.fillStyle = INK;
  ctx.font = `700 150px ${SANS}`;
  ctx.fillText(`${o.world} · ${o.worldName}`, M, third + 90);
  ctx.fillStyle = accent;
  ctx.fillRect(M, third + 130, 220, 10);

  // Tag line.
  ctx.fillStyle = INK;
  ctx.font = `400 40px ${SANS}`;
  const afterTag = wrap(ctx, o.tag, M, third + 220, CARD_W - 2 * M, 54);

  // Pack chips.
  let cx = M;
  const cy = afterTag + 40;
  ctx.font = `600 36px ${SANS}`;
  for (const p of o.packs) {
    const w = ctx.measureText(p).width + 64;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(cx, cy, w, 84, 42);
    ctx.stroke();
    ctx.fillStyle = INK;
    ctx.fillText(p, cx + 32, cy + 56);
    cx += w + 24;
  }

  // Decorative redaction line — “the full formula stays in the studio”.
  ctx.fillStyle = MUTED;
  ctx.font = `500 30px ${MONO}`;
  ctx.fillText(
    redactBars("identity scene technique clothing anomaly technical mood", 7),
    M,
    cy + 200,
  );
  ctx.font = `400 26px ${SANS}`;
  ctx.fillText(
    o.lang === "ru"
      ? "полная формула кода — внутри студии"
      : "the full code formula lives in the studio",
    M,
    cy + 250,
  );

  footer(
    ctx,
    `world ${o.world} · ${o.packs.join(" + ").toLowerCase()}`,
    "influencer-os",
  );
}

export interface SeriesCardOpts {
  lang: Lang;
  episode: string; // "S1·E4"
  world: World;
  worldName: string;
  packLabel: string;
  roles: Array<"hero" | "detail" | "cutaway" | "off">;
  version: string;
}

/** The series card: a 3×3 rhythm map of the generated series. Zero prompts. */
export function drawSeriesCard(canvas: HTMLCanvasElement, o: SeriesCardOpts) {
  const ctx = setup(canvas);
  if (!ctx) return;
  header(ctx, o.version);
  const accent = WORLD_ACCENT[o.world];

  ctx.fillStyle = INK;
  ctx.font = `700 88px ${SANS}`;
  ctx.fillText(
    o.lang === "ru" ? `СЕРИЯ ${o.episode}` : `SERIES ${o.episode}`,
    M,
    M + 150,
  );
  ctx.fillStyle = MUTED;
  ctx.font = `400 34px ${SANS}`;
  ctx.fillText(`${o.world} · ${o.worldName} · ${o.packLabel}`, M, M + 210);

  // 3×3 rhythm grid.
  const gap = 24;
  const top = M + 280;
  const cell = Math.floor((CARD_W - 2 * M - 2 * gap) / 3);
  const glyph: Record<string, (x: number, y: number) => void> = {
    hero: (x, y) => {
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(x, y, 44, 0, Math.PI * 2);
      ctx.fill();
    },
    detail: (x, y) => {
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(x, y, 44, Math.PI / 2, (Math.PI * 3) / 2);
      ctx.fill();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(x, y, 44, 0, Math.PI * 2);
      ctx.stroke();
    },
    cutaway: (x, y) => {
      ctx.strokeStyle = accent;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(x, y, 44, 0, Math.PI * 2);
      ctx.stroke();
    },
    off: (x, y) => {
      ctx.strokeStyle = MUTED;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(x - 34, y - 34);
      ctx.lineTo(x + 34, y + 34);
      ctx.moveTo(x + 34, y - 34);
      ctx.lineTo(x - 34, y + 34);
      ctx.stroke();
    },
  };
  const names: Record<Lang, Record<string, string>> = {
    ru: { hero: "hero", detail: "деталь", cutaway: "B-roll", off: "сбой" },
    en: { hero: "hero", detail: "detail", cutaway: "B-roll", off: "break" },
  };
  for (let i = 0; i < 9; i++) {
    const role = o.roles[i] ?? "hero";
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = M + col * (cell + gap);
    const y = top + row * (cell + gap);
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = HAIR;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x, y, cell, cell, 20);
    ctx.fill();
    ctx.stroke();
    glyph[role](x + cell / 2, y + cell / 2 - 14);
    ctx.fillStyle = MUTED;
    ctx.font = `500 26px ${MONO}`;
    ctx.textAlign = "center";
    ctx.fillText(names[o.lang][role], x + cell / 2, y + cell - 28);
    ctx.textAlign = "left";
  }

  ctx.fillStyle = MUTED;
  ctx.font = `400 28px ${SANS}`;
  ctx.fillText(
    o.lang === "ru"
      ? "ритм серии — без единого промпта"
      : "the series rhythm — zero prompts inside",
    M,
    top + 3 * cell + 2 * gap + 70,
  );

  footer(
    ctx,
    `world ${o.world} · ${o.packLabel.toLowerCase()}`,
    `influencer-os · v${o.version}`,
  );
}

/** Download a canvas as PNG. */
export function downloadPng(canvas: HTMLCanvasElement, filename: string) {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = filename;
  a.click();
}

const EPISODE_KEY = "ios_episode";

/** Episode numbering S1·E№ — a local counter, +1 per exported card. */
export function nextEpisode(): string {
  let n = 1;
  try {
    n = Number(window.localStorage.getItem(EPISODE_KEY) || "0") + 1;
    window.localStorage.setItem(EPISODE_KEY, String(n));
  } catch {
    // private mode — stay at episode 1
  }
  return `S1·E${n}`;
}
