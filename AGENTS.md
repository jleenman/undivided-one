# Undivided One repository rules

## Project

This is the canonical static bilingual Nuxt 3 implementation for `undivided.one`. Content lives in `content/nl/` and `content/en/`; routes live in `pages/`; PDFs live in `public/downloads/`; GitHub Pages deploys `.output/public` from `main` via `.github/workflows/pages.yml`.

Use npm and the committed `package-lock.json`:

- `npm ci`
- `npm test`
- `npm run typecheck`
- `npm run generate`

Do not reintroduce Payload, a CMS, a database, pnpm, or server-only runtime assumptions unless the user explicitly changes the architecture.

## Echad research guardrails

- For theological/content work, invoke `$echad-research` and read `PROMPT.md`, `PLANS.md`, `IMPLEMENT.md`, the selected `docs/echad/prompts/*.md`, and `.agents/skills/echad-research/SKILL.md`.
- Inspect the relevant live NL/EN routes before every content task; record route and access date. Treat live text as the public baseline and repository Markdown as the implementation source. Log any difference.
- Separate explicit textual observation, non-observation, interpretations, evidence weighting, and provisional conclusion.
- Apply the same burden of proof to Echad, trinitarian, unitarian, and Oneness/modalist claims. Use confidence `hoog`, `middel`, or `laag`.
- Put substantive main-essay changes in `docs/echad/revisions/main-essay/PROPOSALS.md`; do not edit canonical Markdown until the individual proposal is explicitly approved.
- Preserve NL/EN doctrinal parity. Dutch is the editorial source unless a decision explicitly says otherwise.
- Use one isolated task per branch/worktree. Stop on unresolved source ambiguity, missing primary evidence, failing validation, or an open conflicting queue PR.
- Never auto-publish, merge, deploy, or mark proposals implemented.

## Nuxt/content safety

- Keep route metadata, canonical URLs, hreflang, navigation, PDFs, and Markdown mirrors synchronized.
- A theological conclusion may not be changed under “copy edit” or technical QA.
- Run `npm test`, `npm run typecheck`, and `npm run generate` after code or canonical-content changes; inspect generated output for route/link changes.
- Update `AGENTS.md` when a reusable process gap is discovered.

## Living project notes

- 2026-07-12: Established the Echad research program and confirmed `origin/main` is the canonical Nuxt/static-site basis. The earlier local Payload checkout was obsolete and must not guide future implementation.
- 2026-07-12: Removed ten tracked Payload/React residue files under `src/` that Nuxt typecheck still discovered. When completing an architecture replacement, verify obsolete tracked source trees are removed, not merely unused at runtime.
