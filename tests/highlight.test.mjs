import assert from "node:assert/strict"
import { test } from "node:test"
import { highlight } from "../packages/showcase/src/highlight.ts"

test("highlight preserves source and provides both themes with plain-text fallback", async () => {
  for (const [language, code] of [["tsx", '<Button title="<script>">Crear</Button>\n'], ["shell", "bunx --bun zunoui@latest add field"], ["json", '{"name":"zuno"}']]) {
    const lines = await highlight(code, language)
    assert.equal(lines.map(line => line.map(token => token.content).join("")).join("\n"), code)
    assert.ok(lines.flat().some(token => token.light && token.dark))
  }
  assert.deepEqual(await highlight("<script>\n", "unknown"), [[{ content: "<script>" }], [{ content: "" }]])
})
