---
id: ECHAD-009
title: Exegetische audit van sleutelteksten
phase: initial
status: ready
priority: P0
depends_on: [ECHAD-001, ECHAD-003]
owner: codex
human_review_required: true
canonical_content_change: proposal_only
outputs:
  - docs/echad/reports/ECHAD-009-key-texts.md
  - docs/echad/revisions/main-essay/PROPOSALS.md
  - docs/echad/CLAIM-REGISTER.md
---

## 1. Doel

Maak per sleuteltekst een afzonderlijk evidenceblok en corrigeer overbelasting van grammatica, toehoordersreacties, kopiistenmotieven en ruimtelijke beelden.

## 2. Onderzoeksvragen

Audit John 8:58; 10:30–38; 14:8–11; 17; 2 Cor 3:17; Rom 8:9–11; Jude 5; Rev 1:1; 4–5 inclusief 5:6; 22:3–4; 1 John 5:7–8. Welke tekst/variant/syntaxis is expliciet, wat niet, en welke lezing weegt waarom?

## 3. Live routes en repositorybestanden

Inspecteer beide essays/arguments/confessions; map elke passage naar exacte regels in `content/{nl,en}/essay.md` en footnotes.

## 4. Claims

C-002, C-003, C-009–C-012 plus tekstclaims uit ECHAD-001.

## 5. Vereiste bronnen

NA28/ECM/UBS apparatus waar relevant, kritische Griekse tekst, gezaghebbende grammatica/lexica, peer-reviewed textual criticism (Jude/Comma) en erkende commentaren per corpus.

## 6. Methodologische valkuilen

Geen publiekreactie als zelfstandig ontologisch bewijs; geen genitiefnaam zonder syntaxis; geen apocalyptische locatie als foto; geen scribal motive zonder bewijs; Comma niet generaliseren.

## 7. Deliverables

Minstens elf zelfstandige evidenceblokken met tekst/variant, observatie, non-observatie, context, alternatieven, weging, conclusie/confidence; losse proposals.

## 8. Acceptatiecriteria

Elke vereiste tekst is gedekt; varianten en apparatus-access zijn transparant; ruimtelijke/retorische bewijzen zijn begrensd; sterke alternatieven staan per blok.

## 9. Validatiecommando's

`npm test`; gerichte `rg` op alle referenties en sleuteltermen in NL/EN; `git diff --check`.

## 10. Stopvoorwaarden

Stop/markeer het betreffende blok bij ontbrekende kritische apparatusdata; vul geen variant of motief uit geheugen in.

## 11. NL/EN-impact

Proposals spiegelen exact; behoud Griekse termen/transliteratie consistent en documenteer vertaalverschillen.

## 12. Status- en beslislog

Zet op `review`; update C-002/C-003/C-009–C-012, `STATUS.md` en tekstkritische beslissingen.
