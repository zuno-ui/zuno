import { test } from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

test("preset: theme parity, utility mappings, text and control contrast", async t => {
  // The complementary --zuno-* roles live in their own entry, so both files are checked.
  const sources = [await readFile("registry/styles/zuno.css", "utf8"), await readFile("registry/styles/zuno-tokens.css", "utf8")]
  const css = sources.join("\n")
  const colors = block => Object.fromEntries([...block.matchAll(/--([\w-]+): (#[\da-f]{6});/g)].map(([, name, value]) => [name, value]))
  const merge = pattern => Object.assign({}, ...sources.map(source => colors(source.match(pattern)[1])))
  const light = merge(/:root \{([^}]+)\}/)
  const dark = merge(/\.dark \{([^}]+)\}/)
  const system = merge(/:root:not\(\.light\):not\(\.dark\) \{([^}]+)\}/)
  assert.deepEqual(Object.keys(light).sort(), Object.keys(dark).sort())
  assert.deepEqual(system, dark)
  for (const name of Object.keys(light)) assert.ok(css.includes(`--color-${name}: var(--${name});`), name)
  const luminance = hex => hex.slice(1).match(/../g).map(value => {
    const s = parseInt(value, 16) / 255
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }).reduce((sum, value, i) => sum + value * [0.2126, 0.7152, 0.0722][i], 0)
  const pairs = [["foreground", "background"], ["muted-foreground", "muted"], ["muted-foreground", "background"],
    ...["background", "card", "popover"].map(surface => ["destructive", surface]),
    ...["card", "popover", "primary", "secondary", "accent", "destructive", "zuno-destructive-solid", "sidebar", "sidebar-primary", "sidebar-accent"].map(name => [name + "-foreground", name]),
    ...["success", "warning", "info", "error"].map(name => ["zuno-" + name, "zuno-" + name + "-surface"])]
  for (const [mode, theme] of Object.entries({ light, dark })) {
    for (const [fg, bg] of pairs) {
      const a = luminance(theme[fg]), b = luminance(theme[bg])
      const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
      assert.ok(ratio >= 4.5, `${mode}: ${fg}/${bg} contrast ${ratio.toFixed(2)}`)
    }
    // The outline is outside the control and contrasts with its surrounding surface.
    // Decorative borders and disabled controls are not treated as active control boundaries.
    for (const token of ["input", "ring", "destructive", "primary"]) {
      let minimum = Infinity
      for (const surface of ["background", "card", "popover", "muted", "secondary", "accent", "sidebar", "sidebar-accent"]) {
        const a = luminance(theme[token]), b = luminance(theme[surface])
        const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
        assert.ok(ratio >= 3, `${mode}: ${token}/${surface} contrast ${ratio.toFixed(2)}`)
        minimum = Math.min(minimum, ratio)
      }
      t.diagnostic(`${mode}: ${token} minimum contrast ${minimum.toFixed(2)}:1`)
    }
  }
})
