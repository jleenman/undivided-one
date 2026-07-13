# Decision log

## D-001 — Proposal gate for theology

- Date: 2026-07-12
- Choice: substantive main-essay, argument, and confession changes remain `proposed` until explicit human approval.
- Alternatives: edit live-equivalent copy directly; postpone all drafting.
- Reason: allows evidence-backed progress without uncontrolled doctrinal drift.
- Consequence: ECHAD-002 produced proposals only.

## D-002 — Public baseline measurement

- Date: 2026-07-12
- Choice: count rendered words in the live `<main>` content, including displayed verse/tool UI and table of contents, consistently across NL and EN.
- Alternatives: count unavailable source Markdown; manually strip all interface text.
- Reason: the public source files are absent from this repository, so rendered output is the only reproducible current baseline.
- Consequence: compression targets use 12,644 NL words; a future source-level baseline may supersede this through a logged decision.

## D-003 — Nuxt main is the implementation source

- Date: 2026-07-12
- Choice: after user direction and `git fetch`, base the program on current `origin/main` (`d3ade65`), which contains the static Nuxt implementation and canonical Markdown mirrored by the live site.
- Alternatives: continue from the obsolete local Payload checkout.
- Reason: the user explicitly designated Nuxt; origin contains matching routes, content, PDFs, and GitHub Pages deployment.
- Consequence: bootstrap moved safely to `codex/echad-research-program`; no canonical content changed.

## D-004 — ECHAD-002 lexical correction

- Date: 2026-07-12
- Choice: reject the `echad`/`yachid` dichotomy as lexical evidence; present Deut 6:4's serious translation options and bounded theological yield.
- Alternatives: retain the current wording; claim `echad` encodes compound or identity-only unity.
- Reason: primary usage and standard lexica identify `echad` as the ordinary numeral “one”; `yachid` denotes only/unique/solitary.
- Consequence: P-001–P-004 await human review.

## D-005 — Remove obsolete Payload source residue

- Date: 2026-07-12
- Choice: remove ten tracked Payload/React files under `src/` from the Nuxt review branch.
- Alternatives: exclude `src/` in TypeScript config; add unused Payload/React dependencies; leave typecheck red.
- Reason: user explicitly designated Nuxt as the sole basis; the files are unreachable from the Nuxt implementation and caused all typecheck errors.
- Consequence: `npm run typecheck` passes without reintroducing obsolete architecture or hiding future Nuxt errors.
