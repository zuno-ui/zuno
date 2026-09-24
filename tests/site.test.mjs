import { test } from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

test("CLI default registry lives on the registry homepage", async () => {
  const { homepage } = JSON.parse(await readFile("registry.json", "utf8"))
  const cli = await readFile("packages/cli/src/index.ts", "utf8")
  assert.ok(cli.includes(`"${homepage}/r/{name}.json"`), `CLI default endpoint must be ${homepage}/r/{name}.json`)
})
