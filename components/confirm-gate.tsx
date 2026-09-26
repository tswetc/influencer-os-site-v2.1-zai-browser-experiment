"use client";

import { CheckCheck, RotateCcw, ScanSearch } from "lucide-react";
import { Card, Field, Tag, inputCls, inputWarnCls } from "@/components/ui-bits";
import { t } from "@/lib/i18n";
import { LOW_CONFIDENCE } from "@/lib/scene";
import type { Lang, SceneSpec } from "@/lib/types";

const FIELDS: (keyof Pick<
  SceneSpec,
  "location" | "lighting" | "camera" | "pose" | "outfit" | "mood"
>)[] = ["location", "lighting", "camera", "pose", "outfit", "mood"];

/**
 * Phase 3: the trust gate. Editable Scene Spec fields with low-confidence
 * highlighting. Generate stays locked until Accept all is pressed.
 */
export function ConfirmGate({
  lang,
  spec,
  confirmed,
  onSpecChange,
  onAcceptAll,
  onReset,
  onReanalyze,
  canReanalyze,
  locationConflict,
}: {
  lang: Lang;
  spec: SceneSpec;
  confirmed: boolean;
  onSpecChange: (s: SceneSpec) => void;
  onAcceptAll: () => void;
  onReset: () => void;
  onReanalyze: () => void;
  canReanalyze: boolean;
  locationConflict?: { textLocation: string; refLocation: string } | null;
}) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-[15px] font-semibold text-card-foreground">
          {t("confirm.title", lang)}
        </h2>
        {confirmed ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-[13px] font-semibold text-success">
            <CheckCheck aria-hidden="true" className="h-3.5 w-3.5" />
            {t("confirm.confirmed", lang)}
          </span>
        ) : null}
      </div>
      <p className="text-[13px] leading-relaxed text-muted-foreground">
        {t("confirm.hint", lang)}
      </p>
      {/* Fix Pack 9 - C2: scene-field text outranks the scene reference */}
      {locationConflict ? (
        <div className="flex flex-wrap items-center gap-2 rounded-md bg-warning/10 px-3 py-2">
          <Tag tone="warn">{t("conflict.location", lang)}</Tag>
          <span className="text-[13px] font-medium text-warning">
            {t("conflict.locationHint", lang)} «{locationConflict.refLocation}»
          </span>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {FIELDS.map((f) => {
          const low =
            (spec.confidence[f] ?? 1) < LOW_CONFIDENCE && spec[f] !== "";
          return (
            <Field
              key={f}
              label={t(`field.${f}`, lang)}
              warn={low}
              warnLabel={t("confirm.check", lang)}
            >
              <input
                type="text"
                value={spec[f]}
                onChange={(e) =>
                  onSpecChange({
                    ...spec,
                    [f]: e.target.value,
                    confidence: { ...spec.confidence, [f]: 1 },
                  })
                }
                className={low ? inputWarnCls : inputCls}
              />
            </Field>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onAcceptAll}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <CheckCheck aria-hidden="true" className="h-4 w-4" />
          {t("confirm.acceptAll", lang)}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
        >
          <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
          {t("confirm.reset", lang)}
        </button>
        {canReanalyze ? (
          <button
            type="button"
            onClick={onReanalyze}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ScanSearch aria-hidden="true" className="h-3.5 w-3.5" />
            {t("confirm.reanalyze", lang)}
          </button>
        ) : null}
      </div>
    </Card>
  );
}
