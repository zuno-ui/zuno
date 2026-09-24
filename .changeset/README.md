# Changesets

A changeset is a small Markdown file that says which package changes, its SemVer impact and the changelog entry. Only `zunoui` (`packages/cli`) is published; changes to `registry/`, the docs or tests deploy with the website and need no changeset.

## Adding one

```sh
bun run changeset
```

Select `zunoui`, choose the impact and write one sentence for the changelog, written for users of the CLI. Commit the generated file with your PR. You can also write it by hand:

```md
---
"zunoui": patch
---

When a component file already exists, the conflict error now suggests setting `aliases.ui`.
```

| Impact | Use it for |
|---|---|
| `patch` | Fixes, messages, docs shipped in the package. |
| `minor` | New flags, commands or behavior that stays compatible. |
| `major` | Breaking changes. During the alpha, prefer `minor` and explain the migration. |

## What happens next

1. On every push to `main`, the release workflow opens or updates a "chore: release zunoui" PR that applies all pending changesets: it bumps the version and writes `packages/cli/CHANGELOG.md`.
2. Merging that PR publishes the new version to npm after the website and registry deploy succeeds, then pushes its Git tag and creates a GitHub Release with that version's changelog notes. A rerun completes a missing tag or Release without republishing the same npm version.
3. The repository is in pre-release mode (`pre.json`), so versions look like `0.1.0-alpha.1`. During the alpha they publish under the `latest` dist-tag, so `npx zunoui` always gets the newest one.
4. Changesets keeps applied files in pre-release mode; `scripts/prune-changesets.mjs` removes them in the release PR, so `.changeset/` only holds pending changes. The history lives in `packages/cli/CHANGELOG.md`, the `zunoui@x.y.z` Git tags and the GitHub Releases.

When it is time for a stable release, run `bunx changeset pre exit` and add a changeset for it. The removed files do not matter: the version is computed from the current one, so `0.1.0-alpha.N` becomes `0.1.0`.

Check what is pending with `bunx changeset status`. More detail in the [Changesets documentation](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md).
