---
id: ECHAD-013
title: Websitekwaliteit, toegankelijkheid en SEO
phase: expansion
status: ready
priority: P1
depends_on: []
owner: codex
human_review_required: true
canonical_content_change: none
outputs:
  - docs/echad/reports/ECHAD-013-site-qa.md
---

## 1. Doel

Audit en corrigeer alleen veilige technische/redactionele siteproblemen; theologische afwijkingen worden proposals of blockers.

## 2. Onderzoeksvragen

Slagen test/typecheck/generate? Zijn links, taalwissels, canonical/hreflang, sitemap, metadata, headings, keyboard, zoom, contrast, mobile, PDFs en static routes correct?

## 3. Live routes en repositorybestanden

Inspecteer alle live routes/downloads; audit `nuxt.config.ts`, `pages/`, `components/`, `assets/css`, `public/`, `.github/workflows/pages.yml`, tests and generated `.output/public`.

## 4. Claims

Geen theologische claimwijziging; contentproblemen verwijzen naar claimregister/proposal.

## 5. Vereiste bronnen

WCAG 2.2, Nuxt official docs, GitHub Pages docs, HTML/SEO standards; only primary official technical documentation.

## 6. Methodologische valkuilen

Geen theology-as-copy-edit; geen success claim zonder live/generated check; geen automatische deploy; geen contrast alleen op visuele indruk.

## 7. Deliverables

QA report with severity/reproduction/evidence; safe scoped fixes only if clearly authorized by `none` theological impact; add focused tests for fixed regressions.

## 8. Acceptatiecriteria

All requested categories assessed; commands/results exact; links/status verified; fixes do not alter theology; remaining blockers actionable.

## 9. Validatiecommando's

`npm ci` if needed; `npm test`; `npm run typecheck`; `npm run generate`; static link checker; browser keyboard/mobile/contrast checks; PDF open/render checks; `git diff --check`.

## 10. Stopvoorwaarden

Stop before external publish/deploy, destructive PDF replacement, or a fix whose theological meaning is uncertain.

## 11. NL/EN-impact

Every technical fix is tested on paired routes; content discrepancies become ECHAD-012/proposals.

## 12. Status- en beslislog

Zet op `review`; update `STATUS.md`, technical decisions, and AGENTS if a reusable QA gap is found.
