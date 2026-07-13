---
id: ECHAD-012
title: Nederlandse en Engelse inhoudspariteit
phase: expansion
status: ready
priority: P1
depends_on: [ECHAD-001]
owner: codex
human_review_required: true
canonical_content_change: proposal_only
outputs:
  - docs/echad/reports/ECHAD-012-nl-en-parity.md
  - docs/echad/revisions/main-essay/PROPOSALS.md
---

## 1. Doel

Controleer betekenis, nuance, terminologie, routes, metadata, downloads en links tussen NL en EN zonder doctrine zelfstandig te wijzigen.

## 2. Onderzoeksvragen

Waar wijken claimsterkte, modaliteit, tekstverwijzing, voetnoot, definitie of pastorale kwalificatie af? Welke Engelse formulering onthult Nederlandse ambiguïteit? Zijn HTML/PDF en metadata synchroon?

## 3. Live routes en repositorybestanden

Inspecteer alle gepaarde live routes en downloads; vergelijk alle `content/nl/*.md` met `content/en/*.md`, paired pages, metadata, navigation, PDFs.

## 4. Claims

Alle claim-IDs met tweetalige formulering; geen nieuwe inhoudelijke beoordeling buiten bestaande evidence status.

## 5. Vereiste bronnen

Canonieke NL/EN-source, approved proposals, primary-text translation differences, and existing bibliography. New exegesis becomes a new task.

## 6. Methodologische valkuilen

Geen woord-voor-woord-gelijkheid als semantische gelijkheid; geen stil doctrinair herstel; geen PDF-aanname zonder extractie/visuele check.

## 7. Deliverables

Section mapping, terminology table, discrepancy severity, routes/metadata/download/link matrix, and discrete bilingual proposals/blockers.

## 8. Acceptatiecriteria

Alle contentparen gemapt; betekenisverschillen hebben route/regel en actie; English ambiguities teruggekoppeld; content edits blijven proposals.

## 9. Validatiecommando's

`npm test`; `npm run typecheck`; `npm run generate`; interne-linkcheck op `.output/public`; reproduceer woord-/koppenmatrix; `git diff --check`.

## 10. Stopvoorwaarden

Stop bij ontbrekende/ontoegankelijke PDF of wanneer pariteitsfix exegetische keuze vereist; maak dan een blokkade/proposal.

## 11. NL/EN-impact

Dit is de kerntaak: behandel NL als source tenzij `DECISIONS.md` anders zegt; markeer legitieme taalasymmetrie.

## 12. Status- en beslislog

Zet op `review`; update `STATUS.md`, affected claims en terminology/source-language decisions.
