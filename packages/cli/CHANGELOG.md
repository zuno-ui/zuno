# zunoui

## 0.1.0-alpha.2

### Patch Changes

- 03e7502: `init` accepts any Tailwind CSS v4 range, such as `^4`, and existing dependencies at any compatible version of the one ZUNO pins (for example `tailwind-merge@^3.6.0` when ZUNO pins `3.3.1`), including in monorepos where packages are hoisted.

## 0.1.0-alpha.1

### Patch Changes

- c58ca44: Clearer CLI messages and package README. When a component file already exists, the conflict error now suggests setting `aliases.ui` to `@/components/zuno` to install ZUNO alongside another library.
