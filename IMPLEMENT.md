# Echad runbook

1. Work in one isolated worktree/branch. Inspect `git status`; preserve user changes. Check for an open conflicting draft queue PR.
2. Invoke `$echad-research`. Read `AGENTS.md`, `PROMPT.md`, `PLANS.md`, this file, `docs/echad/STATUS.md`, and exactly one selected prompt.
3. Select the highest-priority `ready` task whose dependencies are `review` or `done`. Do not combine tasks.
4. Inspect every relevant live NL/EN route and record route, title, date, and public/local discrepancy.
5. Locate or add each claim in `docs/echad/CLAIM-REGISTER.md`.
6. Research in order: explicit observations; what is not explicit; context/genre; interpretations; strongest alternatives; evidence weighting; provisional conclusion with confidence.
7. Change only declared outputs plus required registers. Put every substantive canonical main-essay change in `PROPOSALS.md` as a separate `proposed` item.
8. Record full source metadata and access dates. Paraphrase copyrighted sources.
9. Run specified validation. Investigate the first unexplained failure; stop before unrelated edits or unsafe workarounds.
10. Update task frontmatter/status, `STATUS.md`, claim statuses, and `DECISIONS.md`; state NL/EN impact.
11. Review the diff and create a draft PR when available. Never merge, deploy, publish, or implement an unapproved proposal.

## Stop conditions

Stop and mark `blocked` when public/local sources cannot be identified, primary evidence is unavailable, a dependency is incomplete, a conflicting queue PR exists, scope would expand, or required validation cannot be meaningfully run. Document the exact blocker and safe next action.
