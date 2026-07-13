---
id: ECHAD-011
title: Informatiearchitectuur voor subessays
phase: expansion
status: ready
priority: P1
depends_on: [ECHAD-001, ECHAD-003]
owner: codex
human_review_required: true
canonical_content_change: allowed_after_approval
outputs:
  - docs/echad/reports/ECHAD-011-information-architecture.md
  - docs/echad/CONTENT-ARCHITECTURE.md
  - docs/echad/revisions/subessay-template.md
---

## 1. Doel

Ontwerp en, alleen na expliciete goedkeuring, implementeer een schaalbare tweetalige Nuxt-onderzoeksbibliotheek.

## 2. Onderzoeksvragen

Welke routes/contentconventies passen bij huidige Nuxt? Hoe worden Methodologie, Tekststudies, Begrippen, Historische context, Bezwaren, Modellen, Bronnen en Changelog vindbaar en teruggelinkt?

## 3. Live routes en repositorybestanden

Inspecteer navigatie en alle live hoofdroutes; lees `pages/`, `components/ArticleRenderer.vue`, `utils/markdown.ts`, `content/`, tests en huidige contentarchitectuur.

## 4. Claims

Geen nieuwe theologische conclusie; gebruik claim-IDs als metadata/crosslinks.

## 5. Vereiste bronnen

Repositoryarchitectuur, WCAG/SEO-routingsprincipes, en bestaande goedgekeurde researchoutputs. Geen inhoudelijke secundaire bron vereist voor puur technisch ontwerp.

## 6. Methodologische valkuilen

Geen parallel docs/site-systeem; geen harde links zonder taalspiegel; geen status “stabiel” zonder evidence review; geen implementatie voor architectuurgoedkeuring.

## 7. Deliverables

Route/content-schema, metadata contract, navigation/backlink model, migration plan, template met summary/status/last-reviewed/primary texts/observations/alternatives/confidence/bibliography/backlinks.

## 8. Acceptatiecriteria

Past in Nuxt static generation; beide talen; minstens één voorbeeld zonder nieuwe doctrine; routes/testplan/a11y/SEO beschreven; implementatie apart diffbaar indien goedgekeurd.

## 9. Validatiecommando's

Bij ontwerp: `npm test`, `git diff --check`. Bij goedgekeurde implementatie: ook `npm run typecheck`, `npm run generate` en interne-linkcheck.

## 10. Stopvoorwaarden

Stop voor code/contentroute-writes zonder expliciete menselijke architectuurgoedkeuring of bij conflict met ECHAD-010 bestemmingen.

## 11. NL/EN-impact

Elke route/metadata heeft taalspiegel en canonical/hreflang-plan; Nederlands blijft redactionele bron.

## 12. Status- en beslislog

Zet ontwerp op `review`; update `STATUS.md`, `CONTENT-ARCHITECTURE.md` en architectuurbeslissingen.
