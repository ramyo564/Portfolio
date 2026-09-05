# Browser Smoke Test Checklist

## Purpose
- Verify that Phase 1 JS modularization keeps behavior unchanged.
- Cover critical user flows before Phase 2 JS split and CSS modularization.

## Test Date Window
- Planned execution date: 2026-03-30 onward

## Preconditions
- Open `index.html` in a modern browser.
- Browser console is visible.
- Network is available for Mermaid CDN and GTM.

## Core Scenario Checklist

### 1) Initial Page Load
- [ ] No module import error in console.
- [ ] No uncaught runtime error during `DOMContentLoaded`.
- [ ] Main sections render (`hero`, `service sections`, `top panels`, `skills`, `contact`).

### 2) Navigation + Scroll Spy
- [ ] Clicking each header nav link moves to the expected section.
- [ ] Active nav item updates while scrolling.
- [ ] On resize, active nav still updates correctly.

### 3) Mobile Navigation
- [ ] At width <= 768, nav toggle opens menu.
- [ ] Clicking outside menu closes menu.
- [ ] Pressing `Escape` closes menu.
- [ ] At width > 768, mobile-open state is cleared.

### 4) Hash Reveal Flow
- [ ] Opening with URL hash (for example `#ln-featured`) reveals/highlights target.
- [ ] Changing hash after load re-runs reveal logic.
- [ ] Recruiter brief target cards auto-expand when selected by hash flow.

### 5) Mermaid Render + Modal
- [ ] Mermaid diagrams render for all configured `data-mermaid-id` values.
- [ ] Clicking graph/card visual opens modal.
- [ ] Modal closes via close button, backdrop click, and `Escape`.
- [ ] Zoom in/out/reset controls work.
- [ ] `Ctrl/Cmd + wheel` zoom works.
- [ ] Pan interaction works when zoom > 100%.

### 6) Linked YouTube UX
- [ ] Hover preview appears on linked diagram targets.
- [ ] Modal video panel appears for targets with linked video.

### 7) GA / dataLayer Events
- [ ] `window.dataLayer` exists.
- [ ] Key interactions push `select_content` events:
  - nav click
  - section view (scroll spy)
  - contact action click
  - project link click
  - mermaid modal open
  - mermaid zoom controls
  - hash target reveal
  - page lifecycle start/end/visibility

## Quick Console Helpers
- List latest events:
```js
(window.dataLayer || []).slice(-20)
```
- Filter `select_content` only:
```js
(window.dataLayer || []).filter((e) => e?.event === 'select_content')
```

## Pass Criteria
- All checklist items pass without regression.
- Any failure is logged with repro steps and screenshot/console line.

## Result Template
- Date:
- Browser + version:
- Environment URL/path:
- Passed items:
- Failed items:
- Notes:
