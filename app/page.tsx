"use client";

// Fix Pack 8 — landing page, Apple-light design system (tokens: lib/tokens.ts).
// Fix Pack 15 — wow layer: live hero machine (components/landing-fx.tsx),
// §2 prompt privacy (readable teaser + redacted tail — the hidden words
// never reach the DOM), hero media slots, cluster quiz.
// Fix Pack 19 — the landing got shorter and the media moved up: the project
// wall (components/showcase.tsx) sits right under the hero CTA, the old
// interactive demo section is gone (the hero machine already runs the real
// builder), and "what's new" folds into a single collapsible card.
// English by default; RU via the toggle (persisted in localStorage).
// The studio lives at /app. Buy link comes from NEXT_PUBLIC_GUMROAD_URL.

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BeforeAfterSlider,
  HeroShowcase,
  LivePortrait,
  type HeroMedia,
} from "@/components/landing-fx";
import { ClusterQuiz } from "@/components/cluster-quiz";
import { Showcase } from "@/components/showcase";
import { CHANGELOG } from "@/lib/changelog";
import { liftFor, tiltFor } from "@/lib/redact";
import { daylightTone } from "@/lib/season";
import type { Lang } from "@/lib/types";

const BUY_URL = process.env.NEXT_PUBLIC_GUMROAD_URL || "https://gumroad.com";
// Free $0 Gumroad product used for email capture (D4). Section is hidden
// until the env var is set in Vercel.
const FREE_URL = process.env.NEXT_PUBLIC_GUMROAD_FREE_URL || "";
// Fix Pack 14: Gumroad affiliate signup link; the block is hidden until set.
const AFF_URL = process.env.NEXT_PUBLIC_GUMROAD_AFFILIATE_URL || "";
const LANG_KEY = "ios_landing_lang";

// Marketing gallery (D2). Add files to /public/gallery and list them here —
// the section stays hidden while the list is empty.
const GALLERY: Array<{ src: string; alt: string }> = [];

// Fix Pack 15: hero media slots. Files live under /public/gallery.
// Set HERO_PORTRAIT to null / HERO_GRID_IMAGE to "" to hide a slot.
const HERO_PORTRAIT: HeroMedia = {
  type: "video",
  src: "/gallery/portrait-live.mp4",
};
// A 3x3 collage sliced into 9 reveal cells by CSS.
const HERO_GRID_IMAGE = "/gallery/june-grid.jpg";
// Before/after slider assets; null hides the section.
const BEFORE_AFTER: { before: string; after: string } | null = null;

type Copy = { ru: string; en: string };

const L: Record<string, Copy> = {
  h1: {
    ru: "Один персонаж. Пять моделей. Единая идентичность.",
    en: "One character. Five models. One consistent identity.",
  },
  lead: {
    ru: "Influencer OS фиксирует внешность, стиль и правила персонажа и собирает точные англоязычные промпты для Nano Banana Pro, Kling, Seedance, Veo и Omni Flash. Один паспорт персонажа сохраняет идентичность в фото, видео, сериях и ленте. Внутри: 24 приёма · 3 мира · 20 паков сцен.",
    en: "Influencer OS locks a character’s appearance, style and rules, then builds precise English prompts for Nano Banana Pro, Kling, Seedance, Veo and Omni Flash. One character passport keeps the identity consistent across photos, video, series and feeds. Inside: 24 techniques · 3 worlds · 20 scene packs.",
  },
  buy: { ru: "Купить —", en: "Buy —" },
  openApp: { ru: "Открыть приложение", en: "Open the app" },
  refundNote: {
    ru: "7 дней — возврат без вопросов",
    en: "7-day no-questions refund",
  },
  portraitNote: {
    ru: "Сделано по промптам студии",
    en: "Made with studio prompts",
  },
  baTitle: { ru: "До / после", en: "Before / after" },
  affTitle: { ru: "Партнёрам", en: "For affiliates" },
  affText: {
    ru: "Рекомендуете Influencer OS своей аудитории? Подключайтесь к партнёрской программе Gumroad и получайте процент с каждой продажи.",
    en: "Recommending Influencer OS to your audience? Join the Gumroad affiliate program and earn a cut of every sale.",
  },
  affCta: { ru: "Стать партнёром", en: "Become an affiliate" },
  howTitle: { ru: "Как это работает", en: "How it works" },
  whatTitle: { ru: "Что внутри", en: "What’s inside" },
  galleryTitle: { ru: "Примеры кадров", en: "Sample frames" },
  priceBadge: { ru: "Бессрочная лицензия", en: "Lifetime license" },
  priceNote: {
    ru: "Одна оплата · бессрочная лицензия · обновления текущей версии включены · 7 дней на возврат",
    en: "One-time payment · lifetime license · current-version updates included · 7-day refund",
  },
  buyLicense: { ru: "Купить лицензию", en: "Buy a license" },
  emailTitle: {
    ru: "10 готовых промптов — бесплатно",
    en: "10 ready-made prompts — free",
  },
  emailText: {
    ru: "Оставьте email на Gumroad и получите 10 готовых промптов в эстетике Raw Realism.",
    en: "Leave your email on Gumroad and get 10 ready-made prompts in the Raw Realism aesthetic.",
  },
  emailCta: { ru: "Получить бесплатно", en: "Get it free" },
  faqTitle: { ru: "Вопросы", en: "FAQ" },
  whatsNew: { ru: "Что нового", en: "What's new" },
  footer: {
    ru: "Influencer OS — независимый инструмент для создания и адаптации промптов. Соблюдайте правила платформ генерации изображений и видео и права третьих лиц.",
    en: "Influencer OS is an independent tool for creating and adapting prompts. Follow the terms of the image and video generation platforms you use and respect third-party rights.",
  },
};

