"use client";

import { Download, Trash2, Upload, UserRound } from "lucide-react";
import { useRef, useState } from "react";
import {
  Chip,
  Disclosure,
  Field,
  Segmented,
  inputCls,
} from "@/components/ui-bits";
import { DEV } from "@/lib/engines";
import { t } from "@/lib/i18n";
import { validatePassport } from "@/lib/storage";
import { uuid } from "@/lib/scene";
import type {
  CharacterPassport,
  IdentityLevel,
  Lang,
  PassportVersion,
} from "@/lib/types";

const ANOMALY_KEYS = [
  "moles",
  "freckles",
  "asymmetry",
  "scar",
  "heterochromia",
  "uneven_teeth",
  "skin_texture",
];

export function emptyPassport(): CharacterPassport {
  const now = new Date().toISOString();
  return {
    schemaVersion: 1,
    id: uuid(),
    name: "",
    createdAt: now,
    updatedAt: now,
    identity: { full: "", mid: "", micro: "same as reference (photo 1)" },
    device: DEV,
    anomalyLock: { checkboxes: [], freeText: "", json: {} },
    faceAdherence: { static: 0.8, motion: 0.6 },
    referencePhotos: [],
    visionSummary: "",
  };
}

export function PassportEditor({
  lang,
  passport,
  characters,
  identityLevel,
  onIdentityLevelChange,
  onPassportChange,
  onSelectCharacter,
  onSaveToLibrary,
  onDeleteCharacter,
  versions,
  onRestoreVersion,
}: {
  lang: Lang;
  passport: CharacterPassport;
  characters: CharacterPassport[];
  identityLevel: IdentityLevel;
  onIdentityLevelChange: (l: IdentityLevel) => void;
  onPassportChange: (p: CharacterPassport) => void;
  onSelectCharacter: (id: string | null) => void;
  onSaveToLibrary: () => void;
  onDeleteCharacter: (id: string) => void;
  versions: PassportVersion[];
  onRestoreVersion: (v: PassportVersion) => void;
}) {
  const importRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(false);
  const [importInvalid, setImportInvalid] = useState(false);

  function update(patch: Partial<CharacterPassport>) {
    onPassportChange({
      ...passport,
      ...patch,
      updatedAt: new Date().toISOString(),
    });
  }

  function exportPassport() {
    const blob = new Blob([JSON.stringify(passport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${passport.name || "character"}-passport.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importPassport(file: File) {
    setImportInvalid(false);
    try {
      const raw = JSON.parse(await file.text());
      const valid = validatePassport(raw);
      if (!valid) {
        setImportInvalid(true);
        return;
      }
      onPassportChange(valid);
    } catch {
      setImportInvalid(true);
    }
  }

  const isInLibrary = characters.some((c) => c.id === passport.id);

  return (
    <Disclosure
      title={t("passport.title", lang)}
      badge={
        passport.name ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[12px] font-semibold text-accent-foreground">
            <UserRound aria-hidden="true" className="h-3 w-3" />
            {passport.name}
          </span>
        ) : null
      }
    >
      <div className="flex flex-col gap-4">
        {characters.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-muted-foreground">
              {t("passport.library", lang)}
            </span>
            <div className="flex flex-wrap gap-1.5">
              <Chip
                label={t("passport.none", lang)}
                checked={!isInLibrary}
                onChange={() => onSelectCharacter(null)}
              />
              {characters.map((c) => (
                <span key={c.id} className="inline-flex items-center gap-1">
                  <Chip
                    label={c.name || "unnamed"}
                    checked={passport.id === c.id}
                    onChange={() => onSelectCharacter(c.id)}
                  />
                  <button
                    type="button"
                    aria-label={`${t("passport.delete", lang)}: ${c.name}`}
                    onClick={() => onDeleteCharacter(c.id)}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-destructive focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <Field label={t("passport.name", lang)}>
          <input
            type="text"
            value={passport.name}
            onChange={(e) => update({ name: e.target.value })}
            className={inputCls}
          />
        </Field>

        <div className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-muted-foreground">
            {t("passport.identity", lang)}
          </span>
          <Segmented<IdentityLevel>
            label={t("passport.identity", lang)}
            value={identityLevel}
            onChange={onIdentityLevelChange}
            options={[
              { value: "full", label: t("passport.identity.full", lang) },
              { value: "mid", label: t("passport.identity.mid", lang) },
              { value: "micro", label: t("passport.identity.micro", lang) },
            ]}
          />
        </div>

        {identityLevel === "full" ? (
          <Field label="Identity (full)">
            <textarea
              rows={3}
              value={passport.identity.full}
              onChange={(e) =>
                update({
                  identity: { ...passport.identity, full: e.target.value },
                })
              }
              placeholder="24yo woman, oval face, hazel eyes, dark chestnut hair..."
              className={inputCls + " resize-y"}
            />
          </Field>
        ) : identityLevel === "mid" ? (
          <Field label="Identity (mid)">
            <input
              type="text"
              value={passport.identity.mid}
              onChange={(e) =>
                update({
                  identity: { ...passport.identity, mid: e.target.value },
                })
              }
              placeholder="24yo woman, hazel eyes, chestnut hair"
              className={inputCls}
            />
          </Field>
        ) : (
          <Field label="Identity (micro)">
            <input
              type="text"
              value={passport.identity.micro}
              onChange={(e) =>
                update({
                  identity: { ...passport.identity, micro: e.target.value },
                })
              }
              className={inputCls}
            />
          </Field>
        )}

        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-semibold text-card-foreground">
            {t("anomaly.title", lang)}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {ANOMALY_KEYS.map((k) => (
              <Chip
                key={k}
                label={t(`anomaly.${k}`, lang)}
                checked={passport.anomalyLock.checkboxes.includes(k)}
                onChange={(v) =>
                  update({
                    anomalyLock: {
                      ...passport.anomalyLock,
                      checkboxes: v
                        ? [...passport.anomalyLock.checkboxes, k]
                        : passport.anomalyLock.checkboxes.filter(
                            (x) => x !== k,
                          ),
                    },
                  })
                }
              />
            ))}
          </div>
          <Field label={t("passport.anomaly.freeText", lang)}>
            <input
              type="text"
              value={passport.anomalyLock.freeText}
              onChange={(e) =>
                update({
                  anomalyLock: {
                    ...passport.anomalyLock,
                    freeText: e.target.value,
                  },
                })
              }
              placeholder="small mole on left cheek, light freckles across nose"
              className={inputCls}
            />
          </Field>
        </div>

        <Field label={t("passport.device", lang)}>
          <input
            type="text"
            value={passport.device}
            onChange={(e) => update({ device: e.target.value })}
            className={inputCls}
          />
        </Field>

        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-medium text-muted-foreground">
            {t("passport.faceAdherence", lang)}
          </span>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-[13px] text-muted-foreground">
                {t("passport.static", lang)}:{" "}
                {passport.faceAdherence.static.toFixed(1)}
              </span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={passport.faceAdherence.static}
                onChange={(e) =>
                  update({
                    faceAdherence: {
                      ...passport.faceAdherence,
                      static: Number(e.target.value),
                    },
                  })
                }
                className="accent-primary"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[13px] text-muted-foreground">
                {t("passport.motion", lang)}:{" "}
                {passport.faceAdherence.motion.toFixed(1)}
              </span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={passport.faceAdherence.motion}
                onChange={(e) =>
                  update({
                    faceAdherence: {
                      ...passport.faceAdherence,
                      motion: Number(e.target.value),
                    },
                  })
                }
                className="accent-primary"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onSaveToLibrary();
              setSaved(true);
              setTimeout(() => setSaved(false), 1500);
            }}
            className="rounded-md bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring"
          >
            {saved ? t("passport.saved", lang) : t("passport.save", lang)}
          </button>
          <button
            type="button"
            onClick={exportPassport}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
          >
            <Download aria-hidden="true" className="h-3.5 w-3.5" />
            {t("passport.export", lang)}
          </button>
          <button
            type="button"
            onClick={() => importRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
          >
            <Upload aria-hidden="true" className="h-3.5 w-3.5" />
            {t("passport.import", lang)}
          </button>
          <input
            ref={importRef}
            type="file"
            accept="application/json"
            className="sr-only"
            aria-label={t("passport.import", lang)}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importPassport(f);
              e.target.value = "";
            }}
          />
          {importInvalid ? (
            <span
              role="alert"
              className="text-[13px] font-medium text-destructive"
            >
              {t("import.invalid", lang)}
            </span>
          ) : null}
        </div>

        {versions.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-muted-foreground">
              {t("passport.versions", lang)}
            </span>
            <ul className="flex flex-col gap-1">
              {versions.map((v) => (
                <li
                  key={v.id}
                  className="flex items-center justify-between gap-2 rounded-md border border-border bg-card px-3 py-1.5"
                >
                  <span className="truncate text-[13px] text-card-foreground">
                    {v.name} ·{" "}
                    {new Date(v.savedAt).toLocaleString(
                      lang === "ru" ? "ru-RU" : "en-US",
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRestoreVersion(v)}
                    className="shrink-0 text-[13px] font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    {t("passport.versions.restore", lang)}
                  </button>
                </li>
              ))}
            </ul>
            <span className="text-[12px] text-muted-foreground">
              {t("passport.versions.hint", lang)}
            </span>
          </div>
        ) : null}
      </div>
    </Disclosure>
  );
}
