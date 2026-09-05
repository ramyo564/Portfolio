# Portfolio Refactoring Master Plan

## Goal
- Improve maintainability of oversized files (`script.js`, `style.css`).
- Reduce per-task context size to lower LLM token consumption.
- Preserve current runtime behavior while splitting by responsibility.

## Status Snapshot (as of 2026-03-30)
- [x] Phase 1 JS modularization complete (`script.js` entry bootstrap)
- [ ] Browser smoke validation (pending)
- [x] Phase 2 JS deep split (`services`, `mermaid`)
- [x] CSS modularization

## Canonical Execution Order
1. Browser smoke test on Phase 1 baseline
2. Phase 2 JS deep split
3. Browser smoke re-run
4. CSS modularization
5. Final parity check (desktop + mobile)

## Execution Note
- Phase 2 JS deep split was executed before the initial browser smoke step, based on user direction on 2026-03-30.
- CSS modularization was also executed before the initial browser smoke step, based on user direction on 2026-03-30.

## Detailed Work Docs
- Smoke checklist: `SMOKE_TEST_CHECKLIST.md`
- JS Phase 2 plan: `JS_PHASE2_PLAN.md`
- CSS modularization plan: `CSS_MODULARIZATION_PLAN.md`
- Change log: `REFACTORING_LOG.md`

## Phase 1 Outcome Summary
- `script.js` transformed into lightweight orchestrator.
- Modules introduced under `js/` for utility, analytics, renderers, navigation, and mermaid.
- No bundler introduced (browser-native ESM only).

## Guardrails
- No behavior changes unless required for bug fix.
- Keep existing analytics event names/payload fields unchanged.
- Preserve HTML structure and selector compatibility.
- Keep changes incremental and reversible by phase.

## Done Definition (Project Level)
- All smoke test items pass before and after major refactor phases.
- JS modules are responsibility-aligned and small enough for focused edits.
- CSS is split into ordered layers/components/sections/responsive files.
- Root docs accurately describe current status and next actions.
