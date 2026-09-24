# ZUNO

Editable React components built on [Base UI](https://base-ui.com) and Tailwind CSS v4. The `zunoui` CLI copies each component into your project, so the code is yours to change.

[Documentation](https://zunoui.dev/docs) · [Components](https://zunoui.dev/components) · [npm](https://www.npmjs.com/package/zunoui)

> ZUNO is in alpha. The API, the available components and the configuration may change before `1.0.0`.

## Quick start

In a React project with Next.js or Vite, TypeScript, Tailwind CSS v4 and an `@/*` alias:

```sh
npx zunoui@alpha init
npx zunoui@alpha add button
```

```tsx
import { Button } from "@/components/ui/button"

<Button>Create project</Button>
```

Browse every component, its examples, API and accessibility notes at [zunoui.dev/components](https://zunoui.dev/components).

## What you get

- 33 components: form controls, layout primitives, overlays and feedback, with light, dark and system themes.
- Source code in your repository instead of a component package. Runtime dependencies are limited to `@base-ui/react`, `clsx` and `tailwind-merge`.
- A CLI that works with npm, Bun, pnpm and Yarn, keeps your theme and existing configuration, and never overwrites components you have modified.
- A shadcn-style registry served at `https://zunoui.dev/r/{name}.json`.

## Repository

| Path | Purpose |
|---|---|
| `registry/` | Component source. This is what the CLI installs. |
| `packages/cli` | The `zunoui` CLI, published to npm. |
| `apps/docs` | The website and the public registry (`/r/*.json`). |
| `packages/showcase` | Private: the example gallery shared by the docs and the fixtures. |
| `fixtures/` | React + Vite and Next.js apps that install components through the CLI, used for verification. |

## Contributing

Bug reports, fixes and component proposals are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) to set up the repository, and follow the [Code of Conduct](CODE_OF_CONDUCT.md). Report vulnerabilities through the [security policy](SECURITY.md), not a public issue.

## License

[MIT](LICENSE)
