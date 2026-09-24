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
2. Merging that PR publishes the new version to npm from GitHub Actions, after the website and registry deploy succeeds.
3. The repository is in pre-release mode (`pre.json`), so versions look like `0.1.0-alpha.1` and publish under the `alpha` dist-tag. Run `bunx changeset pre exit` when it is time for a stable release.

Check what is pending with `bunx changeset status`. More detail in the [Changesets documentation](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md).
