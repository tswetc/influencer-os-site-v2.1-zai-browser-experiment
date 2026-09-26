"use client";

// Fix Pack 13: one engine-aware "Realism / anti-detection" panel. Replaces
// the old static realism tip; collapsed by default, zero main-flow footprint.

import { Info } from "lucide-react";
import { Disclosure } from "@/components/ui-bits";
import { antiDetectTips } from "@/lib/antidetect";
import { t } from "@/lib/i18n";
import type { EngineId, Lang } from "@/lib/types";

export function AntiDetectPanel({
  lang,
  engine,
}: {
  lang: Lang;
  engine: EngineId;
}) {
  const tips = antiDetectTips(engine);
  return (
    <Disclosure title={t("anti.title", lang)}>
      <div className="flex flex-col gap-2 text-[13px] leading-relaxed text-muted-foreground">
        <p>{t("tip.body", lang)}</p>
        <ul className="flex flex-col gap-1.5">
          {tips.map((tip) => (
            <li key={tip.id} className="flex gap-1.5">
              <span aria-hidden="true" className="shrink-0">
                •
              </span>
              <span>{lang === "ru" ? tip.ru : tip.en}</span>
            </li>
          ))}
        </ul>
        <p className="flex items-start gap-1.5">
          <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {t("tip.synthid", lang)}
        </p>
      </div>
    </Disclosure>
  );
}
