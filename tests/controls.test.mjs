import { test } from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

// Base UI renders these roots as <span role="…">, so :disabled never matches: the disabled look must
// come from data-[disabled]. A `disabled:` utility here silently leaves disabled controls looking active.
const SPAN_ROOTS = ["checkbox", "switch", "radio-group"]

test("span-rooted controls style disabled through data-[disabled], not :disabled", async () => {
  for (const name of SPAN_ROOTS) {
    const source = await readFile(`registry/ui/${name}.tsx`, "utf8")
    assert.doesNotMatch(source, /(^|[\s"])disabled:/, `${name}: use data-[disabled]: instead of disabled:`)
    assert.match(source, /data-\[disabled\]:opacity-50/, `${name}: missing the disabled opacity`)
  }
})
