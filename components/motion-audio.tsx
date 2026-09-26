"use client";

import { Card, Field, inputCls } from "@/components/ui-bits";
import { personWordIn } from "@/lib/hints";
import { t } from "@/lib/i18n";
import type { EngineId, Lang, SceneSpec } from "@/lib/types";

/** Motion + audio inputs, shown only in Video mode. Intensity only for Kling. */
export function MotionAudio({
  lang,
  engine,
  spec,
  onChange,
}: {
  lang: Lang;
  engine: EngineId;
  spec: SceneSpec;
  onChange: (s: SceneSpec) => void;
}) {
  // Kling 3.0 has native audio (Voice Binding) — dialogue is allowed there too.
  const showDialogue = engine === "veo_scene" || engine === "kling_3";
  const showIntensity = engine === "kling_3";

  return (
    <Card className="flex flex-col gap-3">
      <h2 className="text-[15px] font-semibold text-card-foreground">
        {t("motion.title", lang)}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field
          label={t("field.action", lang)}
          warn={
            engine === "veo_broll" && personWordIn(spec.motion.action) !== null
          }
          warnLabel={t("hint.brollPeople", lang)}
        >
          <input
            type="text"
            value={spec.motion.action}
            onChange={(e) =>
              onChange({
                ...spec,
                motion: { ...spec.motion, action: e.target.value },
              })
            }
            placeholder="slowly turns head toward window and smiles"
            className={inputCls}
          />
        </Field>
        <Field label={t("field.cameraMove", lang)}>
          <input
            type="text"
            value={spec.motion.cameraMove}
            onChange={(e) =>
              onChange({
                ...spec,
                motion: { ...spec.motion, cameraMove: e.target.value },
              })
            }
            placeholder="camera static on tripod"
            className={inputCls}
          />
        </Field>
        {showIntensity ? (
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-[13px] font-medium text-muted-foreground">
              {t("field.intensity", lang)}: {spec.motion.intensity.toFixed(1)}
            </span>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.1}
              value={spec.motion.intensity}
              onChange={(e) =>
                onChange({
                  ...spec,
                  motion: { ...spec.motion, intensity: Number(e.target.value) },
                })
              }
              className="accent-primary"
            />
          </label>
        ) : null}
        {showDialogue ? (
          <Field label={t("field.dialogue", lang)}>
            <input
              type="text"
              value={spec.audio.dialogue}
              onChange={(e) =>
                onChange({
                  ...spec,
                  audio: { ...spec.audio, dialogue: e.target.value },
                })
              }
              placeholder="I could stay here all morning"
              className={inputCls}
            />
          </Field>
        ) : null}
        <Field label={t("field.ambience", lang)}>
          <input
            type="text"
            value={spec.audio.ambience}
            onChange={(e) =>
              onChange({
                ...spec,
                audio: { ...spec.audio, ambience: e.target.value },
              })
            }
            placeholder="quiet cafe ambience, soft chatter"
            className={inputCls}
          />
        </Field>
        {showDialogue ? (
          <Field label={t("field.sfx", lang)}>
            <input
              type="text"
              value={spec.audio.sfx}
              onChange={(e) =>
                onChange({
                  ...spec,
                  audio: { ...spec.audio, sfx: e.target.value },
                })
              }
              placeholder="cup placed on saucer"
              className={inputCls}
            />
          </Field>
        ) : null}
      </div>
    </Card>
  );
}
