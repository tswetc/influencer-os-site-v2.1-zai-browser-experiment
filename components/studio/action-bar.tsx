"use client";

// FP23: the sticky one-row action bar (FP22 design), extracted from the page
// monolith. Format lives on the left, Build on the right, everything advanced
// sits in one labeled popover above the bar.

import { SlidersHorizontal, Sparkles } from "lucide-react";
import { Chip, Segmented } from "@/components/ui-bits";
import { hintText, shouldShowHint } from "@/lib/hints";
import { t } from "@/lib/i18n";
import { SCENE_PACKS } from "@/lib/packs";
import { FMT_RANGE, type PromptFormat } from "@/lib/presets";
import type { EngineId, Lang, Mode } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ActionBar({
  lang,
  engine,
  mode,
  format,
  onPickFormat,
  gateLocked,
  onGenerate,
  optsOpen,
  onToggleOpts,
  variants,
  onPickVariants,
  compress,
  onToggleCompress,
  fmtSize,
  onFmtSize,
  mixIds,
  onToggleMix,
  mixedWorldsPicked,
  multishot,
  onMultishot,
  hintsEnabled,
}: {
  lang: Lang;
  engine: EngineId;
  mode: Mode;
  format: PromptFormat;
  onPickFormat: (f: PromptFormat) => void;
  gateLocked: boolean;
  onGenerate: () => void;
  optsOpen: boolean;
  onToggleOpts: () => void;
  variants: number;
  onPickVariants: (n: number) => void;
  compress: boolean;
  onToggleCompress: (v: boolean) => void;
  fmtSize: number;
  onFmtSize: (n: number) => void;
  mixIds: string[];
  onToggleMix: (id: string) => void;
  mixedWorldsPicked: boolean;
  multishot: number;
  onMultishot: (n: 0 | 2 | 3 | 4 | 5 | 6) => void;
  hintsEnabled: boolean;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur">
      <div className="relative mx-auto flex w-full max-w-[720px] flex-col gap-2 px-4 py-3 min-[480px]:flex-row min-[480px]:items-center">
        {engine === "nano_pro" && mode === "photo" ? (
          <div className="min-w-0 [&>div]:flex [&>div]:w-full [&_button]:min-w-0 [&_button]:flex-1 [&_button]:px-1.5 min-[480px]:[&>div]:inline-flex min-[480px]:[&>div]:w-auto min-[480px]:[&_button]:flex-none min-[480px]:[&_button]:px-2.5">
            <Segmented<PromptFormat>
              size="sm"
              label={t("fmt.label", lang)}
              value={format}
              onChange={onPickFormat}
              options={(["single", "series", "shoot", "feed"] as const).map(
                (f) => ({ value: f, label: t(`fmt.${f}`, lang) }),
              )}
            />
          </div>
        ) : null}
        <div className="flex items-center gap-2 min-[480px]:ml-auto min-[480px]:shrink-0">
          <button
            type="button"
            aria-label={t("build.options", lang)}
            aria-expanded={optsOpen}
            aria-haspopup="true"
            onClick={onToggleOpts}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            data-tour="tour-generate"
            onClick={onGenerate}
            disabled={gateLocked}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-[15px] font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-ring min-[480px]:flex-none"
          >
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            {t("generate", lang)}
          </button>
        </div>

        {/* FP22: everything advanced lives in one popover above the bar */}
        {optsOpen ? (
          <div
            role="group"
            aria-label={t("build.options", lang)}
            className="absolute bottom-full right-4 mb-2 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-medium text-muted-foreground">
                {t("variants", lang)}
              </span>
              <div
                role="radiogroup"
                aria-label={t("variants", lang)}
                className="flex items-center gap-1"
              >
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={variants === n}
                    aria-label={`${t("variants", lang)}: ${n}`}
                    disabled={engine === "nano_pro" && format !== "single"}
                    onClick={() => onPickVariants(n)}
                    className={cn(
                      "h-9 w-9 rounded-md text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-40",
                      variants === n
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {engine === "nano_pro" ? (
                <Chip
                  label={t("compress.label", lang)}
                  checked={compress}
                  onChange={onToggleCompress}
                />
              ) : null}
            </div>
            {engine === "nano_pro" &&
            mode === "photo" &&
            format !== "single" ? (
              <label className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground">
                {t("fmt.size", lang)}
                <input
                  type="range"
                  min={FMT_RANGE[format].min}
                  max={FMT_RANGE[format].max}
                  step={FMT_RANGE[format].step}
                  value={fmtSize}
                  onChange={(e) => onFmtSize(Number(e.target.value))}
                  className="min-w-0 flex-1"
                  aria-label={t("fmt.size", lang)}
                />
                <span className="w-6 text-center text-[13px] font-semibold text-foreground">
                  {fmtSize}
                </span>
              </label>
            ) : null}
            {engine === "nano_pro" && mode === "photo" && format === "feed" ? (
              <div className="flex w-full flex-col gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className="text-[13px] font-medium text-muted-foreground"
                    title={t("mix.hint", lang)}
                  >
                    {t("mix.label", lang)}
                  </span>
                  {SCENE_PACKS.map((p) => {
                    const selected = mixIds.includes(p.id);
                    const baseWorld =
                      mixIds.length > 0
                        ? SCENE_PACKS.find((x) => x.id === mixIds[0])?.world
                        : undefined;
                    const foreign =
                      baseWorld !== undefined && p.world !== baseWorld;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => onToggleMix(p.id)}
                        className={cn(
                          "h-8 rounded-full border px-2.5 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring",
                          selected
                            ? "border-accent bg-accent text-accent-foreground"
                            : "border-border bg-card text-muted-foreground hover:text-foreground",
                          !selected && foreign ? "opacity-50" : "",
                        )}
                      >
                        {p.label[lang]}
                        {foreign ? " ⚠" : ""}
                      </button>
                    );
                  })}
                </div>
                {mixedWorldsPicked ? (
                  <p className="text-[13px] font-medium text-warning">
                    {t("mix.flag", lang)}
                  </p>
                ) : null}
              </div>
            ) : null}
            {engine === "kling_3" && mode === "video" ? (
              <div
                role="radiogroup"
                aria-label={t("ms.label", lang)}
                title={t("ms.hint", lang)}
                className="flex flex-wrap items-center gap-1"
              >
                <span className="text-[13px] font-medium text-muted-foreground">
                  {t("ms.label", lang)}
                </span>
                {([0, 2, 3, 4, 5, 6] as const).map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={multishot === n}
                    aria-label={
                      n === 0
                        ? t("ms.off", lang)
                        : `${t("ms.label", lang)}: ${n}`
                    }
                    onClick={() => onMultishot(n)}
                    className={cn(
                      "h-9 min-w-9 rounded-md px-2 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-ring",
                      multishot === n
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {n === 0 ? "—" : `×${n}`}
                  </button>
                ))}
              </div>
            ) : null}
            {engine === "kling_3" && mode === "video" && multishot === 6 ? (
              <p className="w-full text-[13px] font-medium text-warning">
                {t("ms.warn", lang)}
              </p>
            ) : null}
            {hintsEnabled && shouldShowHint("format") ? (
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {hintText("format", lang)}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
