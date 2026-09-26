// Multi-provider LLM adapter. The API key NEVER leaves the browser:
// requests go DIRECTLY from the client to the provider endpoint.

import { base64Payload } from "./images";
import type { VisionProvider } from "./types";

// Default model slugs kept as single editable constants.
export const MODEL_ANTHROPIC = "claude-sonnet-4-6";
export const MODEL_OPENAI = "gpt-5.4-mini";
export const MODEL_GEMINI = "gemini-3.5-flash";

export const OPENROUTER_ENDPOINT =
  "https://openrouter.ai/api/v1/chat/completions";

// Editable examples of free vision-capable OpenRouter models (":free" = free tier).
export const OPENROUTER_FREE_MODELS = [
  "qwen/qwen2.5-vl-72b-instruct:free",
  "google/gemini-2.0-flash-exp:free",
  "meta-llama/llama-3.2-11b-vision-instruct:free",
];

export interface LlmConfig {
  provider: VisionProvider;
  apiKey: string;
  model?: string; // "" = provider default
  customEndpoint?: string; // OpenAI-compatible base URL for provider "custom"
}

type Wire = "anthropic" | "openai" | "gemini";

/** Resolve provider config into a wire format, endpoint, model and headers. */
export function resolveLlm(cfg: LlmConfig): {
  wire: Wire;
  endpoint: string;
  model: string;
  headers: Record<string, string>;
} {
  const key = cfg.apiKey;
  switch (cfg.provider) {
    case "openai":
      return {
        wire: "openai",
        endpoint: "https://api.openai.com/v1/chat/completions",
        model: cfg.model || MODEL_OPENAI,
        headers: {
          Authorization: "Bearer " + key,
          "content-type": "application/json",
        },
      };
    case "gemini": {
      const model = cfg.model || MODEL_GEMINI;
      return {
        wire: "gemini",
        endpoint:
          "https://generativelanguage.googleapis.com/v1beta/models/" +
          model +
          ":generateContent",
        model,
        headers: {
          "x-goog-api-key": key,
          "content-type": "application/json",
        },
      };
    }
    case "openrouter":
      return {
        wire: "openai",
        endpoint: OPENROUTER_ENDPOINT,
        model: cfg.model || OPENROUTER_FREE_MODELS[0],
        headers: {
          Authorization: "Bearer " + key,
          "content-type": "application/json",
        },
      };
    case "custom": {
      let base = (cfg.customEndpoint || "").trim().replace(/\/+$/, "");
      if (base && !/\/chat\/completions$/.test(base)) {
        base = /\/v\d+$/.test(base)
          ? base + "/chat/completions"
          : base + "/v1/chat/completions";
      }
      return {
        wire: "openai",
        endpoint: base,
        model: cfg.model || "",
        headers: {
          Authorization: "Bearer " + key,
          "content-type": "application/json",
        },
      };
    }
    default:
      return {
        wire: "anthropic",
        endpoint: "https://api.anthropic.com/v1/messages",
        model: cfg.model || MODEL_ANTHROPIC,
        headers: {
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
          "content-type": "application/json",
        },
      };
  }
}

// --- Chat core ----------------------------------------------------------------

export type LlmErrorCode =
  | "auth"
  | "credits"
  | "ratelimit"
  | "notfound"
  | "novision"
  | "network"
  | "empty"
  | "http";

export interface LlmResult {
  ok: boolean;
  text: string;
  error?: LlmErrorCode;
  status?: number;
}

// Kept as an alias for backward compatibility with earlier call sites.
export type VisionResult = LlmResult;

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  text: string;
  imageDataUrl?: string;
}

const TIMEOUT_MS = 30000;
const RETRY_STATUS = new Set([429, 500, 502, 503, 529]);

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** Up to 3 attempts with backoff on 429/5xx and network hiccups. */
async function fetchWithRetry(
  url: string,
  init: RequestInit,
): Promise<Response> {
  let last: Response | null = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await sleep(1200 * attempt);
    try {
      const res = await fetchWithTimeout(url, init);
      if (!RETRY_STATUS.has(res.status)) return res;
      last = res;
    } catch {
      if (attempt === 2) throw new Error("network");
    }
  }
  if (last) return last;
  throw new Error("network");
}

