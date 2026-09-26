"use client";

import { Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { Disclosure } from "@/components/ui-bits";
import { t } from "@/lib/i18n";
import {
  buildAssistantSystem,
  checkPromptEdit,
  parseAssistant,
} from "@/lib/llm";
import type { EngineId, Lang, Mode } from "@/lib/types";
import { chatLlm, type ChatMessage, type LlmConfig } from "@/lib/vision";

interface Entry {
  role: "user" | "assistant";
  text: string;
  imageDataUrl?: string;
  scene?: string;
  prompt?: string;
  warnings?: string[];
}

export function AssistantChat({
  lang,
  cfg,
  mode,
  engine,
  sceneText,
  prompt,
  photo,
  onApplyScene,
  onApplyPrompt,
}: {
  lang: Lang;
  cfg: LlmConfig;
  mode: Mode;
  engine: EngineId;
  sceneText: string;
  prompt: string | null;
  photo?: string;
  onApplyScene: (scene: string) => void;
  onApplyPrompt: (prompt: string) => void;
}) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [attach, setAttach] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    const userEntry: Entry = {
      role: "user",
      text,
      imageDataUrl: attach && photo ? photo : undefined,
    };
    const nextEntries = [...entries, userEntry];
    setEntries(nextEntries);
    setInput("");
    setAttach(false);
    setBusy(true);
    const system = buildAssistantSystem({
      mode,
      engine,
      sceneText,
      prompt,
      lang,
    });
    const msgs: ChatMessage[] = [
      { role: "system", text: system },
      ...nextEntries.slice(-9).map((e) => ({
        role: e.role,
        text: e.text,
        imageDataUrl: e.imageDataUrl,
      })),
    ];
    const res = await chatLlm(cfg, msgs, 600);
    if (!res.ok) {
      setEntries((cur) => [
        ...cur,
        { role: "assistant", text: t(`err.${res.error ?? "http"}`, lang) },
      ]);
      setBusy(false);
      return;
    }
    const parsed = parseAssistant(res.text);
    setEntries((cur) => [
      ...cur,
      {
        role: "assistant",
        text: parsed.reply || t("chat.suggestion", lang),
        scene: parsed.scene,
        prompt: parsed.prompt,
        warnings:
          parsed.prompt && prompt
            ? checkPromptEdit(prompt, parsed.prompt)
            : undefined,
      },
    ]);
    setBusy(false);
  }

  return (
    <Disclosure
      title={t("chat.title", lang)}
      subtitle={t("chat.subtitle", lang)}
    >
      <div className="flex flex-col gap-3">
        {entries.length === 0 ? (
          <p className="text-[13px] text-muted-foreground">
            {t("chat.empty", lang)}
          </p>
        ) : (
          <div className="flex max-h-72 flex-col gap-2 overflow-y-auto">
            {entries.map((e, i) => (
              <div
                key={i}
                className={
                  e.role === "user"
                    ? "max-w-[85%] self-end rounded-2xl bg-primary px-3 py-2 text-[13px] text-primary-foreground"
                    : "max-w-[85%] self-start rounded-2xl bg-secondary px-3 py-2 text-[13px] text-secondary-foreground"
                }
              >
                <p className="whitespace-pre-wrap">{e.text}</p>
                {e.scene ? (
                  <div className="mt-2 flex flex-col gap-1.5 rounded-xl bg-card p-2">
                    <p className="whitespace-pre-wrap text-[13px] text-card-foreground">
                      {e.scene}
                    </p>
                    <button
                      type="button"
                      onClick={() => onApplyScene(e.scene as string)}
                      className="w-fit rounded-full border border-border bg-card px-2.5 py-1 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      {t("chat.applyScene", lang)}
                    </button>
                  </div>
                ) : null}
                {e.prompt ? (
                  <div className="mt-2 flex flex-col gap-1.5 rounded-xl bg-card p-2">
                    <p className="whitespace-pre-wrap font-mono text-[13px] text-card-foreground">
                      {e.prompt}
                    </p>
                    {e.warnings && e.warnings.length > 0 ? (
                      <p className="text-[13px] font-medium text-warning">
                        {t("chat.warn", lang)} {e.warnings.join(", ")}
                      </p>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => onApplyPrompt(e.prompt as string)}
                      className="w-fit rounded-full border border-border bg-card px-2.5 py-1 text-[13px] font-medium text-card-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      {t("chat.applyPrompt", lang)}
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
            {busy ? (
              <p className="text-[13px] text-muted-foreground">
                {t("chat.thinking", lang)}
              </p>
            ) : null}
          </div>
        )}
        {attach && photo ? (
          <p className="text-[13px] text-muted-foreground">
            {t("chat.photoAttached", lang)}
          </p>
        ) : null}
        <div className="flex items-center gap-2">
          {photo ? (
            <button
              type="button"
              aria-label={t("chat.photo", lang)}
              aria-pressed={attach}
              onClick={() => setAttach((v) => !v)}
              className={
                (attach
                  ? "border-primary text-primary "
                  : "border-border text-muted-foreground ") +
                "rounded-full border bg-card p-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
              }
            >
              <Paperclip aria-hidden="true" className="h-4 w-4" />
            </button>
          ) : null}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            placeholder={t("chat.placeholder", lang)}
            aria-label={t("chat.title", lang)}
            className="min-w-0 flex-1 rounded-xl border border-border bg-card px-3 py-2 text-[15px] text-card-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
          />
          <button
            type="button"
            aria-label={t("chat.send", lang)}
            onClick={send}
            disabled={busy || !input.trim()}
            className="rounded-full bg-primary p-2 text-primary-foreground disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <Send aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Disclosure>
  );
}
