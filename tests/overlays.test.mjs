import { test } from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

// The 7 Base UI overlays (roadmap §16.2). Each renders outside the local tree, so §6.6 requires the
// surface to inherit the active theme through the portal, and §15.2 requires the composition demos.
const OVERLAYS = ["alert-dialog", "avatar", "dialog", "dropdown-menu", "select", "toast", "tooltip"]
const read = name => readFile(`registry/ui/${name}.tsx`, "utf8")

test("§6.6 portals: overlay surfaces use semantic theme tokens, not hard-coded colors", async t => {
  for (const name of OVERLAYS) {
    const source = await read(name)
    // No literal hex colors on any overlay: a menu that hard-codes light colors would open light
    // over a dark card. Theme must come from tokens that resolve at the document root.
    assert.doesNotMatch(source, /#[0-9a-fA-F]{3,8}\b/, `${name}: hard-coded hex color would break theme-in-portal`)
    // The visible content surface is painted with a semantic surface token (popover, or the inverted
    // foreground/background pair used by the tooltip), so it matches Light/Dark inside the portal.
    assert.match(source, /bg-(popover|foreground|muted)\b/, `${name}: missing semantic surface token`)
    t.diagnostic(`${name}: theme-token surface ✓`)
  }
})

test("§6.6 portals: portalled overlays mount through a Base UI Portal", async () => {
  // Avatar renders in place; the other six escape the local tree and must use a portal.
  for (const name of OVERLAYS.filter(n => n !== "avatar")) {
    const source = await read(name)
    assert.match(source, /\.Portal\b/, `${name}: expected a portal for content rendered outside the local tree`)
  }
})

test("§15.2 composition: mandatory overlay compositions exist in the catalog", async () => {
  const meta = await readFile("packages/showcase/src/catalog-meta.ts", "utf8")
  const renderers = await readFile("packages/showcase/src/catalog.tsx", "utf8")
  // Select inside Dialog · Dropdown Menu inside a table · Tooltip on controls with different states.
  const required = ["dialog-select", "dropdown-menu-table", "tooltip-states"]
  for (const id of required) {
    assert.ok(meta.includes(`"${id}"`), `catalog-meta is missing the required composition example "${id}"`)
    assert.ok(renderers.includes(`"${id}"`), `catalog.tsx is missing a renderer for "${id}"`)
  }
})

test("catalog integrity: every overlay example declared in meta has a matching renderer", async () => {
  const meta = await readFile("packages/showcase/src/catalog-meta.ts", "utf8")
  const renderers = await readFile("packages/showcase/src/catalog.tsx", "utf8")
  // An example id present in meta but absent from the renderer map would render `undefined` at runtime.
  const ids = [...meta.matchAll(/\{ id: "([a-z-]+)"/g)].map(m => m[1])
    .filter(id => OVERLAYS.some(name => id.startsWith(name)))
  assert.ok(ids.length >= 12, `expected the overlay examples to be present, found ${ids.length}`)
  for (const id of ids) assert.ok(renderers.includes(`"${id}":`), `catalog.tsx has no renderer for "${id}"`)
})

test("dismissal contract: AlertDialog blocks Escape, Dialog exposes an opt-out", async () => {
  // AlertDialog confirms destructive actions, so neither the backdrop (Base UI forces this) nor Escape
  // may dismiss it: the root intercepts onOpenChange and cancels the escape-key close.
  const alert = await read("alert-dialog")
  assert.match(alert, /reason === "escape-key"/, "alert-dialog must intercept the escape-key close reason")
  assert.match(alert, /details\.cancel\(\)/, "alert-dialog must cancel the intercepted close")
  // Dialog stays dismissible by default but lets callers make it persistent via `dismissible`.
  const dialog = await read("dialog")
  assert.match(dialog, /dismissible = true/, "dialog must default dismissible to true")
  assert.match(dialog, /"outside-press" \|\| .*"escape-key"/, "dialog must gate both dismissal reasons behind dismissible")
})

test("registry + compatibility: the 7 overlays are published as base-ui and no longer planned", async () => {
  const registry = JSON.parse(await readFile("registry.json", "utf8"))
  const compat = JSON.parse(await readFile("compatibility.json", "utf8"))
  for (const name of OVERLAYS) {
    const item = registry.items.find(i => i.name === name)
    assert.ok(item, `registry.json is missing "${name}"`)
    assert.deepEqual(item.files.map(f => f.path), [`registry/ui/${name}.tsx`])
    const entry = compat.official.find(e => e.name === name)
    assert.ok(entry, `compatibility.json is missing "${name}"`)
    assert.equal(entry.kind, "base-ui", `${name}: expected kind base-ui`)
    assert.notEqual(entry.status, "planned", `${name}: still marked planned`)
  }
})
