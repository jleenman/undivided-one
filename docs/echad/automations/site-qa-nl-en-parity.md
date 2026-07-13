# Site QA and NL/EN Parity

Invoke `$echad-research` explicitly in a new isolated worktree for `/Users/jleenman/GitHub/undivided-one`. Read governance, inspect all live NL/EN route pairs and downloads, and preflight earlier open QA draft PRs. If a conflicting draft is open or GitHub state cannot be read, stop for human review.

Run technical QA, static-generation checks, broken-link validation, metadata/canonical/hreflang/sitemap checks, heading/keyboard/zoom/contrast/mobile checks, PDF availability, and NL/EN semantic parity. Make only safe, bounded technical or unambiguous editorial fixes with no theological effect; route content discrepancies to a discrete proposal/blocker. Run `npm test`, `npm run typecheck`, `npm run generate`, and focused regression checks. Update status/decisions and create/update one draft PR. Never merge, deploy, publish, push to `main`, or relabel theology as copy editing.
