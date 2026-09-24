# zunoui

CLI to install editable ZUNO React components built on Base UI.

## Requirements

- Node.js 22 or later
- A React project with Next.js or Vite, TypeScript and Tailwind CSS v4
- An `@/*` alias to `./src/*` or `./*` in `tsconfig.json`

## Usage

```sh
npx zunoui@latest init
npx zunoui@latest add button
npx zunoui@latest add field
```

`init` sets up ZUNO in your project and `add` copies a component's source locally so you can edit it. npm, Bun, pnpm and Yarn are supported; pass `--pm` when the lockfile does not identify a single package manager.

```text
zunoui init | add <name> [--cwd path] [--registry URL/{name}.json] [--pm npm|bun|pnpm|yarn] [--css path]
```

Browse the available components at [zunoui.dev/components](https://zunoui.dev/components).

## Existing projects

`init` keeps your theme, your `components.json` fields and other registries. It reuses your configured utility (it must export `cn`) and compatible installed dependencies. It never overwrites components you have modified. Set `aliases.ui` to `@/components/zuno` to keep ZUNO components in their own folder.

Existing themes must provide the semantic tokens the components read; they are not replaced or filled in automatically. Registry, path and version conflicts are reported before any file is written.

## Status

This is an alpha release. The API, the available components and the configuration may change before `1.0.0`.

## License

MIT. See [LICENSE](./LICENSE).
