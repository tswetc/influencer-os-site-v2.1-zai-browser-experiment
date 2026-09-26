"use client";

// Fix Pack 16 — CLUSTER QUIZ. Four questions on the landing map the visitor
// to a world + two starting packs (the same codes the studio uses), show a
// redacted teaser of the full formula (§2: zero real prompt text) and offer
// a shareable PNG code card + the next step (free atlas / studio).

import { useMemo, useState } from "react";
import { downloadPng, drawQuizCard } from "@/components/share-card";
import { APP_VERSION } from "@/lib/changelog";
import type { World } from "@/lib/captions";
import { QUIZ_QUESTIONS, scoreQuiz, WORLD_CODE } from "@/lib/quiz";
import { redactBars } from "@/lib/redact";
import type { Lang } from "@/lib/types";

type Copy = Record<Lang, string>;

const T: Record<string, Copy> = {
  title: { ru: "Код персонажа", en: "Character code" },
  note: {
    ru: "4 вопроса — получите визуальный мир и два стартовых пака.",
    en: "4 questions — get a visual world and two starting packs.",
  },
  q: { ru: "вопрос", en: "question" },
  result: { ru: "Код персонажа", en: "Character code" },
  packs: { ru: "стартовые паки", en: "starting packs" },
  hidden: {
    ru: "полная формула кода — внутри студии",
    en: "the full code formula lives in the studio",
  },
  share: {
    ru: "Скачать карточку кода (PNG)",
    en: "Download the code card (PNG)",
  },
  free: {
    ru: "Атлас вкуса — бесплатно за email",
    en: "The taste atlas — free for your email",
  },
  buy: {
    ru: "Открыть её код в студии — $49",
    en: "Open her code in the studio — $49",
  },
  restart: { ru: "Пройти заново", en: "Start over" },
};

export function ClusterQuiz({
  lang,
  buyUrl,
  freeUrl,
}: {
  lang: Lang;
  buyUrl: string;
  freeUrl?: string;
}) {
  const p = (c: Copy) => c[lang] || c.en;
  const [answers, setAnswers] = useState<World[]>([]);
  const done = answers.length >= QUIZ_QUESTIONS.length;
  const world = useMemo(
    () => (done ? scoreQuiz(answers) : null),
    [done, answers],
  );
  const bars = useMemo(
    () =>
      redactBars("identity scene technique clothing anomaly technical mood", 7),
    [],
  );

  const card =
    "rounded-2xl border border-border bg-card p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)]";
  const chip =
    "min-h-[44px] rounded-xl border border-border bg-card px-4 text-left text-[15px] font-medium text-foreground transition-colors duration-200 hover:border-ring/40";

  function share() {
    if (!world) return;
    const code = WORLD_CODE[world];
    const canvas = document.createElement("canvas");
    drawQuizCard(canvas, {
      lang,
      world,
      worldName: code.name,
      tag: code.tag[lang] || code.tag.en,
      packs: code.packs,
      version: APP_VERSION,
    });
    downloadPng(canvas, `influencer-os-code-${world.toLowerCase()}.png`);
  }

  return (
    <section className="mt-16">
      <h2 className="text-[22px] font-semibold text-foreground">
        {p(T.title)}
      </h2>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        {p(T.note)}
      </p>
      <div className={`mt-6 ${card}`}>
        {!done ? (
          <>
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {p(T.q)} {answers.length + 1} / {QUIZ_QUESTIONS.length}
            </p>
            <p className="mt-2 text-[17px] font-semibold text-foreground">
              {QUIZ_QUESTIONS[answers.length].prompt[lang] ||
                QUIZ_QUESTIONS[answers.length].prompt.en}
            </p>
            <div className="mt-4 grid gap-2">
              {QUIZ_QUESTIONS[answers.length].options.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={chip}
                  onClick={() => setAnswers((a) => [...a, o.world])}
                >
                  {o.label[lang] || o.label.en}
                </button>
              ))}
            </div>
            <div className="mt-4 flex gap-1.5" aria-hidden="true">
              {QUIZ_QUESTIONS.map((q, i) => (
                <span
                  key={q.id}
                  className={`h-1.5 w-6 rounded-full ${
                    i < answers.length ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </>
        ) : world ? (
          <>
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {p(T.result)}
            </p>
            <p className="mt-2 text-[34px] font-bold tracking-tight text-foreground">
              {world} · {WORLD_CODE[world].name}
            </p>
            <p className="mt-1 text-[15px] text-muted-foreground">
              {WORLD_CODE[world].tag[lang] || WORLD_CODE[world].tag.en}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {WORLD_CODE[world].packs.map((pk) => (
                <span
                  key={pk}
                  className="rounded-full border border-primary px-3 py-1 text-[13px] font-medium text-foreground"
                >
                  {pk}
                </span>
              ))}
              <span className="px-1 py-1 text-[13px] text-muted-foreground">
                — {p(T.packs)}
              </span>
            </div>
            <p className="mt-4 select-none font-mono text-[13px] tracking-tight text-muted-foreground/70">
              {bars}
            </p>
            <p className="mt-1 text-[12px] text-muted-foreground">
              {p(T.hidden)}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={share}
                className="inline-flex min-h-[44px] items-center rounded-xl border border-border bg-card px-5 text-[15px] font-medium text-foreground transition-colors duration-200 hover:border-ring/40"
              >
                {p(T.share)}
              </button>
              {freeUrl ? (
                <a
                  href={freeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-xl border border-primary px-5 text-[15px] font-semibold text-primary transition-colors duration-200 hover:bg-accent"
                >
                  {p(T.free)}
                </a>
              ) : null}
              <a
                href={buyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-xl bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-opacity duration-200 hover:opacity-90"
              >
                {p(T.buy)}
              </a>
              <button
                type="button"
                onClick={() => setAnswers([])}
                className="text-[13px] text-muted-foreground underline-offset-2 hover:underline"
              >
                {p(T.restart)}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
