"use client";

// Fix Pack 21: the onboarding tour is a spotlight, not a blocking modal.
// Each step anchors to a real element ([data-tour]), dims everything around
// it through a box-shadow cutout and keeps the whole page clickable — the
// old full-screen overlay used to cover the very controls it described.

import { useEffect, useState } from "react";
import { TOUR_STEPS } from "@/lib/tour";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/types";
import { cn } from "@/lib/utils";

type Rect = { top: number; left: number; width: number; height: number };

const PAD = 8; // spotlight padding around the target
const CARD_H = 232; // rough card height, used only for placement

export function SpotlightTour({
  lang,
  step,
  onNext,
  onSkip,
}: {
  lang: Lang;
  step: number;
  onNext: () => void;
  onSkip: () => void;
}) {
  const s = TOUR_STEPS[Math.min(step, TOUR_STEPS.length - 1)];
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(`[data-tour="${s.target}"]`);
    if (!el) {
      setRect(null);
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    let raf = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    // Smooth scrolling, disclosure opening and resizes all move the target.
    const iv = window.setInterval(measure, 250);
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, true);
    return () => {
      window.clearInterval(iv);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule, true);
      cancelAnimationFrame(raf);
    };
  }, [s.target]);

  const vh = typeof window === "undefined" ? 800 : window.innerHeight;
  const cardTop = rect
    ? rect.top + rect.height + PAD + 12 + CARD_H < vh
      ? rect.top + rect.height + PAD + 12
      : Math.max(16, rect.top - PAD - 12 - CARD_H)
    : Math.max(16, vh / 2 - CARD_H / 2);
  const last = step >= TOUR_STEPS.length - 1;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {rect ? (
        <div
          aria-hidden="true"
          className="fixed rounded-2xl transition-all duration-200"
          style={{
            top: rect.top - PAD,
            left: rect.left - PAD,
            width: rect.width + PAD * 2,
            height: rect.height + PAD * 2,
            boxShadow: "0 0 0 9999px rgba(29, 29, 31, 0.45)",
          }}
        />
      ) : (
        <div aria-hidden="true" className="fixed inset-0 bg-foreground/40" />
      )}
      <div
        role="dialog"
        aria-label={t(s.titleKey, lang)}
        className="pointer-events-auto fixed left-1/2 w-[min(92vw,384px)] -translate-x-1/2"
        style={{ top: cardTop }}
      >
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((ts, i) => (
              <span
                key={ts.id}
                aria-hidden="true"
                className={cn(
                  "h-1.5 flex-1 rounded-full",
                  i <= step ? "bg-primary" : "bg-muted",
                )}
              />
            ))}
          </div>
          <h2 className="text-[17px] font-semibold text-card-foreground text-balance">
            {t(s.titleKey, lang)}
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground text-pretty">
            {t(s.bodyKey, lang)}
          </p>
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onSkip}
              className="rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              {t("onb.skip", lang)}
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-md bg-primary px-5 py-2 text-[13px] font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring"
            >
              {last ? t("onb.done", lang) : t("onb.next", lang)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
