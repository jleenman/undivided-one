# Echad Research Queue

Invoke `$echad-research` explicitly. Work only in the new isolated worktree for `/Users/jleenman/GitHub/undivided-one`. Read `AGENTS.md`, `PROMPT.md`, `PLANS.md`, `IMPLEMENT.md`, `docs/echad/STATUS.md`, and all prompt frontmatter. Before changing files, inspect open GitHub draft PRs created by this queue. If an earlier queue PR remains open, if GitHub state cannot be read, or if the checkout is not current Nuxt `main`, stop and report human review; do not start a conflicting task.

Inspect the relevant live NL/EN pages. Select exactly one highest-priority prompt with `status: ready` whose dependencies are `review` or `done` (priority P0→P2, then numeric ID). Execute only that prompt and only its declared outputs plus required status/claim/decision registers. Apply observation/non-observation/interpretation/steelman/source/confidence rules. Substantive canonical content remains proposal-only unless an individual proposal is already `approved` and the selected prompt explicitly permits implementation.

Run exact prompt validation plus `npm test`, `npm run typecheck`, and `npm run generate` when applicable. Update task status, `STATUS.md`, claims and decisions. Create a scoped branch and draft PR; never merge, deploy, publish, push to `main`, or start a second task. Stop on any safety/source/validation condition.
