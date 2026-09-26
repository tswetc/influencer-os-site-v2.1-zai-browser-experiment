"use client";

import { Chip, Disclosure } from "@/components/ui-bits";
import {
  captureLabel,
  exposureLabel,
  filmLabel,
  imperfectionLabel,
  opticsLabel,
} from "@/lib/display-labels";
import { CAP, EXPO, FILM, IMPERF, OPT } from "@/lib/engines";
import { t } from "@/lib/i18n";
import type { CaptureSelection, Lang } from "@/lib/types";

function Group({
  title,
  keys,
  isChecked,
  onToggle,
  labelFor,
}: {
  title: string;
  keys: string[];
  isChecked: (k: string) => boolean;
  onToggle: (k: string) => void;
  labelFor: (k: string) => string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[13px] font-semibold text-muted-foreground">
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {keys.map((k) => (
          <Chip
            key={k}
            label={labelFor(k)}
            checked={isChecked(k)}
            onChange={() => onToggle(k)}
          />
        ))}
      </div>
    </div>
  );
}

export function CapturePresets({
  lang,
  capture,
  onChange,
}: {
  lang: Lang;
  capture: CaptureSelection;
  onChange: (c: CaptureSelection) => void;
}) {
  const count =
    (capture.cap ? 1 : 0) +
    (capture.opt ? 1 : 0) +
    capture.expo.length +
    capture.imperf.length +
    (capture.film ? 1 : 0);

  return (
    <Disclosure
      title={t("capture.title", lang)}
      badge={
        count > 0 ? (
          <span className="rounded-full bg-accent px-2 py-0.5 text-[12px] font-semibold text-accent-foreground">
            {count}
          </span>
        ) : null
      }
    >
      <div className="flex flex-col gap-4">
        <Group
          title={t("capture.cap", lang)}
          keys={Object.keys(CAP)}
          isChecked={(k) => capture.cap === k}
          labelFor={captureLabel}
          onToggle={(k) =>
            onChange({ ...capture, cap: capture.cap === k ? "" : k })
          }
        />
        <Group
          title={t("capture.opt", lang)}
          keys={Object.keys(OPT)}
          isChecked={(k) => capture.opt === k}
          labelFor={opticsLabel}
          onToggle={(k) =>
            onChange({ ...capture, opt: capture.opt === k ? "" : k })
          }
        />
        <Group
          title={t("capture.expo", lang)}
          keys={Object.keys(EXPO)}
          isChecked={(k) => capture.expo.includes(k)}
          labelFor={exposureLabel}
          onToggle={(k) =>
            onChange({
              ...capture,
              expo: capture.expo.includes(k)
                ? capture.expo.filter((x) => x !== k)
                : [...capture.expo, k],
            })
          }
        />
        <Group
          title={t("capture.imperf", lang)}
          keys={Object.keys(IMPERF)}
          isChecked={(k) => capture.imperf.includes(k)}
          labelFor={imperfectionLabel}
          onToggle={(k) =>
            onChange({
              ...capture,
              imperf: capture.imperf.includes(k)
                ? capture.imperf.filter((x) => x !== k)
                : [...capture.imperf, k],
            })
          }
        />
        <Group
          title={t("capture.film", lang)}
          keys={Object.keys(FILM)}
          isChecked={(k) => capture.film === k}
          labelFor={filmLabel}
          onToggle={(k) =>
            onChange({ ...capture, film: capture.film === k ? "" : k })
          }
        />
      </div>
    </Disclosure>
  );
}
