"use client";

// Fix Pack 14 — reads the remote canon manifest and shows what's new. Hidden
// entirely until NEXT_PUBLIC_CANON_MANIFEST_URL is set, so nothing changes for
// the default build. Read-only: it never mutates local data.

import { RefreshCw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import {
  type CanonManifest,
  fetchManifest,
  manifestUrl,
  markManifestSeen,
} from "@/lib/manifest";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

export function CanonUpdates({ lang }: { lang: Lang }) {
  const [manifest, setManifest] = useState<CanonManifest | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [hasUpdate, setHasUpdate] = useState(false);

  const load = async () => {
    setState("loading");
    const res = await fetchManifest();
    if (res.ok && res.manifest) {
      setManifest(res.manifest);
      setHasUpdate(Boolean(res.hasUpdate));
      setState("idle");
    } else {
      setState("error");
    }
  };

  useEffect(() => {
    if (manifestUrl()) void load();
  }, []);

  if (!manifestUrl()) return null;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-card-foreground">
          <Sparkles aria-hidden="true" className="h-4 w-4" />
          {t("canonupd.title", lang)}
        </span>
        <button
          type="button"
          onClick={() => void load()}
          className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1.5 text-[13px] font-medium text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
        >
          <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
          {t("canonupd.check", lang)}
        </button>
      </div>
      {state === "loading" ? (
        <p className="text-[13px] text-muted-foreground">
          {t("canonupd.loading", lang)}
        </p>
      ) : null}
      {state === "error" ? (
        <p className="text-[13px] text-muted-foreground">
          {t("canonupd.error", lang)}
        </p>
      ) : null}
      {manifest ? (
        <div className="flex flex-col gap-1.5">
          <p className="text-[13px] text-muted-foreground">
            {manifest.title || t("canonupd.title", lang)} · v{manifest.version}
            {hasUpdate ? (
              <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[12px] font-medium text-accent-foreground">
                {t("canonupd.new", lang)}
              </span>
            ) : null}
          </p>
          {manifest.notes.length > 0 ? (
            <ul className="flex flex-col gap-1 pl-4">
              {manifest.notes.slice(0, 6).map((n, i) => (
                <li
                  key={i}
                  className="list-disc text-[13px] text-muted-foreground"
                >
                  {n}
                </li>
              ))}
            </ul>
          ) : null}
          {hasUpdate ? (
            <button
              type="button"
              onClick={() => {
                markManifestSeen(manifest.version);
                setHasUpdate(false);
              }}
              className="w-fit rounded-md bg-secondary px-2.5 py-1.5 text-[13px] font-medium text-secondary-foreground hover:bg-border focus-visible:outline-2 focus-visible:outline-ring"
            >
              {t("canonupd.markseen", lang)}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