const FEATURES: Array<{ title: Copy; text: Copy }> = [
  {
    title: { ru: "5 моделей. Один workflow.", en: "5 models. One workflow." },
    text: {
      ru: "Фото → Nano Banana Pro · Motion → Kling · B-roll → Seedance · Диалог → Veo · Доработка → Omni Flash. Один паспорт персонажа — промпты, адаптированные под каждую модель.",
      en: "Photo → Nano Banana Pro · Motion → Kling · B-roll → Seedance · Dialogue → Veo · Refinement → Omni Flash. One character passport — prompts tuned for every model.",
    },
  },
  {
    title: { ru: "Anomaly Lock", en: "Anomaly Lock" },
    text: {
      ru: "Фиксирует родинки, веснушки, асимметрию и текстуру кожи, чтобы персонаж оставался узнаваемым между кадрами.",
      en: "Locks moles, freckles, asymmetry and skin texture so the character stays recognizable from frame to frame.",
    },
  },
  {
    title: {
      ru: "Серия ×3 / ×5 для карусели",
      en: "×3 / ×5 series for carousels",
    },
    text: {
      ru: "Одна сцена → согласованная серия: общий, средний, крупный, деталь, selfie. Идентичность сохраняется во всей серии.",
      en: "One scene → a coherent series: wide, medium, close-up, detail, selfie. Identity stays consistent across the full series.",
    },
  },
  {
    title: {
      ru: "Описание на русском → точный промпт на английском",
      en: "Write in Russian or English",
    },
    text: {
      ru: "Опишите сцену естественным языком — Influencer OS соберёт точный англоязычный промпт с корректной терминологией.",
      en: "Describe the scene naturally — Influencer OS builds a precise English prompt with the right terminology.",
    },
  },
  {
    title: {
      ru: "Ваш API-ключ. Любой провайдер.",
      en: "Your API key. Any provider.",
    },
    text: {
      ru: "OpenAI, Anthropic, Gemini, OpenRouter или OpenAI-compatible endpoint. Ключ хранится только в браузере — отдельная AI-подписка Influencer OS не нужна.",
      en: "OpenAI, Anthropic, Gemini, OpenRouter or any OpenAI-compatible endpoint. Your key stays in the browser — no separate Influencer OS AI subscription required.",
    },
  },
  {
    title: { ru: "Данные остаются в браузере", en: "Your data stays in the browser" },
    text: {
      ru: "Ключи, фото и персонажи не покидают ваш браузер. Серверу отправляется только проверка лицензии.",
      en: "Keys, photos and characters never leave your browser. The server only ever sees the license check.",
    },
  },
];

const STEPS: Array<{ n: string; title: Copy; text: Copy }> = [
  {
    n: "1",
    title: { ru: "Персонаж", en: "Character" },
    text: {
      ru: "Создайте паспорт персонажа вручную или из референс-фото.",
      en: "Create the character passport manually or from reference photos.",
    },
  },
  {
    n: "2",
    title: { ru: "Сцена", en: "Scene" },
    text: {
      ru: "Опишите сцену. Auto-tags подхватят локацию, свет, позу и другие распознанные детали.",
      en: "Describe the scene. Auto-tags pick up the location, lighting, pose and other recognized details.",
    },
  },
  {
    n: "3",
    title: { ru: "Промпт", en: "Prompt" },
    text: {
      ru: "Получите промпт под выбранную модель — один кадр, серия, съёмка или лента.",
      en: "Get a prompt tuned for the selected model — a frame, series, shoot or feed.",
    },
  },
];

