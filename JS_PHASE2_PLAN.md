# JS Phase 2 Refactoring Plan

## Execution Status (2026-03-30)
- Code split: completed
- Runtime smoke verification: pending

## Purpose
- Further split large modules created in Phase 1.
- Reduce function density in `services.js` and `mermaid.js`.
- Keep behavior identical while improving change isolation.

## Current Hotspots
- Pre-split hotspot (`services.js`) was decomposed into service submodules.
- Pre-split hotspot (`mermaid.js`) was decomposed into mermaid submodules.
- Remaining large area: `js/mermaid/modal.js` (single-domain but interaction-heavy).

## Target Module Layout

### Services domain
- `js/render/services/index.js`
- `js/render/services/card-builders.js`
- `js/render/services/recruiter-brief.js`
- `js/render/services/showcase-controls.js`
- `js/render/services/hash-reveal.js`

### Mermaid domain
- `js/mermaid/index.js`
- `js/mermaid/config.js`
- `js/mermaid/source-injector.js`
- `js/mermaid/renderer.js`
- `js/mermaid/modal.js`

## Work Breakdown

### Step 1) Services split
- Move card metadata/tag/highlight/link builders into `card-builders.js`.
- Move recruiter brief UI and interactions into `recruiter-brief.js`.
- Move featured-case collapse logic into `showcase-controls.js`.
- Move hash reveal functions into `hash-reveal.js`.
- Keep `index.js` as orchestration only.

### Step 2) Mermaid split
- Move base config/init into `config.js`.
- Move source injection into `source-injector.js`.
- Move async render loop into `renderer.js`.
- Move modal open/close/zoom/pan/preview logic into `modal.js`.
- Keep `index.js` as public export surface.

### Step 3) Entrypoint update
- Update `script.js` imports to use new index modules.
- Keep boot sequence order unchanged.

## Acceptance Criteria
- No behavioral regression in smoke checklist.
- No missing import/export runtime errors.
- `script.js` remains entry-only and small.
- Each module has a single responsibility.

## Risk Notes
- High coupling risk around shared modal state.
- Hash reveal logic must preserve recruiter-card expansion behavior.
- Analytics event payload fields must remain unchanged.

## Rollback Strategy
- If regression appears, revert only affected domain split (services or mermaid) while keeping Phase 1 baseline.

## Completion Snapshot
- `services` domain split into:
  - `js/render/services/index.js`
  - `js/render/services/card-builders.js`
  - `js/render/services/recruiter-brief.js`
  - `js/render/services/showcase-controls.js`
  - `js/render/services/hash-reveal.js`
- `mermaid` domain split into:
  - `js/mermaid/index.js`
  - `js/mermaid/config.js`
  - `js/mermaid/source-injector.js`
  - `js/mermaid/renderer.js`
  - `js/mermaid/modal.js`
- Backward-compatible shim files retained:
  - `js/render/services.js`
  - `js/mermaid.js`
