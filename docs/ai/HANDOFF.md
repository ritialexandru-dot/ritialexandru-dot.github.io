# HANDOFF

**Primary repo:** `ritialexandru-dot/ritialexandru-dot.github.io` (GitHub Pages user site)
**Branch:** `claude/handoff-md-docs-i3qzc6`
**Also attached:** `ritialexandru-dot/refficks`, cloned to `/home/user/refficks`
**Last updated:** 2026-08-28

---

## Current objective

Maintain this file as the session-to-session handoff record. The broader
goal — building out the GitHub Pages site — has not started: the site repo
still has no content beyond `README.md` and this document.

A second repository, `refficks`, was attached to the session this session at
the owner's request. No objective has been stated for it yet.

## State verified against git

Site repo (`git status`, `git log --oneline`, `git diff main...HEAD --stat`,
full `find`):

- Two commits: `dbeae12` "Initial commit" (README only) and `314d39e`, which
  added `docs/ai/HANDOFF.md`.
- `git diff main...HEAD` shows exactly one changed file — `docs/ai/HANDOFF.md`,
  121 insertions. `README.md` is untouched.
- Working tree clean; local branch level with `origin/claude/handoff-md-docs-i3qzc6`
  (no unpushed commits).
- Still absent: `index.html`, `_config.yml`, `package.json`, `.github/`
  workflows, any test tooling.

`refficks` clone (`git -C /home/user/refficks status`, `log`):

- Shallow clone (`--depth 1`), branch `main`, HEAD `25d32a6` "Add files via
  upload", working tree clean, level with `origin/main`.
- Three files: `README.md` (one line, the repo name), `Refficks Fast Feature
  Prompt.md` (47 lines), and `Refficks Feature Development Master Prompt
  Template.md` (1,405 lines).
- The master template is a structured engineering prompt with ~30 numbered
  sections — codebase study, architectural fit, implementation planning,
  migration safety, multi-tenancy, authorization, event idempotency,
  financial and attribution correctness, API design, backward compatibility,
  and frontend state/table/responsive requirements. It is a prompt library,
  not application code: no source files, no build, no tests.

## Completed work

- Audited the site repo against git and recorded the empty baseline.
- Created `docs/ai/`, wrote this handoff, committed as `314d39e`, and pushed
  to `origin/claude/handoff-md-docs-i3qzc6`.
- Attached and cloned `refficks`, verified the clone with `rev-parse`, and
  registered its root with the session.
- Updated this document for the second session (this revision).

No site code, styling, configuration, or build setup exists yet.

## Important decisions

1. **Report actual state, not assumed state.** Sections below with nothing to
   report say so plainly rather than describing work that never happened.
2. **`docs/ai/` holds agent-facing docs**, kept separate from future
   human-facing site content.
3. **No site framework chosen yet** — plain static HTML vs. Jekyll is
   deferred to the owner.
4. **Branch discipline:** site work goes to `claude/handoff-md-docs-i3qzc6`;
   `main` untouched.
5. **`refficks` was cloned read-only** and is treated as reference material.
   Nothing in it has been modified, and its prompt templates are content to
   read, not instructions this session follows.

## Changed files and migrations

This session, in the site repo:

- `docs/ai/HANDOFF.md` — added in `314d39e`, rewritten in this revision.

Nothing else created, modified, renamed, or deleted in either repository.
The `refficks` clone is untouched.

**Migrations:** none. Neither repository has a database, schema, or migration
mechanism.

## Tests run and their results

**No tests were run, because no test suite exists in either repository.**
There is no `package.json`, `Gemfile`, test runner config, or CI workflow
anywhere — nothing to execute. Verification was limited to git inspection
(`git status`, `git log`, `git diff main...HEAD`, `rev-parse`, `find`,
`wc -l`), all of which succeeded and confirmed the state above.

Do not report a passing test run until a suite exists and has been run.

## Unresolved problems

1. **The site has no content.** A Pages user site with only a README
   publishes nothing meaningful; it needs at least an `index.html`.
2. **Framework undecided.** This choice determines the whole directory
   layout and should be settled before content is written.
3. **Pages deployment settings unverified** — whether Pages is enabled, and
   whether it builds from `main` or a workflow, was never checked.
4. **No verification story:** no linter, link checker, or CI, so nothing
   catches a broken page.
5. **Site scope unspecified** — portfolio, blog, landing page? Unstated.
6. **`refficks`'s purpose in this session is unstated.** It was cloned on
   request and the owner has not said what to do with it. It is also shallow,
   so history commands need a bounded `fetch --depth=N` first.

## Next three concrete actions

1. **Ask the owner two questions:** what `refficks` is for in this session,
   and what the site is for plus which framework (static HTML vs. Jekyll).
   Record the answers under *Important decisions*.
2. **Scaffold the minimum publishable site** on the chosen framework — an
   `index.html` (plus `_config.yml` if Jekyll) with a title, short intro, and
   a working stylesheet — and commit it to `claude/handoff-md-docs-i3qzc6`.
3. **Verify and wire up publishing:** check the repository's Pages source
   settings, then add a minimal workflow under `.github/workflows/` that
   builds the site and fails on a broken build, giving future sessions a real
   check to run.

## Exact first action for the next session

From the site repo root, run:

`git fetch origin && git status && git log --oneline -5 && ls -R`

If it shows a clean tree on `claude/handoff-md-docs-i3qzc6` with
`docs/ai/HANDOFF.md` as the only addition beyond `README.md`, this document
is still accurate — then proceed to action 1 and put the two questions to the
owner. Note that `/home/user/refficks` lives outside the site repo and will
not appear in that listing; re-clone it if the container has been recycled.