const FAQ: Array<{ q: Copy; a: Copy }> = [
  {
    q: { ru: "Какие API-ключи нужны?", en: "Which API keys do I need?" },
    a: {
      ru: "Для сборки промптов по описанию сцены ключ не нужен вообще. Для распознавания референса и ИИ-функций (улучшение сцены, критик, ассистент) — свой ключ OpenAI, Anthropic, Gemini или OpenRouter; у OpenRouter есть бесплатные модели.",
      en: "Building prompts from a scene description needs no key at all. Reference analysis and AI features (scene enhancer, critic, assistant) use your own OpenAI, Anthropic, Gemini or OpenRouter key; OpenRouter offers free models.",
    },
  },
  {
    q: { ru: "Это подписка?", en: "Is this a subscription?" },
    a: {
      ru: "Нет. Одна оплата — бессрочная лицензия на текущую версию, включая её обновления.",
      en: "No. One payment — a lifetime license for the current version, including its updates.",
    },
  },
  {
    q: { ru: "Как работает возврат?", en: "How do refunds work?" },
    a: {
      ru: "7 дней с момента покупки — возврат без вопросов через Gumroad. После возврата лицензионный ключ автоматически перестаёт действовать.",
      en: "7 days from purchase — a no-questions refund via Gumroad. After a refund the license key is deactivated automatically.",
    },
  },
  {
    q: { ru: "Где хранятся мои данные?", en: "Where is my data stored?" },
    a: {
      ru: "В вашем браузере (localStorage). Персонажи, история и API-ключи остаются локально. Доступны экспорт и импорт резервной копии.",
      en: "In your browser (localStorage). Characters, history and API keys stay local. Backup export and import are available.",
    },
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("en");
  // Fix Pack 16 — daylight header: the hero tone follows the visitor's hour.
  // Set after mount to avoid a server/client hydration mismatch.
  const [tint, setTint] = useState("");
  useEffect(() => {
    setTint(daylightTone(new Date().getHours()).tint);
  }, []);
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LANG_KEY);
      if (saved === "ru" || saved === "en") setLang(saved);
    } catch {
      // localStorage unavailable — stay on English
    }
  }, []);
  // Keep <html lang> in sync with the rendered copy (a11y / screen readers).
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const switchLang = (next: Lang) => {
    setLang(next);
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      // ignore
    }
  };
  const p = (c: Copy) => c[lang] || c.en;

  const card =
    "rounded-2xl border border-border bg-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)]";

  return (
    <main
      className="min-h-screen bg-background text-foreground"
      style={
        tint
          ? {
              backgroundImage: tint,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 480px",
            }
          : undefined
      }
    >
      <div className="mx-auto max-w-3xl px-5 py-16">
        {/* Header: badge + language toggle */}
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Influencer OS
          </p>
          <button
            type="button"
            onClick={() => switchLang(lang === "ru" ? "en" : "ru")}
            aria-label={
              lang === "ru" ? "Switch to English" : "Переключить на русский"
            }
            className="min-h-[44px] rounded-xl border border-border bg-card px-4 text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:border-ring/40 hover:text-foreground"
          >
            {lang === "ru" ? "EN" : "RU"}
          </button>
        </div>

        {/* Hero — FP16 wow pass: 7/5 grid and clamped type */}
        <div className="mt-8 grid items-center gap-8 sm:grid-cols-[7fr_5fr]">
          <div className="min-w-0">
            <h1 className="text-[clamp(34px,5vw,52px)] font-bold leading-[1.08] tracking-tight">
              {p(L.h1)}
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
              {p(L.lead)}
            </p>
          </div>
          <div className="justify-self-center sm:justify-self-end">
            <LivePortrait media={HERO_PORTRAIT} caption={p(L.portraitNote)} />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={BUY_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] items-center rounded-xl bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-opacity duration-200 hover:opacity-90"
          >
            {p(L.buy)}&nbsp;<s className="font-normal opacity-70">$99</s>
            &nbsp;$49
          </a>
          <Link
            href="/app"
            className="inline-flex min-h-[44px] items-center rounded-xl border border-border bg-card px-5 text-[15px] font-medium text-foreground transition-colors duration-200 hover:border-ring/40"
          >
            {p(L.openApp)}
          </Link>
          <span className="text-[13px] text-muted-foreground">
            {p(L.refundNote)}
          </span>
        </div>

        {/* FP19: the project wall — right under the hero, all shoots at once */}
        <Showcase lang={lang} />

        {/* FP15: the real builder working in front of the visitor */}
        <HeroShowcase lang={lang} gridImage={HERO_GRID_IMAGE} />

        {/* Steps */}
        <h2 className="mt-16 text-[22px] font-semibold">{p(L.howTitle)}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className={card}>
              <p className="text-[13px] font-semibold text-primary">{s.n}</p>
              <p className="mt-2 text-[15px] font-semibold">{p(s.title)}</p>
<p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
  {p(s.text)}
              </p>
            </div>
          ))}
        </div>

        {/* FP16: cluster quiz — “her code” as a shareable artifact */}
        <ClusterQuiz
          lang={lang}
          buyUrl={BUY_URL}
          freeUrl={FREE_URL || undefined}
        />

        {/* Features */}
        <h2 className="mt-16 text-[22px] font-semibold">{p(L.whatTitle)}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title.en} className={card}>
              <p className="text-[15px] font-semibold">{p(f.title)}</p>
