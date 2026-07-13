# Echad task queue

Run one prompt per isolated branch/worktree with `$echad-research` and `IMPLEMENT.md`. Required frontmatter keys are `id`, `title`, `phase`, `status`, `priority`, `depends_on`, `owner`, `human_review_required`, `canonical_content_change`, and `outputs`.

Queue rule: choose the highest-priority `ready` task whose dependencies are `review` or `done`; ties use numeric ID. `review` means deliverables exist but need human judgment; only a human may move proposal-bearing work to `done` or approve canonical changes.

Every prompt below is independently executable and declares exact output scope, evidence requirements, validation, stop conditions, NL/EN impact, and register updates.
