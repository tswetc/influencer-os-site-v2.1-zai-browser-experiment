"use client";

// Fix Pack 9 - A3: Veo first/last frame slots. Shown only when a Veo engine
// is selected. The first frame is the Nano photo; Veo interpolates between
// the two frames. The images are uploaded in the Veo tool itself - these
// slots keep the workflow and the hint in one place.

import { ImagePlus, X } from "lucide-react";
import { useRef } from "react";
import { Card } from "@/components/ui-bits";
import { t } from "@/lib/i18n";
import { isAcceptedType, processImage } from "@/lib/images";
import type { Lang } from "@/lib/types";

function Slot({
  lang,
  label,
  value,
  onSet,
}: {
  lang: Lang;
  label: string;
  value: string | null;
  onSet: (dataUrl: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!isAcceptedType(file)) return;
    try {
      const img = await processImage(file);
      onSet(img.dataUrl);
    } catch {
      // ignore broken files; the slot simply stays empty
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <span className="text-[13px] font-medium text-muted-foreground">
        {label}
      </span>
      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} className="h-24 w-full object-cover" />
          <button
            type="button"
            aria-label={`${t("frames.remove", lang)}: ${label}`}
            onClick={() => onSet(null)}
            className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-foreground/60 text-background hover:bg-foreground/80 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex min-h-[44px] h-24 w-full flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-input focus-visible:outline-2 focus-visible:outline-ring"
        >
          <ImagePlus aria-hidden="true" className="h-5 w-5" />
          <span className="text-[13px] font-medium">
            {t("frames.add", lang)}
          </span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
        className="sr-only"
        aria-label={label}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function FrameSlots({
  lang,
  first,
  last,
  onChange,
}: {
  lang: Lang;
  first: string | null;
  last: string | null;
  onChange: (slot: "first" | "last", dataUrl: string | null) => void;
}) {
  return (
    <Card className="flex flex-col gap-3">
      <h2 className="text-[15px] font-semibold text-card-foreground">
        {t("frames.title", lang)}
      </h2>
      <div className="flex gap-3">
        <Slot
          lang={lang}
          label={t("frames.first", lang)}
          value={first}
          onSet={(v) => onChange("first", v)}
        />
        <Slot
          lang={lang}
          label={t("frames.last", lang)}
          value={last}
          onSet={(v) => onChange("last", v)}
        />
      </div>
      <p className="text-[13px] leading-relaxed text-muted-foreground text-pretty">
        {t("frames.hint", lang)}
      </p>
    </Card>
  );
}