<p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
  {p(f.text)}
              </p>
            </div>
          ))}
        </div>

        {/* Gallery (hidden until photos are added to GALLERY) */}
        {GALLERY.length > 0 ? (
          <>
            <h2 className="mt-16 text-[22px] font-semibold">
              {p(L.galleryTitle)}
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {GALLERY.map((g, i) => (
                <figure
                  key={g.src}
                  style={{
                    transform: `rotate(${tiltFor(i)}deg) translateY(${liftFor(i)}px)`,
                  }}
                  className="rounded-sm border border-border bg-card p-2 pb-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="aspect-[4/5] w-full rounded-[2px] object-cover"
                  />
                  <figcaption className="mt-2 truncate text-center text-[12px] text-muted-foreground">
                    {g.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        ) : null}

        {/* FP15: before/after slider — hidden until assets are set */}
        {BEFORE_AFTER ? (
          <>
            <h2 className="mt-16 text-[22px] font-semibold">{p(L.baTitle)}</h2>
            <div className="mt-6">
              <BeforeAfterSlider
                lang={lang}
                before={BEFORE_AFTER.before}
                after={BEFORE_AFTER.after}
              />
            </div>
          </>
        ) : null}

        {/* Pricing */}
        <div className={`mt-16 ${card} p-8 text-center`}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {p(L.priceBadge)}
          </p>
          <p className="mt-4 text-[34px] font-bold tabular-nums">
            <s className="mr-3 text-[22px] font-normal text-muted-foreground">
              $99
            </s>
            $49
          </p>
<p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
  {p(L.priceNote)}
          </p>
          <a
            href={BUY_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-[44px] items-center rounded-xl bg-primary px-6 text-[15px] font-semibold text-primary-foreground transition-opacity duration-200 hover:opacity-90"
          >
            {p(L.buyLicense)}
          </a>
        </div>

        {/* Email capture (D4) — visible once the free Gumroad product exists */}
        {FREE_URL ? (
          <div
            className={`mt-6 ${card} flex flex-wrap items-center justify-between gap-4`}
          >
            <div className="min-w-0">
              <p className="text-[15px] font-semibold">{p(L.emailTitle)}</p>
<p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
  {p(L.emailText)}
              </p>
            </div>
            <a
              href={FREE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] shrink-0 items-center rounded-xl border border-primary px-5 text-[15px] font-semibold text-primary transition-colors duration-200 hover:bg-accent"
            >
              {p(L.emailCta)}
            </a>
          </div>
        ) : null}

        {/* Affiliates (FP14) — hidden until NEXT_PUBLIC_GUMROAD_AFFILIATE_URL is set */}
        {AFF_URL ? (
          <div className={`${card} mt-16 flex flex-col items-start gap-3 p-6`}>
            <h2 className="text-[17px] font-semibold text-card-foreground">
              {p(L.affTitle)}
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {p(L.affText)}
            </p>
            <a
              href={AFF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-secondary px-3.5 py-2 text-[13px] font-medium text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
            >
              {p(L.affCta)}
            </a>
          </div>
        ) : null}

        {/* FAQ */}
        <h2 className="mt-16 text-[22px] font-semibold">{p(L.faqTitle)}</h2>
        <div className="mt-6 space-y-3">
          {FAQ.map((item) => (
            <details key={item.q.en} className={card}>
              <summary className="cursor-pointer text-[15px] font-medium">
                {p(item.q)}
              </summary>
<p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
  {p(item.a)}
              </p>
            </details>
          ))}
        </div>

        {/* FP19: what's-new folds into one collapsible card — proof of life
            without stretching the page */}
        <details className={`mt-6 ${card}`}>
          <summary className="cursor-pointer text-[15px] font-medium">
            {p(L.whatsNew)} · v{CHANGELOG[0].version}
          </summary>
          <div className="mt-3 space-y-3">
            {CHANGELOG.slice(0, 3).map((e) => (
              <div key={e.version}>
                <p className="text-[13px] font-semibold tabular-nums">
                  v{e.version}{" "}
                  <span className="font-normal text-muted-foreground">
                    · {e.date}
                  </span>
                </p>
                <ul className="mt-1 list-disc pl-5 text-[13px] leading-relaxed text-muted-foreground">
                  {(lang === "ru" ? e.ru : e.en).slice(0, 3).map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>

        {/* Footer */}
        <footer className="mt-16 border-t border-border pt-6 text-[12px] leading-relaxed text-muted-foreground">
          {p(L.footer)}
        </footer>
      </div>
    </main>
  );
}
