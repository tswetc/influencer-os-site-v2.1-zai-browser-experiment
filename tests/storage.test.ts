import { describe, expect, it } from "vitest";
import { CURRENT_SCHEMA, backupDue, migrate } from "@/lib/storage";

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.parse("2026-07-25T10:00:00Z");

describe("backup reminder", () => {
  it("stays quiet while there is little to lose", () => {
    expect(backupDue(undefined, 1, 10, NOW)).toBe(false);
  });
  it("fires when data is real and no backup exists", () => {
    expect(backupDue(undefined, 2, 0, NOW)).toBe(true);
  });
  it("fires only when the last backup is older than 14 days", () => {
    expect(backupDue(new Date(NOW - 15 * DAY).toISOString(), 2, 0, NOW)).toBe(
      true,
    );
    expect(backupDue(new Date(NOW - 2 * DAY).toISOString(), 2, 0, NOW)).toBe(
      false,
    );
  });
});

describe("schema migration", () => {
  it("lifts old payloads to the current schema", () => {
    expect(migrate({ schemaVersion: 0 }).schemaVersion).toBe(CURRENT_SCHEMA);
  });
  it("keeps unknown fields intact", () => {
    const out = migrate({ schemaVersion: 0, custom: "x" });
    expect(out.custom).toBe("x");
  });
});
