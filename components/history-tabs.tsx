"use client";

import { RotateCcw, Star, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { useState } from "react";
import { Disclosure, Segmented, Tag, inputCls } from "@/components/ui-bits";
import { VirtualList } from "@/components/virtual-list";
import { engineLabel, modeLabel, styleLabel } from "@/lib/display-labels";
import { t } from "@/lib/i18n";
import type { EngineId, HistoryRecord, Lang, Mode, Preset } from "@/lib/types";

type Tab = "history" | "favorites" | "presets";

export function HistoryTabs({
  lang,
  history,
  favorites,
  presets,
  onRepeat,
  onDelete,
  onToggleFavorite,
  onOutcome,
  onApplyPreset,
  onSavePreset,
  onDeletePreset,
}: {
  lang: Lang;
  history: HistoryRecord[];
  favorites: HistoryRecord[];
  presets: Preset[];
  onRepeat: (rec: HistoryRecord) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (rec: HistoryRecord) => void;
  onOutcome: (id: string, outcome: "hit" | "miss" | null) => void;
  onApplyPreset: (p: Preset) => void;
  onSavePreset: (name: string) => void;
  onDeletePreset: (id: string) => void;
}) {
  const [tab, setTab] = useState<Tab>("history");
  const [engineFilter, setEngineFilter] = useState<EngineId | "all">("all");
  const [modeFilter, setModeFilter] = useState<Mode | "all">("all");
  const [presetName, setPresetName] = useState("");

  const favIds = new Set(favorites.map((f) => f.id));
  const source = tab === "favorites" ? favorites : history;
  const records = source.filter(
    (r) =>
      (engineFilter === "all" || r.engine === engineFilter) &&
      (modeFilter === "all" || r.mode === modeFilter),
  );
  const engines = Array.from(
    new Set([...history, ...favorites].map((r) => r.engine)),
  );

  return (
    <Disclosure
      title={`${t("history.title", lang)} · ${t("presets.title", lang)}`}
    >
      <div className="flex flex-col gap-3">
        <Segmented<Tab>
          label={t("history.title", lang)}
          value={tab}
          onChange={setTab}
          options={[
            { value: "history", label: t("history.title", lang) },
            { value: "favorites", label: t("favorites.title", lang) },
            { value: "presets", label: t("presets.title", lang) },
          ]}
        />

        {tab === "presets" ? (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder={t("preset.name", lang)}
                aria-label={t("preset.name", lang)}
                className={inputCls}
              />
              <button
                type="button"
                onClick={() => {
                  if (!presetName.trim()) return;
                  onSavePreset(presetName.trim());
                  setPresetName("");
                }}
                className="shrink-0 rounded-md bg-accent px-3 py-2 text-[13px] font-semibold text-accent-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring"
              >
                {t("preset.save", lang)}
              </button>
            </div>
            {presets.length === 0 ? (
              <p className="text-[13px] text-muted-foreground">
                {t("history.empty", lang)}
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {presets.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border p-2.5"
                  >
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="truncate text-[15px] font-medium text-card-foreground">
                        {p.name}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        <Tag>{engineLabel(p.engine)}</Tag>
                        <Tag>{modeLabel(p.mode, lang)}</Tag>
                        {p.style.slice(0, 3).map((s) => (
                          <Tag key={s}>{styleLabel(s)}</Tag>
                        ))}
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1.5">
                      <button
                        type="button"
                        onClick={() => onApplyPreset(p)}
                        className="rounded-md bg-secondary px-2.5 py-1.5 text-[13px] font-medium text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
                      >
                        {t("preset.apply", lang)}
                      </button>
                      {p.id.startsWith("seed_") ? null : (
                        <button
                          type="button"
                          aria-label={t("passport.delete", lang)}
                          onClick={() => onDeletePreset(p.id)}
                          className="rounded-md bg-secondary p-1.5 text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
                        >
                          <Trash2 aria-hidden="true" className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {engines.length > 1 ? (
              <div className="flex flex-wrap gap-1.5">
                <FilterChip
                  active={engineFilter === "all"}
                  label={modeLabel("all", lang)}
                  onClick={() => setEngineFilter("all")}
                />
                {engines.map((e) => (
                  <FilterChip
                    key={e}
                    active={engineFilter === e}
                    label={engineLabel(e)}
                    onClick={() => setEngineFilter(e)}
                  />
                ))}
              </div>
            ) : null}
            {records.length === 0 ? (
              <p className="text-[13px] text-muted-foreground">
                {t("history.empty", lang)}
              </p>
            ) : (
              <VirtualList
                items={records}
                rowHeight={100}
                keyOf={(r) => r.id}
                label={t("history.title", lang)}
                render={(r) => (
                  <div className="flex h-full items-start justify-between gap-2 rounded-lg border border-border p-2.5">
                    <div className="flex min-w-0 flex-col gap-1">
                      <div className="flex flex-wrap gap-1">
                        <Tag>{engineLabel(r.engine)}</Tag>
                        <Tag>{modeLabel(r.mode, lang)}</Tag>
                      </div>
                      <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                        {r.scenePreview || r.prompt}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1.5">
                      <button
                        type="button"
                        aria-label={t("history.repeat", lang)}
                        onClick={() => onRepeat(r)}
                        className="rounded-md bg-secondary p-1.5 text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
                      >
                        <RotateCcw aria-hidden="true" className="h-4 w-4" />
                      </button>
                      {tab === "history" ? (
                        <>
                          <button
                            type="button"
                            aria-label={t("journal.hit", lang)}
                            aria-pressed={r.outcome === "hit"}
                            onClick={() =>
                              onOutcome(
                                r.id,
                                r.outcome === "hit" ? null : "hit",
                              )
                            }
                            className="rounded-md bg-secondary p-1.5 text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
                          >
                            <ThumbsUp
                              aria-hidden="true"
                              className={
                                r.outcome === "hit"
                                  ? "h-4 w-4 fill-accent text-accent"
                                  : "h-4 w-4"
                              }
                            />
                          </button>
                          <button
                            type="button"
                            aria-label={t("journal.miss", lang)}
                            aria-pressed={r.outcome === "miss"}
                            onClick={() =>
                              onOutcome(
                                r.id,
                                r.outcome === "miss" ? null : "miss",
                              )
                            }
                            className="rounded-md bg-secondary p-1.5 text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
                          >
                            <ThumbsDown
                              aria-hidden="true"
                              className={
                                r.outcome === "miss"
                                  ? "h-4 w-4 fill-destructive text-destructive"
                                  : "h-4 w-4"
                              }
                            />
                          </button>
                        </>
                      ) : null}
                      <button
                        type="button"
                        aria-label={t("favorites.title", lang)}
                        aria-pressed={favIds.has(r.id)}
                        onClick={() => onToggleFavorite(r)}
                        className="rounded-md bg-secondary p-1.5 text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
                      >
                        <Star
                          aria-hidden="true"
                          className={
                            favIds.has(r.id)
                              ? "h-4 w-4 fill-accent text-accent"
                              : "h-4 w-4"
                          }
                        />
                      </button>
                      <button
                        type="button"
                        aria-label={t("passport.delete", lang)}
                        onClick={() => onDelete(r.id)}
                        className="rounded-md bg-secondary p-1.5 text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
                      >
                        <Trash2 aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              />
            )}
          </div>
        )}
      </div>
    </Disclosure>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={
        active
          ? "rounded-full bg-accent px-2.5 py-1 text-[13px] font-medium text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring"
          : "rounded-full bg-secondary px-2.5 py-1 text-[13px] font-medium text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
      }
    >
      {label}
    </button>
  );
}
