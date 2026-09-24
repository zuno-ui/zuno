# Security policy

## Scope and maintenance

ZUNO is in alpha. Security reports for code on `main`, the latest published
version of the `zunoui` CLI and the registry served at `https://zunoui.dev/r/`
are welcome. Fixes target current development and upcoming releases; backports
to older alpha versions are not guaranteed.

The CLI downloads component source from a registry and writes it into your
project. Report anything that could make it write outside the project, follow a
symbolic link, install an unexpected dependency, accept a tampered or
cross-registry manifest, or fetch over an insecure connection. Report XSS or
unsafe patterns in the component source, and supply-chain problems in the npm
package or the release workflows, even if you are unsure of their impact.

## Reporting privately

Use GitHub's [private vulnerability reporting form](https://github.com/zuno-ui/zuno/security/advisories/new).
If it is unavailable, open an issue requesting a private security contact
**without including the vulnerability, reproduction or any secrets**, and wait
for a private channel before sharing technical details. Do not post exploit
details in a public issue or pull request.

Include in the private report:

- Affected CLI version, component or commit, and your package manager and OS.
- Expected behavior and observed behavior.
- A minimal reproduction, such as a malicious manifest or project layout.
- Preconditions, impact and any suggested mitigation.

Test only systems and data you are authorized to use. A local reproduction with
`--registry http://localhost:.../{name}.json` is preferred over testing against
someone else's deployment.

Maintainers will assess the report, discuss a fix and coordinate disclosure and
release notes with the reporter. Response times depend on maintainer
availability; no fixed service level or bounty is promised.

## Your responsibilities

- Components become your code once installed. Review them like any other source
  and keep them updated when a fix is released.
- Only point `--registry` at registries you trust. The CLI validates manifests,
  but it cannot tell whether the component code itself is safe.
