---
id: ECHAD-006
title: Hebreeuws en Grieks historisch nuanceren
phase: initial
status: ready
priority: P0
depends_on: [ECHAD-001, ECHAD-003]
owner: codex
human_review_required: true
canonical_content_change: proposal_only
outputs:
  - docs/echad/reports/ECHAD-006-historical-framing.md
  - docs/echad/revisions/main-essay/PROPOSALS.md
  - docs/echad/CLAIM-REGISTER.md
---

## 1. Doel

Vervang de binaire Hebreeuws-relationeel/Grieks-analytisch-tegenstelling door controleerbare historische beschrijving.

## 2. Onderzoeksvragen

Hoe divers zijn hellenistisch jodendom, Tweede-Tempelstromingen, Koine NT, klassieke filosofieën en vroege kerk? Welke concrete verschuivingen leiden van bijbelse identiteitstaal naar conciliaire ontologische terminologie?

## 3. Live routes en repositorybestanden

Inspecteer beide essays; focus `content/{nl,en}/essay.md` §5 en relevante voetnoten.

## 4. Claims

C-005, C-006 en historische subclaims uit ECHAD-001.

## 5. Vereiste bronnen

Selecties uit LXX, Philo, Josephus, NT, vroege creeds/patristiek; peer-reviewed Second Temple, Hellenism, philosophy, and conciliar histories; citeer primaire concilietekst.

## 6. Methodologische valkuilen

Geen taal = wereldbeeld-essentialisme; geen genealogische drogreden; geen “Grieks” als enkelvoud; geen traditie als voorafgaande norm.

## 7. Deliverables

Claimaudit, gedateerde historische tijdlijn, alternatief verklaringsmodel en afzonderlijke NL/EN-proposals voor §5.

## 8. Acceptatiecriteria

Iedere generalisatie heeft afbakening/bron; joodse en Griekse interne diversiteit staat zichtbaar; verschil tussen terminologie, concept en causatie is helder.

## 9. Validatiecommando's

`npm test`; `rg -n -i "Grieks|Hebreeuws|Greek|Hebrew" content/{nl,en}/essay.md`; `git diff --check`.

## 10. Stopvoorwaarden

Stop als alleen populaire contrastliteratuur beschikbaar is of als de scope naar een volledige kerkgeschiedenis groeit.

## 11. NL/EN-impact

Spiegel periodisering en begrippen; noteer waar Engelse vaktermen een Nederlandse generalisatie verhullen.

## 12. Status- en beslislog

Zet op `review`; update C-005/C-006, `STATUS.md`, tijdlijn-/terminologiebeslissingen.
