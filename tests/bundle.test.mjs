import { test } from "node:test"
import assert from "node:assert/strict"
import { measure, defaultNames } from "../scripts/measure-bundle.mjs"

// Every non-planned component must stay within its incremental JS/CSS budget (roadmap §9.3/§9.4),
// measured with the real Vite + Tailwind toolchain against a shared base.
test("bundle: incremental cost stays within budget", { timeout: 300000 }, async t => {
  const names = await defaultNames()
  assert.ok(names.length > 0, "expected at least one measurable component")
  const results = await measure(names)
  for (const r of results) {
    t.diagnostic(`${r.name} (${r.kind}): incremental JS ${(r.jsIncremental / 1024).toFixed(2)} kB / CSS ${(r.cssIncremental / 1024).toFixed(2)} kB · first install JS ${(r.jsFirstInstall / 1024).toFixed(2)} kB`)
    assert.ok(r.jsIncremental <= r.budget.js, `${r.name}: incremental JS ${r.jsIncremental} > ${r.budget.js}`)
    assert.ok(r.cssIncremental <= r.budget.css, `${r.name}: incremental CSS ${r.cssIncremental} > ${r.budget.css}`)
  }
})
