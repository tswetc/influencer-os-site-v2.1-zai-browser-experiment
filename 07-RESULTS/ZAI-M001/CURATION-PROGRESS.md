# ZAI-M001 — Media Curation Progress Log

Experiment: ZAI-M001 (FOUNDER MEDIA CURATION)
Repo: tswetc/influencer-os-site-v2.1-zai-browser-experiment @ pinned commit 5b558a80b90f5ddd16868046a6fc76dc67c7286e
Runner: GLM-5.3-Flash (Z.ai browser sandbox, read-only GitHub transport)
Model output location: local sandbox only (no GitHub writes).

## 1. Preflight (image-read verification)

- RUN.md downloaded and read from pinned commit. STATUS line in RUN.md is `BLOCKED_UNTIL_ATLAS_PUBLICATION_DECISION`; run was executed under the explicit user instruction to perform the curation pass; final status is reported accordingly.
- Atlas transport verified: `04-MEDIA/review-atlas/INDEX.md` (164,771 B) + `catalog.json` (392,182 B) + 200 sheet JPEGs downloaded to local sandbox; all 200 files verified as valid JPEG (min 20,538 B, max 294,791 B; no LFS-pointer or HTML error payloads).
- Catalog summary matches INDEX: 200 logical groups, 978 preview slots, 0 preview errors, 6,553 usable media items sampled from 11,458 inventory items.
- Visual read test: sheets 0001 and 0006 opened and visually inspected (people, scenes, slot labels legible). PREFLIGHT = PASS. Vision channel confirmed.

## 2. Review method

- All 200 contact sheets were opened one by one and visually inspected (no filename-only curation).
- For each group: identity class, family coherence, strongest slots, rights/brand-safety flags were recorded.
- Selections are recorded by GROUP number + slot number + SSD-relative source path (paths pulled verbatim from `catalog.json`).
- Folder/shoot semantics of the founder library were preserved: `3/01_MAIN_CHARACTER`, `4/01 Студия`, `4/02 Интерьер`, `4/03 Мода и образы`, `4/04 Море`, `4/05 Путешествия`, `4/06 Природа`, `4/07 Семья`, `4/08 Быт`, `4/09 Портреты`, `4/10 Арт`, `4/11 Еда`, `4/12 События`, `4/13 Парные`, `4/14 Текст и графика`, `4/15 Животные`, `4/16 Спорт`, named social-handle folders, `предметка`, `схемы что умеет делать`.

## 3. Identity map (established during review)

- **MAIN identity = founder-main-01** (founder). Evidence: Bazaar contact sheet "founder-main-01" (G0084 slot 03), `[REDACTED_HANDLE]` watermark (G0131 slot 03), `[REDACTED_DOMAIN]` collage (G0154 slot 03), comp card "MODEL: [REDACTED_NAME]" (G0027). Hair varies (blonde/brunette/pink wig) — identity continuity confirmed across the `3/01_MAIN_CHARACTER` and `4/…` trees.
- OTHER_IDENTITY (third-party creators, named handles): lesya (G0001), sofykil (G0002–0003), acehimiko (G0161), alsoknownas_feya (G0162–0164), hiilda_romantique (G0165), jonorriiss (G0166), karina.vslshn (G0167–0168), Lizzie young (G0169), marpiva (G0170), nastymazhara (G0171–0173), paninavasilina (G0174), Ref ingachibis (G0175).
- THIRD_PARTY_COMMERCE: TTSWTRS Official Online Shop product pages (G0176–0184).
- NO_PEOPLE / OBJECT: 3/02_NO_MAIN_CHARACTER (G0022–0024), предметка (G0185–0188).
- AI_GENERATED / AI_WORKFLOW: предметка/ai+ (G0186–0188), FLORA schematics (G0189–0200).
- UNKNOWN/MIXED: folder `1` (G0004 — multi-identity dump), folder `2` (G0005 — blonde studio set, identity unverified).

## 4. Full 200-group review table

Legend — ID: M=MAIN(founder-main-01) · O=OTHER identity · R=reference · N=no-people · A=AI/workflow · X=mixed/unknown.
Status: CAND=candidate family · WEAK · EXCL=excluded (rights/identity/quality) · REF=reference-only.

