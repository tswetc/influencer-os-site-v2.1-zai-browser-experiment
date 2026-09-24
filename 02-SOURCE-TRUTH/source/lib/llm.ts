// Optional LLM helpers on top of the connected model: scene enhancement,
// unknown-word translation, prompt critique, and the assistant chat protocol.
// Final prompts are STILL built deterministically in engines.ts — the LLM only
// helps the user describe the scene and review/tweak results.

import type { EngineId, Lang, Mode } from "./types";
import { chatLlm, type LlmConfig, type LlmResult } from "./vision";

const HARD_RULES = `Hard rules (never violate):
- Generated prompts are always ENGLISH, physical/observable terms only.
- Photorealism canon: natural skin texture; never suggest beauty filters, skin smoothing or retouching.
- Never add seed parameters, watermarks or text overlays.
- Canonical blocks must stay VERBATIM if present: the device string ("black iPhone 15 Pro Max..."), the "natural skin texture..." block, negative prompt blocks, motion intensity values, "(no subtitles)", "Use Flow.", "under 10 seconds", @image/@video/@audio tags.`;

// --- Scene enhancement ----------------------------------------------------------

export async function enhanceScene(
  cfg: LlmConfig,
  sceneText: string,
  lang: Lang,
): Promise<LlmResult> {
  const langName = lang === "ru" ? "Russian" : "English";
  return chatLlm(
    cfg,
    [
      {
        role: "user",
        text: `You improve scene descriptions for an AI-influencer photo/video prompt builder. Rewrite the description below with more specific physical detail (location, lighting, camera, pose, outfit, mood). Keep it believable and non-generic. Reply in ${langName} with the rewritten description ONLY: max 40 words, comma-separated phrases, no quotes.\n\n${sceneText}`,
      },
    ],
    300,
  );
}

// --- Unknown-word translation -----------------------------------------------------

export interface TranslatedWord {
  word: string;
  en: string;
  cat: "location" | "lighting" | "camera" | "pose" | "outfit" | "mood";
}

const CATS = new Set([
  "location",
  "lighting",
  "camera",
  "pose",
  "outfit",
  "mood",
]);

export async function translateWords(
  cfg: LlmConfig,
  words: string[],
): Promise<{
  ok: boolean;
  entries: TranslatedWord[];
  error?: LlmResult["error"];
}> {
  const res = await chatLlm(
    cfg,
    [
      {
        role: "user",
        text: `Translate each word into a short English visual tag (1-3 words, lowercase) for photo/video prompts and classify it. Categories: location, lighting, camera, pose, outfit, mood. Reply ONLY with a JSON array like [{"word":"...","en":"...","cat":"..."}].\nWords: ${words.join(", ")}`,
      },
    ],
    400,
  );
  if (!res.ok) return { ok: false, entries: [], error: res.error };
  const m = res.text.match(/\[[\s\S]*\]/);
  if (!m) return { ok: false, entries: [], error: "empty" };
  try {
    const raw = JSON.parse(m[0]) as Array<Record<string, unknown>>;
    const entries: TranslatedWord[] = [];
    for (const r of raw) {
      const word =
        typeof r.word === "string" ? r.word.toLowerCase().trim() : "";
      const en = typeof r.en === "string" ? r.en.toLowerCase().trim() : "";
      const cat =
        typeof r.cat === "string" && CATS.has(r.cat)
          ? (r.cat as TranslatedWord["cat"])
          : "mood";
      if (word && en) entries.push({ word, en, cat });
    }
    return {
      ok: entries.length > 0,
      entries,
      error: entries.length > 0 ? undefined : "empty",
    };
  } catch {
    return { ok: false, entries: [], error: "empty" };
  }
}

// --- Prompt critique --------------------------------------------------------------

export async function critiquePrompt(
  cfg: LlmConfig,
  prompt: string,
  engine: EngineId,
  lang: Lang,
): Promise<LlmResult> {
  const langName = lang === "ru" ? "Russian" : "English";
  return chatLlm(
    cfg,
    [
      {
        role: "user",
        text: `You review prompts for a photorealistic UGC AI-influencer pipeline (engine: ${engine}).\n${HARD_RULES}\nCheck the prompt: photorealism wording, physical observable terms, internal contradictions (lighting vs location vs time), length sanity. Reply in ${langName}: at most 4 short bullet points starting with "\u2022 ", most important first. If it fully follows the canon, reply with exactly one short confirming line.\n\nPROMPT:\n${prompt}`,
      },
    ],
    400,
  );
}

// --- Assistant chat ---------------------------------------------------------------

export interface AssistantSuggestion {
  reply: string;
  scene?: string;
  prompt?: string;
}

export function buildAssistantSystem(args: {
  mode: Mode;
  engine: EngineId;
  sceneText: string;
  prompt: string | null;
  lang: Lang;
}): string {
  const langName = args.lang === "ru" ? "Russian" : "English";
  return [
    `You are the built-in assistant of Influencer OS, a prompt builder for AI-influencer photos and videos. Answer in ${langName}, max 80 words, concrete and neutral, no flattery.`,
    HARD_RULES,
    `Current state: mode=${args.mode}, engine=${args.engine}.`,
    `Scene description: ${args.sceneText || "(empty)"}`,
    args.prompt
      ? `Current generated prompt:\n${args.prompt}`
      : "No prompt has been generated yet.",
    `If the user wants to change the SCENE, include the full new scene description (same language as the user) wrapped exactly in [SCENE]...[/SCENE].`,
    `If a prompt exists and the user asks to tweak the result, include the FULL edited English prompt wrapped exactly in [PROMPT]...[/PROMPT]; change only what was asked and keep every canonical block verbatim.`,
    `Use a block only when the user asks for a change. Plain questions get a plain answer.`,
  ].join("\n");
}

export function parseAssistant(text: string): AssistantSuggestion {
  const scene = text.match(/\[SCENE\]([\s\S]*?)\[\/SCENE\]/i)?.[1]?.trim();
  const prompt = text.match(/\[PROMPT\]([\s\S]*?)\[\/PROMPT\]/i)?.[1]?.trim();
  const reply = text
    .replace(/\[SCENE\][\s\S]*?\[\/SCENE\]/gi, "")
    .replace(/\[PROMPT\][\s\S]*?\[\/PROMPT\]/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { reply, scene: scene || undefined, prompt: prompt || undefined };
}

// Canonical fragments that must survive a manual prompt edit.
const CANON_FRAGMENTS: Array<{ label: string; text: string }> = [
  {
    label: "device",
    text: "black iPhone 15 Pro Max in a transparent silicone case",
  },
  { label: "skin texture", text: "natural skin texture with visible pores" },
  { label: "sensor noise", text: "subtle digital sensor noise" },
  { label: "(no subtitles)", text: "(no subtitles)" },
  { label: "Use Flow.", text: "Use Flow." },
  { label: "under 10 seconds", text: "under 10 seconds" },
];

/** Returns labels of canonical fragments that an edit removed (must be empty). */
export function checkPromptEdit(original: string, edited: string): string[] {
  const lost: string[] = [];
  for (const f of CANON_FRAGMENTS) {
    if (original.includes(f.text) && !edited.includes(f.text)) {
      lost.push(f.label);
    }
  }
  if (/\bseed\b/i.test(edited) && !/\bseed\b/i.test(original)) {
    lost.push("seed");
  }
  return lost;
}

