// ============================================================================
// Fix Pack 16 — CLICHÉ GUARD. The codex ban-list as a quiet matcher: known
// AI-influencer clichés in the scene text produce ONE tip in the existing 💡
// layer. Never blocks, never rewrites — “anti — carefully” (founder's rule).
// ============================================================================

import type { Lang } from "./types";

export interface Cliche {
  id: string;
  match: RegExp;
  tip: Record<Lang, string>;
}

export const CLICHES: Cliche[] = [
  {
    id: "latte_art",
    match: /latte\s*art|латте[\s-]*арт/i,
    tip: {
      ru: "латте-арт — штамп №1 всех лент: кружка с остывшим чаем у окна скажет больше",
      en: "latte art is cliché #1 of every feed: a mug of cooling tea by the window says more",
    },
  },
  {
    id: "infinity_pool",
    match: /infinity\s*pool|инфинити|бесконечн\w*\s+бассейн/i,
    tip: {
      ru: "инфинити-бассейн выдаёт стоковую ленту — пустой мотельный бассейн в полдень честнее",
      en: "an infinity pool reads stock — an empty motel pool at noon is more honest",
    },
  },
  {
    id: "bali_swing",
    match: /bali\s*swing|качел\w*\s+(на\s+)?бали|jungle\s+swing/i,
    tip: {
      ru: "качели на Бали — открытка, а не жизнь: та же героиня на детской площадке у дома живее",
      en: "the Bali swing is a postcard, not a life: the same girl on the playground near home is alive",
    },
  },
  {
    id: "jumping",
    match:
      /jump(ing)?\s+(shot|in\s+the\s+air|mid[\s-]?air)|прыж\w+\s+в\s+кадре|в\s+прыжке/i,
    tip: {
      ru: "прыжок в воздухе — рекламный штамп: пойманное «между поз» движение выглядит правдой",
      en: "the mid-air jump is an ad cliché: a caught between-poses movement reads true",
    },
  },
  {
    id: "rooftop_glass",
    match:
      /rooftop\s+(bar|champagne|prosecco)|шампанск\w+\s+на\s+крыше|бокал\w*\s+на\s+фоне/i,
    tip: {
      ru: "бокал на крыше — маркер «инфлюенсер 2019»: недопитый стакан на подоконнике — маркер человека",
      en: "rooftop champagne is a 2019-influencer marker: a half-finished glass on the sill is a person marker",
    },
  },
  {
    id: "passport",
    match: /passport|boarding\s+pass|посадочн\w+\s+талон|паспорт\s+и\s+билет/i,
    tip: {
      ru: "паспорт с посадочным — самый затёртый кадр аэропорта: усталое лицо у гейта в 6 утра честнее",
      en: "passport-and-boarding-pass is the most worn airport frame: a tired face at the gate at 6am is honest",
    },
  },
  {
    id: "plane_window",
    match: /plane\s+window|wing\s+view|крыло\s+самол|иллюминатор/i,
    tip: {
      ru: "крыло в иллюминаторе есть у всех — очередь на паспортный контроль не снимает никто",
      en: "everyone has the wing shot — nobody shoots the passport-control queue",
    },
  },
  {
    id: "balloons",
    match: /balloon|шарик\w*|воздушн\w+\s+шар/i,
    tip: {
      ru: "шарики в кадре — декорация: один сдувшийся шарик на полу через день после — сцена",
      en: "balloons are set dressing: one deflating balloon on the floor a day later is a scene",
    },
  },
  {
    id: "sunset_silhouette",
    match:
      /sunset\s+silhouette|силуэт\s+на\s+закате|руки\s+к\s+солнцу|golden\s+hour\s+beach/i,
    tip: {
      ru: "силуэт на закате — заставка из стока: спина в свете фонаря у подъезда — кадр из жизни",
      en: "the sunset silhouette is a stock screensaver: a back lit by the entrance lamp is a life frame",
    },
  },
  {
    id: "petals_bath",
    match: /rose\s+petals|лепестк\w+\s+роз|ванна\s+с\s+лепестками/i,
    tip: {
      ru: "лепестки в ванне — глянец: запотевшее зеркало и полотенце на двери — правда",
      en: "petals in the bath are gloss: a fogged mirror and a towel on the door are the truth",
    },
  },
  {
    id: "fairy_lights",
    match:
      /fairy\s+lights|bokeh\s+lights|гирлянд\w+\s+боке|портрет\s+с\s+гирляндой/i,
    tip: {
      ru: "боке из гирлянды — портрет «как у всех»: жёсткая вспышка в упор — портрет как у неё",
      en: "fairy-light bokeh is everyone's portrait: point-blank hard flash is hers",
    },
  },
  {
    id: "luxury_props",
    match:
      /lamborghini|ferrari|private\s+jet|частн\w+\s+самолет|ламборг|феррари/i,
    tip: {
      ru: "суперкар/джет — арендованный реквизит клон-фабрик: её мир держится на обычных вещах",
      en: "the supercar/jet is clone-factory rental prop: her world stands on ordinary things",
    },
  },
];

/** First matching cliché tip for the scene text, or null when clean. */
export function clicheAdvice(text: string, lang: Lang): string | null {
  const t = text.trim();
  if (!t) return null;
  const hit = CLICHES.find((c) => c.match.test(t));
  return hit ? hit.tip[lang] : null;
}
