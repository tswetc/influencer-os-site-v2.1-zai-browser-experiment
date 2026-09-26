"use client";

import { Card, Chip } from "@/components/ui-bits";
import { REALISM_KEYS, STYLE_KEYS } from "@/lib/engines";
import { realismLabel, styleLabel } from "@/lib/display-labels";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

function toggle(list: string[], key: string): string[] {
  return list.includes(key) ? list.filter((k) => k !== key) : [...list, key];
}

export function StyleRealism({
  lang,
  style,
  realism,
  onStyleChange,
  onRealismChange,
}: {
  lang: Lang;
  style: string[];
  realism: string[];
  onStyleChange: (s: string[]) => void;
  onRealismChange: (r: string[]) => void;
}) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-[15px] font-semibold text-card-foreground">
          {t("style.title", lang)}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {STYLE_KEYS.map((k) => (
            <Chip
              key={k}
              label={styleLabel(k)}
              checked={style.includes(k)}
              onChange={() => onStyleChange(toggle(style, k))}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-[15px] font-semibold text-card-foreground">
          {t("realism.title", lang)}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {REALISM_KEYS.map((k) => (
            <Chip
              key={k}
              label={realismLabel(k, lang)}
              checked={realism.includes(k)}
              onChange={() => onRealismChange(toggle(realism, k))}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
