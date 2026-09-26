"use client";

import { AlertTriangle, ImagePlus, Loader2, ScanSearch, X } from "lucide-react";
import { useRef, useState } from "react";
import { Card, Tag } from "@/components/ui-bits";
import { t } from "@/lib/i18n";
import { isAcceptedType, processImage } from "@/lib/images";
import { uuid } from "@/lib/scene";
import type { Lang, ReferencePhoto } from "@/lib/types";
import { cn } from "@/lib/utils";

const SLOT_ANGLES = [
  "front",
  "three-quarter left",
  "three-quarter right",
  "profile",
  "pose/scene",
];

export function ReferenceVision({
  lang,
  photos,
  onPhotosChange,
  canAnalyze,
  analyzing,
  analyzeError,
  onAnalyze,
  productPhoto,
  onProductChange,
  productDesc,
  cacheHits,
}: {
  lang: Lang;
  photos: ReferencePhoto[];
  onPhotosChange: (p: ReferencePhoto[]) => void;
  canAnalyze: boolean;
  analyzing: boolean;
  analyzeError: boolean;
  onAnalyze: () => void;
  productPhoto: ReferencePhoto | null;
  onProductChange: (p: ReferencePhoto | null) => void;
  productDesc: string;
  cacheHits: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const productRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [typeError, setTypeError] = useState(false);

  async function addFiles(files: FileList | File[]) {
    setTypeError(false);
    const list = Array.from(files);
    const next = [...photos];
    for (const file of list) {
      if (next.length >= 5) break;
      if (!isAcceptedType(file)) {
        setTypeError(true);
        continue;
      }
      try {
        const img = await processImage(file);
        const slot = next.length + 1;
        next.push({
          id: uuid(),
          role: slot <= 4 ? "identity" : "scene",
          slot,
          angle: SLOT_ANGLES[slot - 1] || "extra",
          dataUrl: img.dataUrl,
          thumbUrl: img.thumbUrl,
          warnings: img.warnings,
        });
      } catch {
        setTypeError(true);
      }
    }
    onPhotosChange(next);
  }

  function remove(id: string) {
    const next = photos
      .filter((p) => p.id !== id)
      .map((p, i) => ({
        ...p,
        slot: i + 1,
        role: (i + 1 <= 4 ? "identity" : "scene") as ReferencePhoto["role"],
        angle: SLOT_ANGLES[i] || "extra",
      }));
    onPhotosChange(next);
  }

  // Fix Pack 10 (B2): one dedicated product photo, role "product".
  async function addProduct(file: File) {
    setTypeError(false);
    if (!isAcceptedType(file)) {
      setTypeError(true);
      return;
    }
    try {
      const img = await processImage(file);
      onProductChange({
        id: uuid(),
        role: "product",
        slot: 6,
        angle: "product",
        dataUrl: img.dataUrl,
        thumbUrl: img.thumbUrl,
        warnings: img.warnings,
      });
    } catch {
      setTypeError(true);
    }
  }

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-[15px] font-semibold text-card-foreground">
          {t("ref.title", lang)}
        </h2>
        <button
          type="button"
          disabled={
            !canAnalyze || (photos.length === 0 && !productPhoto) || analyzing
          }
          onClick={onAnalyze}
          title={!canAnalyze ? t("ref.needKey", lang) : undefined}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-[13px] font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-ring"
        >
          {analyzing ? (
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
          ) : (
            <ScanSearch aria-hidden="true" className="h-4 w-4" />
          )}
          {analyzing ? t("ref.analyzing", lang) : t("ref.analyze", lang)}
        </button>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex min-h-24 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-4 text-muted-foreground transition-colors focus-visible:outline-2 focus-visible:outline-ring",
          dragOver
            ? "border-primary bg-accent"
            : "border-border hover:border-input",
        )}
      >
        <ImagePlus aria-hidden="true" className="h-6 w-6" />
        <span className="text-[13px] font-medium">{t("ref.drop", lang)}</span>
        <span className="text-[13px]">JPEG · PNG · WebP · HEIC</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
        multiple
        className="sr-only"
        aria-label={t("ref.drop", lang)}
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {typeError ? (
        <p role="alert" className="text-[13px] font-medium text-destructive">
          {t("upload.badType", lang)}
        </p>
      ) : null}

      {analyzeError ? (
        <div className="flex items-center justify-between gap-2 rounded-md bg-warning/10 px-3 py-2">
          <span className="text-[13px] text-warning">
            {t("ref.analyzeError", lang)}
          </span>
          <button
            type="button"
            onClick={onAnalyze}
            className="text-[13px] font-semibold text-primary hover:underline"
          >
            {t("ref.retry", lang)}
          </button>
        </div>
      ) : null}

      {cacheHits > 0 ? (
        <p className="text-[13px] text-muted-foreground">
          {t("ref.cacheHit", lang)}
        </p>
      ) : null}

      {photos.length > 0 ? (
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {photos.map((p) => (
            <li key={p.id} className="relative flex flex-col gap-1">
              <div className="relative aspect-square overflow-hidden rounded-md border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.thumbUrl || "/placeholder.svg"}
                  alt={`${p.slot <= 4 ? t("ref.slot.face", lang) : t("ref.slot.pose", lang)} ${p.slot} — ${p.angle}`}
                  className="h-full w-full object-cover"
                />
                {p.warnings.length > 0 ? (
                  <span
                    title={p.warnings.map((w) => t(w, lang)).join("; ")}
                    className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-warning text-white"
                  >
                    <AlertTriangle aria-hidden="true" className="h-3 w-3" />
                    <span className="sr-only">
                      {p.warnings.map((w) => t(w, lang)).join("; ")}
                    </span>
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={() => remove(p.id)}
                  aria-label={`Remove photo ${p.slot}`}
                  className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-foreground/60 text-white hover:bg-foreground/80 focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <X aria-hidden="true" className="h-3 w-3" />
                </button>
              </div>
              <Tag>
                {p.slot <= 4
                  ? `${t("ref.slot.face", lang)} ${p.slot}`
                  : t("ref.slot.pose", lang)}
              </Tag>
            </li>
          ))}
        </ul>
      ) : null}

      {photos.some((p) => p.warnings.length > 0) ? (
        <ul className="flex flex-col gap-1">
          {Array.from(new Set(photos.flatMap((p) => p.warnings))).map((w) => (
            <li
              key={w}
              className="flex items-center gap-1.5 text-[13px] text-warning"
            >
              <AlertTriangle
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0"
              />
              {t(w, lang)}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex flex-col gap-2 border-t border-border pt-3">
        <h3 className="text-[13px] font-semibold text-card-foreground">
          {t("ref.product.title", lang)}
        </h3>
        {productPhoto ? (
          <div className="flex items-start gap-2">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={productPhoto.thumbUrl || "/placeholder.svg"}
                alt={t("ref.product.title", lang)}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => onProductChange(null)}
                aria-label={t("ref.product.remove", lang)}
                className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-foreground/60 text-white hover:bg-foreground/80 focus-visible:outline-2 focus-visible:outline-ring"
              >
                <X aria-hidden="true" className="h-3 w-3" />
              </button>
            </div>
            <p className="text-[13px] text-muted-foreground">
              {productDesc || t("ref.product.pending", lang)}
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => productRef.current?.click()}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-3 text-[13px] font-medium text-muted-foreground hover:border-input focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ImagePlus aria-hidden="true" className="h-4 w-4" />
            {t("ref.product.add", lang)}
          </button>
        )}
        <input
          ref={productRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
          className="sr-only"
          aria-label={t("ref.product.add", lang)}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) addProduct(f);
            e.target.value = "";
          }}
        />
        <span className="text-[12px] text-muted-foreground">
          {t("ref.product.hint", lang)}
        </span>
      </div>
    </Card>
  );
}
