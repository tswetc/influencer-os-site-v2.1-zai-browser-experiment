"use client";

import { Sparkles, Wand2, X } from "lucide-react";
import { Card } from "@/components/ui-bits";
import { t } from "@/lib/i18n";
import type { ParsedTags, TagCat } from "@/lib/parse";
import type { Lang } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SceneField({
  lang,
  value,
  onChange,
  placeholder,
  onExample,
  onEnhance,
  enhancing,
  onTranslate,
  translating,
  parsed,
  highlight,
  onRemoveTag,
  onResolveAmbiguity,
}: {
  lang: Lang;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onExample?: () => void;
  onEnhance?: () => void;
  enhancing?: boolean;
  onTranslate?: () => void;
  translating?: boolean;
  parsed: ParsedTags;
  highlight: boolean;
  onRemoveTag: (tag: string) => void;
  onResolveAmbiguity: (term: string, en: string, cat: TagCat) => void;
}) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[15px] font-semibold text-card-foreground">
          {t("scene.label", lang)}
        </span>
        <div className="flex items-center gap-1.5">
          {onEnhance ? (
            <button
              type="button"
              onClick={onEnhance}
              disabled={enhancing || !value.trim()}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-[13px] font-medium text-card-foreground hover:bg-muted disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              {enhancing
                ? t("scene.enhancing", lang)
                : t("scene.enhance", lang)}
            </button>
          ) : null}
          {onExample ? (
            <button
              type="button"
              onClick={onExample}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Wand2 aria-hidden="true" className="h-3.5 w-3.5" />
              {t("scene.example", lang)}
            </button>
          ) : null}
        </div>
      </div>
      <label className="flex flex-col gap-2">
        <span className="sr-only">{t("scene.label", lang)}</span>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? t("scene.placeholder", lang)}
          rows={4}
          className={cn(
            "w-full resize-y rounded-md border bg-card px-3 py-2.5 text-[15px] leading-relaxed text-card-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring",
            highlight ? "border-destructive" : "border-input",
          )}
        />
      </label>
      {highlight ? (
        <p role="alert" className="text-[13px] font-medium text-destructive">
          {t("scene.empty", lang)}
        </p>
      ) : null}
      {parsed.tags.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-muted-foreground">
            {t("scene.autotags", lang)}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {parsed.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[13px] font-medium text-muted-foreground"
              >
                {tag}
                <button
                  type="button"
                  aria-label={`${t("scene.removeTag", lang)}: ${tag}`}
                  onClick={() => onRemoveTag(tag)}
                  className="-my-1 -mr-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <X aria-hidden="true" className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {parsed.ambiguities.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          {parsed.ambiguities.map((amb) => (
            <div key={amb.term} className="flex flex-wrap items-center gap-1.5">
              <span className="text-[13px] font-medium text-muted-foreground">
                {t("scene.ambiguity", lang)} «{amb.term}» —
              </span>
              {amb.options.map((opt) => (
                <button
                  key={opt.en}
                  type="button"
                  onClick={() => onResolveAmbiguity(amb.term, opt.en, opt.cat)}
                  className="rounded-full border border-border bg-card px-2.5 py-1 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
                >
                  {opt.en}
                </button>
              ))}
            </div>
          ))}
        </div>
      ) : null}
      {onTranslate && parsed.unknown.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[13px] font-medium text-muted-foreground">
            {t("scene.unknown", lang)}:
          </span>
          {parsed.unknown.map((w) => (
            <span
              key={w}
              className="rounded-full bg-muted px-2.5 py-1 text-[13px] font-medium text-muted-foreground"
            >
              {w}
            </span>
          ))}
          <button
            type="button"
            onClick={onTranslate}
            disabled={translating}
            className="rounded-full border border-border bg-card px-2.5 py-1 text-[13px] font-medium text-card-foreground hover:bg-muted disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-ring"
          >
            {translating
              ? t("scene.translating", lang)
              : t("scene.translate", lang)}
          </button>
        </div>
      ) : null}
    </Card>
  );
}