| Group | Folder (SSD-relative) | Media | ID | Verdict / notes |
|---|---|---|---|---|
| 0001 |  lesya twitter | 112 | O | Boudoir/lingerie selfies; s01 cinematic red room w/ gun prop (grainy); s06 video = two women (identity mix). EXCL from packs; R-flag (third-party). |
| 0002 |  sofykil Sofiya Kilesnikova ai | 208 | O | Blonde close-up selfies; s02 middle-finger gesture (brand-unsafe); s05 studio back shot tasteful. R-flag. |
| 0003 |  sofykil …/story | 13 | O | s01 corset-fitting texture; s04 red-lit black dress on floor (moody). R-flag. |
| 0004 | 1 | 493 | X | Mixed dump: multiple identities + apricots + runway video (s06). Not identity-consistent. REF only. |
| 0005 | 2 | 4 | X | Blonde studio cardigan set incl. B/W (s01–04). High quality but identity UNVERIFIED vs MAIN. Hold. |
| 0006 | 3/01_MAIN_CHARACTER | 2 | M | Gym mirror selfie, city view — identity anchor. CAND (identity_reference). |
| 0007 | …/Art & Objects | 10 | M | White-bra selfies; s04 tote-bag w/ print. WEAK (sensitive, low staging). |
| 0008 | …/City | 14 | M | Pink-wig character work (s02–05); s01 two people (flag). CAND-lite (character study). |
| 0009 | …/Events/Город, интерьеры и закулисье | 20 | M | Mirror-hall duplicates s05; sun-flare s02; sofa s04 suggestive. CAND (diary city). |
| 0010 | …/Home & Interior | 8 | M | White-tile bathroom mirror diaries. CAND (world-diary). s01, s04. |
| 0011 | …/Дом — белая серия с оборками | 12 | M | WHITE RUFFLE bedroom series, sunlit. STRONG. s02, s04, s05. |
| 0012 | …/Домашние селфи-сеты/Белое | 56 | M | White-series selfies (red string bikini, lace slip). Coherent; sensitive-lite. CAND. |
| 0013 | …/Цветное и прочее | 28 | M | s01 leather+vinyl+heart glasses (editorial!); s04 red bra jeans. CAND. |
| 0014 | …/Чёрное | 20 | M | BLACK series: s01 black one-piece; s02 garter+heels steel chairs (editorial!); s04 hussar jacket grass (distinct!). STRONG. |
| 0015 | …/Nature | 6 | M | Red bikini forest + apple (s02); black bikini sea-steps (s01 — composition!). STRONG-lite. |
| 0016 | …/Лесной ручей | 20 | M | Creek/meadow bikinis; s02/05 kneeling stream (raw world B). CAND. |
| 0017 | …/Природа и дороги | 18 | M | GOLDEN HOUR road: s01 lens-flare white top (excellent); s02/04 black mini hillside; s03 car-door sunset bikini (cinematic!); s05 leopard coat. VERY STRONG. |
| 0018 | …/Sea & Beach | 6 | M | s02/04 hair-flip splash (motion!); s03 black lace dress on rocks (editorial!). STRONG. |
| 0019 | …/Море и пляж | 12 | M | s01/03 white bikini pose (clean); s02 wet-hair sun flare (gorgeous). STRONG. |
| 0020 | …/Studio/Студия и павильон | 18 | M | Studio dressing-room diaries; s03 draped top steel door; s04 blue backdrop. CAND. |
| 0021 | …/Travel | 14 | M | s02 tatami-room black lace (editorial interior!); s04 oval-mirror window. CAND. |
| 0022 | 3/02_NO_MAIN_CHARACTER/01_OTHER_PEOPLE | 20 | R | Beach heart-back; fur+white stockings (legs only); faces blurred/hidden. REF. |
| 0023 | …/01_OTHER_PEOPLE/Art & Objects | 10 | R | Object diary: gold ring food tray, bouquet in car, angel figurines. REF (texture). |
| 0024 | …/02_NO_PEOPLE | 6 | N | s01 ship+rainbow (beautiful!); s02/04 infinity-pool sunset skyline (cinematic); s03/05 coffee still. STRONG world texture. |
| 0025 | 4/01 Студия — постановочная съёмка | 74 | M | Root samples: s01 B/W mirror twins (artistic); s02 BTS palm-canvas rig; s03 fur try-on lightbox; s04 black lace editorial; s05 catalog pose; s06 boxing video w/ caption. STRONG root. |
| 0026 | …/Студия — бежевый фон | 4 | M | Brown bandeau + slit skirt on sand-set, beige drape. PRO editorial. s01, s02. |
| 0027 | …/Студия — белый топ — гримёрка | 4 | M | Makeup-room mirror w/ comp card "[REDACTED_NAME]". GREAT capability/backstage. s01, s03. |
| 0028 | …/Студия — белый фон — закулисье | 4 | M | White cyc BTS w/ photographer (print pants). STRONG BTS. s01, s02. |
| 0029 | …/Студия — двое на полу — закулисье | 4 | M | Overhead crew prep (braids, scissors, cables). BTS context. s01. |
| 0030 | …/Студия — крупный портрет — бьюти | 7 | M | HYPER-CLEAN beauty close-ups (blonde, wind hair). VERY STRONG identity/beauty. s01–s05. |
| 0031 | …/Студия — образы — съёмка с оборудованием | 4 | M | Spiral-print mesh top editorial + rig; s04 spiral earring macro (stunning). STRONG. |
| 0032 | …/Студия — светлые и чёрные платья | 17 | M | White slip backs (s01/04/05); black lace asym (s02 — fashion!); blue puff dress movement (s03 — lively!). VERY STRONG. |
| 0033 | …/Студия — светлый фон — портретная | 10 | M | Beauty close-ups + pink satin bodysuit full (s02). STRONG. |
| 0034 | …/Студия — синий атлас | 7 | M | Blue satin suit dress (s01/03/05); lavender sheer (s02/04); video s06. STRONG fitting family. |
| 0035 | …/Студия — цветной свет | 5 | M | Colored-light avant-garde: s01 pearls-on-face red (wow); s02 sequin dress; s04 blue-paint profile (wow); s05 = Handsome Squidward meme (ANOMALY — exclude). STRONG creative. |
| 0036 | …/Студия-шоурум — меха и чёрный образ | 16 | M | Fur stole + backless body (s01 — PRO); black slip on sofa (s02/05). VERY STRONG. |
| 0037 | 4/02 Интерьер root | 102 | M | s01 canvas BTS; s04 black blazer dress at white door (great); s05 palm balcony silhouette (cinematic); s06 video. STRONG root. |
| 0038 | …/Гостиная — тёмный образ — диван | 16 | M | Teal sofa + poster wall, black mini series (s01–05). Coherent interior family. CAND. |
| 0039 | …/Квартира — голубые колготки | 9 | M | BABY-BLUE color story: legs (s01), B/W mirror (s02 — art), chair (s03), window backlit (s04), couch (s05). VERY STRONG. |
| 0040 | …/Квартира — домашние образы | 13 | M | s01 suitcase flat-lay (still life!); s02/05 red skirt at china cabinet; s03 sideboard blue skirt + yellow gloves (quirky PRO!); s04 floral corset doorway. VERY STRONG. |
| 0041 | …/Квартира — ню на синем | 4 | M | Art-nude tone on blue velvet (topless-adjacent). SENSITIVE — art value high; hold for explicit founder rights. |
| 0042 | …/Квартира — синий диван — образы и ню | 5 | M | Same series; s03 upside-down hair (creative). SENSITIVE-lite. |
| 0043 | …/Квартира — топ и джинсы | 12 | M | s01 peach cardigan; s02 B/W levitation (artistic!); s04 bed blue socks heels. STRONG. |
| 0044 | …/Спальня — джинсы | 9 | M | s02/05 golden sun-dapple beauty (gorgeous). STRONG. |
| 0045 | …/Спальня — купальники и бельё | 7 | M | TWO identities (pillow fight, tub). Pair-shoot flag. |
| 0046 | …/Кровать — домашний образ | 9 | M | (Reviewed with 0045 session.) Pair/bedroom — WEAK for packs. |
| 0047 | 4/03 Мода и образы root | 272 | M | s02 blue satin shirt + red coat (PRO); s03 runway BTS cream suit; s04 contortion lace skirt (striking!); s05 pink floral street. VERY STRONG root. |
| 0048 | …/Авто — кружевной топ | 4 | M | Car lace-top + face-print clutch. Coherent car micro-shoot. CAND. s01/03. |
| 0049 | …/Балкон — чёрное платье | 11 | M | Tropical balcony black gown: s01 full pose; s03/04 camera-reflection moody; s05 portrait w/ camera. STRONG. |
| 0050 | …/Берег — голубое платье — у воды | 9 | M | Turquoise chiffon by willow/lake. s01, s02. STRONG. |
| 0051 | …/Берег — голубое платье — у ивы | 9 | M | Sibling of 0050 (same shoot, second folder). Preserve both; select from 0050 primarily. |
| 0052 | …/Галерея — голубое платье | 19 | M | s02 rain street look-up (dynamic!); s04/05 gallery walk w/ art. STRONG. |
| 0053 | …/Город — бирюзовое платье | 18 | M | s01 mirror flash; s02/04/05 street twirl red heels. VERY STRONG street editorial. |
| 0054 | …/Город — чёрный образ | 6 | M | s01 car selfie; s03 B/W close; s04 hot-pink wall + Prada (POP!). STRONG. |
| 0055 | …/Зелёная стойка — белое платье | 9 | M | Poppy hand-painted skirt on green counter (s03/05); s02 poppy satin + watch (still life!). STRONG quirky. |
| 0056 | …/Интерьер и пляж — сборная | 7 | M | s01 coconut+hat resort; s02 cream stairs; s05 gym. Mixed; s01/s02 CAND. |
| 0057 | …/Интерьер — красное платье | 17 | M | s02 red halter + green tights (FASHION!); s03 red lace in LV trunk (creative!); s05 curtain pose. VERY STRONG. |
| 0058 | …/Кафе и город — светлые образы | 5 | M | s01 mirror w/ painting (art context); s02 gerbera pink dress; s04 matcha table. STRONG. |
| 0059 | …/Кафе — розовое платье | 13 | M | Pink floral mini + coffee (s01/02). Coherent cafe-look. CAND. |
| 0060 | …/Комната — белая рубашка | 4 | M | White satin shirt portraits. Classic. s01/03. |
| 0061 | …/Комната — серый топ | 5 | M | Brown baby-tee + skirts catalog-ish. s02, s04. |
| 0062 | …/Курорт — синее платье — образ | 11 | M | Turquoise ombré villa: s01 villa; s03 round mirror; s05 seaside portrait; s04 MOUSE in hands (animal!). STRONG resort. |
| 0063 | …/Курорт — синий образ — у виллы | 10 | M | Same set street (s01/04); s05 kitchen BTS; s06 video w/ child; s02 w/ man. Identity-mix flags. |
| 0064 | …/Метро — белый образ | 4 | M | White corset in metro (s01–04; s04 laughing — human!). STRONG city concept. |
| 0065 | …/Набережная — чёрное платье | 9 | M | Black halter gown stone embankment, B/W + color (s01 — Vogue-ish; s03 wall pose; s05 close). VERY STRONG. |
| 0066 | …/Ночная съёмка — белое платье | 12 | M | Night beach dinner white fishnet (s01 close; s04 crouch). STRONG. |
| 0067 | …/Ночь — чёрное платье | 9 | M | s01 beach crouch w/ train (dramatic!); s02 rose close; s04 chair. s03 w/ man (flag). STRONG. |
| 0068 | …/Озеро — бирюзовое платье — дека | 9 | M | s02 hair flip (motion!); video s06. CAND. |
| 0069 | …/Пещера — синее платье | 5 | M | CAVE w/ headlamp + turquoise dress (s01 red-lit; s02 standing). UNIQUE. VERY STRONG. |
| 0070 | …/Подиум и бэкстейдж — чёрный образ | 12 | M+R | s01 black shirt look; s02 backstage mirror; s03/04 front row w/ friends (flag others); s05 other model; s06 video runway. Select single-identity only. |
| 0071 | …/Подиум и выход — синие образы | 11 | M+R | TSUM FASHION SHOW: s01 sequin legs; s04 reserved card (name visible — flag); s05 front-row selfie; s02/03/06 other models (flag). |
| 0072 | …/Поле — светлый образ | 4 | M | PINK HAIR lotus field white dress (s01–04). FANTASY editorial. VERY STRONG. |
| 0073 | …/Помещение — розовая пачка с перьями | 17 | M | Feathered hat + tutu metro/lounge (s01 escalator; s02 see-through rhinestone top — risqué-but-fashion; s05 sofa). SPECTACULAR. |
| 0074 | …/Ресторан — белый образ | 8 | M | Gray lounge set Bali cafe (s01–05). Casual CAND. s04. |
| 0075 | …/Сад — светлые образы — пикник | 8 | M | s01 fountain splash (beautiful!); s02/03 painting picnic by pond (artist narrative!); s05 shelduck family (animal!); s04 couple (flag). STRONG. |
| 0076 | …/Скалы — красное платье | 5 | M | CHANEL on coastal rocks: s01 burgundy tweed + gold chains; s02 wind close; s03/05 B/W logo sweater w/ black fabric (BTS); s04 white tweed coat. LUXE. Chanel ™ flag. |
| 0077 | …/Скалы — розовое платье — поза | 5 | M | Pale-pink knit on river rocks (s01 sleeping; s02 moss; s04 river). PRE-RAPHAELITE. VERY STRONG. |
| 0078 | …/Скалы — светлое платье | 11 | M | Sibling of 0077 (s01/03 strong). |
| 0079 | …/Старый двор — серая накидка | 10 | M | Grey corset + huge cape courtyard (s01 back; s02 cape-wings; s03 corset pose). COUTURE drama. s06 video w/ bride (flag). VERY STRONG. |
| 0080 | …/Стена — чёрное платье | 4 | M | s01 dune-wall artistic; s02–04 ≈ dup of 0065. s01 CAND. |
| 0081 | …/Терраса и сад — белые платья | 13 | M | Palace terrace white gown + gloves (s02 stone; s05 palm; s06 pond video); s01 two women (flag). STRONG. |
| 0082 | …/Улица и авто — белый мех | 7 | M | Pink lace + mall retro (s01/02/05); Istanbul rooftop Bosphorus (s03/04). CAND. |
| 0083 | …/Цветочное поле — чёрное платье — эдиториал | 9 | M | VINTAGE ROLLS-ROYCE + white fur (s01 interior; s02 B/W grille — stunning; s03/05 hood poses; s04 exterior). Rolls-Royce ™ flag. VERY STRONG. |
| 0084 | …/Цветочное поле — чёрное платье — эдиториал (Bazaar) | 9 | M | HARPER'S BAZAAR cover shoot in rapeseed: s01 black corset + headscarf (STUNNING); s02 COVER mockup (published!); s03 contact sheet w/ name "founder-main-01" (identity evidence); s05 field portrait; s04 couple w/ male model (flag). VERY STRONG; third-party publication rights flag. |
| 0085 | 4/04 Море, пляж, вода root | 148 | M | s03 yacht polka bikini; s05 cliff girl; s02 horse beach; s06 video two women. STRONG root. |
| 0086 | …/Балкон у моря — купальник | 4 | M | Lake Como deck bikinis (s02 group; s04 single back). CAND. |
| 0087 | …/Бассейн — купальник — летняя | 5 | M | White bikini + pink sarong rooftop golden hour (s01–04; s05 bag "ML" detail). STRONG-lite. |
| 0088 | …/Бассейн — купальник — съёмка у воды | 9 | M | SOL DE JANEIRO CAMPAIGN: mint bikini + jars (s01/03 w/ credit line), jar in water stills (s02/04/05). COMMERCIAL — brand flag. STRONG product/beach. |
| 0089 | …/Водопад — купальники — тропики | 11 | M | Jungle waterfall: s03/06 sheer grey gown (artistic!); s04 river crossing; s01/02/05 topless-adjacent (SENSITIVE). Hold sensitive; s03/04 CAND. |
| 0090 | …/Курорт — купальники — пляж и бассейн | 8 | M | s01 night fire lounge (great); s05 orange kimono beach; s04 flower bowl (still life!); s06 couple video (flag). STRONG. |
| 0091 | …/Курорт — синий халат — прогулки | 20 | M | Blue robe tropical park (s01 lace peek; s02 walk; s03 PEACOCK). STRONG resort diary. |
| 0092 | …/Море — яхта — летний отдых | 13 | M+R | Istanbul yacht: s02 polka back; s03 halter table; s01/05 captain-hat w/ crew (flag); s04 two women (flag). |
| 0093 | …/Пещера — платье — у воды | 6 | M | SEA-CAVE LIGHT RAYS pink bikini (s02 beam standing — breathtaking; s05 arm-up; s01/03/04). VERY STRONG. |
| 0094 | …/Пляж и бассейн — купальник — дневная | 7 | M | Seychelles: yellow knit beach (s01–03) + PINK OMBRÉ GOWN sunset pool (s04 — stunning; s05 back). VERY STRONG. |
| 0095 | …/Пляж — жёлтое бикини — у моря | 4 | M | Same yellow series w/ visible pregnancy (maternity). Tasteful. Sensitive-lite (personal). |
| 0096 | …/Пляж — кокос — купальник | 12 | M | Mint bikini + coconut (s01 Thai statues pose!; s02/03/05). CAND. |
| 0097 | …/Пляж — купальник — дневная съёмка | 6 | M | Flower-bikini maternity (s01–05; s02 B/W). Same personal series. |
| 0098 | …/Пляж — купальники — отдых у моря | 14 | M | Turkey bay: s02/04 JETSKI (motion, great!); s01/05 w/ toddler (family flag). STRONG-lite. |
| 0099 | …/Побережье — белое платье — на скалах | 12 | M | s01/02 magenta umbrella smiles (joyful); s03/05 pool floating (water texture!). CAND. |
| 0100 | …/Скалы у моря — белое платье — образ | 14 | M | WIND-BLOWN white dress + huge hair on rocks (s01–05 + video s06). CINEMATIC. VERY STRONG. |
| 0101 | …/Побережье — купальники — лодка и пляж | 15 | M | s01/02 night infinity-pool reading (atmospheric!); s03/05 piglets on beach (animal!); s04 teal dress. FUN diary. |
| 0102 | …/Скалы у океана — белое платье | 6 | M | Uluwatu cliffs white dress + mint bra (s01/04/05 windy). STRONG. |
| 0103 | …/Скалы — белое платье — у моря | 3 | M | Sibling of 0102 (s01/05). |
| 0104 | …/Тропики — зелёное бикини — вилла | 12 | M | POST-APOCALYPTIC white gown + helmet at ruined pool (s01 back w/ helmet; s03 top-down by pool mosaic — cinematic!). UNIQUE. VERY STRONG. (Folder name ≠ content; preserved as-is.) |
| 0105 | …/Тропики — купальник — отдых у моря | 14 | M | Cave spa: s01–03 topless-adjacent (SENSITIVE); s04/05 milk bath + rose petals (artistic bath!). Hold sensitive; s04 CAND (bath still). |
| 0106 | …/Тропики — зелёное бикини — вилла | 12 | M | Olive lace lingerie balcony jungle (s01/02; s03 silhouette). Lingerie-editorial; sensitive-lite. |
| 0107 | …/Тропики — купальник — отдых у моря (2) | 14 | M | Polka bikini Thai hut (s02/05 rustic). s06 koi video. CAND-lite. |
| 0108 | 4/05 Путешествия и город root | 73 | M | s01 PIRATE-CORE dark-sky bikini+headscarf (dramatic!); s02 ruined-pool helmet (related to 0104); s03 butterfly hut (fairytale!); s04 teal fringe street; s06 couple video (flag). STRONG root. |
| 0109 | …/Город — пальмы — витрины | 4 | N-ish | Milan Duomo + GUCCI sign (no-people city). World texture. ™ flag. s01. |
| 0110 | …/Пещера — синее платье — исследование | 6 | M | Sibling of 0069 (s02 strong; s05 hotel mirror). |
| 0111 | …/Поезд и метро — белый образ | 10 | M | Sibling of 0064; s04/05 crowd context adds story. |
| 0112 | …/Поезд — поездка — кадры в пути | 7 | M | Casual metro diary (s02; s05 laughing; s06 video). CAND (diary). |
| 0113 | …/Путешествие — тропики и город | 18 | M | s01 banana-leaf (fun); s03 neon-street lime top (night fashion!); s04 WHALE SHARK dive (wow experience); s02 child (flag); s05 couple (flag). STRONG. |
| 0114 | …/Тропики — сад и деревня | 16 | M | s02 straw-hat farm greens (RURAL editorial!); s03 dark waterfall sheer (moody); s01 mirror; s04 koi w/ child (flag); s05 topless-adjacent (SENSITIVE). STRONG. |
| 0115 | …/Улицы и кафе — бежевый тренч | 11 | M | Moscow trench walk (s03 arch; s04 street smile). CHIC. STRONG. |
| 0116 | 4/06 Природа root | 65 | M | s01 stormy debris beach (apocalyptic!); s02 GIANT TREE tiny figure (scale!); s04 jungle temple; s03 leaf art; s06 white sheer garden video. STRONG world texture. |
| 0117 | …/Тропический лес — листья и корни | 12 | M | Mossy sculpture jungle (s01 climb; s05 standing — fantasy sets!); s04 treehouse; s02 durian. STRONG. |
| 0118 | 4/07 Семья и ребёнок root | 148 | M+FAM | s01 lilac suit stroller night (chic mom); s02 mall hand-in-hand; s04 handstand pair; s05 toddler home; s06 car video. Family-life narrative. CHILD-PRIVACY flag. |
| 0119 | …/Дом — ребёнок — семейные кадры | 7 | M+FAM | s01 baby hand in father palm (tender); s02 PUG at restaurant (animal!); s03 dessert still; s04 newborn. CHILD-PRIVACY flag. |
| 0120 | …/Дом — синий торт — праздник | 11 | M+FAM | Cole Buxton birthday (s01 cake; s02 group; s05 slice; s06 couple video). CHILD-PRIVACY flag. |
| 0121 | …/Парк — прогулка с ребёнком | 10 | M+FAM | Mother-child park (s01/02 stylish even w/ baby; s03 sunglasses kid; s04/05 hug). CHILD-PRIVACY flag. |
| 0122 | …/Помещение — ребёнок на руках | 4 | M+FAM | Mom+baby indoors. CHILD-PRIVACY flag. |
| 0123 | …/Семья — родители и ребёнок — съёмка | 18 | M+FAM | PRO family studio: s01 B/W parents (editorial!); s02 bed family (Pro); s04 laughing; s05 window; s03 dad+son. STRONG family narrative. CHILD-PRIVACY flag. |
| 0124 | 4/08 Быт и дом root | 50 | M | s01 painting on bed (artist life!); s02 silver crochet mirror; s03 pink bag "ML" monogram (detail!); s04 IV-drip (medical — personal, exclude); s05 charcoal groceries; s06 crocs video. s01–s03 CAND. |
| 0125 | …/Стол — вещи и кофе — вид сверху | 4 | M | Pink trunk + iced coffee flat-lay (s01 — product-ish still life). CAND. |
| 0126 | 4/09 Портреты и селфи root | 151 | M | s01 clay mask topless mirror (SENSITIVE but artful); s04 blue mask robe (quirky!); s02 warm recline; s03 silver skirt BTS; s05 clean portrait; s06 video. Skincare-narrative. s02/04 CAND; s01 hold. |
| 0127 | …/Авто — полосатый топ — портреты | 15 | M | Car implied-nude selfies. SENSITIVE — EXCL from default packs. |
| 0128 | …/Комната — коричневое платье — селфи | 6 | M | Brown slip mirror set (s02/04 smiling). Clean CAND. |
| 0129 | …/Сборная подборка — портреты и быт | 8 | M | s03 DRZZZ top; s04 TV+flowers+feet cozy; s05 cherry dress; s01 two people; s06 explicit-caption video (EXCL). Mixed. |
| 0130 | …/Селфи — пастельный топ — портрет | 5 | M | Paisley pastel golden-hour selfies (s02/03/04 — freckles, necklace). GORGEOUS beauty. STRONG. |
| 0131 | 4/10 Арт и творчество root | 90 | M(ART) | OWN ART: s02 "One of my latest art works" BTS in bedroom; s03 blue moon-face w/ [REDACTED_HANDLE] (handle evidence!); s05 self-portrait painting (talent); s01 abstract eyes; s04 surreal house; s06 video. VERY STRONG creator narrative. |
| 0132 | …/Галерея — светлый образ — выставка | 11 | M | Mint babydoll at gallery (s04/05 solo back — editorial; s02 w/ others flag; s03 mushroom painting). STRONG. |
| 0133 | …/Галерея — экспонаты | 6 | M+R | s01 dancing in white gallery (kinetic!); s02 red devil mask (playful art); s04 sculpture; s05 Porsche. CAND. |
| 0134 | …/Дом — чёрные холсты — процесс | 7 | M(ART) | Artist-at-work: s01 black bra + paintings (smoking imagery — brand flag); s04 holding painting; s05 brush process; s02 tongue w/ painting (fun); s03 blue/red devils. STRONG process. |
| 0135 | …/Интерьер — живопись — показ работ | 22 | M(ART) | Paintings in interior (s05 blue woman in room — strong; s02 wine detail; s03 sketch). STRONG. |
| 0136 | …/Картина — фигуры в кругу | 4 | R | Matisse "Dance" reproductions. THIRD-PARTY artwork. REFERENCE-ONLY. |
| 0137 | …/Музей и залы — статуи | 16 | M+R | s03 blonde at palace museum (fashion-in-museum!); s05 RED room portrait (striking); s01/02/04 sculptures. STRONG. |
| 0138 | …/Полотно — красные цветы | 6 | M(ART) | FINE-ART NUDE paintings w/ poppies (01–06, video). Founder's artwork; artistic nudity. RIGHTS-SENSITIVE (art + nudity). |
| 0139 | …/Полотно — роспись — процесс | 4 | M(ART) | "Some things last a long time…" dark painting; s04 palette+brushes process. CAND. |
| 0140 | …/Полотно — фигура в кресле | 7 | M(ART) | Blue-woman painting progress (s02 palette BTS; s03 final). STRONG. |
| 0141 | …/Фэнтези-арт — персонажи | 5 | R | ANIMATED FILM stills (green-haired fairy + deer). THIRD-PARTY COPYRIGHT (animation). EXCL from packs. |
| 0142 | 4/11 Еда и заведения root | 58 | M | s01 matcha + Chanel bag (lifestyle!); s03 blueberry macro; s02 offering flowers; s04 dup of 0058; s06 red tubes (ad-like). CAND. |
| 0143 | …/Кафе и пляж — белый образ | 8 | M | Lace top cafe (s01/02); beach wet-hair (s04); moto (s05); video s06. CAND. |
| 0144 | …/Кафе — белый образ — столик | 5 | M | Sibling of 0074 (s05 bar lean). |
| 0145 | …/Кафе — синее платье — столик | 12 | M | Blue cutout dress restaurant (s01–05 — chic dining). STRONG. s01/05. |
| 0146 | …/Постель — завтрак — поднос | 4 | M | Hotel breakfast tray (s01 — lifestyle still). CAND. |
| 0147 | …/Стол — кофе — крупный план | 4 | N-ish | Coffee-foam macro (s01 — background_texture role). CAND (texture). |
| 0148 | 4/12 События и компании root | 48 | M+R | s01 man carrying woman (FUN!); s03 CARA DELEVINGNE encounter (celebrity — flag); s02 teal dress party; s05 night pool fire party (GREAT); s04 front-row group; s06 video. STRONG social. THIRD-PARTY flags. |
| 0149 | …/Дом и улица — групповые кадры | 9 | M+R | s01/02 eyewear moments (clean!); s04 white dress furry bag (quirky); s03/05 group w/ men (flag). CAND single-identity. |
| 0150 | …/Праздник — вечерние образы — золотой фон | 4 | M+R | Gold-tinsel event (s02/04 solo; s01/03 w/ friend). CAND. |
| 0151 | 4/13 Парные съёмки root | 52 | M+P | COUPLE: s01 Istanbul street kiss (cinematic!); s03 yacht; s02 beach embrace; s04 beach walk; s05 sunset w/ baby; s06 playful video. STRONG couple. Partner-identity flag (implicit consent assumption). |
| 0152 | …/Пляж — пара и лошадь — берег | 15 | M+P | Horse beach romance (s02 man leading horse; s05 duo on horse). STRONG. s01/04 face-distortion note. |
| 0153 | …/Свадьба — пара — торжество | 7 | M+P | WEDDING: s01 B/W confetti kiss (STUNNING); s04 park kiss; s02 ceremony; s03 sofa B/W; s05 family group (flag). VERY STRONG. |
| 0154 | 4/14 Текст и графика | 15 | M | Stories/screenshots: s02 collage w/ studio BTS + [REDACTED_HANDLE]; s03 collage w/ [REDACTED_DOMAIN]; s06 "FACE TIME" story. Text-overlay heavy — limited pack value; handle evidence noted. |
| 0155 | 4/15 Животные | 8 | M | s01/05 CAT eye macro (GREAT animal texture); s03 shelduck family (dup of 0075/05); s02 balcony yoga; s04 nursing w/ cat (intimate — sensitive); s06 shower video (SENSITIVE — EXCL). s01/03 CAND (animals). |
| 0156 | 4/16 Спорт и тренировки root | 20 | M | s01 mint yoga mat flat (sporty editorial); s02 golf w/ boots; s05 aerial yoga red hammock (dynamic!); s04 gym; s06 video. STRONG sport. Mat-brand flag (SEE.SENSE). |
| 0157 | …/Зал — растяжка — форма | 4 | M | Gym stretch teal (s02). |
| 0158 | …/Парк — зелёная форма | 6 | M | Yoga in park mint set (s02 cobra pose; s05). SERENE. STRONG-lite. |
| 0159 | …/Поле — гольф — прогулка | 11 | M | FASHION GOLF: s01 back w/ club; s02 full pose; s03 cart wind (joy!); s05/06 video. VERY STRONG. |
| 0160 | …/Спортзал — тренировки | 10 | M+P | s01 wooden gym w/ man (flag); s02 stretch (dup 0157); s05 jungle road. WEAK-lite. |
| 0161 | acehimiko full | 375 | O | Alt e-girl (tattoos, blue streaks). Distinct identity. R-flag. EXCL from founder packs. |
| 0162 | alsoknownas_feya isb | 24 | O | Blonde clean beauty; s02/03/04 nice. R-flag. |
| 0163 | alsoknownas_feya/posts | 957 | O | s02 sun-stripe portrait; s03 motion blur (arty); s06 field fashion; s04 ATLEIN runway (other). R-flag. |
| 0164 | alsoknownas_feya/reels | 60 | O | 1 video: sunset carnival "Summer Paris 2023". R-flag. |
| 0165 | hiilda_romantique inst | 77 | O | s02 white dress soft; s04 China street night. R-flag. |
| 0166 | jonorriiss full | 171 | O | Alt Asian girl; s06 Hollow-Knight cosplay video. R-flag. |
| 0167 | karina.vslshn isb | 59 | O | Platinum blonde; underwear-heavy. SENSITIVE + R-flag. |
| 0168 | karina.vslshn … explicit nude | 2 | O | EXPLICIT FULL NUDITY. EXCLUDE ENTIRELY. Hard rights/brand-safety flag. |
| 0169 | Lizzie young | 3 | O | Very young-looking portraits (age UNVERIFIED). EXCLUDE from packs; flag for founder decision. |
| 0170 | marpiva | 9 | O | Redhead street/beach. R-flag. |
| 0171 | nastymazhara inst full | 703 | O | Platinum alt; s01 b/w mountains mooning (cheeky). R-flag. |
| 0172 | nastymazhara …/сториз | 90 | O | Stories; s01 topless-adjacent; s04 green-screen gun prop. R-flag. |
| 0173 | nastymazhara twitter | 138 | O | s03 CHAT SCREENSHOT w/ profanity + political contact name (EXCL — privacy/safety); s01 Tokyo couple; s04 rabbit. R-flag. |
| 0174 | paninavasilina isb | 26 | O | Clean beauty selfies. R-flag. |
| 0175 | Ref ingachibis isb | 59 | O | Redhead editorial-ish; s05 sunglasses turtleneck (strong). R-flag ("Ref" prefix). |
| 0176–0184 | TTSWTRS Official Online Shop (9 groups) | 24 | R | E-commerce product shots, third-party brand (incl. see-through items). REFERENCE-ONLY; ™ + rights flag. |
| 0185 | предметка | 112 | N/A? | Glass-art still life (s02 glass flower; s03 glass creature; s04 figurine; s05 green plate). Provenance UNCERTAIN (AI or art-glass photo). Flag; strong IF cleared. |
| 0186 | предметка/ai+ | 6 | A | AI textures (liquid chrome, metallic lace, ice). STRONG background_texture pack (generated provenance — must label). |
| 0187 | предметка/ai+/+ | 9 | A | AI shadow still-life (pretzel cakes; pouring glass; dried flowers). GORGEOUS. STRONG product/still-life (generated — label). |
| 0188 | предметка/ai+/ai ref | 18 | A | AI chrome sculptures + flowers (s02; s05). STRONG (generated — label). |
| 0189 | схемы/Character Lock — 6 Angles | 20 | A | FLORA Character Lock demo (Black model white set 3 angles; Asian model pink set). GREAT capability example. |
| 0190 | схемы/Cinematic Photography Generator | 5 | A | FLORA movie-still demo (red/blue light lipstick scenes). STRONG capability example. |
| 0191 | схемы/Comp Card | 4 | A | FLORA comp-card demo (blue swim triptych; blue-makeup headshots; video w/ UI). Capability example. |
| 0192 | схемы/Multi Angle Shoot | 4 | A | FLORA multi-angle demo (brunette 4 angles — identity-consistent!). PERFECT capability example. |
| 0193 | схемы/Virtual Try On | 6 | A | FLORA outfit-swap demo (same model 3 outfits). Capability example. |
| 0194 | схемы/замена одежды | 1 | A | 1 video: outfit collage overlay. Minor. |
| 0195 | схемы/замена одежды/AI Pattern Generator | 3 | A | FLORA pattern-apply demo (coast cliffs; black coat → leopard coat, same pose). GREAT demo. |
| 0196 | схемы/предметы | 3 | A | FLORA objects demo (red "water" sunglasses scene). Capability. |
| 0197 | схемы/предметы/Digital Lookbook | 3 | A | Lookbook demo (portrait; s02 red lipstick product still — clean; s03 grid). Capability + product value. |
| 0198 | схемы/свет/Relighting | 6 | A | FLORA relight demo (same face, 5 lighting states + video). PERFECT capability demo. |
| 0199 | схемы/фото линкедин | 6 | A | FLORA LinkedIn-photo demo (black bob grids) w/ @yekaterinab / ybdesign.ai credits (attribution flag). Capability. |
| 0200 | схемы/юджыси/AI UGC Video | 2 | A | UGC demo (green Samba product still; model-holding-shoes video). Capability. |

## 5. Coverage statement

- **200 / 200 contact sheets visually reviewed.** 978 preview slots inspected across the full review. No group skipped; no partial-stop.
- Review ran continuously in one session; this log was written after completing the full pass, together with the selection JSON (which cites exact slots per group).

## 6. Next artifacts

- MASTER-SELECTION.json (group+slot+exact SSD path, roles, families)
- PACK-PROPOSALS.md (6 pack families per RUN.md)
- RIGHTS-REVIEW.md (flags: third-party identities, explicit content, minors-uncertain, trademarks, brand campaigns, celebrity/private-person appearances, chat screenshots, published magazine cover, AI provenance)
- MEDIA-CURATION-REPORT.md (summary + method + verdicts)
