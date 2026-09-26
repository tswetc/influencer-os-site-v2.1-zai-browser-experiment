// Fix Pack 8 — design tokens. Single source of truth for the Apple-style
// grid: spacing, radii, type scale and motion. Color tokens live in
// app/globals.css (CSS custom properties consumed by Tailwind).
//
// Rules (enforced by the external check script):
// - Arbitrary Tailwind font sizes (text-[Npx]) must belong to ALLOWED_TEXT_PX.
// - Spacing follows the 4pt grid: 4 / 8 / 12 / 16 / 24 / 32 / 48.
// - Radii: 10 (small controls), 14 (inputs and buttons), 20 (cards, sheets).
// - Motion: 200–300 ms ease-out; prefers-reduced-motion is respected globally.
// - Tap targets are at least 44 px tall on touch surfaces.

export const SPACING = [4, 8, 12, 16, 24, 32, 48] as const;

export const RADIUS = { control: 10, field: 14, card: 20 } as const;

/** iOS-like type scale in px with fixed line heights. */
export const TYPE_SCALE: Record<
  string,
  { size: number; line: number; weight: 400 | 600 | 700 }
> = {
  caption2: { size: 11, line: 14, weight: 400 },
  caption: { size: 13, line: 18, weight: 400 },
  subhead: { size: 15, line: 20, weight: 400 },
  body: { size: 17, line: 24, weight: 400 },
  headline: { size: 17, line: 24, weight: 600 },
  title3: { size: 20, line: 26, weight: 600 },
  title2: { size: 22, line: 28, weight: 600 },
  title1: { size: 28, line: 34, weight: 700 },
  largeTitle: { size: 34, line: 41, weight: 700 },
};

/** The only arbitrary Tailwind font sizes allowed in components. */
export const ALLOWED_TEXT_PX = [11, 13, 15, 17, 20, 22, 28, 34] as const;

export const MOTION = {
  fast: 200,
  base: 250,
  slow: 300,
  easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
} as const;

export const MIN_TAP_TARGET = 44;
