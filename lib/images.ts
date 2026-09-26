// Upload, decode, EXIF-safe canvas compression, and soft quality warnings.
// All client-side. Always compress; two sizes: working (~1536px) + thumbnail (~256px).

const ACCEPTED = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

export function isAcceptedType(file: File): boolean {
  if (ACCEPTED.includes(file.type)) return true;
  // HEIC often arrives with an empty type on some browsers — check extension
  return /\.(heic|heif|jpe?g|png|webp)$/i.test(file.name);
}

export interface CompressedImage {
  dataUrl: string; // working, longest side <= 1536, jpeg q0.82 (png kept if alpha)
  thumbUrl: string; // ~256px
  width: number;
  height: number;
  warnings: string[]; // i18n keys
}

/**
 * Decode via createImageBitmap with imageOrientation:'from-image' which applies
 * EXIF orientation automatically (fixes rotated iPhone photos). Falls back to <img>.
 */
async function decode(file: File): Promise<ImageBitmap | HTMLImageElement> {
  try {
    return await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    // Fallback (e.g. HEIC unsupported by createImageBitmap in this browser)
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("decode failed"));
      };
      img.src = url;
    });
  }
}

function drawScaled(
  source: ImageBitmap | HTMLImageElement,
  maxSide: number,
): HTMLCanvasElement {
  const w = "width" in source ? source.width : 0;
  const h = "height" in source ? source.height : 0;
  const scale = Math.min(1, maxSide / Math.max(w, h));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function hasAlpha(canvas: HTMLCanvasElement): boolean {
  const ctx = canvas.getContext("2d")!;
  const sample = ctx.getImageData(
    0,
    0,
    Math.min(64, canvas.width),
    Math.min(64, canvas.height),
  ).data;
  for (let i = 3; i < sample.length; i += 4) {
    if (sample[i] < 255) return true;
  }
  return false;
}

// --- Quality heuristics (soft warnings, never block) --------------------------

function analyzeQuality(
  canvas: HTMLCanvasElement,
  origW: number,
  origH: number,
): string[] {
  const warnings: string[] = [];

  // low-res: short side < 512
  if (Math.min(origW, origH) < 512) warnings.push("warn.lowres");

  const ctx = canvas.getContext("2d")!;
  const size = 128;
  const tmp = document.createElement("canvas");
  tmp.width = size;
  tmp.height = size;
  const tctx = tmp.getContext("2d")!;
  tctx.drawImage(canvas, 0, 0, size, size);
  const data = tctx.getImageData(0, 0, size, size).data;

  // grayscale
  const gray = new Float32Array(size * size);
  let sum = 0;
  for (let i = 0; i < size * size; i++) {
    const g =
      0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
    gray[i] = g;
    sum += g;
  }
  const mean = sum / (size * size);

  // exposure: brightness histogram extremes
  if (mean < 45 || mean > 215) warnings.push("warn.exposure");

  // blur: variance of Laplacian
  let lapSum = 0;
  let lapSumSq = 0;
  let n = 0;
  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      const i = y * size + x;
      const lap =
        4 * gray[i] -
        gray[i - 1] -
        gray[i + 1] -
        gray[i - size] -
        gray[i + size];
      lapSum += lap;
      lapSumSq += lap * lap;
      n++;
    }
  }
  const lapMean = lapSum / n;
  const lapVar = lapSumSq / n - lapMean * lapMean;
  if (lapVar < 40) warnings.push("warn.blur");

  void ctx;
  return warnings;
}

async function detectFace(canvas: HTMLCanvasElement): Promise<boolean | null> {
  // FaceDetector is experimental — only use when available; null = unknown
  const FD = (
    window as unknown as {
      FaceDetector?: new (o?: object) => {
        detect(i: CanvasImageSource): Promise<unknown[]>;
      };
    }
  ).FaceDetector;
  if (!FD) return null;
  try {
    const detector = new FD({ fastMode: true });
    const faces = await detector.detect(canvas);
    return faces.length > 0;
  } catch {
    return null;
  }
}

// --- Main entry ----------------------------------------------------------------

export async function processImage(file: File): Promise<CompressedImage> {
  const source = await decode(file);
  const origW = "width" in source ? source.width : 0;
  const origH = "height" in source ? source.height : 0;

  const working = drawScaled(source, 1536);
  const thumb = drawScaled(source, 256);

  const keepPng = file.type === "image/png" && hasAlpha(working);
  const dataUrl = keepPng
    ? working.toDataURL("image/png")
    : working.toDataURL("image/jpeg", 0.82);
  const thumbUrl = thumb.toDataURL("image/jpeg", 0.8);

  const warnings = analyzeQuality(working, origW, origH);
  const face = await detectFace(working);
  if (face === false) warnings.push("warn.noface");

  if ("close" in source) source.close();

  return { dataUrl, thumbUrl, width: origW, height: origH, warnings };
}

/** Strip the data URL prefix for API payloads. */
export function base64Payload(dataUrl: string): {
  mediaType: string;
  data: string;
} {
  const match = dataUrl.match(/^data:([^;]+);base64,(.*)$/);
  if (!match) return { mediaType: "image/jpeg", data: "" };
  return { mediaType: match[1], data: match[2] };
}
