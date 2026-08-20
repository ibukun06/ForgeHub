# ForgeHub Design System

## Current Visual System Overview
ForgeHub implements a custom design system heavily reliant on CSS variables injected into Tailwind v4 (`src/app/globals.css`). The application supports both Light and Dark modes. The aesthetic leans towards a clean, modern SaaS tool with a focus on readability and content hierarchy.

## Core Tokens (Standardized in `globals.css`)

### Typography
- **Sans (Primary):** `var(--font-inter)` used for general text.
- **Heading:** `var(--font-archivo)` used for `h1` through `h4` and prominent titles, leveraging `text-wrap: balance`.
- **Mono:** `var(--font-roboto-mono)` for code snippets or technical data.

### Colours
- **Backgrounds:** Gradient pages (`--gradient-page`) paired with solid backgrounds (`--color-bg`). Surfaces have three tiers of elevation (`--color-surface`, `--color-surface-muted`, `--color-surface-elevated`).
- **Brand Primary:** A deep blue/slate (`#24466b` light / `#8eb8e0` dark).
- **Brand Secondary:** An energetic orange (`#e8692c` light / `#f08a45` dark), used for focus rings and highlights.
- **Text:** High contrast primary (`--color-text-primary`) and muted (`--color-text-muted`).
- **Semantic/Signals:** Success (Green), Warning (Amber), Error (Red), complete with background and border variants for alerts.

### Spacing & Sizing (To Be Standardized)
- Currently relying on Tailwind's default spacing scale (`p-4`, `m-2`, etc.). A more rigorous spacing token system for standardizing component padding is recommended.

### Radii & Borders
- **Panels:** Highly rounded (`--radius-panel: 30px`).
- **Cards:** Moderately rounded (`--radius-card: 22px`).
- **Borders:** Subtle gray/slate borders (`--color-border`) to define structural edges.

### Shadows & Depth
- **Panel:** `--shadow-panel` for standard floating panels.
- **Floating:** `--shadow-floating` for higher z-index items (modals, dropdowns).
- **Hero:** `--shadow-hero` for highly elevated hero sections.

## Components to Standardize
The current codebase has core UI atoms in `src/components/ui/`. Moving forward, the following patterns need strict standardization to avoid drift:

1. **Buttons:** Primary, secondary, ghost, and destructive variants need unified padding, typography, and interactive states (hover/active/disabled).
2. **Inputs & Forms:** Text inputs, textareas, selects, and checkboxes should standardize on `--color-input-bg` and focus states (`outline: 3px solid var(--color-secondary)`).
3. **Cards:** The `surface-panel` and `surface-panel-muted` classes from `globals.css` should be wrapped in reusable React components (e.g., `<Card />`).
4. **Dialogs & Modals:** Standardize overlays, z-indexes, and the use of `--shadow-floating`.
5. **Navigation Items:** Active states, hover transitions, and iconography alignment in the sidebar/header.
6. **Loading & Empty States:** Create unified skeletal loaders or spinner components, and a standard `<EmptyState />` layout block.
