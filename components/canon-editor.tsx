"use client";

// Fix Pack 11.3 — canon editor: one screen, six blocks, one "generate" button.
// Lives right under the passport; the canon is stored ON the passport, so it
// rides versions, export and import for free. Everything here is optional.

import { Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { Chip, Disclosure, Field, inputCls } from "@/components/ui-bits";
import { canonFilled, emptyCanon, generateCanon } from "@/lib/canon";
import { t } from "@/lib/i18n";
import { SCENE_PACKS } from "@/lib/packs";
import type { CharacterPassport, Lang, ModelCanon } from "@/lib/types";
import type { LlmConfig } from "@/lib/vision";

const lines = (v: string): string[] =>
  v
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

export function CanonEditor({
  lang,
  passport,
  world,
  llmCfg,
  onPassportChange,
}: {
  lang: Lang;
  passport: CharacterPassport;
  world: "A" | "B" | "C";
  llmCfg: LlmConfig;
  onPassportChange: (p: CharacterPassport) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const canon = passport.canon ?? emptyCanon();
  const filled = canonFilled(passport.canon);
  const editKey = canon.generatedAt ?? "manual";

  function update(patch: Partial<ModelCanon>) {
    onPassportChange({
      ...passport,
      canon: { ...canon, ...patch },
      updatedAt: new Date().toISOString(),
    });
  }

  async function handleGenerate() {
    if (busy || !llmCfg.apiKey) return;
    setBusy(true);
    setError(false);
    const res = await generateCanon(
      llmCfg,
      passport,
      canon.homeWorld || world,
      lang,
    );
    if (res.ok && res.canon) {
      onPassportChange({
        ...passport,
        canon: res.canon,
        updatedAt: new Date().toISOString(),
      });
    } else {
      setError(true);
    }
    setBusy(false);
  }

  return (
    <Disclosure
      title={t("canon.title", lang)}
      badge={filled ? t("canon.active", lang) : undefined}
    >
      <div className="space-y-3">
        <p className="text-[13px] text-muted-foreground">
          {t("canon.tagline", lang)}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={busy || !llmCfg.apiKey}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[13px] font-medium text-primary-foreground disabled:opacity-50"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {busy
              ? t("canon.generating", lang)
              : filled
                ? t("canon.regenerate", lang)
                : t("canon.generate", lang)}
          </button>
          {filled ? (
            <button
              type="button"
              onClick={() => {
                const next = {
                  ...passport,
                  updatedAt: new Date().toISOString(),
                };
                delete next.canon;
                onPassportChange(next);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[13px] text-muted-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {t("canon.clear", lang)}
            </button>
          ) : null}
        </div>
        {!llmCfg.apiKey ? (
          <p className="text-[12px] text-muted-foreground">
            {t("canon.needKey", lang)}
          </p>
        ) : null}
        {error ? (
          <p className="text-[13px] text-destructive">
            {t("canon.error", lang)}
          </p>
        ) : null}
        {filled ? (
          <p className="text-[12px] text-muted-foreground">
            {t("canon.filled", lang)}
          </p>
        ) : null}

        <Field label={t("canon.who", lang)}>
          <input
            className={inputCls}
            value={canon.whoSheIs}
            onChange={(e) => update({ whoSheIs: e.target.value })}
          />
          <p className="mt-1 text-[12px] text-muted-foreground">
            {t("canon.who.hint", lang)}
          </p>
        </Field>

        <Field label={t("canon.place", lang)}>
          <textarea
            key={`place-${editKey}`}
            className={inputCls}
            rows={3}
            defaultValue={canon.place.join("\n")}
            onChange={(e) => update({ place: lines(e.target.value) })}
          />
          <p className="mt-1 text-[12px] text-muted-foreground">
            {t("canon.place.hint", lang)}
          </p>
        </Field>

        <Field label={t("canon.objects", lang)}>
          <textarea
            key={`objects-${editKey}`}
            className={inputCls}
            rows={4}
            defaultValue={canon.objects.join("\n")}
            onChange={(e) => update({ objects: lines(e.target.value) })}
          />
          <p className="mt-1 text-[12px] text-muted-foreground">
            {t("canon.objects.hint", lang)}
          </p>
        </Field>

        <Field label={t("canon.world", lang)}>
          <div className="flex flex-wrap gap-1.5">
            {(["A", "B", "C"] as const).map((w) => (
              <Chip
                key={w}
                label={w === "A" ? "Diary" : w === "B" ? "Raw" : "Staged"}
                checked={canon.homeWorld === w}
                onChange={(v) => update({ homeWorld: v ? w : "" })}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SCENE_PACKS.map((p) => (
              <Chip
                key={p.id}
                label={p.label[lang]}
                checked={canon.favoritePacks.includes(p.id)}
                onChange={(v) =>
                  update({
                    favoritePacks: v
                      ? canon.favoritePacks.length >= 3
                        ? canon.favoritePacks
                        : [...canon.favoritePacks, p.id]
                      : canon.favoritePacks.filter((x) => x !== p.id),
                  })
                }
              />
            ))}
          </div>
          <p className="mt-1 text-[12px] text-muted-foreground">
            {t("canon.world.hint", lang)}
          </p>
        </Field>

        <Field label={t("canon.voice", lang)}>
          <input
            className={inputCls}
            placeholder={t("canon.voice.style", lang)}
            value={canon.voiceStyle}
            onChange={(e) => update({ voiceStyle: e.target.value })}
          />
          <textarea
            key={`voice-${editKey}`}
            className={`${inputCls} mt-2`}
            rows={3}
            placeholder={t("canon.voice.words", lang)}
            defaultValue={canon.voiceWords.join("\n")}
            onChange={(e) => update({ voiceWords: lines(e.target.value) })}
          />
          <p className="mt-1 text-[12px] text-muted-foreground">
            {t("canon.voice.hint", lang)}
          </p>
        </Field>

        <Field label={t("canon.habits", lang)}>
          <textarea
            key={`habits-${editKey}`}
            className={inputCls}
            rows={3}
            defaultValue={canon.habits.join("\n")}
            onChange={(e) => update({ habits: lines(e.target.value) })}
          />
          <p className="mt-1 text-[12px] text-muted-foreground">
            {t("canon.habits.hint", lang)}
          </p>
        </Field>
      </div>
    </Disclosure>
  );
}
