---
name: echad-research
description: Conduct bounded, auditable biblical-theological research and editorial proposal work for the Undivided One/Echad program. Use for any task that evaluates or edits claims about echad, the Shema, divine identity, Father/Son distinction, Spirit agency, key-text exegesis, historical framing, main-essay compression, subessays, confessional text, argument pages, or Dutch/English theological parity in this repository.
---

# Echad research workflow

Perform exactly one selected task per run.

1. Read `AGENTS.md`, `PROMPT.md`, `PLANS.md`, `IMPLEMENT.md`, `docs/echad/STATUS.md`, and the chosen prompt completely.
2. Read [references/methodology.md](references/methodology.md), [references/source-policy.md](references/source-policy.md), and use [references/prompt-template.md](references/prompt-template.md) when creating a task.
3. Inspect the prompt's relevant live NL/EN routes on `https://undivided.one`; record access date, title, and route. Treat live content as the public baseline and the repository as the change environment. Log discrepancies.
4. Locate or add every examined claim in `docs/echad/CLAIM-REGISTER.md`.
5. Structure research as: explicit observations; what is not explicit; historical/literary frame; interpretations; strongest alternative reading; evidence weighting; provisional conclusion and `hoog`/`middel`/`laag` confidence.
6. Document uncertainties and full source metadata. Apply equal evidential standards to the Echad model and alternatives.
7. Modify only the prompt's declared outputs plus required status/decision/claim registers. Put each substantive main-essay change in a separate `proposed` block in `docs/echad/revisions/main-essay/PROPOSALS.md`.
8. Run prompt-specific content checks and applicable build, typecheck, lint, and tests. Record exact results and environment limitations.
9. Update the task status, `docs/echad/STATUS.md`, and `docs/echad/DECISIONS.md` before stopping.
10. Never publish, deploy, merge, or apply an unapproved canonical proposal. Stop on source ambiguity, incomplete dependencies, conflicting queue PRs, missing load-bearing evidence, or unexplained validation failure.
