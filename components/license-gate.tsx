"use client";

// Fix Pack 7 — license gate; restyled in Fix Pack 8 to the Apple-light
// design system (E3), matching the studio and the landing.
// Fix Pack 20 — every launch runs a cheap server-side token check
// (lib/license.ts, hmac-v2), so a cache forged from the console locks on
// the next start; legacy pre-1.20 caches migrate through one reverify(). Wraps the studio:
// shows the activation screen until a valid (or grace-cached) license is
// present. Local data is never touched by the gate — after activation the
// user sees everything as it was.

import { type ReactNode, useEffect, useState } from "react";
import { detectLang, t } from "@/lib/i18n";
import type { Lang } from "@/lib/types";
import { loadSettings } from "@/lib/storage";
import {
  GUMROAD_URL,
  activate,
  checkToken,
  clearLicense,
  needsRecheck,
  readLicense,
  reverify,
  withinGrace,
} from "@/lib/license";

type GateStatus = "checking" | "locked" | "open";

export function LicenseGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<GateStatus>("checking");
  const [lang, setLang] = useState<Lang>("en");
  const [key, setKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedLang = loadSettings().language;
    const resolvedLang = savedLang === "ru" || savedLang === "en" ? savedLang : detectLang();
    setLang(resolvedLang);
    document.documentElement.lang = resolvedLang;
    const st = readLicense();
    if (!st) {
      setStatus("locked");
      return;
    }
    if (st.token && withinGrace(st)) {
      // Unlock immediately; validate in the background. The HMAC token check
      // is cheap (no Gumroad round-trip) and runs on every launch — only a
      // definitive "forged token" answer locks; offline never does.
      setStatus("open");
      void checkToken(st).then((r) => {
        if (r === "invalid") {
          clearLicense();
          setStatus("locked");
        }
      });
      if (needsRecheck(st)) {
        void reverify(st).then((r) => {
          if (r === "invalid") setStatus("locked");
        });
      }
      return;
    }
    // Grace expired, or a legacy pre-1.20 cache without a token — one
    // successful server check is required (it also issues a fresh token).
    void reverify(st).then((r) => {
      setStatus(r === "valid" ? "open" : "locked");
    });
  }, []);

  async function onActivate() {
    const k = key.trim();
    if (!k || busy) return;
    setBusy(true);
    setError(null);
    const r = await activate(k);
    setBusy(false);
    if (r.status === "valid") {
      setStatus("open");
      return;
    }
    const msgKey =
      r.status === "invalid"
        ? "license.invalid"
        : r.status === "uses"
          ? "license.uses"
          : r.status === "rate"
            ? "license.rate"
            : "license.network";
    setError(t(msgKey, lang));
  }

  if (status === "open") return <>{children}</>;

  if (status === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-[13px] text-muted-foreground">
        {t("license.checking", lang)}
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)]">
        <h1 className="text-[20px] font-semibold text-card-foreground">
          {t("license.title", lang)}
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          {t("license.note", lang)}
        </p>
        <label htmlFor="license-key" className="sr-only">
          {t("license.placeholder", lang)}
        </label>
        <input
          id="license-key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void onActivate();
          }}
          placeholder={t("license.placeholder", lang)}
          autoComplete="off"
          spellCheck={false}
          className="mt-4 min-h-[44px] w-full rounded-xl border border-input bg-background px-4 text-[15px] text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-ring"
        />
        {error ? (
          <p className="mt-2 text-[13px] text-destructive">{error}</p>
        ) : null}
        <button
          type="button"
          onClick={() => void onActivate()}
          disabled={busy || key.trim().length === 0}
          className="mt-4 min-h-[44px] w-full rounded-xl bg-primary px-4 text-[15px] font-semibold text-primary-foreground transition-opacity duration-200 hover:opacity-90 disabled:opacity-40"
        >
          {busy ? "…" : t("license.activate", lang)}
        </button>
        <a
          href={GUMROAD_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-4 block text-center text-[13px] text-muted-foreground underline underline-offset-4 transition-colors duration-200 hover:text-foreground"
        >
          {t("license.buy", lang)}
        </a>
        <p className="mt-2 text-center text-[12px] text-muted-foreground">
          {t("license.refund", lang)}
        </p>
      </div>
    </main>
  );
}
