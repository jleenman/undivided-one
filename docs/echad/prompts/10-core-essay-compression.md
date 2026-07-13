---
id: ECHAD-010
title: Compressie van het hoofdessay
phase: expansion
status: ready
priority: P1
depends_on: [ECHAD-002, ECHAD-003, ECHAD-004, ECHAD-005, ECHAD-006, ECHAD-007, ECHAD-008, ECHAD-009]
owner: codex
human_review_required: true
canonical_content_change: proposal_only
outputs:
  - docs/echad/revisions/main-essay/outline.md
  - docs/echad/revisions/main-essay/move-keep-remove.md
  - docs/echad/revisions/main-essay/proposed-nl.md
  - docs/echad/revisions/main-essay/proposed-en.md
  - docs/echad/revisions/main-essay/change-log.md
---

## 1. Doel

Ontwerp een 25–35% korter dragend hoofdessay zonder canonieke bron te vervangen.

## 2. Onderzoeksvragen

Welke claims zijn noodzakelijk voor de these? Wat is duplicatie, woordstudie, historie, tekstkritiek, definitie of bezwaar dat naar subessays moet? Blijft tegenbewijs zichtbaar?

## 3. Live routes en repositorybestanden

Hermeet `/nl/essay`, `/en/essay` en `content/{nl,en}/essay.md`; lees alle ECHAD-002–009-rapporten/proposals en contentarchitectuur.

## 4. Claims

Alle supported/qualified dragende claims; unsupported/contested claims alleen met zichtbare kwalificatie of verplaatsing.

## 5. Vereiste bronnen

Gebruik uitsluitend reeds gecontroleerde evidence uit ECHAD-002–009; nieuw inhoudelijk onderzoek is out-of-scope en wordt een aparte prompt.

## 6. Methodologische valkuilen

Geen nuance schrappen om target te halen; geen detail zonder bestemmingssubessay verwijderen; geen EN-zelfstandige doctrine; geen stilzwijgende proposalbundeling.

## 7. Deliverables

Nieuwe outline, keep/move/remove-matrix, volledige voorgestelde NL Markdown, concept EN mirror, side-by-side wijzigingslog met claim/proposal-links.

## 8. Acceptatiecriteria

NL source target 5,870–6,773 woorden en rendered targetprojectie 8,219–9,483; nooit langer; kern/tegenbewijs/links behouden; beide drafts afzonderlijk reviewbaar; canonieke `content/` ongewijzigd.

## 9. Validatiecommando's

Reproduceer woordtelling; `npm test`; render de concepten via een tijdelijke niet-canonieke check of parsertest; `git diff --check`.

## 10. Stopvoorwaarden

Start niet tenzij ECHAD-002–009 `review` of `done` zijn. Stop als ontbrekend subessaydoel bewijsverlies veroorzaakt of target alleen met doctrinaire verschuiving haalbaar is.

## 11. NL/EN-impact

NL is redactionele bron; EN volgt per sectie en logt iedere niet-letterlijke nuancekeuze.

## 12. Status- en beslislog

Zet op `review`; update `STATUS.md`, `PLANS.md`, architectuur en elke omvang-/structuurbeslissing.
