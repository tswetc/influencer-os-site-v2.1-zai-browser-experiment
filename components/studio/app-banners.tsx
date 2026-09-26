"use client";

// FP23: the single banner slot + the silent draft-restore toast, extracted
// from the page monolith. The storage warning outranks the no-key notice;
// the toast offers one-tap undo instead of a blocking question banner.

import { AlertTriangle, Info, X } from "lucide-react";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

export function AppBanners({
  lang,
  storageWarn,
  onDismissStorage,
  hasKey,
  onOpenSettings,
  restoredDraft,
  onUndoRestore,
}: {
  lang: Lang;
  storageWarn: boolean;
  onDismissStorage: () => void;
  hasKey: boolean;
  onOpenSettings: () => void;
  restoredDraft: boolean;
  onUndoRestore: () => void;
}) {
  return (
    <>
      {storageWarn ? (
        <div
          role="alert"
          className="flex items-center justify-between gap-2 rounded-xl bg-warning/10 px-3 py-2.5"
        >
          <span className="flex items-center gap-2 text-[13px] font-medium text-warning">
            <AlertTriangle aria-hidden="true" className="h-4 w-4 shrink-0" />
            {t("storage.warning", lang)}
          </span>
          <button
            type="button"
            aria-label={t("restore.dismiss", lang)}
            onClick={onDismissStorage}
            className="text-warning hover:opacity-70 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      ) : !hasKey ? (
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex items-center gap-2 rounded-xl bg-accent px-3 py-2.5 text-left text-[13px] font-medium text-accent-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Info aria-hidden="true" className="h-4 w-4 shrink-0" />
          {t("banner.nokey", lang)}
        </button>
      ) : null}

      {restoredDraft ? (
        <div
          role="status"
          className="fixed inset-x-0 bottom-20 z-40 flex justify-center px-4"
        >
          <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <span className="text-[13px] text-muted-foreground">
              {t("draft.restored", lang)}
            </span>
            <button
              type="button"
              onClick={onUndoRestore}
              className="text-[13px] font-semibold text-primary hover:opacity-80 focus-visible:outline-2 focus-visible:outline-ring"
            >
              {t("draft.undo", lang)}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
