"use client";

import { CheckCircle2, KeyRound, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Disclosure, Segmented, Tag, inputCls } from "@/components/ui-bits";
import { providerLabel } from "@/lib/display-labels";
import { t } from "@/lib/i18n";
import type { Lang, VisionProvider } from "@/lib/types";
import { OPENROUTER_FREE_MODELS, testConnection } from "@/lib/vision";

const KEY_LINKS: Partial<Record<VisionProvider, string>> = {
  anthropic: "https://console.anthropic.com/settings/keys",
  openai: "https://platform.openai.com/api-keys",
  gemini: "https://aistudio.google.com/apikey",
  openrouter: "https://openrouter.ai/settings/keys",
};

export function KeyCard({
  lang,
  apiKey,
  provider,
  model,
  customEndpoint,
  onSave,
  onClear,
  onProviderChange,
  onModelChange,
  onEndpointChange,
}: {
  lang: Lang;
  apiKey: string;
  provider: VisionProvider;
  model: string;
  customEndpoint: string;
  onSave: (key: string) => void;
  onClear: () => void;
  onProviderChange: (p: VisionProvider) => void;
  onModelChange: (m: string) => void;
  onEndpointChange: (e: string) => void;
}) {
  const [draft, setDraft] = useState(apiKey);
  const [status, setStatus] = useState<
    "idle" | "testing" | "valid" | "textonly" | "invalid"
  >("idle");

  // Sync only when persisted provider/key changes externally (provider switch,
  // backup import, clear). Ordinary typing only changes `draft`, so it is not
  // overwritten by this effect.
  useEffect(() => {
    setDraft(apiKey);
    setStatus("idle");
  }, [apiKey, provider]);

  async function handleTest() {
    if (!draft.trim() || status === "testing") return;
    setStatus("testing");
    const res = await testConnection({
      provider,
      apiKey: draft.trim(),
      model,
      customEndpoint,
    });
    setStatus(res.text ? (res.vision ? "valid" : "textonly") : "invalid");
  }

  const link = KEY_LINKS[provider];

  return (
    <Disclosure
      title={t("key.title", lang)}
      subtitle={t("key.optional", lang)}
      badge={
        apiKey ? (
          <Tag>
            <KeyRound aria-hidden="true" className="mr-1 h-3 w-3" />
            {providerLabel(provider, lang)}
          </Tag>
        ) : null
      }
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-muted-foreground">
            {t("key.provider", lang)}
          </span>
          <Segmented
            label={t("key.provider", lang)}
            size="sm"
            value={provider}
            onChange={(p) => {
              onProviderChange(p);
              setStatus("idle");
            }}
            options={[
              { value: "anthropic", label: "Anthropic" },
              { value: "openai", label: "OpenAI" },
              { value: "gemini", label: "Gemini" },
              { value: "openrouter", label: "OpenRouter" },
              { value: "custom", label: t("key.custom", lang) },
            ]}
          />
        </div>
        {provider === "custom" ? (
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-muted-foreground">
              {t("key.endpoint", lang)}
            </span>
            <input
              type="text"
              value={customEndpoint}
              onChange={(e) => {
                onEndpointChange(e.target.value);
                setStatus("idle");
              }}
              placeholder="https://api.groq.com/openai/v1"
              autoComplete="off"
              spellCheck={false}
              className={inputCls}
            />
          </label>
        ) : null}
        {provider === "openrouter" || provider === "custom" ? (
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-muted-foreground">
              {t("key.model", lang)}
            </span>
            <input
              type="text"
              list={provider === "openrouter" ? "openrouter-models" : undefined}
              value={model}
              onChange={(e) => {
                onModelChange(e.target.value);
                setStatus("idle");
              }}
              placeholder={
                provider === "openrouter" ? OPENROUTER_FREE_MODELS[0] : ""
              }
              autoComplete="off"
              spellCheck={false}
              className={inputCls}
            />
            {provider === "openrouter" ? (
              <>
                <datalist id="openrouter-models">
                  {OPENROUTER_FREE_MODELS.map((m) => (
                    <option key={m} value={m} />
                  ))}
                </datalist>
                <span className="text-[13px] text-muted-foreground">
                  {t("key.modelHint", lang)}
                </span>
              </>
            ) : null}
          </label>
        ) : null}
        <input
          type="password"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setStatus("idle");
          }}
          placeholder={t("key.placeholder", lang)}
          aria-label={t("key.title", lang)}
          autoComplete="off"
          className={inputCls}
        />
        {/* Fix Pack 20 (v0 audit item 2): be explicit about where the key
            lives and how to cap the blast radius if this browser is ever
            compromised. */}
        <p className="rounded-md bg-warning/10 px-3 py-2 text-[12px] leading-relaxed text-warning">
          {t("key.warn", lang)}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onSave(draft.trim())}
            disabled={!draft.trim()}
            className="rounded-md bg-primary px-3 py-1.5 text-[13px] font-medium text-primary-foreground disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-ring"
          >
            {t("key.save", lang)}
          </button>
          <button
            type="button"
            onClick={handleTest}
            disabled={!draft.trim() || status === "testing"}
            className="rounded-md border border-border bg-card px-3 py-1.5 text-[13px] font-medium text-card-foreground hover:bg-muted disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-ring"
          >
            {status === "testing"
              ? t("key.testing", lang)
              : t("key.test", lang)}
          </button>
          {apiKey ? (
            <button
              type="button"
              onClick={() => {
                setDraft("");
                setStatus("idle");
                onClear();
              }}
              className="rounded-md border border-border bg-card px-3 py-1.5 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
            >
              {t("key.clear", lang)}
            </button>
          ) : null}
        </div>
        {status === "valid" ? (
          <p className="inline-flex items-center gap-1.5 text-[13px] font-medium text-success">
            <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
            {t("key.valid", lang)}
          </p>
        ) : null}
        {status === "textonly" ? (
          <p className="inline-flex items-center gap-1.5 text-[13px] font-medium text-warning">
            <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
            {t("key.textOnly", lang)}
          </p>
        ) : null}
        {status === "invalid" ? (
          <p className="inline-flex items-center gap-1.5 text-[13px] font-medium text-destructive">
            <XCircle aria-hidden="true" className="h-4 w-4" />
            {t("key.invalid", lang)}
          </p>
        ) : null}
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium text-primary hover:underline"
          >
            {t("key.where", lang)}
          </a>
        ) : null}
      </div>
    </Disclosure>
  );
}
