# ZAI-M001 — Rights & Provenance Review

Per RUN.md step 8 ("flag questionable provenance/rights rather than assuming publication permission") and `04-MEDIA/MEDIA-POLICY.md` / `ATLAS-PUBLICATION-GATE.md`.

**Nothing in this review grants publication permission.** All items remain Class A (FOUNDER_MEDIA), Class B (REFERENCE_MEDIA) or Class C (GENERATED_OR_DEMO_MEDIA) with the rights status listed below. Founder confirmation is required before any public-facing or commercial use.

---

## 1. Provenance classes found in the atlas

| Class | Groups | Status |
|---|---|---|
| A. FOUNDER_MEDIA (founder as subject/author) | `3/01_MAIN_CHARACTER` (G0006–0021), `4/01–4/16` (G0025–0160) | Usable per founder's stated rights; sensitive subsets flagged below |
| B. REFERENCE_MEDIA (third-party) | G0001–0005, G0022–0023, G0136, G0141, G0161–0175, G0176–0184 | Reference-only; never present as Influencer OS output |
| C. GENERATED_OR_DEMO_MEDIA | G0186–0188 (`предметка/ai+`), G0189–0200 (FLORA) | Provenance = generated; must state provider/tool (FLORA; credits inside G0199: @yekaterinab, ybdesign.ai, Kate Burmatnova) |

## 2. Identity & consent

- **Main identity:** founder-main-01 (evidence: G0084/s03 contact name; G0131/s03 `[REDACTED_HANDLE]`; G0154/s03 `[REDACTED_DOMAIN]`; G0027 comp card "[REDACTED_NAME]").
- **Third-party individuals appearing in otherwise-founder groups** (need founder confirmation of their consent before use): partner/companion (G0057? no — specifically G0067/s03, G0063/s02, G0071 event crowd, G0070/s03–s05, G0148/s01–s04 incl. a recognizable celebrity, G0149/s03,s05, G0150/s01,s03, G0081/s01, G0132/s02, G0160/s01, G0151–0153 partner, G0045, G0046, G0029 crew, G0028 photographer, G0075/s04).
- **Hard exclusions (identity/rights):** all named-handle groups G0161–G0175 — these are third-party creators' social content; G0168 contains explicit full nudity; G0169 shows a very young-looking subject (age unverified) — excluded pending founder/legal check.
- **Privacy-sensitive artifacts:** chat screenshots (G0173/s03 — profanity + a political figure's contact name; G0173/s05; G0154 stories) — excluded; personal medical scene (G0124/s04 IV-drip) — excluded.

## 3. Minors / family

- Child appears in G0063/s06, G0098/s01, G0113/s02, G0114/s04, G0118–G0123 (family tree), G0120, G0121, G0122.
- Default rule: **child-privacy hold**. Family narrative packs (if ever wanted) require explicit founder decision per item; not included in the master selection by default (exception: none selected).

## 4. Nudity / sexual content

| Tier | Groups/slots | Handling |
|---|---|---|
| Explicit | G0168 | EXCLUDED entirely |
| Art-nude (paintings, founder's own art) | G0138 (+ G0139, G0140 painterly) | Hold for classification; high artistic value |
| Implied/topless-adjacent photo | G0041–0042, G0089/s01–s02,s05, G0105/s01–s03, G0126/s01, G0127, G0106, G0012/0013 subsets | Excluded from default packs; possible "sensitive editorial" pack only with explicit founder sign-off |
| Lingerie/swim (fashion context) | widely present (e.g., G0014–0019, G0039, G0085–0107) | Selected items are fashion-framed; fine for experiment use per founder media class A |

## 5. Trademarks / brands visible in selected frames

| Brand | Where | Handling |
|---|---|---|
| CHANEL | G0076/s01–s02 (logo sweater also s03/s05 unselected) | Flag ™; ok for private experiment reference, avoid public/commercial hero use |
| Rolls-Royce | G0083/s02,s05 | Flag ™; same rule |
| GUCCI (store sign) | G0109/s01,s04 | Ambient city texture; low risk but noted |
| Sol de Janeiro | G0088/s01–s03 (product campaign w/ credit line) | Founder campaign? Requires confirmation before reuse |
| Harper's Bazaar | G0084/s02 (published cover mockup), s03 contact | PUBLISHED third-party magazine layout — do not redistribute cover; s01/s05 are shoot frames |
| Prada | G0054/s04 (unselected) | n/a |
| adidas (Samba "STAR" shoe) | G0200/s01 | FLORA UGC demo; demo-only |
| TSUM | G0071/s04 seat card (name visible) | Not selected |
| LV trunk | G0057/s03 (monogram trunk as prop) | Flag ™ prop; acceptable as prop, noted |
| SEEK.SENSE yoga mat | G0156/s01, G0158 | Ambient prop; noted |

## 6. AI provenance & attribution

- `предметка/ai+` stills (G0186–0188) and FLORA demos (G0189–0200) must be presented as **generated/demo**, per MEDIA-POLICY provenance UI rules.
- G0199 contains FLORA × YB Design credits (@yekaterinab / ybdesign.ai / Kate Burmatnova) — keep attribution if those frames are used.
- Product truth reminder (from `02-SOURCE-TRUTH/PRODUCT-TRUTH.md`): never claim guaranteed identity consistency; use "drift reduction / recognizable continuity" language. Generated packs must not be presented as founder-original photography.

## 7. Atlas publication gate (context)

- The atlas itself is already public on GitHub at the pinned commit. Per `ATLAS-PUBLICATION-GATE.md`, full-resolution pack extraction should still be limited to selected media with explicit provenance/rights metadata — this document + MASTER-SELECTION.json provide that metadata layer.

## 8. Summary verdict

**Final status: `MEDIA_CURATION_COMPLETE_WITH_RIGHTS_REVIEW`** — curation finished across all 200 groups; a rights-review layer was produced because multiple flagged classes (third-party identities, published magazine cover, brand campaigns/trademarks, minors in family tree, sensitive content tiers, AI provenance) require founder decisions before public/commercial deployment.
