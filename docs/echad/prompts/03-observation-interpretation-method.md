---
id: ECHAD-003
title: Observatie versus interpretatie
phase: initial
status: ready
priority: P0
depends_on: [ECHAD-001]
owner: codex
human_review_required: true
canonical_content_change: proposal_only
outputs:
  - docs/echad/reports/ECHAD-003-method-audit.md
  - docs/echad/revisions/methodology-page.md
  - docs/echad/revisions/subessay-template.md
  - docs/echad/revisions/main-essay/PROPOSALS.md
---

## 1. Doel

Audit absolute formuleringen en ontwerp een zichtbare methode plus herbruikbaar subessayformat.

## 2. Onderzoeksvragen

Waar staan equivalenten van “geen ruimte”, “onontkoombaar”, “alleen denkbaar”, “de Schrift vraagt niet”? Welke observatie ondersteunt ze, welk alternatief wordt uitgesloten, en met welk recht? Hoe wordt de vijfdelige methode zichtbaar voor lezers?

## 3. Live routes en repositorybestanden

Inspecteer alle essay-, argument- en confession-routes; zoek de corresponderende `content/`-Markdown; lees claimregister en ECHAD-001.

## 4. Claims

Alle ECHAD-001-claims met absolute/modale taal, minimaal C-002, C-003, C-006, C-007, C-009–C-011.

## 5. Vereiste bronnen

Primaire passages achter elke geselecteerde overclaim; erkende exegetische methodewerken en relevante grammatici/commentaren, volledig gebibliografeerd.

## 6. Methodologische valkuilen

Vervang niet elk standpunt door vaagheid; onderscheid hoge confidence van retorische zekerheid; maak methodologie geen Echad-privilege.

## 7. Deliverables

Auditlijst, concept methodologiepagina, subessaytemplate (observatie; wat niet staat; interpretaties; weging; voorlopige conclusie), en losse herformuleringsvoorstellen.

## 8. Acceptatiecriteria

Alle absolute formuleringen zijn vindbaar met route/regel; minstens de belangrijkste overclaims hebben concrete NL/EN-voorstellen; template bevat bronnen/confidence/falsificatie.

## 9. Validatiecommando's

`rg -n -i "geen ruimte|onontkoombaar|alleen denkbaar|de Schrift vraagt niet|no room|inevitable|only conceivable|Scripture does not ask" content`; `npm test`; `git diff --check`.

## 10. Stopvoorwaarden

Stop als ECHAD-001 niet minstens `review` is of als de taak een volledige exegetische oplossing van een andere prompt vereist.

## 11. NL/EN-impact

Audit beide talen; Engels kan verborgen modaliteit in NL blootleggen. Leg niet-équivalente zekerheid expliciet vast.

## 12. Status- en beslislog

Zet op `review`; update `STATUS.md`, relevante claims en alleen structurele methodebeslissingen in `DECISIONS.md`.
