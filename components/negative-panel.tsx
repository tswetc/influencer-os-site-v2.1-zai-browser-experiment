"use client";

import { Disclosure } from "@/components/ui-bits";
import { ENGINES_WITH_NEGATIVE, NEG_KLING, NEG_VEO } from "@/lib/engines";
import { t } from "@/lib/i18n";
import type { EngineId, Lang } from "@/lib/types";

export function defaultNegative(engine: EngineId): string {
  if (engine === "kling_3") return NEG_KLING;
  if (engine === "veo_scene" || engine === "veo_broll") return NEG_VEO;
  return "";
}

/** Negative field. Shown ONLY for Kling and Veo per canon. */
export function NegativePanel({
  lang,
  engine,
  value,
  onChange,
}: {
  lang: Lang;
  engine: EngineId;
  value: string;
  onChange: (v: string) => void;
}) {
  if (!ENGINES_WITH_NEGATIVE.includes(engine)) return null;

  return (
    <Disclosure title={t("negative.title", lang)}>
      <div className="flex flex-col gap-2">
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          {t("negative.hint", lang)}
        </p>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          aria-label={t("negative.title", lang)}
          className="w-full resize-y rounded-md border border-input bg-card px-3 py-2.5 font-mono text-[13px] leading-relaxed text-card-foreground focus-visible:outline-2 focus-visible:outline-ring"
        />
        <button
          type="button"
          onClick={() => onChange(defaultNegative(engine))}
          className="self-start rounded-md px-2 py-1 text-[13px] font-medium text-accent hover:bg-secondary focus-visible:outline-2 focus-visible:outline-ring"
        >
          {t("confirm.reset", lang)}
        </button>
      </div>
    </Disclosure>
  );
}
