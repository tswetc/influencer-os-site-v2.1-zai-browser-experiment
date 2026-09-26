import { defineConfig } from "vitest/config";

// FP23: unit tests run in plain node - the suite covers pure lib logic
// (self-check invariants, i18n dictionary, storage helpers).
export default defineConfig({
  resolve: {
    alias: { "@": new URL(".", import.meta.url).pathname },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
