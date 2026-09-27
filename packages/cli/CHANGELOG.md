# zunoui

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
