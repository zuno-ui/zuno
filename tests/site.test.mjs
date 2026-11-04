import { test } from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

test("CLI default registry lives on the registry homepage", async () => {
  const { homepage } = JSON.parse(await readFile("registry.json", "utf8"))
  const cli = await readFile("packages/cli/src/index.ts", "utf8")
  assert.ok(cli.includes(`"${homepage}/r/{name}.json"`), `CLI default endpoint must be ${homepage}/r/{name}.json`)
})

test("documented component counts match the published registry", async () => {
  const registry = JSON.parse(await readFile("registry.json", "utf8"))
  const inventory = JSON.parse(await readFile("compatibility.json", "utf8"))
  const readme = await readFile("README.md", "utf8")
  const published = registry.items.filter(item => item.type === "registry:ui" || item.type === "registry:component")
  assert.deepEqual(inventory.published, {
    official: inventory.official.length,
    own: inventory.own.length,
    total: published.length,
  })
  assert.deepEqual(
    [...inventory.official, ...inventory.own].map(item => item.name).sort(),
    published.map(item => item.name).sort(),
  )
  assert.ok(readme.includes(`- ${published.length} components:`), "README component count must match the registry")
})
