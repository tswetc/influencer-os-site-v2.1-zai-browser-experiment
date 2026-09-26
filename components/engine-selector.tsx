"use client";

import {
  Camera,
  Clapperboard,
  Film,
  MessageSquareText,
  Wand2,
} from "lucide-react";
import { Card, Segmented } from "@/components/ui-bits";
import { VIDEO_ENGINES } from "@/lib/engines";
import { t } from "@/lib/i18n";
import type { EngineId, Lang, Mode } from "@/lib/types";
import { cn } from "@/lib/utils";

const ENGINE_ICONS: Record<string, typeof Camera> = {
  kling_3: Clapperboard,
  seedance_2: Film,
  veo_scene: MessageSquareText,
  omni_flash: Wand2,
};

export function ModeToggle({
  lang,
  mode,
  onChange,
}: {
  lang: Lang;
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <Card className="flex items-center justify-center py-3">
      <Segmented<Mode>
        fullWidth
        label={`${t("mode.photo", lang)} / ${t("mode.video", lang)}`}
        value={mode}
        onChange={onChange}
        options={[
          { value: "photo", label: t("mode.photo", lang) },
          { value: "video", label: t("mode.video", lang) },
        ]}
      />
    </Card>
  );
}

export function EngineSelector({
  lang,
  mode,
  engine,
  onChange,
}: {
  lang: Lang;
  mode: Mode;
  engine: EngineId;
  onChange: (e: EngineId) => void;
}) {
  if (mode === "photo") {
    return (
      <Card className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <Camera aria-hidden="true" className="h-4.5 w-4.5" />
          </span>
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-muted-foreground">
              {t("engine.pick", lang)}
            </span>
            <span className="text-[15px] font-semibold text-card-foreground">
              Nano Banana Pro
            </span>
            <span className="text-[13px] text-muted-foreground">
              {lang === "ru" ? "Фото · базовый кадр" : "Photo · base frame"}
            </span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-3">
      <h2 className="text-[15px] font-semibold text-card-foreground">
        {t("engine.pick", lang)}
      </h2>
      <p className="text-center text-[13px] leading-relaxed text-muted-foreground text-pretty">
        {t("engine.conveyor", lang)}
      </p>
      <div
        role="radiogroup"
        aria-label={t("engine.pick", lang)}
        className="grid grid-cols-2 gap-2"
      >
        {VIDEO_ENGINES.map((e) => {
          const Icon = ENGINE_ICONS[e.id] || Clapperboard;
          const active = engine === e.id;
          return (
            <button
              key={e.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(e.id)}
              className={cn(
                "flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-ring",
                active
                  ? "border-primary bg-accent"
                  : "border-border bg-card hover:border-input",
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="text-[13px] font-semibold text-card-foreground">
                {e.name}
              </span>
              <span className="text-[13px] leading-snug text-muted-foreground">
                {e.role[lang]}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
