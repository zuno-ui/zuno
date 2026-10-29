# zunoui

## 0.1.0-alpha.6

### Minor Changes

- 19f2d42: F2 catalog: 6 own components can be installed with `zunoui add`, the first batch of ZUNO's P1 entries.

  - Layout and data: description-list (term/value pairs on a real `<dl>`, stacked or inline), section-header (a section heading with metadata and actions that wraps by available width) and stat-card (a metric with a textual trend that separates direction from sentiment).
  - States: save-indicator and connection-status (live regions driven by what the app reports), and confirm-action (an AlertDialog confirmation that waits for the operation, shows its error in place and closes only on success).

- 55660e6: F2 catalog: 4 more own components can be installed with `zunoui add`, the second batch of ZUNO's P1 entries, for data views.

  - data-toolbar: search, filters, row density and actions above a list or table, without tying them to a table engine; an announced result count and removable active filters that keep focus in place.
  - bulk-actions-bar: the selected count (announced as it changes), the bulk actions and a way to clear the selection.
  - comparison-table: options side by side across shared dimensions, built on Table with column, row and row-group headers, accessible included/not-included values and a pinned first column on phones.
  - timeline: events in order with a status, author, time and optional collapsible details, on a real ordered list.

- 2d2f594: F2 catalog: 6 more own components can be installed with `zunoui add`, the third batch of ZUNO's P1 entries, for navigation and layout.

  - user-menu: the signed-in account in a DropdownMenu, with avatar initials as a fallback and a compact avatar-only trigger; authentication stays in your app.
  - workspace-switcher: switch organizations with search; it waits for the switch with a spinner on the chosen workspace and shows the failure in place.
  - command-palette: commands as data behind ⌘K / Ctrl+K, with groups, keywords, shortcut hints and disabled commands; it closes before running the command.
  - page-navigation: an on-this-page table of contents with plain anchor links and the active section, no router needed.
  - stepper: progress through a multi-step flow; the steps a user may revisit follow your validation, and completed or failed steps are announced in words.
  - split-layout: a main area and a collapsible side panel with no breakpoints; the panel wraps under the main area when the box gets narrow.

## 0.1.0-alpha.5

### Minor Changes

- 0a1af70: F2 catalog: 8 more components can be installed with `zunoui add`, completing the official P1 families.

  - Base UI: command (on Autocomplete, with a CommandDialog palette), direction (DirectionProvider for right-to-left), input-group and sidebar (expanded, icon rail and a drawer on phones).
  - HTML and CSS: aspect-ratio, item, native-select and typography (text recipes plus a `typography` class map).

  TooltipContent now accepts `side` and `align`, so a tooltip can open beside its trigger. Input Group ships 0.25 kB less CSS.

## 0.1.0-alpha.4

### Minor Changes

- ab4b529: F2 catalog: 21 new components can be installed with `zunoui add`.

  - Base UI: accordion, collapsible, combobox, drawer, input-otp, navigation-menu, popover, progress, radio-group, scroll-area, sheet, slider, toggle and toggle-group.
  - HTML and CSS: breadcrumb, button-group, kbd, pagination and table.
  - Integrations: calendar and date-picker, on react-day-picker 10. They are a new `integration` kind with their own documented bundle budget, and the CLI installs `react-day-picker` when you add them.

  Checkbox and Switch now show their disabled state; before, a disabled control looked active.

### Patch Changes

- d6012a1: `zunoui add` now prints the right import path for compositions: items of type `registry:component` (such as `date-picker` or `password-input`) point to `aliases.components` instead of `aliases.ui`.

## 0.1.0-alpha.3

### Minor Changes

- 55d4677: Add read-only `diff` and guarded `update` commands for copied components. Record source fingerprints in `zuno.lock.json` and refuse updates when local edits or missing baselines prevent safe replacement. Document the package, existing-theme setup and update workflow.

## 0.1.0-alpha.2

### Patch Changes

- 03e7502: `init` accepts any Tailwind CSS v4 range, such as `^4`, and existing dependencies at any compatible version of the one ZUNO pins (for example `tailwind-merge@^3.6.0` when ZUNO pins `3.3.1`), including in monorepos where packages are hoisted.

## 0.1.0-alpha.1

### Patch Changes

- c58ca44: Clearer CLI messages and package README. When a component file already exists, the conflict error now suggests setting `aliases.ui` to `@/components/zuno` to install ZUNO alongside another library.
