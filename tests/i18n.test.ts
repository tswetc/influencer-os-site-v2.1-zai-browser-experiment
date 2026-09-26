import { describe, expect, it } from "vitest";
import { DICT, t } from "@/lib/i18n";

describe("i18n dictionary", () => {
  it("has ru and en copy for every key", () => {
    for (const [key, entry] of Object.entries(DICT)) {
      expect(entry.ru, key).toBeTruthy();
      expect(entry.en, key).toBeTruthy();
    }
  });
  it("contains no broken encoding", () => {
    expect(JSON.stringify(DICT).includes("\uFFFD")).toBe(false);
  });
  it("falls back to the key for unknown ids", () => {
    expect(t("nope.unknown", "en")).toBe("nope.unknown");
  });
});
