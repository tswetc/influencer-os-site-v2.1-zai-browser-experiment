"use client";

// FP23: the studio header, extracted from the page monolith. Title plus one
// gear; the dot nudges when the API key is missing or a backup is due.

import { Settings2 } from "lucide-react";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

export function AppHeader({
  lang,
  showDot,
  onOpenSettings,
}: {
  lang: Lang;
  showDot: boolean;
  onOpenSettings: () => void;
}) {
  return (
    <header className="flex items-center justify-between gap-3">
      <h1 className="text-xl font-bold tracking-tight text-foreground">
        {t("app.title", lang)}
      </h1>
      <button
        type="button"
        data-tour="tour-key"
        aria-label={t("settings.open", lang)}
        onClick={onOpenSettings}
        className="relative rounded-md border border-border bg-card p-2 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
      >
        <Settings2 aria-hidden="true" className="h-4 w-4" />
        {showDot ? (
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
          />
        ) : null}
      </button>
    </header>
  );
}
