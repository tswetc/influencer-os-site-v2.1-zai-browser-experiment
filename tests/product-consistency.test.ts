import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  bundleFilename,
  bundleJson,
  bundleText,
  shotListText,
} from "@/lib/bundle";
import { buildAdHocCutaway } from "@/lib/cutaways";
import { roleLabel } from "@/lib/display-labels";
import { codexDetails } from "@/lib/feed";
import { HINTS } from "@/lib/hints";
import { t } from "@/lib/i18n";
import type { BuildResult } from "@/lib/types";

const meta = { engine: "nano_pro", mode: "photo", scene: "test scene" };
const results: BuildResult[] = [
  { prompt: "hero prompt", role: "hero", day: 1 },
  { prompt: "empty room", role: "cutaway", day: 1, label: "B-roll 1" },
];

describe("product consistency pass", () => {
  it("uses B-roll for user-facing cutaway labels while preserving the internal role", () => {
    expect(roleLabel("cutaway", "ru")).toBe("B-roll");
    expect(roleLabel("cutaway", "en")).toBe("B-roll");
    expect(buildAdHocCutaway("room", "soft light", "A", "en")).toMatchObject({
      role: "cutaway",
      label: "B-roll",
    });
  });

  it("uses Codex consistently in user-facing rules", () => {
    expect(HINTS.broken.ru).toContain("Codex");
    expect(HINTS.broken.en).toContain("Codex");
    expect(codexDetails("ru").join(" ")).toContain("Codex");
    expect(codexDetails("en").join(" ")).toContain("Codex");
  });

  it("uses display labels in TXT and Markdown exports", () => {
    const txt = bundleText(results, meta, "en");
    const md = shotListText(results, meta, "en");

    expect(txt).toContain("Influencer OS — package · Nano Banana Pro · Photo");
    expect(txt).not.toContain("nano_pro");
    expect(txt).not.toContain(" photo)");
    expect(md).toContain("Nano Banana Pro · Photo");
    expect(md).toContain("B-roll");
    expect(md).not.toContain("cutaway");
  });

  it("keeps JSON export IDs unchanged", () => {
    const json = JSON.parse(bundleJson(results, meta)) as {
      engine: string;
      mode: string;
    };
    expect(json.engine).toBe("nano_pro");
    expect(json.mode).toBe("photo");
  });

  it("uses a human-readable export filename slug", () => {
    const name = bundleFilename(meta, "txt", "en");
    expect(name).toContain("nano-banana-pro-photo");
    expect(name).not.toContain("nano_pro");
  });

  it("uses token estimate wording rather than cost wording", () => {
    expect(t("tokens.estimate", "ru")).toBe("≈ токенов");
    expect(t("tokens.estimate", "en")).toBe("≈ tokens");
  });

  it("guards global Studio shortcuts while an aria-modal is open", () => {
    const source = readFileSync("app/app/page.tsx", "utf8");
    const guard = source.indexOf('document.querySelector(\'[aria-modal="true"]\')');
    const generateShortcut = source.indexOf(
      'if ((e.metaKey || e.ctrlKey) && e.key === "Enter")',
    );
    expect(guard).toBeGreaterThan(-1);
    expect(guard).toBeLessThan(generateShortcut);
  });

  it("keeps the three requested destructive/remove targets at 28px", () => {
    const refs = readFileSync("components/reference-vision.tsx", "utf8");
    const passport = readFileSync("components/passport-editor.tsx", "utf8");
    expect((refs.match(/h-7 w-7/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect(passport).toContain("flex h-7 w-7 shrink-0");
  });
});