function codeForStatus(status: number, hadImage: boolean): LlmErrorCode {
  if (status === 401 || status === 403) return "auth";
  if (status === 402) return "credits";
  if (status === 429) return "ratelimit";
  if (status === 404) return "notfound";
  if (status === 400 && hadImage) return "novision";
  return "http";
}

function buildBody(
  wire: Wire,
  model: string,
  messages: ChatMessage[],
  maxTokens: number,
): unknown {
  if (wire === "openai") {
    return {
      model,
      max_tokens: maxTokens,
      messages: messages.map((m) => {
        if (m.imageDataUrl && m.role === "user") {
          return {
            role: m.role,
            content: [
              { type: "text", text: m.text },
              { type: "image_url", image_url: { url: m.imageDataUrl } },
            ],
          };
        }
        return { role: m.role, content: m.text };
      }),
    };
  }
  if (wire === "gemini") {
    const system = messages
      .filter((m) => m.role === "system")
      .map((m) => m.text)
      .join("\n");
    const contents = messages
      .filter((m) => m.role !== "system")
      .map((m) => {
        const parts: unknown[] = [{ text: m.text }];
        if (m.imageDataUrl) {
          const { mediaType, data } = base64Payload(m.imageDataUrl);
          parts.push({ inline_data: { mime_type: mediaType, data } });
        }
        return { role: m.role === "assistant" ? "model" : "user", parts };
      });
    const body: Record<string, unknown> = {
      contents,
      generationConfig: { maxOutputTokens: maxTokens },
    };
    if (system) body.systemInstruction = { parts: [{ text: system }] };
    return body;
  }
  // anthropic
  const system = messages
    .filter((m) => m.role === "system")
    .map((m) => m.text)
    .join("\n");
  const body: Record<string, unknown> = {
    model,
    max_tokens: maxTokens,
    messages: messages
      .filter((m) => m.role !== "system")
      .map((m) => {
        if (m.imageDataUrl && m.role === "user") {
          const { mediaType, data } = base64Payload(m.imageDataUrl);
          return {
            role: m.role,
            content: [
              { type: "text", text: m.text },
              {
                type: "image",
                source: { type: "base64", media_type: mediaType, data },
              },
            ],
          };
        }
        return { role: m.role, content: m.text };
      }),
  };
  if (system) body.system = system;
  return body;
}

