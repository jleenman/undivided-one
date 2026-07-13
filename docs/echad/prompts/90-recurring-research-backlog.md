---
id: ECHAD-090
title: Doorlopende onderzoeksbacklog
phase: recurring
status: ready
priority: P2
depends_on: [ECHAD-001]
owner: codex
human_review_required: true
canonical_content_change: none
outputs:
  - docs/echad/reports/ECHAD-090-backlog.md
  - docs/echad/prompts/
---

## 1. Doel

Behoud een geprioriteerde backlog en maak zelfstandige prompts zodra minder dan drie uitvoerbare `ready` onderzoekstaken overblijven.

## 2. Onderzoeksvragen

Welke evidence-gaten blokkeren kernclaims/compressie? Welke subessay levert hoogste kenniswinst? Zijn scope, bronnen en dependencies in één run haalbaar?

## 3. Live routes en repositorybestanden

Inspecteer relevante live routes voor kandidaatclaims; lees alle promptfrontmatter, `STATUS.md`, claimregister, reports, proposals en contentarchitectuur.

## 4. Claims

Koppel elke nieuwe prompt aan bestaande claim-ID's of voeg een voorlopige claim toe zonder inhoudelijk oordeel.

## 5. Vereiste bronnen

Identificeer per prompt concrete primaire teksten, kritische hulpmiddelen en minstens één type erkende secundaire bron; voer onderzoek nog niet uit.

## 6. Methodologische valkuilen

Geen megataak; geen duplicaat; geen nieuwe prompt om ready-count kunstmatig te vullen; geen dependency omzeilen.

## 7. Deliverables

Prioriteitenrapport en, indien nodig, afzonderlijke prompts over o.a. Shema/Mark 12, Naamdrager, JHWH-verschijningen, Wijsheid/Woord, John 1:1, `ego eimi`, JHWH-teksten, `proskuneō`, 1 Cor 8:6, Phil 2, Vader-Zoon, Spirit agency, Revelation, monarchianism/Oneness, Nicaea/Constantinople, Second Temple monotheism, identity/ontology, pastoral effects.

## 8. Acceptatiecriteria

Minstens drie werkelijk executable `ready` research prompts remain; new prompts have full required frontmatter/12 sections, unique IDs, bounded deliverables, dependencies, source plan, and NL/EN instruction.

## 9. Validatiecommando's

Frontmatter/ID/status scan with `rg`; dependency cycle/manual consistency check; `git diff --check`; `npm test` only if code/content parser contracts changed.

## 10. Stopvoorwaarden

Stop if candidate duplicates existing work, has unavailable load-bearing sources, or cannot finish in one run.

## 11. NL/EN-impact

Every research prompt must state how findings affect both languages even when research report is one language.

## 12. Status- en beslislog

Return ECHAD-090 to `ready` after each maintenance run; update `STATUS.md`, backlog report, and decision log for priority/dependency changes.
