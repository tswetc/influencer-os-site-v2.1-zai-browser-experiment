"use client";

// Fix Pack 19 — the project wall. Every REAL shoot is its own card and ALL
// cards are visible at once (no tabs to open): video projects autoplay as
// muted loops, still projects show their key frame. Clicking a card opens a
// lightbox with that project's series only — one shoot never mixes with
// another (frame-by-frame vision regrouping). Below the wall: the outfit
// spotlight — a draggable before/after slider next to the outfit-swap loop.
// The catalog lives in lib/showcase-data.ts so the self-check can assert
// its invariants. All media are AI-generated from prompts built in
// Influencer OS and the section says so explicitly (marketing rule).

import { useEffect, useState } from "react";
import { BeforeAfterSlider } from "@/components/landing-fx";
import {
  SHOWCASE_BEFORE_AFTER,
  SHOWCASE_PROJECTS,
  type ShowcaseCopy,
  type ShowcaseProject,
} from "@/lib/showcase-data";
import type { Lang } from "@/lib/types";

const C: Record<string, ShowcaseCopy> = {
  title: {
    ru: "Одна идентичность. Разные съёмки.",
    en: "One identity. Different shoots.",
  },
  sub: {
    ru: "11 отдельных проектов: beauty, fashion, product, UGC и video. Откройте любой — внутри полная серия одной съёмки.",
    en: "11 separate projects across beauty, fashion, product, UGC and video. Open any project to see the full shoot.",
  },
  outfitTitle: {
    ru: "Смена образа: до / после",
    en: "Outfit swap: before / after",
  },
  outfitNote: {
    ru: "Та же локация и тот же персонаж — меняется только образ. Слева сравнение кадров, справа — outfit swap в движении.",
    en: "Same location, same character — only the look changes. The comparison is on the left; the outfit swap in motion is on the right.",
  },
  aiNote: {
    ru: "Все изображения и видео сгенерированы ИИ по промптам из Influencer OS. Бренды вымышлены.",
    en: "All images and videos are AI-generated from prompts built in Influencer OS. Brands are fictional.",
  },
  close: { ru: "Закрыть", en: "Close" },
  prev: { ru: "Назад", en: "Previous" },
  next: { ru: "Вперёд", en: "Next" },
  open: { ru: "Открыть проект", en: "Open the project" },
  photo: { ru: "фото", en: "stills" },
  video: { ru: "видео", en: "video" },
};

export function Showcase({ lang }: { lang: Lang }) {
  const p = (c: ShowcaseCopy) => c[lang] || c.en;
  const [open, setOpen] = useState<{ proj: number; idx: number } | null>(null);
  const proj = open === null ? null : SHOWCASE_PROJECTS[open.proj];
  const item = open === null || proj === null ? null : proj.items[open.idx];
  const n = proj?.items.length ?? 0;
  const cliff = SHOWCASE_PROJECTS.find((x) => x.id === "cliff");
  const swapVideo = cliff?.items.find((it) => it.kind === "video");

  // Keyboard: Esc closes, arrows browse the open project only.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight")
        setOpen((s) => (s === null ? s : { ...s, idx: (s.idx + 1) % n }));
      if (e.key === "ArrowLeft")
        setOpen((s) => (s === null ? s : { ...s, idx: (s.idx + n - 1) % n }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, n]);

  // Lock page scroll while the lightbox is open.
  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const countLabel = (x: ShowcaseProject) => {
    const v = x.items.filter((it) => it.kind === "video").length;
    const s = x.items.length - v;
    const parts: string[] = [];
    if (v > 0) parts.push(p(C.video));
    if (s > 0) parts.push(`${s} ${p(C.photo)}`);
    return parts.join(" + ");
  };

  return (
    <section className="mt-16">
      <h2 className="text-[22px] font-semibold">{p(C.title)}</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        {p(C.sub)}
      </p>

      {/* The wall: all projects at once, one card per real shoot. */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {SHOWCASE_PROJECTS.map((x, pi) => {
          const cover = x.items[0];
          const wide = pi === 0;
          return (
            <button
              key={x.id}
              type="button"
              onClick={() => setOpen({ proj: pi, idx: 0 })}
              aria-label={`${p(C.open)}: ${p(x.title)}`}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card text-left ${
                wide ? "col-span-2 aspect-[5/3] sm:col-span-2" : "aspect-[4/5]"
              }`}
            >
              {cover.kind === "video" ? (
                <video
                  src={cover.src}
                  poster={cover.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={cover.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cover.thumb}
                  alt={cover.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              )}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-3 pt-10">
                <span className="block text-[13px] font-semibold leading-tight text-white">
                  {p(x.title)}
                </span>
                <span className="mt-0.5 block text-[12px] text-white/70">
                  {countLabel(x)}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Outfit spotlight: slider + the swap loop, side by side. */}
      <h3 className="mt-10 text-[17px] font-semibold">{p(C.outfitTitle)}</h3>
      <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
        {p(C.outfitNote)}
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <BeforeAfterSlider
          lang={lang}
          before={SHOWCASE_BEFORE_AFTER.before}
          after={SHOWCASE_BEFORE_AFTER.after}
        />
        {swapVideo && swapVideo.kind === "video" ? (
          <video
            src={swapVideo.src}
            poster={swapVideo.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={swapVideo.alt}
            className="h-full w-full rounded-2xl border border-border object-cover"
          />
        ) : null}
      </div>

      <p className="mt-3 text-[12px] text-muted-foreground">{p(C.aiNote)}</p>

      {/* Lightbox: one project at a time, arrows browse, Esc / backdrop closes. */}
      {item !== null && open !== null && proj !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <div
            className="relative flex max-h-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {item.kind === "video" ? (
              <video
                key={item.src}
                src={item.src}
                poster={item.poster}
                autoPlay
                muted
                loop
                playsInline
                aria-label={item.alt}
                className="max-h-[80vh] w-auto max-w-full rounded-2xl"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.full}
                src={item.full}
                alt={item.alt}
                className="max-h-[80vh] w-auto max-w-full rounded-2xl"
              />
            )}
            <p className="mt-3 text-center text-[13px] text-white/70">
              {p(proj.title)} · {item.alt} · {open.idx + 1} / {n}
            </p>
          </div>
          <button
            type="button"
            aria-label={p(C.close)}
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[20px] text-white transition-colors duration-200 hover:bg-white/20"
          >
            ×
          </button>
          <button
            type="button"
            aria-label={p(C.prev)}
            onClick={(e) => {
              e.stopPropagation();
              setOpen({ ...open, idx: (open.idx + n - 1) % n });
            }}
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-[20px] text-white transition-colors duration-200 hover:bg-white/20"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={p(C.next)}
            onClick={(e) => {
              e.stopPropagation();
              setOpen({ ...open, idx: (open.idx + 1) % n });
            }}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-[20px] text-white transition-colors duration-200 hover:bg-white/20"
          >
            ›
          </button>
        </div>
      ) : null}
    </section>
  );
}
