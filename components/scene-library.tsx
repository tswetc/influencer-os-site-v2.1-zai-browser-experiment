"use client";

// Fix Pack 9 - A4 (scene library) + A5 (scene packs). A "Save scene" action
// next to the scene field, a saved list with search and delete, and
// ready-made packs applied in one tap. Fix Pack 11: packs are grouped by
// world (A diary / B underground / C kitsch-cinema) with technique chips.

import { BookmarkPlus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Disclosure, inputCls } from "@/components/ui-bits";
import { VirtualList } from "@/components/virtual-list";
import { t } from "@/lib/i18n";
import { SCENE_PACKS, type PackScene, type ScenePack } from "@/lib/packs";
import {
  TECHNIQUE_BY_ID,
  WORLDS,
  techniqueText,
  type World,
} from "@/lib/techniques";
import type { Lang, SavedScene } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SceneLibrary({
  lang,
  saved,
  canSave,
  onSaveCurrent,
  onApplySaved,
  onDeleteSaved,
  onApplyPack,
}: {
  lang: Lang;
  saved: SavedScene[];
  canSave: boolean;
  onSaveCurrent: () => void;
  onApplySaved: (s: SavedScene) => void;
  onDeleteSaved: (id: string) => void;
  onApplyPack: (pack: ScenePack, scene: PackScene) => void;
}) {
  const [packId, setPackId] = useState(SCENE_PACKS[0].id);
  const [query, setQuery] = useState("");
  const pack = SCENE_PACKS.find((p) => p.id === packId) ?? SCENE_PACKS[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return saved;
    return saved.filter((s) =>
      (s.name + " " + s.text).toLowerCase().includes(q),
    );
  }, [saved, query]);

  return (
    <Disclosure title={t("lib.title", lang)} subtitle={t("lib.subtitle", lang)}>
      <div className="flex flex-col gap-4">
        {/* Save current scene */}
        <button
          type="button"
          disabled={!canSave}
          onClick={onSaveCurrent}
          className="inline-flex min-h-[44px] w-fit items-center gap-1.5 rounded-xl bg-primary px-4 text-[15px] font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <BookmarkPlus aria-hidden="true" className="h-4 w-4" />
          {t("lib.save", lang)}
        </button>

        {/* Packs */}
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-medium text-muted-foreground">
            {t("lib.packs", lang)}
          </span>
          {(Object.keys(WORLDS) as World[]).map((w) => (
            <div key={w} className="flex flex-col gap-1.5">
              <span
                title={WORLDS[w].hint[lang]}
                className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {WORLDS[w].label[lang]}
              </span>
              <div
                role="radiogroup"
                aria-label={WORLDS[w].label[lang]}
                className="flex flex-wrap gap-1.5"
              >
                {SCENE_PACKS.filter((p) => p.world === w).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={p.id === packId}
                    onClick={() => setPackId(p.id)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring",
                      p.id === packId
                        ? "border-primary bg-accent text-accent-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-input hover:text-foreground",
                    )}
                  >
                    {p.label[lang]}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <p className="text-[13px] leading-relaxed text-muted-foreground text-pretty">
            {pack.tagline[lang]}
          </p>
          {pack.techniqueIds.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[12px] font-medium text-muted-foreground">
                {t("lib.tech", lang)}
              </span>
              {pack.techniqueIds.map((id) =>
                TECHNIQUE_BY_ID[id] ? (
                  <span
                    key={id}
                    title={techniqueText(TECHNIQUE_BY_ID[id])}
                    className="rounded-full bg-muted px-2 py-0.5 text-[12px] font-medium text-muted-foreground"
                  >
                    {TECHNIQUE_BY_ID[id].label[lang]}
                  </span>
                ) : null,
              )}
            </div>
          ) : null}
          <div className="grid grid-cols-2 gap-2">
            {pack.scenes.map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => onApplyPack(pack, sc)}
                className="flex min-h-[44px] flex-col items-start gap-0.5 rounded-xl border border-border bg-card p-3 text-left transition-colors hover:border-input focus-visible:outline-2 focus-visible:outline-ring"
              >
                <span className="text-[13px] font-semibold text-card-foreground">
                  {sc.label[lang]}
                </span>
                <span className="line-clamp-1 text-[12px] text-muted-foreground">
                  {sc.fields.location}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Saved scenes */}
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <span className="text-[13px] font-medium text-muted-foreground">
            {t("lib.saved.title", lang)}
          </span>
          {saved.length > 0 ? (
            <label className="relative block">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
              />
              <span className="sr-only">{t("lib.search", lang)}</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("lib.search", lang)}
                className={cn(inputCls, "pl-9")}
              />
            </label>
          ) : null}
          {saved.length === 0 ? (
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {t("lib.empty", lang)}
            </p>
          ) : (
            <VirtualList
              items={filtered}
              rowHeight={64}
              keyOf={(s) => s.id}
              label={t("lib.saved.title", lang)}
              render={(s) => (
                <div className="flex h-full items-stretch gap-1.5">
                  <button
                    type="button"
                    onClick={() => onApplySaved(s)}
                    className="flex min-h-[44px] min-w-0 flex-1 flex-col justify-center rounded-xl border border-border bg-card px-3 py-2 text-left transition-colors hover:border-input focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <span className="truncate text-[13px] font-medium text-card-foreground">
                      {s.name}
                    </span>
                    <span className="truncate text-[12px] text-muted-foreground">
                      {s.text}
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label={`${t("lib.delete", lang)}: ${s.name}`}
                    onClick={() => onDeleteSaved(s.id)}
                    className="flex min-h-[44px] w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <Trash2 aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              )}
            />
          )}
        </div>
      </div>
    </Disclosure>
  );
}