/** One chat completion against whatever provider is configured. */
export async function chatLlm(
  cfg: LlmConfig,
  messages: ChatMessage[],
  maxTokens = 800,
): Promise<LlmResult> {
  const r = resolveLlm(cfg);
  if (!r.endpoint) return { ok: false, text: "", error: "notfound" };
  const hadImage = messages.some((m) => Boolean(m.imageDataUrl));
  try {
    const res = await fetchWithRetry(r.endpoint, {
      method: "POST",
      headers: r.headers,
      body: JSON.stringify(buildBody(r.wire, r.model, messages, maxTokens)),
    });
    if (!res.ok) {
      return {
        ok: false,
        text: "",
        error: codeForStatus(res.status, hadImage),
        status: res.status,
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json = (await res.json()) as any;
    let text = "";
    if (r.wire === "openai") {
      text = json.choices?.[0]?.message?.content || "";
    } else if (r.wire === "gemini") {
      text =
        json.candidates?.[0]?.content?.parts
          ?.map((x: { text?: string }) => x.text || "")
          .join("") || "";
    } else {
      text =
        json.content?.map((x: { text?: string }) => x.text || "").join("") ||
        "";
    }
    if (!text) return { ok: false, text: "", error: "empty" };
    return { ok: true, text };
  } catch {
    return { ok: false, text: "", error: "network" };
  }
}

// --- Vision analysis ------------------------------------------------------------

// Fixed system Vision prompt.
export const VISION_PROMPT =
  "max 70 words, physical terms only, English only. 1) Location 2) Lighting — Lighting Bridge: name the exact visible light source, its direction and warmth 3) Camera/framing 4) Pose/action 5) Outfit.";

export async function analyzeImage(
  cfg: LlmConfig,
  dataUrl: string,
): Promise<LlmResult> {
  const { data } = base64Payload(dataUrl);
  if (!data) return { ok: false, text: "", error: "empty" };
  return chatLlm(
    cfg,
    [{ role: "user", text: VISION_PROMPT, imageDataUrl: dataUrl }],
    800,
  );
}

/** Analyze photos SEQUENTIALLY with a small pause (free-tier rate limits). */
export async function analyzeImages(
  cfg: LlmConfig,
  dataUrls: string[],
): Promise<LlmResult[]> {
  const out: LlmResult[] = [];
  for (let i = 0; i < dataUrls.length; i++) {
    if (i > 0) await sleep(400);
    out.push(await analyzeImage(cfg, dataUrls[i]));
  }
  return out;
}

// 1x1 transparent PNG used to probe vision support.
const TEST_PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

/** Two-step key test: plain text reply, then a tiny image (vision support). */
export async function testConnection(
  cfg: LlmConfig,
): Promise<{ text: boolean; vision: boolean }> {
  const textRes = await chatLlm(
    cfg,
    [{ role: "user", text: "Reply with OK" }],
    5,
  );
  if (!textRes.ok && textRes.error !== "empty") {
    return { text: false, vision: false };
  }
  const visionRes = await chatLlm(
    cfg,
    [{ role: "user", text: "Reply with OK", imageDataUrl: TEST_PNG }],
    5,
  );
  return { text: true, vision: visionRes.ok || visionRes.error === "empty" };
}

// --- Vision text parsing ----------------------------------------------------------

/**
 * Parse a Vision numbered response into Scene Spec fields with per-field confidence.
 * Lines: 1) Location 2) Lighting 3) Camera/framing 4) Pose/action 5) Outfit
 */
export interface VisionFields {
  location: string;
  lighting: string;
  camera: string;
  pose: string;
  outfit: string;
  confidence: Record<string, number>;
}

export function parseVisionText(text: string): VisionFields {
  const fields: VisionFields = {
    location: "",
    lighting: "",
    camera: "",
    pose: "",
    outfit: "",
    confidence: {},
  };
  const map: [RegExp, keyof Omit<VisionFields, "confidence">][] = [
    [/1[).:\]]\s*(?:location:?\s*)?(.+)/i, "location"],
    [/2[).:\]]\s*(?:lighting:?\s*)?(.+)/i, "lighting"],
    [/3[).:\]]\s*(?:camera(?:\/framing)?:?\s*)?(.+)/i, "camera"],
    [/4[).:\]]\s*(?:pose(?:\/action)?:?\s*)?(.+)/i, "pose"],
    [/5[).:\]]\s*(?:outfit:?\s*)?(.+)/i, "outfit"],
  ];
  const lines = text.split(/\n+/);
  for (const line of lines) {
    for (const [re, field] of map) {
      const m = line.match(re);
      if (m && !fields[field]) {
        const value = m[1].trim().replace(/\.$/, "");
        fields[field] = value;
        // heuristic confidence: hedging words lower it
        const hedged =
          /(maybe|possibly|unclear|hard to tell|appears|seems)/i.test(value);
        fields.confidence[field] = hedged ? 0.5 : 0.9;
      }
    }
  }
  // Missing fields get low confidence
  for (const f of [
    "location",
    "lighting",
    "camera",
    "pose",
    "outfit",
  ] as const) {
    if (!fields[f]) fields.confidence[f] = 0.3;
  }
  return fields;
}
