"use client";

// Fix Pack 9 - A1: the photo-to-video hub. After a Nano photo prompt is
// generated, a "Video from this frame" card opens an iOS-style action sheet
// with the video engines. Picking Kling shows the Motion Control checklist
// (per the official docs: 3-30 s motion reference, orientation switch,
// face binding with 1-4 identity photos, prompt = scene, not motion).

import {
  ArrowRight,
  Clapperboard,
  Film,
  MessageSquareText,
  X,
} from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui-bits";
import { t } from "@/lib/i18n";
import type { EngineId, Lang } from "@/lib/types";

const HUB_OPTIONS: { id: EngineId; icon: typeof Clapperboard; key: string }[] =
  [
    { id: "kling_3", icon: Clapperboard, key: "hub.kling" },
    { id: "veo_scene", icon: MessageSquareText, key: "hub.veo" },
    { id: "seedance_2", icon: Film, key: "hub.seedance" },
  ];

export function VideoHub({
  lang,
  showCta,
  activeEngine,
  onPick,
  onDismiss,
}: {
  lang: Lang;
  showCta: boolean;
  activeEngine: EngineId | null;
  onPick: (e: EngineId) => void;
  onDismiss: () => void;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

  if (!showCta && activeEngine === null) return null;

  return (
    <>
      {showCta ? (
        <Card className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 flex-col">
            <span className="text-[15px] font-semibold text-card-foreground">
              {t("hub.title", lang)}
            </span>
            <span className="text-[13px] text-muted-foreground">
              {t("hub.subtitle", lang)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 text-[15px] font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring"
          >
            {t("hub.cta", lang)}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </Card>
      ) : null}

      {/* iOS-style action sheet */}
      {sheetOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("hub.title", lang)}
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40"
        >
          <div className="mx-auto flex w-full max-w-[720px] flex-col gap-2 p-4 pb-6">
            <div className="overflow-hidden rounded-2xl bg-card shadow-[0_8px_40px_rgba(0,0,0,0.16)]">
              <p className="border-b border-border px-4 py-3 text-center text-[13px] font-medium text-muted-foreground">
                {t("hub.subtitle", lang)}
              </p>
              {HUB_OPTIONS.map((o) => {
                const Icon = o.icon;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => {
                      setSheetOpen(false);
                      onPick(o.id);
                    }}
                    className="flex min-h-[44px] w-full items-center gap-3 border-b border-border px-4 py-3 text-left text-[15px] font-medium text-card-foreground last:border-b-0 hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-muted-foreground"
                    />
                    {t(o.key, lang)}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="min-h-[44px] rounded-2xl bg-card text-[15px] font-semibold text-primary shadow-[0_8px_40px_rgba(0,0,0,0.16)] hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
            >
              {t("hub.cancel", lang)}
            </button>
          </div>
        </div>
      ) : null}

      {/* Engine-specific guidance after picking */}
      {activeEngine === "kling_3" ? (
        <Card className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-[15px] font-semibold text-card-foreground">
              {t("hub.kling.title", lang)}
            </h2>
            <button
              type="button"
              aria-label={t("hub.dismiss", lang)}
              onClick={onDismiss}
              className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
          <ol className="flex list-decimal flex-col gap-2 pl-5 text-[13px] leading-relaxed text-card-foreground">
            <li>{t("hub.kling.s1", lang)}</li>
            <li>
              {t("hub.kling.s2", lang)}
              <span className="mt-1 block rounded-md bg-warning/10 px-2.5 py-1.5 font-medium text-warning">
                {t("hub.kling.warn", lang)}
              </span>
            </li>
            <li>{t("hub.kling.s3", lang)}</li>
            <li>{t("hub.kling.s4", lang)}</li>
            <li>{t("hub.kling.s5", lang)}</li>
          </ol>
        </Card>
      ) : null}
      {activeEngine === "veo_scene" || activeEngine === "veo_broll" ? (
        <Card className="flex items-start justify-between gap-2">
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            {t("hub.veo.hint", lang)}
          </p>
          <button
            type="button"
            aria-label={t("hub.dismiss", lang)}
            onClick={onDismiss}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </Card>
      ) : null}
      {activeEngine === "seedance_2" ? (
        <Card className="flex items-start justify-between gap-2">
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            {t("hub.seedance.hint", lang)}
          </p>
          <button
            type="button"
            aria-label={t("hub.dismiss", lang)}
            onClick={onDismiss}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </Card>
      ) : null}
    </>
  );
}
