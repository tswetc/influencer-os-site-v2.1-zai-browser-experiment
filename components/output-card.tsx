"use client";

import {
  Check,
  Copy,
  FileDown,
  FileJson,
  ListChecks,
  Redo2,
  RefreshCw,
  ShieldCheck,
  Star,
  Undo2,
} from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui-bits";
import { approxTokens, countWords } from "@/lib/engines";
import {
  type BundleMeta,
  bundleFilename,
  bundleJson,
  bundleText,
  shotListFilename,
  shotListText,
} from "@/lib/bundle";
import { type CaptionVoice, voiceLabel } from "@/lib/captions";
import { t } from "@/lib/i18n";
import type { BuildResult, Lang } from "@/lib/types";
import type { DoctorSuggestion } from "@/lib/doctor";

function CopyButton({ text, lang }: { text: string; lang: Lang }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1.5 text-[13px] font-medium text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
    >
      {copied ? (
        <Check aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
      ) : (
        <Copy aria-hidden="true" className="h-3.5 w-3.5" />
      )}
      {copied ? t("copied", lang) : t("copy", lang)}
    </button>
  );
}

/** Output: prompt(s) in monospace cards + separate negative + token estimate. */
export function OutputCard({
  lang,
  results,
  imageBytes,
  onFavorite,
  favorited,
  onCritic,
  critic,
  criticBusy,
  exportMeta,
  onReroll,
  feedFlag,
  strength,
  suggestions,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: {
  lang: Lang;
  results: BuildResult[];
  imageBytes: number;
  onFavorite: (index: number) => void;
  favorited: boolean[];
  onCritic?: () => void;
  critic?: string | null;
  criticBusy?: boolean;
  exportMeta?: BundleMeta | null;
  /** Fix Pack 11.2: re-roll one frame of a shoot/feed. */
  onReroll?: (index: number) => void;
  /** Fix Pack 11.2: mixed-worlds feed flag. */
  feedFlag?: boolean;
  /** Fix Pack 13: prompt strength meter for the current spec. */
  strength?: { score: number; gaps: string[] } | null;
  /** Fix Pack 14: Prompt Doctor suggestions for the current spec. */
  suggestions?: DoctorSuggestion[] | null;
  /** FP22: undo/redo pinned in the output header - no layout shift. */
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}) {
  if (results.length === 0) return null;

  return (
    <Card className="flex flex-col gap-4" id="output">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-[15px] font-semibold text-card-foreground">
          {t("output.title", lang)}
        </h2>
        {onUndo && onRedo ? (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label={t("undo.label", lang)}
              title={t("undo.label", lang)}
              disabled={!canUndo}
              onClick={onUndo}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Undo2 aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={t("redo.label", lang)}
              title={t("redo.label", lang)}
              disabled={!canRedo}
              onClick={onRedo}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Redo2 aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>
      {strength ? (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[13px] text-muted-foreground">
            <span>{t("strength.label", lang)}</span>
            <span className="font-medium text-card-foreground">
              {strength.score}/100
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${Math.max(4, strength.score)}%` }}
            />
          </div>
          {strength.gaps.length > 0 ? (
            <details className="text-[13px] text-muted-foreground">
              <summary className="cursor-pointer select-none">
                {t("strength.gaps", lang)}
              </summary>
              <ul className="mt-1.5 flex flex-col gap-1 pl-4">
                {strength.gaps.map((g) => (
                  <li key={g} className="list-disc">
                    {t(`strength.gap.${g}`, lang)}
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </div>
      ) : null}
      {suggestions && suggestions.length > 0 ? (
        <details className="text-[13px] text-muted-foreground">
          <summary className="cursor-pointer select-none font-medium text-card-foreground">
            {t("doctor.title", lang)}
          </summary>
          <ul className="mt-1.5 flex flex-col gap-1.5 pl-4">
            {suggestions.map((s) => (
              <li key={s.id} className="list-disc">
                <span
                  className={
                    s.severity === "fix"
                      ? "font-medium text-warning"
                      : "text-muted-foreground"
                  }
                >
                  {t(`doctor.sev.${s.severity}`, lang)}
                </span>{" "}
                — {t(`doctor.${s.id}`, lang)}
              </li>
            ))}
          </ul>
        </details>
      ) : null}
      {feedFlag ? (
        <p role="status" className="text-[13px] font-medium text-warning">
          {t("mix.flag", lang)}
        </p>
      ) : null}
      {results.map((r, i) => {
        const tokens = approxTokens(r.prompt) + Math.ceil(imageBytes / 4 / 250);
        return (
          <div
            key={`${i}-${r.prompt.slice(0, 24)}`}
            className="flex flex-col gap-2"
          >
            {r.label ? (
              <span className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
                {i + 1}/{results.length} · {r.label}
                {r.role ? <> · {t(`role.${r.role}`, lang)}</> : null}
                {typeof r.day === "number" ? (
                  <>
                    {" · "}
                    {t("feed.day", lang)} {r.day}
                  </>
                ) : null}
              </span>
            ) : results.length > 1 ? (
              <span className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
                {t("variants", lang)} {i + 1}
              </span>
            ) : null}
            <div className="rounded-lg border border-border bg-secondary p-3">
              <p className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-card-foreground">
                {r.prompt}
              </p>
            </div>
            {r.caption ? (
              <p className="font-mono text-[13px] italic leading-relaxed text-muted-foreground">
                “{r.caption}”
                {r.voice ? (
                  <span className="ml-2 rounded-full border border-border px-1.5 py-0.5 text-[12px] not-italic">
                    {voiceLabel(r.voice as CaptionVoice, lang)}
                  </span>
                ) : null}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center gap-2">
              <CopyButton text={r.prompt} lang={lang} />
              {onReroll ? (
                <button
                  type="button"
                  onClick={() => onReroll(i)}
                  className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1.5 text-[13px] font-medium text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
                  {t("feed.reroll", lang)}
                </button>
              ) : null}
              <button
                type="button"
                aria-label={t("favorites.title", lang)}
                aria-pressed={favorited[i] ?? false}
                onClick={() => onFavorite(i)}
                className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1.5 text-[13px] font-medium text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Star
                  aria-hidden="true"
                  className={
                    favorited[i]
                      ? "h-3.5 w-3.5 fill-accent text-accent"
                      : "h-3.5 w-3.5"
                  }
                />
              </button>
              <span className="text-[13px] text-muted-foreground">
                {countWords(r.prompt)} {t("output.words", lang)} ·{" "}
                {t("tokens.estimate", lang)}: {tokens}
              </span>
              {r.underMin ? (
                <span
                  role="status"
                  className="text-[13px] font-medium text-warning"
                >
                  {t("output.underMin", lang)}
                </span>
              ) : null}
            </div>
            {r.negative ? (
              <div className="flex flex-col gap-2">
                <span className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("output.negative", lang)}
                </span>
                <div className="rounded-lg border border-border bg-secondary p-3">
                  <p className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-card-foreground">
                    {r.negative}
                  </p>
                </div>
                <div>
                  <CopyButton text={r.negative} lang={lang} />
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
      {exportMeta && results.length > 1 ? (
        <ExportPanel lang={lang} results={results} meta={exportMeta} />
      ) : null}
      {onCritic ? (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <button
            type="button"
            onClick={onCritic}
            disabled={criticBusy}
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[13px] font-medium text-card-foreground hover:bg-muted disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ShieldCheck aria-hidden="true" className="h-4 w-4" />
            {criticBusy ? t("critic.busy", lang) : t("critic.run", lang)}
          </button>
          {critic ? (
            <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-muted-foreground">
              {critic}
            </p>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}

/** Fix Pack 9 - E2: export a series or pipeline as one labeled package. */
function ExportPanel({
  lang,
  results,
  meta,
}: {
  lang: Lang;
  results: BuildResult[];
  meta: BundleMeta;
}) {
  const [copied, setCopied] = useState(false);

  function download(content: string, mime: string, filename: string) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-2 border-t border-border pt-3">
      <span className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
        {t("export.title", lang)}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(
              bundleText(results, meta, lang),
            );
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-[13px] font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring"
        >
          {copied ? (
            <Check aria-hidden="true" className="h-3.5 w-3.5" />
          ) : (
            <Copy aria-hidden="true" className="h-3.5 w-3.5" />
          )}
          {copied ? t("export.copied", lang) : t("export.copyAll", lang)}
        </button>
        <button
          type="button"
          onClick={() =>
            download(
              bundleText(results, meta, lang),
              "text/plain;charset=utf-8",
              bundleFilename(meta, "txt", lang),
            )
          }
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
        >
          <FileDown aria-hidden="true" className="h-3.5 w-3.5" />
          {t("export.txt", lang)}
        </button>
        <button
          type="button"
          onClick={() =>
            download(
              bundleJson(results, meta),
              "application/json",
              bundleFilename(meta, "json", lang),
            )
          }
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
        >
          <FileJson aria-hidden="true" className="h-3.5 w-3.5" />
          {t("export.json", lang)}
        </button>
        {results.some((r) => typeof r.day === "number" || r.role) ? (
          <button
            type="button"
            onClick={() =>
              download(
                shotListText(results, meta, lang),
                "text/markdown;charset=utf-8",
                shotListFilename(),
              )
            }
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ListChecks aria-hidden="true" className="h-3.5 w-3.5" />
            {t("export.shotlist", lang)}
          </button>
        ) : null}
      </div>
    </div>
  );
}
