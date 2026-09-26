// ============================================================================
// Fix Pack 16 — CLUSTER QUIZ data + scoring. Four questions map the visitor
// to a world (A/B/C) and two starting packs — the same codes the studio and
// the atlas use. Pure and deterministic; the component lives in
// components/cluster-quiz.tsx.
// ============================================================================

import type { World } from "./captions";
import type { Lang } from "./types";

export interface QuizOption {
  id: string;
  world: World;
  label: Record<Lang, string>;
}

export interface QuizQuestion {
  id: string;
  prompt: Record<Lang, string>;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "morning",
    prompt: {
      ru: "Её утро в ленте начинается с…",
      en: "Her feed morning starts with…",
    },
    options: [
      {
        id: "m_a",
        world: "A",
        label: {
          ru: "света полосами на полу и недопитого чая",
          en: "sun stripes on the floor and unfinished tea",
        },
      },
      {
        id: "m_b",
        world: "B",
        label: {
          ru: "подъезда, наушников и бетона",
          en: "a stairwell, headphones and concrete",
        },
      },
      {
        id: "m_c",
        world: "C",
        label: {
          ru: "мотельной вывески, которая ещё горит",
          en: "a motel sign still glowing",
        },
      },
    ],
  },
  {
    id: "caption",
    prompt: {
      ru: "Подпись под её лучшим кадром:",
      en: "The caption under her best frame:",
    },
    options: [
      { id: "c_a", world: "A", label: { ru: "«4am»", en: "“4am”" } },
      {
        id: "c_b",
        world: "B",
        label: { ru: "без подписи", en: "no caption" },
      },
      {
        id: "c_c",
        world: "C",
        label: { ru: "«motel, room 4»", en: "“motel, room 4”" },
      },
    ],
  },
  {
    id: "cutaway",
    prompt: {
      ru: "Один кадр в её ленте — без неё:",
      en: "One frame in her feed doesn’t show her:",
    },
    options: [
      {
        id: "k_a",
        world: "A",
        label: {
          ru: "смятая футболка на стуле",
          en: "a crumpled tee on the chair",
        },
      },
      {
        id: "k_b",
        world: "B",
        label: {
          ru: "лестничный пролёт с одной жёсткой тенью",
          en: "a stairwell with one hard shadow",
        },
      },
      {
        id: "k_c",
        world: "C",
        label: {
          ru: "пустой бассейн в полдень",
          en: "an empty pool at noon",
        },
      },
    ],
  },
  {
    id: "break",
    prompt: {
      ru: "Её запланированный сбой:",
      en: "Her intentional break in the pattern:",
    },
    options: [
      {
        id: "b_a",
        world: "A",
        label: {
          ru: "смазанная дверь, палец у линзы",
          en: "a blurred door, finger near the lens",
        },
      },
      {
        id: "b_b",
        world: "B",
        label: {
          ru: "пересвет вспышки в упор",
          en: "point-blank flash burn",
        },
      },
      {
        id: "b_c",
        world: "C",
        label: {
          ru: "кадр через стекло машины",
          en: "a shot through the car glass",
        },
      },
    ],
  },
];

export interface WorldCode {
  name: string;
  packs: [string, string];
  tag: Record<Lang, string>;
}

export const WORLD_CODE: Record<World, WorldCode> = {
  A: {
    name: "DIARY",
    packs: ["Model Diary", "4AM"],
    tag: {
      ru: "дневник — свет из окна и её собственные слова",
      en: "diary — window light and her own words",
    },
  },
  B: {
    name: "RAW",
    packs: ["Concrete", "Transit"],
    tag: {
      ru: "андеграунд — бетон, вспышка и никаких подписей",
      en: "raw — concrete, flash and no captions",
    },
  },
  C: {
    name: "STAGED",
    packs: ["Motel", "Polaroid ’95"],
    tag: {
      ru: "постановка — кино-табло, неон и тишина",
      en: "staged — film-still tableau, neon and stillness",
    },
  },
};

/** Majority world; ties break toward the LAST answer, then A < B < C. */
export function scoreQuiz(answers: World[]): World {
  const count: Record<World, number> = { A: 0, B: 0, C: 0 };
  for (const a of answers) count[a] += 1;
  const max = Math.max(count.A, count.B, count.C);
  const tied = (["A", "B", "C"] as World[]).filter((w) => count[w] === max);
  const last = answers[answers.length - 1];
  if (last && tied.includes(last)) return last;
  return tied[0];
}
