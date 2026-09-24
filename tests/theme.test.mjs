import { test } from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { runInNewContext } from "node:vm"

test("theme bootstrap: saved modes, invalid storage and Vite parity", async () => {
  const source = await readFile("packages/showcase/src/theme-script.ts", "utf8")
  const script = source.match(/themeScript = `([\s\S]*?)`/)[1]
  const html = await readFile("fixtures/react-vite/index.html", "utf8")
  const viteScript = html.match(/<script>([\s\S]*?)<\/script>/)[1]
  assert.equal(script.replace(/\s+/g, ""), viteScript.replace(/\s+/g, ""))
  for (const saved of ["light", "dark", "system", null, "invalid"]) {
    const classes = new Set(["app", "dark"])
    runInNewContext(script, {
      localStorage: { getItem: () => saved },
      document: { documentElement: { classList: {
        remove: (...names) => names.forEach(name => classes.delete(name)),
        add: name => classes.add(name),
      } } },
    })
    assert.deepEqual([...classes], saved === "light" || saved === "dark" ? ["app", saved] : ["app"])
  }
  assert.doesNotThrow(() => runInNewContext(script, { localStorage: { getItem() { throw new Error("blocked") } } }))
})
