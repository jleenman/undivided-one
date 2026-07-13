# Automations

Project: `/Users/jleenman/GitHub/undivided-one`. Every job runs in a new Codex Git worktree, creates/updates one isolated branch and (when GitHub is reachable) a **draft** PR, and may never merge, publish, deploy, push to `main`, or bypass human proposal approval.

## Manual queue-runner dry-run — 2026-07-12

The frontmatter queue was inspected after bootstrap creation. Highest-priority dependency-satisfied `ready` task is **ECHAD-001** (P0, no dependencies). ECHAD-002 was executed only because the bootstrap explicitly required that dry-run and is now `review`. The open-PR preflight could not initially complete because GitHub API connectivity failed; every scheduled prompt therefore begins with an explicit open-draft-PR guard and must stop if it cannot establish safe state.

## A — Echad Research Queue

- Schedule: Tuesday 06:30, Europe/Amsterdam
- RRULE: `RRULE:FREQ=WEEKLY;BYDAY=TU;BYHOUR=6;BYMINUTE=30`
- Environment: new isolated worktree
- Prompt file: `docs/echad/automations/echad-research-queue.md`
- Permissions: repository read/write in worktree; live read; GitHub draft branch/PR create/update; no merge/deploy/publish.
- Automation ID/status: `echad-research-queue` / `ACTIVE` (read-after-write verified)
- Next scheduled local run: 2026-07-14 06:30 Europe/Amsterdam

## B — Editorial Synthesis and Core Essay Guard

- Schedule: first Saturday monthly 08:00, Europe/Amsterdam
- RRULE: `RRULE:FREQ=MONTHLY;BYDAY=SA;BYSETPOS=1;BYHOUR=8;BYMINUTE=0`
- Environment: new isolated worktree
- Prompt file: `docs/echad/automations/editorial-synthesis-core-guard.md`
- Permissions: same; canonical edits only for individually `approved` proposals.
- Automation ID/status: `editorial-synthesis-and-core-essay-guard` / `ACTIVE` (read-after-write verified)
- Next scheduled local run: 2026-08-01 08:00 Europe/Amsterdam

## C — Site QA and NL/EN Parity

- Schedule: Thursday 06:30, Europe/Amsterdam
- RRULE: `RRULE:FREQ=WEEKLY;BYDAY=TH;BYHOUR=6;BYMINUTE=30`
- Environment: new isolated worktree
- Prompt file: `docs/echad/automations/site-qa-nl-en-parity.md`
- Permissions: same; safe technical fixes only, theology proposal-only.
- Automation ID/status: `site-qa-and-nl-en-parity` / `ACTIVE` (read-after-write verified)
- Next scheduled local run: 2026-07-16 06:30 Europe/Amsterdam

## Runtime collision policy

Before work, query open PRs for branches/titles created by that automation. If an earlier draft is open, update it only when it is the same scoped task and conflict-free; otherwise stop and report human review. If GitHub state cannot be read, do not begin a new content task. GitHub authentication was restored and read-validated on 2026-07-13; this does not remove the per-run preflight requirement.
