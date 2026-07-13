---
id: ECHAD-002
title: Sjemá, echad en yachid
phase: initial
status: review
priority: P0
depends_on: []
owner: codex
human_review_required: true
canonical_content_change: proposal_only
outputs:
  - docs/echad/reports/2026-07-12-echad-yachid.md
  - docs/echad/revisions/main-essay/PROPOSALS.md
  - docs/echad/CLAIM-REGISTER.md
---

## 1. Doel

Toets Deut 6:4 en corrigeer de publieke `echad`/`yachid`-claim via afzonderlijke NL/EN-voorstellen.

## 2. Onderzoeksvragen

Wat zijn tekst, syntaxis, context en semantisch bereik? Kan `echad` numeriek zijn? Wat betekent `yachid`? Hoe wegen “JHWH is één”, “JHWH alleen” en “één JHWH”? Wat zegt het vers wel/niet over Gods innerlijke structuur?

## 3. Live routes en repositorybestanden

Inspecteer de zes essay/argument/confession-routes en `content/{nl,en}/{essay,argument,confession}.md`; gebruik C-001/C-008.

## 4. Claims

C-001 primair; C-008 alleen waar modelnaam en lexicale betekenis worden verward.

## 5. Vereiste bronnen

Deut 6:4–15; Gen 1:5; Gen 22:2,12,16; Zech 14:9; Mark 12:29–34; BHS/WLC; BDB plus een modern lexicon indien toegankelijk; Tigay, Janzen, Block; NRSVue/JPS-noten.

## 6. Methodologische valkuilen

Geen “compound unity” of “identity” als woordenboekbetekenis; geen ontologie uit één telwoord; vertaalambiguïteit niet wegpoetsen; bronpaywalls eerlijk melden.

## 7. Deliverables

Evidenceblok met observatie/non-observatie/alternatieven/weging/conclusie; afzonderlijke proposals voor essay, argument en confession met NL/EN-vervangtekst.

## 8. Acceptatiecriteria

Lexicale fout is expliciet aangetoond; context en vertaalopties zijn eerlijk; sterke trinitarische en unitarische/Oneness alternatieven staan; confidence en falsificatiecriteria zijn opgenomen; canonieke Markdown blijft ongewijzigd.

## 9. Validatiecommando's

`npm test`; `rg -n "jachid|yachid|not.*numer|niet.*getal|identiteitscategorie" content docs/echad`; `git diff --check`.

## 10. Stopvoorwaarden

Stop bij ontbrekende primaire tekst/lexiconverificatie of als een voorstel onbedoeld andere claims oplost.

## 11. NL/EN-impact

Lever semantisch equivalente teksten en noteer waar “alone/one” of “enige/één/alleen” niet één-op-één correspondeert.

## 12. Status- en beslislog

Huidige dry-run staat op `review`; update C-001, `STATUS.md`, D-004 en proposalstatussen pas na menselijke beoordeling.
