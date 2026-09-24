// FP23: seed presets and format ranges, extracted from the page monolith so
// static data lives in lib and the page only wires state.

import type { Preset } from "./types";

/** Output format of a build: one frame, a series, a full shoot or a feed. */
export type PromptFormat = "single" | "series" | "shoot" | "feed";

/** Fix Pack 11.2: per-format size ranges for the series/shoot/feed slider. */
export const FMT_RANGE: Record<
  Exclude<PromptFormat, "single">,
  { min: number; max: number; def: number; step: number }
> = {
  series: { min: 4, max: 8, def: 6, step: 1 },
  shoot: { min: 6, max: 12, def: 8, step: 1 },
  feed: { min: 12, max: 30, def: 16, step: 2 },
};

/** First-launch presets seeded into the user's library exactly once. */
export const SEED_PRESETS: Preset[] = [
  {
    id: "seed_ugc",
    name: "UGC selfie iPhone HDR",
    style: ["ugc_raw", "selfie"],
    realism: ["anti_b", "sensor", "skin"],
    capture: { cap: "iphone_hdr", opt: "", expo: [], imperf: [], film: "" },
    engine: "nano_pro",
    mode: "photo",
  },
  {
    id: "seed_fashion",
    name: "Fashion 85mm bokeh",
    style: ["fashion"],
    realism: ["anti_b", "sensor", "skin"],
    capture: { cap: "", opt: "lens_85", expo: [], imperf: [], film: "" },
    engine: "nano_pro",
    mode: "photo",
  },
  {
    id: "seed_luxury",
    name: "Luxury travel 35mm",
    style: ["luxury", "travel"],
    realism: ["anti_b", "sensor", "skin"],
    capture: { cap: "", opt: "lens_35", expo: [], imperf: [], film: "portra" },
    engine: "nano_pro",
    mode: "photo",
  },
];

