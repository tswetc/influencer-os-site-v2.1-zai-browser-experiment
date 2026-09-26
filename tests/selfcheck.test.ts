import { describe, expect, it } from "vitest";
import { runSelfCheck } from "@/lib/selfcheck";

describe("built-in self-check", () => {
  it("passes every invariant", () => {
    const results = runSelfCheck();
    const failed = results.filter((r) => !r.pass).map((r) => r.name);
    expect(failed).toEqual([]);
    expect(results.length).toBeGreaterThanOrEqual(160);
  });
});
