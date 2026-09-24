# zunoui

Install editable ZUNO components in a React project. The CLI copies source from the [ZUNO registry](https://zunoui.dev/components); your app owns the installed files. Components use Base UI and Tailwind CSS v4. This package is the installer, not a runtime component library.

ZUNO is in alpha. The API and component set may change before `1.0.0`.

## Requirements

- Node.js 22 or later.
- React with Next.js or Vite, TypeScript and Tailwind CSS v4 already configured.
- An `@/*` path alias pointing to `./src/*` or `./*` in `tsconfig.json`.
- npm, Bun, pnpm or Yarn. The CLI detects one lockfile; use `--pm` if detection is ambiguous.

## Start

Run these commands from your app's root:

```sh
npx zunoui@latest init
npx zunoui@latest add button
npx zunoui@latest add field
```

`init` writes `components.json`, a `cn` utility if one is absent, and a theme import in your Tailwind CSS entry. A project without a theme gets the ZUNO Neutral preset; a project with an existing theme keeps it and receives only the complementary `--zuno-*` tokens. ZUNO uses your app's existing light/dark convention; it does not install a theme switcher.

`add` copies the requested component and its registry dependencies, then adds missing compatible npm dependencies. Import the copied source from the configured alias:

```tsx
import { Button } from "@/components/ui/button"

<Button type="submit">Save</Button>
```

Browse component names, examples, API details and accessibility notes at [zunoui.dev/components](https://zunoui.dev/components).

## Commands

| Command | Effect |
| --- | --- |
| `zunoui init` | Configure ZUNO in an existing project; preserve existing settings and refuse conflicting files. |
| `zunoui add <name>` | Copy a component and dependencies. Refuses to replace different existing files. |
| `zunoui diff <name>` | Fetch the current registry source and print differences from installed files. Does not change the project or install packages. |
| `zunoui update <name>` | Replace files only when they still match the copies recorded by ZUNO. Refuses local edits and untracked files. |

All commands accept `--cwd <path>` to target a project from another directory and `--registry <URL/{name}.json>` to use a registry endpoint. `init` also accepts `--css <path>`; use `--pm npm|bun|pnpm|yarn` when the lockfile does not identify a single manager. After `init`, the registry URL is recorded in `components.json`; later commands reject a different `--registry` value.

## Review and update components

`add` and `init` record a SHA-256 fingerprint of each copied registry file in `zuno.lock.json`. Commit this file with your component source. It records fingerprints, not component contents or theme values. A configured `cn` utility that belonged to your project is not tracked or overwritten.

```sh
npx zunoui@latest diff button
npx zunoui@latest update button
```

`diff` shows the installed and registry versions, including files required by the component and npm dependencies that would be added or need attention. `update` checks every affected file before writing any of them. A file with local edits, a locally deleted tracked file, or an older copied file without a lock entry that differs from the registry stops the update. ZUNO never uses a force flag to discard edits. Resolve differences manually, then run `add <name>` once every affected file matches the registry version to start tracking them again. New registry files can be added when their destination is free. Changes to `components.json`, your theme and consumer-owned utilities remain yours.

The registry is served live. Updating the npm CLI alone does not update code already copied into an app; run `diff` and `update` when you want new component source. A component first installed with an older CLI has no fingerprint: `diff` still works, but `update` will require manual review and adoption.

## Existing themes and shadcn

ZUNO can live beside shadcn components. Set `aliases.ui` in `components.json` to `@/components/zuno` **before** adding a component whose filename is already under `@/components/ui`:

```json
{
  "aliases": {
    "components": "@/components",
    "ui": "@/components/zuno",
    "utils": "@/lib/utils"
  }
}
```

Keep your existing shadcn `cn` utility and semantic theme variables. `init` preserves them and imports `zuno-tokens.css` for the additional ZUNO roles. The complementary tokens include `.dark` values. If your app uses another dark-mode selector, scope those roles to match it. The CLI reports file, path and dependency conflicts; it does not silently replace existing components.

## Troubleshooting

- `Run zunoui init first`: initialize the project before `add`, `diff` or `update`.
- `Pass --pm ...`: the project has no identifiable lockfile or has conflicting package-manager markers.
- `Conflict`: `add` found a different file at the destination. Choose a separate `aliases.ui` path or review it with `diff`.
- `No baseline` or `Locally modified`: `update` cannot prove the file is unchanged since installation. Review with `diff`, merge manually and use `add` to track the matching result.
- `Check the ... version`: the declared or installed dependency is outside the compatible range. Install a compatible version before retrying.

ZUNO refuses writes outside the project and through symbolic links. It fetches registry entries over HTTPS, with HTTP permitted only for localhost development.

## Release model

The CLI is published to npm under the `latest` tag while its version is still alpha. Component source lives in the public registry at `https://zunoui.dev/r/{name}.json` and can change when the website deploys; copied files change only when you update them. See the [repository](https://github.com/zuno-ui/zuno) for contribution and release details.

MIT. See [LICENSE](./LICENSE).
