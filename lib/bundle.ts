// Fix Pack 9 - E2: package export. A series (x3/x5) or a pipeline is exported
// as one labeled file: markdown-ish .txt with shot headers, prompts and
// negatives, plus a JSON variant for backup. Also powers "Copy all".

import { engineLabel, modeLabel, roleLabel } from "./display-labels";
import type { BuildResult, Lang } from "./types";

export interface BundleMeta {
  engine: string;
  mode: string;
  scene: string;
}

/** Labeled plain-text/markdown bundle: shot headers + prompts + negatives. */
export function bundleText(
  results: BuildResult[],
  meta: BundleMeta,
  lang: Lang = "en",
): string {
  const lines: string[] = [];
  lines.push(
    `# Influencer OS — package · ${engineLabel(meta.engine)} · ${modeLabel(meta.mode, lang)}`,
  );
  if (meta.scene.trim()) lines.push("Scene: " + meta.scene.trim());
  lines.push("");
  results.forEach((r, i) => {
    const label = r.label ? " - " + r.label : "";
    lines.push("## Shot " + (i + 1) + "/" + results.length + label);
    lines.push("");
    lines.push("PROMPT:");
    lines.push(r.prompt);
    if (r.negative) {
      lines.push("");
      lines.push("NEGATIVE:");
      lines.push(r.negative);
    }
    lines.push("");
  });
  return lines.join("\n");
}

/** JSON bundle for backup / re-import into other tools. */
export function bundleJson(results: BuildResult[], meta: BundleMeta): string {
  return JSON.stringify(
    {
      app: "Influencer OS",
      exportedAt: new Date().toISOString(),
      engine: meta.engine,
      mode: meta.mode,
      scene: meta.scene,
      shots: results.map((r, i) => ({
        index: i + 1,
        label: r.label ?? null,
        prompt: r.prompt,
        negative: r.negative ?? null,
      })),
    },
    null,
    2,
  );
}

// Fix Pack 13: shot list for the set - a compact markdown checklist (one line
// per shot, day-grouped for feeds) instead of the full prompt dump.
export function shotListText(
  results: BuildResult[],
  meta: BundleMeta,
  lang: Lang = "en",
): string {
  const lines: string[] = [];
  lines.push(
    `# Influencer OS — shot list · ${engineLabel(meta.engine)} · ${modeLabel(meta.mode, lang)}`,
  );
  if (meta.scene.trim()) lines.push("Scene: " + meta.scene.trim());
  lines.push("");
  let currentDay: number | null = null;
  results.forEach((r, i) => {
    if (typeof r.day === "number" && r.day !== currentDay) {
      currentDay = r.day;
      lines.push("## Day " + r.day);
      lines.push("");
    }
    const parts: string[] = ["Shot " + (i + 1) + "/" + results.length];
    if (r.label) parts.push(r.label);
    if (r.role) parts.push(roleLabel(r.role, lang));
    if (r.caption) parts.push('caption: "' + r.caption + '"');
    lines.push("- [ ] " + parts.join(" - "));
  });
  // Fix Pack 16 — disclosure checklist: feed exports carry the AI-marking
  // reminders (platform AI label, C2PA/SynthID, local disclosure rules).
  if (results.some((r) => typeof r.day === "number")) {
    lines.push("");
    lines.push("## Disclosure");
    lines.push(
      '- [ ] Turn on the platform AI label (e.g. Instagram "AI creator")',
    );
    lines.push("- [ ] Keep C2PA / SynthID metadata intact where required");
    lines.push("- [ ] Check local AI-disclosure rules before paid placements");
  }
  lines.push("");
  return lines.join("\n");
}

export function shotListFilename(): string {
  const stamp = new Date().toISOString().slice(0, 10);
  return "influencer-os-shotlist-" + stamp + ".md";
}

function filenameSlug(label: string): string {
  return label
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function bundleFilename(
  meta: BundleMeta,
  ext: "txt" | "json",
  lang: Lang = "en",
): string {
  const stamp = new Date().toISOString().slice(0, 10);
  const engine = filenameSlug(engineLabel(meta.engine));
  const mode =
    filenameSlug(modeLabel(meta.mode, lang)) ||
    filenameSlug(modeLabel(meta.mode, "en"));
  return (
    ["influencer-os", engine, mode, stamp].filter(Boolean).join("-") +
    "." +
    ext
  );
}
