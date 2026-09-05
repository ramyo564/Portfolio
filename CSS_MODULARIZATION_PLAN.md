# CSS Modularization Plan

## Execution Status (2026-03-30)
- CSS split: completed
- Visual smoke verification: pending

## Purpose
- Split oversized `style.css` into maintainable layers.
- Reduce style editing context per task.
- Preserve existing visual output.

## Target Style Architecture
- `styles/tokens.css`
- `styles/base.css`
- `styles/layout.css`
- `styles/components/buttons.css`
- `styles/components/cards.css`
- `styles/components/navigation.css`
- `styles/components/mermaid-modal.css`
- `styles/sections/hero.css`
- `styles/sections/services.css`
- `styles/sections/recruiter-brief.css`
- `styles/sections/skills.css`
- `styles/sections/contact.css`
- `styles/responsive.css`

## Aggregation Strategy
- Keep root `style.css` as the only HTML-linked stylesheet.
- Convert root `style.css` into ordered `@import` list for modular files.
- Preserve selector names to avoid HTML/JS changes.

## Work Breakdown

### Step 1) Foundation extraction
- Move `:root` variables to `tokens.css`.
- Move reset and global element rules to `base.css`.
- Move overall page grid/header shell rules to `layout.css`.

### Step 2) Component extraction
- Move reusable UI blocks (buttons, card primitives, nav, modal) into `components/*`.

### Step 3) Section extraction
- Move section-specific rules into `sections/*`.
- Keep section files independent from unrelated components.

### Step 4) Responsive extraction
- Move all media queries into `responsive.css`.
- Keep breakpoint ordering consistent with current behavior.

## Acceptance Criteria
- Visual parity across desktop and mobile.
- No selector loss and no orphan rules.
- No duplicate token definitions across files.
- `style.css` stays short and order-driven.

## Verification Checklist
- Header/nav layout parity.
- Hero panel spacing and typography parity.
- Service cards and recruiter brief interactions parity.
- Mermaid modal and preview styling parity.
- Mobile breakpoint behavior parity at `1200px` and `768px`.

## Risk Notes
- Import order can change specificity outcomes.
- Media query extraction can accidentally reorder precedence.
- Temporary overlap is expected during migration but must be removed before completion.

## Completion Snapshot
- `style.css` converted to import-only entrypoint.
- Added:
  - `styles/tokens.css`
  - `styles/base.css`
  - `styles/layout.css`
  - `styles/components/navigation.css`
  - `styles/components/buttons.css`
  - `styles/components/cards.css`
  - `styles/components/mermaid-modal.css`
  - `styles/sections/recruiter-brief.css`
  - `styles/sections/hero.css`
  - `styles/sections/services.css`
  - `styles/sections/skills.css`
  - `styles/sections/contact.css`
  - `styles/responsive.css`
