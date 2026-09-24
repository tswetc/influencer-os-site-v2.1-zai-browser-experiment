import type { Settings, VisionProvider } from "./types";

/** Provider-specific credentials/model must never leak across a real switch. */
export function providerSwitchPatch(
  oldProvider: VisionProvider,
  newProvider: VisionProvider,
): Partial<Settings> | null {
  if (oldProvider === newProvider) return null;
  return {
    provider: newProvider,
    apiKey: "",
    model: "",
  };
}

