// Fix Pack 21: the onboarding tour is data — four steps, each anchored to a
// real studio element via a [data-tour] attribute. Copy reuses the existing
// onb.* strings from lib/i18n, so the tour and the old modal say the same.

type I18nModule = typeof import("./i18n");
type I18nKey = Parameters<I18nModule["t"]>[0];

export interface TourStep {
  id: "key" | "character" | "reference" | "generate";
  /** Matches a data-tour attribute in the studio. */
  target: string;
  titleKey: I18nKey;
  bodyKey: I18nKey;
  /** The target lives inside the collapsed "Advanced options" section. */
  opensAdvanced?: boolean;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: "key",
    target: "tour-key",
    titleKey: "onb.step1.title",
    bodyKey: "onb.step1.body",
  },
  {
    id: "character",
    target: "tour-character",
    titleKey: "onb.step2.title",
    bodyKey: "onb.step2.body",
    opensAdvanced: true,
  },
  {
    id: "reference",
    target: "tour-reference",
    titleKey: "onb.step3.title",
    bodyKey: "onb.step3.body",
    opensAdvanced: true,
  },
  {
    id: "generate",
    target: "tour-generate",
    titleKey: "onb.step4.title",
    bodyKey: "onb.step4.body",
  },
];

