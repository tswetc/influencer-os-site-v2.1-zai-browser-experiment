"use client";

// FP23: the settings overlay, extracted from the page monolith. Hosts the
// FP22 appearance card (language / theme / hints / shortcuts) plus API key,
// backup, self-check, canon updates, outcome stats and What's New.

import { AlertTriangle, Download, Upload, X } from "lucide-react";
import { useRef } from "react";
import { CanonUpdates } from "@/components/canon-updates";
import { KeyCard } from "@/components/key-card";
import { SelfCheck } from "@/components/self-check";
import { Card, Chip, Segmented } from "@/components/ui-bits";
import { APP_VERSION, CHANGELOG } from "@/lib/changelog";
import { engineLabel } from "@/lib/display-labels";
import { t } from "@/lib/i18n";
import { providerSwitchPatch } from "@/lib/provider-settings";
import type { Lang, Settings } from "@/lib/types";

export function SettingsOverlay({
  lang,
  onChangeLang,
  settings,
  onUpdateSettings,
  hintsEnabled,
  onHintsChange,
  onShowHotkeys,
  backupIsDue,
  onExport,
  onImportFile,
  importInvalid,
  stats,
  onClose,
}: {
  lang: Lang;
  onChangeLang: (l: Lang) => void;
  settings: Settings;
  onUpdateSettings: (patch: Partial<Settings>) => void;
  hintsEnabled: boolean;
  onHintsChange: (v: boolean) => void;
  onShowHotkeys: () => void;
  backupIsDue: boolean;
  onExport: () => void;
  onImportFile: (file: File) => void;
  importInvalid: boolean;
  stats: {
    rated: number;
    hits: number;
    byEngine: Record<string, { rated: number; hits: number }>;
  };
  onClose: () => void;
}) {
  const importRef = useRef<HTMLInputElement>(null);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("settings.title", lang)}
      className="fixed inset-0 z-50 overflow-y-auto bg-background p-4"
    >
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-4 pb-10">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[20px] font-bold text-foreground">
            {t("settings.title", lang)}
          </h2>
          <button
            type="button"
            aria-label={t("settings.close", lang)}
            onClick={onClose}
            className="rounded-md border border-border bg-card p-2 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
        {/* FP22: appearance - language, theme, hints and shortcuts in one card */}
        <Card className="flex flex-col gap-3">
          <h3 className="text-[15px] font-semibold text-card-foreground">
            {t("settings.appearance", lang)}
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-medium text-muted-foreground">
                {t("settings.language", lang)}
              </span>
              <Segmented<Lang>
                size="sm"
                label={t("settings.language", lang)}
                value={lang}
                onChange={onChangeLang}
                options={[
                  { value: "ru", label: "RU" },
                  { value: "en", label: "EN" },
                ]}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-medium text-muted-foreground">
                {t("theme.label", lang)}
              </span>
              <Segmented<Settings["theme"]>
                size="sm"
                label={t("theme.label", lang)}
                value={settings.theme}
                onChange={(th) => onUpdateSettings({ theme: th })}
                options={[
                  { value: "light", label: t("theme.light", lang) },
                  { value: "dark", label: t("theme.dark", lang) },
                  { value: "contrast", label: t("theme.contrast", lang) },
                ]}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip
              label={t("hints.label", lang)}
              checked={hintsEnabled}
              onChange={onHintsChange}
            />
            <button
              type="button"
              onClick={onShowHotkeys}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
            >
              {t("hk.title", lang)}
              <kbd className="rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-[12px] text-card-foreground">
                ?
              </kbd>
            </button>
          </div>
        </Card>
        <KeyCard
          lang={lang}
          apiKey={settings.apiKey}
          provider={settings.provider}
          onSave={(key) => onUpdateSettings({ apiKey: key })}
          onClear={() => onUpdateSettings({ apiKey: "" })}
          onProviderChange={(p) => {
            const patch = providerSwitchPatch(settings.provider, p);
            if (patch) onUpdateSettings(patch);
          }}
          model={settings.model}
          customEndpoint={settings.customEndpoint}
          onModelChange={(m) => onUpdateSettings({ model: m })}
          onEndpointChange={(v) => onUpdateSettings({ customEndpoint: v })}
        />
        {backupIsDue ? (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-xl bg-warning/10 px-3 py-2.5 text-[13px] font-medium text-warning"
          >
            <AlertTriangle aria-hidden="true" className="h-4 w-4 shrink-0" />
            {t("backup.due", lang)}
          </div>
        ) : null}
        <Card className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onExport}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
          >
            <Download aria-hidden="true" className="h-3.5 w-3.5" />
            {t("backup.export", lang)}
          </button>
          <button
            type="button"
            onClick={() => importRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
          >
            <Upload aria-hidden="true" className="h-3.5 w-3.5" />
            {t("backup.import", lang)}
          </button>
          <input
            ref={importRef}
            type="file"
            accept="application/json"
            className="sr-only"
            aria-label={t("backup.import", lang)}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onImportFile(f);
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
        </Card>
        <SelfCheck lang={lang} />
        <CanonUpdates lang={lang} />
        {stats.rated > 0 ? (
          <Card className="flex flex-col gap-2">
            <h3 className="text-[15px] font-semibold text-card-foreground">
              {t("journal.stats", lang)}
            </h3>
            <p className="text-[13px] text-muted-foreground">
              {Math.round((stats.hits / stats.rated) * 100)}%{" "}
              {t("journal.rate", lang)} · {stats.rated}{" "}
              {t("journal.rated", lang)}
            </p>
            <ul className="flex flex-col gap-1 text-[13px] text-muted-foreground">
              {Object.entries(stats.byEngine).map(
                ([eng, s]: [string, { rated: number; hits: number }]) => (
                  <li key={eng}>
                    {engineLabel(eng)}: {Math.round((s.hits / s.rated) * 100)}% ({s.hits}/
                    {s.rated})
                  </li>
                ),
              )}
            </ul>
          </Card>
        ) : null}
        <Card className="flex flex-col gap-2">
          <h3 className="text-[15px] font-semibold text-card-foreground">
            {t("whatsnew.title", lang)} · v{APP_VERSION}
          </h3>
          <div className="flex flex-col gap-3">
            {CHANGELOG.map((c) => (
              <div key={c.version} className="flex flex-col gap-1">
                <span className="text-[13px] font-semibold text-card-foreground">
                  v{c.version}
                </span>
                <ul className="flex flex-col gap-1 pl-4 text-[13px] text-muted-foreground">
                  {(lang === "ru" ? c.ru : c.en).map((line, i) => (
                    <li key={i} className="list-disc">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-muted-foreground">
            {t("hotkeys.hint", lang)}
          </p>
        </Card>
      </div>
    </div>
  );
}
