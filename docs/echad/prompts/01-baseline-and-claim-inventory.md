---
id: ECHAD-001
title: Baseline en claiminventaris
phase: initial
status: ready
priority: P0
depends_on: []
owner: codex
human_review_required: true
canonical_content_change: none
outputs:
  - docs/echad/reports/ECHAD-001-claim-inventory.md
  - docs/echad/CLAIM-REGISTER.md
---

## 1. Doel

Maak een volledige, citeerbare claimmatrix van het actuele hoofdessay, de argumentpagina en geloofsbelijdenis, zonder te herschrijven.

## 2. Onderzoeksvragen

- Welke expliciete en impliciete claims dragen elk hoofdstuk en elk belijdenisartikel?
- Is elke claim lexicaal, grammaticaal, tekstkritisch, exegetisch, historisch, filosofisch of systematisch?
- Welke tekstdata, interpretatieve stap, alternatieven, bewijsstatus en risico horen erbij?

## 3. Live routes en repositorybestanden

Inspecteer `/nl/essay`, `/en/essay`, `/nl/argument`, `/en/argument`, `/nl/confession`, `/en/confession`; vergelijk met `content/{nl,en}/{essay,argument,confession}.md`, baseline-audit en huidige claimregister.

## 4. Claims

Alle bestaande C-001–C-012 plus iedere ontbrekende dragende claim; behoud stabiele IDs.

## 5. Vereiste bronnen

Deze taak inventariseert primair de canonieke tekst. Controleer geciteerde primaire passages op referentie en noteer bestaande secundaire bronnen, maar voer geen volledige exegetische uitspraak vooruit.

## 6. Methodologische valkuilen

Verwar retoriek niet met bewijs; splits samengestelde claims; label impliciete reconstructies; behandel voetnoten en NL/EN-afwijkingen afzonderlijk.

## 7. Deliverables

Rapport met matrix per locatie en een bijgewerkt claimregister met alle verplichte velden. Geen proposals of canonieke edits.

## 8. Acceptatiecriteria

Elke inhoudelijke sectie/elk belijdenisartikel is gedekt; claims zijn atomair, bron-lokaliseerbaar, getypeerd, risicogescoord en aan vervolgtaken gekoppeld; live/repo-afwijkingen zijn expliciet.

## 9. Validatiecommando's

`npm test`; een gerichte `rg`-controle op alle koppen/claimlocaties; `git diff --check`.

## 10. Stopvoorwaarden

Stop bij live/source-divergentie die canonieke formulering onduidelijk maakt, ontbrekende route, of onleesbare content. Herschrijf niets.

## 11. NL/EN-impact

Inventariseer beide talen; markeer betekenisverschillen en bepaal niet stilzwijgend dat één vertaling leidend is.

## 12. Status- en beslislog

Zet deze prompt op `review`, update `STATUS.md` en claimstatussen, en log alleen nieuwe scope-/canonbeslissingen in `DECISIONS.md`.
