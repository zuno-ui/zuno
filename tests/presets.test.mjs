import { test } from "node:test"
import assert from "node:assert/strict"
import { runInNewContext } from "node:vm"
import { readFile } from "node:fs/promises"
import { createRequire } from "node:module"
import { dirname, resolve } from "node:path"
import ts from "typescript"
import { getPreset, presets, presetCss, presetScript, presetStyles, previewTargets, previewPortalTarget, parseBuilderConfig, defaultBuilderConfig, buildPreset, builderPreviewCss, builderExportCss, builderFonts, builderFontPackages } from "../apps/docs/src/lib/presets.ts"

test("builder and site demos: every control uses the published ZUNO registry", async () => {
  const registry = JSON.parse(await readFile("registry.json", "utf8"))
  const published = new Set(registry.items.flatMap(item => item.files.map(file => resolve(file.path))))
  const aliases = { "@/components/ui/": "registry/ui/", "@/kit/": "registry/components/" }
  const nativeControls = new Set(["button", "select", "option", "input", "textarea", "label", "progress", "meter", "datalist"])
  for (const path of ["apps/docs/src/components/preset-builder.tsx", "apps/docs/src/components/preset-builder-preview.tsx", "apps/docs/src/components/landing-components.tsx"]) {
    const source = ts.createSourceFile(path, await readFile(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const imports = new Map()
    for (const statement of source.statements) {
      if (!ts.isImportDeclaration(statement)) continue
      if (statement.importClause?.name) imports.set(statement.importClause.name.text, statement.moduleSpecifier.text)
      const bindings = statement.importClause?.namedBindings
      if (bindings && ts.isNamedImports(bindings)) {
        for (const binding of bindings.elements) imports.set(binding.name.text, statement.moduleSpecifier.text)
      }
    }
    function visit(node) {
      if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && ts.isIdentifier(node.tagName)) {
        const name = node.tagName.text
        assert.ok(!nativeControls.has(name), `${path}: use the ZUNO component instead of <${name}>`)
        if (/^[A-Z]/.test(name) && name !== "Fragment") {
          const module = imports.get(name)
          if (name === "PresetBuilderPreview") assert.equal(module, "@/components/preset-builder-preview")
          else if (name === "LandingExamples") {
            assert.ok(path.endsWith("/landing-components.tsx") && source.statements.some(statement => ts.isFunctionDeclaration(statement) && statement.name?.text === name))
          }
          else if (name === "Link") {
            assert.equal(module, "next/link")
            assert.ok(ts.isJsxAttribute(node.parent?.parent) && node.parent.parent.name.text === "render", "Links must be rendered by a ZUNO component")
          }
          else {
            assert.notEqual(module, "@/components/ui/native-select", "Use ZUNO Select instead of the native picker")
            const prefix = Object.keys(aliases).find(prefix => module?.startsWith(prefix))
            assert.ok(prefix, `${name} must come from ZUNO's registry`)
            assert.ok(published.has(resolve(aliases[prefix] + module.slice(prefix.length) + ".tsx")), `${name} must be published`)
          }
        }
      }
      ts.forEachChild(node, visit)
    }
    visit(source)
  }
})

test("builder: exported fonts and theme compile with the consumer's Tailwind toolchain", async () => {
  const docsRequire = createRequire(new URL("../apps/docs/package.json", import.meta.url))
  const showcaseRequire = createRequire(new URL("../packages/showcase/package.json", import.meta.url))
  const { compile } = docsRequire("tailwindcss")
  for (const font of Object.keys(builderFonts)) {
    const config = { ...defaultBuilderConfig, font, radius: "1rem" }
    const css = `@import "tailwindcss";\n@import "${resolve("registry/styles/zuno.css")}";\n${builderExportCss(config)}`
    const compiler = await compile(css, {
      base: process.cwd(),
      loadStylesheet: async (id, base) => {
        const path = id === "tailwindcss" ? docsRequire.resolve("tailwindcss/index.css")
          : id.startsWith("@fontsource-") ? showcaseRequire.resolve(id) : resolve(base, id)
        return { base: dirname(path), content: await readFile(path, "utf8") }
      },
    })
    const built = compiler.build(["bg-primary", "text-primary-foreground", "rounded-lg", "rounded-xl", "font-sans"])
    assert.match(built, /background-color: var\(--primary\)/)
    assert.match(built, /color: var\(--primary-foreground\)/)
    assert.match(built, /border-radius: var\(--radius\)/)
    assert.ok(built.includes(`--font-sans: ${builderFonts[font]}`), `${font} must be available to body and font-sans`)
    assert.equal(built.includes("@font-face"), Boolean(builderFontPackages[font]), `${font} must load its font assets`)
  }
})

test("presets: complete reversible overrides, export and preview use the same values", () => {
  const keys = Object.keys(presets[0].light).sort()
  for (const preset of presets) {
    assert.deepEqual(Object.keys(preset.light).sort(), keys)
    assert.deepEqual(Object.keys(preset.dark).sort(), keys)
    const css = presetCss(preset)
    const scoped = presetCss(preset, previewTargets)
    assert.ok(presetStyles.includes(scoped))
    assert.ok(css.includes(`--radius: ${preset.radius};`))
    const blocks = [...css.matchAll(/\{([^{}]+)\}/g)].map(([, body]) => Object.fromEntries([...body.matchAll(/--([\w-]+): ([^;]+);/g)].map(([, name, value]) => [name, value])))
    assert.deepEqual(blocks[0], { radius: preset.radius, ...preset.light })
    assert.deepEqual(blocks[1], preset.dark)
    assert.deepEqual(blocks[2], preset.dark)
    const root = `:root[data-zuno-preset="${preset.id}"]`
    assert.ok(scoped.includes(`${root}.dark :where(${previewTargets})`))
    assert.ok(scoped.includes(`${root}:not(.light):not(.dark) :where(${previewTargets})`))
    assert.ok(!scoped.includes(`${root} {`), "Never override the site's root tokens")
  }
})

test("builder: URL and stored settings validate unknown values and round-trip", () => {
  for (const value of [null, {}, [], "bad", { preset: "unknown", base: "bad", radius: "99rem", font: "constructor", mode: "system" }]) {
    assert.deepEqual(parseBuilderConfig(value), defaultBuilderConfig)
  }
  const settings = { preset: "supabase", base: "zinc", radius: "0.75rem", font: "mono", mode: "light" }
  assert.deepEqual(parseBuilderConfig(Object.fromEntries(new URLSearchParams(settings))), settings)
  assert.deepEqual(parseBuilderConfig(JSON.parse(JSON.stringify(settings))), settings)
})

test("builder: custom base, radius, font and appearance reach preview and export", () => {
  const config = parseBuilderConfig({ preset: "cloudflare", base: "zinc", radius: "1rem", font: "mono", mode: "dark" })
  const built = buildPreset(config)
  assert.equal(built.light.background, getPreset("vercel").light.background)
  assert.equal(built.light.primary, getPreset("cloudflare").light.primary)
  assert.equal(built.dark.primary, getPreset("cloudflare").dark.primary)
  assert.equal(built.radius, "1rem")
  const preview = builderPreviewCss(config)
  const css = builderExportCss(config)
  assert.ok(preview.startsWith(`.preset-builder-canvas, :root[data-zuno-preset] ${previewPortalTarget} {`))
  assert.ok(previewPortalTarget.includes(".preset-control-popup"), "Builder menus must keep the site theme")
  assert.ok(preview.includes("--primary: #f38020;"))
  assert.ok(preview.includes("color-scheme: dark;"))
  assert.ok(preview.includes('--radius: 1rem;'))
  assert.ok(css.includes('--radius: 1rem;'))
  assert.ok(css.includes('--font-sans: "Geist Mono Variable"'))
  assert.ok(css.includes("--primary: #b54708;"))
  assert.ok(css.includes("--primary: #f38020;"))
})

test("preset bootstrap: restore only known presets and tolerate blocked storage", () => {
  for (const saved of [...presets.map(preset => preset.id), "unknown", null, '"><script>']) {
    const dataset = {}
    runInNewContext(presetScript, { localStorage: { getItem: () => saved }, document: { documentElement: { dataset } } })
    assert.equal(dataset.zunoPreset, presets.some(preset => preset.id === saved) ? saved : undefined)
    assert.equal(getPreset(saved).id, dataset.zunoPreset ?? "neutral")
  }
  assert.doesNotThrow(() => runInNewContext(presetScript, { localStorage: { getItem() { throw new Error("blocked") } } }))
})
