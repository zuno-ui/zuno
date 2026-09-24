# Contributing to ZUNO

ZUNO is an alpha React component library. Focused bug reports, fixes, documentation improvements and component proposals with a concrete use case are welcome. Follow the [Code of Conduct](CODE_OF_CONDUCT.md). Report vulnerabilities through the [security policy](SECURITY.md), not a public issue.

## Before starting

Search existing issues and pull requests. For a new component, a new dependency or a change to the CLI's behavior, open a proposal before a large PR. Small fixes and documentation improvements can go directly to a PR.

Prefer Base UI primitives and native platform features over another abstraction or dependency. Every component must work in light and dark themes, be keyboard accessible and stay within its bundle budget.

## Local setup

Use Node 22 or later and Bun `1.3.2`. The monorepo uses Bun for its own dependencies; do not mix package managers inside the workspace.

```sh
git clone https://github.com/zuno-ui/zuno.git
cd zuno
bun install --frozen-lockfile
bun run build
bun run dev
```

Open `http://localhost:3000/components`. The site also serves the registry at `http://localhost:3000/r/{name}.json`. Contributors without write access should fork the repository and open a PR against `zuno-ui/zuno:main`.

| Command | What it does |
|---|---|
| `bun run build` | Typecheck, compile the CLI and generate the registry JSON in `apps/docs/public/r/`. |
| `bun run build:docs` | Static export of the website to `apps/docs/out/`. |
| `bun run test` | The full test suite (see below). |
| `bun run measure:bundle` | Incremental JS/CSS cost of each component. |
| `bun run registry:serve` | Serve the generated registry on port 4310 without the website. |

## Fixtures

`fixtures/react-vite` and `fixtures/next-app` install components through the CLI, the way a real project would, and render the same examples as the gallery. They never import `registry/` directly. To prepare them:

```sh
bun run build
bun run registry:serve
```

In another terminal, install every component into a fixture:

```sh
node packages/cli/dist/index.js init --cwd fixtures/react-vite --pm bun --registry 'http://127.0.0.1:4310/r/{name}.json'
for name in $(node -p "require('./registry.json').items.filter(i => i.type === 'registry:ui' || i.type === 'registry:component').map(i => i.name).join(' ')"); do
  node packages/cli/dist/index.js add "$name" --cwd fixtures/react-vite --pm bun
done
bun run dev:fixture:vite
```

Repeat with `--cwd fixtures/next-app` and run `bun run dev:fixture:next`. The Vite fixture uses port 5173 and the Next.js fixture uses 3001, so both can run next to the docs on 3000.

## Tests

`bun run test` builds the registry, packs the CLI once and serves the registry locally. It then creates four independent consumers (React + Vite and Next.js, each with npm and Bun) and runs `init`, `add`, idempotent re-runs and a production build in each. It checks `diff` and guarded `update` with local edits and older installations, installs every published entry, checks bundle budgets, theme token parity and contrast, and rejects missing components, cycles, unsafe paths and overwrites of edited files.

The suite needs Node 22+, Bun, network access to the npm registry and permission to start a local server. It validates installation and compilation; it does not replace manual keyboard, screen reader and hydration checks in a browser.

## Adding a component

A new component touches several places. Keep them in sync in the same PR:

1. The source in `registry/ui/` (Base UI based) or `registry/components/` (compositions).
2. Its entry in `registry.json`, with pinned npm dependencies and `@zuno/*` registry dependencies.
3. Its status in `compatibility.json`.
4. Its metadata and examples in `packages/showcase/src/catalog-meta.ts` and the matching renderers in `packages/showcase/src/catalog.tsx`.
5. The component in the `ui` object of `apps/docs/src/components/gallery.tsx` and both `fixtures/*/src/demo.tsx`, plus its type in `DemoComponents`.

Then run `bun run build`, `bun run test` and check the component page in light and dark themes with the keyboard only.

## Pull requests

1. Create a short-lived branch from `main`, such as `fix/select-focus` or `feat/combobox`.
2. Keep the change focused. For a behavior fix, add a regression test.
3. Run `bun run build` and `bun run test`, and state any check you could not run.
4. Complete the PR template.

Use a Conventional Commit title, for example `fix(dialog): return focus to the trigger`. PRs are squash-merged.

## Releases

The website and registry deploy on every push to `main`. The CLI is released with [Changesets](https://github.com/changesets/changesets):

- For a change to `packages/cli`, run `bun run changeset`, pick the SemVer impact and commit the generated file with your PR. Changes to `registry/` or the docs deploy with the website and do not need a changeset.
- Automation opens a "chore: release zunoui" PR with the version bump and changelog. Merging it publishes to npm from GitHub Actions with Trusted Publishing, only after the registry deploy succeeds; it then tags the commit and creates a GitHub Release with that version's changelog notes.
- The repository is in `alpha` pre-release mode (`.changeset/pre.json`), so versions are numbered `0.1.0-alpha.N`; during the alpha they publish under the `latest` dist-tag. The release PR removes applied changesets; the history lives in the CHANGELOG, Git tags and GitHub Releases. See the [Changesets guide](.changeset/README.md) for details.
- The public URL lives in `registry.json` (`homepage`) and in the CLI's default endpoint; `tests/site.test.mjs` keeps them in sync.

Do not change package versions or publish as part of an unrelated PR. Contributions are licensed under the repository's [MIT license](LICENSE).
